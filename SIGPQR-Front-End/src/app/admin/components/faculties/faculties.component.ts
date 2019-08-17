import { Component, OnInit } from '@angular/core';
import {DynamicScriptLoaderService} from "../../../services/dynamic-script-loader.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/authService/auth.service";
import {Faculty} from "../../../models/Faculty";
import {FacultyService} from "../../../services/faculty/faculty.service";
import {ModalServiceService} from "../../../services/modal-service.service";

@Component({
  selector: 'app-faculties',
  templateUrl: './faculties.component.html',
  styleUrls: ['./faculties.component.css']
})
export class FacultiesComponent implements OnInit {

   public faculties: Array<Faculty>;
  constructor(private modalService: ModalServiceService
              ,private dynamicScriptLoader: DynamicScriptLoaderService,
              private route: ActivatedRoute,
              private authService:AuthService,
              private router: Router,
              private  facultyService:FacultyService) { }

  ngOnInit() {
    this.loadFaculties();
  }
  private loadFaculties(){
    let subscription:any = this.facultyService.getAll();
    if(subscription){
      subscription.subscribe(value => {
        this.faculties = value;
        //console.log('indice 1',this.programas[1]);
        //console.log('respuesta',value);
      },error => {
        console.log('errores',error);
      });
    }
  }

  deleteFaculty(selectedFaculty){
    console.log(selectedFaculty);
  }
  openModal(selectedFaculty:Faculty,id: string) {
    this.modalService.open(id);
  }

  closeModal(selectedFaculty,id: string) {
    this.modalService.close(id);
  }
}
