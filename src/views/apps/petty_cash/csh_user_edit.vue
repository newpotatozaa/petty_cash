<template>
    <div class="card mb-5 mb-xl-10">
        <div class="card-header border-0"
            data-bs-target="#kt_account_profile" aria-expanded="true" aria-controls="kt_account_profile">
            <div class="card-title m-0">
                <h3 class="fw-medium m-0">แก้ไขผู้ใช้งาน</h3>
            </div>
        </div>
        <div id="kt_account_profile">
            <VForm id="kt_account_profile_form" class="form" novalidate @submit="onSubmitSaveChanges"
                :validation-schema="userDetail">
                <div class="card-body border-top p-9">
                    <div class="row mb-6" v-if="menuData.length > 0">
                        <label class="col-lg-4 col-form-label required fw-semobold fs-6">ผู้ใช้งาน</label>
                        <div class="col-lg-8 fv-row">
                            <Field type="text" name="UserAdmin_Name" class="form-control form-control-lg form-control-solid" placeholder=""
                                v-model="menuData[0].UserAdmin_Name" />
                            <div class="fv-plugins-message-container">
                                <div class="fv-help-block">
                                    <ErrorMessage name="UserAdmin_Name" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-6" v-if="menuData.length > 0">
                        <label class="col-lg-4 col-form-label required fw-semobold fs-6">ชื่อผู้ใช้งาน</label>
                        <div class="col-lg-8 fv-row">
                            <Field type="text" name="UserAdmin_FullName" class="form-control form-control-lg form-control-solid" placeholder=""
                                v-model="menuData[0].UserAdmin_FullName"/>
                            <div class="fv-plugins-message-container">
                                <div class="fv-help-block">
                                    <ErrorMessage name="UserAdmin_FullName" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-6">
                        <label class="col-lg-4 col-form-label required fw-semobold fs-6">บริษัท</label>
                        <div class="col-lg-4 fv-row">                           
                        <Field type="hidden" name="prefixVender" class="form-control form-control-lg form-control-solid mb-3 mb-lg-0" v-model="prefixVender['value']" />
                        <Multiselect v-model="prefixVender['value']" v-bind="prefixVender" class="form-control form-control-solid">
                        </Multiselect>
                        <!-- <p v-if="prefixVender['value'] !== ''">You selected: {{ prefixVender['value'] }}</p> -->
                        <div class="fv-plugins-message-container">
                            <div class="fv-help-block">
                            <ErrorMessage name="prefixVender" />
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="row mb-6">
                        <label class="col-lg-4 col-form-label required fw-semobold fs-6">สิทธิ์</label>
                        <div class="col-lg-4 fv-row">
                        

                        <Field type="hidden" name="PrefixUserRules" class="form-control form-control-lg form-control-solid mb-3 mb-lg-0" v-model="prefixUserRulesTitle['value']" /> 
                        <Multiselect v-model="prefixUserRulesTitle['value']" v-bind="prefixUserRulesTitle" class="form-control form-control-solid">
                        </Multiselect>
                        <!-- <p v-if="prefixUserRulesTitle['value'] !== ''">You selected: {{ prefixUserRulesTitle['value'] }}</p> -->
                        <div class="fv-plugins-message-container">
                            <div class="fv-help-block">
                            <ErrorMessage name="PrefixUserRules" />
                            </div>
                        </div>
                        </div>
                    </div>
                    
                    
                </div>
                <div class="card-footer d-flex justify-content-between py-6 px-9">   
                    <div>
                        <router-link :to="'/csh_user_sea/index'">
                        <button class="btn btn-danger btn-active-light-second me-2">
                            Back
                        </button>
                        </router-link>   
                    </div>     
                    <div>
                        
                        <button type="reset" class="btn btn-secondary btn-active-light-second me-2">
                        Discard
                    </button>                        
                        <button
                            type="submit"
                            id="kt_account_profile_details_submit"
                            ref="submitButton"
                            class="btn btn-success"
                        >
                            <span class="indicator-label"> Save </span>
                            <span class="indicator-progress">
                            Please wait...
                            <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                            </span>
                        </button>
                    </div>          
                    
                </div>
            </VForm>
        </div>
    </div>
