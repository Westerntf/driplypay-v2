/**
 * 🚀 Developer Reference: /BLUEPRINT.md → Design System
 * Purpose: Core design system components and theme implementation
 * Features: Theme tokens, reusable components, gradient system
 * 
 * DriplyPay Design System Components
 * Reusable React components that implement the homepage design patterns
 */

import React from 'react';
import { designTokens } from '@/components/design-tokens';

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
      padding: '48px 32px',
    },
    secondary: {
      background: 'rgba(0, 0, 0, 0.6)',
      padding: '16px 20px',
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
  href?: string;
}> = ({ children, onClick, className = '', disabled = false, href }) => {
  const buttonStyles = { 
    background: designTokens.colors.gradients.primary,
    color: 'white',
    boxShadow: '0 10px 15px -3px rgba(96, 165, 250, 0.3)',
    minWidth: '240px',
  };

  const buttonClasses = `font-semibold py-4 px-16 rounded-xl text-lg transition-all duration-300 hover:opacity-90 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  if (href) {
    return (
      <a 
        href={href}
        style={buttonStyles}
        className={buttonClasses}
      >
        {children}
      </a>
    );
  }

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      style={buttonStyles}
      className={buttonClasses}
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
      className={`text-6xl md:text-8xl font-extrabold mb-10 tracking-tight ${className}`}
      style={{
        fontFamily: designTokens.typography.fontFamily.primary,
        letterSpacing: '-0.04em',
        fontWeight: '900',
      }}
    >
      <GradientText>{children}</GradientText>
    </h1>
  );
};

// Section Title Component
export const SectionTitle: React.FC<{
  children: React.ReactNode;
  className?: string;
  center?: boolean;
}> = ({ children, className = '', center = false }) => {
  return (
    <h2 
      className={`text-3xl md:text-4xl font-black mb-6 ${center ? 'text-center' : ''} ${className}`}
      style={{
        fontFamily: designTokens.typography.fontFamily.primary,
        fontWeight: '900',
      }}
    >
      {children}
    </h2>
  );
};

// Description Text Component
export const Description: React.FC<{
  children: React.ReactNode;
  className?: string;
  center?: boolean;
}> = ({ children, className = '', center = false }) => {
  return (
    <p 
      className={`text-lg text-gray-200 mb-8 font-semibold ${center ? 'text-center max-w-2xl mx-auto' : ''} ${className}`}
    >
      {children}
    </p>
  );
};
