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

  // ELEMENT_DATA: any[] = [
  //   { positions: 1, name: "Hydrogen", weight: 1.0079, symbol: "H" },
  //   { positions: 2, name: "Helium", weight: 4.0026, symbol: "He" },
  //   { positions: 3, name: "Lithium", weight: 6.941, symbol: "Li" },
  //   { positions: 4, name: "Beryllium", weight: 9.0122, symbol: "Be" },
  //   { positions: 5, name: "Boron", weight: 10.811, symbol: "B" },
  //   { positions: 6, name: "Carbon", weight: 12.0107, symbol: "C" },
  //   { positions: 7, name: "Nitrogen", weight: 14.0067, symbol: "N" },
  //   { positions: 8, name: "Oxygen", weight: 15.9994, symbol: "O" },
  //   { positions: 9, name: "Fluorine", weight: 18.9984, symbol: "F" },
  //   { positions: 10, name: "Neon", weight: 20.1797, symbol: "Ne" }
  // ];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private matriculaService: MatriculaService) {}

  displayedColumns: string[] = ['escolaAluno', 'matriculaAluno', 'nomeAluno', 'dataNascimentoAluno', 'sexo', 'maeAluno', 'cepAluno'];
  // dataSource = new MatTableDataSource<AlunoDTO>();
  // dataSource: MatTableDataSource<AlunoDTO>;
  dataSource = new MatTableDataSource<AlunoDTO>();

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.Alunos = new Array();
    this.buscarAlunos();
  }

  buscarAlunos() {
    this.matriculaService.ObterAlunos().subscribe(response => {
      console.log(response);
      this.Alunos = response;
      // this.dataSource = new MatTableDataSource<AlunoDTO>(this.Alunos);
      this.dataSource.data = this.Alunos;
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
