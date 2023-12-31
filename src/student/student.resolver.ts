import { Mutation, Query, Resolver } from "@nestjs/graphql";
import { StudentType } from "./student.type";
import { CreateStudentInput } from "./create-student.input";

import { Args } from "@nestjs/graphql";
import { StudentService } from "./student.service";

@Resolver( of => StudentType)
export class StudentResolver{

    constructor(
        private studentService : StudentService
    ){}

    @Mutation(returns => StudentType)
    async createStudent(
        @Args("createStudentInput") createStudentInput : CreateStudentInput
    ){
        return await this.studentService.createStudent(createStudentInput)
    }

    @Query(returns => StudentType)
    async showStudent(
        @Args('studentMatricule') studentMatricule : string
    )
    {
        return await this.studentService.findStudent(studentMatricule);
    }

    @Query(returns => [StudentType])
    async showStudentList()
    {
        return await this.studentService.findStudents()
    }
}