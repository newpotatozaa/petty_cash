<template>
  <div class="app-navbar flex-shrink-0">
    <div class="app-navbar-item ms-1 ms-md-3" id="kt_header_user_menu_toggle">
      <div
        class="cursor-pointer symbol symbol-30px symbol-md-40px"
        data-kt-menu-trigger="click"
        data-kt-menu-attach="parent"
        data-kt-menu-placement="bottom-end"
      >
        <KTIcon icon-name="profile-circle" icon-class="fs-3x text-primary" />
      </div>
      <KTUserMenu />
    </div>
    <!-- <div class="app-navbar-item d-lg-none ms-2 me-n3"
      v-tooltip title="Show header menu"
    > -->
      <!-- <div class="btn btn-icon btn-active-color-primary w-30px h-30px w-md-35px h-md-35px"
        id="kt_app_header_menu_toggle"
      > -->
        <!-- <KTIcon icon-name="text-align-left" icon-class="fs-2 fs-md-1" /> -->
      <!-- </div> -->
    <!-- </div> -->
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent } from "vue";
import KTQuickLinksMenu from "@/layouts/main-layout/menus/QuickLinksMenu.vue";
import KTUserMenu from "@/layouts/main-layout/menus/UserAccountMenu.vue";
import KTThemeModeSwitcher from "@/layouts/main-layout/theme-mode/ThemeModeSwitcher.vue";
import { ThemeModeComponent } from "@/assets/ts/layout";
import { useThemeStore } from "@/stores/theme";

export default defineComponent({
  name: "header-navbar",
  components: {
    KTQuickLinksMenu,
    KTUserMenu,
    KTThemeModeSwitcher,
  },
  setup() {
    const store = useThemeStore();

    const themeMode = computed(() => {
      if (store.mode === "system") {
        return ThemeModeComponent.getSystemMode();
      }
      return store.mode;
    });

    return {
      themeMode,
      getAssetPath,
    };
  },
});
</script>
