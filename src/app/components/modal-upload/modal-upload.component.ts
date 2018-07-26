import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import swal from 'sweetalert2';
import { UsuarioService } from '../../services/usario/usuario.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  forma: FormGroup;
  imagenTemporal: string;

  constructor(public usuarioService: UsuarioService, public modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.forma = new FormGroup({
      imagen: new FormControl(null, Validators.required)
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
          text: 'El archivo seleccionado no es una imagen!',
          showConfirmButton: false,
          timer: 1500
        });
        return;
      }
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imagenTemporal = reader.result;        
        this.forma.get('imagen').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        })
      };
    }
  }

  cerrarModal(){
    this.imagenTemporal = null; 
    this.forma.setValue({
      imagen: null     
    });  
    
    this.modalUploadService.ocultarModal();
  }

  cambiarImagen(){
    this.usuarioService.actualizarImagen(this.forma.value.imagen, this.modalUploadService.id, this.usuarioService.token ).subscribe((resp:any)=>{
      this.modalUploadService.notificacion.emit(resp);
      this.cerrarModal();
    });
  }

}
