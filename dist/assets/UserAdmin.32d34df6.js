import{ad as o,A as a,ae as t}from"./index.845388b1.js";const u=o("UserAdmin",()=>{const r=a();function s(){r.push({name:"500"})}async function n(){return t.setURL(),t.getAll("csh_user_list").then(({data:e})=>e).catch(({data:e})=>{s()})}return{getList:n}});export{u as U};