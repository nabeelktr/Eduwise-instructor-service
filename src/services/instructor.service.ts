import { PutObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { s3 } from "../config/s3.config";
import { IInstructorService } from "../interfaces/iInstructor";
import { IInstructorRepository } from "../interfaces/iInstructor.Repository";
import { IUserRepository } from "../interfaces/iUser.Repository";
import { Instructor } from "../model/instructor.entities";
import crypto from "crypto";
import { S3Params } from "../interfaces/iServiceInterfaces";

export class InstructorService implements IInstructorService {
  constructor(
    private instructorRepository: IInstructorRepository,
    private userRepository: IUserRepository
  ) {}

  async userRegister(data: Instructor) {
    const {
      buffer,
      userId,
      degree,
      yearOfCompletion,
      institution,
      subject,
      certificateDate,
      certificateName,
      fieldName,
      mimeType,
    } = data;
    
    
    const randomName = (bytes = 32) =>
      crypto.randomBytes(bytes).toString("hex");
    const bucketName = process.env.S3_BUCKET_NAME || "";
    const imageName = `eduwise-certificates/${randomName()}`;


    const params: S3Params = {
      Bucket: bucketName,
      Key: imageName,
      Body: Buffer.from(buffer?.data || ""),
      ContentType: mimeType,
    };
    // const upload = new Upload({
    //   client: s3,
    //   params
    // })

    const command = new PutObjectCommand(params);
    await s3.send(command)
    // const result = await upload.done();
    const url = `https://eduwise.s3.ap-south-1.amazonaws.com/${imageName}`
    const userData = {
      userId,
      degree,
      yearOfCompletion,
      institution,
      subject,
      certificateDate,
      certificateName,
      mimeType,
      fieldName,
      certificate: url,
    };
    const instructor = await this.instructorRepository.register(userData);
    if (instructor) {
      const updateUserRole = await this.userRepository.changeRole(userId);
      const result = Buffer.from(JSON.stringify(updateUserRole));
      return result;
    } else {
      return "error adding instructor";
    }
  }
}
