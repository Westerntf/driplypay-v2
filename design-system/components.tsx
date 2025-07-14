/**
 * DriplyPay Design System Components
 * Reusable React components that implement the homepage design patterns
 */

import React from 'react';
import Image from 'next/image';
import { designTokens } from './design-tokens';

// Helper function for gradient text styling
export const getGradientTextStyle = () => ({
  backgroundImage: designTokens.colors.gradients.primary,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
});

// Section Container Component
export const Section: React.FC<{
  children: React.ReactNode;
  className?: string;
  id?: string;
}> = ({ children, className = '', id }) => {
  return (
    <section id={id} className={`py-20 px-4 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </section>
  );
};

// Hero Section Component
export const HeroSection: React.FC<{
  children: React.ReactNode;
  hasGlow?: boolean;
  glowColor?: string;
}> = ({ children, hasGlow = true, glowColor = '#3D4AFF' }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="text-center max-w-2xl mx-auto">
        {hasGlow && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
            <div 
              style={{ 
                backgroundColor: glowColor,
                opacity: 0.12,
                position: 'absolute',
                top: '20%',
                left: '50%',
                transform: 'translateX(-50%)'
              }} 
              className="w-full max-w-lg h-64 rounded-full blur-3xl"
            />
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

// Glass Card Component
export const GlassCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
}> = ({ children, className = '', variant = 'primary' }) => {
  const baseStyles = {
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  };

  const variantStyles = {
    primary: {
      background: 'rgba(0, 0, 0, 0.8)',
      padding: '48px 32px', // py-12 px-8
    },
    secondary: {
      background: 'rgba(0, 0, 0, 0.6)',
      padding: '16px 20px', // p-4 md:p-5
    },
  };

  return (
    <div 
      style={{
        ...baseStyles,
        ...variantStyles[variant],
      }}
      className={`rounded-2xl shadow-xl w-full ${className}`}
    >
      {children}
    </div>
  );
};

// Gradient Border Card Component
export const GradientBorderCard: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <div 
      className={`rounded-[2rem] p-[2px] ${className}`}
      style={{
        background: designTokens.colors.gradients.secondary,
      }}
    >
      <div 
        className="rounded-[2rem] p-6 h-full"
        style={{
          background: 'black',
        }}
      >
        {children}
      </div>
    </div>
  );
};

// Icon Container Component
export const IconContainer: React.FC<{
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ children, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div 
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center ${className}`}
      style={{
        background: designTokens.colors.gradients.primary,
      }}
    >
      {children}
    </div>
  );
};

