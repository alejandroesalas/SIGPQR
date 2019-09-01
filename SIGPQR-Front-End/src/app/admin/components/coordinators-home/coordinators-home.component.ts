import {Component, OnInit} from '@angular/core';
import {ProgramService} from "../../../services/program/program.service";
import {Program} from "../../../models/Program";
import Swal from 'sweetalert2';
import {CoordinatorService} from "../../../services/coodinator/coordinator.service";
import {swal} from "../../../global";

/*export const swal = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})*/

@Component({
  selector: 'app-coordinators-home',
  templateUrl: './coordinators-home.component.html',
  styleUrls: ['./coordinators-home.component.css']
})
export class CoordinatorsHomeComponent implements OnInit {
  public loading = true;
  public programs: Array<Program>;
  public selectedProgram: Program;

  constructor(private programService: ProgramService,
              private coordinatorService: CoordinatorService) {
    this.loading = true;
  }

  ngOnInit() {
    this.loadCoordinators();
  }

  loadCoordinators() {
    this.programService.getAll(true).subscribe(response => {
      if (response.status == 'success') {
        this.programs = response.data;
        console.log('respuesta', this.programs);
        this.loading = false;
      }
    }, error => {
      console.log(error);

    });
  }

  confirmAction(program: Program) {
    this.selectedProgram = program;
    swal.fire({
      title: '¿Estas Seguro?',
      text: "Podras Habilitarlo Nuevamente en cualquiere momento que lo desees",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Deshabilitar'
    }).then((result) => {
      if (result.value) {
        this.disableCoordinator();
      }
    })

  }

  disableCoordinator() {
    if (this.selectedProgram) {
      this.coordinatorService.degradeUser(this.selectedProgram.coordinator.id,this.selectedProgram).subscribe(response => {
        if (response.status == 'success') {
          swal.fire(
            'Deshabilitado!',
            'Coorinador Ha sido Deshabilitado',
            'success'
          );
          this.loading = true;
          this.loadCoordinators();
        }
      }, error => {
        swal.fire(
          'Algo Va mal!',
          error.error.message,
          'warning'
        );
        //console.log('errores', error)
      });
    }

  }

}
