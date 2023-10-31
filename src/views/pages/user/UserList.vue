<template>
  <div class="card">
    <div class="card-header border-0 pt-6">
      <div class="card-title">
        <div class="d-flex align-items-center position-relative my-1">
          <KTIcon icon-name="magnifier" icon-class="fs-1 position-absolute ms-6" />
          <input type="text" v-model="search" @input="searchItems()" class="form-control form-control-solid w-250px ps-15"
            placeholder="Search Customers" />
        </div>
      </div>
      <div class="card-toolbar">
        <div v-if="selectedIds.length === 0" class="d-flex justify-content-end" data-kt-subscription-table-toolbar="base">
          <router-link :to="'/user/account/create'" class="btn btn-primary">
            <KTIcon icon-name="plus" icon-class="fs-2" />
            Add Account
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
    <div class="card-body pt-0">
      <Datatable @on-sort="sort" @on-items-select="onItemSelect" :loading="loading" :data="accountList"
        :header="headerConfig" :enable-items-per-page-dropdown="true" :checkbox-enabled="true" checkbox-label="id">
        <template v-slot:email="{ row: account }"><a href="#" class="text-dark fw-bold text-hover-primary fs-6">
            {{ account.email }}</a>
        </template>
        <template v-slot:id="{ row: account }">
          <div class="badge badge-light">{{ account.id }}</div>
        </template>
        <template v-slot:name="{ row: account }">
          {{ account.firstnameth + " &nbsp;&nbsp; " + account.lastnameth }}
        </template>
        <template v-slot:created="{ row: account }">
          {{ account.created_at }}
        </template>
        <template v-slot:actions="{ row: account }">
          <router-link :to="'/user/account/edit/' + account.id"
            class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
            <KTIcon icon-name="pencil" icon-class="fs-3" />
          </router-link>
          <a @click="deleteButton(account.id)" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm">
            <KTIcon icon-name="trash" icon-class="fs-3" />
          </a>
        </template>
      </Datatable>
    </div>
  </div>
</template>

<script lang="ts">

import ApiService from "@/core/services/ApiService";
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import { accountStore, type Accounts } from "@/stores/account";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable/table-partials/models";
import arraySort from "array-sort";
import Swal from "sweetalert2/dist/sweetalert2.js";
import router from "@/router";

export default defineComponent({
  name: "user-account-list",
  components: {
    Datatable,
  },
  setup() {
    const headerConfig = ref([
      { columnName: "ID", columnLabel: "id" },
      { columnName: "Email", columnLabel: "email", sortEnabled: true },
      { columnName: "Name", columnLabel: "name" },
      { columnName: "Create", columnLabel: "created" },
      { columnName: "Actions", columnLabel: "actions" },
    ]);
    const selectedIds = ref<Array<number>>([]);
    const store = accountStore();
    const accountList = ref<Array<Accounts>>([]);
    const initAccountList = ref<Array<Accounts>>([]);
    const loading = ref(true);
    onMounted(async () => {
      await onDataTable();
    });
    const search = ref<string>("");
    const searchItems = () => {
      accountList.value.splice(0, accountList.value.length, ...initAccountList.value);
      if (search.value !== "") {
        let results: Array<any> = [];
        for (let j = 0; j < accountList.value.length; j++) {
          if (searchingFunc(accountList.value[j], search.value)) {
            results.push(accountList.value[j]);
          }
        }
        accountList.value.splice(0, accountList.value.length, ...results);
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
    const sort = (sort: Sort) => {
      const reverse: boolean = sort.order === "asc";
      if (sort.label) {
        arraySort(accountList.value, sort.label, { reverse });
      }
    };

    const onItemSelect = (selectedItems: Array<number>) => {
      selectedIds.value = selectedItems;
    };
    const onDataTable = async () => {
      accountList.value = await store.getAccountList();
      loading.value = false;
      initAccountList.value = await store.getAccountList();
    }
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

    const deleteButton = (id: number) => {
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
            const slug = "accounts/delete/" + id
            onDelete(slug);
          } else if (result.dismiss === "cancel") {
            selectedIds.value;
          }
        });
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

    const deleteSubscription = (id: number) => {
      for (let i = 0; i < accountList.value.length; i++) {
        if (accountList.value[i].id === id) {
          accountList.value.splice(i, 1);
        }
      }
    };

    return {
      loading,
      accountList,
      headerConfig,
      selectedIds,
      search,
      sort,
      onItemSelect,
      searchItems,
      getAssetPath,
      deleteFewSubscriptions,
      deleteSubscription,
      deleteButton,
    };
  },
});
</script>
@/stores/z_account