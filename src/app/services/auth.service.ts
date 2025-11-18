import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';


import { catchError, map, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({providedIn: 'root'})
export class AuthService {

    private http=inject(HttpClient);
    private _token=signal<string | null> (localStorage.getItem('token'))
    private _loginvalido=signal(false)
    private _authStatus = signal<string>('checking');

    token = computed(() => this._token());


  constructor() {
    const token = this._token();
    if (!token) {

      this._authStatus.set('not-authenticated');
    }
 
   
  }

     login(email: string, password: string): Observable<boolean> {
    return this.http
      .post<any>(environment.API_URL+"/Manage/Login", { email, password })
      .pipe(
        tap((resp)=>{
            console.log(resp.response);
            
          localStorage.setItem("token",resp.response)

         
          this._loginvalido.set(true);
          setTimeout(() => {this._loginvalido.set(false)},4000)

        } ),
        map((resp) => this.handleAuthSuccess(resp.response)),
       
      );
  }

  perfilUsuario():Observable<any>{

    return this.http.get<any>(environment.API_URL+"/Manage/PerfilUsuario").pipe(
        tap(response => console.log(response)
        )
    )
  }


      logout() {
        localStorage.removeItem('token');
    
        this._authStatus.set('not-authenticated');
        }

  

    private handleAuthSuccess(auth:any): boolean {
    this._authStatus.set('authenticated');
    console.log('Token guardado:',localStorage.getItem("token"));
    return true;
  }

}