import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import type { NextPage } from "next";
import { redirect } from "next/dist/server/api-utils";

const Login: NextPage = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  if (!user)
    return (
      <Auth
        redirectTo={
          process.env.NODE_ENV == "production"
            ? "https://porthub-two.vercel.app/"
            : "http://localhost:3000/"
        }
        supabaseClient={supabaseClient}
        appearance={{ theme: ThemeSupa }}
        providers={["google"]}
        socialLayout="horizontal"
        onlyThirdPartyProviders={true}
      />
    );

  return (
    <>
      <button onClick={() => supabaseClient.auth.signOut()}>Sign out</button>
    </>
  );
};

export default Login;
