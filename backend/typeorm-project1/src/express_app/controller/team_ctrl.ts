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
    await teamRepo.find({relations:['coaches', 'players'], relationLoadStrategy:"join"}).then(data=>{
        res.status(200).send(data);
    }).catch(err=>{
        console.error(err);
        res.status(500).send(err);
    }); 
});

router.get('/:id', async (req, res)=>{
    await teamRepo.find({relations:['coaches', 'players'], relationLoadStrategy:"join", where:{id:parseInt(req.params.id)}}).then(data=>{
        if(data.length > 0){
            res.status(200).send(data[0]);
        }
        else{
            let message = {errMsg:`Error 404 Not-Found: Team with id ${req.params.id} does not exist`};
            console.error(message.errMsg);
            res.status(404).send(message)
        }
    }).catch(err=>{
        console.error(err);
        res.status(404).send(err);
    });
    
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
    let failFlag:boolean = false;

    //check team is in db
    await teamRepo.exists({where:{id:req.body.id}}).then(data=>{
        if(!data){
            res.status(404).send({errMsg:`Error 404 Not-Found: No team with id ${req.body.id} exists!!!`});
            failFlag = true;
        }
    });

    let diff_team:Team = new Team();
    diff_team = await teamRepo.findOneBy({id:req.body.id});

    if(diff_team.teamName !== req.body.teamName){//if team name change => need check it isn't a duplicate now
        await teamRepo.exists({where:{teamName:req.body.teamName}}).then(data=>{
            if(data){
                res.status(400).send({errMsg:`Error 400 Bad-Request: Team with Name ${req.body.teamName} already exists!!!`});
                failFlag = true;
            }
        });
    }

    if(!failFlag){
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
    }
});

router.post('/', async (req,res)=>{
    let failFlag= false;
    await teamRepo.exists({where:{teamName:req.body.teamName}}).then(data=>{
        if(data){
            res.status(400).send({errMsg:`Error 400 Bad-Request: Team with Name ${req.body.teamName} already exists!!!`});
            failFlag = true;
        }
    });

    if(!failFlag){
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
    }
});

export {router};