import { Injectable } from '@nestjs/common';
import { Lesson } from './lesson.document';
import { InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {v4 as uuid} from "uuid";
import { CreateLessonInput } from 'src/inputs/create-lesson.input';
import { Args, Mutation } from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { StudentService } from 'src/student/student.service';
import { AddStudentsToLessonClassInput } from 'src/inputs/add-students-to-lesson.input';


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
        const { name , startDate, endDate, students } = createLessonInput;
        const id = uuid()
        const lesson = this.lessonRepository.create({
            id,name,startDate,endDate,students
        });

        return this.lessonRepository.save(lesson);
    }

    // @Mutation(returns => LessonType)
    // async addStudentToLessonClass(
    //     @Args("lessonClassCode") lessonClassCode:string,
    //     @Args("studentMat") studentsMatricule : string[],
    //     studentService : StudentService
    // )
    // {
    //     const lesson = await this.lessonRepository.findOne({where : { id : lessonClassCode}});
    //     lesson.students = [...studentsMatricule]
    //     return await this.lessonRepository.save(lesson);
    // }

    async assignStudents( addStudentToLessonClass : AddStudentsToLessonClassInput)
    {
        const {lessonClassCode, studentsMatricule} = addStudentToLessonClass;
        const lesson = await this.getLesson(lessonClassCode);
        lesson.students = [...studentsMatricule]
        return await this.lessonRepository.save(lesson);
    }
}
