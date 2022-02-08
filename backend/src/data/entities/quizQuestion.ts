import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { QuizCategory } from './quizCategory';

@Entity()
export class QuizQuestion {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', length: 250 })
  question: string;

  @ManyToOne(() => QuizCategory, (quizeCategory) => quizeCategory.id)
  category: QuizCategory[];
}
