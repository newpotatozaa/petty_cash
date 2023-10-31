import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import { useRouter } from 'vue-router';

interface UserAdmin {
  UserAdmin_Id: number;
  UserAdmin_Name: string;
  UserAdmin_Delete: number;
  UserRule_Id: number;
  UserAdmin_FullName: string;
  UserAdmin_Companyid: string;
  UserAdmin_VenderCode: string;   
  Vender_Name: string;
}

export type { UserAdmin };

export const UserAdminStore = defineStore("UserAdmin", () => {
  const router = useRouter();

  function setError() {
    router.push({name:'500'})
  }

  async function getList() {
    ApiService.setURL();
    return ApiService.getAll("csh_user_list")
      .then(({ data }) => {        
        return(data);
      })
      .catch(({ data }) => {        
        setError();
      });
  }


  return {
    getList    
  };
});
