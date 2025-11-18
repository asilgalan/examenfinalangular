import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CuboService } from '../../services/cubo.service';
import { Cubos } from '../../interfaces/cubo.interface';
import { delay, tap } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CurrencyPipe],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home  implements OnInit{

 
  private cuboservice=inject(CuboService);
  cubos=signal<Cubos[]>([]);
  private router=inject(Router)

 ngOnInit(): void {

  this.cuboservice.getCubos().pipe(
    tap(response => this.cubos.set(response))
  ).subscribe()
  

  } 

  comprarCubo(idCubo: number) {

    this.cuboservice.comprarCubo(idCubo)
    .pipe(
      tap( () =>{
        alert("compra exitosa")
      }
      ),

      delay(4000),



    )
    .subscribe();


      this.router.navigateByUrl("/misCompras")

}



}
