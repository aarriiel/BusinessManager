import "reflect-metadata"
import {Entity, PrimaryGeneratedColumn, Column, Unique} from "typeorm"

@Entity()
@Unique(["account"])
export class Business {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 30, nullable: false })
    name: string

    @Column({ type: 'varchar', length: 30, nullable: false })
    account: string

    @Column({ type: 'varchar', length: 30, nullable: false })
    password: string;
}
