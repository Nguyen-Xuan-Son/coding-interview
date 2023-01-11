interface UserAttributes {
  id?: number;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type UserInput = UserAttributes;
export type UserOutput = UserAttributes;

export default UserAttributes;