</template>
<script lang="ts">
import ApiService from "@/core/services/ApiService";
import { getAssetPath, } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { Tooltip } from 'bootstrap';
import { accountStore} from "@/stores/account";
import Multiselect from "@vueform/multiselect";
import { useRoute } from 'vue-router';
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import axios from 'axios';
// import { ModelSelect } from "vue-search-select";
// import "vue-search-select/dist/VueSearchSelect.css"
// interface UserRule {
//   UserRule_Id: number;
//   UserRule_Name: string;
//   UserRule_Delete: number;
// }
export default defineComponent({
    name: "user-account-profile",
    components: {
        ErrorMessage,        
        Field,
        VForm,
        Multiselect,        
    },
    
    
    methods: {  
        
    },
    setup() {
        const route = useRoute();
        const store = accountStore();
        const nameTitle = ref({});
        // const myPrefix= ref({});
        // const prefixUserRules= ref({});
        const prefixUserRulesTitle = ref({});
        const prefixVender = ref({});
        const submitButton = ref<HTMLElement | null>(null);
        const menuData = ref([] as {
            // ... Data structure ...
            UserAdmin_Id: number,
            UserAdmin_Name: string,
            UserAdmin_Delete: number,
            UserRule_Id: number,
            UserAdmin_FullName: string,
            UserAdmin_Companyid: string,
            UserAdmin_VenderCode: string,
            Vender_Name: string
        }[]);

        const userDetail = Yup.object().shape({
            UserAdmin_Name: Yup.string().required().label("ผู้ใช้งาน"),
            UserAdmin_FullName: Yup.string().required().label("ชื่อผู้ใช้งาน"),
            prefixVender: Yup.string().required().label("บริษัท"),
            PrefixUserRules: Yup.string().required().label("สิทธิ์"),
        });

        const onSubmitSaveChanges = async (values: any, actions: any) => {
            let status = true;
        let msg = "";
        const router = useRoute();
        const userId = route.params.id;
        // const router = useRoute();
        // ... Your existing form submission logic ...
             
        // Prepare data for insertion
        const requestData = {
            UserAdmin_Name: values.UserAdmin_Name,
            UserAdmin_Delete: "0",
            UserRule_Id: values.PrefixUserRules,
            UserAdmin_FullName: values.UserAdmin_FullName,
            UserAdmin_Companyid: values.prefixVender.split('%')[0],
            UserAdmin_VenderCode: values.prefixVender.split('%')[1]
        };
        
        try {
            let UserAdmin_Id; // Define userRuleId here
            // Insert into UserRules table
            await axios.put(`http://localhost:3100/api/updateUserAdmin/${userId}`, requestData)
            .then(response => {
                msg = response.data.message
            })
            .catch(error => {
                console.error("An error occurred:", error);
                status = false
                msg = "An error occurred:"+ error
            });
            
            if (status = true)
                {
                    Swal.fire({
                        text: msg,
                        icon: "success",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        heightAuto: false,
                        customClass: { confirmButton: "btn fw-semobold btn-light-primary" },
                        }).then(async () => {
                            // alert(0)
                            await loadData(userId)
                    });
                } else {
                    Swal.fire({
                        text: "Error inserting data:"+ msg,
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Try again!",
                        heightAuto: false,
                        customClass: {confirmButton: "btn fw-semobold btn-light-danger"},
                    });
                }
        } catch (error) {
            console.error("Error inserting data:", error);            
        }

        
            // alert(0)
        
        };
        const loadData = async (userId) => {
            try {
                try {
                    // console.log(userId)
                const response = await axios.get(`http://localhost:3100/api/getUserAdminById/${userId}`);
                menuData.value = response.data;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        onMounted(async () => {
            const route = useRoute();
            await loadData(route.params.id);
            
            // console.log(route.params.id)
            const response_vender_list = await axios.get('http://localhost:3100/api/getPrefixVender');  
            // console.log(response_vender_list)          
            const userRoles_vender_list = response_vender_list.data;
            const options_vender_list = userRoles_vender_list.map(role => ({
                value: role.CompanyId.trim()+"%"+role.VenderCode.trim() ,
                label: role.VenderName
            }));
            // console.log(menuData.value[0].UserAdmin_Companyid.trim()+"%"+menuData.value[0].UserAdmin_VenderCode.trim())
            prefixVender.value = {
                value: menuData.value[0].UserAdmin_Companyid.trim()+"%"+menuData.value[0].UserAdmin_VenderCode.trim(),
                options: options_vender_list,
                searchable: true,
                placeholder: "เลือกบริษัท",
            };


            const response = await axios.get('http://localhost:3100/api/getPrefixUserRules');

            // Access the array of user roles from the response data
            const userRoles = response.data["prefix"];

            // Create an array of options for the dropdown/select
            const options = userRoles.map(role => ({
                value: role.value,
                label: role.label
            }));
            // console.log(menuData)
            
            prefixUserRulesTitle.value = {
                value: menuData.value[0].UserRule_Id,//menuData[2].UserRule_Id ,
                options: options,
                searchable: true,
                placeholder: "เลือกสิทธิ์",
            };


               
            
        });
        const toggleSubMenuActive = (subMenu) => {
            subMenu.Active = !subMenu.Active;
        };
        return {
            getAssetPath,
            onSubmitSaveChanges,
            submitButton,
            userDetail,
            prefixVender,
            nameTitle,
            // prefixUserRules,
            prefixUserRulesTitle,
            // Tooltip,
            toggleSubMenuActive,
            menuData
            // selectedRule: '',
            
            // userRules: [] as UserRule[],
        };
    },
});
</script>