import * as express from 'express';
import { AppDataSource } from '../../data-source';
import { Coach } from '../../entity/Coach';
import { Team } from '../../entity/Team';
import { IsNull } from 'typeorm';

const router = express.Router();

const coachRepo = AppDataSource.getRepository(Coach);
const teamRepo = AppDataSource.getRepository(Team);

router.get('/', async (req, res)=>{
    const result = await coachRepo.createQueryBuilder('coach').leftJoinAndSelect('coach.team', 'team').
    select("coach.*, CASE WHEN team.teamName IS NULL THEN '' ELSE team.teamName END as teamName").execute();
    // const result = await coachRepo.find({relations:['team'], relationLoadStrategy:"join"});
    console.log(result);
    res.status(200).send(result);
});

router.get('/unassigned', async (req, res)=>{
    const result: Coach[] = await coachRepo.find({
        relations:['team'], 
        loadRelationIds:true, 
        where:{
            team: IsNull()
        }});
    console.log(result);
    res.status(200).send(result);
});

router.post('/', async (req,res)=>{
    let new_coach = new Coach();
    new_coach.firstName = req.body.firstName;
    new_coach.lastName = req.body.lastName;
    new_coach.age = req.body.age;
    new_coach.role = req.body.role;
    if(req.body.teamId !== 0){
        const result = await teamRepo.find({relations:['coaches', 'players'], relationLoadStrategy:"join", where:{id:req.body.teamId}});
        let team = result[0];

        //Two cases in which we will have head:
        //  1. Team already had head and when creating decided want new coach to be head
        //  2. Team doesn't have any other coaches or a head ==> coaches role has to be head
        if(new_coach.role === 'Head'){
            if(team.headCoach){//if case 1, need change old head role to Assistant
                let old_head_name:string[] = team.headCoach.split(" ");
                const result = await coachRepo.find({where:{
                    firstName: old_head_name[0],
                    lastName: old_head_name[1]
                }});
                let old_head = result[0];
                old_head.role = 'Assistant';
                await coachRepo.save(old_head);
            }
            team.headCoach = new_coach.firstName + " " + new_coach.lastName;
            await teamRepo.save(team);
        }

        new_coach.team = team;
    }
    await coachRepo.save(new_coach);
    res.status(200).send({message:"Coach Created"});
});

router.put('/', async (req, res) =>{
    let diff_coach: Coach = new Coach();
    diff_coach.id = req.body.id;
    diff_coach.age = req.body.age;
    diff_coach.firstName = req.body.firstName;
    diff_coach.lastName = req.body.lastName;
    diff_coach.role = req.body.role;
    if(req.body.teamId !== 0){
        diff_coach.team = await teamRepo.findOneBy({id:req.body.teamId});
    }
    else{
        diff_coach.team = null;
    }
    await coachRepo.save(diff_coach);
    res.status(200).send({message:"Update Success"});
});

router.delete('/', async (req, res)=>{
    await coachRepo.createQueryBuilder().delete().from(Coach).where("id= :id", {id:req.body.id}).execute();
    const result = await teamRepo.find({relations:['coaches', 'players'], relationLoadStrategy:"join", where:{id:req.body.teamId}});
    if(req.body.role === 'Head'){
        let team:Team = new Team();
        let coach: Coach = new Coach();
        if(result[0].coaches.length > 0){
            team = result[0];
            team.headCoach = team.coaches[0].firstName + " " + team.coaches[0].lastName;
            coach = team.coaches[0];
            coach.role = 'Head';
            await coachRepo.save(coach);
            await teamRepo.save(team);
        }
        else{
            team = result[0];
            team.headCoach = '';
            await teamRepo.save(team);
        }
    }
    res.status(200).send({message:"Delete Success"});
});

export {router};