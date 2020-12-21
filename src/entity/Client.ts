import "reflect-metadata"
import {Entity, PrimaryGeneratedColumn, Column, Unique} from "typeorm"

@Entity()
@Unique(["name"])
export class Client {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 30, nullable: false })
    name: string

    @Column({ type: 'varchar', length: 30, nullable: false })
    gender: string

    @Column({ type: 'varchar', length: 30, nullable: false })
    birthday: string

    @Column({ type: 'varchar', length: 30, nullable: false })
    email: string

    @Column({ type: 'varchar', length: 30, nullable: false })
    phone: string

    @Column({ type: 'varchar', length: 30, nullable: false })
    remark: string

    @Column({ type: 'date', nullable: false })
    createTime: Date

    @Column({ type: 'date', nullable: false })
    updateTime: Date

}