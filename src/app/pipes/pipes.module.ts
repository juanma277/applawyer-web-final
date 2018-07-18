import { NgModule } from '@angular/core';
import { ImagenUserPipe } from './imagen-user.pipe';
import { SplitPipe } from './split.pipe';


@NgModule({
  imports: [
  ],
  declarations: [
    ImagenUserPipe,
    SplitPipe
  ], 
  exports:[
    ImagenUserPipe,
    SplitPipe 
  ]
})
export class PipesModule { }
