import { PagesRoutingModule } from './pages/pages-routing.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes), PagesRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
