
import { IInstructorRepository } from "../interfaces/iInstructor.Repository";
import { Instructor } from "../model/instructor.entities";
import InstructorModel from "../model/schemas/instructor.schema";



export class InstructorRepository implements IInstructorRepository {
    async register(data: Instructor) {
        return await InstructorModel.create(data)
    }
}