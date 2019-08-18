import { Component, OnInit } from '@angular/core';
import {ModalServiceService} from "../../../services/modal-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/authService/auth.service";
import {Profile} from "../../../models/Profile";
import {UserService} from "../../../services/user/user.service";
import {Faculty} from "../../../models/Faculty";
import {User} from "../../../models/User";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    public docentes:Array<any>;
    public currentUSer:User;
    public modal_id:string;
    public admin_profile = Profile.admin;
    public teacher_profile = Profile.teacher;
  constructor(private userService:UserService,
              private modalService: ModalServiceService,
              private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router,
             ) {
    this.modal_id = "newUserModal";
    this.currentUSer = new User(0,'','','','',0,'','','',0,0);
  }

  ngOnInit() {
    this.loadUsers();
  }
  openModal(selectedUser,id: string) {
    this.currentUSer = selectedUser;
    console.log(id);
    this.modalService.open(id);
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }
  private loadUsers(){
    let susbcription;
    susbcription = this.userService.getAll();
    if (susbcription){
      susbcription.subscribe(value => {
        this.docentes = value;
      }, error => {
        console.log('errores', error);
      });
    }else{

    }

  }
  disableUser(docente){
    console.log(docente);
  }
  promoverDocente(){
    console.log(this.currentUSer);
  }
   createNewUser(){

  }
   updateUser(){

  }

}
