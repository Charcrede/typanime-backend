import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Content } from '../../contents/entities/content.entity';

@Entity('games')
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.games)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: number;

  @ManyToOne(() => Content, (content) => content.games)
  @JoinColumn({ name: 'content_id' })
  content: Content;

  @Column()
  content_id: number;

  @Column()
  duration: number;

  @Column()
  wpm: number;

  @Column({ type: 'float' })
  accuracy: number;

  @Column({ type: 'varchar' })
  mode: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
}
