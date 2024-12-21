import { useDispatch, useSelector } from "react-redux"
import { setFilter, removeFilter } from "../features/library/librarySlice"
import { useSearchParams } from "react-router-dom"

export const useFilters = () => {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const filters = useSelector((state) => state.library.filters)

  const updateFilter = (key, value) => {
    const updatedFilters = { ...filters, [key]: value }

    // Dispatch Redux action
    dispatch(setFilter({ key, value }))

    // Update SearchParams
    const updatedParams = new URLSearchParams(searchParams)
    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (value) updatedParams.set(key, value)
      else updatedParams.delete(key)
    })

    setSearchParams(updatedParams)
  }

  const resetFilter = () => {
    dispatch(removeFilter())
    setSearchParams({})
  }

  return { filters, updateFilter, resetFilter }
}
