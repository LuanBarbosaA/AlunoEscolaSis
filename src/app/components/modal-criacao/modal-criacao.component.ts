import { AlunoDTO } from './../../DTO/AlunoDTO';
import { MatriculaService } from './../../services/matricula.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-criacao',
  templateUrl: './modal-criacao.component.html',
  styleUrls: ['./modal-criacao.component.scss'],
})
export class ModalCriacaoComponent implements OnInit {

  aluno: AlunoDTO;

  sexoControl = new FormControl('', Validators.required);

  constructor(public dialogRef: MatDialogRef<ModalCriacaoComponent>) { }

  ngOnInit(): void {
    this.aluno = new AlunoDTO();
  }

  closeDialogCricao(): void {
    if (String(this.sexoControl.value).length > 0) {
      this.aluno.sexo = this.sexoControl.value;
    }
    const dialogRef = this.dialogRef.close(this.aluno);
  }

  onNoClick(): void {
    this.dialogRef.close(this.aluno as AlunoDTO);
  }

}
