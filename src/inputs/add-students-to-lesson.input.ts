import { Field, ID, InputType } from "@nestjs/graphql";
import { IsArray, IsString, IsUUID } from "class-validator";


@InputType()
export class AddStudentsToLessonClassInput{

    @IsUUID("4")
    @Field(type => ID)
    lessonClassCode : string;

    @IsArray()
    @Field(type => [ID])
    studentsMatricule : string[];

}