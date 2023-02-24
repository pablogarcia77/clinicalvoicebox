import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableLike } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutoperceptualService {

  private urlBase = environment.url + 'autoperceptual.php'
  
  constructor(
    private http: HttpClient,
  ) { }

  getEvaluaciones():Observable<any>{
    return this.http.get(this.urlBase)
  }

  getEvaluacionesDone(sesion: any):Observable<any>{
    return this.http.get(this.urlBase + '?sesion=' + sesion)
  }

  getCuestionario(id_tarea: number): Observable<any> {
    return this.http.get<any>(`${this.urlBase}?id_titulo=${id_tarea}`);
  }

  postNewEvaluaciones(evaluaciones: any): Observable<any> {
    return this.http.post<any>(`${this.urlBase}`, evaluaciones);
  }

  deleteEvaluacionesEnviadas(evaluaciones: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: evaluaciones,
    };

    
    return this.http.delete<any>(`${this.urlBase}`, options);
  }
}
