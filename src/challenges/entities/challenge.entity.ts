import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Content } from '../../contents/entities/content.entity';
import { ChallengeParticipant } from '../../challenge-participants/entities/challenge-participant.entity';

@Entity('challenges')
export class Challenge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @ManyToOne(() => Content, (content) => content.challenges)
  @JoinColumn({ name: 'content_id' })
  content: Content;

  @Column()
  content_id: number;

  @Column()
  duration: number;

  @Column({ type: 'timestamp' })
  expires_at: Date;

  @Column()
  max_players: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @OneToMany(() => ChallengeParticipant, (cp) => cp.challenge)
  participants: ChallengeParticipant[];
}
