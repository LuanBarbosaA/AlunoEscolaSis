import { SharedModule } from './../shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlunoComponent } from './aluno/aluno.component';
import { NgModule } from '@angular/core';
import { ModalEdicaoComponent } from './modal-edicao/modal-edicao.component';
import { ModalCriacaoComponent } from './modal-criacao/modal-criacao.component';

@NgModule({
    declarations: [
        AlunoComponent,
        ModalEdicaoComponent,
        ModalCriacaoComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [AlunoComponent]
})
export class ComponentModule { }
