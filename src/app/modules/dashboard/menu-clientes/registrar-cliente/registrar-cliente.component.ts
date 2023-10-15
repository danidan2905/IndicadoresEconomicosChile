import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { EnviarClienteService } from '../enviar-cliente.service';

@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
  styleUrls: ['./registrar-cliente.component.css']
})
export class RegistrarClienteComponent implements OnInit {

  constructor(private registroCliente: EnviarClienteService) { }

  public nombre = new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);

  public apellido = new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);

  public documento = new FormControl("", [Validators.required, Validators.pattern("^[0-9]{3}\.[0-9]{3}\.[0-9]{3}")]);

  public telefono = new FormControl("");

  public direccion = new FormControl("");

  cliente: any = {};

  nuevoCliente(){
    if (!(this.telefono.value == "") && !(this.direccion.value == "")){
      this.cliente = {
        nombre: this.nombre.value,
        apellido: this.apellido.value,
        nroDocumento: this.documento.value,
        telefono: this.telefono.value,
        direccion: this.direccion.value
      }
    }
    else if ((this.telefono.value == "") && (this.direccion.value == "")){
      this.cliente = {
        nombre: this.nombre.value,
        apellido: this.apellido.value,
        nroDocumento: this.documento.value,
        telefono: "No definido",
        direccion: "No definido"
      }
    }
    else if (this.telefono.value == ""){
      this.cliente = {
        nombre: this.nombre.value,
        apellido: this.apellido.value,
        nroDocumento: this.documento.value,
        telefono: "No definido",
        direccion: this.direccion.value
      }
    }
    else if (this.direccion.value == ""){
      this.cliente = {
        nombre: this.nombre.value,
        apellido: this.apellido.value,
        nroDocumento: this.documento.value,
        telefono: this.telefono.value,
        direccion: "No definido"
      }
    }
    this.registroCliente.almacenarCliente(this.cliente);
  }

  ngOnInit(): void {
  }

}
