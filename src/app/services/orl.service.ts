import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrlService {

  private urlBase = environment.url + 'orl.php'

  constructor(
    private http: HttpClient
  ) { }

  getOrls():Observable<any>{
    return this.http.get(this.urlBase)
  }
}
