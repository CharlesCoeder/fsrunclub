import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getUserProfile } from "@/lib/user";
import ProfileView from "@/components/ProfileView";
import ProfileEdit from "@/components/ProfileEdit";
import { redirect } from "next/navigation";

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login"); // Redirect to login if not authenticated
  }

  let profileId = params.id;

  // If the ID is 'me', use the logged-in user's ID
  if (profileId === 'me') {
    profileId = session.user.id;
  }

  const profile = await getUserProfile(profileId);

  if (!profile) {
    return <div>Profile not found</div>;
  }

  const isOwnProfile = session.user.id === profile.id;

  return (
    <div className="container mx-auto py-8">
      {isOwnProfile ? (
        <ProfileEdit profile={profile} />
      ) : (
        <ProfileView profile={profile} />
      )}
    </div>
  );
}