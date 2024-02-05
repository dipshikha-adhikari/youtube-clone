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
let pageNum = 0

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
        pageNum++
        dispatch(setPageNumber(pageNum));
      }else{
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
    <div className="h-full relative">
      {videos !== undefined && videos.length !== 0 ? (
      <div>
          <div ref={ref} className=" grid gap-4  sm:grid-cols-2 md:grid-cols-3 w-full    ">
          {videos.map((video: VideoType) => {
            return <Video key={video.id} {...video} />;
          })}{" "}

        </div>
        
      </div>
      ) : (
        <VideosSkeleton />
      )}
  <div ref={targetRef} className="z-50 absolute  h-40  bottom-[100px]">
           </div>
    
    </div>
  );
};

export default Videos;
