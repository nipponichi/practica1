import { Component, OnInit } from '@angular/core';
import { hero } from './hero.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-heroes',
  imports: [ReactiveFormsModule],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss'
})
export class HeroesComponent implements OnInit {


  formAngular = new FormGroup({
    heroName: new FormControl(''),
  });

  public hero:hero = {
    id: 1,
    name: '',
  }


  ngOnInit() {
      this.formAngular.get('heroName')?.valueChanges.subscribe((value) => {
      this.hero.name = value ?? '';
      console.log(this.hero.name)
    });
  }



  submitApplication() {
    console.log(this.formAngular.value.heroName ?? '')
  }
}
