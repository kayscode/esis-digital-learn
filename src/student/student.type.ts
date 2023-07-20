import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType("Student")
export class StudentType{

    @Field( type => ID)
    matricule : string

    @Field()
    firstName : string;

    @Field()
    lastName : string;

    @Field()
    middleName : string;

    @Field()
    email : string;

}