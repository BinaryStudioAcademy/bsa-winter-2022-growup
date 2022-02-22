import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '~/data/abstract/abstract.entity';
import { QuizCategory } from './quiz-category';
import { QuizAnswer } from './quiz-answer';

@Entity()
export class QuizQuestion extends AbstractEntity {
  @Column({ type: 'varchar', length: 250 })
  question: string;

  @ManyToOne(() => QuizCategory, (quizCategory) => quizCategory.id)
  category: QuizCategory;

  @OneToMany(() => QuizAnswer, (answer) => answer.question)
  answers: QuizAnswer[];
}
