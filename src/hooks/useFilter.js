import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"

export const useFilters = (entity, removeFilter, setFilter) => {
  const dispatch = useDispatch()
  const filters = useSelector((state) => state[entity]?.filters || {})
  const [searchParams, setSearchParams] = useSearchParams()

  // Update filter function
  const updateFilter = (key, value) => {
    dispatch(setFilter({ key, value }))

    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams)
      if (value) {
        newParams.set(key, value)
      } else {
        newParams.delete(key)
      }
      return newParams
    })
  }

  // Reset filter function
  const resetFilter = () => {
    dispatch(removeFilter(entity))

    // Clear search params from the URL
    const updatedParams = new URLSearchParams(searchParams)
    Object.keys(filters).forEach((key) => {
      updatedParams.delete(key)
    })

    setSearchParams(updatedParams)
  }

  return { filters, updateFilter, resetFilter }
}
