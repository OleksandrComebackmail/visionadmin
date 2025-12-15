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
  CreateParams,
  CreateResult,
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
  } catch (error: unknown) {
    const err = error as { status?: number };
    if (err?.status === 401) {
      try {
        token = await refreshToken();
        (options.headers as Headers).set("Authorization", `Bearer ${token}`);
        return await fetchUtils.fetchJson(url, options);
      } catch {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        throw err;
      }
    }
    throw err;
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
      const includeArchived = !!params.meta?.includeArchived;
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
      const totalRaw = json?.meta?.total ?? json?.total ?? data.length;
      const total = Number(totalRaw) || data.length;

      return { data, total };
    }
    // if (resource === "categories") {
    //   const url = `${API_URL}/${resource}`;
    //   const { json } = await httpClient(url);
    //   const data = (Array.isArray(json) ? json : []).map(normalizeId);
    //   return { data, total: data.length };
    // }
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
    if (resource === "team") {
      const url = `https://api.vision.softwaredoes.com/api/admin/about/team`;
      const { json } = await httpClient(url);
      const data = (Array.isArray(json) ? json : []).map(normalizeId);
      return { data, total: data.length };
    }
    if (resource === "episodes") {
      const { page, perPage } = params.pagination || { page: 1, perPage: 10 };
      const url = `https://api.vision.softwaredoes.com/api/admin/episodes?limit=${perPage}&page=${page}`;
      const { json } = await httpClient(url);
      const data = (Array.isArray(json.data) ? json.data : []).map(normalizeId);
      const totalRaw = json?.meta?.total ?? json?.total ?? data.length;
      const total = Number(totalRaw) || data.length;
      return { data, total };
    }
    if (resource === "testimonials") {
      const { page, perPage } = params.pagination || { page: 1, perPage: 10 };
      const url = `https://api.vision.softwaredoes.com/api/admin/home/testimonials?limit=${perPage}&page=${page}`;
      const { json } = await httpClient(url);
      const data = (Array.isArray(json.data) ? json.data : []).map(normalizeId);
      const totalRaw = json?.meta?.total ?? json?.total ?? data.length;
      const total = Number(totalRaw) || data.length;
      return { data, total };
    }
    if (resource === "about") {
      const url = `https://api.vision.softwaredoes.com/api/admin/about/page`;
      const { json } = await httpClient(url);
      const item = json ?? {};
      const data = Array.isArray(item)
        ? item.map(normalizeId)
        : [normalizeId(item)];
      return { data, total: data.length };
    }

    if (resource === "terms") {
      const url = `https://api.vision.softwaredoes.com/api/admin/termsandpolicy/terms`;
      const { json } = await httpClient(url);
      const item = json ?? {};
      const data = Array.isArray(item)
        ? item.map(normalizeId)
        : [normalizeId(item)];
      return { data, total: data.length };
    }

    if (resource === "privacy") {
      const url = `https://api.vision.softwaredoes.com/api/admin/termsandpolicy/policy`;
      const { json } = await httpClient(url);
      const item = json ?? {};
      const data = Array.isArray(item)
        ? item.map(normalizeId)
        : [normalizeId(item)];
      return { data, total: data.length };
    }

    if (resource === "subscription") {
      const url = `https://api.vision.softwaredoes.com/api/admin/behind/page/subscription`;
      const { json } = await httpClient(url);
      const item = json ?? {};
      const data = [{ ...item, id: "subscription-page-id" }];
      return { data, total: data.length };
    }

    if (resource === "contact") {
      const url = `https://api.vision.softwaredoes.com/api/admin/contact`;
      const { json } = await httpClient(url);
      const item = json ?? {};
      const data = [{ ...item, id: "contact-page-id" }];
      return { data, total: data.length };
    }

    if (resource === "how-it-work") {
      const url = `https://api.vision.softwaredoes.com/api/admin/how-it-work`;
      const { json } = await httpClient(url);
      const item = json ?? {};
      const data = [{ ...item, id: "how-it-work-page-id" }];
      return { data, total: data.length };
    }

    if (resource === "home-page") {
      const url = `https://api.vision.softwaredoes.com/api/admin/home/page`;
      const { json } = await httpClient(url);
      const item = json ?? {};
      const data = [{ ...item, id: "home-page-id" }];
      return { data, total: data.length };
    }

    if (resource === "news") {
      const { page, perPage } = params.pagination || { page: 1, perPage: 10 };
      const url = `https://api.vision.softwaredoes.com/api/admin/news?limit=${perPage}&page=${page}`;
      const { json } = await httpClient(url);

      const data = (Array.isArray(json.data) ? json.data : []).map(normalizeId);
      const totalRaw = json?.meta?.total ?? json?.total ?? data.length;
      const total = Number(totalRaw) || data.length;

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
    // if (resource === "categories") {
    //   const url = `${API_URL}/${resource}/${params.id}`;
    //   const { json } = await httpClient(url);
    //   return { data: normalizeId(json) };
    // }
    if (resource === "users") {
      const url = `${API_URL}/${resource}/${params.id}`;
      const { json } = await httpClient(url);
      const userData = json.data ? normalizeId(json.data) : normalizeId(json);
      return { data: userData };
    }
    if (resource === "team") {
      const url = `https://api.vision.softwaredoes.com/api/admin/about/team/${params.id}`;
      const { json } = await httpClient(url);
      return { data: normalizeId(json) };
    }
    if (resource === "episodes") {
      const url = `https://api.vision.softwaredoes.com/api/admin/episodes/${params.id}`;
      const { json } = await httpClient(url);
      return { data: normalizeId(json) };
    }
    if (resource === "testimonials") {
      const url = `https://api.vision.softwaredoes.com/api/admin/home/testimonials/${params.id}`;
      const { json } = await httpClient(url);
      return { data: normalizeId(json) };
    }
    if (resource === "about") {
      const url = `https://api.vision.softwaredoes.com/api/admin/about/page`;
      const { json } = await httpClient(url);

      return {
        data: {
          ...json.content,
          id: "about-page-id",
        },
      };
    }

    if (resource === "terms") {
      const url = `https://api.vision.softwaredoes.com/api/admin/termsandpolicy/terms`;
      const { json } = await httpClient(url);

      return {
        data: {
          ...json,
          id: "terms-page-id",
        },
      };
    }

    if (resource === "privacy") {
      const url = `https://api.vision.softwaredoes.com/api/admin/termsandpolicy/policy`;
      const { json } = await httpClient(url);

      return {
        data: {
          ...json,
          id: "privacy-page-id",
        },
      };
    }

    if (resource === "behind") {
      const url = `https://api.vision.softwaredoes.com/api/admin/behind/page`;
      const { json } = await httpClient(url);
      return {
        data: {
          ...json,
          id: "page",
        },
      };
    }

    if (resource === "subscription") {
      const url = `https://api.vision.softwaredoes.com/api/admin/behind/page/subscription`;
      const { json } = await httpClient(url);
      return {
        data: {
          ...json,
          id: "subscription-page-id",
        },
      };
    }

    if (resource === "contact") {
      const url = `https://api.vision.softwaredoes.com/api/admin/contact`;
      const { json } = await httpClient(url);
      return {
        data: {
          ...json,
          id: "contact-page-id",
        },
      };
    }

    if (resource === "how-it-work") {
      const url = `https://api.vision.softwaredoes.com/api/admin/how-it-work`;
      const { json } = await httpClient(url);
      return {
        data: {
          ...json,
          id: "how-it-work-page-id",
        },
      };
    }

    if (resource === "home-page") {
      const url = `https://api.vision.softwaredoes.com/api/admin/home/page`;
      const { json } = await httpClient(url);
      return {
        data: {
          ...json,
          id: "home-page-id",
        },
      };
    }

    if (resource === "news") {
      const url = `https://api.vision.softwaredoes.com/api/admin/news/${params.id}`;
      const { json } = await httpClient(url);
      const item = json.data || json;
      return { data: normalizeId(item) };
    }
    return base.getOne(resource, params);
  },

  update: async (
    resource: string,
    params: UpdateParams<CategoryData>,
  ): Promise<UpdateResult> => {
    // if (resource === "categories") {
    //   const url = `${API_URL}/${resource}/${params.id}`;
    //   const { json } = await httpClient(url, {
    //     method: "PUT",
    //     body: JSON.stringify(params.data),
    //   });
    //   return { data: normalizeId(json) };
    // }
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
    if (resource === "team") {
      const url = `https://api.vision.softwaredoes.com/api/admin/about/team/${params.id}`;
      const { json } = await httpClient(url, {
        method: "PUT",
        body: JSON.stringify(params.data),
      });
      return { data: normalizeId(json) };
    }
    if (resource === "episodes") {
      const url = `https://api.vision.softwaredoes.com/api/admin/episodes/${params.id}`;
      const { json } = await httpClient(url, {
        method: "PUT",
        body: JSON.stringify(params.data),
      });
      return { data: normalizeId(json) };
    }
    if (resource === "testimonials") {
      const url = `https://api.vision.softwaredoes.com/api/admin/home/testimonials/${params.id}`;
      const { json } = await httpClient(url, {
        method: "PUT",
        body: JSON.stringify(params.data),
      });
      return { data: normalizeId(json) };
    }
    if (resource === "about") {
      const url = `https://api.vision.softwaredoes.com/api/admin/about/page`;
      const { json } = await httpClient(url, {
        method: "PUT",
        body: JSON.stringify(params.data),
      });
      return { data: normalizeId(json) };
    }
    if (resource === "behind") {
      const url = `https://api.vision.softwaredoes.com/api/admin/behind/page`;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _id, ...dataToStart } = params.data;

      const { json } = await httpClient(url, {
        method: "PUT",
        body: JSON.stringify(dataToStart),
      });

      return { data: { ...json, id: "page" } };
    }
    if (resource === "subscription") {
      const url = `https://api.vision.softwaredoes.com/api/admin/behind/page/subscription`;
      const { title, youtubeUrl, instagramUrl } = params.data;
      const { json } = await httpClient(url, {
        method: "PUT",
        body: JSON.stringify({ title, youtubeUrl, instagramUrl }),
      });
      return { data: { ...json, id: "subscription-page-id" } };
    }

    if (resource === "contact") {
      const url = `https://api.vision.softwaredoes.com/api/admin/contact`;
      const { title, description } = params.data;
      const { json } = await httpClient(url, {
        method: "PUT",
        body: JSON.stringify({ title, description }),
      });
      return { data: { ...json, id: "contact-page-id" } };
    }

    if (resource === "how-it-work") {
      const url = `https://api.vision.softwaredoes.com/api/admin/how-it-work`;
      const { preview, title, description } = params.data;
      const { json } = await httpClient(url, {
        method: "PUT",
        body: JSON.stringify({ preview, title, description }),
      });
      return { data: { ...json, id: "how-it-work-page-id" } };
    }

    if (resource === "home-page") {
      const url = `https://api.vision.softwaredoes.com/api/admin/home/page`;
      const { hero, map, shift } = params.data;
      const { json } = await httpClient(url, {
        method: "PUT",
        body: JSON.stringify({ hero, map, shift }),
      });
      return { data: { ...json, id: "home-page-id" } };
    }

    if (resource === "news") {
      const url = `https://api.vision.softwaredoes.com/api/admin/news/${params.id}`;
      const { json } = await httpClient(url, {
        method: "PUT",
        body: JSON.stringify(params.data),
      });
      return { data: normalizeId(json) };
    }
    if (resource === "terms") {
      const url = `https://api.vision.softwaredoes.com/api/admin/termsandpolicy/terms`;
      const { title, content } = params.data;

      const { json } = await httpClient(url, {
        method: "PUT",
        body: JSON.stringify({ title, content }),
      });
      return { data: { ...json, id: "terms-page-id" } };
    }
    if (resource === "privacy") {
      const url = `https://api.vision.softwaredoes.com/api/admin/termsandpolicy/policy`;
      const { title, content } = params.data;

      const { json } = await httpClient(url, {
        method: "PUT",
        body: JSON.stringify({ title, content }),
      });
      return { data: { ...json, id: "privacy-page-id" } };
    }
    return base.update(resource, params);
  },

  create: async (
    resource: string,
    params: CreateParams,
  ): Promise<CreateResult> => {
    if (resource === "episodes") {
      const url = `https://api.vision.softwaredoes.com/api/admin/episodes`;
      const { json } = await httpClient(url, {
        method: "POST",
        body: JSON.stringify(params.data),
      });
      return { data: normalizeId(json) };
    }
    if (resource === "testimonials") {
      const url = `https://api.vision.softwaredoes.com/api/admin/home/testimonials`;
      const { json } = await httpClient(url, {
        method: "POST",
        body: JSON.stringify(params.data),
      });
      return { data: normalizeId(json) };
    }

    if (resource === "news") {
      const url = `https://api.vision.softwaredoes.com/api/admin/news`;
      const { json } = await httpClient(url, {
        method: "POST",
        body: JSON.stringify(params.data),
      });
      return { data: normalizeId(json) };
    }
    return base.create(resource, params);
  },

  delete: async (
    resource: string,
    params: DeleteParams,
  ): Promise<DeleteResult> => {
    // if (resource === "categories") {
    //   const url = `${API_URL}/${resource}/${params.id}`;
    //   await httpClient(url, { method: "DELETE" });
    //   return { data: { id: params.id } };
    // }
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
    if (resource === "episodes") {
      const url = `https://api.vision.softwaredoes.com/api/admin/episodes/${params.id}`;
      await httpClient(url, { method: "DELETE" });
      return { data: { id: params.id } };
    }
    if (resource === "testimonials") {
      const url = `https://api.vision.softwaredoes.com/api/admin/home/testimonials/${params.id}`;
      await httpClient(url, { method: "DELETE" });
      return { data: { id: params.id } };
    }
    if (resource === "news") {
      const url = `https://api.vision.softwaredoes.com/api/admin/news/${params.id}`;
      await httpClient(url, { method: "DELETE" });
      return { data: { id: params.id } };
    }
    return base.delete(resource, params);
  },

  unarchiveBoardService: async (id: string): Promise<{ data: RaRecord }> => {
    const url = `${API_URL}/board-services/${id}/unarchive`;
    const { json } = await httpClient(url, {
      method: "PATCH",
    });
    return { data: normalizeId(json) };
  },

  forceDeleteBoardService: async (id: string): Promise<{ data: RaRecord }> => {
    const url = `${API_URL}/board-services/${id}/force`;
    const { json } = await httpClient(url, { method: "DELETE" });
    return { data: normalizeId(json) };
  },
};
