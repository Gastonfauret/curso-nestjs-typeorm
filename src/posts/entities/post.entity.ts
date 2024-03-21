import { User } from "src/users/entities/users.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('post')
export class Post {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    authorId: number

    @ManyToOne(() => User, (user) => user.posts)
    author: User
}