// Gradient Text Component
export const GradientText: React.FC<{
  children: React.ReactNode;
  className?: string;
  gradient?: string;
}> = ({ children, className = '', gradient = designTokens.colors.gradients.primary }) => {
  return (
    <span 
      className={className}
      style={{
        backgroundImage: gradient,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {children}
    </span>
  );
};

// Primary Button Component
export const PrimaryButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}> = ({ children, onClick, className = '', disabled = false }) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      style={{ 
        background: designTokens.colors.gradients.primary,
        color: 'white',
        boxShadow: designTokens.effects.shadows.glow,
        minWidth: '240px',
      }} 
      className={`font-semibold py-4 px-16 rounded-xl text-lg transition-all duration-300 hover:opacity-90 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

// Hero Title Component
export const HeroTitle: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <h1 
      className={`text-8xl md:text-9xl font-extrabold mb-10 tracking-tight ${className}`}
      style={{
        fontFamily: designTokens.typography.fontFamily.primary,
        letterSpacing: '-0.04em',
        fontWeight: '900',
      }}
    >
      <GradientText>
        {children}
      </GradientText>
    </h1>
  );
};

// Section Title Component
export const SectionTitle: React.FC<{
  children: React.ReactNode;
  className?: string;
  center?: boolean;
}> = ({ children, className = '', center = true }) => {
  return (
    <h2 
      className={`text-2xl md:text-3xl font-extrabold mb-6 ${center ? 'text-center' : ''} ${className}`}
      style={{ fontWeight: '900' }}
    >
      {children}
    </h2>
  );
};

// Feature Card Component
export const FeatureCard: React.FC<{
  icon: string;
  iconAlt: string;
  title: React.ReactNode;
  description: string;
  className?: string;
}> = ({ icon, iconAlt, title, description, className = '' }) => {
  return (
    <div 
      className={`rounded-xl p-4 md:p-5 border border-white/10 ${className}`}
      style={{
        background: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="flex-shrink-0">
          <IconContainer>
            <Image 
              src={icon}
              alt={iconAlt}
              width={32} 
              height={32} 
              className="opacity-90"
              style={{ filter: 'invert(1)' }}
            />
          </IconContainer>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2" style={{ fontWeight: '700' }}>
            {title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

// Step Card Component (for "How It Works" section)
export const StepCard: React.FC<{
  icon: string;
  iconAlt: string;
  title: React.ReactNode;
  description: string;
  subDescription?: string;
  className?: string;
}> = ({ icon, iconAlt, title, description, subDescription, className = '' }) => {
  return (
    <div className={`text-center ${className}`}>
      <GradientBorderCard className="mb-4">
        <div className="flex items-center justify-center mb-2">
          <IconContainer>
            <Image 
              src={icon}
              alt={iconAlt}
              width={24} 
              height={24} 
              className="opacity-90"
              style={{ filter: 'invert(1)' }}
            />
          </IconContainer>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          {title}
        </h3>
      </GradientBorderCard>
      <p className="text-gray-400">{description}</p>
      {subDescription && (
        <p className="text-gray-400 text-sm mt-2">{subDescription}</p>
      )}
    </div>
  );
};

// Payment Method Display Component
export const PaymentMethods: React.FC<{
  methods: Array<{
    icon: string;
    alt: string;
    width: number;
    height: number;
    hasBackground?: boolean;
  }>;
  className?: string;
}> = ({ methods, className = '' }) => {
  return (
    <div className={`flex justify-center items-center space-x-12 md:space-x-16 ${className}`}>
      {methods.map((method, index) => (
        <div key={index} className="flex items-center">
          {method.hasBackground ? (
            <div className="relative">
              <div 
                className="absolute inset-0 bg-white rounded-lg" 
                style={{ 
                  width: `${method.width - 4}px`, 
                  height: `${method.height - 4}px`, 
                  left: '2px', 
                  top: '2px' 
                }}
              />
              <Image 
                src={method.icon}
                alt={method.alt}
                width={method.width} 
                height={method.height} 
                className="opacity-90 hover:opacity-100 transition-opacity drop-shadow-md relative z-10"
              />
            </div>
          ) : (
            <Image 
              src={method.icon}
              alt={method.alt}
              width={method.width} 
              height={method.height} 
              className="opacity-90 hover:opacity-100 transition-opacity drop-shadow-md"
            />
          )}
        </div>
      ))}
    </div>
  );
};

// Grid Container Components
export const ThreeColumnGrid: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <div className={`grid md:grid-cols-3 gap-8 ${className}`}>
      {children}
    </div>
  );
};

export const TwoColumnGrid: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 ${className}`}>
      {children}
    </div>
  );
};

// Split Text Component (for mixed colored text)
export const SplitText: React.FC<{
  parts: Array<{
    text: string;
    isGradient?: boolean;
    color?: string;
  }>;
  className?: string;
}> = ({ parts, className = '' }) => {
  return (
    <span className={className}>
      {parts.map((part, index) => (
        <span 
          key={index}
          style={part.isGradient ? getGradientTextStyle() : { color: part.color || 'white' }}
        >
          {part.text}
        </span>
      ))}
    </span>
  );
};

// Export all components as named exports
export {
  designTokens,
};
