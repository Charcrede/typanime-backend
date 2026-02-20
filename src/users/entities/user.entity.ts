import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Game } from '../../games/entities/game.entity';
import { Stat } from '../../stats/entities/stat.entity';
import { ChallengeParticipant } from '../../challenge-participants/entities/challenge-participant.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  provider: string; // google | github

  @Column({ type: 'varchar' })
  provider_id: string;

  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  avatar: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => Game, (game) => game.user)
  games: Game[];

  @OneToOne(() => Stat, (stat) => stat.user)
  stat: Stat;

  @OneToMany(() => ChallengeParticipant, (cp) => cp.user)
  challengeParticipations: ChallengeParticipant[];
}
