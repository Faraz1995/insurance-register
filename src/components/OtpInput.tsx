import React, { useRef } from 'react'
import { cn } from '../util'

type OtpInputProps = {
  value: string
  onChange: (value: string) => void
  error?: boolean
  disabled?: boolean
}

export const OtpInput: React.FC<OtpInputProps> = ({
  value,
  onChange,
  error = false,
  disabled = false
}) => {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newVal = e.target.value.replace(/\D/, '') // Only digits
    if (!newVal) return

    const newOtp = value.split('')
    newOtp[index] = newVal[0]
    onChange(newOtp.join(''))

    if (index < 4) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      const newOtp = value.split('')
      if (value[index]) {
        newOtp[index] = ''
        onChange(newOtp.join(''))
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus()
      }
    }
  }

  return (
    <div className='flex flex-row-reverse gap-2'>
      {Array.from({ length: 5 }).map((_, index) => (
        <input
          key={index}
          ref={(el: HTMLInputElement | null) => {
            inputsRef.current[index] = el
          }}
          type='text'
          inputMode='numeric'
          maxLength={1}
          disabled={disabled}
          value={value[index] || ''}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className={cn(
            'w-10 h-12 text-center text-xl border rounded-md outline-none transition-colors',
            error ? 'border-red-500' : 'border-gray-300 focus:border-separ-primary'
          )}
        />
      ))}
    </div>
  )
}
