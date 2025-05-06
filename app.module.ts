import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/modules/user/user.module';
import { AuthModule } from 'src/modules/auth/auth.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'common/database/entities/user.entity';
import { DataSource } from 'typeorm';
import { AppDataSource } from 'common/database/datasource';

@Module({
  imports: [
    TypeOrmModule.forRoot({...AppDataSource.options,autoLoadEntities:true}),
    ConfigModule.forRoot({
      isGlobal:true
    }),
    UserModule, // ✅ Required if used anywhere
    AuthModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private dataSource : DataSource){}

async onModuleInit() {
try {
  if (this.dataSource.isInitialized) {
    console.log('App is running on 3000')
  }   
  else{
    console.log('fail');
  }     
} catch (error) {
  console.error("error",error)
}

}
}