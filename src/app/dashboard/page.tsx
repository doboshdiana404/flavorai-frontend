"use client";

import { useEffect, useState } from "react";
import { getCurrentUser, removeToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

type DashboardUser = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
};

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<DashboardUser | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load user");
        removeToken();
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, [router]);

  function handleLogout() {
    removeToken();
    router.push("/login");
  }

  if (isLoading) {
    return (
      <main className="min-h-screen p-6">
        <div className="mx-auto max-w-3xl">Loading...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500">Signed in as</p>
            <h1 className="mt-1 text-3xl font-semibold">{user?.name}</h1>
            <p className="mt-2 text-sm text-gray-600">{user?.email}</p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl border px-4 py-2 text-sm"
          >
            Logout
          </button>
        </div>

        {error ? (
          <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        ) : null}

        <div className="mt-8 rounded-2xl border p-5">
          <h2 className="text-lg font-medium">Auth flow works</h2>
          <p className="mt-2 text-sm text-gray-600">
            Backend register, login, JWT guard and /auth/me are connected.
          </p>
        </div>
      </div>
    </main>
  );
}
