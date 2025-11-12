import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IItem } from '@/entities/item/model';

export const searchApi = createApi({
  reducerPath: 'searchApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    searchItems: builder.query<IItem[], string>({
      query: (q) => `/items/search?q=${q}`,
      transformResponse: (response: { message: IItem[] }) => {
        return response.message;
      },
    }),
  }),
});

export const { useSearchItemsQuery } = searchApi;