import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Mail {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    senderId: number;

    @Column({ nullable: true })
    senderName: number;

    @Column()
    receiverId: number;

    @Column()
    topic: string;

    @Column()
    message: string;

    @Column({ default: false })
    read: boolean;
}
