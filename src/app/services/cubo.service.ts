import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Cubos } from '../interfaces/cubo.interface';
import { environment } from '../../environments/environment.development';
import { Compras } from '../interfaces/miscompras.interface';

@Injectable({providedIn: 'root'})
export class CuboService {

    private http=inject(HttpClient)




    getCubosByMarcas():Observable<any>{

        return this.http.get<any>(environment.API_URL+"/cubos/marcas").pipe(
            tap(response => console.log(response)
            )
        )
    }

    getCubos():Observable<any>{

        return this.http.get<any>(environment.API_URL+"/cubos").pipe(
            tap(response => console.log(response)
            )
        )
    }

    findCubosByMarcas(marca:string):Observable<Cubos[]>{

        return this.http.get<Cubos[]>(environment.API_URL+"/Cubos/CubosMarca/"+marca).pipe(
            tap(response => console.log(response)
            )
        )
    }


      getMisCompras():Observable<Compras[]>{
        return this.http.get<Compras[]>(environment.API_URL+"/compra/comprasusuario").pipe(
            tap(response => console.log(response)
            )
        )
    }

    comprarCubo(idCubo:number):Observable<any>{
        return this.http.post<any>(environment.API_URL+"/Compra/InsertarPedido/"+idCubo,{})
        .pipe(tap(response => console.log(response)
        ))
    }

    
    
}