import {Component, OnInit} from '@angular/core';
import {ModalServiceService} from "../../../services/modal-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/authService/auth.service";
import {Profile} from "../../../models/Profile";
import {UserService} from "../../../services/user/user.service";
import {Faculty} from "../../../models/Faculty";
import {User} from "../../../models/User";
import {ProgramService} from "../../../services/program/program.service";
import {Program} from "../../../models/Program";
import {AdminService} from "../../../services/admin/admin.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public docentes: Array<any>;
  public programs: Array<Program>
  public currentUSer: User;
  public selectedProgram;
  public modal_id: string;
  public admin_profile = Profile.admin;
  public teacher_profile = Profile.teacher;
  public loading: boolean;

  constructor(private userService: UserService,
              private modalService: ModalServiceService,
              private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router,
              private programService: ProgramService,
              private adminService: AdminService,
              private _snackBar: MatSnackBar
  ) {
    this.selectedProgram = '';
    this.loading = true;
    this.modal_id = "newUserModal";
    this.currentUSer = new User(0, '', '', '', '', 0, '', '', '', 0, 0);
  }

  ngOnInit() {
    this.loadUsers();
    this.loadPrograms();
  }

  openModal(selectedUser, id: string) {
    this.currentUSer = selectedUser;
    this.modalService.open(id);
    /*if (this.programs){
      this.currentUSer = selectedUser;
      this.modalService.open(id);
    }else{
      this._snackBar.open('No hay programas disponibles o Los existentes ya tienen un coordinador','Warning', {
        duration: 2000,
      });
    }*/
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  private loadUsers() {
    let susbcription;
    susbcription = this.userService.getAll();
    if (susbcription) {
      susbcription.subscribe(value => {
        this.docentes = value;
        this.loading = false;
      }, error => {
        console.log('errores', error);
      });
    } else {

    }
  }

  private loadPrograms() {
    let susbcription;
    susbcription = this.programService.unassignedPrograms();
    if (susbcription) {
      susbcription.subscribe(value => {
        this.programs = value;
      }, error => {
        console.log('errores', error);
      });
    } else {

    }

  }

  disableUser(docente) {
    this.userService.delete(docente.id).subscribe(response=>{
      if (response.status == 'success'){
        this.loading = true;
        this._snackBar.open('El usuario ha sido deshabilitado con exito', 'Exito', {
          duration: 2000,
        });
        this.loadUsers();
      }

    },error => {
      console.log(error)
      this._snackBar.open(error.error.message, 'Error', {
        duration: 2000,
      });
    });
  }

  promoverDocente(form) {
    this.adminService.promoverDocente(this.selectedProgram, this.currentUSer).subscribe(response => {
      if (response.status == 'success') {
        this.loading = true;
        this.closeModal('promoverDocente');
        form.reset();
        this._snackBar.open(response.data, 'Success', {
          duration: 2000,
        });
        this.loadUsers();
        //this.loadPrograms();
      }
    }, error => {
      console.log(error)
      this._snackBar.open(error.error.message, 'Error', {
        duration: 2000,
      });

    });
  }
}
