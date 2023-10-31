<template>
  <div
    class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semobold w-200px"
    data-kt-menu="true"
  >
    <div class="menu-item px-3">
      <div class="menu-content fs-6 text-dark fw-bold px-3 py-4">
        Quick Actions
      </div>
    </div>
    <div class="separator mb-3 opacity-75"></div>
    <div class="menu-item px-3">
      <a href="#" class="menu-link px-3"> New Account </a>
    </div>
    <div class="menu-item px-3">
      <a href="#" class="menu-link px-3"> New Group </a>
    </div>
    <div class="menu-item px-3">
      <a href="#" class="menu-link px-3"> New Role </a>
    </div>
    <div class="separator mt-3 opacity-75"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "dropdown-2",
  components: {},
});
</script>
