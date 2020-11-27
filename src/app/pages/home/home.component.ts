import { MatriculaService } from './../../services/matricula.service';
import { AlunoDTO } from './../../DTO/AlunoDTO';
import { Component, ViewChild, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  Alunos: AlunoDTO[];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private matriculaService: MatriculaService) {}

  displayedColumns: string[] = ['escolaAluno', 'matriculaAluno', 'nomeAluno', 'dataNascimentoAluno', 'sexo', 'maeAluno', 'cepAluno'];
  dataSource;

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.Alunos = new Array();
    this.buscarAlunos();
    this.dataSource = new MatTableDataSource(this.Alunos);
  }

  buscarAlunos() {
    this.matriculaService.ObterAlunos().subscribe(response => {
      console.log(response);
      return this.Alunos = response;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
