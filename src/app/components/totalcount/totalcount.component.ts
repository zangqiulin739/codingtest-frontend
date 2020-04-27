import { Component, OnInit, OnDestroy } from '@angular/core';
import { PhoneNumberService } from 'src/app/services/phone-number.service';
import { flatMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-totalcount',
  templateUrl: './totalcount.component.html',
  styleUrls: ['./totalcount.component.css']
})
export class TotalcountComponent implements OnInit, OnDestroy {

  constructor(private phoneNumberService : PhoneNumberService) { }
  count;
  private subscription : Subscription

  ngOnInit() {
    this.subscription = this.phoneNumberService.getNumber()
    .pipe(flatMap(number => { return this.phoneNumberService.getCount(number) }))
    .subscribe(count => {
      this.count = count;
      this.phoneNumberService.updateTotalCount(+count);
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
