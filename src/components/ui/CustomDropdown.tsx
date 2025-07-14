/**
 * 🚀 Developer Reference: /BLUEPRINT.md → UI Components
 * Component: Custom styled dropdown matching DriplyPay design
 * Features: Modern dark theme, smooth animations, custom styling
 */
'use client'

import { useState, useRef, useEffect } from 'react'

interface DropdownOption {
  value: string
  label: string
  description?: string
}

interface CustomDropdownProps {
  options: DropdownOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

const ChevronDownIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

export function CustomDropdown({ 
  options, 
  value, 
  onChange, 
  placeholder = "Select option",
  className = "",
  disabled = false
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedOption = options.find(option => option.value === value)

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg
          text-left text-white text-sm
          hover:border-gray-500/50 hover:bg-gray-800/70
          focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400/50
          transition-all duration-200
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${isOpen ? 'border-purple-400/50 bg-gray-800/70' : ''}
        `}
      >
        <div className="flex items-center justify-between">
          <span className={selectedOption ? 'text-white' : 'text-gray-400'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <div className={`text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}>
            <ChevronDownIcon />
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-gray-800 border border-gray-600/50 rounded-lg shadow-xl backdrop-blur-sm">
          <div className="py-1 max-h-60 overflow-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={`
                  w-full px-4 py-3 text-left hover:bg-gray-700/50
                  transition-colors duration-150
                  ${value === option.value ? 'bg-purple-500/20 text-purple-300' : 'text-white'}
                `}
              >
                <div className="text-sm font-medium">{option.label}</div>
                {option.description && (
                  <div className="text-xs text-gray-400 mt-1">{option.description}</div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
