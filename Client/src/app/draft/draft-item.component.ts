import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Lobby } from '../models/lobby.model';
import { LobbyDataService } from '../services/lobby.data.service';
import { CharacterService } from '../services/character.service';
import { Observable } from 'rxjs/Rx';
import { DraftItem } from '../models/draft-item.model';
  

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
  @Output() itemsChange: EventEmitter<DraftItem[]> = new EventEmitter<DraftItem[]>();
  constructor(private lobbyDataService: LobbyDataService, private characterService: CharacterService) { }
  ngOnInit() {
    
  }

}
