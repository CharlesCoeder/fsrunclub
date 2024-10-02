export interface Instructor {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  bio: string | null;
  profileImage: string;
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
