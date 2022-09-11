import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AntecedentesService {

  private urlBase = environment.url + 'antecedentes.php'

  constructor(
    private http: HttpClient
  ) { }

  getAntecedentes():Observable<any>{
    return this.http.get(this.urlBase)
  }
}
