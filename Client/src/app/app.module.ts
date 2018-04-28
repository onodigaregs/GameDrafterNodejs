import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CharacterService } from './services/character.service';
import { GameService } from './services/game.service';
import { AppComponent } from './app.component';
import { ListComponent } from './shared/list-with-add/list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GameWizardComponent } from './shared/game-wizard/game-wizard.component';
import { AppRoutingModule } from './app-routing.module';
import { LobbyComponent } from './lobby/lobby.component';
import { LobbyDataService } from './services/lobby.data.service';
import { GameComponent } from './game/game.component';
import { DraftSettingComponent } from './draft/draft-setting.component';
import { DraftItemComponent } from './draft/draft-item.component';
  
@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    GameWizardComponent,
    LobbyComponent,
    GameComponent,
    DraftSettingComponent,
    DraftItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    FormsModule
  ],
  providers: [    
    CharacterService,
    GameService,
    LobbyDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
