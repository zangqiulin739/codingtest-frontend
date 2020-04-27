import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { PhoneNumberService } from 'src/app/services/phone-number.service';
import { flatMap, share } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-number-list',
  templateUrl: './number-list.component.html',
  styleUrls: ['./number-list.component.css']
})
export class NumberListComponent implements OnInit, OnDestroy{

  constructor(private phoneNumberService : PhoneNumberService) { };
  count : number = 0;
  private currentPhoneNumber : string = '';
  pageIndex : number = 0;
  pageSize : number = 25;
  items;
  private phoneNumberSub : Subscription;
  private pageChangeSub : Subscription;
  private countChangeSub : Subscription;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  displayedColumns : string[] = ["number"];
  hasContent : boolean = false;

  @ViewChild(MatPaginator, null) paginator : MatPaginator;

  ngOnInit() {
    this.phoneNumberSub = this.phoneNumberService.getNumber().pipe(
      flatMap(number => {
        this.currentPhoneNumber = number;
        this.pageIndex = 0;
        return this.phoneNumberService.getItems(this.currentPhoneNumber, this.pageSize, this.pageIndex);
    })).subscribe(items => {
      this.items = items;
    });

    this.countChangeSub = this.phoneNumberService.getTotalCount().subscribe(count => {
      this.count = count;
      this.hasContent = count > 0;
    })

    this.pageChangeSub = this.paginator.page.pipe(
      flatMap(page => {
        this.pageSize = page.pageSize;
        this.pageIndex = page.pageIndex;
        return this.phoneNumberService.getItems(this.currentPhoneNumber, page.pageSize, page.pageIndex);
    })).subscribe(items => {
      this.items = items;
    })
  }

  ngOnDestroy() {
    this.phoneNumberSub.unsubscribe();
    this.pageChangeSub.unsubscribe();
    this.countChangeSub.unsubscribe();
  }

}
