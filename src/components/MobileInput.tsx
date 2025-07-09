import { useEffect, useState } from 'react'

interface PhoneInputProps {
  label?: string
  placeholder?: string
  onChange?: (fullPhoneNumber: string) => void
  value?: string
  className?: string
  disabled?: boolean
}

// Main phone input component
const PhoneInput: React.FC<PhoneInputProps> = ({
  label,
  placeholder = 'XXX - XXX - XXXX',
  onChange,
  value,
  className = '',
  disabled = false
}) => {
  const [countryCode, setCountryCode] = useState('+98')
  const [mainNumber, setMainNumber] = useState('')

  useEffect(() => {
    if (value) {
      const match = value.match(/^(\+\d{2})(.*)$/)
      if (match) {
        setCountryCode(match[1])
        setMainNumber(match[2])
      }
    }
  }, [])

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = e.target.value
    setMainNumber(newNumber)
    if (onChange) {
      updatePhoneNumber(countryCode, newNumber)
    }
  }

  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCountryCode = e.target.value
    setCountryCode(newCountryCode)
    if (onChange) {
      updatePhoneNumber(newCountryCode, mainNumber)
    }
  }

  const updatePhoneNumber = (countryCode: string, number: string) => {
    const final = countryCode + number

    if (onChange) {
      onChange(final)
    }
  }

  return (
    <div className={`w-full ${className}`}>
      {label && <p className='block text-xs text-[#505050] mb-2 text-right'>{label}</p>}

      <div className='relative'>
        <div
          className={`flex items-center bg-white border rounded-lg shadow-sm overflow-hidden focus-within:border-separ-primary focus-within:ring-1`}
        >
          {/* Country Code Section */}
          <div className='flex items-center border-l border-gray-300'>
            <input
              type='text'
              placeholder='+98'
              value={countryCode}
              onChange={handleCountryCodeChange}
              disabled={disabled}
              maxLength={3}
              className='w-16 px-3 py-3 text-sm text-gray-700 font-medium border-none outline-none text-center disabled:bg-gray-100 disabled:text-gray-500'
            />
          </div>
          <div className='h-8 w-0.5 bg-slate-300' />

          {/* Main Number Input */}
          <input
            type='tel'
            value={mainNumber}
            onChange={handleNumberChange}
            placeholder={placeholder}
            disabled={disabled}
            className='flex-1 px-3 py-3 text-sm text-gray-900 bg-transparent border-none outline-none placeholder-gray-400 disabled:bg-gray-50 disabled:text-gray-500  '
          />
        </div>
      </div>
    </div>
  )
}

export default PhoneInput
