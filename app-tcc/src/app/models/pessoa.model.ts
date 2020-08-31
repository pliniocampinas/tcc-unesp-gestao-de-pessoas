export interface Pessoa {
  id: string;
  nomeCompleto: string;
  numeroRg: string;
  orgaoEmissor: string;
  UF: string;
  CPF: string;
  filiacaoPaterna: string;
  filiacaoMaterna: string;
  dataEmissao: Date;
  email: string;
  dataNasc: Date;
  imagemRgFoto: string;
  imagemRgVerso: string;
}
