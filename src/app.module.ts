import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { LessonModule } from './lesson/lesson.module';
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo"
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './lesson/lesson.entity';
import { StudentModule } from './student/student.module';
import { Student } from './student/student.document';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile : true,
      driver : ApolloDriver
    }),
    
    TypeOrmModule.forRoot({
      type : "mongodb",
      host : "127.0.0.1",
      port : 27017,
      database : "esis-digital",
      synchronize : true,
      useUnifiedTopology : true,
      retryAttempts : 20,
      entities :[Lesson,Student]
    })
    ,
    LessonModule,
    StudentModule
  ],
})
export class AppModule {}
