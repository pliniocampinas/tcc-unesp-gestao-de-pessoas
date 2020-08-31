import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-grafico-estados',
  templateUrl: './pagina-grafico-estados.component.html',
  styleUrls: ['./pagina-grafico-estados.component.css']
})
export class PaginaGraficoEstadosComponent implements OnInit {

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['SP', 'MG', 'RJ', 'PR', 'Outros'];
  public barChartType = 'pie';
  public barChartLegend = true;
  public barChartData = [
    {data: [5, 1, 1, 1, 1], label: 'Pessoas'}
    // {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'} // 2 linhas no mesmo grafico
  ];

  constructor() { }

  ngOnInit() {
  }

}
