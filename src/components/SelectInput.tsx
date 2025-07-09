import React, { useEffect, useRef, useState } from 'react'

interface Option {
  label: string
  value: string
}

interface SelectInputProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string
  className?: string
  placeholder?: string
  options?: Option[]
  searchable?: boolean
  fetchOptions?: (query: string) => Promise<Option[]>
  onChange?: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void // Add onBlur
  name?: string
}

const SelectInput = React.forwardRef<
  HTMLInputElement | HTMLSelectElement,
  SelectInputProps
>(
  (
    {
      label,
      className = '',
      placeholder = 'یک گزینه انتخاب کنید',
      value,
      name,
      onChange,
      onBlur, // Add onBlur
      options = [],
      searchable = false,
      fetchOptions,
      disabled = false,
      ...rest
    },
    ref
  ) => {
    const [internalOptions, setInternalOptions] = useState<Option[]>(options)
    const [query, setQuery] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)
    const debounceRef = useRef<number | null>(null)

    // Fetch options when searchable
    useEffect(() => {
      if (!searchable || !fetchOptions) return

      if (debounceRef.current) clearTimeout(debounceRef.current)

      debounceRef.current = setTimeout(async () => {
        const fetched = await fetchOptions(query)
        setInternalOptions(fetched)
      }, 400)

      return () => {
        if (debounceRef.current) clearTimeout(debounceRef.current)
      }
    }, [query, fetchOptions, searchable])

    return (
      <div className={`w-full relative ${className}`}>
        {label && <p className='block text-xs text-[#505050] mb-2 text-right'>{label}</p>}

        {searchable ? (
          <>
            <input
              type='text'
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setShowDropdown(true)
                // Also call the onChange from register to update form state
                if (onChange) {
                  onChange({
                    target: { value: e.target.value, name, type: 'text' }
                  } as React.ChangeEvent<HTMLInputElement>)
                }
              }}
              onBlur={onBlur} // Add onBlur handler
              placeholder={placeholder}
              disabled={disabled}
              name={name}
              ref={ref as React.Ref<HTMLInputElement>}
              className='w-full px-3 py-3 text-sm text-gray-900 bg-white border rounded-lg shadow-sm outline-none focus:border-separ-primary focus:ring-1'
            />

            {showDropdown && internalOptions.length > 0 && (
              <div className='absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-48 overflow-auto'>
                {internalOptions.map((opt) => (
                  <div
                    key={opt.value}
                    onClick={() => {
                      if (onChange) {
                        onChange({
                          target: { value: opt.value, name, type: 'select-one' }
                        } as React.ChangeEvent<HTMLSelectElement>)
                      }
                      setQuery(opt.label)
                      setShowDropdown(false)
                    }}
                    className='px-4 py-2 text-sm cursor-pointer hover:bg-gray-100'
                  >
                    {opt.label}
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className='flex items-center bg-white border rounded-lg shadow-sm overflow-hidden focus-within:border-separ-primary focus-within:ring-1'>
            <select
              name={name}
              ref={ref as React.Ref<HTMLSelectElement>}
              value={value}
              onChange={onChange}
              onBlur={onBlur} // Add onBlur handler
              disabled={disabled}
              {...rest}
              className='flex-1 px-3 py-3 text-sm text-gray-900 bg-transparent border-none outline-none disabled:bg-gray-50 disabled:text-gray-500 appearance-none'
            >
              <option value='' disabled hidden>
                {placeholder}
              </option>
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    )
  }
)

SelectInput.displayName = 'SelectInput'
export default SelectInput
