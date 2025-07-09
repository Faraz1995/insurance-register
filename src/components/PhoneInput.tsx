import { useEffect, useState } from 'react'

interface PhoneInputProps {
  label?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  className?: string
  disabled?: boolean
  defaultCountryCode?: string
  name?: string
  inputRef?: React.Ref<HTMLInputElement>
}

// Main phone input component
const PhoneInput: React.FC<PhoneInputProps> = ({
  label,
  placeholder = 'XXX - XXX - XXXX',
  value,
  onChange,
  onBlur,
  className = '',
  disabled = false,
  defaultCountryCode = '+98',
  name,
  inputRef
}) => {
  const [countryCode, setCountryCode] = useState(defaultCountryCode)
  const [mainNumber, setMainNumber] = useState('')

  // Split value into countryCode and mainNumber when using value prop
  useEffect(() => {
    if (value) {
      const match = value.match(/^(\+\d{2})(.*)$/)
      if (match) {
        setCountryCode(match[1])
        setMainNumber(match[2])
      }
    }
  }, [value])

  const updatePhoneNumber = (newCountryCode: string, newMainNumber: string) => {
    const final = newCountryCode + newMainNumber
    const syntheticEvent = {
      target: {
        name,
        value: final
      }
    } as unknown as React.ChangeEvent<HTMLInputElement>

    onChange?.(syntheticEvent)
  }

  const handleMainNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = e.target.value
    setMainNumber(newNumber)
    updatePhoneNumber(countryCode, newNumber)
  }

  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCode = e.target.value
    setCountryCode(newCode)
    updatePhoneNumber(newCode, mainNumber)
  }

  return (
    <div dir='ltr' className={`w-full ${className}`}>
      {label && <p className='block text-xs text-[#505050] mb-2 text-right'>{label}</p>}

      <div className='relative'>
        <div className='flex items-center bg-white border rounded-lg shadow-sm overflow-hidden focus-within:border-separ-primary focus-within:ring-1'>
          {/* Country Code */}
          <div className='flex items-center border-l border-gray-300'>
            <input
              type='text'
              placeholder='+98'
              value={countryCode}
              onChange={handleCountryCodeChange}
              disabled={disabled}
              maxLength={4}
              className='w-16 px-3 py-3 text-sm text-gray-700 font-medium border-none outline-none text-center disabled:bg-gray-100 disabled:text-gray-500'
            />
          </div>
          <div className='h-8 w-0.5 bg-slate-300' />

          {/* Main Number */}
          <input
            type='tel'
            value={mainNumber}
            onChange={handleMainNumberChange}
            onBlur={onBlur}
            name={name}
            ref={inputRef}
            placeholder={placeholder}
            disabled={disabled}
            className='flex-1 px-3 py-3 text-sm text-gray-900 bg-transparent border-none outline-none placeholder-gray-400 disabled:bg-gray-50 disabled:text-gray-500'
          />
        </div>
      </div>
    </div>
  )
}

export default PhoneInput
