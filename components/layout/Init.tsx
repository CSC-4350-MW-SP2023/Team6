import { useSupabaseClient } from "@supabase/auth-helpers-react";
import axios from "axios";
import React, { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

const Init: React.FC<Props> = ({ children }) => {
  const supabaseClient = useSupabaseClient();
  useEffect(() => {
    supabaseClient.auth.onAuthStateChange(async (event, session) => {
      if (event == "SIGNED_IN") {
        await axios.put("/api/user");
      }
    });
  }, []);
  return <>{children}</>;
};

export default Init;
