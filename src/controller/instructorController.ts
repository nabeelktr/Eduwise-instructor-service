import { IInstructorService } from "../interfaces/iInstructor";


export class InstructorController {

    constructor(private service : IInstructorService) {}

    registerInstructor = async (data: any) => {
        try{
            const response = await this.service.userRegister(data)
            return response;
        }
        catch(e: any){
            console.log(e);
        }
    }
}
