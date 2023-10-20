import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
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
  tabla!: MatTableDataSource<any>;
  columnas: string[] = ['id', 'nombre', 'apellido', 'telefono', 'email', 'opciones'];  
  
  constructor(private APIClientes: obtenerAPIService, private datosCliente: EnviarDatosClienteService) { }
  
  
  ngOnInit(): void {
    
    this.tabla = new MatTableDataSource();
    this.datosClientes(this.elementos, this.pagActual);
    console.log("Pagina actual" + this.pagActual)
    console.log(this.pagTotal)
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
  
  elementos: string = "5";
  pagActual: number = 1;
  pagTotal: number = 1;

  public btnDisabled1: boolean = false;
  
  cambioPaginaMAS(pagTotal: number){
    this.pagActual++;
    this.btnDisabled2 = false;
    if (this.pagActual < pagTotal){
      this.datosClientes(this.elementos, this.pagActual);
    }
    else if (this.pagActual == pagTotal){
      this.datosClientes(this.elementos, this.pagActual);
      this.btnDisabled1 = true;
    }
  }

  public btnDisabled2: boolean = true;
  cambioPaginaMENOS(pagTotal: number){
    this.pagActual--;
    this.btnDisabled1 = false;
    if(this.pagActual == 1){
      this.datosClientes(this.elementos, this.pagActual);
      this.btnDisabled2 = true;
    }
    else if (this.pagActual < pagTotal){
      this.btnDisabled2 = false;
      console.log(this.pagActual);
      this.datosClientes(this.elementos, this.pagActual);
      console.log("Faltan paginas con datos");
    }
    else if (this.pagActual == pagTotal){
      this.btnDisabled2 = false;
      this.btnDisabled1 = true;
      console.log(this.pagActual);
      this.datosClientes(this.elementos, this.pagActual);
      console.log("Ultima pagina con datos")
    }
  }
  
  datosClientes(valorElementos: string, nroPagina: number){
    let pagination = this.APIClientes.pagination.set("pagination[pageSize]", valorElementos).set("pagination[page]", nroPagina);
    this.APIClientes.opcionesGET.params = pagination;
    let cliente: cliente[] = [];
    this.APIClientes.APIClientesGET().subscribe(data => {
      this.pagActual = data.meta.pagination.page;
      this.pagTotal = data.meta.pagination.pageCount;
      if (this.pagActual == 1 && this.pagTotal == 1){
        this.btnDisabled1 = true;
        this.btnDisabled2 = true;
      }
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