export interface Run {
  id: string;
  title: string;
  date: string;
  time: string;
  distance: number;
  pace: string;
  location: string;
  route?: string;
  instructorIds: string[];
  participantIds: string[];
  qrCode: string;
}

export interface RunWithDetails extends Run {
  instructors: Instructor[];
  participants: User[];
}

export interface CreateRunDto {
  title: string;
  date: string;
  time: string;
  distance: number;
  pace: string;
  location: string;
  route?: string;
  instructorIds: string[];
}

export interface UpdateRunDto extends Partial<CreateRunDto> {
  id: string;
}
