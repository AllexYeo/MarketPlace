import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productDetail'
})
export class ProductDetailPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
