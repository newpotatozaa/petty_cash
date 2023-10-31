<template>
  <VForm id="v_form" class="form" novalidate @submit="onSubmitSaveChanges">
    <div align="center">
      <table id="page_1" width="100%" border="0" style="border-collapse: collapse;display:table" bordercolor="#FFFFFF">
        <tr>
          <td width="10%" class="infoBoldFont" align="right">รหัสเจ้าหนี้&nbsp;:&nbsp;</td>
          <td width="40%" class="infoNormalFont" align="left">
            <select v-model="selectedCompany" disabled>
              <option value="">เลือก</option>
              <option v-for="branchData in vendorData.data" :value="branchData['VenderCode']"
                :key="branchData['VenderCode']">
                {{ branchData['VenderName'] }}
              </option>
            </select>
            <input v-model="selectedCompany" style="background-color: #eeeeee;" readonly>


          </td>
          <td width="10%" class="infoBoldFont" align="right">วันที่เบิก&nbsp;:&nbsp;</td>
          <td width="40%" class="infoNormalFont" align="left">

            <input v-model="RequestDate" type="text" id="RequestDate" name="RequestDate" size="20"
              style="background-color: #eeeeee;" readonly>
            <!--
						<div id="RequestDateDiv" class="input-group date form_datetime col-md-5" data-date="0000-00-00"  data-link-field="RequestDate">								
							<span class="input-group-addon"></span>
							<input class="form-control" size="10" type="text" id="RequestDate" name="RequestDate" value="" >
							<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
							<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
						</div>	
						-->
          </td>
        </tr>
        <tr>
          <td class="infoBoldFont" align="right">ผู้เบิก&nbsp;:&nbsp;</td>
          <td class="infoNormalFont" align="left">
            <input v-model="UserNameReq" type="text" id="UserNameReq" name="UserNameReq" size="20"
              style="background-color: #eeeeee;" readonly>
          </td>
          <input v-model="UserRequest" type="hidden" id="UserRequest" name="UserRequest" size="20">

          <td class="infoBoldFont" align="right">ยอดรวม&nbsp;:&nbsp;</td>
          <td class="infoNormalFont" align="left">
            <input :value="forMatNumber_show(TotalRequest)" type="text" id="TotalRequest" name="TotalRequest" size="20"
              style="background-color: #eeeeee;" readonly>
          </td>
        </tr>
        <tr>
          <td class="infoBoldFont" align="right">รหัสเอกสารอ้างอิง&nbsp;:&nbsp;</td>
          <td class="infoNormalFont" align="left" colspan="3">
            <input v-model="ReffDocPO" type="text" id="ReffDocPO" name="ReffDocPO" size="20"
              style="background-color: #eeeeee;" readonly>
          </td>
        </tr>

        <tr>
          <td class="infoBoldFont" align="left" colspan="4"><br>รายการขอเบิก</td>
        </tr>
        <tr>
          <td class="infoBoldFont" align="left" colspan="4">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='checkbox' id='ChckGetRcv_all' name='ChckGetRcv_all'
              @change='onChangeChckGetAll()' value='1'> เลือกทั้งหมด
          </td>
        </tr>
        <tr>
          <td class="infoBoldFont" align="left" colspan="4">
            <table border="1" bordercolor="#767777" width="100%" style="font-size:12">
              <tr>
                <td align='center' width="5%"><b>รับเงินแล้ว</b></td>
                <td align='center' width="5%"><b>ลำดับ</b></td>
                <td align='center' width="5%"><b>เลขใบเบิก</b></td>
                <td align='center'><b>รายละเอียด</b></td>
                <td align='center' width="5%"><b>แผนก</b></td>
                <td align='center' width="10%"><b>ประเภท</b></td>
                <!--<td align='center'><b>สาขา</b></td>-->
                <td align='center'><b>ก่อนหัก</b></td>
                <td align='center'><b>ภาษี</b></td>
                <td align='center'><b>ภาษี ณ ที่จ่าย</b></td>
                <td align='center'><b>รวม</b></td>
                <td align='center'><b>เลขสัญญาเช่า</b></td>
                <td align='center'><b>ทะเบียนรถ</b></td>
              </tr>
              <tr v-for="(item, index) in tableData" :key="index">
                <td align="center" class="inputForm">
                  <input type="checkbox" :id="'ChckGetRcv_' + index" :name="'ChckGetRcv_' + index"
                    @change="onChangeChckGet()" v-model="item.ChckGetRcv_BIT" />
                </td>
                <!-- <td align="center" class="inputForm">{{ index + 1 }}</td> -->
                <td align="center" class="inputForm">{{ item.RequestNumber }}</td>
                <td align="left" class="inputForm">
                  <input type="text" :id="'RequestDocNo_' + index" :name="'RequestDocNo_' + index"
                    :value="item.RequestDocNo" style="width: 100%; border: 0px" readonly>
                </td>
                <td align="left" class="inputForm">
                  <textarea :id="'Description_' + index" :name="'Description_' + index"
                    style="width: 100%; height: 80px; border: 0px; resize: none; overflow: hidden;"
                    readonly>{{ item.Description }}</textarea>
                </td>
                <td align="left" class="inputForm">{{ item.Department }}</td>
                <td align="left" class="inputForm">{{ item.TEXTDESC }}</td>
                <td align="left" class="inputForm">
                  <input class="inputNumber" type="text" :id="'BeforVat_' + index" :name="'BeforVat_' + index"
                    :value="item.BeforVat.toFixed(2)" style="width: 100%; border: 0px" readonly>
                </td>
                <td align="left" class="inputForm">
                  <input class="inputNumber" type="text" :id="'VAT_' + index" :name="'VAT_' + index"
                    :value="item.VAT.toFixed(2)" style="width: 100%; border: 0px" readonly>
                </td>
                <td align="left" class="inputForm">
                  <input class="inputNumber" type="text" :id="'WHT_' + index" :name="'WHT_' + index"
                    :value="item.WHT.toFixed(2)" style="width: 100%; border: 0px" readonly>
                </td>
                <td align="left" class="inputForm">
                  <input class="inputNumber" type="text" :id="'Total_' + index" :name="'Total_' + index"
                    :value="item.Total.toFixed(2)" style="width: 100%; border: 0px" readonly>
                </td>
                <td align="left" class="inputForm">
                  <input type="text" :id="'RefDoc_' + index" :name="'RefDoc_' + index" :value="item.RefDoc"
                    style="width: 100%; border: 0px" readonly>
                </td>
                <td align="left" class="inputForm">
                  <input type="text" :id="'VehicleNumber_' + index" :name="'VehicleNumber_' + index"
                    :value="item.VehicleNumber" style="width: 100%; border: 0px" readonly>
                </td>
              </tr>
              <!-- <tr id='reqId_1' style='display:table-row'>
                <td align='center' class='inputForm'><input type='checkbox' id='ChckGetRcv_1' name='ChckGetRcv_1'
                    @change='onChangeChckGet()' value='1' checked></td>
                <td align='center' class='inputForm'>1</td>
                <td align='left' class='inputForm'><input type='text' id='RequestDocNo_1' name='RequestDocNo_1'
                    value='15203' style='width:100%; border:0px' readonly></td>
                <td align='left' class='inputForm'><input type='text' id='Description_1' name='Description_1'
                    value='ค่าล้างรถลูกค้า SCG วันที่ 13/09/66' style='width:100%; border:0px' readonly></td>
                <td align='left' class='inputForm'><input type='text' id='Department_1' name='Department_1' value='ST'
                    style='width:100%; border:0px' readonly></td>
                <td align='left' class='inputForm'>V-ค่าใช้จ่าย-หลังส่งมอบ-สุวรรณภูมิ</td>
                <td align='left' class='inputForm'><input class='inputNumber' type='text' id='BeforVat_1'
                    name='BeforVat_1' value='840.00' style='width:100%; border:0px; display:none' readonly><input
                    class='inputNumber' type='text' id='BeforVat2_1' name='BeforVat2_1' value='840.00'
                    style='width:100%; border:0px' readonly></td>
                <td align='left' class='inputForm'><input class='inputNumber' type='text' id='VAT_1' name='VAT_1'
                    value='0.00' style='width:100%; border:0px; display:none' readonly><input class='inputNumber'
                    type='text' id='VAT2_1' name='VAT2_1' value='0.00' style='width:100%; border:0px' readonly></td>
                <td align='left' class='inputForm'><input class='inputNumber' type='text' id='WHT_1' name='WHT_1'
                    value='0.00' style='width:100%; border:0px; display:none' readonly><input class='inputNumber'
                    type='text' id='WHT2_1' name='WHT2_1' value='0.00' style='width:100%; border:0px' readonly></td>
                <td align='left' class='inputForm'><input class='inputNumber' type='text' id='Total_1' name='Total_1'
                    value='840.00' style='width:100%; border:0px; display:none' readonly><input class='inputNumber'
                    type='text' id='Total2_1' name='Total2_1' value='840.00' style='width:100%; border:0px' readonly></td>
                <td align='left' class='inputForm'><input type='text' id='RefDoc_1' name='RefDoc_1' size='10' value=''
                    style=' border:0px' readonly></td>
                <td align='left' class='inputForm'><input type='text' id='VehicleNumber_1' name='VehicleNumber_1'
                    size='10' value='' style=' border:0px' readonly></td>
              </tr>
              <tr id='reqId_2' style='display:table-row'>
                <td align='center' class='inputForm'><input type='checkbox' id='ChckGetRcv_2' name='ChckGetRcv_2'
                    @change='onChangeChckGet()' value='1' checked></td>
                <td align='center' class='inputForm'>2</td>
                <td align='left' class='inputForm'><input type='text' id='RequestDocNo_2' name='RequestDocNo_2'
                    value='15204' style='width:100%; border:0px' readonly></td>
                <td align='left' class='inputForm'><input type='text' id='Description_2' name='Description_2'
                    value='ค่าล้างรถลูกค้า SVB วันที่ 15/09/66' style='width:100%; border:0px' readonly></td>
                <td align='left' class='inputForm'><input type='text' id='Department_2' name='Department_2' value='ST'
                    style='width:100%; border:0px' readonly></td>
                <td align='left' class='inputForm'>V-ค่าใช้จ่าย-หลังส่งมอบ-สุวรรณภูมิ</td>
                <td align='left' class='inputForm'><input class='inputNumber' type='text' id='BeforVat_2'
                    name='BeforVat_2' value='750.00' style='width:100%; border:0px; display:none' readonly><input
                    class='inputNumber' type='text' id='BeforVat2_2' name='BeforVat2_2' value='750.00'
                    style='width:100%; border:0px' readonly></td>
                <td align='left' class='inputForm'><input class='inputNumber' type='text' id='VAT_2' name='VAT_2'
                    value='0.00' style='width:100%; border:0px; display:none' readonly><input class='inputNumber'
                    type='text' id='VAT2_2' name='VAT2_2' value='0.00' style='width:100%; border:0px' readonly></td>
                <td align='left' class='inputForm'><input class='inputNumber' type='text' id='WHT_2' name='WHT_2'
                    value='0.00' style='width:100%; border:0px; display:none' readonly><input class='inputNumber'
                    type='text' id='WHT2_2' name='WHT2_2' value='0.00' style='width:100%; border:0px' readonly></td>
                <td align='left' class='inputForm'><input class='inputNumber' type='text' id='Total_2' name='Total_2'
                    value='750.00' style='width:100%; border:0px; display:none' readonly><input class='inputNumber'
                    type='text' id='Total2_2' name='Total2_2' value='750.00' style='width:100%; border:0px' readonly></td>
                <td align='left' class='inputForm'><input type='text' id='RefDoc_2' name='RefDoc_2' size='10' value=''
                    style=' border:0px' readonly></td>
                <td align='left' class='inputForm'><input type='text' id='VehicleNumber_2' name='VehicleNumber_2'
                    size='10' value='' style=' border:0px' readonly></td>
              </tr> -->
            </table>
            <br><br>
            <b>สรุปการเบิก</b>
            <table border="1" bordercolor="#767777" width="40%" style="font-size:14">
              <tr>
                <td width="50%"> ยอดรวมค้างเบิก </td>
                <td align=right width="50%">
                  <input :value="sumOutstanding" class='inputNumber' type="text" id="Outstanding_balance"
                    name="Outstanding_balance" size="20" style="width:100%; border:0px; display:none" readonly>
                  <input :value="forMatNumber_show(sumOutstanding)" class='inputNumber' type="text"
                    id="Outstanding_balance2" name="Outstanding_balance2" size="20" style="width:100%; border:0px"
                    readonly>
                </td>
              </tr>
              <tr>
                <td> ยอดรวมเงินที่ได้รับ </td>
                <td align=right>
                  <input :value="sumReceived" class='inputNumber' type="text" id="Money_received" name="Money_received"
                    size="20" style="width:100%; border:0px; display:none" readonly>
                  <input :value="forMatNumber_show(sumReceived)" class='inputNumber' type="text" id="Money_received2"
                    name="Money_received2" size="20" style="width:100%; border:0px" readonly>
                </td>
              </tr>
              <tr>
                <td> รวมเงินสดย่อย </td>
                <td align=right>
                  <input :value="grandTotal" type="text" id="Grand_total" name="Grand_total" size="20"
                    style="width:100%; border:0px; display:none" readonly>
                  <input :value="forMatNumber_show(grandTotal)" class='inputNumber' type="text" id="Grand_total2"
                    name="Grand_total2" size="20" style="width:100%; border:0px" readonly>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
      <div class="card-footer d-flex justify-content-between py-6 px-9">
        <div>
          <router-link :to="'/csh_withdrawal_request_sea/index'">
            <button class="btn btn-danger btn-active-light-second me-2">
              Back
            </button>
          </router-link>
        </div>
        <div>
          <!-- <button type="reset" class="btn btn-secondary btn-active-light-second me-2">
            Discard
          </button> -->


          <button type="submit" id="submit" ref="submitButton" class="btn btn-success" @click="onSubmitSaveChanges">
            <span class="indicator-label"> Save </span>
            <span class="indicator-progress">
              Please wait...
              <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          </button>
        </div>
      </div>


    </div>
  </VForm>
  <input type="hidden" name="user_login_system" id="user_login_system" value="werayut.m">
  <input type="hidden" name="cnt_vend" id="cnt_vend" value="10">
  <input type="hidden" name="current_RqId" id="current_RqId" value="1">
  <input v-model="ReffDocPO" type="hidden" name="ReffDocPO" id="ReffDocPO">
  <input type="hidden" name="Medal_cnt" id="Medal_cnt" value="12">
  <input type="hidden" name="REQUEST_cnt" id="REQUEST_cnt" value="1">
  <input v-model="CompanyId" type="hidden" name="Companyid" id="Companyid">
  <input type="hidden" name="IdRequest" id="IdRequest" value="">
  <input type="hidden" name="StatusSave" id="StatusSave" value="0">
