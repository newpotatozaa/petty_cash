import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";

export interface User {
  user_id: string;
  username: string;
  api_token: string;
  status: string;
  // appname: string;
}

export const useAuthStore = defineStore("auth", () => {
  const errors = ref({});
  const user = ref<User>({} as User);
  const isAuthenticated = ref(!!JwtService.getToken());

  function setAuth(authUser: User) {
    isAuthenticated.value = true;
    user.value = authUser;
    errors.value = {};
    JwtService.saveToken(user.value.api_token);
  }

  function setError(error: any) {
    errors.value = { ...error };
  }

  function purgeAuth() {
    isAuthenticated.value = false;
    user.value = {} as User;
    errors.value = [];
    JwtService.destroyToken();
  }

  async function login(credentials: User) {
    ApiService.setAuthURL();
    // console.log("login")
    // console.log(credentials)
    return ApiService.post("auth/signin", credentials)
      .then(({ data }) => {
        // console.log(data)
        setAuth(data);        
      })
      .catch(({ response }) => {
        // console.log(response.data)
        setError(response.data);
      });
  }

  function logout() {
    purgeAuth();
  }

  function verifyAuth() {
    if (JwtService.getToken()) {
      ApiService.setAuthURL();
      ApiService.setHeader();
      ApiService.post("auth/verify_token", { api_token: JwtService.getToken() })
        .then(({ data }) => {
          setAuth(data);
        })
        .catch(({ response }) => {
          setError(response.data.errors);
          purgeAuth();
        });
    } else {
      purgeAuth();
    }
  }

  return {
    errors,
    user,
    isAuthenticated,
    login,
    logout,
    verifyAuth,
  };
});
