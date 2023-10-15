import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTable} from '@angular/material/table';
import { EnviarClienteService } from './enviar-cliente.service';

export interface cliente{
  id: number,
  nombre: string,
  apellido: string,
  nroDocumento: string,
  telefono: string,
  direccion: string
}

@Component({
  selector: 'app-menu-clientes',
  templateUrl: './menu-clientes.component.html',
  styleUrls: ['./menu-clientes.component.css']
})
export class MenuClientesComponent implements OnInit {

  @ViewChild(MatTable)
  tabla!: MatTable<cliente>;

  public clientes = [
    {
      id: 1, nombre: "Juan", apellido: "Colina", nroDocumento: "302.295.533", telefono: "04126858439", direccion: "Calle 2"
    },
    {
      id: 2, nombre: "José", apellido: "Colina", nroDocumento: "123.232.102", telefono: "04126858439", direccion: "Calle 2"
    }
  ];  

  columnas: string[] = ['id', 'nombre', 'apellido', 'nroDocumento', 'telefono', 'direccion', 'opciones'];

  constructor(private idCliente:EnviarClienteService) { }

  public nuevoCliente: any = {};

  ngOnInit(): void {
    let i = 0;
    this.nuevoCliente = this.idCliente.obtenerCliente();
    while (true){
      if(this.nuevoCliente == undefined){
        break;
      }
      else if (this.nuevoCliente.id == this.clientes[i].id){
        this.clientes[i] = this.nuevoCliente;
        break;
      }
      else if((this.nuevoCliente.id != this.clientes[i].id) && (i == this.clientes.length - 1)){
        this.nuevoCliente = {
          id: this.clientes[this.clientes.length - 1].id + 1
        };
        this.nuevoCliente = {...this.nuevoCliente, ...this.idCliente.obtenerCliente()};
        if (Object.entries(this.nuevoCliente).length == 1){}
        else{
          this.clientes.push(this.nuevoCliente);
        }
        break;
      }
      i++;
    }
  }

  borrarCliente(idCliente: number){
    let elementoABorrar = this.clientes.findIndex(idBorrar => idBorrar.id === idCliente);
    this.clientes.splice(elementoABorrar, 1);
    //console.log(this.clientes);
    this.tabla.renderRows();
  }

  enviarCliente(cliente: any){
    this.idCliente.almacenarCliente(cliente);
  }
  
}