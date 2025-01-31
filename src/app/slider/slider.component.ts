import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-slider',
  standalone: true, // Si es standalone
  imports: [ReactiveFormsModule, MatSliderModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  @Output() datoEnviado = new EventEmitter<number>();

  formAngular2 = new FormGroup({
    inputValue: new FormControl('')
  });

  public slider = { value: '0' };

  @Input() min: number = 1;
  @Input() max: number = 100;
  @Input() step: number = 1;

  ngOnInit() {
    this.formAngular2.get('inputValue')?.valueChanges.subscribe((value) => {
      this.slider.value = value ?? '';
      console.log(`inputValue: ${this.slider.value}`);
    });
  }

  formatLabelAge(value: number): string {
    return `${value} Años`;
  }

  onSliderChangeAge(event: Event): void {
    const sliderValue = parseFloat((event.target as HTMLInputElement).value);
    this.slider.value = sliderValue.toString(); 
  
    console.log(`slider.value : ${this.slider.value}`);
  
    this.datoEnviado.emit(sliderValue);
  }
}
