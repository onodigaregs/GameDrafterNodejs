import { Component, OnInit, Input } from '@angular/core';
import { Lobby } from '../models/lobby.model';
import { LobbyDataService } from '../services/lobby.data.service';
import { CharacterService } from '../services/character.service';
import { Observable } from 'rxjs/Rx';
import { DraftItem } from '../models/draft-item.model';
import { Game } from '../models/game.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DraftAction } from '../models/DraftActionList.model';
import { DraftInput } from '../models/draftinput.model';
import { Character } from '../models/character.model';

@Component({
  selector: 'drafter-game-wizard-start',
  templateUrl: './draft-start.component.html',
  styleUrls: ['../shared/main.css'],
  animations: [
    trigger('playerState', [
      state('inactivePlayer', style({ transform: 'translateX(0)' })),
      state('activePlayer', style({ transform: 'translateX(200px)' })),
      transition('inactivePlayer => activePlayer', animate('100ms ease-in')),
      transition('activePlayer => inactivePlayer', animate('100ms ease-out'))
    ])
  ]
})


export class DraftStartComponent implements OnInit {
  draftFinished: boolean = false;
  draftSettings: DraftSettings;
  players: DraftParticipant[];
  characters: Character[];
  draftInputs: DraftInput[] = [];
  currentDraftInput: DraftInput;
  bracketType = "double elimination";
  constructor(private lobbyDataService: LobbyDataService, private characterService: CharacterService) {
    
  }
  ngOnInit() {
    // refactor the inputs
    let lobby = this.lobbyDataService.getLobby();
    this.characters = lobby.game.characters;
    this.draftSettings = new DraftSettings();
    this.draftSettings.mode = "Single draft";
    this.draftSettings.stock = true;
    this.draftSettings.renderBrackets = false;
    this.players = [];
    this.players.push(new DraftParticipant("peter", this.characters), new DraftParticipant("peter1", this.characters), new DraftParticipant("peter2", this.characters));
    //refactor end

    this.players = this.randomizeOrder(this.players);

    switch (this.draftSettings.mode) {
      case "All random":
        for (let player of this.players) {
          for (var i = 0; i < 3; i++) {
            // where characters != picked or bannend
            let randomChar = this.pickRandom(this.characters);
            randomChar.isPicked = true;
            player.pickedCharacters.push(randomChar)
          }          
        }
        break;
      case "Single draft":
        if (this.draftSettings.stock) {
          for (let player of this.players) {
            var draftInput = new DraftInput()
            draftInput.action = "Pick";
            draftInput.playerName = player.name;
            draftInput.characters = [];
            for (let i = 0; i < 3; i++) {
              draftInput.characters.push(this.pickRandom(this.characters, draftInput.characters));
            }
            this.draftInputs.push(draftInput);
          }
        }
        else {
          for (var j = 0; j < 3; j++) {
            for (let player of this.players) {
              var draftInput = new DraftInput()
              draftInput.action = "Pick";
              draftInput.playerName = player.name;
              draftInput.characters = [];
              for (let i = 0; i < 3; i++) {
                draftInput.characters.push(this.pickRandom(this.characters, draftInput.characters));
              }
              this.draftInputs.push(draftInput);
            }
          }
        }  

        this.currentDraftInput = this.draftInputs[0];
    }
  }

  draftActionFinished(character) {
    let player = this.players.find(player => player.name === this.currentDraftInput.playerName);
    if (player) {
      if (this.currentDraftInput.action === "Pick") {
        player.pickedCharacters.push(character);
      }
      if (this.currentDraftInput.action === "Ban") {
        player.bannedCharacters.push(character);
      }
    }
    this.draftInputs.splice(0, 1);

    if (this.draftInputs[0]) {
      this.currentDraftInput = this.draftInputs[0];
    }

    else {
      this.draftFinished = true;
      // render brackets
    }
  }

  pickRandom(items: any[], ignoreList: any[] = []): any{
    if (ignoreList.length > 0) {
      let selectionFound = false;
      while (!selectionFound) {
        let candidate = items[this.getRndInteger(0, items.length - 1)];
        if(!ignoreList.includes(candidate)) {
          selectionFound = true;
          return candidate;
        }
      }
    }
    return items[this.getRndInteger(0, items.length - 1)];
  }

