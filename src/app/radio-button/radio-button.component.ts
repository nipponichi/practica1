import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-radio-button',
  imports: [MatRadioModule],
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent {
  @Input() option1Label: string = "Male";
  @Input() option2Label: string = "Female";
  @Input() option1Value: boolean = true;
  @Input() option2Value: boolean = false;
  @Input() selectedValue: boolean = true;

  @Output() value = new EventEmitter<boolean>();

  onSelectionChange(value: boolean) {
    this.selectedValue = value;
    this.value.emit(this.selectedValue);
  }
}