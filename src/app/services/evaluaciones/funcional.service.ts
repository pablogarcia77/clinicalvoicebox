import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Funcional } from 'src/app/models/evaluaciones/funcional';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FuncionalService {

  private urlBase = environment.url + 'funcional.php'

  constructor(
    private http: HttpClient
  ) { }

  getEvaluacionFuncionalBySesionAndPaciente(sesion: number, paciente: number): Observable<Funcional> {
    return this.http.get<Funcional>(`${this.urlBase}?paciente=${paciente}&sesion=${sesion}`);
  }

  postEvaluacionFuncional(sesion: number, funcional: Funcional): Observable<Funcional> {
    let object = {...funcional, id_sesion: sesion};
    return this.http.post<Funcional>(`${this.urlBase}`, object);
  }
}
