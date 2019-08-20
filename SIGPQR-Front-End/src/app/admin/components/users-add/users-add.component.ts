import { Component, OnInit } from '@angular/core';
import {Profile} from "../../../models/Profile";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/authService/auth.service";
import {User} from "../../../models/User";
import {UserService} from "../../../services/user/user.service";
@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.css']
})
export class UsersAddComponent implements OnInit {

  public newUser:User;
  public admin_profile = Profile.admin;
  public teacher_profile = Profile.teacher;
  constructor(private userService:UserService,
              private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router,
  ) {

    this.newUser = new User(0,'','','','',0,'','','',
      0,0);
  }
  ngOnInit() {
  }

  createNewUser(form){
    console.log(this.newUser);
    form.reset();

  }

}
