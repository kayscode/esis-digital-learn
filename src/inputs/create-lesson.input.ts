import { InputType, ID } from "@nestjs/graphql";
import { Field } from "@nestjs/graphql";
import { MinLength, IsDateString } from "class-validator";

@InputType()
export class CreateLessonInput{
    
    @MinLength(2)
    @Field()
    name : string;

    @IsDateString()
    @Field()
    startDate: string;

    @IsDateString()
    @Field()
    endDate : string;

    @Field( type => [ID])
    students : string[];
}