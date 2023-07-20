import {Resolver, Query, Mutation, Args} from "@nestjs/graphql"
import { LessonType } from "./lesson.type";
import { LessonService } from "./lesson.service";
import { CreateLessonInput } from "src/inputs/create-lesson.input";
// import { Query } from "@nestjs/common";

@Resolver(of => LessonType)
export class LessonResolver{

    constructor(
        private lessonService : LessonService
    ){}

    @Query(returns => [LessonType])
    async lessons(){

        return await this.lessonService.getLessons()
    }

    @Query(returns => LessonType)
    async lesson(@Args("id") id : string ){
        return await this.lessonService.getLesson(id);
    }

    // @Mutation(returns => LessonType)
    // createLesson(
    //     @Args('name') name : string,
    //     @Args('startDate') startDate : string,
    //     @Args('endDate') endDate : string,
    // ){
    //     return this.lessonService.createlesson(name,startDate,endDate);
    // } 

    @Mutation(returns => LessonType)
    async createLesson(@Args('createLessonInput') createLessonInput : CreateLessonInput){
        return this.lessonService.createLesson(createLessonInput);
    }
}