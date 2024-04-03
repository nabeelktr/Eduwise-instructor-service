import { IUserRepository } from "../interfaces/iUser.Repository";
import UserModel, { IUser } from "../model/schemas/user.schema";

export class UserRepository implements IUserRepository {
    async changeRole(userId: string) {
        const user = await UserModel.findByIdAndUpdate(userId, {role: "instructor"}).select("-password")
        return user;
    }

}
