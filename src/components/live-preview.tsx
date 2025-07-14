/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Profile Editor Features
 * Component: Live preview toggle and modal for profile editing
 * Features: Preview mode switching, modal display, mobile/desktop preview
 */
'use client'

import { useState } from 'react'
import { Eye, EyeOff, X, ExternalLink, Smartphone, Monitor } from 'lucide-react'
import { useLivePreview } from '@/lib/live-preview'
import { GlassCard, PrimaryButton } from '@/components/design-system'

export function LivePreviewToggle() {
  const { previewMode, setPreviewMode } = useLivePreview()
  
  return (
    <button
      onClick={() => setPreviewMode(!previewMode)}
      className={`fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg transition-all ${
        previewMode 
          ? 'bg-purple-500 text-white hover:bg-purple-600' 
          : 'glass-secondary text-gray-300 hover:text-white border border-gray-700 hover:border-gray-600'
      }`}
      title={previewMode ? 'Exit Preview Mode' : 'Enter Preview Mode'}
    >
      {previewMode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
    </button>
  )
}

export function LivePreviewModal() {
  const { previewMode, setPreviewMode, profileData } = useLivePreview()
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('mobile')

  if (!previewMode) return null

  const previewUrl = `/preview-profile`

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-6xl h-full max-h-[90vh] bg-gray-900 rounded-xl border border-gray-700 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-white">Live Preview</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('mobile')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'mobile' 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-gray-800 text-gray-400 hover:text-white'
                }`}
                title="Mobile View"
              >
                <Smartphone className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('desktop')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'desktop' 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-gray-800 text-gray-400 hover:text-white'
                }`}
                title="Desktop View"
              >
                <Monitor className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <a
              href={`/${profileData.username || 'preview-user'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
              title="Open in New Tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={() => setPreviewMode(false)}
              className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
              title="Close Preview"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Preview Frame */}
        <div className="flex-1 p-4 bg-gray-800">
          <div className={`mx-auto h-full bg-white rounded-lg overflow-hidden shadow-2xl ${
            viewMode === 'mobile' ? 'max-w-sm' : 'max-w-full'
          }`}>
            <iframe
              src={previewUrl}
              className="w-full h-full border-0"
              title="Profile Preview"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700 bg-gray-900">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Preview updates automatically as you make changes
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => window.open(`/${profileData.username || 'preview-user'}`, '_blank')}
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
              >
                View Full Page →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
