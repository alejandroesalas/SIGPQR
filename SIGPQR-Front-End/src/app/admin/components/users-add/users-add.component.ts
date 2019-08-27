import { Component, OnInit } from '@angular/core';
import {Profile} from "../../../models/Profile";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/authService/auth.service";
import {User} from "../../../models/User";
import {UserService} from "../../../services/user/user.service";
import { FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {emailValidation}from "../../../customValidators/CustomValidators.js";
import {MatSnackBar} from "@angular/material";
@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.css']
})
export class UsersAddComponent implements OnInit {
  public regForm:FormGroup;
  public newUser:User;
  public admin_profile = Profile.admin;
  public teacher_profile = Profile.teacher;
  constructor(private userService:UserService,
              private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router,
              private _snackBar: MatSnackBar
  ) {

    this.newUser = new User(0,'','','','',0,'','','',
      0,0);
  }
  ngOnInit() {
    this.regForm = new FormGroup({
        name: new FormControl('',Validators.required),
      'lastName':new FormControl('',Validators.required),
      email:new FormControl('',{updateOn:'blur',validators:[Validators.required, Validators.email,
          Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")],asyncValidators:[emailValidation(this.userService)]}),
      'profile':new FormControl('',Validators.required),
      'id_type':new FormControl('',Validators.required),
      'id_num':new FormControl('',Validators.required),
    });

  }

  /*isTaken(control:FormControl):Promise<ValidationErrors | null> | Observable<ValidationErrors | null>{
    return this.userService.checkEmail(control.value).pipe(
      map(isTaken=>(isTaken?{notAvailable:true}:null)),
      catchError(() => null)
    );
  }*/
  createNewUser(){
    this.newUser = this.regForm.value;
    this.newUser.lastname = this.regForm.get('lastName').value;
    this.userService.store(this.newUser).subscribe(response => {
      if (response.status = 'success'){
        this._snackBar.open("Usuario creado con exito",'', {
          duration: 2000,
        });
        this.regForm.reset();
      }else {
        this._snackBar.open(response.error,'Error', {
          duration: 2000,
        });
      }
    },error=>{
      this._snackBar.open(error.error.message,'Error', {
        duration: 2000,
      });
      console.log('error',error);
    });
  }

}
