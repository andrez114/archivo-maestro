import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'example',
})
export class ExamplePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let desc = '';
    switch (value) {
      case 0:
        desc = 'Nuevo';
        break;
      case 1:
        desc = 'Activo';
        break;
      case 2:
        desc = 'Inactivo';
        break;
      case 3:
        desc = 'Desconocido';
    }
    return desc;
  }
}
