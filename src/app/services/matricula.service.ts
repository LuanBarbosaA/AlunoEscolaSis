import { environment } from './../../environments/environment';
import { AlunoDTO } from './../DTO/AlunoDTO';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {

  constructor(private http: HttpClient) { }

  route = 'matriculas';

  ObterAlunos(): Observable<Array<AlunoDTO>> {
    return this.http.get<Array<AlunoDTO>>(environment.api + this.route);
  }

  CadastrarAluno(aluno: AlunoDTO): Observable<string> {
    return this.http.post<string>(environment.api + this.route, aluno);
  }

  AlterarAluno(aluno: AlunoDTO): Observable<AlunoDTO> {
    return this.http.put<AlunoDTO>(`${environment.api}${this.route}/${aluno.matriculaAluno}`, aluno);
  }

  ExcluirAluno(aluno: AlunoDTO): Observable<string> {
    return this.http.delete<string>(environment.api + this.route + `/${aluno.matriculaAluno}`);
  }

}
