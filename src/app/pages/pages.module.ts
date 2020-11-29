import { ComponentModule } from './../components/component.module';
import { SharedModule } from './../shared.module';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    HttpClientModule,
    ComponentModule,
    SharedModule,
  ],
  providers: [],
  exports:  [HomeComponent],
  bootstrap: []
})
export class PagesModule { }
