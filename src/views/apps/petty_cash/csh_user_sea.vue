<template>    
  <!--begin::Tables Widget 11-->
  <div :class="widgetClasses" class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-6">
      <div class="card-title">
        <div class="d-flex align-items-center position-relative my-1">
          <KTIcon icon-name="magnifier" icon-class="fs-1 position-absolute ms-6" />
          <input type="text" v-model="search" @input="searchItems()" class="form-control form-control-solid w-250px ps-15"
            placeholder="Search" />
        </div>
      </div>
      <div class="card-toolbar">
        <div v-if="selectedIds.length === 0" class="d-flex justify-content-end" data-kt-subscription-table-toolbar="base">
          <router-link :to="'csh_user_add'" class="btn btn-primary">
            <KTIcon icon-name="plus" icon-class="fs-2" />
            Add
          </router-link>
        </div>
        <div v-else class="d-flex justify-content-end align-items-center">
          <div class="fw-bold me-5">
            <span class="me-2">{{ selectedIds.length }}</span>Selected
          </div>
          <button type="button" class="btn btn-danger" @click="deleteFewSubscriptions()">
            Delete Selected
          </button>
        </div>
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body py-3">
      <!--begin::Table container-->
      <!-- <div class="table-responsive"> -->
        <!--begin::Table-->
        <Datatable @on-sort="sort" @on-items-select="onItemSelect" :loading="loading" :data="UserAdminList"
              :header="headerConfig" :enable-items-per-page-dropdown="true" :checkbox-enabled="false" checkbox-label="UserAdmin_Id">             
              <template v-slot:UserAdmin_Id="{ row: account }">
                <div class="badge badge-light">{{ account.UserAdmin_Id }}</div>
              </template> 
              <template v-slot:UserAdmin_Name="{ row: account }">
                {{ account.UserAdmin_Name }}
              </template>
              <template v-slot:UserAdmin_FullName="{ row: account }">
                {{ account.UserAdmin_FullName }}
              </template>
              <template v-slot:UserRule_Name="{ row: account }">
                {{ account.UserRule_Name }}
              </template>
              <template v-slot:Vender_Name="{ row: account }">
                {{ account.VenderName }}
              </template>
              <template v-slot:actions="{ row: account }">
              <router-link :to="'csh_user_edit/' + account.UserAdmin_Id"
                class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                <KTIcon icon-name="pencil" icon-class="fs-3" />
              </router-link>
              <a @click="deleteButton(account.UserAdmin_Id)" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm">
                <KTIcon icon-name="trash" icon-class="fs-3" />
              </a>
            </template>
          </Datatable>
        <!--end::Table-->
      <!-- </div> -->
      <!--end::Table container-->
    </div>
    <!--begin::Body-->
  </div>
  <!--end::Tables Widget 11-->
  <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_1">
    Launch demo modal
</button> -->

<div class="modal fade" tabindex="-1" id="kt_modal_1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">Modal title</h3>

                <!--begin::Close-->
                <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close">
                    <i class="ki-duotone ki-cross fs-1"><span class="path1"></span><span class="path2"></span></i>
                </div>
                <!--end::Close-->
            </div>

            <div class="modal-body">
                <p>Modal body text goes here.</p>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
        </div>
    </div>
</div>
</template>  

<script lang="ts">

import ApiService from "@/core/services/ApiService";
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref, onMounted } from 'vue';
import { UserAdminStore, type UserAdmin } from "@/stores/UserAdmin";
import type { Sort } from "@/components/kt-datatable/table-partials/models";
import arraySort from "array-sort";
import Swal from "sweetalert2/dist/sweetalert2.js";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import axios from 'axios';
import { useRoute } from 'vue-router';

