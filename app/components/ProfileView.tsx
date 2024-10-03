import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ProfileViewProps = {
  profile: {
    name: string;
    email: string;
    image: string;
    role: string;
    bio?: string;
    participatedRuns: Array<{
      id: string;
      date: Date;
      distance: number;
      pace: string;
    }>;
  };
};

export default function ProfileView({ profile }: ProfileViewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{profile.name}&apos;s Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-4">
          <Image
            src={profile.image || "/default-avatar.png"}
            alt={profile.name}
            width={100}
            height={100}
            className="rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            <p className="text-gray-500">{profile.email}</p>
            <p className="text-gray-500">{profile.role}</p>
          </div>
        </div>
        {profile.bio && (
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Bio</h3>
            <p>{profile.bio}</p>
          </div>
        )}
        <div>
          <h3 className="text-xl font-semibold mb-2">Participated Runs</h3>
          {profile.participatedRuns.length > 0 ? (
            <ul className="space-y-2">
              {profile.participatedRuns.map((run) => (
                <li key={run.id} className="border p-2 rounded">
                  <p>Date: {run.date.toLocaleDateString()}</p>
                  <p>Distance: {run.distance} miles</p>
                  <p>Pace: {run.pace}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No runs participated yet.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}