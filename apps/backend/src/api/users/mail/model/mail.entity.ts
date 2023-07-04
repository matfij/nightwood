import { DB_TIMESTAMP_TYPE } from "src/configuration/app.config";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Mail {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: DB_TIMESTAMP_TYPE })
    sentDate: number;

    @Column({ nullable: true })
    senderId: number;

    @Column({ nullable: true })
    senderName: string;

    @Column()
    receiverId: number;

    @Column()
    topic: string;

    @Column()
    message: string;

    @Column({ default: false })
    isRead: boolean;
}
