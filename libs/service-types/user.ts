export interface GetUserList {
  userId?: string;
  firstName?: string;
  lastName?: string;
  emailId?: string;
  phoneNumber?: number;
}

export interface searchUser {
  field: Record<string, unknown>;
}

export interface RegisterUser {
  firstName: string;
  lastName?: string;
  emailId: string;
  phoneNumber?: number;
}
