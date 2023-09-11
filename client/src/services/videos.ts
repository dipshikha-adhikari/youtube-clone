import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ChannelType, CommentType, VideoType } from '../../types';

export type VideoListResponseType = {
  kind: string;
  etag: string;
  items: VideoType[];
  nextPageToken: string;
};

export type VideoResponseType = {
  kind: string;
  etag: string;
  items: VideoType[]
}
type ChannelResponseType = {
  etag: string;
  pageInfo: {};
  items: ChannelType[]
}

type SearchResponseType = {
  kind: string
  nextPageToken: string
  items: {
    kind: string
    id: {
      kind: string
      videoId: string
      channelId: string
    },
    snippet: {
      description: string
      publishedAt: string
      channelId: string;
      title: string;
      thumbnails: {
        medium: {
          url: string;
        };
      };
      channelTitle: string;
      publishedTime: string;

    }
  }[]
}

interface MultipleVideosType {
  etag: string
  items: VideoType[]
}

export const videosApi = createApi({
  reducerPath: 'videosApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_APP_BASE_URL}/api/v1` }),
  endpoints: (builder) => ({
    getVideos: builder.query<VideoListResponseType, { categoryId: string; nextPageToken: string }>({
      query: ({ categoryId, nextPageToken }) =>
        categoryId !== ''
          ? `videos/category?categoryId=${categoryId}&pageToken=${nextPageToken}`
          : `/videos?pageToken=${nextPageToken}`,
    }),
    getVideoCategories: builder.query({
      query: () => `/categories`
    }),
    getVideoById: builder.query<VideoType, any>({
      query: (id) => `/videos/${id}`,
      transformResponse: (response: VideoResponseType) => response.items[0]

    }),
    getVideoByMultipleIds: builder.query<MultipleVideosType, any>({
      query: (id) => `/videos/${id}`,
      // transformResponse:(response:VideoResponseType) => response

    }),
    getComments: builder.query<CommentType[], any>({
      query: (id) => `/videos/comments/${id}`
    }),
    getChannel: builder.query<ChannelType, any>({
      query: (id) => `/channels/${id}`,
      transformResponse: (response: ChannelResponseType) => response.items[0]
    }),
    getSearchResults: builder.query<SearchResponseType, any>({
      query: ({ nextPageToken, keyword }) => `/search?pageToken=${nextPageToken}&keyword=${keyword}`
    })
  })
});


export const { useGetVideosQuery, useGetVideoByIdQuery, useGetCommentsQuery, useGetChannelQuery, useGetVideoCategoriesQuery, useGetSearchResultsQuery, useGetVideoByMultipleIdsQuery } = videosApi


