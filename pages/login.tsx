import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import type { NextPage } from "next";

const Login: NextPage = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  if (!user)
    return (
      <Auth
        redirectTo="http://localhost:3000/"
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
