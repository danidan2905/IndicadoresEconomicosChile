import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DATA_API} from "./models/charts.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class obtenerAPIService {

  private urlAPIDolar = "https://mindicador.cl/api/dolar";

  private urlAPIUF = "https://mindicador.cl/api/uf";

  private urlAPIUTM = "https://mindicador.cl/api/utm";

  constructor(private http: HttpClient) { }

  public APIDolar(): Observable<DATA_API>{
    return this.http.get<DATA_API>(this.urlAPIDolar); //Obtiene https://mindicador.cl/api/dolar
  }

  public APIUTM(): Observable<DATA_API>{
    return this.http.get<DATA_API>(this.urlAPIUTM); //Obtiene https://mindicador.cl/api/dolar
  }

  public APIUF(): Observable<DATA_API>{
    return this.http.get<DATA_API>(this.urlAPIUF); //Obtiene https://mindicador.cl/api/dolar
  }

}
