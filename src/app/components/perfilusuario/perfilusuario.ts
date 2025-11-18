import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { single, tap } from 'rxjs';

@Component({
  selector: 'app-perfilusuario',
  imports: [],
  templateUrl: './perfilusuario.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Perfilusuario implements OnInit {

  
  private authservice=inject(AuthService);

  usuario=signal<any |null>(null);


    ngOnInit(): void {
 this.getPerfilUsuario()
  } 


  getPerfilUsuario(){
    this.authservice.perfilUsuario().pipe(
      tap(response => this.usuario.set(response))
    ).subscribe()
  }


}
