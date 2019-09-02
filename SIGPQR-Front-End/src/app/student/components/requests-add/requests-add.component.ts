import {Component, OnInit, ViewChild} from '@angular/core';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import {Coordinator} from "../../../models/Coordinator";
import {AuthService} from "../../../services/authService/auth.service";
import {CoordinatorService} from "../../../services/coodinator/coordinator.service";
import {Router} from "@angular/router";
import {User} from "../../../models/User";
import {RequestsService} from "../../../services/requests.service";
import {_RequestType} from "../../../models/_RequestType";
import {global} from "../../../global";
import {AngularFileUploaderComponent} from "angular-file-uploader";
import {_Request, STATUS_TYPE} from "../../../models/_Request";
import {AttachmentRequest} from "../../../models/AttachmentRequest";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-requests-add',
  templateUrl: './requests-add.component.html',
  styleUrls: ['./requests-add.component.css']
})
export class RequestsAddComponent implements OnInit {
  @ViewChild('fileUpload1',{static:false})
  private fileUpload1: AngularFileUploaderComponent;
  public Editor = DecoupledEditor;
  requestTypes: Array<_RequestType>;
  coordinator: Coordinator;
  student: User;
  request:_Request;
  public resetUploader:boolean;
   public afuConfig;

  constructor(private authService: AuthService,
              private requestService: RequestsService,
              private coordinatorService: CoordinatorService,
              private route: Router,
              private _snackBar: MatSnackBar) {
    this.resetUploader = false;
    this.coordinator = new Coordinator();
    authService.currentUser.subscribe(user => this.student = user);
    this.afuConfig = {
      multiple: true,
      formatsAllowed:".jpg,.png,.pdf,.docx",
      maxSize:"10",
      uploadAPI:  {
        url:global.url+"requests/uploadFiles",
        headers: {
          'Authorization':'Bearer '+this.student.token
        }
      },
      theme: "dragNDrop",
      hideProgressBar: false,
      hideResetBtn: true,
      hideSelectBtn: false,
      attachPinText:'Selecciona archivos',
      replaceTexts: {
        selectFileBtn: 'Seleccionar archivos',
        resetBtn: 'Reset',
        uploadBtn: 'Cargar',
        dragNDropBox: 'Arrastra y suelta archivos dentro del cuadro',
        attachPinBtn: 'Adjunta archivos',
        afterUploadMsg_success: 'Archivos cargados con exito',
        afterUploadMsg_error: 'No se ha podido subir los archivos'
      }
    };
    this.request = new _Request(0,'','',null,null,null,STATUS_TYPE._open);
  }

  ngOnInit() {
    this.loadCoordinatorInfo();
    this.loadRequestType();
  }

  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }
  loadRequestType() {
    this.requestService.getRequestTypes().subscribe(response => {
      if (response.status == 'success') {
        this.requestTypes = response.data;
      }
    }, error => {
      console.log(error);
    });

  }
  loadCoordinatorInfo() {
    this.coordinatorService.getCoordinatorByProgram(this.student.program_id).subscribe(response=>{
      if (response.status == 'success'){
        this.coordinator = response.data;
        console.log(this.coordinator);
      }
    },error => {
      console.log(error);
    });
  }

  uploadedFiles(data){
    let dat = JSON.parse(data.response);
    console.log('archivos',dat);
    this.request.attachments = dat.data;
    console.log('request',this.request);
  }
  storeRequest(form){
    this.request.student_id = this.student.id;
    console.log(this.request);
    this.requestService.storeRequest(this.request).subscribe(response=>{
      if (response.status =='success'){
        this._snackBar.open('Su solicitud ha sido enviada con exito','X', {
          duration: 3000,
        });
        form.reset();
        this.route.navigate(['../']);
      }
    },error => {
      console.log(error)
    });

  }

}
