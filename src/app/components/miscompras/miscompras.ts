import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { tap } from 'rxjs';
import { CuboService } from '../../services/cubo.service';
import { Compras } from '../../interfaces/miscompras.interface';

@Component({
  selector: 'app-miscompras',
  imports: [],
  templateUrl: './miscompras.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Miscompras { 

  private cuboService=inject(CuboService);

  compras=signal<Compras[]>([]);


    ngOnInit(): void {
 this.getCompras()
  } 


  getCompras(){
    this.cuboService.getMisCompras().pipe(
      tap(response => this.compras.set(response))
    ).subscribe()
  }

}
