import { InitialState, VideoType } from "../../../types";
import Video from "../../components/Video";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useVideos } from "../../hooks/useVideos";
import { setPageNumber } from "../../redux/slices/videosSlice";
import VideosSkeleton from "../../components/skeleton/VideosSkeleton";

const Videos = () => {
  const targetRef = useRef(null);
  const dispatch = useDispatch();
  const currentCategory = useSelector(
    (state: InitialState) => state.videos.selectedCategory
  );
 
  const {videos, lastFetchedCategory } = useVideos();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastFetchedCategory !== currentCategory && ref.current) {
      ref.current.scrollIntoView();
    }
  }, [videos]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if(entry.isIntersecting){
        console.log('yes')
        dispatch(setPageNumber());
      }else{
        console.log('no')
      }
    
    });

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) observer.unobserve(targetRef.current);
    };
  }, [targetRef.current]);

  return (
    <>
      {videos !== undefined && videos.length !== 0 ? (
        <div ref={ref} className=" grid gap-4  sm:grid-cols-2 md:grid-cols-3 w-full    ">
          {videos.map((video: VideoType) => {
            return <Video key={video.id} {...video} />;
          })}{" "}
        </div>
      ) : (
        <VideosSkeleton />
      )}

      <div ref={targetRef}>
     {videos !== undefined && videos.length !== 0 && <h2>Fetching more...</h2> }
      </div>
    </>
  );
};

export default Videos;
