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
    // redirect to specific home if already logged in
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.redirectTo(currentUser.profile_id);
    }
  }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }

  onSubmit(form){
    this.authService.login(this.email,this.password)
      .pipe(first())
      .subscribe(
        user=>{
          this.redirectTo(user.profile_id)
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

  private redirectTo(profile_id:number){
    switch (profile_id) {
      case 1:
        this.router.navigate(['/admin']);
        break;
      case 2:
        this.router.navigate(['/coordinador']);
        break;
      case 3:
        this.router.navigate(['/student']);
        break;
      default:
        this.router.navigate(['login']);
        break;
    }
  }

}
