import { Entity, Column, ManyToOne } from 'typeorm';
import { AbstractEntity } from '~/data/abstract/abstract.entity';
import { QuizCategory } from './quizCategory';

@Entity()
export class QuizQuestion extends AbstractEntity {
  @Column({ type: 'varchar', length: 250 })
  question: string;

  @ManyToOne(() => QuizCategory, (quizeCategory) => quizeCategory.id)
  category: QuizCategory[];
}
