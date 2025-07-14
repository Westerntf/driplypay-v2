/**
 * 🚀 Developer Reference: /BLUEPRINT.md → QR Code Features
 * Utility: QR code generation with logo embedding
 * Features: Custom styles, logo overlays, theme integration
 */

import QRCode from 'qrcode'

export interface QRStyle {
  id: string
  name: string
  description: string
  config: {
    errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H'
    type: 'image/png' | 'image/jpeg' | 'image/svg+xml'
    quality: number
    margin: number
    color: {
      dark: string
      light: string
    }
    width: number
  }
}

export interface LogoConfig {
  platform: string
  logoPath: string
  embedSize: number // Percentage of QR size
  position: 'center' | 'bottom-right'
  backgroundColor?: string
  borderRadius?: number
}

export interface QRGenerationOptions {
  url: string
  style?: QRStyle
  logoConfig?: LogoConfig
  customColors?: {
    dark: string
    light: string
  }
}

// Predefined QR styles
export const QR_STYLES: QRStyle[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional square design',
    config: {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      quality: 0.92,
      margin: 1,
      color: { dark: '#000000', light: '#FFFFFF' },
      width: 256
    }
  },
  {
    id: 'rounded',
    name: 'Rounded',
    description: 'Soft rounded corners',
    config: {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      quality: 0.92,
      margin: 1,
      color: { dark: '#1F2937', light: '#F9FAFB' },
      width: 256
    }
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and minimal design',
    config: {
      errorCorrectionLevel: 'L',
      type: 'image/png',
      quality: 0.92,
      margin: 2,
      color: { dark: '#374151', light: '#FFFFFF' },
      width: 200
    }
  },
  {
    id: 'branded',
    name: 'Branded',
    description: 'High contrast for branding',
    config: {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      quality: 0.95,
      margin: 1,
      color: { dark: '#4F46E5', light: '#FFFFFF' },
      width: 300
    }
  }
]

// Logo configurations for different platforms
export const LOGO_CONFIGS: Record<string, LogoConfig> = {
  // Payment platforms
  venmo: {
    platform: 'venmo',
    logoPath: '/venmo.svg',
    embedSize: 20,
    position: 'center',
    backgroundColor: '#3D95CE',
    borderRadius: 8
  },
  cashapp: {
    platform: 'cashapp',
    logoPath: '/cashapp.svg',
    embedSize: 18,
    position: 'center',
    backgroundColor: '#00D632',
    borderRadius: 8
  },
  paypal: {
    platform: 'paypal',
    logoPath: '/paypal.svg',
    embedSize: 20,
    position: 'center',
    backgroundColor: '#0070BA',
    borderRadius: 8
  },
  stripe: {
    platform: 'stripe',
    logoPath: '/stripe.svg',
    embedSize: 18,
    position: 'center',
    backgroundColor: '#635BFF',
    borderRadius: 8
  },
  
  // Social platforms
  instagram: {
    platform: 'instagram',
    logoPath: '/instagram.svg',
    embedSize: 18,
    position: 'center',
    backgroundColor: '#E4405F',
    borderRadius: 12
  },
  tiktok: {
    platform: 'tiktok',
    logoPath: '/tiktok.svg',
    embedSize: 18,
    position: 'center',
    backgroundColor: '#000000',
    borderRadius: 8
  },
  twitter: {
    platform: 'twitter',
    logoPath: '/twitter.svg',
    embedSize: 16,
    position: 'center',
    backgroundColor: '#1DA1F2',
    borderRadius: 8
  },
  x: {
    platform: 'x',
    logoPath: '/x.svg',
    embedSize: 16,
    position: 'center',
    backgroundColor: '#000000',
    borderRadius: 8
  },
  youtube: {
    platform: 'youtube',
    logoPath: '/youtube.svg',
    embedSize: 20,
    position: 'center',
    backgroundColor: '#FF0000',
    borderRadius: 8
  },
  twitch: {
    platform: 'twitch',
    logoPath: '/twitch.svg',
    embedSize: 18,
    position: 'center',
    backgroundColor: '#9146FF',
    borderRadius: 8
  },
  discord: {
    platform: 'discord',
    logoPath: '/discord.svg',
    embedSize: 18,
    position: 'center',
    backgroundColor: '#5865F2',
    borderRadius: 8
  },
  onlyfans: {
    platform: 'onlyfans',
    logoPath: '/onlyfans.svg',
    embedSize: 18,
    position: 'center',
    backgroundColor: '#00AFF0',
    borderRadius: 8
  },
  website: {
    platform: 'website',
    logoPath: '/website.svg',
    embedSize: 16,
    position: 'center',
    backgroundColor: '#6B7280',
    borderRadius: 8
  },
  
  // Profile/generic
  profile: {
    platform: 'profile',
    logoPath: '/payment.svg', // Use payment icon as wallet icon
    embedSize: 20,
    position: 'center',
    backgroundColor: '#4F46E5',
    borderRadius: 12
  }
}

/**
 * Generate QR code with optional logo embedding
 */
