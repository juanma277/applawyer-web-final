import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagenUser'
})
export class ImagenUserPipe implements PipeTransform {

  transform(imagen: string) {
    if(!imagen){
      return "http://localhost:8000/images/users/default-user-image.png";
    }
    return "http://localhost:8000/images/users/"+imagen;

  }

}
