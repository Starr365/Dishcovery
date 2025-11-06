import { useEffect, useState } from 'react'

function SearchBar({ initialQuery = '', onChange }) {
  const [value, setValue] = useState(initialQuery)

  // Persist input value and notify parent
  useEffect(() => {
    localStorage.setItem('dishcovery:search', value)
    onChange?.(value)
  }, [value, onChange])

  return (
    <div className="w-full">
      <label htmlFor="search" className="sr-only">Search recipes</label>
      <input
        id="search"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search by name or ingredient..."
        className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-base text-(--color-text) shadow-sm outline-none transition focus:ring-4 focus:ring-primary/20"
      />
    </div>
  )
}

export default SearchBar