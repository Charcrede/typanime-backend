import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Challenge } from '../../challenges/entities/challenge.entity';
import { User } from '../../users/entities/user.entity';

@Entity('challenge_participants')
export class ChallengeParticipant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Challenge, (challenge) => challenge.participants)
  @JoinColumn({ name: 'challenge_id' })
  challenge: Challenge;

  @Column()
  challenge_id: number;

  @ManyToOne(() => User, (user) => user.challengeParticipations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: number;

  @Column()
  wpm: number;

  @Column({ type: 'float' })
  accuracy: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
}
