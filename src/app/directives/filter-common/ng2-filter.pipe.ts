import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false,
})
@Injectable()
export class Ng2SearchPipe implements PipeTransform {
  /**
   *
   * @param items List of items to filter
   * @param term  a string term to compare with every property of the list
   *
   */
  static filter(items: Array<{ [key: string]: any }>, term: string): Array<{ [key: string]: any }> {
    const toCompare = term.toLowerCase();

    return items.filter((item: any) => {
      for (const property in item) {
        if (item[property] === null) {
          continue;
        }
        if (
          item[property]
            .toString()
            .toLowerCase()
            .includes(toCompare)
        ) {
          return true;
        }
      }
      return false;
    });
  }

  /**
   * @param items object from array
   * @param term term's search
   */
  transform(items: any, term: string): any {
    if (!term || !items) {
      return items;
    }

    return Ng2SearchPipe.filter(items, term);
  }
}
