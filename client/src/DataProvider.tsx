
export interface IPropsUser {
    name: string;
    email: string;
    age: string;
    _id: number;
    deleteSingleUser:(_id: number)=>void;
}


export interface CreateUserInfo {
    name: string;
    email: string;
    age: string;
}



export interface UpdateUserInfo {
    name: string;
    email: string;
    age: string;
}



