<template>
    <div class="card mb-5 mb-xl-10">
        <div class="card-header border-0" data-bs-target="#kt_account_profile" aria-expanded="true"
            aria-controls="kt_account_profile">
            <div class="card-title m-0">
                <h3 class="fw-medium m-0">เพิ่มตั้งค่าสิทธิ์</h3>
            </div>
        </div>
        <div id="kt_account_profile">
            <VForm id="kt_account_profile_form" class="form" novalidate @submit="onSubmitSaveChanges"
                :validation-schema="userDetail">
                <div class="card-body border-top p-9">
                    <div class="row mb-6">
                        <label class="col-lg-4 col-form-label required fw-semobold fs-6">สิทธิ์</label>
                        <div class="col-lg-8 fv-row">
                            <Field type="text" name="UserRule_Name" class="form-control form-control-lg form-control-solid"
                                placeholder="" />
                            <div class="fv-plugins-message-container">
                                <div class="fv-help-block">
                                    <ErrorMessage name="UserRule_Name" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-for="mainMenu in menuData" :key="mainMenu.MainMenu_Id" class="row mb-6">
                        <label class="col-lg-4 col-form-label fw-semobold fs-6">
                            {{ mainMenu.MainMenu_Name }}
                        </label>
                        <div class="col-lg-8 fv-row">
                            <div v-for="subMenu in mainMenu.SubMenu" :key="subMenu.SubMenu_Id"
                                class="form-check form-check-solid mt-2">
                                <input type="checkbox" :name="'status_' + subMenu.SubMenu_Id" class="form-check-input"
                                    :checked="subMenu.Active" @change="toggleSubMenuActive(subMenu)" />
                                <label class="col-lg-4 col-form-label fw-semobold fs-6">
                                    {{ subMenu.SubMenu_Name }}
                                </label>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="row mb-6">
                        <label class="col-lg-4 col-form-label fw-semobold fs-6">เมนูเงินสดย่อย</label>
                        <div class="col-lg-8 fv-row">
                            <div class="form-check form-check-solid mt-2">
                                <Field type="checkbox" name="status" class="form-check-input" placeholder="Status"/>
                                <label class="col-lg-4 col-form-label fw-semobold fs-6">รายการขอเบิก</label> 
                            </div>
                            
                        </div>
                    </div>
                    <div class="row mb-6">
                        <label class="col-lg-4 col-form-label fw-semobold fs-6">สิทธิ์ผู้ใช้งาน</label>
                        <div class="col-lg-8 fv-row">
                            <div class="form-check form-check-solid mt-2">
                                <Field type="checkbox" name="status" class="form-check-input" placeholder="Status"/>
                                <label class="col-lg-4 col-form-label fw-semobold fs-6">ตั้งค่าสิทธิ์</label> 
                            </div>
                            <div class="form-check form-check-solid mt-2">
                                <Field type="checkbox" name="status" class="form-check-input" placeholder="Status"/>
                                <label class="col-lg-4 col-form-label fw-semobold fs-6">ผู้ใช้งาน</label> 
                            </div>
                        </div>
                    </div> -->


                </div>
                <div class="card-footer d-flex justify-content-between py-6 px-9">
                    <div>
                        <router-link :to="'/csh_rule_sea'">
                            <button class="btn btn-danger btn-active-light-second me-2">
                                Back
                            </button>
                        </router-link>
                    </div>
                    <div>
                        <button type="reset" class="btn btn-secondary btn-active-light-second me-2">
                            Discard
                        </button>
                        <button type="submit" id="kt_account_profile_details_submit" ref="submitButton"
                            class="btn btn-success">
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
import { accountStore } from "@/stores/account";
import Multiselect from "@vueform/multiselect";
import { useRoute } from 'vue-router';
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import axios from 'axios';
import router from "@/router";

