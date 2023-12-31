import { Student } from "src/student/student.document"
import { Entity, Column, ObjectIdColumn, PrimaryColumn} from "typeorm"

@Entity("lessons")
export class Lesson{

    @ObjectIdColumn()
    _id : string

    @PrimaryColumn()
    id : string

    @Column()
    name : string

    @Column()
    startDate : string

    @Column()
    endDate : string;

    @Column()
    students : string[];
}