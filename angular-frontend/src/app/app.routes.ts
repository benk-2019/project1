import { Routes } from '@angular/router';
import { TeamsComponent } from './teams/teams.component';
import { PlayersComponent } from './players/players.component';
import { CoachesComponent } from './coaches/coaches.component';
import { NewTeamComponent } from './new-team/new-team.component';

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
    },
    {
        path:"teams/new_team",
        component: NewTeamComponent
    }
];
