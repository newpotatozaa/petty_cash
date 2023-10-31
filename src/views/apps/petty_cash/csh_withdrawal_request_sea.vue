<template>
  <div :class="widgetClasses" class="card">
    <div class="p-10 col-lg-12 col-md-12 col-sm-12">
      
      <div class="card-title ">
        <div class="row">
          <div class="col-12 col-lg-2">
            <label class="fs-5 fw-semibold pt-5 min-w-150px">บริษัทเจ้าหนี้ : </label>
          </div>
          <div class="col-12 col-lg-4 text-start pt-2">
            <select id="companySelect" class="form-control selectpicker" v-model="selectedCompany">
              <option value="">เลือก</option>
              <option v-for="branchData in vendorData.data" :value="branchData['VenderCode']"
                :key="branchData['VenderCode']">
                {{ branchData['VenderName'] }}
              </option>
            </select>
            <!-- <p>Selected Company: {{ selectedCompany }}</p> -->
          </div>
          <div class="col-12 col-lg-4 pt-5">
            <div class="row">
              <div class="col-2 col-lg-2">
                <label class="fs-5 fw-semibold pt-2 min-w-150px">วันที่ขอเบิก : </label>
              </div>
              <div class="col-10 col-lg-10">
                <el-form-item prop="datePick" class="ps-2">
                  <el-date-picker v-model="targetData.dueDate1" type="date" placeholder="Select a date"
                    :teleported="false" popper-class="override-styles" name="dueDate1" value-format="YYYY-MM-DD"
                    format="DD-MM-YYYY" />
                </el-form-item>
                <el-form-item prop="datePick" class="ps-2">
                  <el-date-picker v-model="targetData.dueDate2" type="date" placeholder="Select a date"
                    :teleported="false" popper-class="override-styles" name="dueDate2" value-format="YYYY-MM-DD"
                    format="DD-MM-YYYY" />
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-2 text-end">
            <button class="btn btn-success" @click="onDataTable">
              <KTIcon icon-name="" icon-class="fs-2" />
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--begin::Header-->
    <div class="card-header border-0 pt-6">
      <div class="card-title">
        <div class="d-flex align-items-center position-relative my-1">
          <KTIcon icon-name="magnifier" icon-class="fs-1 position-absolute ms-6" />
          <input type="text" v-model="search" @input="searchItems()" class="form-control form-control-solid w-250px ps-15"
            placeholder="Search" />
          <!-- <button @click="searchButtonClicked" class="btn btn-primary">Search</button> -->
        </div>
      </div>
      <div class="card-toolbar">
        <router-link :to="'add'" class="btn btn-primary">
          <KTIcon icon-name="plus" icon-class="fs-2" />
          Add
        </router-link>

      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body py-3">
      <!--begin::Table container-->
      <!-- <div class="table-responsive"> -->
      <!--begin::Table-->
      <Datatable @on-sort="sort" @on-items-select="onItemSelect" :loading="loading" :data="UserAdminList"
        :header="headerConfig" :enable-items-per-page-dropdown="true" :checkbox-enabled="false"
        checkbox-label="UserAdmin_Id">
        <template v-slot:IdRequest="{ row: account }">
          <div class="badge badge-light">{{ account.IdRequest }}</div>
        </template>
        <template v-slot:VendorsCode="{ row: account }">
          {{ account.VendorsCode }}
        </template>
        <template v-slot:SumOutstn="{ row: account }">
          {{ forMatNumber_show(account.SumOutstn) }}
        </template>
        <template v-slot:SumGetRcv="{ row: account }">
          {{ forMatNumber_show(account.SumGetRcv) }}
        </template>
        <template v-slot:TotalRequest="{ row: account }">
          {{ forMatNumber_show(account.TotalRequest) }}
        </template>
        <template v-slot:RequestDate="{ row: account }">
          {{ account.RequestDate }}
        </template>
        <template v-slot:UserNameReq="{ row: account }">
          {{ account.UserNameReq }}
        </template>
        <template v-slot:actions="{ row: account }">
          <router-link :to="'update/' + account.IdRequest"
            class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-0">
            <KTIcon icon-name="arrows-circle" icon-class="fs-3" />
          </router-link>

          <a @click="editButton(account.IdRequest)" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-0"
            :style="account.StatSend == 1 ? 'pointer-events: none;' : ''">
            <KTIcon icon-name="pencil" icon-class="fs-3" />
          </a>

          <a @click="print_pdf(account.IdRequest)" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-0">
            <KTIcon icon-name="printer" icon-class="fs-3" />
          </a>

          <a @click="Mapping_DB(account.IdRequest)" class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-0"
            :style="account.StatSend == 1 ? 'pointer-events: none;' : ''">
            <KTIcon icon-name="shield-tick" icon-class="fs-3" />
          </a>

          <a @click="deleteButton(account.IdRequest)"
            class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-0"
            :style="account.StatSend == 1 ? 'pointer-events: none;' : ''">
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
  <div :class="widgetClasses" class="card">
    <div class="card-body py-3">
      <table width="100%">
        <tr>
          <td width="50%" valign="top" align="center">
            <br>
            <table style="border-collapse: collapse;display:table" border="1" bordercolor="#767777" width="80%">
              <tr>
                <td align='center' width="60%"><b>วงเงิน</b></td>
                <td align='center' width="40%">
                  <input v-model="Budget_show" class='inputNumber' type='text' id='Budget_show' name='Budget_show'
                    size='8' style='background-color: #eeeeee; border:0px; font-size:12; color:green' readonly>
                  <input v-model="Budget_show" class='inputNumber' type='hidden' id='Budget' name='Budget' size='8'
                    style='background-color: #eeeeee; border:0px; font-size:12; color:green' readonly>
                </td>

              </tr>
            </table>
            <br>
            <table style="border-collapse: collapse;display:table" border="1" bordercolor="#767777" width="80%">
              <tr>
                <td align="center" colspan="3"><b>รายการเบิกคงค้าง</b></td>
              </tr>
              <tr>
                <td align="center" width="60%"><b>รายการ</b></td>
                <td align="center" width="40%"><b>จำนวนเงิน</b></td>
              </tr>

              <tbody>
                <tr v-for="(item, index) in Footer" :key="index">
                  <td align='center'>
                    {{ 'วันที่ ' + item['RequestDate'] }}
                    <!-- <input :value="'วันที่ ' + item['RequestDate']" type='text' readonly> -->
                    <input :value="item['RequestDate']" class='inputNumber' type='hidden' id='SumOutstn_date_1'
                      name='SumOutstn_date_1'>
                  </td>
                  <td align='center'>
                    <input :value="forMatNumber(item['SumOutstn'])" class='inputNumber' type='text' id='SumOutstn_show_1'
                      name='SumOutstn_show_1' size='8'
                      style='background-color: #eeeeee; border:0px; font-size:12; color:orange' readonly>
                    <input :value="item['SumOutstn']" class='inputNumber' type='hidden' id='SumOutstn_1'
                      name='SumOutstn_1' size='8'
                      style='background-color: #eeeeee; border:0px; font-size:12; color:orange' readonly>
                  </td>
                </tr>
              </tbody>

              <tr>
                <td align="center"><b>รวม</b></td>
                <td align="center">
                  <input v-model="Sum_Outstn" class='inputNumber' type='text' id='Sum_show_Outstn' name='Sum_show_Outstn'
                    size='8' style="background-color: #eeeeee; border:0px; font-size:12" readonly>
                  <input v-model="Sum_Outstn" class='inputNumber' type='hidden' id='Sum_Outstn' name='Sum_Outstn' size='8'
                    style="background-color: #eeeeee; border:0px; font-size:12" readonly>
                </td>
              </tr>

              <tr hieght="50">
                <td align="center"><b>คงเหลือ</b><br>(วงเงิน - ยอดรวมเบิก)</td>
                <td align="center">
                  <input v-model="Sum_Total_Outstn" class='inputNumber' type='text' id='Sum_Total_show_Outstn'
                    name='Sum_Total_show_Outstn' size='8' style="background-color: #eeeeee; border:0px; font-size:12"
                    readonly>
                  <input v-model="Sum_Total_Outstn" class='inputNumber' type='hidden' id='Sum_Total_Outstn'
                    name='Sum_Total_Outstn' size='8' style="background-color: #eeeeee; border:0px; font-size:12" readonly>
                </td>
              </tr>


            </table>

          </td>
          <td width="50%" align="center">
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>  


