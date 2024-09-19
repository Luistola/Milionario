import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {
  transform(date: string): string {

    // const updateDate= date.split(".")[0];
    // console.log("update",updateDate);
    // console.log("first", updateDate);
    // let dateObj = new Date(updateDate);
    return new Date(date).toLocaleString();
  }
  }