export default defineComponent({
    name: "kt-widget-11",
  components: {
    Datatable
  },
  props: {
    widgetClasses: String,
    UserAdmin_Name: String
  },
  setup() {
    const headerConfig = ref([
      { columnName: "ID", columnLabel: "UserAdmin_Id" },      
      { columnName: "ผู้ใช้งาน", columnLabel: "UserAdmin_Name" },      
     { columnName: "ชื่อผู้ใช้งาน", columnLabel: "UserAdmin_FullName" },
     { columnName: "สิทธิ์", columnLabel: "UserRule_Name" },
     { columnName: "บริษัท", columnLabel: "Vender_Name" },
     { columnName: "Actions", columnLabel: "actions" },
    ]);
    const selectedIds = ref<Array<number>>([]);
    const store = UserAdminStore();
    const UserAdminList = ref<Array<UserAdmin>>([]);
    const initUserAdminList = ref<Array<UserAdmin>>([]);
    const loading = ref(true);
    const router = useRoute();

    onMounted(async () => {
      await onDataTable();
    });
    onMounted(() => {
       onDataTable();
    });
    
    const onDataTable = async () => {
      // UserAdminList = null
      UserAdminList.value = await store.getList();
      // console.log("UserAdminList.value")
      // console.log(UserAdminList.value)
      loading.value = false;
      initUserAdminList.value = await store.getList();
    }
    const sort = (sort: Sort) => {
      const reverse: boolean = sort.order === "asc";
      if (sort.label) {
        arraySort(UserAdminList.value, sort.label, { reverse });
      }
    };
    const onItemSelect = (selectedItems: Array<number>) => {
      selectedIds.value = selectedItems;
    };
    const deleteButton = (id: number) => {
      
      // console.log(id)
      Swal.fire({
        html: `Are you sure ?`,
        icon: "warning",
        buttonsStyling: false,
        showCancelButton: true,
        confirmButtonText: "Ok, delete it!",
        cancelButtonText: 'Cancel',
        customClass: {
          confirmButton: "btn btn-dark btn-sm",
          cancelButton: 'btn btn-danger btn-sm'
        }
        
      })
        .then(async function (result: any,actions: any) {
          if (result.value) {
            const requestData = {
                // UserRule_Name: values.UserRule_Name,
                UserAdmin_Delete: "1",
            };
            await axios.put(`http://localhost:3100/api/updateUserAdmin/${id}`, requestData)
                .then(response => {
                  // actions.resetForm()
                    Swal.fire({
                      text: response.data.message,
                      icon: "success",
                      buttonsStyling: false,
                      confirmButtonText: "Ok, got it!",
                      heightAuto: false,
                      customClass: { confirmButton: "btn fw-semobold btn-light-primary" },
                    }).then(() => {
                      onDataTable()
                      // router.push('/csh_rule_sea');                      
                  });
                }).catch(error => {
                  Swal.fire({
                    text: error.response.data.message,
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "Try again!",
                    heightAuto: false,
                    customClass: { confirmButton: "btn fw-semobold btn-light-danger" },
                  });                    
                });
          } else if (result.dismiss === "cancel") {
            selectedIds.value;
          }
        });
    };
    const onDelete = (url: string) => {
      ApiService.setURL();
      ApiService.setHeader();
      ApiService.delete(url)
        .then((response) => {
          onDataTable();
          Swal.fire({
            text: response.data.message,
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            heightAuto: false,
            customClass: { confirmButton: "btn fw-semobold btn-light-primary" },
          });
        })
        .catch((err) => {
          Swal.fire({
            text: err.response.data.message,
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Try again!",
            heightAuto: false,
            customClass: { confirmButton: "btn fw-semobold btn-light-danger" },
          });
        });
    }
    const search = ref<string>("");
    const searchItems = () => {
      UserAdminList.value.splice(0, UserAdminList.value.length, ...initUserAdminList.value);
      if (search.value !== "") {
        let results: Array<any> = [];
        for (let j = 0; j < UserAdminList.value.length; j++) {
          if (searchingFunc(UserAdminList.value[j], search.value)) {
            results.push(UserAdminList.value[j]);
          }
        }
        UserAdminList.value.splice(0, UserAdminList.value.length, ...results);
      }
    };
    const searchingFunc = (obj: any, value: string): boolean => {
      for (let key in obj) {
        if (!Number.isInteger(obj[key]) && !(typeof obj[key] === "object")) {
          if (obj[key].indexOf(value) != -1) {
            return true;
          }
        }
      }
      return false;
    };
    const deleteFewSubscriptions = () => {
      Swal.fire({
        html: `Are you sure ?`,
        icon: "warning",
        buttonsStyling: false,
        showCancelButton: true,
        confirmButtonText: "Ok, delete it!",
        cancelButtonText: 'Cancel',
        customClass: {
          confirmButton: "btn btn-dark btn-sm",
          cancelButton: 'btn btn-danger btn-sm'
        }
      })
        .then(function (result) {
          if (result.value) {
            let lists: Array<any> = [];
            selectedIds.value.forEach((item) => {
              lists.push(item);
              deleteSubscription(item);
            });
            const data = { "list" : lists};
            onDeleteList("accounts/list/delete",data);
          } else if (result.dismiss === "cancel") {
            selectedIds.value;
          }
        });
    };
    const deleteSubscription = (UserRule_Id: number) => {
      for (let i = 0; i < UserAdminList.value.length; i++) {
        if (UserAdminList.value[i].UserRule_Id === UserRule_Id) {
          UserAdminList.value.splice(i, 1);
        }
      }
    };
    const onDeleteList = (url: string, id: any) => {
      ApiService.setURL();
      ApiService.deleteSelect(url,id)
        .then((response) => {
          onDataTable();
          Swal.fire({
            text: response.data.message,
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            heightAuto: false,
            customClass: { confirmButton: "btn fw-semobold btn-light-primary" },
          });
        })
        .catch((err) => {
          Swal.fire({
            text: err.response.data.message,
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Try again!",
            heightAuto: false,
            customClass: { confirmButton: "btn fw-semobold btn-light-danger" },
          });
        });
    }


    return {
      loading,
      UserAdminList,
      sort,
      onItemSelect,
      headerConfig,
      deleteButton,
      getAssetPath,
      search,
      searchItems,
      selectedIds,
      deleteFewSubscriptions,
    };
    
  },

  
});

</script>

