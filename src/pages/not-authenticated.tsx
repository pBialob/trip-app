// pages/not-authenticated.tsx

import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const NotAuthenticated: NextPage = () => {
  return <div className="text-6xl">Not Authenticated</div>;
};

export default NotAuthenticated;
