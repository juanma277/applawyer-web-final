import { Component, OnInit } from '@angular/core';
import { UsuarioService, ProcesoService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  token: string;
  forma: FormGroup;
  forma2: FormGroup;
  forma3: FormGroup;
  contenido: string ="";
  loader: boolean = false;
  imagenTemporal: string;

  // Doughnut
  doughnutChartLabels:string[] = [];
  doughnutChartData:number[] = [] ;
  doughnutChartType:string = 'doughnut';
 
  constructor(public usuarioService: UsuarioService, public procesoService: ProcesoService) 
  {
    this.usuario = this.usuarioService.usuario;
    this.procesoService.cargarProcesos(this.usuario.id).subscribe();
    this.procesoService.procesosPorEstado(this.usuario.id).subscribe();
    this.procesoService.procesosPorUsuario(this.usuario.id).subscribe();    

  }

 
  ngOnInit() {

    this.cargarGraficaPie();
    
    this.token = this.usuarioService.token;
    this.forma = new FormGroup({
      nombre: new FormControl(this.usuario.nombre, Validators.required),
      email : new FormControl(this.usuario.email, [Validators.required, Validators.email]),
      direccion: new FormControl(this.usuario.direccion, Validators.required),
      telefono: new FormControl(this.usuario.telefono, Validators.required),
      descripcion: new FormControl(this.usuario.descripcion,  Validators.required),
      profesion: new FormControl(this.usuario.profesion,  Validators.required),
      notificaciones: new FormControl(this.usuario.notificaciones)
    });

    this.forma2 = new FormGroup({
      password: new FormControl(null, Validators.required),
      password2 : new FormControl(null, Validators.required),
    },{validators: this.validarPassword('password', 'password2')});

    this.forma3 = new FormGroup({
      imagen: new FormControl(null, Validators.required)
    });

    

  }

  validarPassword(campo1: string, campo2:string){

    return (group: FormGroup)=>{
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if(pass1 === pass2){
        return null;
      }

      return {
        sonIguales: true
      };
    }

  }

  actualizarDatos(){
    this.loader = true;
    this.contenido = "loading";

    if(this.forma.invalid){
      this.loader = false;
      this.contenido = "";
      swal({
        type: 'error',
        title: 'Error',
        text: 'Falta ingresar datos requeridos!'
      });
      return;
    }

    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.email,
      null,
      null,
      this.forma.value.direccion,
      this.forma.value.telefono,
      this.forma.value.descripcion,
      this.forma.value.profesion,
      null,
      null,
      null,
      null,
      this.forma.value.notificaciones,
      null,
      this.usuario.id
    );

    this.usuarioService.actualizarDatosUsuario(usuario, this.token).subscribe((resp:any)=>{
      this.loader = false;
      this.contenido = "";      
    });
  }

  actualizarPassword(){
    this.loader = true;
    this.contenido = "loading";

    if(this.forma2.invalid){
      swal({
        type: 'error',
        title: 'Error',
        text: 'Las contraseñas no son iguales!'
      });
      this.loader = false;
      this.contenido = "";
      return;
    }

    this.usuarioService.actualizarPassword(this.usuario.id, this.forma2.value.password).subscribe((resp:any)=>{
      if(resp.error){
        swal({
          type: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error, por favor intentalo nuevamente!'
        });
        this.loader = false;
        this.contenido = "";
        return;      
      }
      swal({
        type: 'success',
        title: 'Correcto',
        text: 'Correcto Contraseña Actualizada!'
      });
      
      this.loader = false;
      this.contenido = "";
      this.forma2.setValue({
        password: '',
        password2: ''        
      });

      return;
    }, error =>{
      swal({
        type: 'error',
        title: 'Error',
        text: 'Ha ocurrido un error, por favor intentalo nuevamente!'
      });
        this.loader = false;
        this.contenido = "";
        return;       
    });
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
        this.forma3.get('imagen').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        })
      };
    }
  }

  actualizarImagen(){
    this.loader = true;
    this.contenido = "loading";

    if(this.forma3.invalid){
      swal({
        type: 'error',
        title: 'Error',
        text: 'No hay selección de imagen!'
      });
      this.loader = false;
      this.contenido = "";
      return;
    }
    
    this.usuarioService.actualizarImagen(this.forma3.value.imagen, this.usuario.id, this.token).subscribe(resp=>{
        this.loader = false;
        this.contenido = "";
        this.imagenTemporal = null;
    }, error =>{
      swal({
        type: 'error',
        title: 'Error',
        text: 'Ha ocurrido un error, por favor intentalo nuevamente!'
      });
      this.loader = false;
      this.contenido = "";
      return;      
    });
  }

  cargarGraficaPie(){
    for(let y=0; y< this.procesoService.procesos.length; y++){
      this.doughnutChartData.push(this.procesoService.procesos[y].cantidad);
      this.doughnutChartLabels.push(this.procesoService.procesos[y].estado);
    }
  }
}
