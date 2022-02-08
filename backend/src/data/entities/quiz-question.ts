import { Entity, Column, ManyToOne } from 'typeorm';
import { AbstractEntity } from '~/data/abstract/abstract.entity';
import { QuizCategory } from './quiz-category';

@Entity()
export class QuizQuestion extends AbstractEntity {
  @Column({ type: 'varchar', length: 250 })
  question: string;

  @ManyToOne(() => QuizCategory, (quizCategory) => quizCategory.id)
  category: QuizCategory[];
}
