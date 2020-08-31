import { Injectable } from '@angular/core';
import { Pessoa } from '../models/pessoa.model';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Imagem64Service } from './imagem64.service';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  // private listaPessoas: Pessoa[] = [];
  // private listaPessoasUpdated = new Subject<Pessoa[]>();

  uri = 'http://localhost:4000';


  constructor(private http: HttpClient, private imagem64Service: Imagem64Service) { }

  getPessoas() {
    // Usa template string para concatenar caminho
    return this.http.get(`${this.uri}/pessoas`);
  }

  getPessoaById(id) {
    return this.http.get(`${this.uri}/pessoas/${id}`);
  }

  // Versao recebendo id
  addPessoa(pNomeCompleto, pNumeroRg, pOrgaoEmissor, pUF, pCPF, pDataNasc, pFiliacaoPaterna, pFiliacaoMaterna, pDataEmissao,
            pImagemRgFoto, pImagemRgVerso) {
    const pessoaCadastrada = {
      nomeCompleto: pNomeCompleto,
      numeroRg: pNumeroRg,
      orgaoEmissor: pOrgaoEmissor,
      UF: pUF,
      CPF: pCPF,
      dataNasc: pDataNasc,
      filiacaoPaterna: pFiliacaoPaterna,
      filiacaoMaterna: pFiliacaoMaterna,
      dataEmissao: pDataEmissao,
      imagemRgFoto: pImagemRgFoto,
      imagemRgVerso: pImagemRgVerso
    };
    return this.http.post(`${this.uri}/pessoas/cadastrar`, pessoaCadastrada);
  }
  updatePessoa(pId, pNomeCompleto, pNumeroRg, pOrgaoEmissor, pUF, pCPF, pDataNasc, pFiliacaoPaterna, pFiliacaoMaterna, pDataEmissao,
               pImagemRgFoto, pImagemRgVerso) {
    const pessoaEditada = {
      nomeCompleto: pNomeCompleto,
      numeroRg: pNumeroRg,
      orgaoEmissor: pOrgaoEmissor,
      UF: pUF,
      CPF: pCPF,
      dataNasc: pDataNasc,
      filiacaoPaterna: pFiliacaoPaterna,
      filiacaoMaterna: pFiliacaoMaterna,
      dataEmissao: pDataEmissao,
      imagemRgFoto: pImagemRgFoto,
      imagemRgVerso: pImagemRgVerso
    };
    console.log('Chamou edição');
    console.log(pId);

    return this.http.post(`${this.uri}/pessoas/editar/${pId}`, pessoaEditada);
  }

  deletePessoa(pId) {
    return this.http.get(`${this.uri}/pessoas/excluir/${pId}`);
  }

  // Métodos uteis
  FormatDate(iDate: Date) {
    const inputDate = new Date(iDate);
    let formattedDate = inputDate.getFullYear() + '-';
    if ((inputDate.getMonth() + 1) < 10) {
      formattedDate += '0' + (inputDate.getMonth() + 1);
    } else {
      formattedDate += (inputDate.getMonth() + 1);
    }
    // Se a data for < 10, nao pode esquecer o zero a esquerda
    if ( (inputDate.getDate() + 1) < 10) {
      formattedDate += '-0' + (inputDate.getDate() + 1);
    } else {
      formattedDate += '-' + (inputDate.getDate() + 1);
    }
    return formattedDate;
  }

// Versao recebendo objeto e retornando observable
addPessoaS(pNomeCompleto, pNumeroRg, pOrgaoEmissor, pUF, pCPF, pDataNasc, pFiliacaoPaterna, pFiliacaoMaterna, pDataEmissao,
           pImagemRgFoto, pImagemRgVerso) {

    // let ob: Observable;

    const pessoaCadastrada = {
    nomeCompleto: pNomeCompleto,
    numeroRg: pNumeroRg,
    orgaoEmissor: pOrgaoEmissor,
    UF: pUF,
    CPF: pCPF,
    dataNasc: pDataNasc,
    filiacaoPaterna: pFiliacaoPaterna,
    filiacaoMaterna: pFiliacaoMaterna,
    dataEmissao: pDataEmissao,
    imagemRgFoto: pImagemRgFoto,
    imagemRgVerso: pImagemRgVerso
    };
    // return this.http.post(`${this.uri}/pessoas/cadastrar`, pessoaCadastrada);
     // return ob;
  }

}
// Versão antiga dos métodos, guardavam tudo na memória local, foi alterado para ler e gravar do banco
/*
  getListaPessoas() {
    // [...] os 3 pontos mandam uma cópia do objeto, não o endereço do objeto
    return [...this.listaPessoas];
  }

  getListaPessoasUpdateListerner() {
    // retorna um observable da lista de pessoas
    return this.listaPessoasUpdated.asObservable();
  }

  pushListaPessoas(pessoa: Pessoa) {
    // atualiza o objeto private
    this.listaPessoas.push(pessoa);
    // atualiza o observable/subject
    this.listaPessoasUpdated.next([...this.listaPessoas]);
  }
}
*/
