import { IInstructorService } from "../interfaces/iInstructor";
import { Instructor } from "../model/instructor.entities";

export class InstructorController {

    constructor(private service : IInstructorService) {}

    registerInstructor = async (data: any) => {
        console.log(data);
        try{
            const response = await this.service.userRegister(data)
            return response;
        }
        catch(e: any){
            console.log(e);
        }
    }
}
