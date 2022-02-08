import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { QuizQuestion } from './quizQuestion';

@Entity()
export class QuizAnswer {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', length: 250 })
  answer: string;

  @Column({ type: 'integer' })
  score: string;

  @ManyToOne(() => QuizQuestion, (quizQuestion) => quizQuestion.id)
  question: QuizQuestion[];
}
