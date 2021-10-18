import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PracticasService {

  private urlBase = environment.url + 'practicas.php'

  constructor(
    private http: HttpClient,
  ) {}

  getPracticasByPaciente(id: number):Observable<any>{
    return this.http.get(this.urlBase + '?id=' + id)
  }


}
