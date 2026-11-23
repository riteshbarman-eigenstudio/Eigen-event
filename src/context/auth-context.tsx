"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { TeamMember } from "@/types";

interface AuthValue {
  user: TeamMember;
  organization: string;
  signOut: () => void;
}

const AuthContext = createContext<AuthValue | null>(null);

// Demo user. Replaced by Auth.js session once auth lands (plan step 1).
const demoUser: TeamMember = { id: "m1", name: "Ritesh Sharma", email: "ritesh@eigenevent.example", role: "Owner" };

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user] = useState(demoUser);
  const value = useMemo<AuthValue>(
    () => ({ user, organization: "Eigen Studio", signOut: () => (window.location.href = "/login") }),
    [user],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
