import { Component, OnInit } from '@angular/core';
import { ImagemService } from '../services/imagem.service';

@Component({
  selector: 'app-visao-geral',
  templateUrl: './visao-geral.component.html',
  styleUrls: ['./visao-geral.component.css']
})
export class VisaoGeralComponent implements OnInit {

  imagePathGraficoIdade = '';
  imagePathGraficoAtividadesMes = '';
  mes = 'Novembro';

  imagePathGraficoEstados = '';

  constructor(private imagemService: ImagemService) { }

  ngOnInit() {
    this.imagePathGraficoIdade = this.imagemService.getImgUrl() + this.imagemService.getImgPathPadrao('grafico-idade');
    this.imagePathGraficoAtividadesMes = this.imagemService.getImgUrl() + this.imagemService.getImgPathPadrao('grafico-atividades');
    this.imagePathGraficoEstados = this.imagemService.getImgUrl() + this.imagemService.getImgPathPadrao('grafico-pizza');
    console.log(this.imagePathGraficoAtividadesMes);
  }

}
