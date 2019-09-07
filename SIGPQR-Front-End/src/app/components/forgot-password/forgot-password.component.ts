import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PasswordService} from "../../services/passwords/password.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  public email:string;
  public password:string;
  public password_confirmation;
  constructor( private route: ActivatedRoute,
               private router: Router,
               private passwordService:PasswordService) {
    this.email = '';
  }

  ngOnInit() {
    this.checkForResetTokenPassword();
  }
  checkForResetTokenPassword(){
    this.route.params.subscribe(value => {
      let token = value['token'];
      console.log(token);
      if (token) {
        this.passwordService.resetPassword(this.email,this.password,this.password_confirmation).subscribe(response => {
          if (response.status == 'success') {
            this.router.navigate(['login']);
          }
        }, error => {
          this.router.navigate(['error']);
          console.log(error);
        });
      }
    })
  }

}
