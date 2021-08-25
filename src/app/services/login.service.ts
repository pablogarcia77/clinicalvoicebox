import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlBase = environment.url + 'login.php'

  constructor(
    private http: HttpClient,
  ) {}

  postLogin(login: any):Observable<any>{
    return this.http.post(this.urlBase,login)
  }
}
