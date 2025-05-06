// data-source.ts
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
      type:"postgres",
      host:'localhost',
      username:'postgres',
      password:'admin#Aswar2002',
      database:'sims',
      entities: ['common/database/entities/*.entity.ts'],
      migrations: ['common/database/migrations/*.ts'],
      synchronize: false
});
