import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Game } from '../../games/entities/game.entity';
import { Challenge } from '../../challenges/entities/challenge.entity';

@Entity('contents')
export class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  text: string;

  @Column({ type: 'varchar' })
  image: string;

  @Column({ type: 'varchar', nullable: true })
  author: string | null;

  @Column({ type: 'varchar' })
  type: string; // citation | synopsis

  @ManyToOne(() => Category, (category) => category.contents, { nullable: false })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  category_id: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => Game, (game) => game.content)
  games: Game[];

  @OneToMany(() => Challenge, (challenge) => challenge.content)
  challenges: Challenge[];
}
