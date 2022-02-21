import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '~/data/abstract/abstract.entity';
import { QuizQuestion } from './quiz-question';
import { WorkQuiz } from './work-quiz';

@Entity()
export class QuizCategory extends AbstractEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ManyToOne(() => WorkQuiz, (workQuiz) => workQuiz.id)
  quiz: WorkQuiz;

  @OneToMany(() => QuizQuestion, (question) => question.category)
  questions: QuizQuestion[];
}
