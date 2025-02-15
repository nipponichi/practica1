import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Slider } from './slider.model';

@Component({
  selector: 'app-slider',
  imports: [ReactiveFormsModule, MatSliderModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatIconModule, MatTooltipModule
  ],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  @Output() receivedData = new EventEmitter<number>();

  formAngular2 = new FormGroup({
    inputValue: new FormControl('')
  });

  @Input() min: number = 15;
  @Input() max: number = 100;
  @Input() step: number = 1;
  @Input() unit: string = "Units";  
  @Input() value: string = "Quantity"

  public slider: Slider = { value: this.min };

  ngOnInit(): void {
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

  private updateSliderValue(value: number): void {
    if (!isNaN(value)) {
      this.slider.value = value;
      this.formAngular2.patchValue({ inputValue: this.slider.value.toString() }, { emitEvent: false });
      this.receivedData.emit(this.slider.value);
    }
  }

  formatLabel(value: number): string {
    return `${value} ${this.unit}`;
  }

  incrementValue(): void {
    if (this.slider.value < this.max) { 
      this.slider.value++;
    }

  }

  reduceValue(): void {
    if (this.slider.value > this.min) { 
      this.slider.value--;
    }
  }

  resetSlider(): void {
    this.slider.value = this.min;
    this.receivedData.emit(this.slider.value);
  }
}
