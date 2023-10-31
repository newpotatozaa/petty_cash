<template>
  <div class="card mb-5 mb-xl-10">
    <div class="card-header cursor-pointer">
      <div class="d-flex flex-wrap flex-sm-nowrap mb-3 mt-8">
        <div class="me-7 mb-4">
          <div class="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
            <img :src="currentProfile['image'] ? currentProfile['image'] : getAssetPath('media/avatars/blank.png')"
              class="img-profile" />
            <div
              class="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px">
            </div>
          </div>
        </div>
        <div class="flex-grow-1">
          <div class="d-flex justify-content-between align-items-start flex-wrap mb-2">
            <div class="d-flex flex-column mt-5">
              <div class="d-flex flex-wrap fw-semobold fs-6 mb-4 pe-2">
                <a href="#" class="d-flex align-items-center text-primary text-hover-primary mb-2">
                  <KTIcon icon-name="sms" icon-class="fs-4 me-1" />
                  {{ currentProfile['email'] ? currentProfile['email'] : "-" }}
                </a>
              </div>
            </div>
          </div>
          <div class="d-flex flex-wrap flex-stack">
            <div class="d-flex flex-column flex-grow-1 pe-8">
              <div class="d-flex flex-wrap">
                <div class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                  <div class="d-flex align-items-center">
                    <KTIcon icon-name="wifi" icon-class="fs-2 text-success me-2" />
                    <div class="fs-6 fw-medium" data-kt-countup="true" data-kt-countup-value="60"
                      data-kt-countup-prefix="%">
                      {{ currentProfile['lastlogin'] ? currentProfile['lastlogin'] : "nodata" }}
                    </div>
                  </div>
                  <div class="fw-semobold ">Last Online</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="card mb-5 mb-xl-10">
    <div class="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse"
      data-bs-target="#kt_account_profile" aria-expanded="true" aria-controls="kt_account_profile">
      <div class="card-title m-0">
        <h3 class="fw-medium m-0">Edit Profile</h3>
      </div>
    </div>
    <div id="kt_account_profile" class="collapse show">
      <VForm id="kt_account_profile_form" class="form" novalidate 
        :validation-schema="profileDetailsValidator">
        <div class="card-body border-top p-9">
          <div class="row mb-6">
            <label class="col-lg-4 col-form-label fw-medium fs-6">รูปภาพ</label>
            <div class="col-lg-8">
              <div class="image-input image-input-outline" data-kt-image-input="true" :style="{
                backgroundImage: `url(${myProfile['image']})`,
              }">
                <div class="image-input-wrapper w-125px h-125px"
                  :style="`background-image: url(${myProfile['image'] ? myProfile['image'] : 'media/avatars/blank.png'})`">
                </div>
                <label class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                  data-kt-image-input-action="change" data-bs-toggle="tooltip" data-placement="top" title="Change avatar">
                  <i class="bi bi-pencil-fill fs-7"></i>
                  <input type="file" name="avatar" accept=".png, .jpg, .jpeg" @change="previewImage" />
                  <input type="hidden" name="avatar_remove" />
                </label>
                <span class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                  data-kt-image-input-action="remove" data-bs-toggle="tooltip" @click="removeImage()"
                  title="Remove avatar">
                  <i class="bi bi-x fs-2"></i>
                </span>
              </div>
              <div class="form-text">Allowed file types: png, jpg, jpeg.</div>
            </div>
          </div>
          <div class="row mb-6">
            <label class="col-lg-4 col-form-label required fw-medium fs-6">ชื่อ-นามสกุล</label>
            <div class="col-lg-8">
              <div class="row">
                <div class="col-lg-6 fv-row">
                  <Field type="text" name="firstname" class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    placeholder="First name" v-model="myProfile['firstnameTh']" />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="firstname" />
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 fv-row">
                  <Field type="text" name="lastname" class="form-control form-control-lg form-control-solid"
                    placeholder="Last name" v-model="myProfile['lastnameTh']" />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="lastname" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-6">
            <label class="col-lg-4 col-form-label fw-semobold fs-6">เบอร์ติดต่อ</label>
            <div class="col-lg-8 fv-row">
              <Field type="text" name="mobile" class="form-control form-control-lg form-control-solid"
                placeholder="Mobile Number" v-model="myProfile['mobile']" />
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
              <Field type="text" name="email" class="form-control form-control-lg form-control-solid"
                placeholder="Nick name" v-model="myProfile['email']" />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="email" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer d-flex justify-content-end py-6 px-9">
          <button type="reset" class="btn btn-light btn-active-light-second me-2">
            Discard
          </button>
          <button type="submit" id="kt_account_profile_details_submit" ref="submitButtonProfile" class="btn btn-success">
            <span class="indicator-label"> Save Changes </span>
            <span class="indicator-progress">
              Please wait...
              <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
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
import { Tooltip, } from 'bootstrap'
import { accountStore } from "@/stores/account";
import Multiselect from "@vueform/multiselect";
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
    const account = accountStore();
    const myProfile = ref({});
    const currentProfile = ref({});
    const file = ref({})
    const submitButtonProfile = ref<HTMLElement | null>(null);

    const profileDetailsValidator = Yup.object().shape({
      firstname: Yup.string().required().label("First name"),
      lastname: Yup.string().required().label("Last name"),
    });

    const nameTitle = ref({});

    onMounted(async () => {
      myProfile.value = await account.getAccountProfile();
      currentProfile.value = await account.getAccountProfile();
      new Tooltip(document.body, {
        selector: "[data-bs-toggle='tooltip']",
      })
    });

    const previewImage = (event) => {
      var input = event.target.files[0];
      // file.value = [{ image: event.target.files[0] }];
      file.value = event.target.files[0];
      myProfile.value["image"] = URL.createObjectURL(input);
    };

    const removeImage = () => {
      myProfile.value["image"] = "media/avatars/blank.png";
    };
    const saveChangesProfile = (values: any) => {
    // const saveChangesProfile = (values: any) => {
      values = values;
      const id = myProfile.value["id"];

      if (submitButtonProfile.value) {
        submitButtonProfile.value.setAttribute("data-kt-indicator", "on");
        setTimeout(() => {
          submitButtonProfile.value?.removeAttribute("data-kt-indicator");
        }, 2000);
      }
    };

    return {
      getAssetPath,
      saveChangesProfile,
      removeImage,
      previewImage,
      submitButtonProfile,
      profileDetailsValidator,
      myProfile, currentProfile,
      Tooltip,
      nameTitle,
    };
  },
});
</script>

<style>
.img-signature {
  border: dashed medium #eeeeee;
  padding: 20px;
  max-width: 300px;
}

.img-profile {
  max-width: 200px;
}
</style>
@/stores/z_account