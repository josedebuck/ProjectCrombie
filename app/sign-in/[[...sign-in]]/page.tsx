import { SignIn, useClerk } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Page() {
  const { user } = useClerk();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      // Si el usuario está autenticado, redirigir a la página de inicio
      router.push("/homepage");
    }
  }, [user, router]);

  return (
    <div className="h-[calc(100vh-96px)] flex items-center justify-center">
      <SignIn />
    </div>
  );
}
