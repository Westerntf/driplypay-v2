/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Design System
 * Component: Main navigation with dashboard menu and auth integration
 * Features: Responsive nav, user menu, dashboard links, mobile navigation
 */
'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, User, CreditCard, QrCode, BarChart3, Settings, LogOut, ChevronDown, Edit, ExternalLink } from 'lucide-react'
import { useAuth } from '@/lib/auth'
import { GradientText } from '@/components/design-system'
import toast from 'react-hot-toast'

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [dashboardDropdownOpen, setDashboardDropdownOpen] = useState(false)
  const [paymentSettingsDropdownOpen, setPaymentSettingsDropdownOpen] = useState(false)
  const [settingsDropdownOpen, setSettingsDropdownOpen] = useState(false)
  
  // Mobile collapsible sections
  const [mobileDashboardOpen, setMobileDashboardOpen] = useState(false)
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false)
  const [mobilePaymentOpen, setMobilePaymentOpen] = useState(false)
  const [mobileSettingsOpen, setMobileSettingsOpen] = useState(false)
  
  const dropdownRef = useRef<HTMLDivElement>(null)
  const dashboardDropdownRef = useRef<HTMLDivElement>(null)
  const paymentSettingsDropdownRef = useRef<HTMLDivElement>(null)
  const settingsDropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const { user, signOut, profile } = useAuth()

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false)
      }
      if (dashboardDropdownRef.current && !dashboardDropdownRef.current.contains(event.target as Node)) {
        setDashboardDropdownOpen(false)
      }
      if (paymentSettingsDropdownRef.current && !paymentSettingsDropdownRef.current.contains(event.target as Node)) {
        setPaymentSettingsDropdownOpen(false)
      }
      if (settingsDropdownRef.current && !settingsDropdownRef.current.contains(event.target as Node)) {
        setSettingsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success('Signed out successfully')
      setIsOpen(false)
    } catch (error) {
      toast.error('Error signing out')
    }
  }

  const publicNavItems = [
    { href: '/', label: 'Home' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/features', label: 'Features' },
    { href: '/about', label: 'About' },
  ]

  const dashboardNavItems = [
    { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { href: '/dashboard/profile', label: 'Profile', icon: User },
    { href: '/dashboard/payments', label: 'Payments', icon: CreditCard },
    { href: '/dashboard/qr', label: 'QR Codes', icon: QrCode },
    { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-gray-700/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="inline-block px-6 py-2 bg-gradient-to-r from-gray-950 to-gray-900 rounded-full text-white border border-gray-700/50 shadow-xl hover:from-gray-900 hover:to-gray-800 transition-all duration-300">
              <span className="text-xl md:text-2xl font-black tracking-tight">
                DriplyPay
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              // Authenticated navigation
              <>
                {/* Dashboard Dropdown */}
                <div className="relative" ref={dashboardDropdownRef}>
                  <button
                    onClick={() => setDashboardDropdownOpen(!dashboardDropdownOpen)}
                    className={`inline-block px-5 py-2.5 bg-gradient-to-r from-gray-950 to-gray-900 rounded-full text-white border border-gray-700/50 shadow-lg hover:from-gray-900 hover:to-gray-800 transition-all duration-300 min-w-[120px] ${
                      isActive('/dashboard') || isActive('/dashboard/analytics')
                        ? 'shadow-xl border-gray-600/50'
                        : ''
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <BarChart3 className="w-4 h-4" />
                      <span className="text-sm font-semibold">Dashboard</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${dashboardDropdownOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </button>

                  {/* Dashboard Dropdown Menu */}
                  {dashboardDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-black/90 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl z-50">
                      <div className="py-2">
                        <Link
                          href="/dashboard"
                          onClick={() => setDashboardDropdownOpen(false)}
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                        >
                          <BarChart3 className="w-4 h-4" />
                          <span>Overview</span>
                        </Link>
                        <Link
                          href="/dashboard/analytics"
                          onClick={() => setDashboardDropdownOpen(false)}
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                        >
                          <BarChart3 className="w-4 h-4" />
                          <span>Analytics</span>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className={`inline-block px-5 py-2.5 bg-gradient-to-r from-gray-950 to-gray-900 rounded-full text-white border border-gray-700/50 shadow-lg hover:from-gray-900 hover:to-gray-800 transition-all duration-300 min-w-[120px] ${
                      isActive('/dashboard/profile') || isActive('/profile-editor') || (profile?.username && pathname.startsWith(`/${profile.username}`))
                        ? 'shadow-xl border-gray-600/50'
                        : ''
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <User className="w-4 h-4" />
                      <span className="text-sm font-semibold">Profile</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {profileDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-black/90 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl z-50">
                      <div className="py-2">
                        <Link
                          href="/profile-editor"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                          <span>Live Profile Editor</span>
                        </Link>
                        <Link
                          href={profile?.username ? `/${profile.username}` : '/profile-editor'}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>View Public Profile</span>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Payment Settings Dropdown */}
                <div className="relative" ref={paymentSettingsDropdownRef}>
                  <button
                    onClick={() => setPaymentSettingsDropdownOpen(!paymentSettingsDropdownOpen)}
                    className={`inline-block px-5 py-2.5 bg-gradient-to-r from-gray-950 to-gray-900 rounded-full text-white border border-gray-700/50 shadow-lg hover:from-gray-900 hover:to-gray-800 transition-all duration-300 min-w-[160px] ${
                      isActive('/dashboard/payments') || isActive('/dashboard/qr')
                        ? 'shadow-xl border-gray-600/50'
                        : ''
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <CreditCard className="w-4 h-4" />
                      <span className="text-sm font-semibold">Payment Settings</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${paymentSettingsDropdownOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </button>

                  {/* Payment Settings Dropdown Menu */}
                  {paymentSettingsDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-black/90 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl z-50">
                      <div className="py-2">
                        <Link
                          href="/dashboard/payments"
                          onClick={() => setPaymentSettingsDropdownOpen(false)}
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                        >
                          <CreditCard className="w-4 h-4" />
                          <span>Payments</span>
                        </Link>
                        <Link
                          href="/dashboard/qr"
                          onClick={() => setPaymentSettingsDropdownOpen(false)}
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                        >
                          <QrCode className="w-4 h-4" />
                          <span>QR Codes</span>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Settings Dropdown */}
                <div className="relative" ref={settingsDropdownRef}>
                  <button
                    onClick={() => setSettingsDropdownOpen(!settingsDropdownOpen)}
                    className={`inline-block px-5 py-2.5 bg-gradient-to-r from-gray-950 to-gray-900 rounded-full text-white border border-gray-700/50 shadow-lg hover:from-gray-900 hover:to-gray-800 transition-all duration-300 min-w-[120px] ${
                      isActive('/dashboard/settings')
                        ? 'shadow-xl border-gray-600/50'
                        : ''
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Settings className="w-4 h-4" />
                      <span className="text-sm font-semibold">Settings</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${settingsDropdownOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </button>

                  {/* Settings Dropdown Menu */}
                  {settingsDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-black/90 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl z-50">
                      <div className="py-2">
                        <Link
                          href="/dashboard/settings"
                          onClick={() => setSettingsDropdownOpen(false)}
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                        >
                          <Settings className="w-4 h-4" />
                          <span>Account Settings</span>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile Info and Sign Out */}
                <div className="flex items-center space-x-3">
                  {profile && (
                    <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-800/50">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-700">
                        {profile.avatar_url ? (
                          <Image 
                            src={profile.avatar_url} 
                            alt={profile.display_name || profile.username} 
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <User className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                      <span className="text-sm font-medium text-gray-300">
                        {profile.display_name || profile.username}
                      </span>
                    </div>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="inline-block px-5 py-2.5 bg-gradient-to-r from-gray-950 to-gray-900 rounded-full text-white border border-gray-700/50 shadow-lg hover:from-gray-900 hover:to-gray-800 transition-all duration-300 min-w-[120px]"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm font-semibold">Sign Out</span>
                    </div>
                  </button>
                </div>
              </>
            ) : (
              // Public navigation
              <>
                {publicNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`inline-block px-5 py-2.5 bg-gradient-to-r from-gray-950 to-gray-900 rounded-full text-white border border-gray-700/50 shadow-lg hover:from-gray-900 hover:to-gray-800 transition-all duration-300 min-w-[100px] text-center ${
                      isActive(item.href)
                        ? 'shadow-xl border-gray-600/50'
                        : ''
                    }`}
                  >
                    <span className="text-sm font-semibold">{item.label}</span>
                  </Link>
                ))}
                <Link
                  href="/signup"
                  className="inline-block px-8 py-3 bg-gradient-to-r from-gray-950 to-gray-900 rounded-full text-white border border-gray-700/50 shadow-xl hover:from-gray-900 hover:to-gray-800 transition-all duration-300 transform hover:scale-105 min-w-[140px] text-center"
                >
                  <span className="text-base font-bold">Get Started</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <div className="space-y-2">
              {user ? (
                // Authenticated mobile navigation
                <>
                  {/* Dashboard Section - Collapsible */}
                  <div className="space-y-1">
                    <button
                      onClick={() => setMobileDashboardOpen(!mobileDashboardOpen)}
                      className="flex items-center justify-between w-full px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-300 transition-colors"
                    >
                      <span>Dashboard</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${mobileDashboardOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileDashboardOpen && (
                      <div className="space-y-1">
                        <Link
                          href="/dashboard"
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center space-x-3 px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                            isActive('/dashboard') && pathname === '/dashboard'
                              ? 'text-white bg-gray-800'
                              : 'text-gray-300 hover:text-white hover:bg-gray-800'
                          }`}
                        >
                          <BarChart3 className="w-4 h-4" />
                          <span>Overview</span>
                        </Link>
                        <Link
                          href="/dashboard/analytics"
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center space-x-3 px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                            isActive('/dashboard/analytics')
                              ? 'text-white bg-gray-800'
                              : 'text-gray-300 hover:text-white hover:bg-gray-800'
                          }`}
                        >
                          <BarChart3 className="w-4 h-4" />
                          <span>Analytics</span>
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Profile Section - Collapsible */}
                  <div className="space-y-1">
                    <button
                      onClick={() => setMobileProfileOpen(!mobileProfileOpen)}
                      className="flex items-center justify-between w-full px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-300 transition-colors"
                    >
                      <span>Profile</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${mobileProfileOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileProfileOpen && (
                      <div className="space-y-1">
                        <Link
                          href="/profile-editor"
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center space-x-3 px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                            isActive('/profile-editor')
                              ? 'text-white bg-gray-800'
                              : 'text-gray-300 hover:text-white hover:bg-gray-800'
                          }`}
                        >
                          <Edit className="w-4 h-4" />
                          <span>Live Profile Editor</span>
                        </Link>
                        <Link
                          href={profile?.username ? `/${profile.username}` : '/profile-editor'}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center space-x-3 px-6 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>View Public Profile</span>
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Payment Settings Section - Collapsible */}
                  <div className="space-y-1">
                    <button
                      onClick={() => setMobilePaymentOpen(!mobilePaymentOpen)}
                      className="flex items-center justify-between w-full px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-300 transition-colors"
                    >
                      <span>Payment Settings</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${mobilePaymentOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {mobilePaymentOpen && (
                      <div className="space-y-1">
                        <Link
                          href="/dashboard/payments"
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center space-x-3 px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                            isActive('/dashboard/payments')
                              ? 'text-white bg-gray-800'
                              : 'text-gray-300 hover:text-white hover:bg-gray-800'
                          }`}
                        >
                          <CreditCard className="w-4 h-4" />
                          <span>Payments</span>
                        </Link>
                        <Link
                          href="/dashboard/qr"
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center space-x-3 px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                            isActive('/dashboard/qr')
                              ? 'text-white bg-gray-800'
                              : 'text-gray-300 hover:text-white hover:bg-gray-800'
                          }`}
                        >
                          <QrCode className="w-4 h-4" />
                          <span>QR Codes</span>
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Settings Section - Collapsible */}
                  <div className="space-y-1">
                    <button
                      onClick={() => setMobileSettingsOpen(!mobileSettingsOpen)}
                      className="flex items-center justify-between w-full px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-300 transition-colors"
                    >
                      <span>Settings</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${mobileSettingsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileSettingsOpen && (
                      <div className="space-y-1">
                        <Link
                          href="/dashboard/settings"
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center space-x-3 px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                            isActive('/dashboard/settings')
                              ? 'text-white bg-gray-800'
                              : 'text-gray-300 hover:text-white hover:bg-gray-800'
                          }`}
                        >
                          <Settings className="w-4 h-4" />
                          <span>Account Settings</span>
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Profile Info and Sign Out */}
                  <div className="border-t border-gray-800 pt-4 mt-4">
                    {profile && (
                      <div className="flex items-center space-x-3 px-4 py-3 mb-3 rounded-lg bg-gray-800/50">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-700">
                          {profile.avatar_url ? (
                            <Image 
                              src={profile.avatar_url} 
                              alt={profile.display_name || profile.username} 
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <User className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">
                            {profile.display_name || profile.username}
                          </div>
                          <div className="text-xs text-gray-400">
                            @{profile.username}
                          </div>
                        </div>
                      </div>
                    )}
                    <button
                      onClick={handleSignOut}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors w-full text-left"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </>
              ) : (
                // Public mobile navigation
                <>
                  {publicNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive(item.href)
                          ? 'text-white bg-gray-800'
                          : 'text-gray-300 hover:text-white hover:bg-gray-800'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="pt-2 mt-2 border-t border-gray-800">
                    <Link
                      href="/signup"
                      onClick={() => setIsOpen(false)}
                      className="block btn-primary text-center py-3 text-sm"
                    >
                      Get Started
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
