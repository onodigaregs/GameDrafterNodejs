import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'drafter-game-wizard-bracket',
  templateUrl: './draft-bracket.component.html'
})



export class DraftBracketComponent implements OnInit {
  type: string;
  @Input()
  get bracketType() {
    return this.type;
  }
  set bracketType(val) {
    this.type = val;
  }
  competitors: string[];
  @Input()
  get players() {
    return this.competitors;
  }
  set players(val) {
    this.competitors = val;
  }

  ngOnInit() {
    //this.renderBracket();
  }

  //renderBracket() {

  //  switch (this.type.toLowerCase()) {
  //    case "double elimination":
  //      this.renderDoubleElimination();
  //      break;
  //  }
  //}

  //renderDoubleElimination() {
  //  var tierIndex = this.players.length / 2;
  //  //winners first
  //  while (this.players.length / 2 >= 1) {

  //  }

  //  let mod = this.players.length % 2
  //  if (mod > 0) {

  //  }
  //}
}
