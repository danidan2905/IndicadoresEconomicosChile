import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTable} from '@angular/material/table';
import { EnviarDatosClienteService } from './enviar-datoscliente.service';
import { obtenerAPIService } from 'src/app/API.service';

export interface cliente{
  id: number,
  nombre: string,
  apellido: string,
  telefono: string,
  email: string
}

@Component({
  selector: 'app-menu-clientes',
  templateUrl: './menu-clientes.component.html',
  styleUrls: ['./menu-clientes.component.css']
})
export class MenuClientesComponent implements OnInit {
  @ViewChild(MatTable)
  tabla!: MatTable<cliente>; 

  columnas: string[] = ['id', 'nombre', 'apellido', 'telefono', 'email', 'opciones'];
  
  constructor(private APIClientes: obtenerAPIService, private datosCliente: EnviarDatosClienteService) { }

  enviarDatosCliente(cliente: any){
    this.datosCliente.actualizarDatosCliente(cliente);
  }

  eliminarCliente(id: string){
    this.APIClientes.APIClientesDELETE(id).subscribe(data => {
      console.log(data);
      window.location.reload();
    })
  }

  datosClientes(){
    let cliente: any[] = [];
    this.APIClientes.APIClientesGET().subscribe(data => {
      let x = data.data.length;
      let i = 0;
      while (true){
        let agregarObj = {
          id: data.data[i].id,
          nombre: data.data[i].attributes.nombre,
          apellido: data.data[i].attributes.apellido,
          telefono: data.data[i].attributes.telefono,
          email: data.data[i].attributes.correo
        }
        cliente.push(agregarObj);
        if (i == (x - 1)){
          break;
        }
        else{
          i++;
        }
      }
      this.Clientes = cliente;
    });
  }  

  Clientes:cliente[] = [];

  ngOnInit(): void {
    this.datosClientes();
  }
  
  
}