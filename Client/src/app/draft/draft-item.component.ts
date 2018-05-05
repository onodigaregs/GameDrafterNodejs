import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Lobby } from '../models/lobby.model';
import { LobbyDataService } from '../services/lobby.data.service';
import { CharacterService } from '../services/character.service';
import { Observable } from 'rxjs/Rx';
import { DraftItem } from '../models/draft-item.model';
import { DraftInput } from '../models/draftinput.model';

@Component({
  selector: 'drafter-draft-item',
  templateUrl: './draft-item.component.html',
  styleUrls: ['../shared/main.css']  
})

export class DraftItemComponent implements OnInit {
  draftItems = [];
  @Input()
  get items() {
    return this.draftItems;
  }
  set items(val) {
    this.draftItems = val;
    this.itemsChange.emit(this.draftItems);
  }
  input: DraftInput;
  @Input() 
  get draftInput() {
    return this.input;
  }
  set draftInput(val) {
    this.input = val;
  }

  @Output() itemsChange: EventEmitter<DraftItem[]> = new EventEmitter<DraftItem[]>();
  @Output() itemChanged: EventEmitter<DraftItem> = new EventEmitter<DraftItem>();
  @Output() currentAction: EventEmitter<DraftOutput> = new EventEmitter<DraftOutput>();
  constructor(private lobbyDataService: LobbyDataService, private characterService: CharacterService) { }
  ngOnInit() {
    
  }

  characterClicked(event) {
    this.itemChanged.emit(event);
    this.input = null;
  }
}

export class DraftOutput {
  player: string;
  action: string;
  character: string;
}
