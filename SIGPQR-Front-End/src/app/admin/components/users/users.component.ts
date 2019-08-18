import { Component, OnInit } from '@angular/core';
import {ModalServiceService} from "../../../services/modal-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/authService/auth.service";
import {Profile} from "../../../models/Profile";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    public docentes:Array<any>;
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
    this.loadUsers();
  }
  openModal(id: string) {
    //this.currentUSer = selectedUser;
    console.log(id);
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
  private loadUsers(){

  }
   createNewUser(){

  }
   updateUser(){

  }

}
