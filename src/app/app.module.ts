import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { JoinComponent } from './Components/join/join.component';
import { HostComponent } from './Components/host/host.component';
import { VerifyComponent } from './Components/verify/verify.component';
import { PlayerComponent } from './Components/player/player.component';
import { HttpClientModule } from '@angular/common/http';
import { ScoreComponent } from './Components/score/score.component';
import { LeaderboardComponent } from './Components/leaderboard/leaderboard.component';
import { DemoComponent } from './Components/demo/demo.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JoinComponent,
    HostComponent,
    VerifyComponent,
    PlayerComponent,
    ScoreComponent,
    LeaderboardComponent,
    DemoComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
