import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('stats')
export class Stat {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.stat)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: number;

  @Column({ type: 'float' })
  average_wpm: number;

  @Column()
  best_wpm: number;

  @Column()
  games_played: number;

  @Column({ type: 'timestamp', nullable: true })
  last_played_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
