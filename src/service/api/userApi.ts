// Need to use the React-specific entry point to import createApi
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import env from '../../env';
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const userzApi = createApi({
  reducerPath: 'userzApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${env.server}/api/v1`,
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as any)?.user?.token;
      console.log(token, 'INSIDE TOKEN');

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: builder => ({
    isAvailable: builder.mutation({
      query: args => {
        console.log(args, '>>>>>>>');
        return {
          url: '/isAvailable',
          method: 'POST',
          body: args,
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
    }),
    login: builder.mutation({
      query: args => {
        console.log(args, '>>>>>>>');
        return {
          url: '/login',
          method: 'POST',
          body: args,
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
    }),
        googleAuth: builder.mutation({
      query: ({ token }) => ({
        url: 'auth/google',
        method: 'POST',
        body: { token },
      }),
    }),
    me: builder.mutation({
      query: args => {
        return {
          url: '/me',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
    }),
    deleteMyAccount: builder.mutation({
      query: args => {
        return {
          url: `/delete-user/${args.id}`,
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
    }),

    becomeContractor: builder.mutation({
      query: ({id, data}) => {
        return {
          url: `/user/${id}/become-contractor`,
          method: 'POST',
          body: data,
          // headers: {
          //   'Content-type': 'multipart/form-data; charset=UTF-8',
          // },
        };
      },
    }),
    completeProfile: builder.mutation({
      query: args => {
        console.log(args.body, '>>>>>>>');
        return {
          url: '/register-with-image',
          method: 'POST',
          body: args.body,
          // headers: {
          //   'Content-type': 'application/json',
          // },
        };
      },
    }),
    completeContractorRegistration: builder.mutation({
      query: args => {
        console.log(args.body, '>>>>>>>');
        return {
          url: '/register-contractor',
          method: 'POST',
          body: args.body,
          headers: {
            'Content-type': 'multipart/form-data; charset=UTF-8',
            Authorization: `Bearer ${args.token}`,
          },
        };
      },
    }),
    updateProfile: builder.mutation({
      query: ({data, id}) => {
        console.log(data, 'ISIDE API');
        return {
          url: `/update-with-image`,
          method: 'PUT',
          body: data,
       

          // headers: {
          //     'Content-type': 'multipart/form-data; charset=UTF-8',
          // },
        };
      },
    }),
    uploadPost: builder.mutation({
      query: args => {
        console.log(args.body, '>>>>>>>');
        console.log(args.token, '>>>>>>> token');
        return {
          url: '/postimage',
          method: 'POST',
          body: args.body,
          headers: {
            'Content-type': 'multipart/form-data; charset=UTF-8',
            Authorization: `Bearer ${args.token}`,
          },
        };
      },
    }),

    // Workers
    contractorDetails: builder.mutation({
      query: ({id}) => {
        return {
          url: `/contractors/${id}`,
          method: 'GET',
          headers: {
            'Content-type': 'multipart/form-data; charset=UTF-8',
          },
        };
      },
    }),
    getContractors: builder.mutation({
      query: ({service}) => {
        console.log(service)
        return {
          url: `/contractors/?service=${service || ''}`,
          method: 'GET',
          headers: {
            'Content-type': 'multipart/form-data; charset=UTF-8',
          },
        };
      },
    }),

    bookmark: builder.mutation({
      query: ({userId, contractorId}) => {
        console.log({userId, contractorId});
        return {
          url: `/bookmarks/${contractorId}/?userId=${
            userId || ''
          }&contractorId=${contractorId || ''}`,
          method: 'POST',
          headers: {
            'Content-type': 'multipart/form-data; charset=UTF-8',
          },
        };
      },
    }),
    myBookmark: builder.mutation({
      query: ({userId}) => {
        console.log({userId});
        return {
          url: `/bookmarks/?userId=${userId || ''}`,
          method: 'GET',
          headers: {
            'Content-type': 'application/jsona; charset=UTF-8',
          },
        };
      },
    }),
     report: builder.mutation({
      query: (body) => ({
        url: 'report',
        method: 'POST',
        body,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useUpdateProfileMutation,
  useCompleteProfileMutation,
  useDeleteMyAccountMutation,
  useGoogleAuthMutation,
  useReportMutation,

  useUploadPostMutation,
  useCompleteContractorRegistrationMutation,
  useLoginMutation,
  useMeMutation,
  useIsAvailableMutation,

  // contractors
  useGetContractorsMutation,
  useContractorDetailsMutation,

  useBecomeContractorMutation,

  useBookmarkMutation,
  useMyBookmarkMutation,
} = userzApi;
