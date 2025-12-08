import type { AuthProvider } from "react-admin";

const API_URL = "https://api.vision.softwaredoes.com/api";

type JwtClaims = {
  sub?: string;
  email?: string;
  name?: string;
  roles?: string[] | string;
  permissions?: string[] | string;
  exp?: number;
  [k: string]: unknown;
};

interface LoginParams {
  email?: string;
  username?: string;
  password: string;
}

interface HttpError {
  status?: number;
  response?: {
    status?: number;
    body?: unknown;
    statusText?: string;
  };
  message?: string;
}

const ACCESS_KEY = "access_token";
const REFRESH_KEY = "refresh_token";

function decodeJwt(token?: string | null): JwtClaims | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length < 2) return null;
  try {
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "===".slice((base64.length + 3) % 4);
    const json = atob(padded);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

async function refreshWithRefreshToken(): Promise<void> {
  const refresh = localStorage.getItem(REFRESH_KEY);
  if (!refresh) throw new Error("No refresh token");

  const res = await fetch(`${API_URL}/staff/auth/refresh`, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${refresh}`,
    }),
    body: JSON.stringify({ refreshToken: refresh }),
  });
  if (!res.ok) throw new Error(await res.text().catch(() => res.statusText));
  const data = await res.json();

  if (!data.access_token) {
    throw new Error("No access_token in refresh response");
  }

  localStorage.setItem(ACCESS_KEY, data.access_token);

  if (data.refresh_token) {
    localStorage.setItem(REFRESH_KEY, data.refresh_token);
  }
}

export const authProvider: AuthProvider = {
  async login(params: LoginParams) {
    const loginId = params?.email ?? params?.username;
    const password = params?.password;

    const res = await fetch(`${API_URL}/staff/auth/login`, {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({ email: loginId, password }),
    });
    if (!res.ok) throw new Error(await res.text().catch(() => res.statusText));

    const auth = await res.json();
    if (!auth?.access_token)
      throw new Error("No access_token in login response");

    localStorage.setItem(ACCESS_KEY, auth.access_token);
    if (auth.refresh_token)
      localStorage.setItem(REFRESH_KEY, auth.refresh_token);
    return Promise.resolve();
  },

  async logout() {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    return Promise.resolve("/login");
  },

  async checkError(error: HttpError) {
    const status = error?.status ?? error?.response?.status;
    if (status === 401 || status === 403) {
      try {
        await refreshWithRefreshToken();
        return Promise.resolve();
      } catch {
        localStorage.removeItem(ACCESS_KEY);
        localStorage.removeItem(REFRESH_KEY);
        return Promise.reject();
      }
    }
    return Promise.resolve();
  },

  async checkAuth() {
    const token = localStorage.getItem(ACCESS_KEY);
    if (!token) {
      if (localStorage.getItem(REFRESH_KEY)) {
        try {
          await refreshWithRefreshToken();
          return Promise.resolve();
        } catch {
          localStorage.removeItem(REFRESH_KEY);
        }
      }
      return Promise.reject();
    }

    const claims = decodeJwt(token);
    if (claims?.exp && Date.now() / 1000 > claims.exp) {
      try {
        await refreshWithRefreshToken();
        return Promise.resolve();
      } catch {
        localStorage.removeItem(ACCESS_KEY);
        localStorage.removeItem(REFRESH_KEY);
        return Promise.reject();
      }
    }
    return Promise.resolve();
  },

  async getPermissions() {
    const token = localStorage.getItem(ACCESS_KEY);
    const claims = decodeJwt(token);
    let perms = claims?.permissions ?? claims?.roles ?? [];
    if (typeof perms === "string") perms = [perms];
    return Promise.resolve((perms as string[]) || []);
  },

  async getIdentity() {
    const token = localStorage.getItem(ACCESS_KEY);
    const claims = decodeJwt(token);
    const id = claims?.sub || claims?.email || "me";
    const fullName =
      (claims?.name as string) || (claims?.email as string) || "User";
    const avatar = (claims?.avatar as string) || undefined;
    return Promise.resolve({ id, fullName, avatar });
  },
};
