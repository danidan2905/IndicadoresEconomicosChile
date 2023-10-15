import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { ILineChart, DATA_API } from 'src/app/models/charts.interface';
import { DATA_DEFAULT } from 'src/app/models/bar-chart';
import { obtenerAPIService } from 'src/app/API.service';

@Component({
  selector: 'app-dolar',
  templateUrl: './dolar.component.html',
  styleUrls: ['./dolar.component.css']
})
export class DolarComponent implements OnInit {

  view: [number, number] = [1200, 300];
  
  // options
  legendTitle: string = "";
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Fecha';
  yAxisLabel: string = 'Valor';
  
  colorScheme: Color = { 
    domain: ['#99CCE5', '#FF7F7F'], 
    group: ScaleType.Ordinal, 
    selectable: true, 
    name: 'Customer Usage', 
  };
  
  constructor(private obtenerAPI: obtenerAPIService) {
  }

  almacenarAPI(data:DATA_API[]){
    let datos:ILineChart[] = [{
      "name": data[0].nombre,
      "series": []
    }]
    for (let i = 0; i < 31; i++){
      let serie = {
        "value": data[0].serie[i].valor,
        "name": data[0].serie[i].fecha
      }
      datos[0].series.push(serie);
    }
    return datos;
  }

  public fuente:string = "";
  public unidad_medida: string = "";
  public ano: string = "";
  public datosAPI:DATA_API[] = [];
  public datosGrafica:ILineChart[] = [];
  ngOnInit(): void {
    this.obtenerAPI.APIDolar().subscribe((data) => {
      this.datosAPI[0] = data;
      //console.log(this.datosDolarGrafica[0].nombre);
      //this.data = this.nuevosDatos(this.datosDolarGrafica);
      //this.data = this.nuevosDatos(this.datosDolarGrafica, this.rangoFecha);
      this.datosGrafica = this.almacenarAPI(this.datosAPI);
      this.dataDefault();
      this.fuente = this.datosAPI[0].autor;
      this.unidad_medida = this.datosAPI[0].unidad_medida;
      this.ano = this.datosGrafica[0].series[0].name.substring(0, 4);
      //console.log(this.ano);
    });
  }
  
  public dataFiltradaFecha: ILineChart[] = [];
  
  dataDefault(){
    this.dataFiltradaFecha = [{
      "name": "Trayectoria dólar",
      "series":[]
    }];
    for(let i = 0; i < 31; i++){
      let fecha = this.datosGrafica[0].series[i].name.substring(5, 10);
      this.dataFiltradaFecha[0].series.push({
        "value": this.datosGrafica[0].series[i].value,
        "name": fecha,
      });
    }
  }
  filtrarDatosPorFecha(rangoFecha: number){
    this.dataFiltradaFecha = [{
      "name": "Trayectoria dólar",
      "series":[]
    }];
    //this.dataFiltradaFecha[0].name = this.datosGrafica[0].name;
    if (rangoFecha == 7){
      for(let i = 0; i < rangoFecha; i++){
        let fecha = this.datosGrafica[0].series[i].name.substring(5, 10);
        this.dataFiltradaFecha[0].series.push({
          "value": this.datosGrafica[0].series[i].value,
          "name": fecha,
        });
      }
      //console.log(this.dataFiltradaFecha);
    }
    else if (rangoFecha == 15){
      for(let i = 0; i < rangoFecha; i++){
        let fecha = this.datosGrafica[0].series[i].name.substring(5, 10);
        this.dataFiltradaFecha[0].series.push({
          "value": this.datosGrafica[0].series[i].value,
          "name": fecha,
        });
      }
      //console.log(this.dataFiltradaFecha);
    }
    else if (rangoFecha == 31){
      for(let i = 0; i < (rangoFecha); i++){
        let fecha = this.datosGrafica[0].series[i].name.substring(5, 10);
        this.dataFiltradaFecha[0].series.push({
          "value": this.datosGrafica[0].series[i].value,
          "name": fecha,
        });
      }
      //rangoFecha = 31;
      //console.log(this.dataFiltradaFecha);
    }
  }
  rangoFecha: number = 31;
}
