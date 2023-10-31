<template>
  <div :class="widgetClasses" class="card">
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="text-muted mt-1 fw-semobold fs-7">Over 500 orders</span>
      </h3>
      <div class="card-toolbar">
        <button
          type="button"
          class="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
          data-kt-menu-trigger="click"
          data-kt-menu-placement="bottom-end"
          data-kt-menu-flip="top-end"
        >
          <KTIcon icon-name="category" icon-class="fs-2" />
        </button>
        <Action></Action>
      </div>
    </div>
    <div class="card-body py-3">
      <div class="table-responsive">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, reactive, ref } from "vue";
import { accountStore } from "@/stores/account";
import { useRouter } from "vue-router";
import Action from "@/components/pages/user/action/action1.vue";
import { array } from "yup/lib/locale";

export default defineComponent({
  name: "kt-widget-12s",
  components: {
    Action,
  },
  props: {
    widgetClasses: String,
  },

  // data(){
  //   return{
  //     tables:[]
  //   }
  // },
  // created(){
  //   this.getDataFromApi()
  // },
  // methods:{
  //   async getDataFromApi(){
  //     const account = accountStore();
  //     this.tables = await account.getList();
  //   }
  // },
  setup() {
    const loading = ref(true);
    const checkedRows = ref<Array<number>>([]);
    const account = accountStore();
    const accountList = ref([]);
    onMounted(async()=>{
      // accountList.value = await account.getList();
    })
    return {
      loading,
      accountList,
      checkedRows,
      getAssetPath,
    };
  },
});
</script>
@/stores/z_account