import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const UserComponent: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const loggedUser = useUser();
  let userId = router.query.user as string;

  if (!userId) {
    if (router.query.all?.length) {
      userId = router.query.all[0];
    }
  }
  return (
    <>
      {loggedUser && loggedUser.user_metadata.provider_id == userId && children}
    </>
  );
};

export default UserComponent;
