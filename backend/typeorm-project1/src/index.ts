import { AppDataSource } from "./data-source"
import { Coach } from "./entity/Coach";
import { Player } from "./entity/Player"
import { Team } from "./entity/Team"
import * as express from 'express';
import * as  team_ctrl from "./express_app/controller/team_ctrl";
import * as dotenv from 'dotenv';
import * as cors from 'cors';

dotenv.config();

AppDataSource.initialize().then(async () => {
    // const coach = new Coach();
    // coach.age = 48;
    // coach.firstName = "Mappy";
    // coach.lastName = "Slappy";
    // coach.role = "Assistant";
    // const teamRepo = AppDataSource.getRepository(Team);
    // const team = await teamRepo.findOneBy({id:1});
    // coach.team = team;
    // await AppDataSource.getRepository(Coach).save(coach);
    console.log("DB init!");
}).catch(error => console.log(error));

const app = express();
app.use(express.json());

app.use(cors({origin: process.env.CORS_WL.split(',')}));

console.log(process.env.CORS_WL.split(','));

app.use('/teams', team_ctrl.router);

const port = process.env.PORT;
app.listen(port, ()=>{
    console.log("App up and listening on port: " + port);
});
