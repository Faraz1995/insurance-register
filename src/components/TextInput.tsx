import React from 'react'

interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  className?: string
}

const TextInput = React.forwardRef<HTMLInputElement, BaseInputProps>(
  ({ label, className = '', onChange, ...rest }, ref) => {
    return (
      <div className={`w-full ${className}`}>
        {label && <p className='block text-xs text-[#505050] mb-2 text-right'>{label}</p>}

        <div className='relative'>
          <div className='flex items-center bg-white border rounded-lg shadow-sm overflow-hidden focus-within:border-separ-primary focus-within:ring-1'>
            <input
              ref={ref}
              onChange={onChange}
              {...rest}
              className='flex-1 px-3 py-3 text-sm text-gray-900 bg-transparent border-none outline-none placeholder-gray-400 disabled:bg-gray-50 disabled:text-gray-500'
            />
          </div>
        </div>
      </div>
    )
  }
)

TextInput.displayName = 'TextInput'
export default TextInput
