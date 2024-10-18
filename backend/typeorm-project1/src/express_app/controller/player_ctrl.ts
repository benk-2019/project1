import * as express from 'express';
import { AppDataSource } from '../../data-source';
import { Player } from '../../entity/Player';
import { Team } from '../../entity/Team';
import { IsNull } from 'typeorm';

const router = express.Router();

const playerRepo = AppDataSource.getRepository(Player);
const teamRepo = AppDataSource.getRepository(Team);

router.get('/', async (req, res)=>{//how handle errors here?
    try{
        const result = await playerRepo.createQueryBuilder('player').leftJoinAndSelect('player.team', 'team').
        select("player.*, CASE WHEN team.teamName IS NULL THEN '' ELSE team.teamName END as teamName").execute();
        res.status(200).send(result);
    }
    catch{
        res.status(500).send({errMsg:"Error 500: Database Is Down"});
    }
});

router.get('/byTeam/:teamid', async (req, res)=>{
    await teamRepo.exists({where:{id:parseInt(req.params.teamid)}}).then(data=>{//make sure team being searched for actually exists
        if(!data){
            res.status(404).send({errMsg:`Error 404 Not-Found: No team with id ${req.body.teamId} exists!!!`});
        }
    })

    let team:Team = new Team();
    team = await AppDataSource.manager.findOneBy(Team, {id:parseInt(req.params.teamid)})

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
    try{
        const result: Player[] = await playerRepo.find({
            relations:['team'], 
            loadRelationIds:true, 
            where:{
                team: IsNull()
            }});
        console.log(result);
        res.status(200).send(result);
    }
    catch{
        res.status(500).send({errMsg:"Error 500: Database Is Down"})
    }
});

router.put('/', async (req, res) =>{
    let failFlag:boolean = false;//used to prevent put on check failure

    //check player is in db
    await playerRepo.exists({where:{id:req.body.id}}).then(data=>{
        if(!data){
            res.status(404).send({errMsg:`Error 404 Not-Found: No player with id ${req.body.id} exists!!!`});
            failFlag = true;
        }
    });

    const result1 = await playerRepo.createQueryBuilder('player').leftJoinAndSelect('player.team', 'team').
    select("player.*, CASE WHEN team.teamName IS NULL THEN '' ELSE team.teamName END as teamName").where(`player.id = ${req.body.id}`).execute();

    if(((result1[0].firstName != req.body.firstName) || (result1[0].lastName != req.body.lastName))){//if name change => need check make sure it isn't to a duplicate name
        await playerRepo.exists({where:{firstName:req.body.firstName, lastName:req.body.lastName}}).then(data=>{
            if(data){
                failFlag = true
                res.status(400).send({errMsg:`Error 400 Bad-Request: Player with Name ${req.body.firstName} ${req.body.lastName} already exists!!!`});
            }
        });
    }

    if(!failFlag){
        let result = (result1[0])?result1[0]:{teamId:null};
        let diff_player: Player = new Player();
        diff_player.id = req.body.id;
        diff_player.age = req.body.age;
        diff_player.firstName = req.body.firstName;
        diff_player.lastName = req.body.lastName;
        diff_player.position = req.body.position;
        if(req.body.teamId !== 0 && req.body.teamId !== undefined && req.body.teamId !== null){
            diff_player.team = await teamRepo.findOneBy({id:req.body.teamId});
            if(result.teamId !== req.body.teamId){
                if(result.teamId !== null){
                    let old_team = await teamRepo.findOneBy({id:result.teamId});
                    old_team.numPlayers = old_team.numPlayers - 1;
                    await teamRepo.save(old_team);
                }
                diff_player.team.numPlayers = (diff_player.team.numPlayers)?(diff_player.team.numPlayers + 1):1;
                await teamRepo.save(diff_player.team);
            }
        }
        else{
            diff_player.team = null;
            if(result.teamId!==null){
                let old_team = await teamRepo.findOneBy({id:result.teamId});
                old_team.numPlayers = old_team.numPlayers - 1;
                await teamRepo.save(old_team);
            }
        }
        await playerRepo.save(diff_player);
        res.status(200).send({message:"Update Success"});
    }
});

router.post('/', async(req,res)=>{
    let failFlag = false;
    await playerRepo.exists({where:{firstName:req.body.firstName, lastName:req.body.lastName}}).then(data=>{
        if(data){
            failFlag = true
            res.status(400).send({errMsg:`Error 400 Bad-Request: Player with Name ${req.body.firstName} ${req.body.lastName} already exists!!!`});
        }
    });

    if(!failFlag){
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
    }
});

router.delete('/', async (req, res)=>{
    await playerRepo.createQueryBuilder().delete().from(Player).where("id= :id", {id:req.body.id}).execute()
    res.status(200).send({message:"Delete Success"});
});


// router.post('/', async (req,res)=>{
//     const result = await playerRepo
// });

export {router};