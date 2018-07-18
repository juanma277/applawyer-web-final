import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProcesoService, AlertaService, AdjuntoService} from '../../services/service.index';

@Component({
  selector: 'app-proceso-detalle',
  templateUrl: './proceso-detalle.component.html'
})
export class ProcesoDetalleComponent implements OnInit {

  proceso_id: string;
  contenido: string ="";
  loader: boolean = false;
  proceso = [];
  dataProceso = [];


  constructor(private route: ActivatedRoute, public procesoService: ProcesoService, public alertaService: AlertaService, public adjuntoService:AdjuntoService) {
    this.route.params.subscribe(params =>{
      this.proceso_id = params['id'];
    });
  }

  ngOnInit() {
    this.cargarProceso();
    this.alertaService.cargarAlertaPorProceso(this.proceso_id).subscribe();
    this.adjuntoService.cargarAdjuntosPorProceso(this.proceso_id).subscribe();
  }

  cargarProceso(){
    this.loader = true;
    this.procesoService.obtenerProceso(this.proceso_id).subscribe((resp:any)=>{
      if (!resp.error){
        for(let i=0; i<resp.process.length ; i++){
          this.proceso.push(resp.process[i]);
        }
        for(let y=0; y<resp.data.length ; y++){
          this.dataProceso.push(resp.data[y]);
        }
      }else{
        for(let y=0; y<resp.data.length ; y++){
          this.dataProceso.push(resp.data[y]);
        }
      }
      this.loader = false;
    });
  }

}
