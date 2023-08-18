"use client";

import { signOut } from "next-auth/react";

const DashboardClient = () => {
  return (
    <div>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
};
export default DashboardClient;
