import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('identity', { type: 'bigint' })
  Id: string;

  @Column('datetime', {
    transformer: {
      to(value: Date): Date {
        return value;
      },
      from(value: Date): string {
        return value.toLocaleString();
      },
    },
  })
  InsDate: Date;
}
