import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { GameWizardComponent } from './shared/game-wizard/game-wizard.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', './shared/main.css']
})

export class AppComponent implements OnInit {
  title = 'app';
  constructor() {}

  ngOnInit() {

  }

}
