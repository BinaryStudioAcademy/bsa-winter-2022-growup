import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '~/data/abstract/abstract.entity';
import { QuizCategory } from './quizCategory';

@Entity()
export class QuizQuestion extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 250 })
  question: string;

  @ManyToOne(() => QuizCategory, (quizeCategory) => quizeCategory.id)
  category: QuizCategory[];
}
