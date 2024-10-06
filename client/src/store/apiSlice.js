import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURI = "http://localhost:5500/";
export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseURI }),
  endpoints: (builder) => ({
    //get categories
    getCategories: builder.query({
      query: () => "/api/categories",
      providesTags: ["Category"],
    }),
    //get labels
    getLabels: builder.query({
      query: () => "/api/labels",
      providesTags: ["transaction"],
    }),
    //add transaction
    addTransaction: builder.mutation({
      query: (initialTranscation) => ({
        // post: 'http://localhost:3000/api/transaction',
        url: "/api/transaction",
        method: "POST",
        body: initialTranscation,
      }),
      invalidatesTags: ["transaction"],
    }),
    //delete transaction
    deleteTransaction: builder.mutation({
      query: (recordId) => ({
        // delete: 'http://localhost:3000/api/transaction',
        url: `/api/transaction`,
        method: "DELETE",
        body: recordId,
      }),
      invalidatesTags: ["transaction"],
    }),
  }),
});

export default apiSlice;
