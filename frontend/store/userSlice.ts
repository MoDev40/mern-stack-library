import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { BASE_URL } from "./baseUrl";

const userSlice = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    loginFn: builder.mutation<any, any>({
      query: (data) => ({ url: "auth/log-in", method: "POST", body: data }),
    }),
  }),
});

export default userSlice;
