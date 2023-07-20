import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Student } from './student.document';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentInput } from './create-student.input';

@Injectable()
export class StudentService {

    constructor(
        @InjectRepository(Student)
        private studentRepository : Repository<Student>
    ){};

    public async createStudent(createStudentInput : CreateStudentInput){
        const {matricule, firstName, lastName, middleName, email} = createStudentInput;
        const student = this.studentRepository.create(
            {matricule, firstName, lastName, middleName, email}
        )

        return await this.studentRepository.save(student);
    }

    public async findStudent(matricule : string) : Promise<Student>
    {
        return await this.studentRepository.findOne({ where : {matricule : matricule}})
    }

    public async findStudents() : Promise<Student[]>
    {
        return await this.studentRepository.find();
    }
}
