<template>
    <div class="card mb-5 mb-xl-10">
        <div class="card-header border-0"
            data-bs-target="#kt_account_profile" aria-expanded="true" aria-controls="kt_account_profile">
            <div class="card-title m-0">
                <h3 class="fw-medium m-0">New User</h3>
            </div>
        </div>
        <div id="kt_account_profile">
            <VForm id="kt_account_profile_form" class="form" novalidate @submit="onSubmitSaveChanges"
                :validation-schema="userDetail">
                <div class="card-body border-top p-9">
                    <div class="row mb-6">
                        <label class="col-lg-4 col-form-label required fw-semobold fs-6">คำนำหน้า</label>
                        <div class="col-lg-4 fv-row">
                        <Field type="hidden" name="prefix" class="form-control form-control-lg form-control-solid mb-3 mb-lg-0" v-model="nameTitle['value']" />
                        <Multiselect v-model="nameTitle['value']" v-bind="nameTitle" class="form-control form-control-solid">
                        </Multiselect>
                        <div class="fv-plugins-message-container">
                            <div class="fv-help-block">
                            <ErrorMessage name="prefix" />
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="row mb-1">
                        <label class="col-lg-4 col-form-label required fw-medium fs-6">ชื่อ-นามสกุล</label>
                        <div class="col-lg-8">
                            <div class="row">
                                <div class="col-lg-6 fv-row">
                                    <Field type="text" name="firstnameTh" class="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="First name" v-model="myProfile['firstnameTh']"/>
                                    <div class="fv-plugins-message-container">
                                        <div class="fv-help-block">
                                            <ErrorMessage name="firstnameTh" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 fv-row">
                                    <Field type="text" name="lastnameTh"
                                        class="form-control form-control-lg form-control-solid" placeholder="Last name"  v-model="myProfile['lastnameTh']"/>
                                    <div class="fv-plugins-message-container">
                                        <div class="fv-help-block">
                                            <ErrorMessage name="lastnameTh" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-end mb-6">
                        <label class="col-lg-4 col-form-label fw-medium fs-6">ชื่อ-นามสกุล (ภาษาอังกฤษ)</label>
                        <div class="col-lg-8">
                            <div class="row">
                                <div class="col-lg-6 fv-row">
                                    <Field type="text" name="firstnameEn" class="form-control form-control-lg form-control-solid mb-3 mb-lg-0" placeholder="First name (EN)" v-model="myProfile['firstnameEn']"/>
                                    <div class="fv-plugins-message-container">
                                        <div class="fv-help-block">
                                            <ErrorMessage name="firstnameEn" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 fv-row">
                                    <Field type="text" name="lastnameEn" class="form-control form-control-lg form-control-solid" placeholder="Last name (EN)" v-model="myProfile['lastnameEn']"/>
                                    <div class="fv-plugins-message-container">
                                        <div class="fv-help-block">
                                            <ErrorMessage name="lastnameEn" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-6">
                        <label class="col-lg-4 col-form-label fw-semobold fs-6">ชื่อเล่น</label>
                        <div class="col-lg-8 fv-row">
                            <Field type="text" name="nickname" class="form-control form-control-lg form-control-solid" placeholder="Nick name" v-model="myProfile['nickname']"/>
                            <div class="fv-plugins-message-container">
                                <div class="fv-help-block">
                                    <ErrorMessage name="nickname" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-6">
                        <label class="col-lg-4 col-form-label fw-semobold fs-6">เบอร์ติดต่อ</label>
                        <div class="col-lg-8 fv-row">
                            <Field type="text" name="mobile" class="form-control form-control-lg form-control-solid" placeholder="Mobile Number" v-model="myProfile['mobile']"/>
                            <div class="fv-plugins-message-container">
                                <div class="fv-help-block">
                                    <ErrorMessage name="mobile" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-6">
                        <label class="col-lg-4 col-form-label fw-semobold fs-6">อีเมล</label>
                        <div class="col-lg-8 fv-row">
                            <Field type="text" name="email" class="form-control form-control-lg form-control-solid" placeholder="Email Address" v-model="myProfile['email']"/>
                            <div class="fv-plugins-message-container">
                                <div class="fv-help-block">
                                    <ErrorMessage name="email" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-6">
                        <label class="col-lg-4 col-form-label fw-semobold fs-6">แสดงผล</label>
                        <div class="col-lg-8 fv-row">
                            <div class="form-check form-check-solid mt-2">
                                <Field type="checkbox" name="status" class="form-check-input" placeholder="Status" id="checkbox" v-model="myProfile['IsActive']" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-end py-6 px-9">
                    <button type="reset" class="btn btn-light btn-active-light-second me-2">
                        Discard
                    </button>
                    <button type="submit" id="kt_account_profile_details_submit" ref="submitButton" class="btn btn-success">
                        <span class="indicator-label"> Save Changes </span>
                        <span class="indicator-progress">
                            Please wait... <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                        </span>
                    </button>
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


export default defineComponent({
    name: "user-account-profile",
    components: {
        ErrorMessage,
        Field,
        VForm,
        Multiselect,
    },
    setup() {
        const route = useRoute();
        const store = accountStore();
        const status = ref();
        const nameTitle = ref({});
        const myPrefix = ref({});
        const myProfile = ref({});
        const submitButton = ref<HTMLElement | null>(null);

        const userDetail = Yup.object().shape({
            firstnameTh: Yup.string().required().label("First name"),
            lastnameTh: Yup.string().required().label("Last name"),
            prefix: Yup.string().required().label("Name Tile"),
        });
        onMounted(async () => {
            const id = route.params.id
            myPrefix.value = await store.getAccountPrefix();
            myProfile.value = await store.getAccountDetail(id);
            new Tooltip(document.body, {
                selector: "[data-bs-toggle='tooltip']",
            })
            nameTitle.value = {
                value: myProfile.value["prefixId"]?myProfile.value["prefixId"] :"200",
                options: myPrefix.value["prefix"],
                searchable: true,
                placeholder: "เลือกคำนำหน้า",
            };
            myProfile.value["status"] = myProfile.value["IsActive"]?"checked":"";
        });
        const onSubmitSaveChanges = async (values:any) => {
            values = values;
            const id = String(route.params.id);
            if (submitButton.value) {
                submitButton.value.setAttribute("data-kt-indicator", "on");
                setTimeout(() => {
                    submitButton.value?.removeAttribute("data-kt-indicator");
                }, 2000);
            }
            ApiService.setURL();
            ApiService.update("accounts/detail/update",id,values)
            .then((response) => {
                Swal.fire({
                    text: response.data.message,
                    icon: "success",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    heightAuto: false,
                    customClass: {confirmButton: "btn fw-semobold btn-light-primary"},
                    });
            })
            .catch(( err ) => {
                Swal.fire({
                    text: err.response.data.message,
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "Try again!",
                    heightAuto: false,
                    customClass: {confirmButton: "btn fw-semobold btn-light-danger"},
                    });
            });
        };
        return {
            getAssetPath,
            onSubmitSaveChanges,
            submitButton,
            userDetail,
            myPrefix,
            myProfile,
            nameTitle,
            Tooltip,
        };
    },
});
</script>@/stores/z_account