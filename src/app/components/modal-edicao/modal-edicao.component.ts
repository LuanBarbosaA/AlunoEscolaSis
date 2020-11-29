import { element } from 'protractor';
import { AlunoDTO } from './../../DTO/AlunoDTO';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-edicao',
  templateUrl: './modal-edicao.component.html',
  styleUrls: ['./modal-edicao.component.scss']
})
export class ModalEdicaoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalEdicaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AlunoDTO
  ) { }

  aluno: AlunoDTO;

  ngOnInit(): void {
    this.aluno = this.data;
  }

  onNoClick(): void {
    this.dialogRef.close(this.data as AlunoDTO);
  }

}
