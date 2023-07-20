import { Injectable } from '@nestjs/common';
import { Lesson } from './lesson.entity';
import { InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {v4 as uuid} from "uuid";
import { CreateLessonInput } from 'src/inputs/create-lesson.input';
import { Args, Mutation } from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { StudentService } from 'src/student/student.service';


@Injectable()
export class LessonService {

    constructor(
        @InjectRepository(Lesson)
        private lessonRepository : Repository<Lesson>
    ){}

    async getLessons() : Promise<Lesson[]>
    {
        return await this.lessonRepository.find();
    }

    async getLesson(id : string) : Promise<Lesson>
    {
        return await this.lessonRepository.findOne({ where :{ id : id}});
    }

    // async createlesson(
    //     name : string,
    //     startDate : string,
    //     endDate : string
    // ) : Promise<Lesson>{
    //     const lesson = this.lessonRepository.create(
    //         {name : name, startDate : startDate, endDate : endDate, id : uuid()}
    //     )

    //     return this.lessonRepository.save(lesson);
    // }

    async createLesson( createLessonInput : CreateLessonInput)
    {
        const { name , startDate, endDate } = createLessonInput;
        const id = uuid()
        const lesson = this.lessonRepository.create({
            id,name,startDate,endDate
        });

        return this.lessonRepository.save(lesson);
    }

    @Mutation(returns => LessonType)
    async addStudentToLessonClass(
        @Args("lessonClassCode") lessonClassCode:string,
        @Args("studentMat") studentMatricule : string,
        studentService : StudentService
    )
    {
        const lesson = await this.lessonRepository.findOne({where : { id : lessonClassCode}});
        const student = await studentService.findStudent(studentMatricule);

        lesson.students = [ student]
        return await this.lessonRepository.save(lesson);
    }
}
