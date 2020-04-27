import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

const baseUrl = "http://localhost:8080/phone";
const countUrl = baseUrl + "/count";
const itemsUrl = baseUrl + "/items";

@Injectable({
  providedIn: 'root'
})
export class PhoneNumberService {

  constructor(private http: HttpClient) { }

  private numberSubject = new Subject<string>();
  private countSubject = new Subject<number>();

  getCount(number : string) {
    let params = new HttpParams();
    params = params.append('number', number);
    return this.http.get(countUrl, {params: params});
  }

  getItems(number: string, pageSize : number, pageNumber : number) {
    let params = new HttpParams();
    params = params.append('number', number);
    params = params.append('pageSize', pageSize.toString());
    params = params.append('pageIndex', pageNumber.toString());
    return this.http.get(itemsUrl, {params : params});
  }

  updateNumber(number : string) {
    this.numberSubject.next(number);
  }

  getNumber() : Observable<string> {
    return this.numberSubject.asObservable();
  }

  updateTotalCount(count : number) {
    this.countSubject.next(count);
  }

  getTotalCount() {
    return this.countSubject.asObservable();
  }
}
