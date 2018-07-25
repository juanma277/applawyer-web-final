import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProcesoService, AlertaService, AdjuntoService} from '../../services/service.index';
import { Alerta } from '../../models/alerta.model';
import swal from 'sweetalert2';
import { Adjunto } from '../../models/adjunto.model';
import { URL_SERVICIOS } from '../../config/config';


@Component({
  selector: 'app-proceso-detalle',
  templateUrl: './proceso-detalle.component.html'
})
export class ProcesoDetalleComponent implements OnInit {

  nAlerta:boolean = false;
  eAlerta:boolean = false;
  nAdjunto:boolean = false;
  eAdjunto:boolean = false;
  proceso_id: string;
  contenido: string ="";
  loader: boolean = false;
  proceso = [];
  dataProceso = [];
  forma: FormGroup;
  forma2: FormGroup;
  forma3: FormGroup;
  forma4: FormGroup;
  imagenTemporal: string = '';
  imagenTemporal2: string = '';
  alerta: Alerta = {};
  adjunto: Adjunto = {};
  imagenAdjunto:string;
  URL_DOWNLOAD_EXCEL:string;
  URL_DOWNLOAD_PDF:string; 

  constructor(private route: ActivatedRoute, public procesoService: ProcesoService, public alertaService: AlertaService, public adjuntoService:AdjuntoService) {
    this.route.params.subscribe(params =>{
      this.proceso_id = params['id'];
    });
  }

  ngOnInit() {
    this.cargarProceso();
    this.URL_DOWNLOAD_PDF = URL_SERVICIOS+"/download/PDF/actuacionProceso/"+this.proceso_id;
    this.URL_DOWNLOAD_EXCEL = URL_SERVICIOS+"/download/XLS/actuacionProceso/"+this.proceso_id;
    this.alertaService.cargarAlertaPorProceso(this.proceso_id).subscribe();
    this.adjuntoService.cargarAdjuntosPorProceso(this.proceso_id).subscribe();

    this.forma = new FormGroup({
      descricpion1: new FormControl(null, Validators.required),
      fecha: new FormControl(null,  Validators.required),
      hora: new FormControl(null, Validators.required)
    });

    this.forma2 = new FormGroup({
      imagen: new FormControl(null, Validators.required),
      descricpion2: new FormControl(null, Validators.required)
    });

    this.forma3 = new FormGroup({
      descricpion_edit: new FormControl(null, Validators.required),
      fecha_edit: new FormControl(null,  Validators.required),
      hora_edit: new FormControl(null, Validators.required),
      id: new FormControl(null, Validators.required)
    });

    this.forma4 = new FormGroup({
      imagen: new FormControl(null),
      descricpion_edit_adjunto: new FormControl(null, Validators.required),
      id_adjunto: new FormControl(null, Validators.required)
    });
  }

