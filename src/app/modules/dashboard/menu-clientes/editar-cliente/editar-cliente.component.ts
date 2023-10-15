import { Component, OnInit } from '@angular/core';
import { EnviarClienteService } from '../enviar-cliente.service';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  constructor(private editarCliente:EnviarClienteService) { }
  
  
  cliente: any = this.editarCliente.obtenerCliente();
  clienteEditado: any = {};
  ngOnInit(): void {
  }
  
  guardarCambios(){
    if (!(this.telefono.value == "") && !(this.direccion.value == "")){
      this.clienteEditado = {
        id: this.cliente.id,
        nombre: this.nombre.value,
        apellido: this.apellido.value,
        nroDocumento: this.documento.value,
        telefono: this.telefono.value,
        direccion: this.direccion.value
      }
    }
    else if ((this.telefono.value == "") && (this.direccion.value == "")){
      this.clienteEditado = {
        id: this.cliente.id,
        nombre: this.nombre.value,
        apellido: this.apellido.value,
        nroDocumento: this.documento.value,
        telefono: "No definido",
        direccion: "No definido"
      }
    }
    else if (this.telefono.value == ""){
      this.clienteEditado = {
        id: this.cliente.id,
        nombre: this.nombre.value,
        apellido: this.apellido.value,
        nroDocumento: this.documento.value,
        telefono: "No definido",
        direccion: this.direccion.value
      }
    }
    else if (this.direccion.value == ""){
      this.clienteEditado = {
        id: this.cliente.id,
        nombre: this.nombre.value,
        apellido: this.apellido.value,
        nroDocumento: this.documento.value,
        telefono: this.telefono.value,
        direccion: "No definido"
      }
    }
    this.editarCliente.almacenarCliente(this.clienteEditado);
  }

  public nombre = new FormControl(this.cliente.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);

  public apellido = new FormControl(this.cliente.apellido, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);

  public documento = new FormControl(this.cliente.nroDocumento, [Validators.required, Validators.pattern("^[0-9]{3}\.[0-9]{3}\.[0-9]{3}")]);

  public telefono = new FormControl(this.cliente.telefono);

  public direccion = new FormControl(this.cliente.direccion);

}
