import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {DATA_API} from "./models/charts.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class obtenerAPIService {

  private urlAPIClientes = "https://apicreditapp.keotecnologia.com/api/clientes/";

  headers = {
    "headers": {
      'Authorization': 'Bearer 08c9130ccbb5428dd901f41beae9830ccda5e186cbe1225b2f1096412f07ea35ef2959b00232a3f03b3194df704dccc99522f930d07feb1c408e79fcc5a3d1950fa0b3a039dbe0f4a7421c2968f2a5111f144bab15d1c141331ff4dc3b75e033de2714a2ab319591934bfee045df453566e026c9157bf4e847ed5258394824bb'
    }
  }

  public nroDatos: string = "5";
  public nroPagina: string = "1";
  public headersGET = new HttpHeaders()
  .set('Authorization', 'Bearer 08c9130ccbb5428dd901f41beae9830ccda5e186cbe1225b2f1096412f07ea35ef2959b00232a3f03b3194df704dccc99522f930d07feb1c408e79fcc5a3d1950fa0b3a039dbe0f4a7421c2968f2a5111f144bab15d1c141331ff4dc3b75e033de2714a2ab319591934bfee045df453566e026c9157bf4e847ed5258394824bb')
  public pagination = new HttpParams().set('pagination[page]', this.nroPagina).set('pagination[pageSize]', this.nroDatos);

  opcionesGET = {
    headers: this.headersGET,
    params: this.pagination
  }

  bodyPOSTClientes = {
    "data": {
      "nombre": "Defecto",
      "apellido": "Defecto",
      "telefono": "0416728289",
      "correo": "abc@gmail.com",
    }
  };

  private urlAPIDolar = "https://mindicador.cl/api/dolar";

  private urlAPIUF = "https://mindicador.cl/api/uf";

  private urlAPIUTM = "https://mindicador.cl/api/utm";


  constructor(private http: HttpClient) { }

  public objetivoEncontrado = {}

  public APIClientesBuscador(objetivo: string, index: number){
    let filtros = ["nombre", "apellido", "correo"];
    let URLAPIBuscar = "https://apicreditapp.keotecnologia.com/api/clientes?filters[" + filtros[index] + "][$eq]=" + objetivo;
    return this.http.get<any>(URLAPIBuscar, this.opcionesGET);
  }

  public APIClientesGET(): Observable<any>{
    return this.http.get<any>(this.urlAPIClientes, this.opcionesGET);
  }

  public APIClientesDELETE(idCliente: string): Observable<any>{
    return this.http.delete<any>(this.urlAPIClientes + idCliente, this.headers);
  }

  public APIClientesPOST(bodyPOST: any): Observable<any>{
    return this.http.post<any>(this.urlAPIClientes, bodyPOST, this.headers);
  }

  public APIClientesPUT(bodyPUT: any, idCliente:string): Observable<any>{
    return this.http.put<any>(this.urlAPIClientes + idCliente, bodyPUT, this.headers);
  }

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
