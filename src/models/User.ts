import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { compare } from 'bcryptjs';


@Entity("users")
class User {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    email: string;

    @Column()
    password: string

    @Column()
    name: string;

    @CreateDateColumn()
    created_at: Date;

    async comparePassword(attempt: string): Promise<boolean> {
        return await compare(attempt, this.password);
    }
}

export {User as User}