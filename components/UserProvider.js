// components/UserProvider.js
import { createContext, useContext, useEffect, useState } from "react";

const UserCtx = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    try {
      const r = await fetch("/api/auth/me");
      const data = await r.json();
      setUser(data.user || null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      await refresh();
    }
  }

  useEffect(() => {
    refresh();
    const onVis = () => document.visibilityState === "visible" && refresh();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <UserCtx.Provider value={{ user, loading, refresh, logout }}>
      {children}
    </UserCtx.Provider>
  );
}

export function useUser() {
  return useContext(UserCtx);
}
