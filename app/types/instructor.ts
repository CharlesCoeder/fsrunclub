export interface Instructor {
  id: string;
  name: string;
  email: string;
  bio: string;
  profileImage?: string;
  specialties: string[];
}

export interface CreateInstructorDto {
  name: string;
  email: string;
  password: string;
  bio: string;
  profileImage?: string;
  specialties: string[];
}

export interface UpdateInstructorDto
  extends Partial<Omit<CreateInstructorDto, "password">> {
  id: string;
}
