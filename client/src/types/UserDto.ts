export interface UserDto {
  id?: number;
  email: string;
  fullName: string;
  mobile: string;
  dateOfBirth?: Date | null;
  address: string;
}
