import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getProduct: build.query<TODO.getResponse, TODO.getRequest>({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["todo"],
    }),
    postProduct: build.mutation<TODO.postResponse, TODO.postRequest>({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["todo"],
    }),
    deleteProduct: build.mutation<TODO.deleteResponse, TODO.deleteRequest>({
      query: (id) => ({
        url: `?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["todo"],
    }),
    editProduct: build.mutation<TODO.editResponse, TODO.editRequest>({
      query: ({ edited, id }) => ({
        url: `?id=${id}`,
        method: "PUT",
        body: edited,
      }),
      invalidatesTags: ["todo"],
    }),
  }),
});

export const {
  useGetProductQuery,
  usePostProductMutation,
  useDeleteProductMutation,
  useEditProductMutation,
} = api;
