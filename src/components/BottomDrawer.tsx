import React from 'react'
import ReactDOM from 'react-dom'

interface BottomDrawerProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const BottomDrawer: React.FC<BottomDrawerProps> = ({ isOpen, onClose, children }) => {
  if (typeof window === 'undefined') return null
  if (!isOpen) return null

  return ReactDOM.createPortal(
    <div className='fixed inset-0 z-50'>
      {/* Overlay (behind the drawer) */}
      <div className='absolute inset-0 bg-black/50' onClick={onClose} />

      {/* Drawer (on top of overlay) */}
      <div className='absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 shadow-xl'>
        <div>{children}</div>
      </div>
    </div>,
    document.body
  )
}

export default BottomDrawer
