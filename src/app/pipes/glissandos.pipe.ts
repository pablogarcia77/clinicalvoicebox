import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'glissandos'
})
export class GlissandosPipe implements PipeTransform {

  transform(value: any): string {
    return value.replace('Glissando', '');
  }

}
