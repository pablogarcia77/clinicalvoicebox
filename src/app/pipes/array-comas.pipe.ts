import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayComas'
})
export class ArrayComasPipe implements PipeTransform {

  transform(value: any): string {
    return typeof value[0] === 'object' ? value.map(gli => gli.valoracion.replace('Glissando','')).join(', ') : value.join(', ');
  }

}
