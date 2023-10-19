import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { ILineChart, DATA_API } from 'src/app/models/charts.interface';
import { obtenerAPIService } from 'src/app/API.service';

@Component({
  selector: 'app-utm',
  templateUrl: './utm.component.html',
  styleUrls: ['./utm.component.css']
})
export class UtmComponent implements OnInit {

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
  public datosAPI:DATA_API[] = [];
  public datosGrafica:ILineChart[] = [];
  ngOnInit(): void {
    this.obtenerAPI.APIUTM().subscribe((data) => {
      this.datosAPI[0] = data;
      this.datosGrafica = this.almacenarAPI(this.datosAPI);
      this.fuente = this.datosAPI[0].autor;
      this.unidad_medida = this.datosAPI[0].unidad_medida;
      this.dataDefault();
    });
  }
  
  public dataFiltradaFecha: ILineChart[] = [];

  public yearDefecto: string = "2023";

  public filtroYear: string = "2023";

  dataDefault(){
    this.dataFiltradaFecha = [{
      "name": "Trayectoria UTM",
      "series":[]
    }];
    let a:boolean = true;
    let i:number = 0;
    while (a){
      if (this.datosGrafica[0].series[i].name.substring(0, 4) == this.yearDefecto){
        let serie: any = {
          "value": this.datosGrafica[0].series[i].value,
          "name": this.datosGrafica[0].series[i].name.substring(5, 10)
        }
        this.dataFiltradaFecha[0].series.unshift(serie);
        i++;
      }
      else{
        a = false;
      }
    }
  }
  dataFiltroYear(filtroYear:string){
    this.dataFiltradaFecha = [{
      "name": "Trayectoria UTM",
      "series":[]
    }];
    let i:number = 0;
    for(i; i < 31; i++){
      if (this.datosGrafica[0].series[i].name.substring(0, 4) == filtroYear){
        let serie: any = {
          "value": this.datosGrafica[0].series[i].value,
          "name": this.datosGrafica[0].series[i].name.substring(5, 10)
        }
        this.dataFiltradaFecha[0].series.unshift(serie);
      }
    }
  }
}
