/**
 * 🚀import Link from 'next/link'
import { Github, Twitter, Mail, Heart } from 'lucide-react'
import { GradientText, Section } from '@/components/design-system'veloper Reference: /BLUEPRINT.md →   return (
    <footer className="bg-black border-t border-gray-800">
      <Section className="py-16">System
 * Component: Site footer with links and branding
 * Features: Link organization, social links, responsive layout
 */
'use client'

import Link from 'next/link'
import { Github, Twitter, Mail, Heart, Zap } from 'lucide-react'
import { GradientText, Section } from '@/components/design-system'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    product: [
      { href: '/features', label: 'Features' },
      { href: '/pricing', label: 'Pricing' },
      { href: '/about', label: 'About' },
      { href: '/signup', label: 'Get Started' },
    ],
    support: [
      { href: '/help', label: 'Help Center' },
      { href: '/contact', label: 'Contact Us' },
      { href: '/status', label: 'Status' },
      { href: '/updates', label: 'Updates' },
    ],
    legal: [
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
      { href: '/cookies', label: 'Cookie Policy' },
      { href: '/security', label: 'Security' },
    ],
    creators: [
      { href: '/creators', label: 'For Creators' },
      { href: '/resources', label: 'Resources' },
      { href: '/blog', label: 'Blog' },
      { href: '/community', label: 'Community' },
    ],
  }

  const socialLinks = [
    { href: 'https://twitter.com/driplypay', icon: Twitter, label: 'Twitter' },
    { href: 'https://github.com/driplypay', icon: Github, label: 'GitHub' },
    { href: 'mailto:hello@driplypay.com', icon: Mail, label: 'Email' },
  ]

  return (
    <footer className="bg-black border-t border-gray-800">
      <Section className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-gray-950 to-gray-900 rounded-full text-white border border-gray-700/50 shadow-lg hover:from-gray-900 hover:to-gray-800 transition-all duration-300">
                <span className="text-lg font-black tracking-tight">
                  DriplyPay
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm mb-6 max-w-xs">
              The payment platform built for creators who want to own their income and audience.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Creators Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Creators</h3>
            <ul className="space-y-3">
              {footerLinks.creators.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>© {currentYear} DriplyPay. All rights reserved.</span>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>for creators</span>
            </div>
          </div>
        </div>
      </Section>
    </footer>
  )
}
