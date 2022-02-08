import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '~/data/abstract/abstract.entity';
import { WorkQuiz } from './workQuiz';

@Entity()
export class QuizCategory extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ManyToOne(() => WorkQuiz, (workQuiz) => workQuiz.id)
  quiz: WorkQuiz[];
}
