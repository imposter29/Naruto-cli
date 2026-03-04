import axios, { AxiosResponse } from "axios";

/**
 * Abstract ApiService — base class for all ninja network (API) services.
 * Contains reusable HTTP GET logic so each service only defines its base URL.
 */
export abstract class ApiService {
  /** The base URL for the API this service communicates with. */
  protected abstract baseUrl: string;

  /**
   * Perform a GET request to the specified endpoint.
   * @param endpoint - Path appended to the baseUrl.
   * @returns The response data typed as T.
   */
  protected async get<T>(endpoint: string): Promise<T> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const response: AxiosResponse<T> = await axios.get(url, {
        headers: { "User-Agent": "naruto-cli/1.0.0" },
        timeout: 10000,
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(
          `HTTP ${error.response.status}: ${error.response.statusText}`
        );
      }
      throw new Error(`Network error: ${error.message}`);
    }
  }
}
