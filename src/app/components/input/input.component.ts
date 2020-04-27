import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { PhoneNumberService } from 'src/app/services/phone-number.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  constructor(private phoneNumberService : PhoneNumberService) { }
  phoneNumberRegex : RegExp = /^[+-]?[\s]?(([0-9]{3})?[\s-]?[0-9]{3}[\s-]?[0-9]{4}\s*$|\(\s?[0-9]{3}\s?\)[\s-]?[0-9]{3}[\s-]?[0-9]{4}\s*$)/;

  ngOnInit() {
    
  }

  onSubmit(phoneNumberForm) {
    this.phoneNumberService.updateNumber(phoneNumberForm.value.number);
  }


}
