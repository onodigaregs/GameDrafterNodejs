import { Lobby } from '../models/lobby.model';
import { Injectable } from '@angular/core';

@Injectable()
export class LobbyDataService {
  lobby: Lobby = new Lobby();

  saveLobby(lobby: Lobby) {
    this.lobby = lobby;
  }

  getLobby(): Lobby {
    return this.lobby;
  }
}
