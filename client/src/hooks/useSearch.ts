import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import {  useGetChannelQuery, useGetSearchResultsQuery, useGetVideoByMultipleIdsQuery } from "../services/videos"
import { useDispatch, useSelector } from "react-redux"
import { InitialState, VideoType } from "../../types"
import { setPageNumber } from "../redux/slices/videosSlice"


export const useSearch = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const query = queryParams.get('search_query')
  const [nextPageToken, setNextPageToken] = useState('')
  const [videoIds, setVideoIds] = useState('')
  const [channelId, setChannelId] = useState<any>('')
  const { data } = useGetSearchResultsQuery({ nextPageToken, keyword: query })
  const { data: videosData } = useGetVideoByMultipleIdsQuery(videoIds)
  const { data: channel } = useGetChannelQuery(channelId)
  const pageNumber = useSelector((state: InitialState) => state.videos.pageNumber)
  const [videos, setVideos] = useState<VideoType[]>([])
const dispatch = useDispatch()

  useEffect(() => {
    setVideos([])
    setChannelId('')
    setNextPageToken('')
 dispatch(   setPageNumber(0))
  }, [query])

  useEffect(() => {
    if (data ) {
      setNextPageToken(data.nextPageToken)
    }
  }, [pageNumber])

  useEffect(() => {
    let ids = ''

    if (data !== undefined) {
      data.items.map((item) => {
        if (item.id.videoId) {
          ids += item.id.videoId + ','
        }
        if (item.id.channelId) {
          setChannelId(item.id.channelId)
        }

      })
      setVideoIds(ids)
    }
  }, [data])
console.log(channel)
  useEffect(() => {
    if (videosData) {
      if (pageNumber >= 1) {
        setVideos((prev: any) => {
          const newVideos = videosData.items.filter((item: VideoType) => !prev.some((p: VideoType) => p.id === item.id));
          return [...prev, ...newVideos];
        });
        if(channel){

        }
      } else {
        setVideos(videosData?.items)
      }
    }
  }, [videosData])

  return { videos, channel, channelId }

}

