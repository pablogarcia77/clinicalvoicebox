import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Persona } from 'src/app/models/persona';
import { AutoperceptualService } from 'src/app/services/autoperceptual.service';

@Component({
  selector: 'app-evaluacion-autoperceptual',
  templateUrl: './evaluacion-autoperceptual.component.html',
  styleUrls: ['./evaluacion-autoperceptual.component.css']
})
export class EvaluacionAutoperceptualComponent implements OnInit, OnDestroy {

  public paciente: Persona

  public sesion: number

  public evaluaciones: Array<any>

  public realizadas: Array<any>

  public disabledButton: boolean = false;

  respondidos: number = 0;

  enviadas: number = 0;

  nuevas: number = 0;

  messageButton: string = 'ENVIAR AL PACIENTE';

  enviarEvaluaciones: boolean = false;

  body: any = {
    sesion: 0,
    titulos: []
  };

  autoperceptualSubscription!: Subscription;
  
  constructor(
    private autoperceptualService: AutoperceptualService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.paciente = new Persona()
    this.evaluaciones = new Array<any>()
    this.realizadas = new Array<any>()
  }

  ngOnInit(): void {
    this.paciente = JSON.parse(localStorage.getItem('paciente'))

    this.activatedRoute.params.subscribe(
      response => {
        this.sesion = response.sesion;
        this.body.sesion = this.sesion;
      }
    )

    this.getEvaluaciones();
   
  }

  ngOnDestroy(): void {
    this.autoperceptualSubscription && this.autoperceptualSubscription.unsubscribe();
  }

  unique(array){
    let hash = {}
    return array.filter( o => hash[o.id_titulo] ? false : hash[o.id_titulo] = true)
  }

  isInList(evaluacion){
    return this.realizadas.some(e => 
      e.id_titulo === evaluacion
    )
  }

  color(evaluacion){
    return this.realizadas.find( e =>
      e.id_titulo === evaluacion
    )
  }

  changeButton(event: any, evaluacion: any): void {
    const evalFind = this.realizadas.find( (obj: any) => obj.id_titulo === evaluacion.id_titulo)
    evalFind ? 
      Number(evalFind.estado) === 0 ? 
        event.checked ? this.respondidos++ : this.respondidos-- 
      : event.checked ? this.addEnviadas(evaluacion) : this.removeEnviadas(evaluacion) 
      : event.checked ? this.addNuevas(evaluacion) : this.removeNuevas(evaluacion);
    console.log(this.body)
    console.log('respondidos', this.respondidos)
    console.log('enviados', this.enviadas)
    console.log('nuevas', this.nuevas)
    this.respondidos > 0 ? this.disabledButton = true : this.disabledButtonAndMessage();
  }

  disabledButtonAndMessage(): void {
    this.disabledButton = false;
    this.disabledButton = this.enviadas > 0 && this.nuevas > 0 ? true : false;
    if (this.enviadas > 0 && this.nuevas == 0) {
      this.messageButton = 'ANULAR EVALUACIÓN';
      this.enviarEvaluaciones = true;
    }
    if (this.enviadas == 0 && this.nuevas > 0) {
      this.messageButton = 'ENVIAR AL PACIENTE';
      this.enviarEvaluaciones = false;
    }
    if (this.enviadas == 0 && this.nuevas == 0) {
      this.enviarEvaluaciones = false;
    }
  }

  addNuevas(evaluacion): void {
    this.nuevas++;
    this.body.titulos.push(evaluacion.id_titulo)
  }

  removeNuevas(evaluacion): void {
    this.nuevas--;
    this.body.titulos = this.body.titulos.filter(t => t != evaluacion.id_titulo);
  }

  addEnviadas(evaluacion): void {
    this.enviadas++;
    this.body.titulos.push(evaluacion.id_titulo)
  }

  removeEnviadas(evaluacion): void {
    this.enviadas--;
    this.body.titulos = this.body.titulos.filter(t => t != evaluacion.id_titulo);
  }

  submitForm(): void {
    if (this.nuevas > 0) {
      this.autoperceptualSubscription = this.autoperceptualService.postNewEvaluaciones(this.body).subscribe(
        resp => {
          if (resp) {
            this.getEvaluaciones();
            this.snackBar.open('Evaluaciones enviadas', 'Aceptar')
          }
        }
      );
    }

    if (this.enviadas > 0) {
      this.autoperceptualSubscription = this.autoperceptualService.deleteEvaluacionesEnviadas(this.body).subscribe(
        resp => {
          if (resp) {
            this.getEvaluaciones();
            this.snackBar.open('Evaluaciones anuladas', 'Aceptar')
            this.body.titulos = [];
          }
        }
      );
    }
    
  }

  getEvaluaciones(): void {
    this.autoperceptualSubscription = this.autoperceptualService.getEvaluaciones().subscribe(
      response => {
        this.evaluaciones = response
        console.log(this.evaluaciones)
      }
    )

    this.autoperceptualSubscription = this.autoperceptualService.getEvaluacionesDone(this.sesion).subscribe(
      response => {
        this.realizadas = this.unique(response)
      }
    )
  }

  goToCuestionario(evaluacion: any): void {
    this.router.navigate(['/terapeutas/evaluacion/autoperceptual/',this.paciente.id,this.sesion, evaluacion.id_titulo]);
  }


}