</template>  


<script lang="ts">

import ApiService from "@/core/services/ApiService";
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref, onMounted, computed, createApp } from 'vue';
import { UserAdminStore, type UserAdmin } from "@/stores/UserAdmin";
import type { Sort } from "@/components/kt-datatable/table-partials/models";
import arraySort from "array-sort";
import Swal from "sweetalert2/dist/sweetalert2.js";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import axios from 'axios';
// import {  useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import router from "@/router";
import Datepicker from 'vue3-datepicker';
import 'bootstrap-datepicker';
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css';
import moment from 'moment'
import { number } from "yup";
// import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.css';
// import 'bootstrap-datepicker';
// import $ from 'jquery'; // Import jQuery
// import { Vue, Component, Prop } from 'vue-property-decorator';


declare const $: any;


interface NewAddressData {
  dueDate1: string;
  dueDate2: string;
  tags: Array<string>;
  assign: string;
}

export default defineComponent({
  name: "csh_rule_edit",
  components: {
    Datatable,
    Datepicker
  },
  props: {
    widgetClasses: String,
    UserAdmin_Name: String
  },
  methods: {
    checkFileImages(event) {
      // Access the selected file
      const selectedFile = event.target.files[0];

      if (selectedFile) {
        // Check the file extension
        const allowedExtensions = ['jpg', 'jpeg', 'png'];
        const fileExtension = selectedFile.name.split('.').pop().toLowerCase();

        if (allowedExtensions.includes(fileExtension)) {
          // Valid file extension
          console.log('Valid file selected:', selectedFile);
        } else {
          // Invalid file extension
          console.error('Invalid file extension. Please select a .jpg or .png file.');
        }
      }
    },
  },
  setup() {
    interface Table {
      IdRequest: number;
      RequestNumber: number;
      RequestDocNo: string;
      Description: string;
      Branch: string;
      Cash: number | null;
      BeforVat: number;
      VAT: number;
      Total: number;
      WHT: number;
      VehicleNumber: string;
      Department: string;
      TEXTDESC: string;
      RefDoc: string;
      ChckGetRcv: number | null;
      TypeCode: string;
      StatPO: number | null;
      ChckGetRcv_BIT : boolean;
      // checked: boolean;
    }
    const tableData = ref<Table[]>([]);

    const submitButton = ref<HTMLElement | null>(null);

    const forMatNumber_input = (rowData, column) => {
      const inputValue = rowData[column];

      // Remove non-numeric and non-decimal characters
      const cleanedValue = inputValue.replace(/[^\d.]/g, '');

      // Convert the cleaned value to a number
      let numericValue = parseFloat(cleanedValue);

      // Check if the numericValue is a valid number
      if (isNaN(numericValue)) {
        numericValue = 0; // Set to 0 if not a valid number
      }

      // Format the number with two decimal places and commas
      rowData[column] = numericValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
    const forMatNumber_inputValue = (fieldName, item, decimalPlaces = 2) => { // Default to 2 decimal places
      // Get the input value based on the field name
      const inputValue = item[fieldName];

      const cleanedValue = inputValue.replace(/[^\d.]/g, '');

      // Convert the cleaned value to a number
      let numericValue = parseFloat(cleanedValue);

      // Check if the numericValue is a valid number
      if (isNaN(numericValue)) {
        numericValue = 0; // Set to 0 if not a valid number
      }

      // Format the number with the specified number of decimal places and commas
      item[fieldName] = numericValue.toFixed(decimalPlaces).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };



    const Budget_show = ref('');
    const Budget = ref<number>(0);
    const SumOutstn_date_1 = ref('');
    const SumOutstn_show_1 = ref('');
    const Sum_Outstn = ref('');
    const Sum_Total_Outstn = ref('');
    const Footer = ref([]);
    const Medal = ref<Array<{
      Amount: string;
      MedalName: string;
      TotalValue: string
    }>>([]);
    // const Sum_Total_show_medal = ref('');
    const Sum_Total_medal = ref<number>(0);
    const Sum_BeforVat = ref<number>(0);
    const Sum_VAT = ref<number>(0);
    const Sum_WHT = ref<number>(0);
    const Sum_Total = ref<number>(0);
    const ReserveMoney = ref<number>(0);
    const ReffDocPO = ref('');
    const CompanyId = ref('');
    const formattedReserveMoney = ref('');
    const TotalRequest = ref<number>(0);

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
    // const UserAdminList = ref([]);
    // const initUserAdminList = ref([]);
    const loading = ref(true);
    //const router = useRoute();
    const route = useRoute();
    const test = ref({});
    const vendorData = ref({
      success: true,
      data: []
    });
    const selectedCompany = ref('');

    const DISTID_DEP = ref({
      success: true,
      deta: []
    });
    const Department_1 = ref('');

    const APRDC = ref({
      success: true,
      deta: []
    });
    const TypeCode_1 = ref('');

    const datepicker1 = ref(null);
    const datepicker1Modal = ref(null);
    const UserNameReq = ref('');
    const UserRequest = ref('');
    const RequestDate = ref('');
    const UseUserAdmin_FullName = ref('');
    const UseUserAdmin_Name = ref('');
    const IdRequest = ref('');

    const inputRows = ref<Array<InputRow>>([]);

    interface InputRow {
      field1: number;
      field2: string;
      field3: string;
      // Add more fields as needed
    }
    onMounted(async () => {
      // console.log("onMounted async");
      await onPageLoad();
      onChangeChckGet();
    });
    onMounted(() => {
      // console.log("onMounted not async");

    });
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


    function parseNumber(input) {
      // If the input is already a number, return it
      if (typeof input === 'number') {
        return input;
      }

      // Remove commas from the input string
      const stringWithoutCommas = input.toString().replace(/,/g, '');

      // Try parsing the cleaned string as a floating-point number
      const parsedNumber = parseFloat(stringWithoutCommas);

      // Check if the parsing was successful
      if (!isNaN(parsedNumber)) {
        return parsedNumber;
      } else {
        // Parsing failed, return NaN or handle the error as needed
        return NaN;
      }
    }





    function checkVender() {
      // console.log(selectedCompany.value)
      if (selectedCompany.value == "") {
        alert("กรุณาเลือก รหัสเจ้าหนี้ก่อน");
      }
    }

    const onPageLoad = async () => {
      try {
        const id = route.params.id;
        // console.log("id: " + id)
        const responseDropdown = await axios.get('http://localhost:3100/api/getVenderDropdown');
        const apiResponse = responseDropdown.data;
        if (apiResponse.success && Array.isArray(apiResponse.data)) {

          vendorData.value.data = apiResponse.data;
        } else {
          console.error('Invalid API response format:', apiResponse);
        }

        await axios.get(`http://localhost:3100/api/csh_withdrawal_request_update_by_id/${id}`).then(response => {
          const data01 = response.data.data['01'];
          IdRequest.value = id.toString().trim();
          selectedCompany.value = data01[0]['VendorsCode'].trim();
          UserNameReq.value = data01[0]['UserNameReq'].trim();
          ReffDocPO.value = data01[0]['ReffDocPO'].trim();
          RequestDate.value = moment(data01[0]['RequestDate'].trim()).format('DD-MM-yyyy');
          TotalRequest.value = data01[0]['TotalRequest'];

          const data03 = response.data.data['03'];
          // console.log(data03)
          tableData.value = data03
          // const checkbox = document.getElementById("ChckGetRcv");
          // if (checkbox) {
          //   checkbox.checked = true;
          // }
          // console.log(TotalRequest.value)
          // console.log(selectedCompany.value)
        }).catch(error => {
          console.log(error);
        })


        await axios.get('http://localhost:3100/api/getProfileApp_By_IdApi').then(data => {
          // console.log(data);
          // console.log(data.data[0]['UserAdmin_FullName']);
          UseUserAdmin_FullName.value = data.data[0]['UserAdmin_FullName']
          UseUserAdmin_Name.value = data.data[0]['UserAdmin_Name']
        }).catch(error => {
          console.log(error);
        })
        // RequestDate.value = moment(Date()).format('DD-MM-yyyy');

        // handleCompanyChange()
        // console.log("onPageLoad end");
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
        // console.log(response.data['01']);

        // You can update your component's data or perform other actions here
      } catch (error) {
        console.error('Error making the API request:', error);
      }
    };
    function formatDate(inputDate: string): string {
      // Parse the input date string into a Date object
      const parts = inputDate.split('-');
      if (parts.length === 3) {
        const year = parseInt(parts[0]);
        const month = parseInt(parts[1]) - 1; // JavaScript months are 0-based
        const day = parseInt(parts[2]);
        const date = new Date(year, month, day);

        // Format the Date object as "dd-MM-yyyy"
        const dayStr = String(date.getDate()).padStart(2, '0');
        const monthStr = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 to month to make it 1-based
        const yearStr = String(date.getFullYear());

        return `${dayStr}-${monthStr}-${yearStr}`;
      } else {
        // Handle invalid input gracefully
        return 'Invalid Date';
      }
    }

    const onItemSelect = (selectedItems: Array<number>) => {
      selectedIds.value = selectedItems;
    };

    const search = ref<string>("");

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

    function allowNumbersOnly(event, decimalPlaces = 0) {
      const inputValue = event.target.value;
      const inputKey = event.key;

      // Regular expression for numeric input with optional decimal places
      const regex = new RegExp(`^\\d+(\\.\\d{0,${decimalPlaces}})?$`);

      // Allow numeric characters, decimal point, backspace, delete, and arrow keys
      if (inputKey === 'Backspace' || inputKey === 'Delete' || inputKey === 'ArrowLeft' || inputKey === 'ArrowRight') {
        return true;
      } else if (/\d/.test(inputKey) || (inputKey === '-' && event.target.selectionStart === 0) || inputKey === '.') {
        // Check if the input matches the allowed pattern
        if (regex.test(inputValue.substring(0, event.target.selectionStart) + inputKey + inputValue.substring(event.target.selectionEnd))) {
          return true; // Allow the input
        }
      }

      event.preventDefault(); // Prevent input of non-numeric characters
    }

    const formatNumberField = (value, decimals) => {
      // console.log('formatNumberField')
      // console.log(value)

      if (!value) return '';

      // Convert to number with specified decimal places
      const numericValue = parseFloat(value);
      if (isNaN(numericValue)) return '';
      // console.log(numericValue.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ','))
      return numericValue.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };


    const formatReserveMoney = () => {
      ReserveMoney.value = parseFloat(formattedReserveMoney.value.replace(/,/g, ''));
      formattedReserveMoney.value = formatNumberField(ReserveMoney.value, 2);
    };

    const onSubmitSaveChanges = async () => {
      // alert("0")
      // alert(0)
      let status = true;
      let msg = "";
      // const router = useRoute();
      // const router = useRoute();
      // const router = useRouter()
      // console.log(router)
      // ... Your existing form submission logic ...

      // Prepare data for insertion
      const requestData = {
        IdRequest: IdRequest.value,
        SumOutstn: sumOutstanding.value,
        SumGetRcv: sumReceived.value,
        REQUEST_CASHD: tableData.value.map((item, index) => ({
          IdRequest: IdRequest.value,
          ChckGetRcv: item['ChckGetRcv_BIT'],
          RequestNumber: item['RequestNumber'],
        }))
      };
      // console.log(tableData.value)
      // console.log(requestData)
      try {
        let UserAdmin_Id; // Define userRuleId here
        let responseData
        // Insert into UserRules table
        await axios.put(`http://localhost:3100/api/update_withdrawal_request/${IdRequest.value}`, requestData)
          .then(response => {
            responseData = response.data;   
                     
          })
          .catch(error => {
            // console.log('catch') 
            console.error("An error occurred:", error);
            status = false
            msg = "An error occurred:" + error
          });
          console.log(status)
        if (status == true) {
          Swal.fire({
            title: 'บันทึกข้อมูลสำเร็จแล้ว',
            // html: 'ข้อมูลจะถูกประมวลผล  เวลา  23:00 น. ของทุกวัน',            
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            heightAuto: false,
            customClass: { confirmButton: "btn fw-semobold btn-light-primary" },
          }).then(async () => {
            // console.log('router push')             
            await onPageLoad();
            onChangeChckGet();
            // router.replace(`/csh_withdrawal_request_sea/update/${IdRequest.value}`)
          });
        } else {
          Swal.fire({
            text: "Error update data:" + msg,
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Try again!",
            heightAuto: false,
            customClass: { confirmButton: "btn fw-semobold btn-light-danger" },
          });
        }
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    }
    
    const onChangeChckGetAll = () => {
      const ChckGetRcvAll = document.getElementById("ChckGetRcv_all") as HTMLInputElement;
      if (ChckGetRcvAll) {
        const isChecked = ChckGetRcvAll.checked;

        for (let t = 0; t < tableData.value.length; t++) {
          const ChckGetRcv = document.getElementById("ChckGetRcv_" + t) as HTMLInputElement;
          if (ChckGetRcv) {
            ChckGetRcv.checked = isChecked;
          }
        }
        onChangeChckGet();
      } else {
        console.error("Element with ID 'ChckGetRcv_all' not found.");
      }
    };

    const sumOutstanding = ref('0.00');
    const sumReceived = ref('0.00');
    const grandTotal = ref('0.00');

    const onChangeChckGet = () => {
      let sumtotal: number = 0.00;
      let sumtotal_Outstanding: number = 0.00;
      let sumtotal_received: number = 0.00;

      for (let t: number = 0; t < tableData.value.length; t++) { // Use '<' instead of '<='
        const checkbox = document.getElementById("ChckGetRcv_" + t) as HTMLInputElement;
        const totalInput = document.getElementById("Total_" + t) as HTMLInputElement;
        // console.log(checkbox)
        if (checkbox && totalInput) { // Check if elements exist
          if (checkbox.checked == true && totalInput.value != "") {
            sumtotal_received += parseFloat(totalInput.value);
          } else if (!checkbox.checked && totalInput.value != "") {
            sumtotal_Outstanding += parseFloat(totalInput.value);
          }
        }
      }

      sumtotal = sumtotal_received + sumtotal_Outstanding;

      // Update reactive variables instead of manipulating the DOM
      sumOutstanding.value = sumtotal_Outstanding.toFixed(2);
      sumReceived.value = sumtotal_received.toFixed(2);
      grandTotal.value = sumtotal.toFixed(2);
      // console.log('sumOutstanding:' + sumOutstanding.value)
      // console.log('sumReceived: ' + sumReceived.value)
      // console.log('grandTotal: ' + grandTotal.value)
    };

    return {
      sumOutstanding, sumReceived, grandTotal,
      submitButton,
      Sum_Total_medal,
      targetData,
      loading,
      // UserAdminList,
      // sort,
      onItemSelect,
      headerConfig,
      // deleteButton,
      getAssetPath,
      search,
      // searchItems,
      selectedIds,
      // deleteFewSubscriptions,
      initDatepickers,
      vendorData,
      selectedCompany,
      searchButtonClicked,
      Budget_show,
      SumOutstn_date_1,
      SumOutstn_show_1,
      Sum_Outstn,
      Sum_Total_Outstn,
      UserNameReq, UserRequest,
      RequestDate,
      DISTID_DEP,
      Department_1,
      // handleCompanyChange,
      APRDC,
      TypeCode_1,
      // handleDepartment_1Change,
      inputRows,
      checkVender,
      forMatNumber_input,
      // sumValue,
      tableData,
      // addTableRow,
      // removeLastTableRow,
      Budget,
      forMatNumber_show,
      Footer, Medal,
      // sumValue_Medal,
      allowNumbersOnly,
      Sum_BeforVat, Sum_VAT, Sum_WHT, Sum_Total,
      ReserveMoney,
      // RecheckMoney,
      onSubmitSaveChanges,
      ReffDocPO, CompanyId,
      forMatNumber_inputValue,
      formatNumberField,
      formatReserveMoney, formattedReserveMoney,
      onChangeChckGetAll,
      onChangeChckGet,
      TotalRequest
    };

  },


});

</script>

