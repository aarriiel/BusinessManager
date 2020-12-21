import "reflect-metadata"
import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm"
import {Client} from "./Client"
import { text } from "express"

@Entity()
export class Relationship {

    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(type => Client)
    @JoinColumn()
    client: Client

    @Column({ type: 'varchar', length: 30, nullable: false })
    businessID: string

}