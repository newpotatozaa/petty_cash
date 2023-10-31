import{d as U,aq as x,ar as w,as as y,H as p,e as v,C as m,G as C,_ as R,r as E,f as k,k as e,p as r,w as g,o as D,am as A,z as N}from"./index.845388b1.js";import{g as S}from"./assets.3726cf21.js";import{a as F}from"./account.9bb92812.js";import{M as T}from"./multiselect.f57e4c70.js";import{S as V}from"./sweetalert2.ad5735fd.js";import{c as q,a as _}from"./object.1d1a0185.js";const B=U({name:"user-account-profile",components:{ErrorMessage:x,Field:w,VForm:y,Multiselect:T},data(){return{menuData:[]}},async mounted(){try{const s=await p.get("http://localhost:3100/api/ListMenu");this.menuData=s.data}catch(s){console.error("Error fetching data:",s)}},methods:{async onSubmitSaveChanges(s,t){let a=!0,u="";v();const f={UserAdmin_Name:s.UserAdmin_Name,UserAdmin_Delete:"0",UserRule_Id:s.PrefixUserRules,UserAdmin_FullName:s.UserAdmin_FullName,UserAdmin_Companyid:s.prefixVender.split("%")[0],UserAdmin_VenderCode:s.prefixVender.split("%")[1]};try{let d;await p.post("http://localhost:3100/api/createUserAdmin",f).then(o=>{d=o.data.userAdmin.UserAdmin_Id}).catch(o=>{console.error("An error occurred:",o),a=!1,u="An error occurred:"+o}),(a=!0)?V.fire({text:"Data inserted successfully!",icon:"success",buttonsStyling:!1,confirmButtonText:"Ok, got it!",heightAuto:!1,customClass:{confirmButton:"btn fw-semobold btn-light-primary"}}).then(()=>{this.$router.push("/csh_user_sea/index")}):V.fire({text:"Error inserting data:"+u,icon:"error",buttonsStyling:!1,confirmButtonText:"Try again!",heightAuto:!1,customClass:{confirmButton:"btn fw-semobold btn-light-danger"}})}catch(d){console.error("Error inserting data:",d)}}},setup(){v(),F();const s=m({});m({});const t=m({}),a=m({}),u=m(null),f=q().shape({UserAdmin_Name:_().required().label("\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19"),UserAdmin_FullName:_().required().label("\u0E0A\u0E37\u0E48\u0E2D\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19"),prefixVender:_().required().label("\u0E1A\u0E23\u0E34\u0E29\u0E31\u0E17"),PrefixUserRules:_().required().label("\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C")});return C(async()=>{const c=(await p.get("http://localhost:3100/api/getPrefixVender")).data.map(i=>({value:i.CompanyId.trim()+"%"+i.VenderCode.trim(),label:i.VenderName}));console.log(c),a.value={options:c,searchable:!0,placeholder:"\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E1A\u0E23\u0E34\u0E29\u0E31\u0E17"};const l=(await p.get("http://localhost:3100/api/getPrefixUserRules")).data.prefix.map(i=>({value:i.value,label:i.label}));t.value={options:l,searchable:!0,placeholder:"\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C"}}),{getAssetPath:S,submitButton:u,userDetail:f,prefixVender:a,nameTitle:s,prefixUserRulesTitle:t,toggleSubMenuActive:o=>{o.Active=!o.Active}}}}),M={class:"card mb-5 mb-xl-10"},P=e("div",{class:"card-header border-0","data-bs-target":"#kt_account_profile","aria-expanded":"true","aria-controls":"kt_account_profile"},[e("div",{class:"card-title m-0"},[e("h3",{class:"fw-medium m-0"},"\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19")])],-1),$={id:"kt_account_profile"},I={class:"card-body border-top p-9"},j={class:"row mb-6"},z=e("label",{class:"col-lg-4 col-form-label required fw-semobold fs-6"},"\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19",-1),G={class:"col-lg-8 fv-row"},H={class:"fv-plugins-message-container"},L={class:"fv-help-block"},O={class:"row mb-6"},J=e("label",{class:"col-lg-4 col-form-label required fw-semobold fs-6"},"\u0E0A\u0E37\u0E48\u0E2D\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19",-1),K={class:"col-lg-8 fv-row"},Q={class:"fv-plugins-message-container"},W={class:"fv-help-block"},X={class:"row mb-6"},Y=e("label",{class:"col-lg-4 col-form-label required fw-semobold fs-6"},"\u0E1A\u0E23\u0E34\u0E29\u0E31\u0E17",-1),Z={class:"col-lg-4 fv-row"},ee={class:"fv-plugins-message-container"},se={class:"fv-help-block"},oe={class:"row mb-6"},te=e("label",{class:"col-lg-4 col-form-label required fw-semobold fs-6"},"\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C",-1),re={class:"col-lg-4 fv-row"},le={class:"fv-plugins-message-container"},ae={class:"fv-help-block"},ne={class:"card-footer d-flex justify-content-between py-6 px-9"},ie=e("button",{class:"btn btn-danger btn-active-light-second me-2"}," Back ",-1),ue=e("button",{type:"reset",class:"btn btn-secondary btn-active-light-second me-2"}," Discard ",-1),de={type:"submit",id:"kt_account_profile_details_submit",ref:"submitButton",class:"btn btn-success"},ce=e("span",{class:"indicator-label"}," Save ",-1),me=e("span",{class:"indicator-progress"},[N(" Please wait... "),e("span",{class:"spinner-border spinner-border-sm align-middle ms-2"})],-1),Ee=[ce,me];function fe(s,t,a,u,f,d){const o=E("Field"),n=E("ErrorMessage"),c=E("Multiselect"),h=E("router-link"),b=E("VForm");return D(),k("div",M,[P,e("div",$,[r(b,{id:"kt_account_profile_form",class:"form",novalidate:"",onSubmit:s.onSubmitSaveChanges,"validation-schema":s.userDetail},{default:g(()=>[e("div",I,[e("div",j,[z,e("div",G,[r(o,{type:"text",name:"UserAdmin_Name",class:"form-control form-control-lg form-control-solid",placeholder:""}),e("div",H,[e("div",L,[r(n,{name:"UserAdmin_Name"})])])])]),e("div",O,[J,e("div",K,[r(o,{type:"text",name:"UserAdmin_FullName",class:"form-control form-control-lg form-control-solid",placeholder:""}),e("div",Q,[e("div",W,[r(n,{name:"UserAdmin_FullName"})])])])]),e("div",X,[Y,e("div",Z,[r(o,{type:"hidden",name:"prefixVender",class:"form-control form-control-lg form-control-solid mb-3 mb-lg-0",modelValue:s.prefixVender.value,"onUpdate:modelValue":t[0]||(t[0]=l=>s.prefixVender.value=l)},null,8,["modelValue"]),r(c,A({modelValue:s.prefixVender.value,"onUpdate:modelValue":t[1]||(t[1]=l=>s.prefixVender.value=l)},s.prefixVender,{class:"form-control form-control-solid"}),null,16,["modelValue"]),e("div",ee,[e("div",se,[r(n,{name:"prefixVender"})])])])]),e("div",oe,[te,e("div",re,[r(o,{type:"hidden",name:"PrefixUserRules",class:"form-control form-control-lg form-control-solid mb-3 mb-lg-0",modelValue:s.prefixUserRulesTitle.value,"onUpdate:modelValue":t[2]||(t[2]=l=>s.prefixUserRulesTitle.value=l)},null,8,["modelValue"]),r(c,A({modelValue:s.prefixUserRulesTitle.value,"onUpdate:modelValue":t[3]||(t[3]=l=>s.prefixUserRulesTitle.value=l)},s.prefixUserRulesTitle,{class:"form-control form-control-solid"}),null,16,["modelValue"]),e("div",le,[e("div",ae,[r(n,{name:"PrefixUserRules"})])])])])]),e("div",ne,[e("div",null,[r(h,{to:"index"},{default:g(()=>[ie]),_:1})]),e("div",null,[ue,e("button",de,Ee,512)])])]),_:1},8,["onSubmit","validation-schema"])])])}const Ae=R(B,[["render",fe]]);export{Ae as default};
