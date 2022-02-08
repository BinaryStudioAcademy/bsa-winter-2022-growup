import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '~/data/abstract/abstract.entity';
import { QuizQuestion } from './quizQuestion';

@Entity()
export class QuizAnswer extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 250 })
  answer: string;

  @Column({ type: 'integer' })
  score: string;

  @ManyToOne(() => QuizQuestion, (quizQuestion) => quizQuestion.id)
  question: QuizQuestion[];
}
