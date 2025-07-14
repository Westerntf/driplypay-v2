/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Profile Editor Features
 * Component: Image Upload Modal - Profile/cover image upload
 * Features: Drag & drop upload with preview and crop functionality
 */
'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ImageUploadModalProps {
  isOpen: boolean
  onClose: () => void
  onUpload: (file: File) => void
  uploadType: 'profile' | 'cover'
  currentImage?: string
  isUploading?: boolean
}

export function ImageUploadModal({ 
  isOpen, 
  onClose, 
  onUpload, 
  uploadType, 
  currentImage,
  isUploading = false 
}: ImageUploadModalProps) {
  const [dragActive, setDragActive] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0])
    }
  }, [])

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file)
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0])
    }
  }

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile)
    }
  }

  const handleReset = () => {
    setPreview(null)
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleClose = () => {
    handleReset()
    onClose()
  }

  const getTitle = () => {
    return uploadType === 'profile' ? 'Upload Profile Image' : 'Upload Cover Image'
  }

  const getDescription = () => {
    return uploadType === 'profile' 
      ? 'Choose a clear image that represents you. Square images work best.'
      : 'Upload a wide image for your profile header. Recommended size: 1200x400px.'
  }

  const getRecommendedSize = () => {
    return uploadType === 'profile' ? '400x400px' : '1200x400px'
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="relative bg-black/90 backdrop-blur-sm rounded-3xl p-8 border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">{getTitle()}</h2>
                  <p className="text-gray-400 text-sm mt-1">{getDescription()}</p>
                </div>
                <motion.button
                  onClick={handleClose}
                  className="w-10 h-10 text-gray-400 hover:text-white rounded-xl hover:bg-white/10 flex items-center justify-center transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={isUploading}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              {/* Current image preview */}
              {currentImage && !preview && (
                <div className="mb-6">
                  <label className="text-gray-400 text-sm font-medium mb-2 block">Current Image</label>
                  <div className="relative">
                    <img
                      src={currentImage}
                      alt={`Current ${uploadType} image`}
                      className={`w-full object-cover rounded-2xl border border-white/10 ${
                        uploadType === 'profile' ? 'h-40 max-w-40 mx-auto' : 'h-32'
                      }`}
                    />
                    <div className="absolute inset-0 bg-black/30 rounded-2xl flex items-center justify-center">
                      <span className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-lg">
                        Current
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Upload area */}
              <div
                className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                  dragActive 
                    ? 'border-blue-400 bg-blue-500/10' 
                    : 'border-white/20 hover:border-white/40 bg-white/5'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {preview ? (
                  // File preview
                  <div className="space-y-4">
                    <img
                      src={preview}
                      alt="Preview"
                      className={`w-full object-cover rounded-xl border border-white/20 ${
                        uploadType === 'profile' ? 'h-60 max-w-60 mx-auto' : 'h-48'
                      }`}
                    />
                    <div className="text-white">
                      <p className="font-medium">{selectedFile?.name}</p>
                      <p className="text-gray-400 text-sm">
                        {selectedFile && (selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                ) : (
                  // Upload prompt
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto">
                      <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-medium text-lg mb-2">
                        Drop your image here, or{' '}
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="text-blue-400 hover:text-blue-300 underline transition-colors duration-300"
                          disabled={isUploading}
                        >
                          browse
                        </button>
                      </p>
                      <p className="text-gray-400 text-sm">
                        Recommended size: {getRecommendedSize()}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        Supports: PNG, JPG, JPEG (max 10MB)
                      </p>
                    </div>
                  </div>
                )}

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                  disabled={isUploading}
                  aria-label={`Upload ${uploadType} image`}
                  title={`Upload ${uploadType} image`}
                />
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center mt-8">
                <div className="flex gap-3">
                  {preview && (
                    <motion.button
                      onClick={handleReset}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-medium transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isUploading}
                    >
                      Choose Different
                    </motion.button>
                  )}
                </div>

                <div className="flex gap-3">
                  <motion.button
                    onClick={handleClose}
                    className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isUploading}
                  >
                    Cancel
                  </motion.button>
                  
                  <motion.button
                    onClick={handleUpload}
                    disabled={!selectedFile || isUploading}
                    className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                      selectedFile && !isUploading
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
                        : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    }`}
                    whileHover={selectedFile && !isUploading ? { scale: 1.02 } : {}}
                    whileTap={selectedFile && !isUploading ? { scale: 0.98 } : {}}
                  >
                    {isUploading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      'Upload Image'
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Upload tips */}
              <motion.div 
                className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm mb-1">
                      {uploadType === 'profile' ? 'Profile Image Tips' : 'Cover Image Tips'}
                    </h4>
                    <ul className="text-gray-300 text-xs space-y-1">
                      {uploadType === 'profile' ? (
                        <>
                          <li>• Use a clear photo of yourself or your brand logo</li>
                          <li>• Square images (1:1 ratio) work best</li>
                          <li>• Ensure good lighting and high contrast</li>
                        </>
                      ) : (
                        <>
                          <li>• Use a wide banner-style image</li>
                          <li>• Keep important content in the center</li>
                          <li>• Consider how it looks on mobile devices</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
