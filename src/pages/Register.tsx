import { useState } from "react";
import { supabase } from "@/supabase/client";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e: any) {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) return alert("Error: " + error.message);

    alert("Account created! Check your email to confirm.");
    nav("/login");
  }

  return (
    <div className="max-w-md mx-auto mt-24 p-6 bg-card rounded">
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      <form onSubmit={submit} className="space-y-4">
        <input className="w-full p-2 border rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)} />

        <input className="w-full p-2 border rounded"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} />

        <button className="w-full p-2 bg-primary text-white rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
}