import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  pure: false
})
export class SearchPipe implements PipeTransform {

  transform(value: any, query: any, type = 'normal'): any {
    if (type == 'munic') {
      return (value.find(x=>x.name == query.name));
    }

      if(!query)return true;

      return JSON.stringify(value).toLowerCase().includes(query.toLowerCase());
  }

}
