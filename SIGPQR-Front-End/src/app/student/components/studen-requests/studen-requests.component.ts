import { Component, OnInit } from '@angular/core';
import {RequestsService} from "../../../services/requests.service";

@Component({
  selector: 'app-studen-requests',
  templateUrl: './studen-requests.component.html',
  styleUrls: ['./studen-requests.component.css']
})
export class StudenRequestsComponent implements OnInit {

  public awaitingRequests:Array<Request>;
  public onProcessRequests:Array<Request>;
  public DoneRequests:Array<Request>;
  constructor(private requestService:RequestsService) { }

  ngOnInit() {
  }

  loadRequests(){

  }

}
