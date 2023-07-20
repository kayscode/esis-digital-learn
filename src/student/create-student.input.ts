import { InputType, Field, ID } from "@nestjs/graphql";
import { MinLength, IsEmail, Length } from "class-validator";

@InputType()
export class CreateStudentInput{

    @Length(6)
    @Field( type => ID)
    matricule : string

    @MinLength(2)
    @Field()
    firstName : string;

    @MinLength(2)
    @Field()
    lastName : string;

    @MinLength(2)
    @Field()
    middleName : string;

    @IsEmail()
    @Field()
    email : string;
}