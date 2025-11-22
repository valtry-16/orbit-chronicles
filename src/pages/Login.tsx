import { useState } from "react";
import { supabase } from "@/supabase/client";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e: any) {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return alert("Invalid login");

    nav("/dashboard");
  }

  async function loginWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }

  return (
    <div className="max-w-md mx-auto mt-24 p-6 bg-card rounded">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <form onSubmit={submit} className="space-y-4">
        <input className="w-full p-2 border rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)} />

        <input className="w-full p-2 border rounded"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} />

        <button className="w-full p-2 bg-primary text-white rounded">
          Login
        </button>
      </form>

      <button 
        onClick={loginWithGoogle}
        className="w-full mt-4 p-2 bg-red-600 text-white rounded"
      >
        Continue with Google
      </button>
    </div>
  );
}