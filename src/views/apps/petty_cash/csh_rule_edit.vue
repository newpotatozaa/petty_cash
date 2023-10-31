<template>
    <div class="card mb-5 mb-xl-10">
        <div class="card-header border-0" data-bs-target="#kt_account_profile" aria-expanded="true"
            aria-controls="kt_account_profile">
            <div class="card-title m-0">
                <h3 class="fw-medium m-0">แก้ไขตั้งค่าสิทธิ์</h3>
            </div>
        </div>
        <div id="kt_account_profile">
            <VForm id="kt_account_profile_form" class="form" novalidate @submit="onSubmitSaveChanges"
                :validation-schema="userDetail">
                <div class="card-body border-top p-9">
                    <div class="row mb-6" v-if="menuData.length > 0">
                        <label class="col-lg-4 col-form-label required fw-semobold fs-6">สิทธิ์</label>
                        <div class="col-lg-8 fv-row">
                            <Field type="text" name="UserRule_Name" class="form-control form-control-lg form-control-solid"
                                placeholder="" v-model="menuData[0].UserRule_Name" />
                            <div class="fv-plugins-message-container">
                                <div class="fv-help-block">
                                    <ErrorMessage name="UserRule_Name" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-for="mainMenuData in menuData" :key="mainMenuData.UserRule_Name">
                        <div v-for="mainMenu in mainMenuData.MainMenu" :key="mainMenu.MainMenu_Id" class="row mb-6">
                            <label class="col-lg-4 col-form-label fw-semobold fs-6">{{ mainMenu.MainMenu_Name }}</label>
                            <div class="col-lg-8 fv-row">
                                <div v-for="subMenu in mainMenu.SubMenu" :key="subMenu.SubMenu_Id"
                                    class="form-check form-check-solid mt-2">
                                    <input type="checkbox" :name="'status_' + subMenu.SubMenu_Id" class="form-check-input"
                                        :checked="subMenu.Active" @change="toggleSubMenuActive(subMenu)" />
                                    <!-- <Field
                                    type="checkbox"
                                    :name="'status_' + subMenu.SubMenu_Id"
                                    class="form-check-input"
                                    :checked="subMenu.Active"
                                    /> -->
                                    <label class="col-lg-4 col-form-label fw-semobold fs-6">{{ subMenu.SubMenu_Name
                                    }}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- <div v-for="mainMenu in menuData" :key="mainMenu.MainMenu['MainMenu_Id']" class="row mb-6">
                        <label class="col-lg-4 col-form-label fw-semobold fs-6">
                            {{ mainMenu.MainMenu['MainMenu_Name'] }}
                        </label>
                        <div class="col-lg-8 fv-row">
                            <div v-for="subMenu in mainMenu.MainMenu['SubMenu']" :key="subMenu.SubMenu_Id" class="form-check form-check-solid mt-2">
                                <Field
                                    type="checkbox"
                                    :name="'status_' + subMenu.SubMenu_Id"
                                    class="form-check-input"                                    
                                    placeholder="Status"   
                                    v-model="subMenu.Active"
                                />
                                <label class="col-lg-4 col-form-label fw-semobold fs-6">
                                    {{ subMenu.SubMenu_Name }}
                                </label>
                            </div>
                        </div>
                    </div> -->
                </div>
                <div class="card-footer d-flex justify-content-end py-6 px-9">
                    <router-link :to="'/csh_rule_sea/index'">
                        <button type="reset" class="btn btn-light btn-active-light-second me-2">
                            Discard
                        </button>
                    </router-link>
                    <button type="submit" id="kt_account_profile_details_submit" ref="submitButton" class="btn btn-success">
                        <span class="indicator-label"> Save </span>
                        <span class="indicator-progress">
                            Please wait...
                            <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                        </span>
                    </button>

                    <!-- <button type="submit" id="kt_account_profile_details_submit" ref="submitButton" class="btn btn-success">
                        <span class="indicator-label"> Save </span>
                        <span class="indicator-progress">
                            Please wait... <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                        </span>
                    </button> -->
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
                UserRule_Name: string,
                MainMenu: {
                    MainMenu_Id: number,
                    MainMenu_Name: string,
                    SubMenu: {
                        SubMenu_Id: number,
                        SubMenu_Name: string,
                        Active: boolean
                    }[]
                }[],
            }[],
            // checkboxValues: {},
            // console.log(checkboxValues)
        };
    },
    async mounted() {
        await axios.get('http://localhost:3100/api/getProfileApp_By_IdApi').then(async (response1) => {
            const responseData1 = response1.data[0];
            let UserRule_Id = responseData1.UserRule_Id
            const mainMenuIdToCheck = '2';
            const subMenuIdToCheck = '7';
            const activeValueToCheck = true;

            await axios.get(`http://localhost:3100/api/ListMenuById/${UserRule_Id}`).then((response2) => {
                // console.log(response2)
                const userMenus = response2.data[0].MainMenu;
                // console.log(userMenus);
                const matchingMenu = userMenus.find((mainMenu) => mainMenu.MainMenu_Id === mainMenuIdToCheck);
                // console.log(matchingMenu);
                if (matchingMenu) {
                    const matchingSubMenu = matchingMenu.SubMenu.find((subMenu) => subMenu.SubMenu_Id === subMenuIdToCheck);
                    if (matchingSubMenu && matchingSubMenu.Active === activeValueToCheck) {                        
                        // console.log("เจอ");
                        this.loadData(this.$route.params.id)
                    } else {
                        // console.log("ไม่เจอ");
                        router.push('/notPermission');
                    }
                }
            })

            // const responseData = response.data[0];
            // if (responseData.UserRule_Id != 1) {
            //     
            // } else {
            //     console.log(111)
            //     // const route = useRoute();
            //     this.loadData(this.$route.params.id)
            // }
        }).catch((e) => {
            console.log(e)
        })
    },
    methods: {
        async loadData(userId) {
            //   console.log("loadData()")
            this.menuData = []
            // const route = useRoute();
            try {
                // console.log(userId)
                const response = await axios.get(`http://localhost:3100/api/ListMenuById/${userId}`);

                this.menuData = response.data;
                // const id = route.params.id
                // console.log(this.menuData)


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        async onSubmitSaveChanges(values: any, actions: any) {
            let status = true;
            let msg = "";
            const router = useRoute();
            const userId = this.$route.params.id;
            // const router = useRoute();
            // ... Your existing form submission logic ...

            // Prepare data for insertion
            const requestData = {
                UserRule_Name: values.UserRule_Name,
                UserRule_Delete: "0",
            };

            try {
                // let userRuleId; // Define userRuleId here
                // Insert into UserRules table
                await axios.put(`http://localhost:3100/api/updateUserRules/${userId}`, requestData)
                    .then(response => {
                        msg = response.data.message
                    })
                    .catch(error => {
                        console.error("An error occurred:", error);
                        status = false
                        msg = "An error occurred:" + error
                    });

                const requests: Promise<void>[] = [];

                for (const mainMenu of this.menuData) {
                    for (const MainMenu of mainMenu.MainMenu) {
                        for (const subMenu of MainMenu.SubMenu) {
                            const userRuleDetailRequestData = {
                                UserRule_Id: userId,
                                MainMenu_Id: MainMenu.MainMenu_Id.toString(),
                                SubMenu_Id: subMenu.SubMenu_Id.toString(),
                                UserRuleDetail_Delete: "0"
                            };
                            console.log(userRuleDetailRequestData)
                            const requestPromise = axios.delete(`http://localhost:3100/api/delUserRulesDetail/${userId}
                                                                                        /${MainMenu.MainMenu_Id.toString()}
                                                                                        /${subMenu.SubMenu_Id.toString()}`)
                                .then(() => { }) // Resolving with an empty function
                                .catch(error => {
                                    console.error("An error occurred:", error);
                                    status = false;
                                    msg = "An error occurred: " + error;
                                });
                            // let requestPromise
                            requests.push(requestPromise)

                            if (subMenu.Active == true) {
                                requests.push(
                                    axios.post("http://localhost:3100/api/createUserRulesDetail", userRuleDetailRequestData)
                                        .then(() => { }) // Resolving with an empty function
                                        .catch(error => {
                                            console.error("An error occurred:", error);
                                            status = false;
                                            msg = "An error occurred: " + error;
                                        })
                                )
                            }
                        }
                    }
                }
                await Promise.all(requests);

                if (status = true) {
                    Swal.fire({
                        text: msg,
                        icon: "success",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        heightAuto: false,
                        customClass: { confirmButton: "btn fw-semobold btn-light-primary" },
                    }).then(async () => {
                        await this.loadData(userId)
                        // this.$router.push(`/csh_rule_edit/${userId}`);
                        // Redirect to the desired URL after the user presses the confirm button
                        // actions.resetForm();
                        // const router = useRoute(); // Get the router instance
                        // this.$forceUpdate();
                        //window.location.reload();
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

        const toggleSubMenuActive = (subMenu) => {
            subMenu.Active = !subMenu.Active;
        };

        const userDetail = Yup.object().shape({
            UserRule_Name: Yup.string().required().label("UserRule_Name"),
            // lastnameTh: Yup.string().required().label("Last name"),
            // prefix: Yup.string().required().label("Name Tile"),
        });
        // onMounted(async () => {
        //     myPrefix.value = await store.getAccountPrefix();
        //     new Tooltip(document.body, {
        //         selector: "[data-bs-toggle='tooltip']",
        //     })
        //     nameTitle.value = {
        //         options: myPrefix.value["prefix"],
        //         searchable: true,
        //         placeholder: "เลือกคำนำหน้า",
        //     };
        // });
        return {
            toggleSubMenuActive,
            getAssetPath,
            // onSubmitSaveChanges,
            submitButton,
            userDetail,
            myPrefix,
            nameTitle,
            Tooltip,
        };
    },
});
</script>