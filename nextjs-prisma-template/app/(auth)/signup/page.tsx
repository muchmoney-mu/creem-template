"use client";
import { Suspense } from "react";
import { Background } from "@/components/creem/landing/background";
import { TerminalButton } from "@/components/ui/terminal-button";

export default function SignupPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      <Background />
      <main className="relative z-10 w-full max-w-md mx-auto px-4 py-12 flex flex-col items-center">
        <h1 className="font-mono text-2xl md:text-3xl text-white mb-8 text-center select-none">
          <span className="text-[#ffbe98]">$</span> Signup to Creem
        </h1>
        <Suspense
          fallback={
            <div className="text-neutral-400 font-mono">Loading...</div>
          }
        >
          <SignupForm />
        </Suspense>
      </main>
    </div>
  );
}

import { useState, FormEvent } from "react";
import { authClient } from "@/lib/auth-client";

interface SignupFormState {
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;
}

export function SignupForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [state, setState] = useState<SignupFormState>({
    isLoading: false,
    hasError: false,
    errorMessage: "",
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState({ isLoading: true, hasError: false, errorMessage: "" });
    try {
      // Adjust this method if your better-auth version uses a different API
      // await authClient.signUpWithEmailAndPassword(form.email, form.password);
      const email = form.email;
      const password = form.password;
      const { data, error } = await authClient.signUp.email(
        {
          email,
          password,
          callbackURL: `/dashboard`,
          name: form.email,
        },
        {
          onRequest: (ctx) => {
            console.log("Requesting signup", ctx);
          },
          onSuccess: (ctx) => {
            console.log("Signup successful", ctx);
          },
          onError: (ctx) => {
            console.error("Signup error", ctx);
            setState({
              isLoading: false,
              hasError: true,
              errorMessage: ctx.error.message,
            });
          },
        },
      );
      // Optionally redirect or show success
      window.location.href = "/";
    } catch (err: any) {
      setState({
        isLoading: false,
        hasError: true,
        errorMessage: err?.message || "Signup failed",
      });
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-4 bg-neutral-900/80 border border-neutral-800 rounded-xl p-6 shadow-lg"
    >
      <label className="font-mono text-sm text-neutral-300" htmlFor="email">
        Email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
        className="rounded bg-neutral-950 border border-neutral-800 px-3 py-2 text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#ffbe98]"
        value={form.email}
        onChange={handleChange}
        disabled={state.isLoading}
      />
      <label className="font-mono text-sm text-neutral-300" htmlFor="password">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="new-password"
        required
        minLength={8}
        className="rounded bg-neutral-950 border border-neutral-800 px-3 py-2 text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#ffbe98]"
        value={form.password}
        onChange={handleChange}
        disabled={state.isLoading}
      />
      <TerminalButton
        type="submit"
        className="mt-4 w-full justify-center"
        disabled={state.isLoading}
        prompt={"$"}
        command={state.isLoading ? "signing up..." : "signup"}
        path={form.email ? form.email : "/user"}
      >
        {state.isLoading ? "Signing up..." : "Sign up"}
      </TerminalButton>
      {state.hasError && (
        <div className="text-red-400 font-mono text-xs mt-2">
          {state.errorMessage}
        </div>
      )}
    </form>
  );
}
