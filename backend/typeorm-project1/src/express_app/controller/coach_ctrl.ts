import * as express from 'express';
import { AppDataSource } from '../../data-source';
import { Coach } from '../../entity/Coach';
import { Team } from '../../entity/Team';
import { IsNull } from 'typeorm';

const router = express.Router();

const coachRepo = AppDataSource.getRepository(Coach);
const teamRepo = AppDataSource.getRepository(Team);

router.get('/', async (req, res)=>{
    try{
        const result = await coachRepo.createQueryBuilder('coach').leftJoinAndSelect('coach.team', 'team').
        select("coach.*, CASE WHEN team.teamName IS NULL THEN '' ELSE team.teamName END as teamName").execute();
        // const result = await coachRepo.find({relations:['team'], relationLoadStrategy:"join"});
        console.log(result);
        res.status(200).send(result);
    }
    catch{
        res.status(500).send({errMsg:"Error 500: Database Is Down"});
    }
});

router.get('/unassigned', async (req, res)=>{
    try{
        const result: Coach[] = await coachRepo.find({
            relations:['team'], 
            loadRelationIds:true, 
            where:{
                team: IsNull()
            }});
        console.log(result);
        res.status(200).send(result);
    }
    catch{
        res.status(500).send({errMsg:"Error 500: Database Is Down"});
    }
});

router.post('/', async (req,res)=>{
    let failFlag = false;
    await coachRepo.exists({where:{firstName:req.body.firstName, lastName:req.body.lastName}}).then(data=>{
        if(data){
            failFlag = true;
            res.status(400).send({errMsg:`Error 400 Bad-Request: Coach with Name ${req.body.firstName} ${req.body.lastName} already exists!!!`});
        }
    });

    if(!failFlag){
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
    }
});

//If i make it so the only possibility in the front end is to change coach from assistant->head, but not the other way around
//=> all I need to worry about is setting the old head coach to Assistant, this coach to Head, and changing the team it's assigned to to reflect new HeadCoach 
router.put('/', async (req, res) =>{
    let failFlag:boolean = false;//only allow actual put to happen if error checks pass

    //check coach with id exists
    await coachRepo.exists({where:{id:req.body.id}}).then(data=>{
        if(!data){
            failFlag = true;
            res.status(404).send({errMsg:`Error 404 Not-Found: No coach with id ${req.body.id} exists!!!`});
        }
    });

    const result = await coachRepo.find({where:{id:req.body.id}});

    //if name changed, have to check to make sure no duplicate names
    if((result[0].firstName != req.body.firstName) || (result[0].lastName != req.body.lastName)){
        await coachRepo.exists({where:{firstName:req.body.firstName, lastName:req.body.lastName}}).then(data=>{
            if(data){
                failFlag = true;
                res.status(400).send({errMsg:`Error 400 Bad-Request: Coach with Name ${req.body.firstName} ${req.body.lastName} already exists!!!`});
            }
        });
    }

    if(!failFlag){
        let diff_coach = result[0];
        diff_coach.id = req.body.id;
        diff_coach.age = req.body.age;
        diff_coach.firstName = req.body.firstName;
        diff_coach.lastName = req.body.lastName;
        if(req.body.teamId !== 0 && req.body.teamId !== undefined && req.body.teamId !== null){
            diff_coach.team = await teamRepo.findOneBy({id:req.body.teamId});
            if((req.body.role !== diff_coach.role) && (req.body.role === "Head")){//if changing role to head
                if(diff_coach.team.headCoach){//if there is a head coach
                    let old_head_name = diff_coach.team.headCoach.split(" ");
                    let old_head = await coachRepo.findOneBy({firstName:old_head_name[0], lastName:old_head_name[1]});
                    old_head.role = "Assistant";
                    diff_coach.role = req.body.role;//this coach is now head
                    await coachRepo.save(old_head);
                    diff_coach.team.headCoach = diff_coach.firstName + " " + diff_coach.lastName;
                    await teamRepo.save(diff_coach.team);
                }
                else{ 
                    diff_coach.role = req.body.role;//if this team doesn't have a coach this is fine to just have it be head
                }
            }
            else{//if either not changing role or changing from none to assistant just setting it is fine.
                diff_coach.role = req.body.role;
            }
        }
        else{
            diff_coach.team = null;
        }
        await coachRepo.save(diff_coach);
        res.status(200).send({message:"Update Success"});
    }
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