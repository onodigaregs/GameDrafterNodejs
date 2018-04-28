import { GameService } from '../services/game.service';
import { OnInit, Component } from '@angular/core';
import { Game } from '../models/game.model';
import { Lobby } from '../models/lobby.model';
import { LobbyDataService } from '../services/lobby.data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'drafter-game-wizard-game',
  templateUrl: './game.component.html',
  styleUrls: ['../shared/main.css']
})
export class GameComponent implements OnInit {
  title: string = "Select your game";
  games: Game[] = [];
  lobby: Lobby = new Lobby();
  selectedGame: string;
  constructor(private gameService: GameService, private lobbyDataService: LobbyDataService, private router: Router) { }

  ngOnInit() {
    this.games = this.gameService.getGames();
    this.lobby = this.lobbyDataService.getLobby();
  }

  goToDraft(game: Game) {
    this.lobby.game = game;
    this.lobbyDataService.saveLobby(this.lobby);
    this.router.navigate(['/draft'])
  }
}
