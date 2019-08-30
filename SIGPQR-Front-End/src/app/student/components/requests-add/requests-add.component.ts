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
              private route: Router) {
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

  uploadedFiles(datos){
    console.log('archivos',this.fileUpload1.ApiResponse);
    console.log(datos);
  }
  storeRequest(form){
    console.log(this.request);
    this.request.student_id = this.student.id;
  }

}
