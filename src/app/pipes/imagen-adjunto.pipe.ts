import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagenAdjunto'
})
export class ImagenAdjuntoPipe implements PipeTransform {

  transform(imagen: string) {
    if(!imagen){
      return "http://localhost:8000/images/adjuntos/default-image.png";
    }
    return "http://localhost:8000/images/adjuntos/"+imagen;
  }
}
