/**
 * 🚀 Developer Reference: /BLUEPRINT.md → QR Code Components
 * Component: Enhanced QR Code Manager
 * Features: Generate, customize, and manage QR codes with analytics and linking
 */

'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { QrCode, Download, Link, Eye, BarChart3, Palette, X, Plus } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface QRCodeData {
  id: string
  type: string
  target_id?: string
  amount?: number
  scans: number
  created_at: string
  updated_at: string
  // Legacy/missing fields - provide defaults
  data_content?: string
  name?: string
  description?: string
  qr_image_url?: string
  style_preset?: string
  foreground_color?: string
  background_color?: string
  logo_url?: string
  corner_style?: string
  scan_count?: number
  linked_social_link_id?: string
  linked_payment_method_id?: string
  include_payment_amount?: boolean
  payment_amount?: number
  last_scanned_at?: string
}

interface QRCodeManagerProps {
  socialLinks: Array<{
    id: string
    platform: string
    username: string
    url: string
  }>
  walletMethods: Array<{
    id: string
    platform: string
    name: string
    account_identifier: string
    payment_type: 'external' | 'internal'
  }>
  userId: string
  profileUrl: string
  onQRUpdate?: () => void
}

export function QRCodeManager({ 
  socialLinks, 
  walletMethods, 
  userId, 
  profileUrl, 
  onQRUpdate 
}: QRCodeManagerProps) {
  const [qrCodes, setQRCodes] = useState<QRCodeData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const { toast } = useToast()

  // Form state
  const [formData, setFormData] = useState({
    type: 'profile',
    data_content: profileUrl,
    name: 'My Profile QR',
    description: '',
    style_preset: 'default',
    foreground_color: '#000000',
    background_color: '#FFFFFF',
    logo_url: '',
    corner_style: 'square',
    linked_social_link_id: '',
    linked_payment_method_id: '',
    include_payment_amount: false,
    payment_amount: 0
  })

  // Predefined QR types
  const qrTypes = [
    { value: 'profile', label: 'Profile Link', description: 'Link to your complete profile' },
    { value: 'social', label: 'Social Link', description: 'Direct link to social platform' },
    { value: 'payment', label: 'Payment Link', description: 'Direct payment link' },
    { value: 'url', label: 'Custom URL', description: 'Any custom website URL' },
    { value: 'contact', label: 'Contact Info', description: 'Your contact information' },
    { value: 'text', label: 'Plain Text', description: 'Any text content' }
  ]

  const stylePresets = [
    { value: 'default', label: 'Default', colors: { fg: '#000000', bg: '#FFFFFF' } },
    { value: 'dark', label: 'Dark', colors: { fg: '#FFFFFF', bg: '#000000' } },
    { value: 'brand', label: 'Brand', colors: { fg: '#3B82F6', bg: '#F8FAFC' } },
    { value: 'neon', label: 'Neon', colors: { fg: '#10B981', bg: '#065F46' } },
    { value: 'sunset', label: 'Sunset', colors: { fg: '#F59E0B', bg: '#FEF3C7' } }
  ]

  const cornerStyles = [
    { value: 'square', label: 'Square' },
    { value: 'rounded', label: 'Rounded' },
    { value: 'dots', label: 'Dots' },
    { value: 'extra-rounded', label: 'Extra Rounded' }
  ]

  // Update data content based on type and selections
  const updateDataContent = useCallback(() => {
    let content = ''
    
    switch (formData.type) {
      case 'profile':
        content = profileUrl
        break
      case 'social':
        const selectedSocial = socialLinks.find(link => link.id === formData.linked_social_link_id)
        content = selectedSocial?.url || ''
        break
      case 'payment':
        const selectedPayment = walletMethods.find(method => method.id === formData.linked_payment_method_id)
        if (selectedPayment) {
          // You could add payment-specific URL logic here
          content = `${profileUrl}?pay=${selectedPayment.id}`
          if (formData.include_payment_amount && formData.payment_amount > 0) {
            content += `&amount=${formData.payment_amount}`
          }
        }
        break
      default:
        content = formData.data_content
    }
    
    setFormData(prev => ({ ...prev, data_content: content }))
  }, [formData.type, formData.linked_social_link_id, formData.linked_payment_method_id, formData.include_payment_amount, formData.payment_amount, formData.data_content, profileUrl, socialLinks, walletMethods])

  // Load QR codes
  const loadQRCodes = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/qr-codes?userId=${userId}`)
      const data = await response.json()
      
      if (response.ok) {
        setQRCodes(data.qrCodes || [])
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to load QR codes",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Error loading QR codes:', error)
      toast({
        title: "Error",
        description: "Failed to load QR codes",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }, [userId, toast])

  // Apply style preset
  const applyStylePreset = (preset: string) => {
    const style = stylePresets.find(s => s.value === preset)
    if (style) {
      setFormData(prev => ({
        ...prev,
        style_preset: preset,
        foreground_color: style.colors.fg,
        background_color: style.colors.bg
      }))
    }
  }

  // Generate QR code
  const handleGenerateQR = async () => {
    if (!formData.name || !formData.data_content) {
      toast({
        title: "Error",
        description: "Please provide a name and content for the QR code",
        variant: "destructive"
      })
      return
    }

    setIsGenerating(true)
    try {
      const response = await fetch('/api/qr-codes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Success",
          description: "QR code generated successfully!"
        })
        
        // Reset form
        setFormData({
          type: 'profile',
          data_content: profileUrl,
          name: 'My Profile QR',
          description: '',
          style_preset: 'default',
          foreground_color: '#000000',
          background_color: '#FFFFFF',
          logo_url: '',
          corner_style: 'square',
          linked_social_link_id: '',
          linked_payment_method_id: '',
          include_payment_amount: false,
          payment_amount: 0
        })
        setShowCreateForm(false)
        
        // Reload QR codes
        loadQRCodes()
        onQRUpdate?.()
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to generate QR code",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Error generating QR code:', error)
      toast({
        title: "Error",
        description: "Failed to generate QR code",
        variant: "destructive"
      })
    } finally {
      setIsGenerating(false)
    }
  }

  // Delete QR code
  const handleDeleteQR = async (qrId: string) => {
    try {
      const response = await fetch(`/api/qr-codes?id=${qrId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "QR code deleted successfully"
        })
        loadQRCodes()
        onQRUpdate?.()
      } else {
        const data = await response.json()
        toast({
          title: "Error",
          description: data.error || "Failed to delete QR code",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Error deleting QR code:', error)
      toast({
        title: "Error",
        description: "Failed to delete QR code",
        variant: "destructive"
      })
    }
  }

  // Download QR code
  const handleDownloadQR = (qrCode: QRCodeData) => {
    if (!qrCode.qr_image_url) {
      toast({
        title: "Error",
        description: "QR code image not available",
        variant: "destructive"
      })
      return
    }
    
    const link = document.createElement('a')
    link.href = qrCode.qr_image_url
    link.download = `${(qrCode.name || 'QR_Code').replace(/\s+/g, '_')}_QR.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Get analytics for QR code
  const getQRAnalytics = async (qrId: string) => {
    try {
      const response = await fetch(`/api/qr-codes/analytics?qrCodeId=${qrId}`)
      const data = await response.json()
      
      if (response.ok) {
        // You could show this in a modal or separate analytics view
        console.log('QR Analytics:', data.analytics)
        toast({
          title: "Analytics",
          description: `Total scans: ${data.analytics.totalScans}, Unique users: ${data.analytics.uniqueUsers}`
        })
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
    }
  }

  // Update data content when type or selections change
  useEffect(() => {
    updateDataContent()
  }, [updateDataContent])

  // Load QR codes on mount
  useEffect(() => {
    loadQRCodes()
  }, [loadQRCodes])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">QR Code Manager</h3>
          <p className="text-sm text-muted-foreground">
            Generate custom QR codes for your profile, social links, and payments
          </p>
        </div>
        <Button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="gap-2 bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white border-0"
        >
          <Plus className="h-4 w-4" />
          Create QR Code
        </Button>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <Card className="relative bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20">
          {/* Gradient accent overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-lg pointer-events-none" />
          <CardHeader className="relative">
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5 text-blue-500" />
              Generate New QR Code
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-blue-500/5 to-purple-500/5 border border-blue-400/20">
                <TabsTrigger value="content" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-400 data-[state=active]:to-purple-400 data-[state=active]:text-white">Content</TabsTrigger>
                <TabsTrigger value="style" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-400 data-[state=active]:to-purple-400 data-[state=active]:text-white">Style</TabsTrigger>
                <TabsTrigger value="linking" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-400 data-[state=active]:to-purple-400 data-[state=active]:text-white">Linking</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>QR Code Type</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value: string) => setFormData(prev => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger className="border-blue-400/20 focus:border-blue-400/50 focus:ring-blue-400/25">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {qrTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div>
                              <div className="font-medium">{type.label}</div>
                              <div className="text-xs text-muted-foreground">{type.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Name</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="My Profile QR"
                      className="border-blue-400/20 focus:border-blue-400/50 focus:ring-blue-400/25"
                    />
                  </div>
                </div>

                <div>
                  <Label>Description (Optional)</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe what this QR code is for..."
                    className="resize-none"
                  />
                </div>

                {(formData.type === 'url' || formData.type === 'text') && (
                  <div>
                    <Label>{formData.type === 'url' ? 'URL' : 'Text Content'}</Label>
                    <Input
                      value={formData.data_content}
                      onChange={(e) => setFormData(prev => ({ ...prev, data_content: e.target.value }))}
                      placeholder={formData.type === 'url' ? 'https://example.com' : 'Enter text content'}
                      className="border-blue-400/20 focus:border-blue-400/50 focus:ring-blue-400/25"
                    />
                  </div>
                )}

                <div className="bg-muted p-3 rounded-lg">
                  <Label className="text-xs">Preview Content</Label>
                  <p className="text-sm font-mono break-all">{formData.data_content || 'No content'}</p>
                </div>
              </TabsContent>

              <TabsContent value="style" className="space-y-4">
                <div>
                  <Label>Style Preset</Label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-2">
                    {stylePresets.map((preset) => (
                      <Button
                        key={preset.value}
                        variant={formData.style_preset === preset.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => applyStylePreset(preset.value)}
                        className="flex flex-col gap-1 h-auto py-2"
                      >
                        <div className={`w-4 h-4 rounded border bg-${preset.value === 'dark' ? 'black' : 'white'} border-${preset.value === 'dark' ? 'white' : 'black'}`}>
                          <div className={`w-2 h-2 rounded-sm m-0.5 bg-${preset.value === 'dark' ? 'white' : 'black'}`} />
                        </div>
                        <span className="text-xs">{preset.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Foreground Color</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={formData.foreground_color}
                        onChange={(e) => setFormData(prev => ({ ...prev, foreground_color: e.target.value }))}
                        className="w-12 h-10 p-1 border-blue-400/20 focus:border-blue-400/50 focus:ring-blue-400/25"
                      />
                      <Input
                        value={formData.foreground_color}
                        onChange={(e) => setFormData(prev => ({ ...prev, foreground_color: e.target.value }))}
                        placeholder="#000000"
                        className="border-blue-400/20 focus:border-blue-400/50 focus:ring-blue-400/25"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Background Color</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={formData.background_color}
                        onChange={(e) => setFormData(prev => ({ ...prev, background_color: e.target.value }))}
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        value={formData.background_color}
                        onChange={(e) => setFormData(prev => ({ ...prev, background_color: e.target.value }))}
                        placeholder="#FFFFFF"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Corner Style</Label>
                  <Select
                    value={formData.corner_style}
                    onValueChange={(value: string) => setFormData(prev => ({ ...prev, corner_style: value }))}
                  >
                    <SelectTrigger className="border-blue-400/20 focus:border-blue-400/50 focus:ring-blue-400/25">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {cornerStyles.map((style) => (
                        <SelectItem key={style.value} value={style.value}>
                          {style.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Logo URL (Optional)</Label>
                  <Input
                    value={formData.logo_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, logo_url: e.target.value }))}
                    placeholder="https://example.com/logo.png"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Add a logo in the center of the QR code
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="linking" className="space-y-4">
                {formData.type === 'social' && (
                  <div>
                    <Label>Social Link</Label>
                    <Select
                      value={formData.linked_social_link_id}
                      onValueChange={(value: string) => setFormData(prev => ({ ...prev, linked_social_link_id: value }))}
                    >
                      <SelectTrigger className="border-blue-400/20 focus:border-blue-400/50 focus:ring-blue-400/25">
                        <SelectValue placeholder="Select social link" />
                      </SelectTrigger>
                      <SelectContent>
                        {socialLinks.map((link) => (
                          <SelectItem key={link.id} value={link.id}>
                            {link.platform} - @{link.username}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {formData.type === 'payment' && (
                  <div className="space-y-3">
                    <div>
                      <Label>Payment Method</Label>
                      <Select
                        value={formData.linked_payment_method_id}
                        onValueChange={(value: string) => setFormData(prev => ({ ...prev, linked_payment_method_id: value }))}
                      >
                        <SelectTrigger className="border-blue-400/20 focus:border-blue-400/50 focus:ring-blue-400/25">
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          {walletMethods.map((method) => (
                            <SelectItem key={method.id} value={method.id}>
                              {method.platform} - {method.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="include-amount"
                        checked={formData.include_payment_amount}
                        onChange={(e) => setFormData(prev => ({ ...prev, include_payment_amount: e.target.checked }))}
                        className="rounded"
                        aria-label="Include preset amount in QR code"
                      />
                      <Label htmlFor="include-amount">Include preset amount</Label>
                    </div>

                    {formData.include_payment_amount && (
                      <div>
                        <Label>Amount ($)</Label>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={formData.payment_amount}
                          onChange={(e) => setFormData(prev => ({ ...prev, payment_amount: parseFloat(e.target.value) || 0 }))}
                          placeholder="0.00"
                        />
                      </div>
                    )}
                  </div>
                )}

                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm">
                    <strong>Note:</strong> QR code analytics will track scans, unique users, and usage patterns.
                    You can view detailed analytics after generating the code.
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end space-x-2 pt-4 mt-6 border-t">
              <Button
                variant="outline"
                onClick={() => setShowCreateForm(false)}
                className="border-blue-400/20 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10"
              >
                Cancel
              </Button>
              <Button
                onClick={handleGenerateQR}
                disabled={isGenerating || !formData.name || !formData.data_content}
                className="bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white border-0"
              >
                {isGenerating ? 'Generating...' : 'Generate QR Code'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* QR Codes List */}
      {qrCodes.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium">Your QR Codes</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {qrCodes.map((qr) => (
              <Card key={qr.id} className="overflow-hidden bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300">
                <div className="p-4 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
                  <div className="bg-white p-2 rounded-lg inline-block border border-blue-400/10">
                    {qr.qr_image_url ? (
                      <Image
                        src={qr.qr_image_url}
                        alt={`QR Code: ${qr.name || 'Unnamed'}`}
                        width={96}
                        height={96}
                        className="w-24 h-24 object-contain"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-purple-50 rounded flex items-center justify-center">
                        <QrCode className="h-8 w-8 text-blue-400" />
                      </div>
                    )}
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h5 className="font-medium">{qr.name || 'Unnamed QR Code'}</h5>
                        <p className="text-xs text-muted-foreground capitalize">
                          {qr.type} • {qr.style_preset || 'default'}
                        </p>
                        {qr.description && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {qr.description}
                          </p>
                        )}
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteQR(qr.id)}
                        className="hover:bg-red-500/10 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {qr.scan_count || qr.scans || 0} scans
                      </div>
                      {qr.linked_social_link_id && (
                        <div className="flex items-center gap-1">
                          <Link className="h-3 w-3" />
                          Social Link
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-1 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownloadQR(qr)}
                        className="flex-1 border-blue-400/20 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 hover:border-blue-400/30"
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => getQRAnalytics(qr.id)}
                        className="flex-1 border-blue-400/20 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 hover:border-blue-400/30"
                      >
                        <BarChart3 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {qrCodes.length === 0 && !showCreateForm && !isLoading && (
        <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20">
          <CardContent className="text-center py-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center border border-blue-400/20 mx-auto mb-4">
              <QrCode className="h-12 w-12 text-blue-500" />
            </div>
            <h4 className="text-lg font-medium mb-2">No QR Codes Yet</h4>
            <p className="text-muted-foreground mb-4">
              Generate your first QR code to share your profile or links easily
            </p>
            <Button 
              onClick={() => setShowCreateForm(true)}
              className="bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white border-0"
            >
              Generate Your First QR Code
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
