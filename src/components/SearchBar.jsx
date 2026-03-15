import { useEffect, useState, useMemo } from 'react'
import debounce from 'lodash.debounce'

function SearchBar({ initialQuery = '', onChange }) {
  const [value, setValue] = useState(initialQuery)

  // Use a ref or useMemo to store the debounced callback so it doesn't recalculate
  const debouncedOnChange = useMemo(
    () => debounce((val) => {
      localStorage.setItem('dishcovery:search', val)
      onChange?.(val)
    }, 500),
    [onChange]
  )

  useEffect(() => {
    debouncedOnChange(value)
    // Cleanup pending debounced calls on unmount
    return () => debouncedOnChange.cancel()
  }, [value, debouncedOnChange])

  return (
    <div className="w-full relative">
      <label htmlFor="search" className="sr-only">Search recipes</label>
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg aria-hidden="true" className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
      <input
        id="search"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search dishes or ingredients..."
        className="block w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 py-3.5 text-base text-slate-800 shadow-sm placeholder-slate-400 outline-none transition-all duration-300 focus:border-rose-400 focus:ring-4 focus:ring-rose-500/20 focus:shadow-md"
      />
    </div>
  )
}

export default SearchBar