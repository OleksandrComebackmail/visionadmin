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

const httpClient = (url: string, options: HttpOptions = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  } else if (!(options.headers instanceof Headers)) {
    options.headers = new Headers(options.headers);
  }

  const token = localStorage.getItem(ACCESS_KEY);
  if (token) {
    (options.headers as Headers).set("Authorization", `Bearer ${token}`);
  }
  return fetchUtils.fetchJson(url, options);
};

const base = simpleRestProvider(API_URL, httpClient);

const normalizeId = <T extends BaseItem>(item: T): T & { id: string } => ({
  id: item?.id ?? item?._id ?? "",
  ...item,
});

export const dataProvider: DataProvider = {
  ...base,

  getList: async (resource: string, params: GetListParams) => {
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
    return base.delete(resource, params);
  },
};
