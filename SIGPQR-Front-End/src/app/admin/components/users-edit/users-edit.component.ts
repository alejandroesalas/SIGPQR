import { Component, OnInit } from '@angular/core';
import {Profile} from "../../../models/Profile";
import {ModalServiceService} from "../../../services/modal-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import { isNumber} from "util";
import {UserService} from "../../../services/user/user.service";
import {User} from "../../../models/User";

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.css']
})
export class UsersEditComponent implements OnInit {

  public currentUser;
  public admin_profile = Profile.admin;
  public teacher_profile = Profile.teacher;
  public loading :boolean;
  constructor(private modalService: ModalServiceService,
              private route: ActivatedRoute,
              private userService:UserService,
              private router: Router,
  ) {
    this.loading = true;
    this.currentUser = new User(0,'','','','',0,'','','',
      0,0);

  }
  ngOnInit() {
    this.route.params.subscribe(value => {
      let id = +value['id'];
      if (isNumber(id)){
        this.getUser(id);
      }
    });
  }
  editUser(form){
    this.loading = true;
    let subscription;
    subscription = this.userService.update(this.currentUser);
    if (subscription){
      subscription.subscribe(user=>{
        this.currentUser = user;
        this.loading = false;
        this.router.navigate(['admin/users']);
      },error =>{
        console.log('errores', error);
        this.loading = false;
      });
    }
  }
  getUser(id:number){
    let subscription;
    subscription = this.userService.getUser(id);
    if (subscription){
      subscription.subscribe(user=>{
        this.currentUser = user;
        this.loading = false;
      },error =>{
        console.log('errores', error);
      });
    }
  }
}
