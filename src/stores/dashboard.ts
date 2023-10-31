import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";

export const dashboardStore = defineStore("dashboards", () => {
  const errors = ref({});

  function setError(error: any) {
    errors.value = { ...error };
  }

  async function getStatusNew() {
    ApiService.setURL();
    return ApiService.getAll("dashboards","status/new")
      .then(({ data }) => {
        return data;
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  async function getStatusInProgress() {
    ApiService.setURL();
    return ApiService.getAll("dashboards","status/inprogress")
      .then(({ data }) => {
        return data;
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  async function getStatusWaitPrice() {
    ApiService.setURL();
    return ApiService.getAll("dashboards","status/waitprice")
      .then(({ data }) => {
        return data;
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  async function getStatusCancel() {
    ApiService.setURL();
    return ApiService.getAll("dashboards","status/cancel")
      .then(({ data }) => {
        return data;
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  return {
    errors,
    getStatusNew,
    getStatusInProgress,
    getStatusWaitPrice,
    getStatusCancel,
  };
});
