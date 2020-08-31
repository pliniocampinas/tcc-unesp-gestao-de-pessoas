import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

    // Métodos uteis
  FormatDate(iDate: Date) {
    const inputDate = new Date(iDate);
    let formattedDate = inputDate.getFullYear() + '-';
    if ((inputDate.getMonth() + 1) < 10) {
      formattedDate += '0' + (inputDate.getMonth() + 1);
    } else {
      formattedDate += (inputDate.getMonth() + 1);
    }
    // Se a data for < 10, nao pode esquecer o zero a esquerda
    if ( (inputDate.getDate() + 1) < 10) {
      formattedDate += '-0' + (inputDate.getDate() + 1);
    } else {
      formattedDate += '-' + (inputDate.getDate() + 1);
    }
    return formattedDate;
  }
}