<script lang="ts">

import ApiService from "@/core/services/ApiService";
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref, onMounted, computed } from 'vue';
import { UserAdminStore, type UserAdmin } from "@/stores/UserAdmin";
import type { Sort } from "@/components/kt-datatable/table-partials/models";
import arraySort from "array-sort";
import Swal from "sweetalert2/dist/sweetalert2.js";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import axios from 'axios';
// import { useRouter } from 'vue-router';
import Datepicker from 'vue3-datepicker';
import 'bootstrap-datepicker';
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css';
import moment from 'moment'
import router from "@/router";
// import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.css';
// import 'bootstrap-datepicker';
// import $ from 'jquery'; // Import jQuery
declare const $: any;

interface NewAddressData {
  dueDate1: string;
  dueDate2: string;
  tags: Array<string>;
  assign: string;
}

interface Table {
  IdRequest: number;
  VendorsCode: string;
  RequestDate: string;
  UserRequest: string;
  TotalRequest: number;
  IsDelete: number;
  SumOutstn: number;
  SumGetRcv: number;
  StatSend: number;
  StatRecheck: string;
  UserNameReq: string;
  ReffDocPO: string;
  ReserveMoney: number;
  AttachFile1: string
}


export default defineComponent({
  name: "kt-widget-11",
  components: {
    Datatable,
    Datepicker
  },
  props: {
    widgetClasses: String,
    UserAdmin_Name: String
  },

  setup() {
    const Budget_show = ref('');
    const SumOutstn_date_1 = ref(['']);
    const SumOutstn_show_1 = ref('');
    const Sum_Outstn = ref('');
    const Sum_Total_Outstn = ref('');

    const targetData = ref<NewAddressData>({
      dueDate1: "",
      dueDate2: "",
      assign: "",
      tags: ["important", "urgent"],
    });
    const headerConfig = ref([
      { columnName: "No.", columnLabel: "IdRequest" },
      { columnName: "รหัสเจ้าหนี้", columnLabel: "VendorsCode" },
      { columnName: "ยอดค้างเบิก", columnLabel: "SumOutstn" },
      { columnName: "ยอดที่ได้รับ", columnLabel: "SumGetRcv" },
      { columnName: "ยอดรวม", columnLabel: "TotalRequest" },
      { columnName: "วันที่เบิก", columnLabel: "RequestDate" },
      { columnName: "ผู้เบิก", columnLabel: "UserNameReq" },
      { columnName: "รายละเอียด", columnLabel: "actions" },
    ]);
    const selectedIds = ref<Array<number>>([]);
    const store = UserAdminStore();
    const UserAdminList = ref<Array<Table>>([]);
    const initUserAdminList = ref<Array<Table>>([]);
    const Footer = ref<Array<Table>>([]);
    const loading = ref(true);
    // const router = useRoute();
    const test = ref({});
    const vendorData = ref({
      success: true,
      data: [] // Initialize with an empty array or the appropriate default value
    });
    const selectedCompany = ref('');
    // const selectedDate = ref(new Date()); // Set the initial date
    // const datepickerRef = ref(null);

    const datepicker1 = ref(null);
    const datepicker1Modal = ref(null);
    const UserRequest = ref('');
    onMounted(async () => {

      await onVenderDropdown();
      await onDataTable();

    });
    onMounted(() => {

    });
    const onVenderDropdown = async () => {
      try {
        // Make a GET request to the API endpoint using Axios
        const response = await axios.get('http://localhost:3100/api/getVenderDropdown');
        // Handle the API response data and update the component's data
        const apiResponse = response.data;
        // console.log(apiResponse)
        if (response.data.UserRule_Id == 1) {
          // console.log("1");
          selectedCompany.value = response.data.UserAdmin_VenderCode.trim()
        } else {
          // console.log(response.data);
          // console.log(response.data.data[0]['VenderCode']);

          selectedCompany.value = response.data.data[0]['VenderCode'];
          //selectedCompany = 0
        }
        if (apiResponse.success && Array.isArray(apiResponse.data)) {
          vendorData.value.data = apiResponse.data;
          // console.log(vendorData.value.deta);
        } else {
          console.error('Invalid API response format:', apiResponse);
        }
      } catch (error) {
        console.error('Error making the API request:', error);
      }
    };
    function initDatepickers() {

      const arrows = getArrows();

      const options = {
        rtl: isRTL(),
        todayHighlight: true,
        templates: arrows,
      };

      // Initialize datepickers
      $(datepicker1.value).datepicker(options);
      $(datepicker1Modal.value).datepicker(options);
      // Initialize other datepickers here...
    }
    function getArrows() {
      return isRTL()
        ? {
          leftArrow: '<i class="la la-angle-right"></i>',
          rightArrow: '<i class="la la-angle-left"></i>',
        }
        : {
          leftArrow: '<i class="la la-angle-left"></i>',
          rightArrow: '<i class="la la-angle-right"></i>',
        };
    }
    function isRTL() {
      // Implement your RTL logic here...
      return false;
    }
    const searchButtonClicked = async () => {
      try {
        // Prepare the data to be sent in the API request
        const requestData = {
          search: search.value,
          datePick1: targetData.value.dueDate1,
          datePick2: targetData.value.dueDate2,

        };

        // Make the API request using Axios (adjust the API URL accordingly)
        const response = await axios.post('http://localhost:3100/api/csh_withdrawal_request_sea', requestData);

        // Handle the API response as needed
        console.log(response.data['01']);

        // You can update your component's data or perform other actions here
      } catch (error) {
        console.error('Error making the API request:', error);
      }
    };
    const onDataTable = async () => {
      loading.value = true
      const requestData = {
        params: {
          search: search.value,
          dueDate1: targetData.value.dueDate1,
          dueDate2: targetData.value.dueDate2,
          selectedCompany: selectedCompany.value
        }
      };
      // UserAdminList = null
      // test.value = await axios.get('http://localhost:3100/api/csh_withdrawal_request_sea', requestData);
      // console.log(targetData.value.dueDate1)
      // console.log(targetData.value.dueDate2)
      try {
        const response = await axios.get('http://localhost:3100/api/csh_withdrawal_request_sea', requestData);

        UserAdminList.value = response.data['01'];
        initUserAdminList.value = response.data['01'];

        // console.log(response.data['03'][0]['Budget'])
        Budget_show.value = forMatNumber(response.data['03'][0]['Budget'])

        const formattedData = response.data['02'].map(item => {
          return {
            ...item,
            RequestDate: moment(item.RequestDate).format('DD-MM-yyyy')
          };
        });
        // console.log(response.data['02'][0]['RequestDate'])
        // console.log(moment(response.data['02'][0]['RequestDate']).format('DD-MM-yyyy'))
        Footer.value = formattedData

        // SumOutstn_date_1.value = 'วันที่ '+moment(response.data['02'][0]['RequestDate']).format('DD-MM-yyyy');
        // SumOutstn_show_1.value = response.data['02'][0]['SumOutstn']
        // Sum_Outstn.value = response.data['02'][0]['TotalRequest']
        const Sum_Outstn_number = response.data['02'].reduce((total, item) => total + (item.TotalRequest || 0), 0)
        Sum_Outstn.value = forMatNumber(Sum_Outstn_number);
        // const lastReserveMoney = computed(() => {
        //   if (!response.data['02'] || response.data['02'].length === 0) return 0;

        //   const lastItem = response.data['02'][response.data['02'].length - 1];
        //   return lastItem.ReserveMoney || 0;
        // });
        // console.log(lastReserveMoney.value)
        Sum_Total_Outstn.value = forMatNumber(response.data['03'][0]['Budget'] - Sum_Outstn_number);
        // Set loading to false

        await axios.get('http://localhost:3100/api/getProfileApp_By_IdApi').then(data => {
          // console.log(data);
          // console.log(data.data[0]['UserAdmin_FullName']);

          UserRequest.value = data.data[0]['UserAdmin_Name']
        }).catch(error => {
          console.log(error);
        })


        loading.value = false;
      } catch (error) {
        // Handle any errors that may occur during the request
        console.error("Error:", error);
        // You might want to handle errors appropriately in your application
      }
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
    const deleteButton = async (id: number) => {
      await axios.get(`http://localhost:3100/api/csh_withdrawal_request_sea_edit/${id}`).then(response => {
        const data01 = response.data.data['01'];
        if (data01.length > 0 && data01[0]['StatSend'] == 1) {
          // console.log(1111)
          Swal.fire({
            title: 'บันทึกไม่สำเร็จ',
            text: 'รายการถูกส่งเพื่อรอ Interface แล้ว',
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Close",
            heightAuto: false,
            customClass: { confirmButton: "btn fw-semobold btn-light-danger" },
          })
        } else {
          Swal.fire({
            html: `Are you sure to delete?<br>No. ${id}`,
            icon: "warning",
            buttonsStyling: false,
            showCancelButton: true,
            confirmButtonText: "Ok, delete it!",
            cancelButtonText: 'Cancel',
            customClass: {
              confirmButton: "btn btn-dark btn-sm",
              cancelButton: 'btn btn-danger btn-sm'
            }
          }).then(async function (result: any, actions: any) {
            if (result.value) {
              await axios.delete(`http://localhost:3100/api/delete_withdrawal_request/${id}`)
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
            const data = { "list": lists };
            onDeleteList("accounts/list/delete", data);
          } else if (result.dismiss === "cancel") {
            selectedIds.value;
          }
        });
    };
    const deleteSubscription = (IdRequest: number) => {
      for (let i = 0; i < UserAdminList.value.length; i++) {
        if (UserAdminList.value[i].IdRequest === IdRequest) {
          UserAdminList.value.splice(i, 1);
        }
      }
    };
    const onDeleteList = (url: string, id: any) => {
      ApiService.setURL();
      ApiService.deleteSelect(url, id)
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
    function forMatNumber(number) {
      // Check if the input is a valid number
      if (typeof number !== 'number' || isNaN(number)) {
        return 'Invalid Number';
      }

      // Use toLocaleString to format with commas for thousands
      return number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    function forMatNumber_show(number) {
      // Check if the input is a valid number
      const parsedNumber = parseFloat(number);

      // Check if the parsedNumber is a valid number
      if (isNaN(parsedNumber)) {
        return '';
      }

      // Use toLocaleString to format with commas for thousands
      return parsedNumber.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    const print_pdf = async (id) => {
      //   const params = { params: { id: id } };
      // return ApiService.get("branch/address/list", params)

      const requestData = {
        params: {
          id: id,
          user: UserRequest.value
        }
      };
      await axios.get(`http://localhost:3100/api/report_pdf`, requestData)
        .then(res => {
          console.log(res.data.filename)
          window.open(`http://localhost:3100/storage/${res.data.filename}.pdf`);
        }).catch(err => {
          console.log('api/report_pdf: ' + err.message)
        })
    }
    const Mapping_DB = async (id) => {
      try {
        // Prepare the data to be sent in the API request
        //   const requestData = {
        //   params: {     
        //     id:id,    
        //     user: UserRequest.value
        //   }
        // };
        const requestData = {

          id: id,
          user: UserRequest.value

        };
        // Make the API request using Axios (adjust the API URL accordingly)
        const response = await axios.post('http://localhost:3100/api/Mapping_DB', requestData);
        console.log(response)
        if (response.data.success) {
          Swal.fire({
            title: 'บันทึกสำเร็จ',
            // text: "บันทึกสำเร็จ",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "OK",
            heightAuto: false,
            customClass: { confirmButton: "btn fw-semobold btn-light-primary" },
          }).then(() => {
            // this.$router.push('/csh_user_sea/index');
          });
        } else {
          Swal.fire({
            title: 'บันทึกไม่สำเร็จ',
            text: response.data.message,
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Close",
            heightAuto: false,
            customClass: { confirmButton: "btn fw-semobold btn-light-danger" },
          });
        }
        // Handle the API response as needed
        // console.log(response.data['01']);
        // alert('')
        // You can update your component's data or perform other actions here
      } catch (error) {
        console.error('Error making the API request:', error);
      }
    }
    const editButton = async (id: number) => {
      // const router = useRouter()
      await axios.get(`http://localhost:3100/api/csh_withdrawal_request_sea_edit/${id}`).then(response => {
        const data01 = response.data.data['01'];
        if (data01.length > 0 && data01[0]['StatSend'] == 1) {
          // console.log(1111)
          Swal.fire({
            title: 'บันทึกไม่สำเร็จ',
            text: 'รายการถูกส่งเพื่อรอ Interface แล้ว',
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Close",
            heightAuto: false,
            customClass: { confirmButton: "btn fw-semobold btn-light-danger" },
          })
        } else {
          router.push(`/csh_withdrawal_request_sea/edit/${id}`)
          // router.push('/');
          // this.router.push({ name: "dashboard" });
        }
      });
    };
    return {
      editButton,
      targetData,
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
      initDatepickers,
      vendorData,
      selectedCompany,
      searchButtonClicked,
      onDataTable,
      Budget_show,
      forMatNumber, forMatNumber_show,
      SumOutstn_date_1,
      SumOutstn_show_1,
      Sum_Outstn,
      Sum_Total_Outstn,
      Footer,
      print_pdf,
      Mapping_DB
    };

  },


});

</script>

