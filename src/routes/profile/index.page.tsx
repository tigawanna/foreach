import { Page } from "rakkasjs";
import { Profile } from "./components/Profile";

 const ProfilePage:Page=({})=> {
  return (
    <main className="h-full w-full flex items-center justify-center o">
      <Profile/>
    </main>
  );
}

export default ProfilePage
