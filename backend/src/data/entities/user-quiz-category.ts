import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { QuizCategory } from './quiz-category';
import { User } from './user';

@Entity()
export class User_QuizeCategory {
  @PrimaryColumn()
  quizCaregoryId: number;
  @OneToOne(() => QuizCategory, (quizCategory) => quizCategory.id)
  @JoinColumn({ name: 'quizCaregoryId' })
  quizCategory: QuizCategory;

  @PrimaryColumn()
  userId: number;
  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'integer' })
  score: string;
}