  cargarProceso(){
    this.loader = true;
    this.dataProceso = [];
    this.proceso = [];
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
    }, error =>{
      swal({
        type: 'error',
        title: 'Error',
        text: 'Ha ocurrido un error, por favor intentalo nuevamente!'
      });
      return;
    });
  }

  cambiarEstado(estado:string){
    this.loader = true;
    this.procesoService.modificarEstado(this.proceso_id, estado ).subscribe((resp:any)=>{
      if(!resp.error){
        this.cargarProceso();        
        this.loader = false;
      }
    }, error =>{
      swal({
        type: 'error',
        title: 'Error',
        text: 'Ha ocurrido un error, por favor intentalo nuevamente!'
      });
      return;
    });  
  }

  nuevaAlerta(opcion:string, alerta_id:string){
    this.nAlerta = true;
    this.nAdjunto = false;
    this.contenido = "loading";
  }

  nuevoAdjunto(){
    this.nAdjunto = true;
    this.nAlerta = false;
    this.contenido = "loading";
  }

  ventanaEditarAlerta(id:string){
    this.eAlerta = true;
    this.alertaService.cargarDatosAlerta(id).subscribe((resp:any)=>{
      if(!resp.error){
        this.forma3.setValue({
          descricpion_edit: resp.alarma.descripcion,
          fecha_edit: resp.alarma.fecha,
          hora_edit: resp.alarma.hora,
          id: resp.alarma.id
        });
      }
    });
  }

  ventanaEditarAdjunto(id:string){
    this.eAdjunto = true;
    this.adjuntoService.cargarDatosAdjunto(id).subscribe((resp:any)=>{
      console.log(resp);
      if(!resp.error){
        this.imagenAdjunto = resp.adjunto.archivo;
        this.forma4.setValue({
          descricpion_edit_adjunto: resp.adjunto.descripcion,
          id_adjunto: resp.adjunto.id,
          imagen: null
        });
      }
    });
  }

  cerrarModal(){
    this.nAlerta = false;
    this.nAdjunto = false;
    this.eAlerta = false;
    this.eAdjunto = false;
    this.contenido = "";
  }

  crearAlerta(){
    this.loader = true;
    if(this.forma.invalid){
      swal({
        type: 'error',
        title: 'Error',
        text: 'Faltan datos requeridos!'
      });
      return;
    }
    this.alerta.proceso_id = this.proceso_id;
    this.alerta.descripcion = this.forma.value.descricpion1;
    this.alerta.fecha = this.forma.value.fecha;
    this.alerta.hora = this.forma.value.hora;

    this.alertaService.crearAlerta(this.alerta).subscribe((resp:any)=>{
      if(resp.error){
        swal({
          type: 'error',
          title: 'Error',
          text: 'Faltan datos requeridos!'
        });

        this.loader = false;
        return;
      }else{
        swal({
          type: 'success',
          title: 'Correcto',
          text: 'Alarma creada!'
        });
        this.loader = false;   
        this.nAlerta = false;     
        this.alerta  = {};
        this.forma.setValue({
          descricpion1: null,
          fecha: null,
          hora: null,
        });
        return;
      }
    }, error =>{
        swal({
          type: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error, por favor intentalo nuevamente!'
        });
        this.loader = false;                
        return;
    });
  }

  crearAdjunto(){
    this.loader = true;
    this.contenido = "loading";

    if(this.forma2.invalid){
      swal({
        type: 'error',
        title: 'Error',
        text: 'No hay selección de imagen!'
      });
      this.loader = false;
      this.contenido = "";
      return;
    }

    this.adjunto.archivo = this.forma2.value.imagen;
    this.adjunto.descripcion = this.forma2.value.descricpion2;
    this.adjunto.proceso_id = this.proceso_id;
    
    this.adjuntoService.crearAdjunto(this.adjunto).subscribe((resp:any)=>{
      if(resp.error){
        swal({
          type: 'error',
          title: 'Error',
          text: 'Faltan datos requeridos!'
        });

        this.loader = false;
        return;
      }else{
        swal({
          type: 'success',
          title: 'Correcto',
          text: 'Adjunto creado!'
        });
        this.loader = false;   
        this.imagenTemporal = '';
        this.nAdjunto = false;     
        this.adjunto  = {};
        this.forma2.setValue({
          imagen: null,
          descricpion2: null,
        });
        return;
      }
    }, error =>{
        swal({
          type: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error, por favor intentalo nuevamente!'
        });
        this.loader = false;                
        return;
    });
  }

  editarAlerta(){
    if(this.forma3.invalid){
      swal({
        type: 'error',
        title: 'Error',
        text: 'Faltan datos requeridos!'
      });
      return;
    }

    this.alerta.proceso_id = this.proceso_id;
    this.alerta.descripcion = this.forma3.value.descricpion_edit;
    this.alerta.fecha = this.forma3.value.fecha_edit;
    this.alerta.hora = this.forma3.value.hora_edit;
    this.alerta.id = this.forma3.value.id;

    this.alertaService.actualizarAlerta(this.alerta).subscribe((resp:any)=>{
      swal({
        type: 'success',
        title: 'Correcto',
        text: 'Alarma Actualizada!'
      });
      this.eAlerta = false;
      return;       
    }, error =>{
      swal({
        type: 'error',
        title: 'Error',
        text: 'Faltan datos requeridos!'
      });
      return;      
    });
  }

  editarAdjunto(){
    if(this.forma4.invalid){
      swal({
        type: 'error',
        title: 'Error',
        text: 'Faltan datos requeridos!'
      });
      return;
    }

    this.adjunto.archivo = this.forma4.value.imagen;
    this.adjunto.descripcion = this.forma4.value.descricpion_edit_adjunto;
    this.adjunto.id = this.forma4.value.id_adjunto;
    this.adjunto.proceso_id = this.proceso_id;

    this.adjuntoService.actualizarAdjunto(this.adjunto).subscribe((resp:any)=>{
      swal({
        type: 'success',
        title: 'Correcto',
        text: 'Adjunto Actualizado!'
      });
      this.eAdjunto = false;
      return;       
    }, error =>{
      swal({
        type: 'error',
        title: 'Error',
        text: 'Faltan datos requeridos!'
      });
      return;      
    });
  }

  eliminarAlerta(id:string){
    swal({
      title: 'Eliminar Alerta',
      text: "¿Seguro que deseas eliminar la alerta?",
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.value) {
        this.alertaService.eliminarAlerta(id, this.proceso_id).subscribe();
      }
    })
  }

  eliminarAdjunto(id:string){
    swal({
      title: 'Eliminar Adjunto',
      text: "¿Seguro que deseas eliminar el adjunto?",
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.value) {
        this.adjuntoService.eliminarAdjunto(id, this.proceso_id).subscribe();
      }
    })    
  }

  seleccionImagen(event){
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      if(file.type.indexOf('image')<0){
        swal({
          type: 'error',
          title: 'Error',
          text: 'El archivo seleccionado no es una imagen!'
        });
        return;
      }
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imagenTemporal = reader.result;        
        this.forma2.get('imagen').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        })
      };
    }
  }


  seleccionImagenEdit(event){
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      if(file.type.indexOf('image')<0){
        swal({
          type: 'error',
          title: 'Error',
          text: 'El archivo seleccionado no es una imagen!'
        });
        return;
      }
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imagenTemporal2 = reader.result;        
        this.forma4.get('imagen').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        })
      };
    }
  }

  modalImagen(){
    let selectores:any = document.getElementsByClassName('modal-container');
    for(let ref of selectores){
      ref.classList.add('active');
      ref.stopPropagation();
      break;  
    }
  }

}
