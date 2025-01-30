import { Component, Input, OnInit } from '@angular/core';
import { slider } from './slider.model';
import { FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [ReactiveFormsModule, MatSliderModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent implements OnInit {

  formAngular2 = new FormGroup ({
    inputValue: new FormControl('')
  })

  public slider:slider = {
    value: '0'
  }

  @Input() min: number = 1;
  @Input() max: number = 1;
  @Input() step: number = 1;

  formatLabelAge(value: number): string {
    return `${value} Años`;
  }

  onSliderChangeAge(event: Event): void {
    const sliderValue = (event.target as HTMLInputElement).value;
    this.slider.value = sliderValue;

    this.formAngular2.get('inputValue')?.valueChanges.subscribe((value) => {
      this.slider.value = value ?? '';
      console.log(`inputValue: ${this.slider.value}`);
    });
    console.log(`slider.value : ${this.slider.value}`);
  }

  ngOnInit() {
    this.formAngular2.get('inputValue')?.valueChanges.subscribe((value) => {
      this.slider.value = value ?? '';
      console.log(`inputValue: ${this.slider.value}`);
    });
  }

}
