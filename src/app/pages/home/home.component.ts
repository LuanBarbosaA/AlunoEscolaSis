import { element } from 'protractor';
import { ModalEdicaoComponent } from './../../components/modal-edicao/modal-edicao.component';
import { MatriculaService } from './../../services/matricula.service';
import { AlunoDTO } from './../../DTO/AlunoDTO';
import { Component, ViewChild, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { ModalCriacaoComponent } from 'src/app/components/modal-criacao/modal-criacao.component';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class HomeComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  alunos: AlunoDTO[];
  aluno: AlunoDTO;

  dialogOpen = true;

  displayedColumns: string[] = ['escolaAluno', 'matriculaAluno', 'nomeAluno', 'dataNascimentoAluno', 'sexo', 'maeAluno', 'cepAluno', 'delete'];
  dataSource = new MatTableDataSource<AlunoDTO>();
  loading = true;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private matriculaService: MatriculaService,
    public dialog: MatDialog) {}

  ngOnInit() {
    this.alunos = new Array();
    this.buscarAlunos();
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
  }

  buscarAlunos(): void{
    this.matriculaService.ObterAlunos().subscribe(response => {
      this.alunos = response;
      this.dataSource.data = this.alunos;
      this.loading = false;
      return this.alunos = response;
    });
  }

  alterarAluno(aluno: AlunoDTO): void{
    this.matriculaService.AlterarAluno(aluno).subscribe(response => {
      this.loading = true;
      this.buscarAlunos();
    });
  }

  cadastrarAluno(aluno: AlunoDTO): void{
    this.matriculaService.CadastrarAluno(aluno).subscribe(response => {
      this.loading = true;
      this.buscarAlunos();
    });
  }

  excluirAluno(aluno: AlunoDTO): void{
    this.dialogOpen = false;
    this.matriculaService.ExcluirAluno(aluno).subscribe(response => {
      this.loading = true;
      this.buscarAlunos();
    });
  }

  applyFilter(event: Event): void{
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialogEdicao(element: AlunoDTO): void{
    this.aluno = element;
    if (this.dialogOpen) {
      const dialogRef = this.dialog.open(ModalEdicaoComponent, {
        data: element
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
          this.aluno = result;
          this.alterarAluno(this.aluno);
        } else {
          this.aluno = element;
        }
      });
    }
    this.dialogOpen = true;
  }

  openDialogCricao(): void {
    const dialogRef = this.dialog.open(ModalCriacaoComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result) {
        this.aluno = result;
        this.cadastrarAluno(this.aluno);
      }
    });
  }

}
