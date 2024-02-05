import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { InitialState, VideoType } from "../../types";
import { useGetVideosQuery } from "../services/videos";

type VideosArray = VideoType[];

export const useVideos = () => {
  const [videos, setVideos] = useState<VideosArray>([]);
  const [lastFetchedCategory, setLastFetchedCategory] = useState('')
  const [nextPageToken, setNextPageToken] = useState('')
  const pageNumber = useSelector((state: InitialState) => state.videos.pageNumber)
  const categoryId = useSelector((state: InitialState) => state.videos.selectedCategory)
  const { data } = useGetVideosQuery({ categoryId, nextPageToken })


  useEffect(() => {
    setLastFetchedCategory(categoryId)
    if (data?.nextPageToken) {
      if (categoryId === '' || lastFetchedCategory === categoryId) {
        setNextPageToken(data?.nextPageToken)
      } 
    }
  }, [pageNumber])

  useEffect(() => {
    if (data !== undefined) {
      if (lastFetchedCategory === categoryId) {
        setVideos((prev: any) => {
          const newVideos = data.items.filter((item: VideoType) => !prev.some((p: VideoType) => p.id === item.id));
          return [...prev, ...newVideos];
        });

      } else {
        setVideos(data.items)
      }
    }
  }, [data])




  return {
    videos,
    lastFetchedCategory
  };
};





