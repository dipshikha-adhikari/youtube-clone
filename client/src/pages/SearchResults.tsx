import { useEffect } from 'react'
import VideosSkeleton  from '../components/skeleton/VideosSkeleton'

const SearchResults = () => {
  let videos:any


  
console.log(videos)

if(videos === undefined) return <VideosSkeleton/>

  return (
    <div>SearchResults</div>
  )
}

export default SearchResults