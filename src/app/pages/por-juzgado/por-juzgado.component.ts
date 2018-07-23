import { Component, OnInit } from '@angular/core';
import { ProcesoService } from '../../services/proceso/proceso.service';
import { UsuarioService } from '../../services/usario/usuario.service';

@Component({
  selector: 'app-por-juzgado',
  templateUrl: './por-juzgado.component.html',
  styles: []
})
export class PorJuzgadoComponent implements OnInit {

  user_id:string;
  opcion:number = 1;
  procesos = [];
  procesosCantidad = [];
  juzgadosNombre = [];
  total;

  /////// DATOS GRAFICA BARRAS /////
  public barChartOptions:any = {};
  public barChartLabels:string[] = [];
  public barChartType:string;
  public barChartLegend:boolean;
  public barChartData:any[] = [];

  ////// DATOS GRAFICA PIE //////
  public doughnutChartLabels:string[] = [];
  public doughnutChartData:number[] = [];
  public doughnutChartType:string;

  constructor(public procesoService: ProcesoService, public usuarioService: UsuarioService) {
    if(this.opcion === 1){
      this.cargarGraficaBarras();
    }else{
      this.cargarGraficasPie();                
    }
   }

  ngOnInit() {
    let cantidad = 0;
    let totalProcesos = 0;
    
    this.procesoService.procesosPorJuzgado(this.usuarioService.usuario.id).subscribe((resp:any)=>{
      this.procesos = resp.process;
      for(let y=0; y< resp.process.length; y++){
        this.procesosCantidad.push(resp.process[y].cantidad);
        this.juzgadosNombre.push(resp.process[y].ABV);
        cantidad = resp.process[y].cantidad;
        totalProcesos += cantidad;
      }
      this.total = totalProcesos;
    });
  }

  cargarGraficaBarras(){
    this.barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true,
      
    }
  
    this.barChartLabels = this.juzgadosNombre;
    this.barChartType = 'bar';
    this.barChartLegend = true;
    this.barChartData = [
      {data: this.procesosCantidad, label: 'Procesos'}
    ];
  }

  cargarGraficasPie(){
    this.doughnutChartLabels = this.juzgadosNombre;
    this.doughnutChartData = this.procesosCantidad;
    this.doughnutChartType = 'doughnut';
  }
  
  cambiarGrafica(opcion:number){
    this.opcion = opcion;
    if(this.opcion === 1){
      this.cargarGraficaBarras();
      return;
    }else{
      this.cargarGraficasPie();
      return;
    }
  }

}
