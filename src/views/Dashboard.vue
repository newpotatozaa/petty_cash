<template>
  <div class="row g-5 g-xl-10 mb-5 mb-xl-10">
    <div class="col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10">
      <!-- <Widget1
        className="h-md-50 mb-5 mb-xl-10"
        description="New Task"
      />
      <Widget3
        className="h-md-50 mb-5 mb-xl-10"
        description="Wait for Price record"
      /> -->
    </div>
    <div class="col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10">
      <!-- <Widget2
        className="h-md-50 mb-5 mb-xl-10"
        description="In Maintenance"
      />

      <Widget4 className="h-md-50 mb-5 mb-xl-10"
        description="Cancel"
      /> -->
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";
// import Widget1 from "@/components/pages/dashboard/WidgetNew.vue";
// import Widget2 from "@/components/pages/dashboard/WidgetInMaintenance.vue";
// import Widget3 from "@/components/pages/dashboard/WidgetWaitPrice.vue";
// import Widget4 from "@/components/pages/dashboard/WidgetCancel.vue";

export default defineComponent({
  name: "main-dashboard",
  components: {
    // Widget1,
    // Widget2,
    // Widget3,
    // Widget4,
  },
  setup() {
    return {
      getAssetPath,
    };
  },
});
</script>
