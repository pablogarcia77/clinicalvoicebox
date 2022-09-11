import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HabilidadesFonatoriasService {

  private urlBase = environment.url + 'habilidades_fonatorias.php'

  constructor(
    private http: HttpClient
  ) { }

  getHabilidades():Observable<any>{
    return this.http.get(this.urlBase)
  }
}
