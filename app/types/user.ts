export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role: "USER" | "INSTRUCTOR";
};

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserDto
  extends Partial<Omit<CreateUserDto, "password">> {
  id: string;
}
