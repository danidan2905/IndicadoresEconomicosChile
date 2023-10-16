import { Component, OnInit } from '@angular/core';
import { EnviarDatosClienteService } from '../enviar-datoscliente.service';
import {FormControl, Validators} from "@angular/forms";
import { obtenerAPIService } from 'src/app/API.service';
import { Router } from '@angular/router';
import { MenuClientesComponent } from '../menu-clientes.component';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  constructor(private datosCliente:EnviarDatosClienteService, private APICliente: obtenerAPIService, private router: Router) { }

  guardarCambios(){
    let clienteGuardado = {
      "data": {
        "nombre": this.nombre.value,
        "apellido": this.apellido.value,
        "telefono": this.telefono.value,
        "correo": this.email.value,
      }
    };
    this.APICliente.APIClientesPUT(clienteGuardado, this.clienteSeleccionado.id).subscribe(data => {return data});
    //this.router.navigate([""], {replaceUrl: true});
    window.location.assign("");
  }
  
  clienteSeleccionado: any = this.datosCliente.obtenerCliente();
  public clientes: any[] = [];
  ngOnInit(): void {
    this.emailsClientes();
  }

  public nombre = new FormControl(this.clienteSeleccionado.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
  public apellido = new FormControl(this.clienteSeleccionado.apellido, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
  public telefono = new FormControl(this.clienteSeleccionado.telefono, Validators.required);
  public email = new FormControl(this.clienteSeleccionado.email, [Validators.email, Validators.required]);

  public emailViejo: string = this.clienteSeleccionado.email;

  public verificarEmail(emailValor: string){
    let i = 0;
    while(true){
      if (emailValor == this.emailViejo){
        return false;
      }
      else if (this.EmailsClientes.length == i){
        return false;
      }
      else if (emailValor == this.EmailsClientes[i]){
        return true;
      }
      else{
        i++;
      }
    }
  }

  emailsClientes(){
    let emailsCliente: any[] = [];
    this.APICliente.APIClientesGET().subscribe(data => {
      let x = data.data.length;
      let i = 0;
      while (true){
        let agregarEmail = data.data[i].attributes.correo;
        emailsCliente.push(agregarEmail);
        if (i == (x - 1)){
          break;
        }
        else{
          i++;
        }
      }
      this.EmailsClientes = emailsCliente;
    });
  }
  
  public EmailsClientes:any[] = [];


}
