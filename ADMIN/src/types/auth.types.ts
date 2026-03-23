export interface Auth {
  email: string;
  password: string;
}
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}
export interface changePassword {
  currentPassword: string;
  newPassword: string;
}
