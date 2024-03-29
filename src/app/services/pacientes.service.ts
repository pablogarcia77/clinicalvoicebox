import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  private urlBase = environment.url + 'pacientes.php'

  // public paciente = new BehaviorSubject<Persona>(new Persona())

  // public obsPaciente = this.paciente.asObservable()

  constructor(
    private http: HttpClient,
  ) {}

  getPacienteById(paciente: any):Observable<any>{
    return this.http.get(this.urlBase + '?paciente=' + paciente)
  }

  getAllPacientes(terapeuta: any):Observable<any>{
    return this.http.get(this.urlBase + '?terapeuta=' + terapeuta)
  }

  deletePaciente(paciente: any):Observable<any>{
    paciente.muestra = !paciente.muestra
    return this.http.delete(this.urlBase + '?id=' + paciente.id + '&muestra=' + paciente.muestra)
  }

  changeState(persona: any):Observable<any>{
    const newPaciente = {
      id_paciente: persona.paciente.id,
      habilitado: persona.paciente.habilitado
    }
    return this.http.put(this.urlBase,newPaciente)
  }

  postPaciente(paciente: any):Observable<any>{
    return this.http.post(this.urlBase,paciente)
  }

  getPacienteLocalStorage(): Persona {
    return JSON.parse(localStorage.getItem('paciente'));
  }

}
