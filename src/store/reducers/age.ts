import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
import env from '@util/env';
import type {AgeResponse} from '@pages/api/age';

export const ageApi = createApi({
  reducerPath: 'ageApi',
  baseQuery: fetchBaseQuery({baseUrl: `${env.public.origin}/api/`}),
  endpoints: builder => ({
    getAge: builder.query<AgeResponse, string>({
      query: name => `age?name=${name}`
    })
  })
});
