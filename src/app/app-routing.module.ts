import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JoinComponent } from "./Components/join/join.component";
import { HomeComponent } from "./Components/home/home.component";
import { VerifyComponent } from "./Components/verify/verify.component";
import { HostComponent } from "./Components/host/host.component";
import { PlayerComponent } from "./Components/player/player.component"
import { ScoreComponent } from './Components/score/score.component';
import { LeaderboardComponent } from './Components/leaderboard/leaderboard.component';
import { DemoComponent } from './Components/demo/demo.component';

const routes: Routes = [
  {path:'', component:JoinComponent},
  {path:'create_game', component:VerifyComponent},
  {path:'host', component:HostComponent},
  {path:'player', component:PlayerComponent},
  {path:'score', component:ScoreComponent},
  {path:'leaderboard', component:LeaderboardComponent},
  {path:'demo', component:DemoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
