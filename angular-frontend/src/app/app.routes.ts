import { Routes } from '@angular/router';
import { TeamsComponent } from './teams/teams.component';
import { PlayersComponent } from './players/players.component';
import { CoachesComponent } from './coaches/coaches.component';
import { NewTeamComponent } from './new-team/new-team.component';
import { NewPlayerComponent } from './new-player/new-player.component';
import { NewCoachComponent } from './new-coach/new-coach.component';
import { SwapPlayerComponent } from './swap-player/swap-player.component';
import { SwapCoachComponent } from './swap-coach/swap-coach.component';

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
    },
    {
        path:"players/new_player",
        component: NewPlayerComponent
    },
    {
        path:"coaches/new_coach",
        component: NewCoachComponent
    },
    {
        path:"players/transfer_player",
        component: SwapPlayerComponent
    },
    {
        path:"coaches/transfer_coach",
        component: SwapCoachComponent
    }
];
