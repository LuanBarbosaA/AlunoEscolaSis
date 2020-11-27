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

  CadastrarAluno(aluno: AlunoDTO): Observable<string> {
    return this.http.post<string>(environment.api + this.route, aluno);
  }

  ObterAlunos(): Observable<Array<AlunoDTO>> {
    return this.http.get<Array<AlunoDTO>>(environment.api + this.route);
  }
}
