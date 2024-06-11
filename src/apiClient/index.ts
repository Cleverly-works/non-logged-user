import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  RawAxiosRequestHeaders,
} from "axios";
import { envConfig } from "../utils";

interface AxiosCustomConfig extends AxiosRequestConfig {
  isSilent?: boolean;
  loader?: boolean;
  publicMethod?: boolean;
  addTimezone?: boolean;
  addDeviceId?: boolean;
}

const headers: RawAxiosRequestHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
  "X-Requested-With": "XMLHttpRequest",
};

const injectToken = (config: AxiosCustomConfig): AxiosCustomConfig => {
  const axiosConfig: AxiosCustomConfig = config;

  try {
    const token = localStorage.getItem("token");

    if (token != null && !config?.publicMethod) {
      axiosConfig.headers!.Authorization = `Bearer ${token}`;
    }

    return axiosConfig;
  } catch (error: any) {
    throw new Error(error);
  }
};

const injectDeviceId = (config: AxiosCustomConfig): AxiosCustomConfig => {
  const axiosConfig: AxiosCustomConfig = config;

  if (config.addDeviceId) {
    axiosConfig.headers!["Mobile-App-Device-Id"] = "Browser";
  }

  return axiosConfig;
};

const injectTimezoneHeader = (config: AxiosCustomConfig): AxiosCustomConfig => {
  const axiosConfig: AxiosCustomConfig = config;

  if (config.addTimezone) {
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

    axiosConfig.headers!["X-Client-Timezone"] =
      !timeZone || timeZone === "Etc/Unknown" ? "UTC" : timeZone;
  }

  return axiosConfig;
};

class ApiClient {
  instance: AxiosInstance | null = null;

  withLoaderCount: number = 0;

  private get http(): AxiosInstance {
    return this.instance != null ? this.instance : this.initHttp();
  }

  handleLoaderRequest = (config: AxiosCustomConfig) => {
    if ((config as AxiosCustomConfig).loader) {
      this.withLoaderCount += 1;
    }

    return config;
  };

  handleLoaderStop = (response: AxiosResponse) => {
    if ((response?.config as AxiosCustomConfig)?.loader) {
      this.withLoaderCount -= 1;

      if (this.withLoaderCount === 0) {
      }
    }

    if (!response?.config) {
    }
  };

  handleLoaderError = (error: any) => {
    this.handleLoaderStop(error);

    return Promise.reject(error);
  };

  handleLoaderResponse = (response: AxiosResponse) => {
    this.handleLoaderStop(response);

    return response;
  };

  initHttp() {
    const http = axios.create({
      baseURL: envConfig.API_URL,
      headers,
      isSilent: false,
      loader: true,
      publicMethod: false,
      addTimezone: false,
      addDeviceId: true,
    } as AxiosCustomConfig);

    http.interceptors.response.use(
      (response) => response,
      (error: AxiosError<any>) => {
        const { response, config } = error;

        // if (!(config as AxiosCustomConfig).isSilent) {
        //   errorHandler(error);
        // }

        return Promise.reject(response);
      },
    );

    http.interceptors.response.use(
      this.handleLoaderResponse,
      this.handleLoaderError,
    );

    this.instance = http;

    return http;
  }

  request<T = any, R = AxiosResponse<T>>(
    config: AxiosCustomConfig,
  ): Promise<R> {
    return this.http.request(config);
  }

  get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosCustomConfig,
  ): Promise<R> {
    return this.http.get<T, R>(url, config);
  }

  post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosCustomConfig,
  ): Promise<R> {
    return this.http.post<T, R>(url, data, config);
  }

  put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosCustomConfig,
  ): Promise<R> {
    return this.http.put<T, R>(url, data, config);
  }

  patch<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosCustomConfig,
  ): Promise<R> {
    return this.http.patch<T, R>(url, data, config);
  }

  delete<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosCustomConfig,
  ): Promise<R> {
    return this.http.delete<T, R>(url, config);
  }
}

export const apiClient = new ApiClient();
