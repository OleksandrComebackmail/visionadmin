import {
  fetchUtils,
  DataProvider,
  GetListParams,
  GetOneParams,
  UpdateParams,
  UpdateResult,
  RaRecord,
  DeleteParams,
  DeleteResult,
} from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";

const API_URL = "https://api.vision.softwaredoes.com/api/staff";
const ACCESS_KEY = "access_token";

interface HttpOptions {
  headers?: HeadersInit;
  method?: string;
  body?: BodyInit | null;
  user?: {
    authenticated?: boolean;
    token?: string;
  };
  credentials?: RequestCredentials;
  mode?: RequestMode;
  cache?: RequestCache;
}

interface BaseItem {
  id?: string;
  _id?: string;
}

interface CategoryData extends RaRecord {
  name: string;
  description?: string;
  imageUrl?: string;
  isDraft?: boolean;
  [key: string]: unknown;
}

const refreshToken = async () => {
  const refresh = localStorage.getItem("refresh_token");
  if (!refresh) throw new Error("No refresh token");
  const res = await fetch(
    "https://api.vision.softwaredoes.com/api/staff/auth/refresh",
    {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${refresh}`,
      }),
      body: JSON.stringify({ refreshToken: refresh }),
    },
  );
  if (!res.ok) throw new Error(await res.text().catch(() => res.statusText));
  const data = await res.json();
  if (!data.access_token)
    throw new Error("No access_token in refresh response");
  localStorage.setItem("access_token", data.access_token);
  if (data.refresh_token)
    localStorage.setItem("refresh_token", data.refresh_token);
  return data.access_token;
};

const httpClient = async (url: string, options: HttpOptions = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  } else if (!(options.headers instanceof Headers)) {
    options.headers = new Headers(options.headers);
  }
  let token = localStorage.getItem(ACCESS_KEY);
  if (token) {
    (options.headers as Headers).set("Authorization", `Bearer ${token}`);
  }
  try {
    return await fetchUtils.fetchJson(url, options);
  } catch (error: any) {
    if (error.status === 401) {
      try {
        token = await refreshToken();
        (options.headers as Headers).set("Authorization", `Bearer ${token}`);
        return await fetchUtils.fetchJson(url, options);
      } catch (refreshError) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        throw error;
      }
    }
    throw error;
  }
};

const base = simpleRestProvider(API_URL, httpClient);

const normalizeId = <T extends BaseItem>(item: T): T & { id: string } => ({
  id: item?.id ?? item?._id ?? "",
  ...item,
});

export const dataProvider: DataProvider = {
  ...base,

  getList: async (resource: string, params: GetListParams) => {
    if (resource === "board-services") {
      const includeArchived = params.filter?.includeArchived || false;
      const url = `${API_URL}/board-services?includeArchived=${includeArchived}`;
      const { json } = await httpClient(url);
      const data = (Array.isArray(json) ? json : []).map(normalizeId);
      return { data, total: data.length };
    }
    if (resource === "board-services") {
      const includeArchived = params.meta?.includeArchived ? true : false;
      const url = `${API_URL}/${resource}?includeArchived=${includeArchived}`;
      const { json } = await httpClient(url);
      const data = (Array.isArray(json) ? json : []).map(normalizeId);
      return { data, total: data.length };
    }
    if (resource === "board-quotes") {
      const url = `${API_URL}/board-quotes`;
      const { json } = await httpClient(url);
      const data = (Array.isArray(json) ? json : []).map(normalizeId);
      return { data, total: data.length };
    }
    if (resource === "author-quotes") {
      const { page, perPage } = params.pagination || { page: 1, perPage: 10 };
      const url = `${API_URL}/author-quotes?limit=${perPage}&page=${page}`;
      const { json } = await httpClient(url);

      const data = (Array.isArray(json.data) ? json.data : []).map(normalizeId);
      const total = json.meta?.total || data.length;

      return { data, total };
    }
    if (resource === "categories") {
      const url = `${API_URL}/${resource}`;
      const { json } = await httpClient(url);
      const data = (Array.isArray(json) ? json : []).map(normalizeId);
      return { data, total: data.length };
    }
    if (resource === "users") {
      const url = `${API_URL}/${resource}`;
      const { json } = await fetchUtils.fetchJson(url, {
        method: "GET",
        headers: new Headers({
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem(ACCESS_KEY)}`,
        }),
      });
      const data = (Array.isArray(json.data) ? json.data : []).map(normalizeId);
      const total = json.meta?.total || data.length;
      return { data, total };
    }
    return base.getList(resource, params);
  },

  getUsersList: async (resource: string, params: GetListParams) => {
    if (resource === "users") {
      const url = `${API_URL}/${resource}`;
      const { json } = await httpClient(url, {
        method: "GET",
      });
      const data = (Array.isArray(json) ? json : []).map(normalizeId);
      return { data, total: data.length };
    }
    return base.getList(resource, params);
  },

  getOne: async (resource: string, params: GetOneParams) => {
    if (resource === "categories") {
      const url = `${API_URL}/${resource}/${params.id}`;
      const { json } = await httpClient(url);
      return { data: normalizeId(json) };
    }
    if (resource === "users") {
      const url = `${API_URL}/${resource}/${params.id}`;
      const { json } = await httpClient(url);
      const userData = json.data ? normalizeId(json.data) : normalizeId(json);
      return { data: userData };
    }
    return base.getOne(resource, params);
  },

  update: async (
    resource: string,
    params: UpdateParams<CategoryData>,
  ): Promise<UpdateResult> => {
    if (resource === "categories") {
      const url = `${API_URL}/${resource}/${params.id}`;
      const { json } = await httpClient(url, {
        method: "PUT",
        body: JSON.stringify(params.data),
      });
      return { data: normalizeId(json) };
    }
    if (resource === "board-quotes") {
      const url = `${API_URL}/board-quotes/${params.id}`;
      const { json } = await httpClient(url, {
        method: "PATCH",
        body: JSON.stringify(params.data),
      });
      return { data: normalizeId(json) };
    }
    if (resource === "author-quotes") {
      const url = `${API_URL}/author-quotes/${params.id}`;
      const { json } = await httpClient(url, {
        method: "PATCH",
        body: JSON.stringify(params.data),
      });
      return { data: normalizeId(json) };
    }
    return base.update(resource, params);
  },

  delete: async (
    resource: string,
    params: DeleteParams,
  ): Promise<DeleteResult> => {
    if (resource === "categories") {
      const url = `${API_URL}/${resource}/${params.id}`;
      await httpClient(url, { method: "DELETE" });
      return { data: { id: params.id } };
    }
    if (resource === "board-quotes") {
      const url = `${API_URL}/${resource}/${params.id}`;
      await httpClient(url, { method: "DELETE" });
      return { data: { id: params.id } };
    }
    if (resource === "author-quotes") {
      const url = `${API_URL}/${resource}/${params.id}`;
      await httpClient(url, { method: "DELETE" });
      return { data: { id: params.id } };
    }
    return base.delete(resource, params);
  },

  unarchiveBoardService: async (id: string): Promise<any> => {
    const url = `${API_URL}/board-services/${id}/unarchive`;
    const { json } = await httpClient(url, {
      method: "PATCH",
    });
    return { data: normalizeId(json) };
  },

  forceDeleteBoardService: async (id: string): Promise<any> => {
    const url = `${API_URL}/board-services/${id}/force`;
    const { json } = await httpClient(url, { method: "DELETE" });
    return { data: normalizeId(json) };
  },
};
