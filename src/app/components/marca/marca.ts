import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CuboService } from '../../services/cubo.service';
import { Cubos } from '../../interfaces/cubo.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, tap } from 'rxjs';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-marca',
  imports: [CurrencyPipe],
  templateUrl: './marca.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Marca implements OnInit {

private cubosService=inject(CuboService);

  cubos=signal<Cubos[]>([]);

  private router=inject(Router)
  private activateRouter=inject(ActivatedRoute)
  marca:string=''

  ngOnInit(): void {

    this.activateRouter.paramMap.subscribe(params =>{

      this.marca=params.get('marca') ?? ''

      if(this.marca !=''){

        this.findByMarca(this.marca);

      }

    
    })
   
  }

  findByMarca(marca:string){
    this.cubosService.findCubosByMarcas(marca).pipe(
      tap(response => this.cubos.set(response))
    ).subscribe()

  }

   comprarCubo(idCubo: number) {
  
      this.cubosService.comprarCubo(idCubo)
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
