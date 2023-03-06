import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const UserComponent: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const loggedUser = useUser();
  const userId = router.query.user as string;

  return (
    <>
      {loggedUser && loggedUser.user_metadata.provider_id == userId && children}
    </>
  );
};

export default UserComponent;
