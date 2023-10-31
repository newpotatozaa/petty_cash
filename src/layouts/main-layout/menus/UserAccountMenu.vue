<template>
  <div
    class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semobold py-4 fs-6 w-275px"
    data-kt-menu="true"
  >
    <div class="menu-item px-3">
      <div class="menu-content d-flex align-items-center px-3">
        <!-- <div class="symbol symbol-50px me-5">
          <img alt="Logo" :src="miniProfile.image? 'data:image/png;base64,' + miniProfile.image : getAssetPath('media/avatars/blank.png')" />
        </div> -->
        <div class="d-flex flex-column">
          <div class="fw-semibold d-flex align-items-center fs-7">
           {{ miniProfile['UserAdmin_FullName'] }}
          </div>
          <span class="fw-semibold text-muted text-hover-primary fs-8">{{ miniProfile['UserRule_Name'] }}</span>
        </div>
        <!-- <div class="d-flex flex-column">
          <div class="fw-semibold d-flex align-items-center fs-7">
           
          </div>
          
        </div> -->
      </div>
    </div>
    <div class="separator my-2"></div>
    <!-- <div class="menu-item px-5">
      <router-link to="/user/account/profile" class="menu-link px-5">
        My Profile
      </router-link>
    </div>
    <div class="menu-item px-5">
      <router-link to="/pages/profile/overview" class="menu-link px-5">
        My Message
      </router-link>
    </div>
    <div class="separator my-2"></div> -->
    <div class="menu-item px-5">
      <a @click="signOut()" class="menu-link px-5"> Sign Out </a>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { accountStore } from "@/stores/account";
import axios from 'axios';

interface MiniProfile {
    UserAdmin_FullName: string;
    UserRule_Name: string;    
}

export default defineComponent({
  name: "kt-user-menu",
  components: {},
  
  setup() {
    const router = useRouter();
    const store = useAuthStore();
    const account = accountStore();
    const miniProfile = ref<Array<MiniProfile>>([]);

    onMounted(async()=>{
      const response = await axios.get('http://localhost:3100/api/getProfileApp_By_IdApi');
      const responseData = response.data; 
      miniProfile.value = responseData[0] 
    });

    const signOut = () => {
      store.logout();
      router.push({ name: "sign-in" });
    };

    return {
      signOut,
      miniProfile,
      getAssetPath,
    };
  },
});
</script>
@/stores/z_account