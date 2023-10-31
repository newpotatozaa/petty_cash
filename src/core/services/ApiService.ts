import type { App } from "vue";
import type { AxiosResponse } from "axios";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "@/core/services/JwtService";

class ApiService {
  public static vueInstance: App;

  public static init(app: App<Element>) {
    ApiService.vueInstance = app;
    ApiService.vueInstance.use(VueAxios, axios);
  }
  // public static getUserRulesAll(resource: string, slug = "" as string): Promise<AxiosResponse> {
  //   return ApiService.vueInstance.axios.get(`${resource}/${slug}`);
  // }

  public static setAuthURL(): void{
    ApiService.vueInstance.axios.defaults.baseURL = import.meta.env.VITE_APP_API_AUTH_URL;
  }

  public static setURL(): void{
    ApiService.vueInstance.axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;
  }

  public static setURL_PHIM(): void{
    ApiService.vueInstance.axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL_PHIM;
  }

  public static setHeader(): void {
    ApiService.vueInstance.axios.defaults.headers.common["Authorization"] = `Bearer ${JwtService.getToken()}`;
    ApiService.vueInstance.axios.defaults.headers.common["Accept"] = "application/json";
  }

  public static setHeaderForm(): void {
    ApiService.vueInstance.axios.defaults.headers.common["Content-Type"] = "multipart/form-data";
  }

  public static query(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.get(resource, params);
  }

  public static get(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.get(`${resource}`, params);
  }

  public static getAll(resource: string, slug = "" as string): Promise<AxiosResponse> {
    // console.log(resource)
    // console.log(slug)
    return ApiService.vueInstance.axios.get(`${resource}/${slug}`);
  }

  public static post(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.post(`${resource}`, params);
  }

  public static update(resource: string, slug: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.put(`${resource}/${slug}`, params);
  }

  public static updateImage(resource: string,slug: string, file: any, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.put(`${resource}/${slug}`, file, params);
  }

  public static put(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.put(`${resource}`, params);
  }

  public static delete(resource: string): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.delete(resource);
  }

  public static deleteSelect(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.post(`${resource}`, params);
  }
}

export default ApiService;
