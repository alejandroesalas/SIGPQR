import { Component, OnInit } from '@angular/core';
import {ModalServiceService} from "../../services/modal-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/authService/auth.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email:string;
  public  password: string;
  returnUrl: string;
  constructor(private modalService: ModalServiceService,
      private route: ActivatedRoute,
      private router: Router,
      private authService:AuthService) {
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit(form){
    this.authService.login(this.email,this.password)
      .pipe(first())
      .subscribe(
        respose=>{
          console.log(respose);
          this.router.navigate([this.returnUrl]);
        },error => {
          //Desplegar SweetAlert por si hay algun error.
          console.log('error',error);
        }
      );

  }
  onForgotPassword(form){

  }
  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
