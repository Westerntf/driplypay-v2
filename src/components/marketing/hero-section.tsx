import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-500 via-purple-600 to-pink-600 opacity-90" />
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm">
            <Sparkles className="w-4 h-4" />
            <span>For creators, dancers, freelancers & hustlers</span>
          </div>
          
          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-balance">
            All your ways to get paid — 
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              in one private link
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            DriplyPay combines the simplicity of Linktree with the power of Stripe. 
            Accept money from anyone, anywhere — without friction, risk, or judgment.
          </p>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-4 h-auto"
            >
              <Link href="/signup">
                Create Your Profile
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4 h-auto"
            >
              <Link href="#how-it-works">
                See How It Works
              </Link>
            </Button>
          </div>
          
          {/* Social proof */}
          <div className="pt-16 text-white/80">
            <p className="text-sm uppercase tracking-wider mb-4">Trusted by creators worldwide</p>
            <div className="flex justify-center items-center gap-8 opacity-60">
              <div className="text-sm">💸 CashApp</div>
              <div className="text-sm">💰 PayPal</div>
              <div className="text-sm">💎 Stripe</div>
              <div className="text-sm">⚡ Zelle</div>
              <div className="text-sm">₿ Crypto</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl animate-pulse-slow" />
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-pink-500/20 rounded-full blur-xl animate-pulse-slow" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-400/20 rounded-full blur-xl animate-pulse-slow" />
    </section>
  )
}
