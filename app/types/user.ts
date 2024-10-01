export interface User {
  id: string;
  name: string;
  email: string;
  runCount: number;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserDto
  extends Partial<Omit<CreateUserDto, "password">> {
  id: string;
}
