import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { EnviarDatosClienteService } from './enviar-datoscliente.service';
import { obtenerAPIService } from 'src/app/API.service';
import {MatPaginator} from '@angular/material/paginator';

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
  tabla!: MatTableDataSource<any>;
  columnas: string[] = ['id', 'nombre', 'apellido', 'telefono', 'email', 'opciones'];

  @ViewChild(MatPaginator, {static: true}) paginador!: MatPaginator;
  
  
  
  constructor(private APIClientes: obtenerAPIService, private datosCliente: EnviarDatosClienteService) { }
  
  
  ngOnInit(): void {
    
    this.tabla = new MatTableDataSource();
    this.tabla.paginator = this.paginador;
    this.datosClientes();
  }
  
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
    let cliente: cliente[] = [];
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
      this.tabla.data = cliente;
    });
  }  
  
}