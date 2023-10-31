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
        <table class="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
          <thead>
            <tr class="fw-bold text-muted">
              <th class="w-25px">
                <div class="form-check form-check-sm form-check-custom form-check-solid">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    @change="
                      checkedRows.length === 6
                        ? (checkedRows.length = 0)
                        : (checkedRows = [0, 1, 2, 3, 4, 5])
                    "
                  />
                </div>
              </th>
              <th class="min-w-150px">User Id</th>
              <th class="min-w-140px">Username</th>
              <th class="min-w-120px">Email</th>
              <th class="min-w-120px">Role</th>
              <th class="min-w-120px">Created</th>
              <th class="min-w-120px">Status</th>
              <th class="min-w-100px text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item, index) in accountList" :key="index">
              <tr>
                <td>
                  <div
                    class="form-check form-check-sm form-check-custom form-check-solid"
                  >
                    <input
                      class="form-check-input widget-13-check"
                      type="checkbox"
                      :value="index"
                      v-model="checkedRows"
                    />
                  </div>
                </td>

                <td>
                  <a
                    href="#"
                    class="text-dark fw-bold text-hover-primary fs-6"
                    >{{ item['id'] }}</a
                  >
                </td>

                <td>
                  <a
                    href="#"
                    class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6"
                    >{{ item['username'] }}</a
                  >
                  <span class="text-muted fw-semobold text-muted d-block fs-7"
                    >Code: {{ item['username']}}</span
                  >
                </td>

                <td>
                  <a
                    href="#"
                    class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6"
                    >{{ item['email'] }}</a
                  >
                  <span class="text-muted fw-semobold text-muted d-block fs-7"
                    >Code: {{ item['email'] }}</span
                  >
                </td>

                <td>
                  <a
                    href="#"
                    class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6"
                    >{{ item['firstnameth'] }}</a
                  >
                  <span
                    class="text-muted fw-semobold text-muted d-block fs-7"
                    >{{ item['lastnameth'] }}</span
                  >
                </td>

                <td class="text-dark fw-bold text-hover-primary fs-6">
                  {{ item['total'] }}
                </td>

                <td>
                  <!-- <span
                    :class="`badge-light-${item.status.color}`"
                    class="badge"
                    >
                    {{ item.status.label }}
                    </span
                  > -->
                </td>

                <td class="text-end">
                  <a
                    href="#"
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                  >
                    <KTIcon icon-name="switch" icon-class="fs-3" />
                  </a>

                  <a
                    href="#"
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                  >
                    <KTIcon icon-name="pencil" icon-class="fs-3" />
                  </a>

                  <a
                    href="#"
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                  >
                    <KTIcon icon-name="trash" icon-class="fs-3" />
                  </a>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
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