export default defineComponent({
    name: "user-account-profile",
    components: {
        ErrorMessage,
        Field,
        VForm,
        Multiselect,
    },
    data() {
        return {
            menuData: [] as { // Provide type annotation for menuData
                MainMenu_Id: number,
                MainMenu_Name: string,
                SubMenu: {
                    SubMenu_Id: number,
                    SubMenu_Name: string,
                    Active: boolean
                }[]
            }[],
        };
    },
    async mounted() {
        await axios.get('http://localhost:3100/api/getProfileApp_By_IdApi').then(async (response1) => {
            const responseData1 = response1.data[0];
            let UserRule_Id = responseData1.UserRule_Id
            const mainMenuIdToCheck = '2';
            const subMenuIdToCheck = '7';
            const activeValueToCheck = true;

            await axios.get(`http://localhost:3100/api/ListMenuById/${UserRule_Id}`).then(async (response2) => {
                // console.log(response2)
                const userMenus = response2.data[0].MainMenu;
                // console.log(userMenus);
                const matchingMenu = userMenus.find((mainMenu) => mainMenu.MainMenu_Id === mainMenuIdToCheck);
                // console.log(matchingMenu);
                if (matchingMenu) {
                    const matchingSubMenu = matchingMenu.SubMenu.find((subMenu) => subMenu.SubMenu_Id === subMenuIdToCheck);
                    if (matchingSubMenu && matchingSubMenu.Active === activeValueToCheck) {
                        // console.log("เจอ");
                        try {
                            const response1 = await axios.get('http://localhost:3100/api/ListMenu');
                            this.menuData = response1.data;
                            console.log(this.menuData)
                        } catch (error) {
                            console.error('Error fetching data:', error);
                        }
                    } else {
                        // console.log("ไม่เจอ");
                        router.push('/notPermission');
                    }
                }
            })
        }).catch((e) => {
            console.log(e)
        })
        // await axios.get('http://localhost:3100/api/getProfileApp_By_IdApi').then((response) => {
        //     const responseData = response.data[0];
        //     if (responseData.UserRule_Id != 1) {
        //         router.replace('/notPermission');
        //     } else {

        //     }
        // }).catch((e) => {
        //     console.log(e)
        // })
    },
    methods: {
        async onSubmitSaveChanges(values: any, actions: any) {
            let status = true;
            let msg = "";
            const router = useRoute();
            // const router = useRoute();
            // ... Your existing form submission logic ...

            // Prepare data for insertion
            const requestData = {
                UserRule_Name: values.UserRule_Name,
                UserRule_Delete: "0",
            };

            try {
                let userRuleId; // Define userRuleId here
                // Insert into UserRules table
                await axios.post("http://localhost:3100/api/createUserRules", requestData)
                    .then(response => {
                        const responseData = response.data; // Extract the data from the response
                        userRuleId = responseData.userRule.UserRule_Id; // Extract the UserRule_Id
                        // console.log(userRuleId); // This will output the UserRule_Id

                    })
                    .catch(error => {
                        console.error("An error occurred:", error);
                        status = false
                        msg = "An error occurred:" + error
                    });

                const requests: Promise<void>[] = [];

                for (const mainMenu of this.menuData) {
                    for (const subMenu of mainMenu.SubMenu) {
                        if (subMenu.Active == true) {
                            const userRuleDetailRequestData = {
                                UserRule_Id: userRuleId,
                                MainMenu_Id: mainMenu.MainMenu_Id.toString(),
                                SubMenu_Id: subMenu.SubMenu_Id.toString(),
                                UserRuleDetail_Delete: "0"
                            };
                            // console.log("userRuleDetailRequestData")
                            // console.log(userRuleDetailRequestData)
                            const requestPromise = axios.post("http://localhost:3100/api/createUserRulesDetail", userRuleDetailRequestData)
                                .then(() => { }) // Resolving with an empty function
                                .catch(error => {
                                    console.error("An error occurred:", error);
                                    status = false;
                                    msg = "An error occurred: " + error;
                                });
                            requests.push(requestPromise);
                        }
                    }
                }
                await Promise.all(requests);
                // const userRuleResponse = await axios.post(
                // "http://localhost:3100/api/createUserRules",
                // requestData
                // );
                // console.log(userRuleResponse)
                // Insert into UserRulesDetail table for each submenu

                // const userRuleId = userRuleResponse.userRule.UserRule_Id;



                if (status = true) {
                    Swal.fire({
                        text: "Data inserted successfully!",
                        icon: "success",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        heightAuto: false,
                        customClass: { confirmButton: "btn fw-semobold btn-light-primary" },
                    }).then(() => {
                        // Redirect to the desired URL after the user presses the confirm button
                        // actions.resetForm();
                        // const router = useRoute(); // Get the router instance
                        this.$router.push('/csh_rule_sea/index');
                        // setTimeout(() => {

                        // }, 2000);

                        // window.location.href = "/csh_rule_sea";
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


                // Reset the form

            } catch (error) {
                console.error("Error inserting data:", error);
                // ... Handle error and show appropriate message ...
                // .catch(( err ) => {

                //     });
            }
        },
    },
    setup() {
        const route = useRoute();
        const store = accountStore();
        const nameTitle = ref({});
        const myPrefix = ref({});
        const submitButton = ref<HTMLElement | null>(null);

        const userDetail = Yup.object().shape({
            UserRule_Name: Yup.string().required().label("UserRule_Name"),
            // lastnameTh: Yup.string().required().label("Last name"),
            // prefix: Yup.string().required().label("Name Tile"),
        });
        onMounted(async () => {
            // myPrefix.value = await store.getAccountPrefix();
            // new Tooltip(document.body, {
            //     selector: "[data-bs-toggle='tooltip']",
            // })
            // nameTitle.value = {
            //     options: myPrefix.value["prefix"],
            //     searchable: true,
            //     placeholder: "เลือกคำนำหน้า",
            // };
        });
        const toggleSubMenuActive = (subMenu) => {
            subMenu.Active = !subMenu.Active;
        };
        // const onSubmitSaveChanges = async (values:any, actions:any) => {
        //     values = values;
        //     if (submitButton.value) {
        //         submitButton.value.setAttribute("data-kt-indicator", "on");
        //         setTimeout(() => {
        //             submitButton.value?.removeAttribute("data-kt-indicator");
        //         }, 2000);
        //     }
        //     ApiService.setURL();
        //     ApiService.post("accounts/create", values)
        //     .then((response) => {
        //         actions.resetForm();
        //         Swal.fire({
        //             text: response.data.message,
        //             icon: "success",
        //             buttonsStyling: false,
        //             confirmButtonText: "Ok, got it!",
        //             heightAuto: false,
        //             customClass: {confirmButton: "btn fw-semobold btn-light-primary"},
        //             });
        //     })
        //     .catch(( err ) => {
        //         Swal.fire({
        //             text: err.response.data.message,
        //             icon: "error",
        //             buttonsStyling: false,
        //             confirmButtonText: "Try again!",
        //             heightAuto: false,
        //             customClass: {confirmButton: "btn fw-semobold btn-light-danger"},
        //             });
        //     });
        // };
        return {
            getAssetPath,
            // onSubmitSaveChanges,
            submitButton,
            userDetail,
            myPrefix,
            nameTitle,
            Tooltip,
            toggleSubMenuActive,
        };
    },
});
</script>