import { Lobby } from '../models/lobby.model';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LobbyDataService } from '../services/lobby.data.service';
import { Game } from '../models/game.model';
@Component({
  selector: 'drafter-game-wizard-lobby',
  templateUrl: './lobby.component.html',
  styleUrls:['../shared/main.css']
})
export class LobbyComponent {
  lobby: Lobby = new Lobby();
  currentPlayer: string;
  selectedType: any;

  constructor(private router: Router, private lobbyDataService: LobbyDataService) { }

  createLocalLobby(lobbyName: string) {
    let lobby = new Lobby();
    lobby.name = lobbyName;
    lobby.players = [];
    lobby.game = new Game();
    lobby.isLocal = true;
    this.lobby = lobby;
  }

  createMultiplayerLobby() {

  }
  addPlayer() {
    this.lobby.players.push(this.currentPlayer);
  }
  goToNext() {
    this.lobbyDataService.saveLobby(this.lobby);
    this.router.navigate(['/game']);
  }
}
