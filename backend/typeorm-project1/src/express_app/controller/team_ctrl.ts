import * as express from 'express';
import { AppDataSource } from '../../data-source';
import { Team } from '../../entity/Team';
import { Player } from '../../entity/Player';
import { Coach } from '../../entity/Coach';

const router = express.Router();

const teamRepo = AppDataSource.getRepository(Team);
const playerRepo = AppDataSource.getRepository(Player);
const coachRepo = AppDataSource.getRepository(Coach);

router.get('/', async (req, res)=>{
    // const result = await teamRepo.createQueryBuilder("team").innerJoinAndSelect("team.coaches", "coach").select("team.*, coach.id as coach_id, (coach.firstName || ' ' || coach.lastName) as coach_names").execute();
    const result = await teamRepo.find({relations:['coaches', 'players'], relationLoadStrategy:"join"});
    console.log(result[0]);
    res.status(200).send(result);
});

router.delete('/', async (req, res) =>{
    await teamRepo.createQueryBuilder().delete().from(Team).where("id= :id", {id:req.body.id}).execute()
    res.status(200).send({message:"Delete Success"});
});

router.put('/', async (req,res)=>{
    let diff_team:Team = new Team();
    diff_team = await teamRepo.findOneBy({id:req.body.id});
    diff_team.headCoach = req.body.headCoach;
    diff_team.numPlayers = req.body.numPlayers;
    diff_team.teamName = req.body.teamName;
    await teamRepo.save(diff_team);
    res.status(200).send({message:"Update Success"});
});

router.post('/', async (req,res)=>{
    let diff_team:Team = new Team();
    diff_team.headCoach = req.body.headCoach;
    diff_team.numPlayers = req.body.numPlayers;
    diff_team.teamName = req.body.teamName;
    await teamRepo.save(diff_team);
    diff_team = await teamRepo.findOneBy({teamName:diff_team.teamName});
    for(let player of req.body.players){
        let add_player: Player = new Player();
        add_player.age = player.age;
        add_player.firstName = player.firstName;
        add_player.lastName = player.lastName;
        add_player.position = player.position;
        add_player.team = diff_team;
        await playerRepo.save(add_player);
    }
    for(let coach of req.body.coaches){
        let add_coach: Coach = new coach();
        add_coach.age = coach.age;
        add_coach.firstName = coach.firstName;
        add_coach.lastName = coach.lastName;
        add_coach.role = coach.role;
        add_coach.team = diff_team;
        await coachRepo.save(add_coach);
    }
    res.status(200).send({message:"Team Created"});
});

export {router};