import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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


  //checking lastFetchedCategory with current category because we do not want page token of different categories to be same.
  useEffect(() => {
    setLastFetchedCategory(categoryId)
    if (data?.nextPageToken !== undefined) {
      if (categoryId === '' || lastFetchedCategory === categoryId) {
        setNextPageToken(data?.nextPageToken)
      } else {
        setNextPageToken('')
      }
    }
  }, [pageNumber])

  // if last category and current category are same then we want the old data along with new data otherwise we want only new data 
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





