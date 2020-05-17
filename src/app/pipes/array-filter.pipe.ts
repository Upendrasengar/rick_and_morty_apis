import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayFilter',
  pure: false
})
export class ArrayFilterPipe implements PipeTransform {

  transform(values: Array<any>, filterList: Array<any>, ...args: unknown[]): unknown {
    if (values && values.length && filterList.length) {
      let info = [...values];
      const fList = {}
      filterList.forEach(e => {
        const type = e.type.toLowerCase();
        if (!fList[type]) {
          fList[type] = [];
        }
        fList[type].push(e.name);
      });
      const keys = Object.keys(fList);
      keys.forEach(key => {
        info = info.filter(val => {
          if (key == "origin") {
            return ~fList[key].indexOf(val.origin.name);
          }
          else if (key == "search") {
            return ~val.name.toLowerCase().indexOf(fList[key].map(e=>e.toLowerCase()));
          }
          return ~fList[key].indexOf(val[key]);
        });
      });
      return info;
    }
    return values;
  }

}
