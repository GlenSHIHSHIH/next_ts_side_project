// production/[id].tsx
import api from "pages/api/baseApi";

export const login = (data: null | any) => {
    // console.log("data:");
    // console.log("/production/"+data.id);
    return api("post", "/backstage/admin/login", data, null)
}
