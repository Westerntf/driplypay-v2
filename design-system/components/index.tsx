/**
 * 🧩 Design System Components
 * Reusable UI components for both user-facing and creator-facing interfaces
 */

import React from 'react'
import { cn } from '../utils'

// Base Card component
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'user' | 'creator'
  theme?: string
  children: React.ReactNode
}

export function Card({ 
  variant = 'user', 
  theme = 'clean',
  className, 
  children, 
  ...props 
}: CardProps) {
  const baseClasses = 'rounded-xl transition-all duration-200'
  
  const variantClasses = {
    user: theme === 'theme1' 
      ? 'bg-black/40 backdrop-blur-sm border-blue-400/20 hover:border-blue-400/40'
      : theme === 'theme2'
      ? 'bg-black/40 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/40'
      : 'bg-white/10 backdrop-blur-md border-white/20 hover:border-white/30',
    creator: 'bg-gray-950/80 backdrop-blur-sm border border-gray-800/40 hover:bg-gray-950/90 hover:border-gray-700/60'
  }
  
  return (
    <div 
      className={cn(baseClasses, variantClasses[variant], className)}
      {...props}
    >
      {children}
    </div>
  )
}

// Button component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  theme?: 'user' | 'creator'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export function Button({ 
  variant = 'primary',
  theme = 'user', 
  size = 'md',
  className,
  children,
  ...props 
}: ButtonProps) {
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  }
  
  const variantClasses = {
    user: {
      primary: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg',
      secondary: 'bg-white/10 hover:bg-white/20 text-white border border-white/20',
      ghost: 'text-white hover:bg-white/10',
      danger: 'bg-red-600 hover:bg-red-700 text-white'
    },
    creator: {
      primary: 'bg-white text-black hover:bg-gray-100 active:bg-gray-200',
      secondary: 'bg-gray-800 text-white border border-gray-700 hover:bg-gray-700',
      ghost: 'text-gray-300 hover:text-white hover:bg-gray-800/40',
      danger: 'bg-red-900/80 text-red-100 hover:bg-red-800/90 border border-red-800/40'
    }
  }
  
  return (
    <button 
      className={cn(
        baseClasses, 
        sizeClasses[size], 
        variantClasses[theme][variant], 
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

// Input component
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  theme?: 'user' | 'creator'
  label?: string
  error?: string
}

export function Input({ 
  theme = 'user',
  label,
  error,
  className,
  ...props 
}: InputProps) {
  const baseClasses = 'w-full rounded-lg px-4 py-2 transition-all duration-200 focus:outline-none focus:ring-2'
  
  const themeClasses = {
    user: 'bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-white/40 focus:ring-white/20',
    creator: 'bg-gray-900/60 backdrop-blur-sm border border-gray-700/40 text-white placeholder-gray-500 focus:border-gray-600 focus:ring-gray-600/20'
  }
  
  return (
    <div className="space-y-1">
      {label && (
        <label className={`block text-sm font-medium ${theme === 'creator' ? 'text-gray-300' : 'text-white'}`}>
          {label}
        </label>
      )}
      <input 
        className={cn(baseClasses, themeClasses[theme], error && 'border-red-500', className)}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  )
}

// Glass panel for layouts
interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: 'user' | 'creator'
  children: React.ReactNode
}

export function GlassPanel({ 
  theme = 'user',
  className,
  children,
  ...props 
}: GlassPanelProps) {
  const themeClasses = {
    user: 'bg-black/20 backdrop-blur-lg border border-white/20',
    creator: 'bg-gray-950/40 backdrop-blur-md border border-gray-800/30'
  }
  
  return (
    <div 
      className={cn('rounded-2xl', themeClasses[theme], className)}
      {...props}
    >
      {children}
    </div>
  )
}
