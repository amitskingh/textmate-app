import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { removeFilter, setFilter } from "../features/library/librarySlice" // Assuming a shared slice for filters

export const useFilters = (entity) => {
  const dispatch = useDispatch()
  const filters = useSelector((state) => state[entity]?.filters || {})
  const [searchParams, setSearchParams] = useSearchParams()

  // Update filter function
  const updateFilter = (key, value) => {
    dispatch(setFilter({ entity, key, value }))

    // Update search params in the URL
    const updatedParams = new URLSearchParams(searchParams)
    Object.entries({ ...filters, [key]: value }).forEach(([key, value]) => {
      if (value) {
        updatedParams.set(key, value)
      } else {
        updatedParams.delete(key)
      }
    })

    setSearchParams(updatedParams)
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
