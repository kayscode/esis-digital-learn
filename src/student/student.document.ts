import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity("students")
export class Student{

    @ObjectIdColumn()
    _id : string;

    @PrimaryColumn()
    id : string;

    @Column({unique : true, nullable : false})
    matricule : string

    @Column()
    firstName : string;

    @Column()
    lastName : string;

    @Column()
    middleName : string;

    @Column()
    email : string;

}