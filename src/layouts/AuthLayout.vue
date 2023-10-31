<template>
  <div class="page-signin d-flex flex-column flex-lg-row flex-column-fluid">
    <div class="d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-1">
      <div class="d-flex flex-column flex-center py-7 py-lg-15 px-5 px-md-15 w-100">
        <router-link to="/" class="mb-0 mb-lg-12">
          <img class="h-512px h-lg-512px"
            alt="Logo"
            :src="getAssetPath('media/logo/bizcar_l.png')"
          />
        </router-link>
        <!-- <h1 class="d-none d-lg-block text-white fs-1qx fw-medium text-center mb-7">
         ยินดีต้อนรับเข้าสู่ www.bizcarrental.com
        </h1> -->
        <div class="d-none d-lg-block text-white fs-base text-center">
          หากพบปัญหาการใช้งานติดต่อ , <a href="#" class="opacity-75-hover text-warning fw-medium me-1">Team Developer</a>
        </div>
      </div>
    </div>
        <div class="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-2">
      <div class="d-flex flex-center flex-column flex-lg-row-fluid">
        <div class="w-lg-500px p-10">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted } from "vue";
import LayoutService from "@/core/services/LayoutService";
import { useBodyStore } from "@/stores/body";

export default defineComponent({
  name: "auth-layout",
  components: {},
  setup() {
    const store = useBodyStore();

    onMounted(() => {
      LayoutService.emptyElementClassesAndAttributes(document.body);
      store.addBodyClassname("app-blank");
      store.addBodyClassname("bg-body");
    });

    return {
      getAssetPath,
    };
  },
});
</script>

<style scoped>
.page-signin{
  background: linear-gradient(140deg, rgb(158, 226, 155) 0%, rgb(188, 240, 115) 65%, rgb(185, 125, 8) 100%);
}
</style>