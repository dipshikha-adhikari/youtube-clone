import { useDispatch } from "react-redux";
import { VideoType } from "../../../types";
import Video from "../../components/Video";
import { useVideos } from "../../hooks/useVideos";
import { setPageNumber } from "../../redux/slices/videosSlice";

const Videos = () => {
  const { videos } = useVideos();
  const dispatch = useDispatch();

  if (videos === undefined || videos.length === 0) return null;

  return (
    <>
    <div className="grid gap-4 grid-cols-auto-fit h-fit">
      {videos.map((video: VideoType) => {
        return <Video key={video.id} {...video} />;
      })}
         </div>
      <div
        className="text-xl w-fit mx-auto py-4 font-bold cursor-pointer"
        onClick={() => dispatch(setPageNumber())}
      >
        Show more
      </div>
 
    </>
  );
};

export default Videos;
