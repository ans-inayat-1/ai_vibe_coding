import { UserProfilePage } from "@/components/profile/user-profile-page"

interface ProfilePageProps {
  params: {
    username: string
  }
}

export default function ProfilePage({ params }: ProfilePageProps) {
  // In a real app, you would fetch user data based on the username
  // and determine if the current user is the owner
  const isOwner = false // This would be determined by comparing with current user

  return <UserProfilePage userId={params.username} isOwner={isOwner} />
}
