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