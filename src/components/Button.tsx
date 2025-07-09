import React from 'react'
import { cn } from '../util'

type Props = {
  classNames?: string
  onClick: () => void
  children: React.ReactNode
  disabled?: boolean
  loading?: boolean
}

const Button = ({ children, classNames, onClick, disabled, loading }: Props) => {
  return (
    <button
      className={cn(
        'bg-separ-primary text-white w-full rounded-xl py-2.5 cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed',
        classNames
      )}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <div className='flex items-center justify-center'>
          {/* Spinner */}
          <svg
            className='animate-spin h-5 w-5 text-white'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            ></path>
          </svg>
        </div>
      ) : (
        children
      )}
    </button>
  )
}

export default Button
