import React from 'react'

interface RadioInputProps {
  label: string
  value: string
  name?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void // Add onBlur
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  className?: string
  ref?: React.Ref<HTMLInputElement> // Change inputRef to ref
}

const RadioInput: React.FC<RadioInputProps> = ({
  label,
  value,
  name,
  onChange,
  onBlur,
  checked,
  defaultChecked,
  disabled = false,
  className = '',
  ref
}) => {
  return (
    <label
      className={`flex items-center gap-2 cursor-pointer text-sm text-gray-800 ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      <input
        ref={ref} // Use ref instead of inputRef
        type='radio'
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur} // Add onBlur handler
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        className='peer hidden'
      />
      <span
        className={`
          w-5 h-5 rounded-full border-2 border-gray-400 
          flex items-center justify-center 
          
          peer-checked:ring-2 peer-checked:ring-separ-primary
          peer-checked:bg-separ-primary
          transition
        `}
      >
        <span
          className={`
            w-2.5 h-2.5 rounded-full 
            bg-separ-primary 
            scale-0 peer-checked:scale-100 
            transition-transform
          `}
        />
      </span>
      {label}
    </label>
  )
}

export default RadioInput
