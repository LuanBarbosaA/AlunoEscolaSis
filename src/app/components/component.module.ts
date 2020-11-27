import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AlunoComponent } from './aluno/aluno.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
        AlunoComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule
    ],
    exports: [AlunoComponent]
})
export class ComponentModule { }
