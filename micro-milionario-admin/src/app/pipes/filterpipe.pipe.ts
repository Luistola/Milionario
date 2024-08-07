import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterpipePipe implements PipeTransform {

  transform(value: any[], selectedOption: string): any[] {
    if (!selectedOption) {
      return value;
    }

    return value.filter(item => {
      return item && item.nome && item.nome.toLowerCase().includes(selectedOption.toLowerCase());
    });
  }

}
