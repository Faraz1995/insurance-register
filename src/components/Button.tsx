import React from 'react'
import { cn } from '../util'

type Props = {
  classNames?: string
  onClick: () => void
  children: React.ReactNode
}

const Button = ({ children, classNames, onClick }: Props) => {
  return (
    <button
      className={cn(
        'bg-separ-primary text-white w-full rounded-xl py-2.5 cursor-pointer',
        classNames
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