  randomizeOrder(items: any[]): any[] {

    let itemsRanomized = items;
    let itemsCount = items.length;

    for (let i = 0; i < itemsCount; i++) {
      let randomIndex = this.getRndInteger(0, itemsCount - 1);
      [itemsRanomized[i], itemsRanomized[randomIndex]] = [itemsRanomized[randomIndex], itemsRanomized[i]];
      // todo delay
    }

    return itemsRanomized;
  }

    getRndInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
export class DraftSettings {
  mode: string; // todo enum
  stock: boolean;
  renderBrackets: boolean;
}
export class DraftParticipant {
  constructor(name: string, availableCharacters: Character[]) {
    this.name = name;
    this.availableCharacters = availableCharacters;
    this.pickedCharacters = [];
    this.bannedCharacters = [];
  }

  name: string;
  availableCharacters: Character[];
  pickedCharacters: Character[];
  bannedCharacters: Character[];
}
//export class DraftStartComponent implements OnInit {
//  draftItems: DraftItem[] = [];
//  lobby: Lobby;
//  draftInput: any; // { DraftActions: DraftAction[], Characters: Character[] };
//  activePlayer: string;
//  draftHasStarted: boolean =  false;
//  countdown: string;
//  currentOperation: string = "Randomizing order..."
//  constructor(private lobbyDataService: LobbyDataService, private characterService: CharacterService) {
//    this.currentOperation = "Randomizing order...";
//  }
//  ngOnInit() {
//    this.lobby = this.lobbyDataService.getLobby();

//    //let draftinput = new DraftInput();
//    //draftinput.characterPool = this.lobby.game.characters;
//    //draftinput.players = ["Peter", "kim", "emma"];
//    //draftinput.draftActions = ["Pick", "Ban", "Pick"];


//    if (this.lobby) {
//      // <<<<< TODO REMOVE >>>>>>>
//      if (!this.lobby.game) {
//        this.lobby.game = new Game();
//        this.characterService.getCharacters("brawlhalla").subscribe(response => {
//          this.lobby.game.characters = response;
//        });
//      }
//      if (!this.lobby.players) {
//        this.lobby.players = ["Peter", "kim", "emma"];
//      }
//      // <<<<< TODO REMOVE >>>>>>>


//      this.randomizeStartOrder();
//      this.startCountDown();
//    }
//  }

//  handlecurrentaction(event) {

//  }

//  itemsChanged() {

//  }
//  async randomizeStartOrder() {
//    this.draftInput = {};
//    this.draftInput.DraftActions = [];
//    this.draftInput.Characters = [];
//    let playersTemp = this.lobby.players;
//    let playerCount = this.lobby.players.length;

//    for (let i = 0; i < playerCount; i++) {
//      let randomIndex = this.getRndInteger(0, playerCount - 1);
//      [playersTemp[i], playersTemp[randomIndex]] = [playersTemp[randomIndex], playersTemp[i]];
//    }
//    this.lobby.players = [];
//    for (let player of playersTemp) {     
//      for (let i = 0; i < 3; i++) {
//        let draftAction = new DraftAction();
//        draftAction.player = player;
//        draftAction.action = "random";
//        draftAction.state = 'inactivePlayer';
//        this.draftInput.DraftActions.push(draftAction);
//      }      
//      await this.delay(1000);
//      this.lobby.players.push(player);
//    }

//    this.draftInput.Characters = this.lobby.game.characters;
//  }

//  delay(ms: number) {
//    return new Promise(resolve => setTimeout(resolve, ms));
//  }

//  itemChanged(draft) {
//    this.actionList[0]
//    let a = draft
//  }

//  async startCountDown() {
//    for (var i = 5; i >= 1; i--) {
//      this.countdown = i.toString();
//      await this.delay(1000);
//    }
    
//    this.draftItems = this.initRandomDraft();
//    this.actionList[0].state = "activePlayer";
//    this.draftHasStarted = true;
//  }

//  initRandomDraft() {
//    let draftItems = this.lobby.game.characters.map((char) => {
//      return { character: char, isBanned: false, isDisabled: false, isPicked: false };
//    })

//    return draftItems;
//  }

//  toggleState(action) {
//    action.state = action.state === 'activePlayer' ? 'inactivePlayer' : 'activePlayer';
//  }
//  getRndInteger(min: number, max: number): number {
//    return Math.floor(Math.random() * (max - min)) + min;
//  }
//}


