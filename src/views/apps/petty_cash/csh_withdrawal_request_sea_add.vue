<template>
  <VForm id="v_form" class="form" novalidate @submit="onSubmitSaveChanges">
    <div class="form-control py-15 px-15">
      <table id="page_1" width="100%" border="0" style="border-collapse: collapse;display:table" bordercolor="#FFFFFF">
        <tr>
          <td width="10%" class="infoBoldFont" align="right">รหัสเจ้าหนี้&nbsp;:&nbsp;</td>
          <td width="40%" class="infoNormalFont" align="left">
            <select id="companySelect" v-model="selectedCompany" @change="handleCompanyChange">
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

            <!-- <input v-model="RequestDate" type="text" id="RequestDate" name="RequestDate" size="20" style="background-color: #eeeeee;" readonly> -->

            <el-form-item prop="datePick">
              <el-date-picker v-model="RequestDate" type="date" placeholder="Select a date" :teleported="false"
                popper-class="override-styles" name="RequestDatePic"  
                value-format="DD-MM-YYYY" 
                format="DD-MM-YYYY"/>
            </el-form-item>

          </td>
        </tr>
        <tr>
          <td class="infoBoldFont" align="right">ผู้เบิก</td>
          <td class="infoNormalFont" align="left">
            <input v-model="UserNameReq" type="text" id="UserNameReq" name="UserNameReq" size="20"
              style="background-color: #eeeeee;" readonly>
          </td>
          <input v-model="UserRequest" type="hidden" id="UserRequest" name="UserRequest" size="20" >
          <td class="infoBoldFont" align="right">ยอดรวม&nbsp;:&nbsp;</td>
          <td class="infoNormalFont" align="left">
            <input :value="forMatNumber_show(Sum_Total)" type="text" id="TotalRequest" name="TotalRequest" size="20"
              style="background-color: #eeeeee; display:none" readonly>
            <input :value="forMatNumber_show(Sum_Total)" type="text" id="TotalRequest2" name="TotalRequest2" size="20"
              style="background-color: #eeeeee;" readonly>
          </td>
        </tr>
        <tr>
          <td class="infoBoldFont" align="right">แนบไฟล์รูปภาพ&nbsp;:&nbsp;</td>
          <td class="infoNormalFont" align="left" colspan="3">
            <input  type="file" id="file_attach1" name="file_attach1" 
              accept="image/x-png,image/jpeg"> <span style="color:red; font-size:12"> ( ถ้ามี ต้องเป็นไฟล์รูป .jpg หรือ
              .png
              เท่านั้น)</span>
          </td>

        </tr>
        <tr>
          <td class="infoBoldFont" align="left" colspan="4">รายการขอเบิก</td>
        </tr>
        <tr>
          <td class="infoBoldFont" align="left" colspan="4">
            <table border="1" bordercolor="#767777" width="100%" style="font-size:14px">
              <thead>
                <tr>
                  <th align="center">ลำดับ</th>
                  <th align="center" width="10%">เลขใบเบิก</th>
                  <th align="center" width="35%">รายละเอียด</th>
                  <th align="center">แผนก</th>
                  <th align="center">ประเภท</th>
                  <th align="center">ยอดก่อน VAT</th>
                  <th align="center">VAT</th>
                  <th align="center">ภาษี ณ ที่จ่าย</th>
                  <th align="center">รวม</th>
                  <th align="center">เลขสัญญาเช่า</th>
                  <th align="center">ทะเบียนรถ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(rowData, index) in tableData" :key="index">
                  <td align="center">{{ index + 1 }}</td>
                  <td align="left">
                    <input type="text" :id="'RequestDocNo_' + (index + 1)" :name="'RequestDocNo_' + (index + 1)"
                      maxlength="10" style="width:100%" v-model="rowData['เลขใบเบิก']" @change="checkVender">
                  </td>
                  <!-- ... (repeat for other columns) ... -->
                  <td align='left'>
                    <input type='text' :id="'Description_' + (index + 1)" :name="'Description_' + (index + 1)"
                      maxlength='50' style='width:100%' v-model="rowData['รายละเอียด']" @change="checkVender">
                  </td>
                  <td align='left'>
                    <select v-model="rowData['แผนก']" :id="'Department_' + (index + 1)"
                      :name="'Department_' + (index + 1)" @change="handleDepartment_1Change(index + 1)">
                      <option value="">เลือก</option>
                      <option v-if="Array.isArray(DISTID_DEP)" v-for="item in DISTID_DEP" :value="item['DISTID_DEP']"
                        :key="item['DISTID_DEP']">
                        {{ item['DISTID_DEP'] }}
                      </option>
                    </select>
                  </td>
                  <td align='left'>
                    <select v-model="rowData['ประเภท']" :id="'TypeCode_' + (index + 1)" :name="'TypeCode_' + (index + 1)"
                      style='width:250; font-size:12px'>
                      <option value=''>เลือก</option>
                      
                      <option v-if="rowData['APRDC'] && rowData['APRDC'].length > 0" v-for="item in rowData['APRDC']"
                        :value="item['DISTID']" :key="item['DISTID']">
                        ({{ item['DISTID'] }}) {{ item['TEXTDESC'] }}
                      </option>
                    </select>
                  </td>
                  <td align='left'>
                    <input class='inputNumber' type='text'
                      @change="forMatNumber_input(rowData, 'ยอดก่อน VAT'); sumValue(index); checkVender()"
                      :id="'BeforVat_' + (index + 1)" :name="'BeforVat_' + (index + 1)" size='8'
                      v-model="rowData['ยอดก่อน VAT']"
                      style='background-color: #ffffff; font-size:12; text-align: right;'>
                  </td>
                  <td align='left'><input class='inputNumber' type='text'
                      @change="forMatNumber_input(rowData, 'VAT'); sumValue(index); checkVender()"
                      :id="'VAT_' + (index + 1)" :name="'VAT_' + (index + 1)" size='8' v-model="rowData['VAT']"
                      style='background-color: #ffffff; font-size:12; text-align: right;'></td>
                  <td align='left' class='inputForm'><input class='inputNumber' type='text'
                      @change="forMatNumber_input(rowData, 'ภาษี ณ ที่จ่าย'); sumValue(index); checkVender()"
                      :id="'WHT_' + (index + 1)" :name="'WHT_' + (index + 1)" size='8' v-model="rowData['ภาษี ณ ที่จ่าย']"
                      style='background-color: #ffffff; font-size:12; text-align: right;'></td>
                  <td align='left' class='inputForm'>
                    <input class='inputNumber' type='text' @change="forMatNumber_input(rowData, 'รวม')"
                      :id="'Total_' + (index + 1)" :name="'Total_' + (index + 1)" size='8'
                      :value="forMatNumber_show(rowData['รวม'])"
                      style='background-color: #eeeeee; border:0px; font-size:12; display:none; text-align: right;'
                      readonly>

                    <input class='inputNumber' type='text' @change="forMatNumber_input(rowData, 'รวม')"
                      :id="'Total2_' + (index + 1)" :name="'Total2_' + (index + 1)" size='8'
                      :value="forMatNumber_show(rowData['รวม'])"
                      style='background-color: #eeeeee; border:0px; font-size:12; text-align: right;' readonly>
                  </td>
                  <td align='left' class='inputForm'><input type='text' :id="'RefDoc_' + (index + 1)"
                      :name="'RefDoc_' + (index + 1)" size='10' v-model="rowData['เลขสัญญาเช่า']" style='font-size:12'>
                  </td>
                  <td align='left' class='inputForm'><input type='text' :id="'VehicleNumber_' + (index + 1)"
                      :name="'VehicleNumber_' + (index + 1)" size='8' v-model="rowData['ทะเบียนรถ']" style='font-size:12'>
                  </td>
                </tr>

                <tr>
                  <td align='right' colspan="5"><b>รวมทั้งหมด</b></td>
                  <td align='right'>
                    <input :value="forMatNumber_show(Sum_BeforVat)" class='inputNumber' type='text' id='Sum_BeforVat' name='Sum_BeforVat'
                      size='8' style="background-color: #eeeeee; border:0px; font-size:12; text-align: right;" readonly>
                  </td>
                  <td align='right'>
                    <input :value="forMatNumber_show(Sum_VAT)" class='inputNumber' type='text' id='Sum_VAT' name='Sum_VAT' size='8'
                      style="background-color: #eeeeee; border:0px; font-size:12; text-align: right;" readonly>
                  </td>
                  <td align='right'>
                    <input :value="forMatNumber_show(Sum_WHT)" class='inputNumber' type='text' id='Sum_WHT' name='Sum_WHT' size='8'
                      style="background-color: #eeeeee; border:0px; font-size:12; text-align: right;" readonly>
                  </td>
                  <td align='right'>
                    <input :value="forMatNumber_show(Sum_Total)" class='inputNumber' type='text' id='Sum_Total' name='Sum_Total' size='8'
                      style="background-color: #eeeeee; border:0px; font-size:12; text-align: right;" readonly>
                  </td>
                  <td align='right' colspan="2"></td>
                </tr>
              </tbody>

            </table>

            <button @click="addTableRow"><b>เพิ่ม +</b></button>
            <button @click="removeLastTableRow"><b>ลบ -</b></button>

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span style="color:red"> *** หมายเหตุ ยอดรวมก่อนvat แต่มิใช่หมายถึงยอดฐานvat ***</span>
            <br>
            <br>
          </td>
        </tr>
        <tr>
          <td align="center" colspan="4" class="infoBoldFont">
            <table border="1" width="100%">
              <tr>
                <td width="50%" valign="top" align="center">
                  <br>
                  <table border="1" bordercolor="#767777" width="80%" style="font-size:16px">
                    <tr>
                      <td align='center' width="60%"><b>วงเงิน</b></td>
                      <td align='center' width="40%">
                        <input v-model="Budget_show" class='text-align-right' type='label' id='Budget_show' name='Budget_show'
                          size='8' style='background-color: #eeeeee; border:0px; font-size:12; color:green' readonly>
                        <input v-model="Budget" class='inputNumber' type='hidden' id='Budget' name='Budget' size='8'
                          style='background-color: #eeeeee; border:0px; font-size:12; color:green' readonly>
                      </td>
                    </tr>
                  </table>
                  <br>
                  <table border="1" bordercolor="#767777" width="80%" style="font-size:14px">
                    <tr>
                      <td align="center" colspan="3"><b>รายการเบิกคงค้าง</b></td>
                    </tr>
                    <tr>
                      <td align="center"><b>รายการ</b></td>
                      <td align="center"><b>จำนวนเงิน</b></td>
                    </tr>


                    <tr>
                      <td align='center' width="60%">
                        ขออนุมัติเบิก {{ RequestDate }}
                        <input class='inputNumber' type='hidden' id='today_date' name='today_date'>
                      </td>
                      <td align='center' width="40%">
                        <input v-if="forMatNumber_show(Sum_Total) === ''" value='0.00' class='inputNumber text-align-right' type='text'
                          id='today_show' name='today_show' size='8'
                          style='background-color: #eeeeee; border:0px; font-size:12; color:orange' readonly>

                        <input v-else :value="forMatNumber_show(Sum_Total)" class='inputNumber text-align-right' type='text'
                          id='today_show' name='today_show' size='8'
                          style='background-color: #eeeeee; border:0px; font-size:12; color:orange' readonly>

                        <input v-model="Sum_Total" class='inputNumber text-align-right' type='hidden' id='today' name='today' size='8'
                          style='background-color: #eeeeee; border:0px; font-size:12; color:orange' readonly>
                      </td>
                    </tr>

                    <tbody>
                      <tr v-for="(item, index) in Footer" :key="index">
                        <td align='center'>

                          {{ 'วันที่ ' + item['RequestDate'] }}
                          <input :value="item['RequestDate']" class='inputNumber text-align-right' type='hidden' id='SumOutstn_date_1'
                            name='SumOutstn_date_1'>
                        </td>
                        <td align='center'>
                          <input :value="forMatNumber_show(item['SumOutstn'])" class='inputNumber text-align-right' type='text'
                            id='SumOutstn_show_1' name='SumOutstn_show_1' size='8'
                            style='background-color: #eeeeee; border:0px; font-size:12; color:orange' readonly>
                          <input :value="item['SumOutstn']" class='inputNumber text-align-right' type='hidden' id='SumOutstn_1'
                            name='SumOutstn_1' size='8'
                            style='background-color: #eeeeee; border:0px; font-size:12; color:orange' readonly>
                        </td>
                      </tr>
                    </tbody>
                    <tr>
                      <td align="center"><b>รวม</b></td>
                      <td align="center">
                        <input :value="forMatNumber_show(Sum_Outstn)" class='inputNumber text-align-right' type='text' id='Sum_show_Outstn'
                          name='Sum_show_Outstn' size='8' style="background-color: #eeeeee; border:0px; font-size:12"
                          readonly>
                        <input v-model="Sum_Outstn" class='inputNumber text-align-right' type='hidden' id='Sum_Outstn' name='Sum_Outstn'
                          size='8' style="background-color: #eeeeee; border:0px; font-size:12" readonly>
                      </td>
                    </tr>

                    <tr hieght="50">
                      <td align="center"><b>คงเหลือ</b><br>(วงเงิน - ยอดรวมเบิก)</td>
                      <td align="center">
                        <input :value="forMatNumber_show(Sum_Total_Outstn)" class='inputNumber text-align-right' type='text'
                          id='Sum_Total_show_Outstn' name='Sum_Total_show_Outstn' size='8'
                          style="background-color: #eeeeee; border:0px; font-size:12" readonly>
                        <input v-model="Sum_Total_Outstn" class='inputNumber text-align-right' type='hidden' id='Sum_Total_Outstn'
                          name='Sum_Total_Outstn' size='8' style="background-color: #eeeeee; border:0px; font-size:12"
                          readonly>
                      </td>
                    </tr>

                  </table>
                  <br>
                  <br>
                  <span id="SumTrueLabel" style="color:green; display:none">
                    <b>รายการยอดเงินถูกต้อง ตามเงือนไข </b> <br>
                    ถ้าตรวจสอบความถูกต้องแล้ว สามารถกดบันทึกได้
                  </span>
                  <span id="SumFalseLabel" style="color:red; display:none">
                    <b>กรุณาตรวจสอบยอดเงินให้ถูกต้อง</b> <br>
                    วงเงินสดย่อย = ยอดขออนุมัติเบิก + เงินค้างเบิก + เงินสดคงเหลือ + เงินทดลองจ่าย
                  </span>
                  <br>
                  <br>
                  <span id="SumLabel" style="color:rgb(89, 0, 255); ">
                    <b>วงเงินสดย่อย : {{ Budget_show }}</b> <br><br>
                    <b>ยอดขออนุมัติเบิก : {{ Sum_Total }}</b> <br>
                    <b>เงินค้างเบิก : {{ (Number as any)(Sum_Outstn) - Sum_Total }}</b> <br>
                    

                    <b>เงินสดคงเหลือ : {{ Sum_Total_medal }}</b> <br>
                    <b>เงินทดลองจ่าย : {{ ReserveMoney }}</b> <br>
                    <b>รวม : {{ parseFloat((Number as any)(Sum_Total)) +parseFloat((Number as any)((Number as any)(Sum_Outstn) - (Sum_Total))) +parseFloat((Number as any)(Sum_Total_medal)) +parseFloat((Number as any)(ReserveMoney)) }}</b> <br><br>
                    <b>Sum_Outstn : {{ Sum_Outstn }}</b> <br>
                    <b>Sum_Total_medal : {{ Sum_Total_medal }}</b> <br>
                    <b>ReserveMoney : {{ ReserveMoney }}</b> <br>
                    <b>รวม : {{ parseFloat(Sum_Outstn) + parseFloat((Number as any)(Sum_Total_medal)) + parseFloat((Number as any)(ReserveMoney)) }}</b> <br>
                    <b>เพิ่มอีก : {{ parseFloat((Number as any)(Budget)) - (parseFloat(Sum_Outstn) +
                      parseFloat((Number as any)(Sum_Total_medal)) +
                      parseFloat((Number as any)(ReserveMoney))) }}</b>
                    <!-- วงเงินสดย่อย = ยอดขออนุมัติเบิก + เงินค้างเบิก + เงินสดคงเหลือ + เงินทดลองจ่าย -->
                  </span>
                  <br>
                  <br>
                </td>
                <td width="50%" align="center">
                  <table border="1" bordercolor="#767777" width="100%" style="font-size:14px">
                    <tr>
                      <td align="center" colspan="3"><b>สรุปผลการตรวจนับเงินสดคงเหลือ</b></td>
                    </tr>
                    <tr>
                      <td align="center"><b>รายการ</b></td>
                      <td align="center"><b>จำนวน</b></td>
                      <td align="center"><b>รวมเป็นเงิน</b></td>
                    </tr>
                    <tbody>
                      <tr v-for="(item, index) in Medal" :key="index">
                        <td align="center">
                          <input :value="item['MedalName']" class="inputNumber" type="text" id="MedalName_{{ index }}"
                            name="MedalName" size="8" style="background-color: #eeeeee; border: 0px; font-size: 12"
                            readonly>
                        </td>
                        <td align="center">
                          <input v-model="item['Amount']" class="inputNumber" type="text" @input="sumValue_Medal(index)" @change="forMatNumber_inputValue('Amount', item,0)"
                            @keydown="allowNumbersOnly($event, 0)" id="Amount_{{ index }}" :name="'Amount_' + index"
                            size="8" style="border: 0px; font-size: 12">
                        </td>
                        <td align="center">
                          <input :value="forMatNumber_show(item['TotalValue'])" class="inputNumber" type="text"
                            :id="'TotalValue_show_' + index" :name="'TotalValue_show_' + index" size="8"
                            style="background-color: #eeeeee; border: 0px; font-size: 12" readonly>
                          <input :value="item['TotalValue']" class="inputNumber" type="hidden" :id="'TotalValue_' + index"
                            :name="'TotalValue_' + index" size="8"
                            style="background-color: #eeeeee; border: 0px; font-size: 12" readonly>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" colspan="2"><b>รวมทั้งหมด</b></td>
                        <td align="center">
                          <input :value="forMatNumber_show(Sum_Total_medal)" id="Sum_Total_show_medal"
                            name="Sum_Total_show_medal" size="8"
                            style="background-color: #eeeeee; border: 0px; font-size: 12" readonly>
                          <input v-model="Sum_Total_medal" class="inputNumber" type="hidden" id="Sum_Total_medal"
                            name="Sum_Total_medal" size="8" style="background-color: #eeeeee; border: 0px; font-size: 12"
                            readonly>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" colspan="2"><b>ยอดเงินทดลองจ่าย</b></td>
                        <td align="center">
                          <input v-model="formattedReserveMoney"  class="inputNumber" type="text" @keydown="allowNumbersOnly($event, 2)"
                           @change="formatReserveMoney();RecheckMoney();" id="ReserveMoney" name="ReserveMoney" size="8" style="font-size: 12">
                        </td>
                      </tr>
                    </tbody>
                  </table>
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


          <button type="submit" id="submit" ref="submitButton" class="btn btn-success" @click="onSubmitSaveChanges" v-bind:disabled="disabledStatusSave">
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
  <input v-model="ReffDocPO" type="hidden" name="ReffDocPO" id="ReffDocPO" >
  <input type="hidden" name="Medal_cnt" id="Medal_cnt" value="12">
  <input type="hidden" name="REQUEST_cnt" id="REQUEST_cnt" value="1">
  <input v-model="CompanyId" type="hidden" name="Companyid" id="Companyid">
  <input type="hidden" name="IdRequest" id="IdRequest" value="">
  <input type="hidden" name="StatusSave" id="StatusSave" value="0">
