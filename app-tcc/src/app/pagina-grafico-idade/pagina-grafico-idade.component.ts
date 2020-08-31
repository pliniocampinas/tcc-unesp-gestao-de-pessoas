import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-grafico-idade',
  templateUrl: './pagina-grafico-idade.component.html',
  styleUrls: ['./pagina-grafico-idade.component.css']
})
export class PaginaGraficoIdadeComponent implements OnInit {

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['16-26', '27-37', '38-48', '49-59', '60-70', '70+'];
  public barChartType = 'line';
  public barChartLegend = true;
  public barChartData = [
    {data: [3, 5, 2, 2, 1, 2], label: 'Usuários', lineTension: 0, borderColor: 'blue', backgroundColor: 'lightblue'}
    // {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'} // 2 linhas no mesmo grafico
  ];

  constructor() { }

  ngOnInit() {
  }

}
