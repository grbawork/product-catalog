import { useState } from 'react'

export const usePagination = (data, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(data.length / itemsPerPage)

  const currentData = () =>
    data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return { currentData, totalPages, setCurrentPage, currentPage }
}
