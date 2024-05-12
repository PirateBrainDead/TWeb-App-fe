import { User } from 'next-auth';

export interface SignIn {
  username: string;
  password: string;
}

export interface CurrentUser extends User {
  token: string;
  user: LoggedInUser;
  lastLoggedInTime: string;
}

export default interface LoggedInUser {
  userId: string;
  username: string;
  storeId: string;
  role: string;
}
