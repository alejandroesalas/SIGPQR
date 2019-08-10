import { Component, OnInit } from '@angular/core';
import {ModalServiceService} from "../../services/modal-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private modalService: ModalServiceService) {}

  ngOnInit() {
  }

  onSubmit(form){

  }
  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
