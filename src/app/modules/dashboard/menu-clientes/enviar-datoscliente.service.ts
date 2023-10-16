import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnviarDatosClienteService {

  private datosCliente:any;

  actualizarDatosCliente(cliente: any){
    this.datosCliente = cliente;
  }

  obtenerCliente(){
    return this.datosCliente;
  }

  constructor() { }
}
