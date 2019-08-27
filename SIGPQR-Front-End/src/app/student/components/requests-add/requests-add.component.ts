import {Component, OnInit} from '@angular/core';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import {Coordinator} from "../../../models/Coordinator";
import {AuthService} from "../../../services/authService/auth.service";
import {CoordinatorService} from "../../../services/coodinator/coordinator.service";
import {Router} from "@angular/router";
import {Student} from "../../../models/Student";
import {User} from "../../../models/User";
import {RequestsService} from "../../../services/requests.service";
import {_RequestType} from "../../../models/_RequestType";

@Component({
  selector: 'app-requests-add',
  templateUrl: './requests-add.component.html',
  styleUrls: ['./requests-add.component.css']
})
export class RequestsAddComponent implements OnInit {
  public Editor = DecoupledEditor;
  requestTypes: Array<_RequestType>;
  coordinator: Coordinator;
  student: User;

  constructor(private authService: AuthService,
              private requestService: RequestsService,
              private coordinatorService: CoordinatorService,
              private route: Router) {
    this.coordinator = new Coordinator();
    authService.currentUser.subscribe(user => this.student = user);
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

}
