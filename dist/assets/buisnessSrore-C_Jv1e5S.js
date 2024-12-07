import{c,a as i}from"./axios-Bmm4lkOe.js";const d="https://business-app-2.vercel.app/api",p=c(r=>({isLoading:!1,error:null,business:null,allBusiness:null,addBusiness:async t=>{var a,o;r({isLoading:!0,error:null});try{const s=localStorage.getItem("user_id"),e={...t,user_id:s};s&&(e.user_id=s);const n=await i.post(`${d}/business/`,e);return r({isLoading:!1,business:n.data}),n.data}catch(s){const e=((o=(a=s.response)==null?void 0:a.data)==null?void 0:o.message)||"Failed to add business";throw r({isLoading:!1,error:e}),new Error(e)}},updateBusiness:async(t,a)=>{var o,s;r({isLoading:!0,error:null});try{const e=await i.put(`${d}/business/${t}`,a);return r({isLoading:!1}),e.data}catch(e){const n=((s=(o=e.response)==null?void 0:o.data)==null?void 0:s.message)||"Failed to update business";throw r({isLoading:!1,error:n}),new Error(n)}},fetchBusiness:async t=>{var a,o;r({isLoading:!0,error:null});try{const s=await i.get(`${d}/business/${t}`);return r({isLoading:!1,business:s.data}),s.data}catch(s){const e=((o=(a=s.response)==null?void 0:a.data)==null?void 0:o.message)||"Failed to fetch business details";throw r({isLoading:!1,error:e}),new Error(e)}},fetchAllBusiness:async()=>{var t,a;r({isLoading:!0,error:null});try{if(!localStorage.getItem("user_id"))throw new Error("User ID not found in local storage");const e={headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}},n=await i.get(`${d}/business/`,e);return r({isLoading:!1,allBusiness:n.data.businesses}),n.data}catch(o){const s=((a=(t=o.response)==null?void 0:t.data)==null?void 0:a.message)||"Failed to fetch business details";throw r({isLoading:!1,error:s}),new Error(s)}},deleteBusiness:async t=>{var a,o;r({isLoading:!0,error:null});try{const e={headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}},n=await i.delete(`${d}/business/${t}`,e);return r({isLoading:!1}),n.data}catch(s){const e=((o=(a=s.response)==null?void 0:a.data)==null?void 0:o.message)||"Failed to delete business";throw r({isLoading:!1,error:e}),new Error(e)}},uploadFile:async(t,a)=>{var o,s;r({isLoading:!0,error:null});try{const e=new FormData;e.append("file",a);const n=await i.post(`${d}/business/upload/${t}`,e),{presignedUrl:u,fileUrl:l}=n.data;return await i.put(u,a,{headers:{"Content-Type":a.type}}),await i.post(`${d}/business/attachment/${t}`,{fileUrl:l}),r({isLoading:!1}),l}catch(e){const n=((s=(o=e.response)==null?void 0:o.data)==null?void 0:s.message)||"Failed to upload file";throw r({isLoading:!1,error:n}),new Error(n)}}}));export{p as u};