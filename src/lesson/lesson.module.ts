import { Module } from '@nestjs/common';
import { LessonResolver } from './lesson.resolver';
import { Lesson } from './lesson.document';
import { LessonService } from './lesson.service';

import { TypeOrmModule } from "@nestjs/typeorm"
import { StudentModule } from 'src/student/student.module';

@Module({
    imports : [
        TypeOrmModule.forFeature([Lesson]),
        StudentModule
    ],
    providers : [
        LessonService,LessonResolver
    ],
})
export class LessonModule {}
