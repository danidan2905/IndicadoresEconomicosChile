import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';

import { RouterModule, Routes } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import { DolarComponent } from './dolar/dolar.component';
import { UtmComponent } from './utm/utm.component';
import { UfComponent } from './uf/uf.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { MenuClientesComponent } from './menu-clientes/menu-clientes.component';
import {EditarClienteComponent} from "./menu-clientes/editar-cliente/editar-cliente.component"
import {RegistrarClienteComponent} from "./menu-clientes/registrar-cliente/registrar-cliente.component"
import {MatPaginatorModule} from '@angular/material/paginator';



const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children:[
      {
        path:"",
        component: MenuClientesComponent
      },
      {
        path:"registrarCliente",
        component: RegistrarClienteComponent
      },
      {
        path:"editarCliente",
        component: EditarClienteComponent
      },
      {
        path: "dolar",
        component: DolarComponent
      },
      {
        path: "UTM",
        component: UtmComponent
      },
      {
        path: "UF",
        component: UfComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    DashboardComponent,
    DolarComponent,
    UtmComponent,
    UfComponent,
    MenuClientesComponent,
    RegistrarClienteComponent,
    EditarClienteComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    NgxChartsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class DashboardModule { }
