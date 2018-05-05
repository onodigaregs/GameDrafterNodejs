import { Component, OnInit, Input } from '@angular/core';
import { Lobby } from '../models/lobby.model';
import { LobbyDataService } from '../services/lobby.data.service';
import { CharacterService } from '../services/character.service';
import { Observable } from 'rxjs/Rx';
import { DraftItem } from '../models/draft-item.model';
import { Game } from '../models/game.model';
import { Router } from '@angular/router';

@Component({
  selector: 'drafter-game-wizard-draft',
  templateUrl: './draft-setting.component.html',
  styleUrls: ['../shared/main.css']
})

export class DraftSettingComponent implements OnInit {
  title = "Okay, just some settings before we start";
  draft: any = {};
  lobby: Lobby = new Lobby();
  draftItems: DraftItem[] = [];
  actionList: any[] = [];
  turnIndex: number = 0;
  currentAction: any;
  constructor(private lobbyDataService: LobbyDataService, private characterService: CharacterService, private router: Router) { }
  ngOnInit() {
    this.draft.renderBrackets = false;
    this.lobby = this.lobbyDataService.getLobby();
    if (!(this.lobby.game && this.lobby.players && this.lobby.players.length > 0)){
      this.lobby.game = new Game();
      this.lobby.players = ['p', 'k'];
    }

    //if (this.lobbyIsValid()) {    
    //  this.characterService.getCharacters("brawlhalla").subscribe(response => {
    //    this.lobby.game.characters = response;
    //  });
    //}
      
      this.characterService.getCharacters("brawlhalla").subscribe(response => {
        this.lobby.game.characters = response;
      });

  }


  startDraft() {
    this.lobbyDataService.saveLobby(this.lobby);
    this.router.navigateByUrl("/startDraft");
  }
lobbyIsValid() {
  return this.lobby.game && this.lobby.players.length > 0;
}
  itemChanged(event) {
    let a = "";
     
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
    this.setActionList();
    return draftItems;
  }

  setActionList() {
    this.lobby.players.forEach((player, index) => {
      this.actionList.push({ player: player, actions: ['pick', 'pick', 'pick'] });
    });

    this.currentAction = this.actionList[this.turnIndex];
  }
}
