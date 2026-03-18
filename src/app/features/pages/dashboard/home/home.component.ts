import { Component } from '@angular/core';
import { StaticsComponent } from './statics/statics.component';

@Component({
  selector: 'app-home',
  imports: [StaticsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
