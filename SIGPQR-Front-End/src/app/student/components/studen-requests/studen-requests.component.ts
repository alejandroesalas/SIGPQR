import {Component, OnInit} from '@angular/core';
import {RequestsService} from "../../../services/requests.service";
import {_Request, STATUS_TYPE} from "../../../models/_Request";
import {REQUEST_TYPE} from "../../../models/_RequestType";
import {AuthService} from "../../../services/authService/auth.service";

@Component({
  selector: 'app-studen-requests',
  templateUrl: './studen-requests.component.html',
  styleUrls: ['./studen-requests.component.css']
})
export class StudenRequestsComponent implements OnInit {

  public mapRequests:Map<string,Array<_Request>>;
  public mapComplaints:Map<string,Array<_Request>>;
  public mapClaims:Map<string,Array<_Request>>;
  public currentUser;
  public requests: Array<_Request>;
  testhtml = "<p>Hello world</p>";
  constructor(private requestService: RequestsService,
              private authService:AuthService) {
    this.mapRequests = new Map<string, Array<_Request>>();
    this.mapComplaints = new Map<string, Array<_Request>>();
    this.mapClaims = new Map<string, Array<_Request>>();
    this.currentUser = authService.currentUserValue;
  }

  ngOnInit() {
    this.loadRequests();
  }

  loadRequests() {
    this.requestService.getAll().subscribe(response => {
      if (response.status == 'success') {
        this.requests = response.data;
        //peticiones
        this.mapRequests.set('open',this.requests.filter(theRequest => theRequest.status == STATUS_TYPE._open
          && theRequest.request_type_id == REQUEST_TYPE.peticion));
        this.mapRequests.set('onProcess',this.requests.filter(theRequest => theRequest.status == STATUS_TYPE._onProcess
          && theRequest.request_type_id == REQUEST_TYPE.peticion));
        this.mapRequests.set('closed',this.requests.filter(theRequest => theRequest.status == STATUS_TYPE._closed
          && theRequest.request_type_id == REQUEST_TYPE.peticion));
        //Quejas
        this.mapComplaints.set('open',this.requests.filter(theRequest => theRequest.status == STATUS_TYPE._open
          && theRequest.request_type_id == REQUEST_TYPE.queja));
        this.mapComplaints.set('onProcess',this.requests.filter(theRequest => theRequest.status == STATUS_TYPE._onProcess
          && theRequest.request_type_id == REQUEST_TYPE.queja));
        this.mapComplaints.set('closed',this.requests.filter(theRequest => theRequest.status == STATUS_TYPE._closed
          && theRequest.request_type_id == REQUEST_TYPE.queja));
        //Reclamos
        this.mapClaims.set('open',this.requests.filter(theRequest => theRequest.status == STATUS_TYPE._open
          && theRequest.request_type_id == REQUEST_TYPE.reclamo));
        this.mapClaims.set('onProcess',this.requests.filter(theRequest => theRequest.status == STATUS_TYPE._onProcess
          && theRequest.request_type_id == REQUEST_TYPE.reclamo));
        this.mapClaims.set('closed',this.requests.filter(theRequest => theRequest.status == STATUS_TYPE._closed
          && theRequest.request_type_id == REQUEST_TYPE.reclamo));
        console.log(this.mapComplaints.get('open')[0].program);
        //console.log(this.requests);
      }
    }, error => {
      console.log(error);
    });

  }

}
