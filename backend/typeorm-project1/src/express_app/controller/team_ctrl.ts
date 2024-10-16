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
    console.log(result);
    res.status(200).send(result);
});

router.get('/:id', async (req, res)=>{
    // const result = await teamRepo.createQueryBuilder("team").innerJoinAndSelect("team.coaches", "coach").select("team.*, coach.id as coach_id, (coach.firstName || ' ' || coach.lastName) as coach_names").execute();
    const result = await teamRepo.find({relations:['coaches', 'players'], relationLoadStrategy:"join", where:{id:parseInt(req.params.id)}});
    console.log(result[0]);
    res.status(200).send(result[0]);
});

router.delete('/', async (req, res) =>{
    const results = await teamRepo.find({relations:['coaches', 'players'], relationLoadStrategy:"join", where:{id:parseInt(req.body.id)}});
    
    //release players/coaches from team first, then delete team
    let players: Player[] = results[0].players;
    let coaches: Coach[] = results[0].coaches;
    for(let player of players){
        player.team = null;
        await playerRepo.save(player);
    }
    for(let coach of coaches){
        coach.team = null;
        await coachRepo.save(coach);
    }

    await teamRepo.delete({id:req.body.id});
    res.status(204).send({message:"Delete Success"});
});

router.put('/', async (req,res)=>{
    let diff_team:Team = new Team();
    diff_team = await teamRepo.findOneBy({id:req.body.id});
    if(diff_team.headCoach !== req.body.headCoach){
        let old_head_name:string[] = diff_team.headCoach.split(" ");
        const result1 = await coachRepo.find({where:{
            firstName: old_head_name[0],
            lastName: old_head_name[1]
        }});
        let old_head = result1[0];
        console.log(old_head_name[0]);
        let new_head_name:string[] = req.body.headCoach.split(" ");
        const result2 = await coachRepo.find({where:{
            firstName: new_head_name[0],
            lastName: new_head_name[1]
        }});
        let new_head = result2[0];
        console.log(new_head_name[0]);
        new_head.role = "Head";
        old_head.role = "Assistant";
        await coachRepo.save(new_head);
        await coachRepo.save(old_head);
        diff_team.headCoach = req.body.headCoach;
    }
    else{
        console.log(diff_team.headCoach);
    }
    
    diff_team.numPlayers = req.body.numPlayers;
    diff_team.teamName = req.body.teamName;
    await teamRepo.save(diff_team);
    res.status(200).send({message:"Update Success"});
});

router.post('/', async (req,res)=>{
    let new_team:Team = new Team();
    new_team.headCoach = req.body.headCoach;
    new_team.numPlayers = req.body.numPlayers;
    new_team.teamName = req.body.teamName;
    await teamRepo.save(new_team);
    new_team = await teamRepo.findOneBy({teamName:new_team.teamName});
    for(let player of req.body.players){
        let add_player: Player = new Player();
        add_player.id = player.id;
        add_player.age = player.age;
        add_player.firstName = player.firstName;
        add_player.lastName = player.lastName;
        add_player.position = player.position;
        add_player.team = new_team;
        await playerRepo.save(add_player);
    }
    for(let coach of req.body.coaches){
        let add_coach: Coach = new Coach();
        add_coach.id = coach.id;
        add_coach.age = coach.age;
        add_coach.firstName = coach.firstName;
        add_coach.lastName = coach.lastName;
        add_coach.role = coach.role;
        add_coach.team = new_team;
        await coachRepo.save(add_coach);
    }
    res.status(200).send({message:"Team Created"});
});

export {router};