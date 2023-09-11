import { CategoryType } from '../../../types'
import { useDispatch } from 'react-redux'
import { setSelectedCategoryId } from '../../redux/slices/videosSlice'

interface CategoryProps{
    category:CategoryType | null
    status:string
    title:string
}

const Box = ({category, status, title}:CategoryProps) => {
    const dispatch = useDispatch()

const handleCategory = () => {
  if(title === 'All'){
     dispatch(setSelectedCategoryId(''))
  }else{
    dispatch(setSelectedCategoryId(category?.id))
  }
}
  return (
    <span
    onClick={handleCategory}
    className={`${status === 'active' ? " dark:text-stone-900 bg-stone-900 dark:bg-zinc-200 text-white":"bg-white text-black dark:bg-stone-900 dark:text-white"} min-w-fit h-fit  cursor-pointer  px-2 rounded-md`}
  >
    {title}
  </span>
  )
}

export default Box