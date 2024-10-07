import { Routes } from '@angular/router';
import { TeamsComponent } from './teams/teams.component';
import { PlayersComponent } from './players/players.component';
import { CoachesComponent } from './coaches/coaches.component';

export const routes: Routes = [
    {
        path:"teams",
        component: TeamsComponent
    },
    {
        path:"players",
        component: PlayersComponent
    },
    {
        path:"coaches",
        component: CoachesComponent
    }
];
