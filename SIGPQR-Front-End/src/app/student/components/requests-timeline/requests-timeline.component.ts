import {Component, OnInit} from '@angular/core';
import {isNumber} from "util";
import {ActivatedRoute, Router} from "@angular/router";
import {RequestsService} from "../../../services/requests.service";
import {_Request, STATUS_TYPE} from "../../../models/_Request";
import {User} from "../../../models/User";
import {AuthService} from "../../../services/authService/auth.service";

@Component({
    selector: 'app-requests-timeline',
    templateUrl: './requests-timeline.component.html',
    styleUrls: ['./requests-timeline.component.css']
})
export class RequestsTimelineComponent implements OnInit {
    public solicitud: _Request;
    public currentUser: User;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private requestService: RequestsService,
                private authService: AuthService) {
        this.currentUser = authService.currentUserValue;
    }

    ngOnInit() {
        this.route.params.subscribe(value => {
            let id = +value['id'];
            if (isNumber(id)) {
                this.loadRequest(id);
                1
            }
        });
    }

    loadRequest(id: number) {
        this.requestService.getRequest(id).subscribe(response => {
            if (response.status == 'success') {
                this.solicitud = response.data;
                console.log(this.solicitud);
            }
        }, error => {
            console.log(error);
        });


    }

    isRequestOpen():boolean{
        return this.solicitud.status == STATUS_TYPE._open;
    }
}
