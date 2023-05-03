// This is the main layout of our app. It renders the header and the footer.

import { Head, Layout } from "rakkasjs";

const ProfileLayout: Layout = ({ children }) => (
  <>
    <Head title="Profile" />
    {children}
  </>
);
export default ProfileLayout;
