import { NgModule } from '@angular/core';
import { ImagenUserPipe } from './imagen-user.pipe';
import { SplitPipe } from './split.pipe';
import { ImagenAdjuntoPipe } from './imagen-adjunto.pipe';


@NgModule({
  imports: [
  ],
  declarations: [
    ImagenUserPipe,
    SplitPipe,
    ImagenAdjuntoPipe
  ], 
  exports:[
    ImagenUserPipe,
    SplitPipe,
    ImagenAdjuntoPipe
  ]
})
export class PipesModule { }
