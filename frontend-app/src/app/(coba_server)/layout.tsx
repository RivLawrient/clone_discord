import AuthProvider from "./aku/auth-provider";
import { getUser } from "./aku/getUser";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  return (
    <div>
      <AuthProvider initialUser={user}>{children}</AuthProvider>
    </div>
  );
}
