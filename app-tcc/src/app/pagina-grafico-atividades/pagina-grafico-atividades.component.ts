import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-grafico-atividades',
  templateUrl: './pagina-grafico-atividades.component.html',
  styleUrls: ['./pagina-grafico-atividades.component.css']
})
export class PaginaGraficoAtividadesComponent implements OnInit {

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [4, 5, 7, 6], label: 'Atividades Realizadas'}
    // {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'} // 2 linhas no mesmo grafico
  ];

  constructor() { }

  ngOnInit() {
  }

}
