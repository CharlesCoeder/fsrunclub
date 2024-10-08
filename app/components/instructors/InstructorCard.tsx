import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Instructor } from "@/types/instructor";

interface InstructorCardProps {
  instructor: Instructor;
}

export default function InstructorCard({ instructor }: InstructorCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={instructor.profileImage ?? undefined} alt={instructor.name ?? 'Instructor'} />
            <AvatarFallback>{instructor.name?.charAt(0) ?? 'I'}</AvatarFallback>
          </Avatar>
          <CardTitle>{instructor.name ?? 'Unnamed Instructor'}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{instructor.bio ?? 'No bio available'}</p>
        <div className="flex flex-wrap gap-2">
          {instructor.specialties?.map((specialty, index) => (
            <Badge key={index} variant="secondary">
              {specialty}
            </Badge>
          )) ?? <Badge variant="secondary">No specialties listed</Badge>}
        </div>
      </CardContent>
      <CardFooter>
        <a
          href={`/profile/${instructor.id}`}
          className="text-blue-500 hover:underline"
        >
          View Profile
        </a>
      </CardFooter>
    </Card>
  );
}
