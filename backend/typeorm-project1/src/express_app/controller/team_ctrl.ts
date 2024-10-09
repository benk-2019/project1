import * as express from 'express';
import { AppDataSource } from '../../data-source';
import { Team } from '../../entity/Team';

const router = express.Router();

const teamRepo = AppDataSource.getRepository(Team);

router.get('/', async (req, res)=>{
    // const result = await teamRepo.createQueryBuilder("team").innerJoinAndSelect("team.coaches", "coach").select("team.*, coach.id as coach_id, (coach.firstName || ' ' || coach.lastName) as coach_names").execute();
    const result = await teamRepo.find({relations:['coaches', 'players'], relationLoadStrategy:"join"});
    // console.log(result[0].coaches[0]);
    res.status(200).send(result);
});

// router.post('/', async (req,res)=>{
//     const result = await teamRepo
// });

export {router};