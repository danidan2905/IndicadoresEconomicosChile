import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import { obtenerAPIService } from 'src/app/API.service';
import {MatSnackBar} from '@angular/material/snack-bar';



@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
  styleUrls: ['./registrar-cliente.component.css']
})
export class RegistrarClienteComponent implements OnInit {

  constructor(private APIClientesPOST: obtenerAPIService, private APICliente: obtenerAPIService, private snackBar: MatSnackBar) { }

  public nombre = new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);

  public apellido = new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);

  public telefono = new FormControl("", Validators.required);

  public email = new FormControl("", [Validators.email, Validators.required]);

  public verificarEmail(emailValor: string){
    let i = 0;
    while(true){
      if (this.Clientes.length == i){
        return false;
      }
      else if (emailValor == this.Clientes[i].email){
        return true;
      }
      else{
        i++;
      }
    }
  }

  datosClientes(){
    let cliente: any[] = [];
    this.APICliente.APIClientesGET().subscribe(data => {
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
  
  public Clientes:any[] = [];

  mostrarClientes(){
    console.log(this.Clientes);
  }

  public mensajeErrorEmail: boolean = true;

  enviarCliente(){
    let nuevoCliente = {
      "data": {
        "nombre": this.nombre.value,
        "apellido": this.apellido.value,
        "telefono": this.telefono.value,
        "correo": this.email.value,
      }
    };
    this.APIClientesPOST.APIClientesPOST(nuevoCliente).subscribe(
      data => {
      window.location.assign("");
    },
    (error: HttpErrorResponse) => {
      if (error.status == 400 || error.status == 500){
        this.snackBar.open("El correo introducido es incorrecto", "Cerrar");
      }
      else{
        this.snackBar.open("El correo introducido es incorrecto", "Cerrar");
      }
    }

    )
  }
  
  ngOnInit(): void {
    this.datosClientes();
  }

}
