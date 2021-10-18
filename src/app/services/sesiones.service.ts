import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SesionesService {

  private urlBase = environment.url + 'sesiones.php'

  constructor(
    private http: HttpClient,
  ) {}

  getSesionesByPacienteAndTerapeuta(paciente: any,terapeuta: any):Observable<any>{
    return this.http.get(this.urlBase + '?paciente=' + paciente + '&terapeuta=' + terapeuta)
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

  postSesion(paciente: any,terapeuta: any):Observable<any>{
    let obj = {
      paciente: paciente,
      terapeuta: terapeuta
    }
    return this.http.post(this.urlBase,obj)
  }
}
