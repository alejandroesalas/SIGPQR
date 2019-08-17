import {Component, OnInit} from '@angular/core';
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
  public currentFaculty: Faculty;

  constructor(private modalService: ModalServiceService
    , private dynamicScriptLoader: DynamicScriptLoaderService,
              private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router,
              private  facultyService: FacultyService) {
    this.currentFaculty = new Faculty(0, '', '', '', '');
  }

  ngOnInit() {
    this.loadFaculties();
  }

  private loadFaculties() {
    let subscription: any = this.facultyService.getAll();
    if (subscription) {
      subscription.subscribe(value => {
        this.faculties = value;
        //console.log('indice 1',this.programas[1]);
        //console.log('respuesta',value);
      }, error => {
        console.log('errores', error);
      });
    }
  }

  updateFaculty() {
    if (this.currentFaculty){

    }
  }

  deleteFaculty(selectedFaculty) {
    console.log(selectedFaculty);
  }

  openModal(selectedFaculty: Faculty, id: string) {
    this.currentFaculty = selectedFaculty;
    //console.log(selectedFaculty)
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
