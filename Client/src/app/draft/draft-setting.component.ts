import { Component, OnInit, Input } from '@angular/core';
import { Lobby } from '../models/lobby.model';
import { LobbyDataService } from '../services/lobby.data.service';
import { CharacterService } from '../services/character.service';
import { Observable } from 'rxjs/Rx';
import { DraftItem } from '../models/draft-item.model';
import { Game } from '../models/game.model';

@Component({
  selector: 'drafter-game-wizard-draft',
  templateUrl: './draft-setting.component.html',
  styleUrls: ['../shared/main.css']
})

export class DraftSettingComponent implements OnInit {
  title = "Time to draft!";
  draft: any = {};
  lobby: Lobby = new Lobby();
  draftItems: DraftItem[] = [];
  constructor(private lobbyDataService: LobbyDataService, private characterService: CharacterService) { }
  ngOnInit() {
    this.lobby = this.lobbyDataService.getLobby();
    this.lobby.game = new Game();
    this.lobby.players = ['p', 'k'];
    //if (this.lobbyIsValid()) {    
    //  this.characterService.getCharacters("brawlhalla").subscribe(response => {
    //    this.lobby.game.characters = response;
    //  });
    //}
      
      this.characterService.getCharacters("brawlhalla").subscribe(response => {
        this.lobby.game.characters = response;
      });

  }



lobbyIsValid() {
  return this.lobby.game && this.lobby.players.length > 0;
}
 
  onDraftTypeChange(type) {
    switch (type) {
      case "AR":
        this.draftItems = this.initRandomDraft();
    }
  }

  initRandomDraft() {
    let draftItems = this.lobby.game.characters.map((char) => {
      return { character: char, isBanned: false, isDisabled: false, isPicked: false };
    })

    return draftItems;
  }
}
