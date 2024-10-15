import * as express from 'express';
import { AppDataSource } from '../../data-source';
import { Player } from '../../entity/Player';
import { Team } from '../../entity/Team';
import { IsNull } from 'typeorm';

const router = express.Router();

const playerRepo = AppDataSource.getRepository(Player);
const teamRepo = AppDataSource.getRepository(Team);

router.get('/', async (req, res)=>{
    const result = await playerRepo.createQueryBuilder('player').leftJoinAndSelect('player.team', 'team').
    select("player.*, CASE WHEN team.teamName IS NULL THEN '' ELSE team.teamName END as teamName").execute();
    // const result = await playerRepo.find({relations:['team'], relationLoadStrategy:"join"});
    console.log(result);
    res.status(200).send(result);
});

router.get('/byTeam/:teamid', async (req, res)=>{
    const team: Team = await AppDataSource.manager.findOneBy(Team, {id:parseInt(req.params.teamid)})
    const result: Player[] = await playerRepo.find({
        relations:['team'], 
        relationLoadStrategy:"join", 
        where:{
            team: team
        }});
    console.log(result);
    res.status(200).send(result);
});

router.get('/unassigned', async (req, res)=>{
    const result: Player[] = await playerRepo.find({
        relations:['team'], 
        loadRelationIds:true, 
        where:{
            team: IsNull()
        }});
    console.log(result);
    res.status(200).send(result);
});

router.put('/', async (req, res) =>{
    let flag = false;
    let diff_player: Player = new Player();
    const result = await playerRepo.createQueryBuilder('player').leftJoinAndSelect('player.team', 'team').
    select("player.*, CASE WHEN team.teamName IS NULL THEN '' ELSE team.teamName END as teamName").execute();
    diff_player.age = req.body.age;
    diff_player.firstName = req.body.firstName;
    diff_player.lastName = req.body.lastName;
    diff_player.position = req.body.position;
    if(req.body.teamId !== 0){
        diff_player.team = await teamRepo.findOneBy({id:req.body.teamId});
        if(result.teamId !== req.body.teamId){
            let old_team = await teamRepo.findOneBy({id:req.body.teamId});
            old_team.numPlayers = old_team.numPlayers - 1;
            diff_player.team.numPlayers = (diff_player.team.numPlayers)?(diff_player.team.numPlayers + 1):1;
            await teamRepo.save(diff_player.team);
            await teamRepo.save(old_team);
        }
    }
    await playerRepo.save(diff_player);
    res.status(200).send({message:"Update Success"});
});

router.post('/', async(req,res)=>{
    let new_player: Player = new Player();
    new_player.age = req.body.age;
    new_player.firstName = req.body.firstName;
    new_player.lastName = req.body.lastName;
    new_player.position = req.body.position;
    if(req.body.teamId !== 0){
        new_player.team = await teamRepo.findOneBy({id:req.body.teamId});
        new_player.team.numPlayers = (new_player.team.numPlayers)?(new_player.team.numPlayers + 1):1;
        await teamRepo.save(new_player.team);
    }
    await playerRepo.save(new_player);
    res.status(200).send({message:"Player Created"});
});

router.delete('/', async (req, res)=>{
    await playerRepo.createQueryBuilder().delete().from(Player).where("id= :id", {id:req.body.id}).execute()
    res.status(200).send({message:"Delete Success"});
});


// router.post('/', async (req,res)=>{
//     const result = await playerRepo
// });

export {router};