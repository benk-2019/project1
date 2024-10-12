import * as express from 'express';
import { AppDataSource } from '../../data-source';
import { Coach } from '../../entity/Coach';
import { Team } from '../../entity/Team';

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

router.post('/', async (req,res)=>{
    let new_coach = new Coach();
    new_coach.firstName = req.body.firstName;
    new_coach.lastName = req.body.lastName;
    new_coach.age = req.body.age;
    new_coach.role = req.body.role;
    console.log(req.body);
    if(req.body.teamId !== 0){
        new_coach.team = await teamRepo.findOneBy({id:req.body.teamId});
    }
    await coachRepo.save(new_coach);
    res.status(200).send({message:"Coach Created"});
});

router.put('/', async (req, res) =>{
    let diff_coach: Coach = new Coach();
    diff_coach.age = req.body.age;
    diff_coach.firstName = req.body.firstName;
    diff_coach.lastName = req.body.lastName;
    diff_coach.role = req.body.role;
    if(req.body.teamId !== 0){
        diff_coach.team = await teamRepo.findOneBy({id:req.body.id});
    }
    await coachRepo.save(diff_coach);
    res.status(200).send({message:"Update Success"});
});

router.delete('/', async (req, res)=>{
    await coachRepo.createQueryBuilder().delete().from(Coach).where("id= :id", {id:req.body.id}).execute()
    res.status(200).send({message:"Delete Success"});
});

export {router};