</template>  


<script lang="ts">

import ApiService from "@/core/services/ApiService";
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref, onMounted, computed, createApp ,watch } from 'vue';
import { UserAdminStore, type UserAdmin } from "@/stores/UserAdmin";
import type { Sort } from "@/components/kt-datatable/table-partials/models";
import arraySort from "array-sort";
import Swal from "sweetalert2/dist/sweetalert2.js";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import axios from 'axios';
// import {  useRouter } from 'vue-router';
import router from "@/router";
import Datepicker from 'vue3-datepicker';
import 'bootstrap-datepicker';
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css';
import moment from 'moment'
import { bool, number } from "yup";
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
  name: "kt-widget-11",
  components: {
    Datatable,
    Datepicker
  },
  props: {
    widgetClasses: String,
    UserAdmin_Name: String
  },
  // data() {
  //   return {
  //     StatusSave: 0, // Initialize with the desired value
  //   };
  // },
  // computed: {
  //   isButtonDisabled() {
  //     return this.StatusSave === 0;
  //   },
  // },
  methods: {
    
    

    
  },
  setup() {
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

    const tableData = ref([
      // Initial row
      {        
        'เลขใบเบิก': '',
        'รายละเอียด': '',
        'แผนก': '',
        'ประเภท': '',
        'ยอดก่อน VAT': '',
        'VAT': '',
        'ภาษี ณ ที่จ่าย': '',
        'รวม': '',
        'เลขสัญญาเช่า': '',
        'ทะเบียนรถ': '',
        'APRDC': []
      }
    ]);

    // Method to add a new table row
    const addTableRow = () => {
      tableData.value.push({
        'เลขใบเบิก': '',
        'รายละเอียด': '',
        'แผนก': '',
        'ประเภท': '',
        'ยอดก่อน VAT': '0.00',
        'VAT': '0.00',
        'ภาษี ณ ที่จ่าย': '0.00',
        'รวม': '0.00',
        'เลขสัญญาเช่า': '',
        'ทะเบียนรถ': '',
        'APRDC': []
      });
    };

    const removeLastTableRow = () => {
      if (tableData.value.length > 1) {
        // Remove the last row by popping it from the array
        tableData.value.pop();
        sumValue(-1)
      }
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
      TotalValue: string }>>([]);
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
    const file_attach1 = ref(''); 

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
    // const RequestDatePic = ref(null);
    const formattedRequestDate = ref('');

    // const formatDateRequestDate = (date) => {
    //   return moment(date).format('DD-MM-yyyy');
    // };
    // watch(RequestDatePic, (newDate) => {
    //   console.log(newDate) 
    //   if (newDate) {
    //     formattedRequestDate.value = formatDateRequestDate(newDate);
    //   } else {
    //     formattedRequestDate.value = '';
    //   }
    //   console.log(formattedRequestDate.value) 
    // });

    const inputRows = ref<Array<InputRow>>([]);

    interface InputRow {
      field1: number;
      field2: string;
      field3: string;
      // Add more fields as needed
    }

    const disabledStatusSave = ref<boolean>(true)
    // let disabledStatusSave = true


    onMounted(async () => {
      // console.log("onMounted async");
      await onPageLoad();

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
  
    function sumValue_Medal(index) {
      
      const MedalArray = Medal.value;

      const item = MedalArray[index];


      const amount = parseFloat(item['Amount']) || 0;
      const medalName = parseFloat(item['MedalName']) || 0;
      const totalValue = (amount * medalName).toFixed(2);
      item['TotalValue'] = totalValue;

      // Calculate and update the sum of TotalValue
      const sumTotal = MedalArray.reduce((total, item) => total + parseFloat(item.TotalValue), 0).toFixed(2);

      // const sumTotal = (Medal.value as YourArrayTypeHere[]).reduce((total, item) => total + parseFloat(item.TotalValue || 0), 0).toFixed(2);

      // const sumTotal = Medal.reduce((total, item) => total + parseFloat(item.TotalValue || 0), 0).toFixed(2);

      Sum_Total_medal.value = parseFloat(sumTotal);
      // console.log(Sum_Total_medal.value);

      RecheckMoney();
    };
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
    };
    function sumValue(index) {
      // console.log(index)
      const tableDataArray = tableData.value;  
      

      if(index >= 0) {  
        const item = tableDataArray[index];       
        const BeforVat = parseNumber(item['ยอดก่อน VAT']) || 0;
        const Vat = parseNumber(item['VAT']) || 0;
        const WHT = parseNumber(item['ภาษี ณ ที่จ่าย']) || 0; 
        item['รวม'] = (BeforVat + Vat - WHT).toString();
      }

      Sum_BeforVat.value = tableDataArray.reduce((total, item) => {
        const value = parseNumber(item['ยอดก่อน VAT']) || 0;
        return total + value;
      }, 0);
      Sum_VAT.value = tableDataArray.reduce((total, item) => {
        const value = parseNumber(item['VAT']) || 0;
        return total + value;
      }, 0);
      
      Sum_WHT.value = tableDataArray.reduce((total, item) => {
        const value = parseNumber(item['ภาษี ณ ที่จ่าย']) || 0;
        return total + value;
      }, 0);
     
      Sum_Total.value = tableDataArray.reduce((total, item) => {
        const value = parseNumber(item['รวม']) || 0;
        return total + value;
      }, 0);

      Sum_Outstn.value = (Footer.value.reduce((total, item) => total + parseFloat(item['SumOutstn']) || 0, 0) + Sum_Total.value).toFixed(2);
      Sum_Total_Outstn.value = (Budget.value - parseFloat(Sum_Outstn.value)).toFixed(2)

      RecheckMoney();
    };
    function RecheckMoney() {
      // console.log('RecheckMoney ทำงาน')
      // var Sum_Outstn = Sum_Outstn.value;
      // var Sum_Total_medal = 0;
      // var ReserveMoney = 0;
      var Budget = 0;

      // if(document.getElementById("Sum_Outstn").value != ""){
      //   Sum_Outstn = parseFloat(document.getElementById("Sum_Outstn").value);
      // }

      // if(document.getElementById("Sum_Total_medal").value != ""){
      //   Sum_Total_medal = parseFloat(document.getElementById("Sum_Total_medal").value);
      // }
      // if(document.getElementById("ReserveMoney").value != ""){
      //   ReserveMoney = parseFloat(document.getElementById("ReserveMoney").value);
      // }
      Budget = parseNumber(Budget_show.value)
      // if(document.getElementById("Budget").value != ""){
      //   Budget = parseFloat(document.getElementById("Budget").value);
      // }


      // console.log('Sum_Total_medal: '+Sum_Total_medal)
      console.log('ReserveMoney: '+ReserveMoney.value)
      // console.log('Budget: '+Budget)

      var sum = parseNumber(Sum_Outstn.value) + parseNumber(Sum_Total_medal.value) + parseNumber(ReserveMoney.value);

      // console.log('Budget: ' + Budget +
      //   '\nSum_Outstn: ' + Sum_Outstn.value +
      //   '\nSum_Total_medal: ' + Sum_Total_medal.value +
      //   '\nReserveMoney: ' + ReserveMoney.value +

      //   '\nsum: ' + sum
      // )

console.log(Budget.toFixed(2) == sum.toFixed(2))
console.log(Budget)
console.log(sum)

      if (Budget.toFixed(2) == sum.toFixed(2)) {
        // console.log('1')
        document.getElementById("SumTrueLabel")!.style.display = "inline";
        document.getElementById("SumFalseLabel")!.style.display = "none";
        // document.getElementById("StatusSave").value = "1";
        (document.getElementById("StatusSave") as HTMLInputElement).value = "1";
        disabledStatusSave.value = false
      }
      else {
        // console.log('2')
        document.getElementById("SumTrueLabel")!.style.display = "none";
        document.getElementById("SumFalseLabel")!.style.display = "inline";
        // document.getElementById("StatusSave").value = "0";
        (document.getElementById("StatusSave") as HTMLInputElement).value = "0";
        disabledStatusSave.value = true
      }
      // console.log(disabledStatusSave)
    };
    function checkVender() {
      // console.log(selectedCompany.value)
      if (selectedCompany.value == "") {
        alert("กรุณาเลือก รหัสเจ้าหนี้ก่อน");
      }
    };
    async function handleCompanyChange() {
      
      // Function logic here
      // console.log('handleCompanyChange strat')
      // console.log('Selected Company:', selectedCompany.value);

      // tableData.value
      tableData.value.forEach((rowData) => {
        rowData['แผนก'] = '';
        rowData['ประเภท'] = ''; // Assuming 'แผนก' is the Department field in each row
      });
      Department_1.value = ""
      TypeCode_1.value = ""

      const requestData = {
        params: {
          // search: search.value,
          // dueDate1: targetData.value.dueDate1,
          // dueDate2: targetData.value.dueDate2,
          selectedCompany: selectedCompany.value
        }
      };
      try {
        const response = await axios.get('http://localhost:3100/api/csh_withdrawal_request_sea_add', requestData);
        const data11 = response.data.data['11'];
        DISTID_DEP.value = data11;

        const data09 = response.data.data['09'];
        Budget.value = data09[0]['Budget']
        Budget_show.value = forMatNumber_show(Budget.value)
        ReffDocPO.value = data09[0]['Code1'].substring(2)
        CompanyId.value = data09[0]['CompanyId']
        
        const data08 = response.data.data['08'];
        const formattedData = data08.map(item => {
          return {
            ...item,
            RequestDate: moment(item.RequestDate).format('DD-MM-yyyy')
          };
        });
        // console.log(formattedData)
        // console.log(moment(response.data['02'][0]['RequestDate']).format('DD-MM-yyyy'))
        Footer.value = formattedData

        const Sum_Outstn_number = data08.reduce((total, item) => total + (item.TotalRequest || 0), 0)        
        Sum_Outstn.value = (parseFloat(Sum_Outstn_number) + Sum_Total.value).toFixed(2);
        // Sum_Outstn.value = (parseFloat(Sum_Outstn_number) + parseFloat((number as any)(Sum_Total.value || 0))).toFixed(2);

        // console.log(parseFloat(Sum_Outstn.value))
        // console.log(Budget.value)
        Sum_Total_Outstn.value = (Budget.value - parseFloat(Sum_Outstn.value)).toFixed(2);

        tableData.value.forEach((rowData) => {
          rowData['APRDC'] = [];
          // rowData['ประเภท'] = ''; // Assuming 'แผนก' is the Department field in each row
        });

        
        
        RecheckMoney()
        // tableData.value[0]['APRDC'] = [];


      } catch (error) {
        console.error('API Request Error:', error);
        // Handle errors here
        DISTID_DEP.value = {
          success: false,
          deta: []
        };

        tableData.value.forEach((rowData) => {
          rowData['APRDC'] = [];
          // rowData['ประเภท'] = ''; // Assuming 'แผนก' is the Department field in each row
        });
      }
    };
    async function handleDepartment_1Change(index) {
      // Function logic here
      var SelectedDepartment = tableData.value[index - 1]['แผนก']
      // console.log('handleDepartment_1Change strat')
      // console.log('Selected Department:', SelectedDepartment);
      tableData.value[index - 1]['ประเภท'] = ""

      if (!SelectedDepartment) {
        tableData.value[index - 1]['APRDC'] = [];
      } else {
        const requestData = {
          params: {
            selectedCompany: selectedCompany.value,
            Department_1: SelectedDepartment
          }
        };
        try {
          const response = await axios.get('http://localhost:3100/api/csh_withdrawal_request_sea_add', requestData);
          const data = response.data.data['06'];
          tableData.value[index - 1]['APRDC'] = data;
          //APRDC.value = data;
          // Handle the API response data as needed
          // console.log('API Response:', data);
          // console.log('tableData.value:', tableData.value[index - 1]['APRDC']);
          // Update your component's data with the API response, if necessary
          // this.someData = data.someProperty;
        } catch (error) {
          console.error('API Request Error:', error);
          // Handle errors here
        }
      }
    };
    const onPageLoad = async () => {
      tableData.value[0]['ยอดก่อน VAT'] = "0.00"
      tableData.value[0]['VAT'] = "0.00"
      tableData.value[0]['ภาษี ณ ที่จ่าย'] = "0.00"
      tableData.value[0]['รวม'] = "0.00"
      try {
        // console.log("onPageLoad strat");
        // Make a GET request to the API endpoint using Axios
        const response = await axios.get('http://localhost:3100/api/getVenderDropdown');
        // Handle the API response data and update the component's data
        const apiResponse = response.data;
        if (response.data.UserRule_Id == 1) {
          // console.log("1");
          // selectedCompany.value = "TRPPTCASH"
          selectedCompany.value = response.data.UserAdmin_VenderCode.trim()
          await handleCompanyChange();
          
        } else {
               
          selectedCompany.value = response.data.data[0]['VenderCode'];
          await handleCompanyChange();
          TypeCode_1.value = ''
        }
        if (apiResponse.success && Array.isArray(apiResponse.data)) {
          vendorData.value.data = apiResponse.data;
          
        } else {
          console.error('Invalid API response format:', apiResponse);
        }

        const requestData = {
          params: {
            // search: search.value,
            // dueDate1: targetData.value.dueDate1,
            // dueDate2: targetData.value.dueDate2,
            selectedCompany: selectedCompany.value
          }
        };
        try {
          const response = await axios.get('http://localhost:3100/api/csh_withdrawal_request_sea_add', requestData);
          const data07 = response.data.data['07'];
          Medal.value = data07


        } catch (error) {
          console.error('data07: ', error);
        }


        await axios.get('http://localhost:3100/api/getProfileApp_By_IdApi').then(data => {
          // console.log(data);
          // console.log(data.data[0]['UserAdmin_FullName']);
          UserNameReq.value = data.data[0]['UserAdmin_FullName']
          UserRequest.value = data.data[0]['UserAdmin_Name']
        }).catch(error => {
          console.log(error);
        })
        RequestDate.value = moment(Date()).format('DD-MM-yyyy');

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
    };
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
    };
    function isRTL() {
      // Implement your RTL logic here...
      return false;
    };
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
    };
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
    };
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
    function generateUniqueFileName(originalFileName: string): string {
      const timestamp = moment((Date as any)(Date.now())).format('yyyyMMDD_HHmmss')
      // const timestamp = Date.now();
      const fileName = originalFileName.split('.')[0];
      const fileExtension = originalFileName.split('.').pop(); // Get the file extension
      // console.log(fileName)
      // console.log(timestamp)
      // console.log(fileExtension)
      return `${fileName}_${timestamp}.${fileExtension}`;
    }
    const onSubmitSaveChanges = async () => {
      let status = true;
      let msg = "";

      if (disabledStatusSave.value == true) {
        // window.document.csh_withdrawal_request_add.submit(); 
        alert("กรุณาตรวจสอบยอดเงินให้ถูกต้อง \n วงเงินสดย่อย = ยอดขออนุมัติเบิก + เงินค้างเบิก + เงินสดคงเหลือ + เงินทดลองจ่าย ");
        return
      }

      const requestData = {
        VendorsCode: selectedCompany.value,
        RequestDate: moment((Date as any)(RequestDate.value)).format('yyyy-MM-DD'),
        UserRequest: UserRequest.value,
        TotalRequest: Sum_Total.value,
        UserNameReq: UserNameReq.value,
        ReffDocPO: ReffDocPO.value + '-' + moment(Date()).format('yyyyMMDD'),
        SumOutstn: Sum_Total.value,
        ReserveMoney: ReserveMoney.value,
        AttachFile1: '',
        IsDelete: '0',
        REQUEST_CASHD: tableData.value.map((item, index) => ({
          RequestNumber: index + 1,
          RequestDocNo: item['เลขใบเบิก'],
          Description: item['รายละเอียด'],
          Branch: '',
          BeforVat: item['ยอดก่อน VAT'],
          VAT: item['VAT'],
          Total: item['รวม'],
          WHT: item['ภาษี ณ ที่จ่าย'],
          VehicleNumber: item['ทะเบียนรถ'],
          Department: item['แผนก'],
          RefDoc: item['เลขสัญญาเช่า'],
          TypeCode: item['ประเภท']
        })),
        SumBalanceH: {
          CompanyId: CompanyId.value,
          isDelete: '0',
          SumTotal: Sum_Total_medal.value,
          VenderCode: selectedCompany.value
        },
        SumBalanceD: Medal.value.map((item, index) => ({
          IdSumBalH: '',
          IdMedal: item['IdMedal'],
          Amount: item['Amount'],
          TotalValue: item['TotalValue'],
          IsDelete: '0'
        })),
        SumBalanceO: {
          IdSumBalH: '',
          SumBalO_Name: moment((Date as any)(RequestDate.value)).format('yyyy-MM-DD'),
          SumBalO_Value: Sum_Total.value,
          isDeleted: '0'
        },
      };
      // console.log(requestData)

      const fileInput = document.getElementById('file_attach1') as HTMLInputElement;

      // Check if a file is selected
      if (fileInput.files && fileInput.files.length > 0) {
        const selectedFile = fileInput.files[0];
        // console.log(selectedFile)
        
        // Generate a unique file name (you can use a library like uuid to create a unique name)
        const uniqueFileName = generateUniqueFileName(selectedFile.name);
        // console.log(uniqueFileName)
        // Set the file name in requestData.AttachFile1
        requestData.AttachFile1 = uniqueFileName;

        const formData = new FormData();

        await resizeImage(selectedFile, 400, 400) // Specify the desired width and height
          .then(resizedBlob => {
            // Create a new File object with the resized image blob
            const resizedFile = new File([resizedBlob as Blob], uniqueFileName);

            // Append the resized image to the FormData object
            formData.append('file_attach1', resizedFile);
          })
          .catch(error => {
            console.error('Error resizing image:', error);
            status = false;
            msg = 'Error resizing image: ' + error;
            return false;
          });

        // formData.append('file_attach1', fileInput.files[0]);

        try {
          
          await axios.post(`http://localhost:3100/api/upload_image?uniqueFileName=${uniqueFileName}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        } catch (error) {
          console.error('Error uploading file:', error);
          status = false;
          msg = 'Error uploading file: ' + error;
          return false
        }
      }
      try {        
        let UserAdmin_Id; // Define userRuleId here
        // Insert into UserRules table
        await axios.post("http://localhost:3100/api/create_withdrawal_request", requestData)
          .then(response => {
            const responseData = response.data; 
          })
          .catch(error => {
            axios.delete(`http://localhost:3100/api/del_image/${requestData.AttachFile1}`);
            console.error("An error occurred:", error);
            status = false
            msg = "An error occurred:" + error
          });
        if (status == true) {
          Swal.fire({
            title: 'บันทึกข้อมูลสำเร็จแล้ว',
            html: 'ข้อมูลจะถูกประมวลผล  เวลา  23:00 น. ของทุกวัน',
            // text: "Data inserted successfully!",
            icon: "success",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            heightAuto: false,
            customClass: { confirmButton: "btn fw-semobold btn-light-primary" },
          }).then(() => {            
            router.replace('/csh_withdrawal_request_sea/index')
          });
        } else {
          Swal.fire({
            text: "Error inserting data:" + msg,
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
//     function checkFileImages(FileID: string, FormatName: string): boolean {
      
//       const getFileName: string = (document.getElementById(FileID) as HTMLInputElement).value;
//       const fileUpload: HTMLInputElement | null = document.getElementById(FileID) as HTMLInputElement;

//       if (!fileUpload) {
//         alert("File input element not found.");
//         return false;
//       }

//       if (fileUpload?.files?.length && fileUpload.files.length > 0) {
//         const reader = new FileReader();

//         reader.onload = async (e: Event) => {
//           const image = new Image();
//           image.src = (e.target as FileReader).result as string;

//           image.onload = async () => {
//             const maxHeight = 500;
//             const maxWidth = 500;

//             let newWidth = image.width;
//             let newHeight = image.height;

//             // Check if the image dimensions exceed the specified max dimensions
//             if (newWidth > maxWidth || newHeight > maxHeight) {
//               // Calculate new dimensions while maintaining the aspect ratio
//               if (newWidth > newHeight) {
//                 newHeight = (maxWidth / newWidth) * newHeight;
//                 newWidth = maxWidth;
//               } else {
//                 newWidth = (maxHeight / newHeight) * newWidth;
//                 newHeight = maxHeight;
//               }

//               // Create a canvas element to draw the resized image
              
//               const canvas = document.createElement("canvas");
//               canvas.width = newWidth;
//               canvas.height = newHeight;
//               console.log(canvas)
//               const ctx = canvas.getContext("2d");

//               if (!ctx) {
//                 alert("Canvas context not supported.");
//                 return false;
//               }

//               ctx.drawImage(image, 0, 0, newWidth, newHeight);

//               // Convert the canvas content back to a data URL
//               const resizedImageDataUrl = canvas.toDataURL("image/jpeg"); // You can specify the desired format
              
//               // Set the new data URL as the source for the original image element
//               const originalImage = document.getElementById("file_attach1") as HTMLImageElement;
//               console.log(resizedImageDataUrl)
//               console.log(originalImage)
//               originalImage.src = resizedImageDataUrl;
//             }
//           };
//         };

//         reader.readAsDataURL(fileUpload.files[0]);
//       } else {
//         alert("No file selected.");
//         return false;
//       }

//   // Allowing file types with the specified format.
//   const allowedExtensions: RegExp = /(\.jpg|\.png)$/i;

//   if (!allowedExtensions.exec(getFileName)) {
//     alert("!! ต้องเป็นไฟล์รูป .jpg หรือ .png เท่านั้น");
//     (document.getElementById(FileID) as HTMLInputElement).value = "";
//     return false;
//   }

//   return true;
// }
   // Function to resize an image
    // Function to resize an image
    const resizeImage = (file, maxWidth, maxHeight) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function (event) {
          if (event.target) { // Add this null check
            const img = new Image();
            img.src = event.target.result as string;
            img.onload = () => {
              const canvas = document.createElement('canvas');
              let width = img.width;
              let height = img.height;

              // Calculate the new dimensions while maintaining the aspect ratio
              if (width > height) {
                if (width > maxWidth) {
                  height *= maxWidth / width;
                  width = maxWidth;
                }
              } else {
                if (height > maxHeight) {
                  width *= maxHeight / height;
                  height = maxHeight;
                }
              }

              canvas.width = width;
              canvas.height = height;

              const ctx = canvas.getContext('2d');
              if (ctx) { // Add this null check
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob(
                  (blob) => {
                    resolve(blob);
                  },
                  file.type || 'image/jpeg',
                  0.7 // JPEG quality (adjust as needed)
                );
              } else {
                reject(new Error('Canvas context (ctx) is null.'));
              }
            };
            img.onerror = (error) => {
              reject(error);
            };
          } else {
            reject(new Error('Event target is null.'));
          }
        };
        reader.readAsDataURL(file);
      });
    };

    return {
      // RequestDatePic,
      disabledStatusSave,
      submitButton,
      Sum_Total_medal,
      targetData,
      formattedRequestDate,
      // loading,
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
      UserNameReq,UserRequest,
      RequestDate,
      DISTID_DEP,
      Department_1,
      handleCompanyChange,
      APRDC,
      TypeCode_1,
      handleDepartment_1Change,
      inputRows,
      checkVender,
      forMatNumber_input,
      sumValue,
      tableData,
      addTableRow,
      removeLastTableRow,
      Budget,
      forMatNumber_show,
      Footer, Medal,
      sumValue_Medal,
      allowNumbersOnly,
      Sum_BeforVat, Sum_VAT, Sum_WHT, Sum_Total,
      ReserveMoney,
      RecheckMoney,
      onSubmitSaveChanges,
      ReffDocPO,CompanyId,
      forMatNumber_inputValue,
      formatNumberField,
      formatReserveMoney,formattedReserveMoney,
      // checkFileImages,
      file_attach1
    };

  },


});

</script>
<style>
.text-align-right{
  text-align: right;
}
</style>
