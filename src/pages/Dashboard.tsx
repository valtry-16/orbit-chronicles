// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function load() {
      try {
        const r = await me();
        setUser(r.data);
      } catch {
        window.location.href = "/login";
      }
    }
    load();
  }, []);

  return (
    <div className="mt-24 max-w-3xl mx-auto p-6 bg-card rounded">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      {user ? (
        <>
          <div className="p-4 bg-gray-800 rounded">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Name:</strong> {user.name || "—"}</p>
          </div>

          <Link to="/favorites" className="block mt-4 px-4 py-2 bg-primary text-white rounded">View Favorites</Link>

          <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded" onClick={async ()=>{ await logout(); window.location.href="/login"; }}>
            Logout
          </button>
        </>
      ) : <p>Loading...</p>}
    </div>
  );
}