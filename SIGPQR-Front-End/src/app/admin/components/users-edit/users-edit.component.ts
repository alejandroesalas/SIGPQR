import { Component, OnInit } from '@angular/core';
import {Profile} from "../../../models/Profile";
import {ModalServiceService} from "../../../services/modal-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/authService/auth.service";

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.css']
})
export class UsersEditComponent implements OnInit {

  public currentUSer;
  public modal_id:string;
  public admin_profile = Profile.admin;
  public teacher_profile = Profile.teacher;
  constructor(private modalService: ModalServiceService,
              private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router,
  ) {
    this.modal_id = "newUserModal";
  }
  ngOnInit() {
  }
  openModal(id: string) {
    //this.currentUSer = selectedUser;
    console.log(id);
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
  createNewUser(){

  }
  updateUser(){

  }
}
