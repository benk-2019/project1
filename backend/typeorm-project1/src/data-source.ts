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
    password: process.env.PASSWORD_PG,
    database: "hockey",
    synchronize: true,
    logging: false,
    entities: [Player, Team, Coach]
})
