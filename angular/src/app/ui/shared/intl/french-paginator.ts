import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Subject } from 'rxjs';

@Injectable()
export class FrenchPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();
  itemsPerPageLabel = 'Éléments par page :';
  nextPageLabel = 'Page suivante';
  previousPageLabel = 'Page précédente';
  firstPageLabel = 'Première page';
  lastPageLabel = 'Dernière page';
  getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0) {
      return `Page ${page + 1} sur 1`;
    }
    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return `Affichage de ${
      startIndex + 1
    } à ${endIndex} sur ${length} éléments`;
  };
}
