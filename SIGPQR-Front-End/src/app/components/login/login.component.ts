import {Component, OnInit} from '@angular/core';
import {ModalServiceService} from "../../services/modal-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/authService/auth.service";
import {first} from "rxjs/operators";
import {DynamicScriptLoaderService} from "../../services/dynamic-script-loader.service";
import {PasswordService} from "../../services/passwords/password.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public email: string;
    public password: string;
    returnUrl: string;
    modalId: string;

    constructor(private passwordService: PasswordService,
                private modalService: ModalServiceService,
                private dynamicScriptLoader: DynamicScriptLoaderService,
                private authService: AuthService,
                private route: ActivatedRoute,
                private router: Router) {
        this.modalId = 'forgotPassWordModal';
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

    private loadScripts() {
        // You can load multiple scripts by just providing the key as argument into load method of the service
        this.dynamicScriptLoader.loadOnBody('general').then(data => {
            // Script Loaded Successfully
        }).catch(error => console.log(error));
    }

    onSubmit(form) {
        this.authService.login(this.email, this.password)
            .pipe(first())
            .subscribe(
                user => {
                    this.redirectTo(user.profile_id)
                }, error => {
                    //Desplegar SweetAlert por si hay algun error.
                    console.log('error', error);
                }
            );
    }

    onForgotPassword(form) {
        this.passwordService.senEmailReset(form.controls.email.value).subscribe(response => {
            if (response.status == 'success') {
                console.log(response);
                this.closeModal(this.modalId);
            }
        }, error => {
            console.log(error);
        });

    }

    openModal(id: string) {
        this.modalService.open(id);
    }

    closeModal(id: string) {
        this.modalService.close(id);
    }

    logout() {
        this.route.params.subscribe(value => {
            let logout = +value['sure'];
            console.log(logout);
            if (logout == 1) {
                this.authService.logout();
                //this.router.navigate(['login']);
            }
        })
    }

    private redirectTo(profile_id: number) {
        switch (profile_id) {
            case 1:
                this.router.navigate(['admin']);
                break;
            case 2:
                this.router.navigate(['coordinador']);
                break;
            case 3:
                this.router.navigate(['student']);
                break;
            default:
                this.router.navigate(['login']);
                break;
        }
    }

}
