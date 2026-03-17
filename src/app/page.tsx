import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-xl rounded-2xl border p-8 shadow-sm">
        <h1 className="text-3xl font-bold">FlavorAI</h1>
        <p className="mt-3 text-sm text-gray-600">
          Smart recipe discovery platform
        </p>

        <div className="mt-6 flex gap-3">
          <Link
            href="/login"
            className="rounded-xl bg-black px-4 py-2 text-white"
          >
            Login
          </Link>
          <Link href="/register" className="rounded-xl border px-4 py-2">
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}
