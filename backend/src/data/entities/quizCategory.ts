import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { WorkQuiz } from './workQuiz';

@Entity()
export class QuizCategory {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ManyToOne(() => WorkQuiz, (workQuiz) => workQuiz.id)
  quiz: WorkQuiz[];
}
