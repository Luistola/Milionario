import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterpipePipe implements PipeTransform {

  transform(items: any[], selectedOption: string): any[] {
    if (!items) return [];
    if (!selectedOption) return items;
    selectedOption = selectedOption.toLowerCase();
    return items.filter(it => {
      return it.nome.toLowerCase().includes(selectedOption);
    });
  }

}
