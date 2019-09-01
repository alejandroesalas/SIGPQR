import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/authService/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.checkToken();
  }

  checkToken() {
    this.route.params.subscribe(value => {
      let token = value['token'];
      console.log(token);
      if (token) {
        this.authService.activateUser(token).subscribe(response => {
          if (response.status == 'success') {
            this.router.navigate(['login']);
          }
        }, error => {
          this.router.navigate(['error']);
          console.log(error);
        });
        //this.router.navigate(['login']);
      }
    })
  }

}
