import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import { useRouter } from 'vue-router';

interface Accounts {
  id: number;
  firstnameth: string;
  lastnameth: string;
  mobile: string;
  email: string;
  create: string;
}

export type { Accounts };

export const accountStore = defineStore("accounts", () => {
  const router = useRouter();

  function setError() {
    router.push({name:'500'})
  }

  async function getAccountPrefix() {
    ApiService.setURL_PHIM();
    ApiService.setHeader();
    return ApiService.getAll("accounts/prefix")
      .then(({ data }) => {
        return(data);
      })
      .catch(() => {
        setError();
      });
  }

  async function getAccountList() {
    ApiService.setURL();
    return ApiService.getAll("accounts","list")
      .then(({ data }) => {
        return(data);
      })
      .catch(({ data }) => {
        setError();
      });
  }

  async function getAccount() {
    ApiService.setURL();
    ApiService.setHeader();
    return ApiService.getAll("accounts","menu/profile")
      .then(({ data }) => {
        return(data);
      })
      .catch(({ data }) => {
        setError();
      });
  }

  async function getAccountDetail(id:any) {
    ApiService.setURL();
    ApiService.setHeader();
    const params = { params : {id: id}}
    return ApiService.get("accounts/detail",params)
      .then(({ data }) => {
        return(data);
      })
      .catch(({ data }) => {
        setError();
      });
  }

  async function getAccountProfile() {
    ApiService.setURL();
    ApiService.setHeader();
    return ApiService.getAll("accounts","profile")
      .then(({ data }) => {
        return(data);
      })
      .catch(({ data }) => {
        setError();
      });
  }

  return {
    getAccountList,
    getAccountPrefix,
    getAccountDetail,
    getAccount,
    getAccountProfile,
  };
});
