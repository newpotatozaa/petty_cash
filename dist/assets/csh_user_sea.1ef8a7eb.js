import{d as T,C as u,e as D,G as U,H as O,ae as k,_ as F,r as w,f as S,k as l,p as d,L as V,a2 as $,w as r,l as m,z as b,n as R,F as M,a1 as z,o as C}from"./index.845388b1.js";import{g as K}from"./assets.3726cf21.js";import{U as j}from"./UserAdmin.32d34df6.js";import{a as q}from"./index.30a6773f.js";import{S as f}from"./sweetalert2.ad5735fd.js";import{D as G}from"./KTDataTable.5bbadef4.js";const H=T({name:"kt-widget-11",components:{Datatable:G},props:{widgetClasses:String,UserAdmin_Name:String},setup(){const n=u([{columnName:"ID",columnLabel:"UserAdmin_Id"},{columnName:"\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19",columnLabel:"UserAdmin_Name"},{columnName:"\u0E0A\u0E37\u0E48\u0E2D\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19",columnLabel:"UserAdmin_FullName"},{columnName:"\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C",columnLabel:"UserRule_Name"},{columnName:"\u0E1A\u0E23\u0E34\u0E29\u0E31\u0E17",columnLabel:"Vender_Name"},{columnName:"Actions",columnLabel:"actions"}]),o=u([]),v=j(),a=u([]),_=u([]),y=u(!0);D(),U(async()=>{await i()}),U(()=>{i()});const i=async()=>{a.value=await v.getList(),y.value=!1,_.value=await v.getList()},p=e=>{const t=e.order==="asc";e.label&&q(a.value,e.label,{reverse:t})},E=e=>{o.value=e},s=e=>{f.fire({html:"Are you sure ?",icon:"warning",buttonsStyling:!1,showCancelButton:!0,confirmButtonText:"Ok, delete it!",cancelButtonText:"Cancel",customClass:{confirmButton:"btn btn-dark btn-sm",cancelButton:"btn btn-danger btn-sm"}}).then(async function(t,c){if(t.value){const g={UserAdmin_Delete:"1"};await O.put(`http://localhost:3100/api/updateUserAdmin/${e}`,g).then(A=>{f.fire({text:A.data.message,icon:"success",buttonsStyling:!1,confirmButtonText:"Ok, got it!",heightAuto:!1,customClass:{confirmButton:"btn fw-semobold btn-light-primary"}}).then(()=>{i()})}).catch(A=>{f.fire({text:A.response.data.message,icon:"error",buttonsStyling:!1,confirmButtonText:"Try again!",heightAuto:!1,customClass:{confirmButton:"btn fw-semobold btn-light-danger"}})})}else t.dismiss==="cancel"&&o.value})},h=u(""),N=()=>{if(a.value.splice(0,a.value.length,..._.value),h.value!==""){let e=[];for(let t=0;t<a.value.length;t++)B(a.value[t],h.value)&&e.push(a.value[t]);a.value.splice(0,a.value.length,...e)}},B=(e,t)=>{for(let c in e)if(!Number.isInteger(e[c])&&typeof e[c]!="object"&&e[c].indexOf(t)!=-1)return!0;return!1},I=()=>{f.fire({html:"Are you sure ?",icon:"warning",buttonsStyling:!1,showCancelButton:!0,confirmButtonText:"Ok, delete it!",cancelButtonText:"Cancel",customClass:{confirmButton:"btn btn-dark btn-sm",cancelButton:"btn btn-danger btn-sm"}}).then(function(e){if(e.value){let t=[];o.value.forEach(g=>{t.push(g),x(g)}),L("accounts/list/delete",{list:t})}else e.dismiss==="cancel"&&o.value})},x=e=>{for(let t=0;t<a.value.length;t++)a.value[t].UserRule_Id===e&&a.value.splice(t,1)},L=(e,t)=>{k.setURL(),k.deleteSelect(e,t).then(c=>{i(),f.fire({text:c.data.message,icon:"success",buttonsStyling:!1,confirmButtonText:"Ok, got it!",heightAuto:!1,customClass:{confirmButton:"btn fw-semobold btn-light-primary"}})}).catch(c=>{f.fire({text:c.response.data.message,icon:"error",buttonsStyling:!1,confirmButtonText:"Try again!",heightAuto:!1,customClass:{confirmButton:"btn fw-semobold btn-light-danger"}})})};return{loading:y,UserAdminList:a,sort:p,onItemSelect:E,headerConfig:n,deleteButton:s,getAssetPath:K,search:h,searchItems:N,selectedIds:o,deleteFewSubscriptions:I}}}),P={class:"card-header border-0 pt-6"},J={class:"card-title"},Q={class:"d-flex align-items-center position-relative my-1"},W={class:"card-toolbar"},X={key:0,class:"d-flex justify-content-end","data-kt-subscription-table-toolbar":"base"},Y={key:1,class:"d-flex justify-content-end align-items-center"},Z={class:"fw-bold me-5"},ee={class:"me-2"},te={class:"card-body py-3"},se={class:"badge badge-light"},ne=["onClick"],ae=z('<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_1"> Launch demo modal </button><div class="modal fade" tabindex="-1" id="kt_modal_1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h3 class="modal-title">Modal title</h3><div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close"><i class="ki-duotone ki-cross fs-1"><span class="path1"></span><span class="path2"></span></i></div></div><div class="modal-body"><p>Modal body text goes here.</p></div><div class="modal-footer"><button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button><button type="button" class="btn btn-primary">Save changes</button></div></div></div></div>',2);function oe(n,o,v,a,_,y){const i=w("KTIcon"),p=w("router-link"),E=w("Datatable");return C(),S(M,null,[l("div",{class:R([n.widgetClasses,"card"])},[l("div",P,[l("div",J,[l("div",Q,[d(i,{"icon-name":"magnifier","icon-class":"fs-1 position-absolute ms-6"}),V(l("input",{type:"text","onUpdate:modelValue":o[0]||(o[0]=s=>n.search=s),onInput:o[1]||(o[1]=s=>n.searchItems()),class:"form-control form-control-solid w-250px ps-15",placeholder:"Search"},null,544),[[$,n.search]])])]),l("div",W,[n.selectedIds.length===0?(C(),S("div",X,[d(p,{to:"csh_user_add",class:"btn btn-primary"},{default:r(()=>[d(i,{"icon-name":"plus","icon-class":"fs-2"}),b(" Add ")]),_:1})])):(C(),S("div",Y,[l("div",Z,[l("span",ee,m(n.selectedIds.length),1),b("Selected ")]),l("button",{type:"button",class:"btn btn-danger",onClick:o[2]||(o[2]=s=>n.deleteFewSubscriptions())}," Delete Selected ")]))])]),l("div",te,[d(E,{onOnSort:n.sort,onOnItemsSelect:n.onItemSelect,loading:n.loading,data:n.UserAdminList,header:n.headerConfig,"enable-items-per-page-dropdown":!0,"checkbox-enabled":!1,"checkbox-label":"UserAdmin_Id"},{UserAdmin_Id:r(({row:s})=>[l("div",se,m(s.UserAdmin_Id),1)]),UserAdmin_Name:r(({row:s})=>[b(m(s.UserAdmin_Name),1)]),UserAdmin_FullName:r(({row:s})=>[b(m(s.UserAdmin_FullName),1)]),UserRule_Name:r(({row:s})=>[b(m(s.UserRule_Name),1)]),Vender_Name:r(({row:s})=>[b(m(s.VenderName),1)]),actions:r(({row:s})=>[d(p,{to:"csh_user_edit/"+s.UserAdmin_Id,class:"btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"},{default:r(()=>[d(i,{"icon-name":"pencil","icon-class":"fs-3"})]),_:2},1032,["to"]),l("a",{onClick:h=>n.deleteButton(s.UserAdmin_Id),class:"btn btn-icon btn-bg-light btn-active-color-primary btn-sm"},[d(i,{"icon-name":"trash","icon-class":"fs-3"})],8,ne)]),_:1},8,["onOnSort","onOnItemsSelect","loading","data","header"])])],2),ae],64)}const me=F(H,[["render",oe]]);export{me as default};
