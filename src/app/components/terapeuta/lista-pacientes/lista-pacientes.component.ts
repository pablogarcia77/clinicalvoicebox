import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Persona } from 'src/app/models/persona';
import { PacientesService } from 'src/app/services/pacientes.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.css']
})
export class ListaPacientesComponent implements OnInit {


  displayedColumns: string[] = ['apellido', 'nombre', 'edad', 'acciones'];
  dataSource: MatTableDataSource<Persona>;

  public terapeuta: Persona

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
    private pacientesService: PacientesService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.terapeuta = new Persona()
  }
  
  ngOnInit(): void {

    this.terapeuta = JSON.parse(localStorage.getItem('user'))

    // console.log(this.terapeuta)
    this.getAllPacientes()
    
  }

  getAllPacientes(){
    this.pacientesService.getAllPacientes(this.terapeuta.terapeuta.id).subscribe(
      response => {
        this.paginator._intl.itemsPerPageLabel = "Pacientes por página:"
        this.dataSource = new MatTableDataSource(response)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deletePaciente(paciente: any){
    this.dialog.open(
      DialogComponent,
      {
        data: {
          paciente: paciente,
          delete: true
        }
      }
    )
    this.dialog._getAfterAllClosed().subscribe(
      () => {
        this.pacientesService.getAllPacientes(this.terapeuta.terapeuta.id).subscribe(
          response => {
            this.paginator._intl.itemsPerPageLabel = "Pacientes por página:"
            this.dataSource = new MatTableDataSource(response)
            this.dataSource.paginator = this.paginator
            this.dataSource.sort = this.sort
          }
        )
      }
    )
  }

  blockPaciente(persona: any){
    persona.paciente.habilitado = !persona.paciente.habilitado
    this.pacientesService.changeState(persona).subscribe(
      response => {
        if(response){
          let state = (persona.paciente.habilitado) ? 'habilitado' : 'bloqueado'
          this.snackBar.open('Paciente ' + state,'Aceptar')
        }
      }
    )
  }

  sharePaciente(paciente: any){
    this.dialog.open(
      DialogComponent,
      {
        data: {
          paciente: paciente,
          share: true
        }
      }
    )
  }

  editPaciente(paciente: any){
    console.log('Feature editar paciente')

    
  }

}
