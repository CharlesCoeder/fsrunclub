export interface Instructor {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  bio: string | null;
  profileImage: string;
  specialties: string[];
}