<template>
  <div class="card mb-5 mb-xl-10">
      <div class="card-header cursor-pointer">
      <div class="d-flex flex-wrap flex-sm-nowrap mb-3 mt-8">
        <div class="me-7 mb-4">
          <div class="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
            <img :src="myProfile['picture']? 'data:image/png;base64,' + myProfile['picture'] : getAssetPath('media/avatars/blank.png')" class="img-profile" />
            <div class="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px"></div>
          </div>
        </div>
        <div class="flex-grow-1">
          <div class="d-flex justify-content-between align-items-start flex-wrap mb-2">
            <div class="d-flex flex-column mt-5">
              <div class="d-flex flex-wrap fw-semobold fs-6 mb-4 pe-2">
                <a href="#" class="d-flex align-items-center text-primary text-hover-primary mb-2">
                  <KTIcon icon-name="sms" icon-class="fs-4 me-1" />
                  {{ myProfile['email']? myProfile['email']: "-" }}
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
                    <div
                      class="fs-6 fw-medium"
                      data-kt-countup="true"
                      data-kt-countup-value="60"
                      data-kt-countup-prefix="%"
                    >
                      {{ myProfile['lastlogin']? myProfile['lastlogin'] : "nodata" }}
                    </div>
                  </div>
                  <div class="fw-semobold ">Last Online</div>
                </div>
              </div>
            </div>
            <div class="d-flex flex-column flex-grow-1 pe-8">
              <div class="d-flex flex-wrap">
                <div class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                  <div class="d-flex align-items-center">
                    <router-link to="/user/account/profile/edit" class="btn btn-dark align-self-center">Edit Profile</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="card mb-5 mb-xl-10">
    <div class="card-header border-0 cursor-pointer" role="button" data-bs-toggle="collapse" data-bs-target="#kt_account_profile">
      <div class="card-title m-0">
        <h3 class="fw-medium m-0">Profile Details</h3>
      </div>
    </div>
    <div id="kt_account_profile" class="collapse show">
      <div class="card-body border-top p-9">
        <div class="row mb-7">
          <label class="col-lg-4 fw-medium fs-6">ชื่อ-นามสกุล</label>
          <div class="col-lg-8">
            <span class="fw-medium text-dark">{{ myProfile['firstnameTh'] + " " + myProfile['lastnameTh'] }}</span>
          </div>
        </div>
        <div class="row mb-7">
          <label class="col-lg-4 fw-medium fs-6">เบอร์โทรศํพท์ </label>
          <div class="col-lg-8 d-flex align-items-center">
            <span class="fw-medium text-dark">{{ myProfile['mobile']? myProfile['mobile'] : "-" }}</span>
          </div>
        </div>
        <div class="row mb-7">
          <label class="col-lg-4 fw-medium fs-6">อีเมล</label>
          <div class="col-lg-8">
            <a href="#" class="fw-medium text-primary">{{ myProfile['email']? myProfile['email'] : "-" }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import { accountStore } from "@/stores/account";
export default defineComponent({
  name: "user-account-profile",
  components: {},

  setup() {
    const account = accountStore();
    const myProfile = ref({});
    onMounted(async()=>{
      myProfile.value = await account.getAccountProfile();
    });

    return {
      getAssetPath,
      myProfile,
    };
  },
});
</script>

<style>
.img-signature{
  border: dashed medium #eeeeee;
  padding:20px;
  max-width: 300px;
}
.img-profile{
  max-width: 200px;
}
</style>
@/stores/z_account