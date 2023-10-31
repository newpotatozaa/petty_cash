import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import { useRouter } from 'vue-router';

interface UserRules {
  UserRule_Id: number;
  UserRule_Name: string;
  UserRule_Delete: string;
}

export type { UserRules };

export const UserRulesStore = defineStore("UserRules", () => {
  const router = useRouter();

  function setError() {
    router.push({name:'500'})
  }

  async function getList() {
    ApiService.setURL();
    return ApiService.getAll("csh_rule_sea")
      .then(({ data }) => {
        // console.log("then")
        // console.log(data)
        return(data);
      })
      .catch(({ data }) => {
        // console.log("catch")
        // console.log(data)
        setError();
      });
  }

  // async function getAccountPrefix() {
  //   ApiService.setURL();
  //   ApiService.setHeader();
  //   return ApiService.getAll("accounts/prefix")
  //     .then(({ data }) => {
  //       return(data);
  //     })
  //     .catch(() => {
  //       setError();
  //     });
  // }

  // async function getAccount() {
  //   ApiService.setURL();
  //   ApiService.setHeader();
  //   return ApiService.getAll("accounts","menu/profile")
  //     .then(({ data }) => {
  //       return(data);
  //     })
  //     .catch(({ data }) => {
  //       setError();
  //     });
  // }

  // async function getAccountDetail(id:any) {
  //   ApiService.setURL();
  //   ApiService.setHeader();
  //   const params = { params : {id: id}}
  //   return ApiService.get("accounts/detail",params)
  //     .then(({ data }) => {
  //       return(data);
  //     })
  //     .catch(({ data }) => {
  //       setError();
  //     });
  // }

  // async function getAccountProfile() {
  //   ApiService.setURL();
  //   ApiService.setHeader();
  //   return ApiService.getAll("accounts","profile")
  //     .then(({ data }) => {
  //       return(data);
  //     })
  //     .catch(({ data }) => {
  //       setError();
  //     });
  // }

  return {
    getList,
    // getAccountPrefix,
    // getAccountDetail,
    // getAccount,
    // getAccountProfile,
  };
});
