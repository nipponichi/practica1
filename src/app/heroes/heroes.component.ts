import { Component, OnInit } from '@angular/core';
import { hero } from './hero.model';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-heroes',
  imports: [ReactiveFormsModule, MatSliderModule, FormsModule, MatRadioModule],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss'
})

export class HeroesComponent implements OnInit {
  formAngular = new FormGroup({
    heroName: new FormControl(''),
    heroApellido: new FormControl(''),
    heroSexo: new FormControl(''),
  });

  public sliderAge:string = ''
  public sliderWeight:string = ''

  formatLabelAge(value: number): string {
    if (value >= 1000) {
      this.sliderWeight = Math.round(value / 1000).toString()
      return `${Math.round(value / 1000)}kg`;
    }
    return `${value}Años`;
  }
  formatLabelWeight(value: number): string {
    if (value >= 1000) {
      this.sliderWeight = Math.round(value / 1000).toString()
      return `${Math.round(value / 1000)}kg`;
    }
    return `${value}Kg`;
  }

  public hero:hero = {
    id: 1,
    name: '',
    apellido: '',
    sexo: ''
  }

  ngOnInit() {
    this.formAngular.get('heroName')?.valueChanges.subscribe((value) => {
      this.hero.name = value ?? '';
      console.log(`Nombre: ${this.hero.name}`);
    });
  
    this.formAngular.get('heroApellido')?.valueChanges.subscribe((value) => {
      this.hero.apellido = value ?? '';
      console.log(`Apellido: ${this.hero.apellido}`);
    });

    this.formAngular.get('heroSexo')?.valueChanges.subscribe((value) => {
      this.hero.sexo = value ?? '';
      console.log(`Sexo: ${this.hero.sexo}`);
    });
  }

  onSliderChangeAge(event: Event): void {
    const sliderValue = (event.target as HTMLInputElement).value;
    this.sliderWeight = sliderValue;
    console.log(`Age: ${this.sliderWeight}`);
  }

  onSliderChangeWeight(event: Event): void {
    const sliderValue = (event.target as HTMLInputElement).value;
    this.sliderAge = sliderValue;
    console.log(`Weight: ${this.sliderAge}`);
  }

  submitApplication() {
    console.log(this.formAngular.value.heroName ?? '')
  }
}
