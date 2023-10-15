import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnviarClienteService {

  private cliente:any;

  almacenarCliente(cliente:any){
    this.cliente = cliente;
  }

  obtenerCliente(){
    return this.cliente;
  }

  constructor() { }
}
