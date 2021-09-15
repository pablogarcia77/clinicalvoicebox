import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profesion } from '../models/profesion';

@Injectable({
  providedIn: 'root'
})
export class ProfesionesService {

  private urlBase = environment.url + 'profesiones.php'

  constructor(
    private http: HttpClient
  ) { }

  getAll():Observable<any>{
    return this.http.get(this.urlBase)
  }

  getPais(profesion: Profesion):Observable<any>{
    return this.http.get(this.urlBase + '?id=' + profesion.id)
  }

}
