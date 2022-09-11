import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Chart, ChartOptions, ChartData, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import 'chartjs-plugin-datalabels';
import { PracticasService } from 'src/app/services/practicas.service';
import * as moment from 'moment';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @Input() idPaciente: number;

  @Input() tipoGrafico: ChartType;

  totalPracticas: number = 0;

  @Output()
  enviarPracticas = new EventEmitter<number>()

  public practicasSemanales = 0;
  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0
          let dataArr = ctx.chart.data.datasets[0].data
          dataArr.forEach( e => {
            sum += parseInt(e)
          })
          let percentage = (value * 100 / sum).toFixed(2) + "%"
          return percentage
        },
        color: '#fff'
      },
    },
    maintainAspectRatio: false
  };


  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: []
    }
  ];


  // Bar
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    },
    maintainAspectRatio: false
  };


  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];
  public barChartType: ChartType = 'horizontalBar'
  public barChartLegend = true;
  public barChartColors = [
    {
      backgroundColor: []
    }
  ];

  constructor(
    private practicasService: PracticasService
  ) {
    
  }

  ngOnInit(): void {

    console.log(moment(new Date()).isoWeek())

    console.log(this.tipoGrafico)

    this.practicasService.getPracticasByPaciente(this.idPaciente).subscribe(
      response => {
        console.log(response)
        if (response.pie.length != 0) {
          response.pie.forEach(e => {
            this.pieChartData.push(e.tiempo)
            this.pieChartLabels.push(e.nombre)
            this.totalPracticas = this.totalPracticas*1 + (e.practicas*1)
            this.pieChartColors[0]['backgroundColor'].push(e.color)
            this.pieChartType = this.tipoGrafico
            console.log(this.totalPracticas)
          })
        }
        this.enviarPracticas.emit(this.totalPracticas)
        if (this.totalPracticas == 0) {
          this.pieChartType='pie';
          this.pieChartLabels.push('No hay prácticas');
          this.pieChartColors[0]['backgroundColor'].push('#c5c5c5')
          this.pieChartData.push(1);
        }
        // let primerSemana = response.bar[0].semanas
        // response.bar.map(e => {
        //   if(e.semana === primerSemana){

        //   }
        // })
      }
    )

    

  }

}
