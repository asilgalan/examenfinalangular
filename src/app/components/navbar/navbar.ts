import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CuboService } from '../../services/cubo.service';
import { single, tap } from 'rxjs';
import { Cubos } from '../../interfaces/cubo.interface';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterOutlet],
  templateUrl: './navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar implements OnInit {


  private cubosService=inject(CuboService);
  private authservice=inject(AuthService)
  private router=inject(Router)

  cubosmarcas=signal<any |null>(null);

  ngOnInit(): void {
 this.getCubosByMarcas()
  } 

  getCubosByMarcas(){

    this.cubosService.getCubosByMarcas()
    .pipe(
      tap(response => this.cubosmarcas.set(response))
    )
    .subscribe()
  }

  mostrarLogin():boolean{
    if(this.authservice.token()){
      return true
    }

    return false
  }


  logout(){
    this.authservice.logout()

    this.router.navigateByUrl("/")
  }

}