export async function generateQRCode(options: QRGenerationOptions): Promise<string> {
  try {
    const style = options.style || QR_STYLES[0]
    const colors = options.customColors || style.config.color

    // Generate base QR code
    const qrDataUrl = await QRCode.toDataURL(options.url, {
      errorCorrectionLevel: style.config.errorCorrectionLevel,
      margin: style.config.margin,
      color: {
        dark: colors.dark,
        light: colors.light
      },
      width: style.config.width
    })

    // If no logo config, return base QR code
    if (!options.logoConfig) {
      return qrDataUrl
    }

    // Embed logo using canvas
    return await embedLogo(qrDataUrl, options.logoConfig, style.config.width)
  } catch (error) {
    console.error('Error generating QR code:', error)
    throw new Error('Failed to generate QR code')
  }
}

/**
 * Embed logo into QR code using canvas
 */
async function embedLogo(
  qrDataUrl: string, 
  logoConfig: LogoConfig, 
  qrSize: number
): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      // Create canvas
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) throw new Error('Canvas context not available')

      canvas.width = qrSize
      canvas.height = qrSize

      // Load QR code image
      const qrImage = new Image()
      qrImage.onload = () => {
        // Draw QR code
        ctx.drawImage(qrImage, 0, 0, qrSize, qrSize)

        // Calculate logo size and position
        const logoSize = (qrSize * logoConfig.embedSize) / 100
        const logoX = logoConfig.position === 'center' 
          ? (qrSize - logoSize) / 2 
          : qrSize - logoSize - 10
        const logoY = logoConfig.position === 'center' 
          ? (qrSize - logoSize) / 2 
          : qrSize - logoSize - 10

        // Draw logo background
        if (logoConfig.backgroundColor) {
          ctx.fillStyle = logoConfig.backgroundColor
          const borderRadius = logoConfig.borderRadius || 0
          
          if (borderRadius > 0) {
            // Rounded rectangle for logo background
            const x = logoX - 4
            const y = logoY - 4
            const width = logoSize + 8
            const height = logoSize + 8
            
            ctx.beginPath()
            ctx.moveTo(x + borderRadius, y)
            ctx.lineTo(x + width - borderRadius, y)
            ctx.quadraticCurveTo(x + width, y, x + width, y + borderRadius)
            ctx.lineTo(x + width, y + height - borderRadius)
            ctx.quadraticCurveTo(x + width, y + height, x + width - borderRadius, y + height)
            ctx.lineTo(x + borderRadius, y + height)
            ctx.quadraticCurveTo(x, y + height, x, y + height - borderRadius)
            ctx.lineTo(x, y + borderRadius)
            ctx.quadraticCurveTo(x, y, x + borderRadius, y)
            ctx.fill()
          } else {
            ctx.fillRect(logoX - 4, logoY - 4, logoSize + 8, logoSize + 8)
          }
        }

        // Load and draw logo
        const logoImage = new Image()
        logoImage.onload = () => {
          ctx.drawImage(logoImage, logoX, logoY, logoSize, logoSize)
          resolve(canvas.toDataURL('image/png'))
        }
        logoImage.onerror = () => {
          // If logo fails to load, return QR code without logo
          resolve(qrDataUrl)
        }
        logoImage.src = logoConfig.logoPath
      }
      qrImage.onerror = () => reject(new Error('Failed to load QR code image'))
      qrImage.src = qrDataUrl
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * Get QR theme colors based on profile theme
 */
export function getQRThemeColors(theme: string) {
  const themeColors: Record<string, { dark: string; light: string }> = {
    clean: { dark: '#1F2937', light: '#FFFFFF' },
    neon: { dark: '#10B981', light: '#000000' },
    luxe: { dark: '#7C3AED', light: '#FEFCE8' }
  }
  
  return themeColors[theme] || themeColors.clean
}

/**
 * Generate QR code for profile
 */
export async function generateProfileQR(username: string, theme: string = 'default'): Promise<string> {
  const url = `${window.location.origin}/${username}`
  const colors = getQRThemeColors(theme)
  
  return generateQRCode({
    url,
    style: QR_STYLES.find(s => s.id === 'branded') || QR_STYLES[0],
    logoConfig: LOGO_CONFIGS.profile,
    customColors: colors
  })
}

/**
 * Generate QR code for social link
 */
export async function generateSocialQR(
  platform: string, 
  url: string, 
  theme: string = 'default'
): Promise<string> {
  const colors = getQRThemeColors(theme)
  const logoConfig = LOGO_CONFIGS[platform.toLowerCase()]
  
  return generateQRCode({
    url,
    style: QR_STYLES.find(s => s.id === 'classic') || QR_STYLES[0],
    logoConfig,
    customColors: colors
  })
}

/**
 * Generate QR code for payment method
 */
export async function generatePaymentQR(
  type: string, 
  handle: string | null, 
  username: string,
  theme: string = 'default'
): Promise<string> {
  let url: string
  
  // Generate appropriate URL based on payment type
  switch (type.toLowerCase()) {
    case 'venmo':
      url = handle ? `https://venmo.com/${handle.replace('@', '')}` : `${window.location.origin}/${username}`
      break
    case 'cashapp':
      url = handle ? `https://cash.app/${handle.replace('$', '')}` : `${window.location.origin}/${username}`
      break
    case 'paypal':
      url = handle ? `https://paypal.me/${handle}` : `${window.location.origin}/${username}`
      break
    default:
      url = `${window.location.origin}/${username}`
  }
  
  const colors = getQRThemeColors(theme)
  const logoConfig = LOGO_CONFIGS[type.toLowerCase()]
  
  return generateQRCode({
    url,
    style: QR_STYLES.find(s => s.id === 'branded') || QR_STYLES[0],
    logoConfig,
    customColors: colors
  })
}
