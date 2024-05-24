import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeConcurso'
})
export class PipeConcursoPipe implements PipeTransform {

  transform = (objects: any = []) => {
    return Object.values(objects);
  }

}
