import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValoracionesService {

  private urlBase = environment.url + 'valoraciones.php'

  constructor(
    private http: HttpClient
  ) { }

  getValoracionesIT():Observable<any>{
    return this.http.get(this.urlBase + '?indicaciones')
  }

  getVocales():Observable<any>{
    return this.http.get(this.urlBase + '?vocales')
  }

  getGlissandos():Observable<any>{
    return this.http.get(this.urlBase + '?glissandos')
  }
}
