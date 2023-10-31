import{ad as D,A as N,ae as g,d as E,C as d,e as O,G as R,H as $,_ as F,r as w,f as k,k as l,p as r,L as V,a2 as M,w as b,l as C,z as B,n as z,F as K,a1 as j,o as I}from"./index.845388b1.js";import{g as q}from"./assets.3726cf21.js";import{a as G}from"./index.30a6773f.js";import{S as u}from"./sweetalert2.ad5735fd.js";import{D as H}from"./KTDataTable.5bbadef4.js";const P=D("UserRules",()=>{const s=N();function a(){s.push({name:"500"})}async function m(){return g.setURL(),g.getAll("csh_rule_sea").then(({data:n})=>n).catch(({data:n})=>{a()})}return{getList:m}}),J=E({name:"kt-widget-11",components:{Datatable:H},props:{widgetClasses:String,UserAdmin_Name:String},setup(){const s=d([{columnName:"ID",columnLabel:"UserRule_Id"},{columnName:"\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C",columnLabel:"UserRule_Name"},{columnName:"Actions",columnLabel:"actions"}]),a=d([]),m=P(),n=d([]),v=d([]),_=d(!0);O(),R(async()=>{await i()}),R(()=>{i()});const i=async()=>{n.value=await m.getList(),_.value=!1,v.value=await m.getList()},f=e=>{const t=e.order==="asc";e.label&&G(n.value,e.label,{reverse:t})},y=e=>{a.value=e},o=e=>{u.fire({html:"Are you sure ?",icon:"warning",buttonsStyling:!1,showCancelButton:!0,confirmButtonText:"Ok, delete it!",cancelButtonText:"Cancel",customClass:{confirmButton:"btn btn-dark btn-sm",cancelButton:"btn btn-danger btn-sm"}}).then(async function(t,c){if(t.value){const p={UserRule_Delete:"1"};await $.put(`http://localhost:3100/api/updateUserRules/${e}`,p).then(S=>{u.fire({text:S.data.message,icon:"success",buttonsStyling:!1,confirmButtonText:"Ok, got it!",heightAuto:!1,customClass:{confirmButton:"btn fw-semobold btn-light-primary"}}).then(()=>{i()})}).catch(S=>{u.fire({text:S.response.data.message,icon:"error",buttonsStyling:!1,confirmButtonText:"Try again!",heightAuto:!1,customClass:{confirmButton:"btn fw-semobold btn-light-danger"}})})}else t.dismiss==="cancel"&&a.value})},h=d(""),U=()=>{if(n.value.splice(0,n.value.length,...v.value),h.value!==""){let e=[];for(let t=0;t<n.value.length;t++)x(n.value[t],h.value)&&e.push(n.value[t]);n.value.splice(0,n.value.length,...e)}},x=(e,t)=>{for(let c in e)if(!Number.isInteger(e[c])&&typeof e[c]!="object"&&e[c].indexOf(t)!=-1)return!0;return!1},T=()=>{u.fire({html:"Are you sure ?",icon:"warning",buttonsStyling:!1,showCancelButton:!0,confirmButtonText:"Ok, delete it!",cancelButtonText:"Cancel",customClass:{confirmButton:"btn btn-dark btn-sm",cancelButton:"btn btn-danger btn-sm"}}).then(function(e){if(e.value){let t=[];a.value.forEach(p=>{t.push(p),A(p)}),L("accounts/list/delete",{list:t})}else e.dismiss==="cancel"&&a.value})},A=e=>{for(let t=0;t<n.value.length;t++)n.value[t].UserRule_Id===e&&n.value.splice(t,1)},L=(e,t)=>{g.setURL(),g.deleteSelect(e,t).then(c=>{i(),u.fire({text:c.data.message,icon:"success",buttonsStyling:!1,confirmButtonText:"Ok, got it!",heightAuto:!1,customClass:{confirmButton:"btn fw-semobold btn-light-primary"}})}).catch(c=>{u.fire({text:c.response.data.message,icon:"error",buttonsStyling:!1,confirmButtonText:"Try again!",heightAuto:!1,customClass:{confirmButton:"btn fw-semobold btn-light-danger"}})})};return{loading:_,UserRulesList:n,sort:f,onItemSelect:y,headerConfig:s,deleteButton:o,getAssetPath:q,search:h,searchItems:U,selectedIds:a,deleteFewSubscriptions:T}}}),Q={class:"card-header border-0 pt-6"},W={class:"card-title"},X={class:"d-flex align-items-center position-relative my-1"},Y={class:"card-toolbar"},Z={key:0,class:"d-flex justify-content-end","data-kt-subscription-table-toolbar":"base"},ee={key:1,class:"d-flex justify-content-end align-items-center"},te={class:"fw-bold me-5"},se={class:"me-2"},ne={class:"card-body py-3"},ae={class:"badge badge-light"},oe=["onClick"],le=j('<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_1"> Launch demo modal </button><div class="modal fade" tabindex="-1" id="kt_modal_1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h3 class="modal-title">Modal title</h3><div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close"><i class="ki-duotone ki-cross fs-1"><span class="path1"></span><span class="path2"></span></i></div></div><div class="modal-body"><p>Modal body text goes here.</p></div><div class="modal-footer"><button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button><button type="button" class="btn btn-primary">Save changes</button></div></div></div></div>',2);function ie(s,a,m,n,v,_){const i=w("KTIcon"),f=w("router-link"),y=w("Datatable");return I(),k(K,null,[l("div",{class:z([s.widgetClasses,"card"])},[l("div",Q,[l("div",W,[l("div",X,[r(i,{"icon-name":"magnifier","icon-class":"fs-1 position-absolute ms-6"}),V(l("input",{type:"text","onUpdate:modelValue":a[0]||(a[0]=o=>s.search=o),onInput:a[1]||(a[1]=o=>s.searchItems()),class:"form-control form-control-solid w-250px ps-15",placeholder:"Search"},null,544),[[M,s.search]])])]),l("div",Y,[s.selectedIds.length===0?(I(),k("div",Z,[r(f,{to:"csh_rule_add",class:"btn btn-primary"},{default:b(()=>[r(i,{"icon-name":"plus","icon-class":"fs-2"}),B(" Add ")]),_:1})])):(I(),k("div",ee,[l("div",te,[l("span",se,C(s.selectedIds.length),1),B("Selected ")]),l("button",{type:"button",class:"btn btn-danger",onClick:a[2]||(a[2]=o=>s.deleteFewSubscriptions())}," Delete Selected ")]))])]),l("div",ne,[r(y,{onOnSort:s.sort,onOnItemsSelect:s.onItemSelect,loading:s.loading,data:s.UserRulesList,header:s.headerConfig,"enable-items-per-page-dropdown":!0,"checkbox-enabled":!1,"checkbox-label":"UserRule_Id"},{UserRule_Id:b(({row:o})=>[l("div",ae,C(o.UserRule_Id),1)]),UserRule_Name:b(({row:o})=>[B(C(o.UserRule_Name),1)]),actions:b(({row:o})=>[r(f,{to:"csh_rule_edit/"+o.UserRule_Id,class:"btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"},{default:b(()=>[r(i,{"icon-name":"pencil","icon-class":"fs-3"})]),_:2},1032,["to"]),l("a",{onClick:h=>s.deleteButton(o.UserRule_Id),class:"btn btn-icon btn-bg-light btn-active-color-primary btn-sm"},[r(i,{"icon-name":"trash","icon-class":"fs-3"})],8,oe)]),_:1},8,["onOnSort","onOnItemsSelect","loading","data","header"])])],2),le],64)}const be=F(J,[["render",ie]]);export{be as default};
