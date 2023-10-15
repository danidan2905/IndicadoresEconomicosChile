import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './components/homepage/homepage.component';
import { RouterModule, Routes } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';


const routes: Routes = [
  {
    path: "",
    component: HomepageComponent
  }
]


@NgModule({
  declarations: [
    HomepageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule
  ]
})
export class PublicModule { }
