import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IndicacionesService {

  private urlBase = environment.url + 'indicaciones.php'

  constructor(
    private http: HttpClient
  ) { }

  getIndicaciones():Observable<any>{
    return this.http.get(this.urlBase)
  }
}
