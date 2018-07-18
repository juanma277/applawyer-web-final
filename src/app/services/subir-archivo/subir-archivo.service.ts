import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  subirArchivo(archivo: File, user_id:string){

    return new Promise ((resolve, reject) =>{
      const formData = new FormData();
      const xhr = new XMLHttpRequest();

    formData.append('archivo', archivo, archivo.name);

    xhr.onreadystatechange = function (){
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          console.log('IMAGEN SUBIDDA');
          resolve( xhr.response);
        }else{
          console.log('ERROR EN SUBIDDA');
          resolve( xhr.response);          
        }
      }      
    };

    const url = URL_SERVICIOS +'/users/updateImagen/' + user_id + '/web';
    xhr.open('PUT', url, true);
    xhr.send(formData);
    });
    
  }
}
