// components/Layout.tsx
import Link from "next/link";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";

export default function HeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: sessionData } = useSession();

  return (
    <div>
      <header className="border-base-border fixed left-0 top-0 z-10 w-full border-b bg-white">
        <nav className="flex h-[var(--navigation-height)] w-full">
          <div className="mx-4 flex h-full w-full  items-center justify-between">
            <div className="flex text-2xl">
              <Link href="/">
                <div className="text-2xl font-bold text-black no-underline">
                  Trip App
                </div>
              </Link>
              {sessionData?.user && (
                <>
                  <Link href="/trips/my">
                    <div className="ml-12 text-black no-underline">
                      My Trips
                    </div>
                  </Link>
                  <Link href="/trips/new">
                    <div className="ml-12 text-black no-underline">
                      New Trip
                    </div>
                  </Link>
                </>
              )}
            </div>
            <SessionProvider>
              <div className="flex items-center gap-4">
                <p className="text-center text-2xl text-black">
                  {sessionData && (
                    <span>Zalogowany jako {sessionData.user?.name}</span>
                  )}
                </p>
                <button
                  className="rounded bg-black px-10 py-3 font-semibold text-white no-underline transition hover:bg-black/80"
                  onClick={
                    sessionData ? () => void signOut() : () => void signIn()
                  }
                >
                  {sessionData ? "Sign out" : "Sign in"}
                </button>
              </div>
            </SessionProvider>
          </div>
        </nav>
      </header>

      {children}
    </div>
  );
}
