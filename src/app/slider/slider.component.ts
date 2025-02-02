import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { slider } from './slider.model';

@Component({
  selector: 'app-slider',
  imports: [ReactiveFormsModule, MatSliderModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  @Output() datoEnviado = new EventEmitter<number>();

  formAngular2 = new FormGroup({
    inputValue: new FormControl('')
  });

  public slider: slider = { value: 0 };

  @Input() min: number = 1;
  @Input() max: number = 100;
  @Input() step: number = 1;
  @Input() unit: string = "Value";  

  ngOnInit() {
    this.formAngular2.get('inputValue')?.valueChanges.subscribe(value => {
      let numericValue = Number(value); 
      if (numericValue < this.min) {
        numericValue = this.min;
      } else if (numericValue > this.max) {
        numericValue = this.max;
      } 
      this.updateSliderValue(numericValue);
    });
  }

  onSliderChange(event: Event): void {
    const sliderValue = parseFloat((event.target as HTMLInputElement).value);
    this.updateSliderValue(sliderValue);
  }

  private updateSliderValue(value: any): void {
    if (!isNaN(value)) {
      this.slider.value = value.toString();
      this.formAngular2.patchValue({ inputValue: value }, { emitEvent: false });
      this.datoEnviado.emit(value);
    }
  }

  formatLabel(value: number): string {
    return `${value} ${this.unit}`;
  }
}
