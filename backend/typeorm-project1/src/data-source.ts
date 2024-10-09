import "reflect-metadata"
import { DataSource } from "typeorm"
import { Player } from "./entity/Player"
import {Team} from './entity/Team'
import { Coach } from "./entity/Coach";

require('dotenv').config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: process.env.PASSWORD,
    database: "hockey",
    synchronize: true,
    logging: true,
    entities: [Player, Team, Coach]
})
