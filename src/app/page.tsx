/**
 * 🚀 DriplyPay Homepage - Complete Redesign
 * Reflects the true vision: Beautiful profile platform for creator monetization
 * Features: Hero, social proof, features showcase, demo preview, CTA
 */
import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section - Clean DriplyPay Luxe Theme */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Consistent gradient pattern with other sections */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/60 via-black to-gray-950/60" />
        
        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          {/* DriplyPay Logo with button-style treatment */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight mb-4">
              <span className="inline-block px-8 md:px-12 py-4 md:py-6 bg-gradient-to-r from-gray-950 to-gray-900 rounded-full text-white border border-gray-700/50 shadow-xl">
                DriplyPay
              </span>
            </h1>
          </div>
          
          {/* Tagline with Luxe theme */}
          <h2 className="text-lg sm:text-2xl md:text-4xl font-bold mb-4 md:mb-6 leading-tight">
            <span className="text-white">One link. Every payment. Zero friction.</span>
          </h2>
          
          <p className="text-base sm:text-xl md:text-2xl text-gray-300 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed">
            Cards. CashApp. QR. Socials. You name it they tap it, you get paid.
          </p>
          
          {/* Updated CTA Buttons - darker grey primary button */}
          <div className="flex justify-center items-center mb-8 md:mb-16">
            <Link 
              href="/signup"
              className="w-full sm:w-auto px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-gray-950 to-gray-900 rounded-full text-white font-semibold text-base md:text-lg hover:from-gray-900 hover:to-gray-800 transition-all duration-300 transform hover:scale-105 shadow-xl border border-gray-700/50"
            >
              Create Your Profile
            </Link>
          </div>
          
          {/* Social proof with Luxe styling */}
          <p className="text-gray-400 text-xs md:text-sm">
            Chosen by Creators Who Don&apos;t Need a Middleman
          </p>
        </div>
      </section>

      {/* What DriplyPay Really Is */}
      <section className="py-12 md:py-20 px-6 bg-gradient-to-b from-gray-950/60 via-black to-gray-950/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
              <span className="inline-block px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-gray-950 to-gray-900 rounded-full text-white border border-gray-700/50 shadow-xl mb-2 md:mb-4">
                More than payments.
              </span><br />
              <span className="inline-block px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-gray-950 to-gray-900 rounded-full text-white border border-gray-700/50 shadow-xl">
                Your complete creator hub.
              </span>
            </h2>
            <p className="text-base sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              DriplyPay isn&apos;t just about getting paid. It&apos;s your beautiful, all-in-one platform 
              that connects fans to everything you offer.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12">
            {/* Accept Every Payment Method */}
            <div className="bg-black/40 backdrop-blur-lg border border-gray-600/30 rounded-2xl md:rounded-3xl p-4 md:p-8 text-center hover:bg-black/60 transition-all duration-300 h-[280px] md:h-[480px] flex flex-col">
              <div className="mb-4 md:mb-8 flex-shrink-0">
                <h3 className="text-base md:text-2xl font-bold text-white mb-2 md:mb-4 h-[40px] md:h-[64px] flex items-center justify-center leading-tight">Accept Every Payment Method</h3>
                <p className="text-gray-400 leading-relaxed h-[36px] md:h-[72px] flex items-center justify-center text-xs md:text-sm">
                  DriplyPay auto-detects your payment types and showcases them with zero setup. Fans pay you directly, however they prefer.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 md:gap-6 flex-grow items-start pb-2 md:pb-0">
                <div className="group flex flex-col items-center justify-center">
                  <div className="w-10 h-10 md:w-16 md:h-16 bg-black/60 backdrop-blur-lg border border-gray-600/30 rounded-lg md:rounded-2xl flex items-center justify-center hover:bg-black/80 transition-all duration-300 group-hover:scale-110 group-hover:border-gray-400/50 mb-1 md:mb-3">
                    <Image src="/card.svg" alt="Card" width={20} height={20} className="md:w-8 md:h-8 filter brightness-0 invert" />
                  </div>
                  <p className="text-xs text-gray-300 font-medium">Cards</p>
                </div>
                <div className="group flex flex-col items-center justify-center">
                  <div className="w-10 h-10 md:w-16 md:h-16 bg-black/60 backdrop-blur-lg border border-gray-600/30 rounded-lg md:rounded-2xl flex items-center justify-center hover:bg-black/80 transition-all duration-300 group-hover:scale-110 group-hover:border-gray-400/50 mb-1 md:mb-3">
                    <Image src="/symbols-2.svg" alt="Digital Wallets" width={20} height={20} className="md:w-8 md:h-8 filter brightness-0 invert" />
                  </div>
                  <p className="text-xs text-gray-300 font-medium">Digital Wallets</p>
                </div>
                <div className="group flex flex-col items-center justify-center">
                  <div className="w-10 h-10 md:w-16 md:h-16 bg-black/60 backdrop-blur-lg border border-gray-600/30 rounded-lg md:rounded-2xl flex items-center justify-center hover:bg-black/80 transition-all duration-300 group-hover:scale-110 group-hover:border-gray-400/50 mb-1 md:mb-3">
                    <Image src="/apple-pay.svg" alt="Apple Pay" width={20} height={20} className="md:w-8 md:h-8 filter brightness-0 invert" />
                  </div>
                  <p className="text-xs text-gray-300 font-medium">Apple Pay</p>
                </div>
                <div className="group flex flex-col items-center justify-center">
                  <div className="w-10 h-10 md:w-16 md:h-16 bg-black/60 backdrop-blur-lg border border-gray-600/30 rounded-lg md:rounded-2xl flex items-center justify-center hover:bg-black/80 transition-all duration-300 group-hover:scale-110 group-hover:border-gray-400/50 mb-1 md:mb-3">
                    <Image src="/symbol.svg" alt="Crypto" width={20} height={20} className="md:w-8 md:h-8 filter brightness-0 invert" />
                  </div>
                  <p className="text-xs text-gray-300 font-medium">Crypto</p>
                </div>
              </div>
            </div>

            {/* Connect Your Favorite Platforms */}
            <div className="bg-black/40 backdrop-blur-lg border border-gray-600/30 rounded-2xl md:rounded-3xl p-4 md:p-8 text-center hover:bg-black/60 transition-all duration-300 h-[280px] md:h-[480px] flex flex-col">
              <div className="mb-4 md:mb-8 flex-shrink-0">
                <h3 className="text-base md:text-2xl font-bold text-white mb-2 md:mb-4 h-[40px] md:h-[64px] flex items-center justify-center leading-tight">Connect Your Favorite Platforms</h3>
                <p className="text-gray-400 leading-relaxed h-[36px] md:h-[72px] flex items-center justify-center text-xs md:text-sm">
                  Seamlessly integrate with the payment platforms you already use. One link, all your methods.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 md:gap-6 flex-grow items-start pb-2 md:pb-0">
                <div className="group flex flex-col items-center justify-center">
                  <div className="w-10 h-10 md:w-16 md:h-16 bg-black/60 backdrop-blur-lg border border-gray-600/30 rounded-lg md:rounded-2xl flex items-center justify-center hover:bg-black/80 transition-all duration-300 group-hover:scale-110 group-hover:border-gray-400/50 mb-1 md:mb-3">
                    <Image src="/cashapp.svg" alt="CashApp" width={20} height={20} className="md:w-8 md:h-8 filter brightness-0 invert" />
                  </div>
                  <p className="text-xs text-gray-300 font-medium">CashApp</p>
                </div>
                <div className="group flex flex-col items-center justify-center">
                  <div className="w-10 h-10 md:w-16 md:h-16 bg-black/60 backdrop-blur-lg border border-gray-600/30 rounded-lg md:rounded-2xl flex items-center justify-center hover:bg-black/80 transition-all duration-300 group-hover:scale-110 group-hover:border-gray-400/50 mb-1 md:mb-3">
                    <Image src="/stripe.svg" alt="Stripe" width={20} height={20} className="md:w-8 md:h-8 filter brightness-0 invert" />
                  </div>
                  <p className="text-xs text-gray-300 font-medium">Stripe</p>
                </div>
                <div className="group flex flex-col items-center justify-center">
                  <div className="w-10 h-10 md:w-16 md:h-16 bg-black/60 backdrop-blur-lg border border-gray-600/30 rounded-lg md:rounded-2xl flex items-center justify-center hover:bg-black/80 transition-all duration-300 group-hover:scale-110 group-hover:border-gray-400/50 mb-1 md:mb-3">
                    <Image src="/venmo.svg" alt="Venmo" width={20} height={20} className="md:w-8 md:h-8 filter brightness-0 invert" />
                  </div>
                  <p className="text-xs text-gray-300 font-medium">Venmo</p>
                </div>
                <div className="group flex flex-col items-center justify-center">
                  <div className="w-10 h-10 md:w-16 md:h-16 bg-black/60 backdrop-blur-lg border border-gray-600/30 rounded-lg md:rounded-2xl flex items-center justify-center hover:bg-black/80 transition-all duration-300 group-hover:scale-110 group-hover:border-gray-400/50 mb-1 md:mb-3">
                    <Image src="/paypal.svg" alt="PayPal" width={20} height={20} className="md:w-8 md:h-8 filter brightness-0 invert" />
                  </div>
                  <p className="text-xs text-gray-300 font-medium">PayPal</p>
                </div>
              </div>
            </div>

            {/* Showcase Your Social Presence */}
            <div className="bg-black/40 backdrop-blur-lg border border-gray-600/30 rounded-2xl md:rounded-3xl p-4 md:p-8 text-center hover:bg-black/60 transition-all duration-300 h-[280px] md:h-[480px] flex flex-col">
              <div className="mb-4 md:mb-8 flex-shrink-0">
                <h3 className="text-base md:text-2xl font-bold text-white mb-2 md:mb-4 h-[40px] md:h-[64px] flex items-center justify-center leading-tight">Showcase Your Social Presence</h3>
                <p className="text-gray-400 leading-relaxed h-[36px] md:h-[72px] flex items-center justify-center text-xs md:text-sm">
                  Link all your social profiles, add social stories with photos, and connect specific payment methods to each platform. Complete social to payment integration.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 md:gap-6 flex-grow items-start pb-2 md:pb-0">
                <div className="group flex flex-col items-center justify-center">
                  <div className="w-10 h-10 md:w-16 md:h-16 bg-black/60 backdrop-blur-lg border border-gray-600/30 rounded-lg md:rounded-2xl flex items-center justify-center hover:bg-black/80 transition-all duration-300 group-hover:scale-110 group-hover:border-gray-400/50 mb-1 md:mb-3">
                    <Image src="/instagram.svg" alt="Instagram" width={20} height={20} className="md:w-8 md:h-8 filter brightness-0 invert" />
                  </div>
                  <p className="text-xs text-gray-300 font-medium">Instagram</p>
                </div>
                <div className="group flex flex-col items-center justify-center">
                  <div className="w-10 h-10 md:w-16 md:h-16 bg-black/60 backdrop-blur-lg border border-gray-600/30 rounded-lg md:rounded-2xl flex items-center justify-center hover:bg-black/80 transition-all duration-300 group-hover:scale-110 group-hover:border-gray-400/50 mb-1 md:mb-3">
                    <Image src="/tiktok.svg" alt="TikTok" width={20} height={20} className="md:w-8 md:h-8 filter brightness-0 invert" />
                  </div>
                  <p className="text-xs text-gray-300 font-medium">TikTok</p>
                </div>
                <div className="group flex flex-col items-center justify-center">
                  <div className="w-10 h-10 md:w-16 md:h-16 bg-black/60 backdrop-blur-lg border border-gray-600/30 rounded-lg md:rounded-2xl flex items-center justify-center hover:bg-black/80 transition-all duration-300 group-hover:scale-110 group-hover:border-gray-400/50 mb-1 md:mb-3">
                    <Image src="/snapchat.svg" alt="Snapchat" width={20} height={20} className="md:w-8 md:h-8 filter brightness-0 invert" />
                  </div>
                  <p className="text-xs text-gray-300 font-medium">Snapchat</p>
                </div>
                <div className="group flex flex-col items-center justify-center">
                  <div className="w-10 h-10 md:w-16 md:h-16 bg-black/60 backdrop-blur-lg border border-gray-600/30 rounded-lg md:rounded-2xl flex items-center justify-center hover:bg-black/80 transition-all duration-300 group-hover:scale-110 group-hover:border-gray-400/50 mb-1 md:mb-3">
                    <Image src="/onlyfans.svg" alt="OnlyFans" width={20} height={20} className="md:w-8 md:h-8 filter brightness-0 invert" />
                  </div>
                  <p className="text-xs text-gray-300 font-medium">OnlyFans</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Preview Section */}
      <section className="py-12 md:py-20 px-6 bg-gradient-to-b from-gray-950/80 via-black to-gray-950/60">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left side - Title and Description */}
            <div className="lg:pr-8 text-center order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
                <span className="inline-block px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-gray-950 to-gray-900 rounded-full text-white border border-gray-700/50 shadow-xl">
                  The Infrastructure of Modern Hustle.
                </span>
              </h2>
              <div className="text-sm sm:text-lg md:text-xl lg:text-xl text-gray-300 leading-relaxed mb-6 md:mb-8 space-y-2">
                <p className="font-medium">One platform. Every payment. No friction.</p>
                <p>Built to turn traffic into income.</p>
                <p className="hidden md:inline">Every scan. Every click. Every dollar.</p>
                <p className="md:hidden">Every scan. Every click.</p>
                <p className="md:hidden">Every dollar.</p>
                <p className="font-medium mt-4">
                  <span className="bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text text-transparent">DriplyPay makes it yours.</span>
                </p>
              </div>
              <div className="text-left max-w-md mx-auto space-y-3 md:space-y-4">
                <div className="bg-black rounded-xl p-3 md:p-4 border border-gray-600/30 flex items-center gap-3 md:gap-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-black rounded-lg flex items-center justify-center border border-gray-600/30 flex-shrink-0">
                    <Image src="/conversion.svg" alt="Conversion" width={20} height={20} className="md:w-6 md:h-6 filter brightness-0 invert" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-xs md:text-sm mb-1">Conversion Psychology</h4>
                    <p className="text-gray-300 text-xs leading-tight">Every element is designed using behavioral science to increase fan generosity</p>
                  </div>
                </div>
                <div className="bg-black rounded-xl p-3 md:p-4 border border-gray-600/30 flex items-center gap-3 md:gap-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-black rounded-lg flex items-center justify-center border border-gray-600/30 flex-shrink-0">
                    <Image src="/growth.svg" alt="Growth" width={20} height={20} className="md:w-6 md:h-6 filter brightness-0 invert" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-xs md:text-sm mb-1">Revenue Intelligence</h4>
                    <p className="text-gray-300 text-xs leading-tight">Real-time analytics show exactly what&apos;s working to maximize your earnings</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right side - Phone Preview */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="relative group">
                {/* Premium Phone Frame - Mobile Responsive */}
                <div className="w-64 h-[520px] md:w-80 md:h-[650px] bg-gradient-to-b from-gray-900 to-black rounded-[2.5rem] md:rounded-[3rem] border-2 md:border-4 border-gray-700 overflow-hidden shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                  {/* Phone screen with DriplyPay theme */}
                  <div className="h-full bg-black relative overflow-hidden">
                    {/* Status bar - time in left corner */}
                    <div className="flex justify-start items-center px-4 md:px-6 py-2 md:py-3 text-white text-xs md:text-sm pt-3 md:pt-4">
                      <span className="font-semibold">9:41</span>
                    </div>
                    
                    {/* Profile content */}
                    <div className="px-4 md:px-6 py-3 md:py-4">
                      {/* Profile header */}
                      <div className="text-center mb-4 md:mb-6">
                        <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 rounded-full mx-auto mb-3 md:mb-4 flex items-center justify-center text-white text-lg md:text-2xl font-bold shadow-lg">
                          DP
                        </div>
                        <h3 className="text-white font-bold text-lg md:text-xl mb-1">@driplypay</h3>
                        <p className="text-gray-300 text-xs md:text-sm">Beautiful profiles for creators</p>
                      </div>
                      
                      {/* Payment methods with black backgrounds and white icons */}
                      <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                        <div className="bg-black rounded-xl md:rounded-2xl p-3 md:p-4 border border-gray-600/30 hover:border-gray-400/50 transition-colors">
                          <div className="flex items-center gap-2 md:gap-3">
                            <div className="w-5 h-5 md:w-6 md:h-6 bg-black rounded flex items-center justify-center p-1 border border-gray-600/30">
                              <Image src="/paypal.svg" alt="PayPal" width={12} height={12} className="md:w-4 md:h-4 filter brightness-0 invert" />
                            </div>
                            <span className="text-white font-semibold text-sm md:text-base">Support via PayPal</span>
                          </div>
                        </div>
                        <div className="bg-black rounded-xl md:rounded-2xl p-3 md:p-4 border border-gray-600/30 hover:border-gray-400/50 transition-colors">
                          <div className="flex items-center gap-2 md:gap-3">
                            <div className="w-5 h-5 md:w-6 md:h-6 bg-black rounded flex items-center justify-center p-1 border border-gray-600/30">
                              <Image src="/cashapp.svg" alt="CashApp" width={12} height={12} className="md:w-4 md:h-4 filter brightness-0 invert" />
                            </div>
                            <span className="text-white font-semibold text-sm md:text-base">CashApp Tips</span>
                          </div>
                        </div>
                        <div className="bg-black rounded-xl md:rounded-2xl p-3 md:p-4 border border-gray-600/30 hover:border-gray-400/50 transition-colors">
                          <div className="flex items-center gap-2 md:gap-3">
                            <div className="w-5 h-5 md:w-6 md:h-6 bg-black rounded flex items-center justify-center p-1 border border-gray-600/30">
                              <Image src="/venmo.svg" alt="Venmo" width={12} height={12} className="md:w-4 md:h-4 filter brightness-0 invert" />
                            </div>
                            <span className="text-white font-semibold text-sm md:text-base">Venmo Payments</span>
                          </div>
                        </div>
                        <div className="bg-black rounded-xl md:rounded-2xl p-3 md:p-4 border border-gray-600/30 hover:border-gray-400/50 transition-colors">
                          <div className="flex items-center gap-2 md:gap-3">
                            <div className="w-5 h-5 md:w-6 md:h-6 bg-black rounded flex items-center justify-center p-1 border border-gray-600/30">
                              <Image src="/stripe.svg" alt="Stripe" width={12} height={12} className="md:w-4 md:h-4 filter brightness-0 invert" />
                            </div>
                            <span className="text-white font-semibold text-sm md:text-base">Stripe Checkout</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Social stories section */}
                      <div className="mb-3 md:mb-4">
                        <div className="grid grid-cols-4 gap-2 md:gap-3">
                          <div className="w-full aspect-square bg-black rounded-xl md:rounded-2xl flex items-center justify-center border border-gray-600/30">
                            <Image src="/instagram.svg" alt="Instagram" width={12} height={12} className="md:w-4 md:h-4 filter brightness-0 invert" />
                          </div>
                          <div className="w-full aspect-square bg-black rounded-xl md:rounded-2xl flex items-center justify-center border border-gray-600/30">
                            <Image src="/onlyfans.svg" alt="OnlyFans" width={12} height={12} className="md:w-4 md:h-4 filter brightness-0 invert" />
                          </div>
                          <div className="w-full aspect-square bg-black rounded-xl md:rounded-2xl flex items-center justify-center border border-gray-600/30">
                            <Image src="/tiktok.svg" alt="TikTok" width={12} height={12} className="md:w-4 md:h-4 filter brightness-0 invert" />
                          </div>
                          <div className="w-full aspect-square bg-black rounded-xl md:rounded-2xl flex items-center justify-center border border-gray-600/30">
                            <Image src="/snapchat.svg" alt="Snapchat" width={12} height={12} className="md:w-4 md:h-4 filter brightness-0 invert" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Home indicator line */}
                    <div className="absolute bottom-1 md:bottom-2 left-1/2 transform -translate-x-1/2 w-24 md:w-32 h-1 bg-white/40 rounded-full"></div>
                  </div>
                </div>
                
                {/* Enhanced QR Code - Desktop positioned absolutely */}
                <div className="hidden sm:block absolute -right-12 md:-right-20 top-16 md:top-24 bg-black rounded-xl md:rounded-2xl border border-gray-600/30 p-4 md:p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300 shadow-2xl">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-700 rounded-lg md:rounded-xl mb-2 md:mb-3 flex items-center justify-center border border-gray-600/30">
                    <Image src="/qr-code.svg" alt="QR Code" width={32} height={32} className="md:w-12 md:h-12 filter brightness-0 invert" />
                  </div>
                  <p className="text-gray-300 text-xs md:text-sm text-center font-medium">QR Code</p>
                  <p className="text-gray-400 text-xs text-center">Scan to visit</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Button Design */}
      <section className="py-16 md:py-24 px-6 bg-gradient-to-b from-gray-950/60 via-black to-gray-950/60">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
              <span className="text-white">Simple as </span>
              <span className="inline-block px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-gray-950 to-gray-900 rounded-full text-white border border-gray-700/50 shadow-xl">
                paste and share
              </span>
            </h2>
            <p className="text-base sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              No complex setup. No integrations. Just beautiful profiles that work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            {/* Step 1 - Sign up & paste links */}
            <div className="group text-center space-y-4">
              {/* Title Button */}
              <div className="inline-block px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-gray-950 to-gray-900 rounded-full text-white border border-gray-700/50 shadow-xl hover:from-gray-900 hover:to-gray-800 transition-all duration-300">
                <div className="flex items-center gap-3 md:gap-4">
                  <Image src="/link.svg" alt="Link" width={20} height={20} className="md:w-6 md:h-6 filter brightness-0 invert" />
                  <h3 className="text-base md:text-lg font-bold whitespace-nowrap">Sign up & paste links</h3>
                </div>
              </div>
              
              {/* Content Button */}
              <div className="w-full px-8 py-6 md:py-8 h-32 md:h-40 bg-black/30 rounded-3xl text-white border border-gray-700/30 shadow-xl hover:bg-black/50 hover:border-gray-600/50 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                <p className="text-sm md:text-base text-gray-200 leading-relaxed max-w-sm mx-auto">
                  Create your account and paste your PayPal, CashApp, Venmo, social media - whatever you use. 
                  <span className="text-white font-semibold">We handle the rest automatically.</span>
                </p>
              </div>
            </div>

            {/* Step 2 - Customize your theme */}
            <div className="group text-center space-y-4">
              {/* Title Button */}
              <div className="inline-block px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-gray-950 to-gray-900 rounded-full text-white border border-gray-700/50 shadow-xl hover:from-gray-900 hover:to-gray-800 transition-all duration-300">
                <div className="flex items-center gap-3 md:gap-4">
                  <Image src="/layout.svg" alt="Layout" width={20} height={20} className="md:w-6 md:h-6 filter brightness-0 invert" />
                  <h3 className="text-base md:text-lg font-bold whitespace-nowrap">Customize your theme</h3>
                </div>
              </div>
              
              {/* Content Button */}
              <div className="w-full px-8 py-6 md:py-8 h-32 md:h-40 bg-black/30 rounded-3xl text-white border border-gray-700/30 shadow-xl hover:bg-black/50 hover:border-gray-600/50 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                <p className="text-sm md:text-base text-gray-200 leading-relaxed max-w-sm mx-auto">
                  Choose from Ocean, Neon, Luxe, or Clean themes. Upload photos, add your bio, 
                  <span className="text-white font-semibold">create your vision board.</span>
                </p>
              </div>
            </div>

            {/* Step 3 - Share your DriplyPay */}
            <div className="group text-center space-y-4">
              {/* Title Button */}
              <div className="inline-block px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-gray-950 to-gray-900 rounded-full text-white border border-gray-700/50 shadow-xl hover:from-gray-900 hover:to-gray-800 transition-all duration-300">
                <div className="flex items-center gap-3 md:gap-4">
                  <Image src="/send.svg" alt="Send" width={20} height={20} className="md:w-6 md:h-6 filter brightness-0 invert" />
                  <h3 className="text-base md:text-lg font-bold whitespace-nowrap">Share your DriplyPay</h3>
                </div>
              </div>
              
              {/* Content Button */}
              <div className="w-full px-8 py-6 md:py-8 h-32 md:h-40 bg-black/30 rounded-3xl text-white border border-gray-700/30 shadow-xl hover:bg-black/50 hover:border-gray-600/50 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                <p className="text-sm md:text-base text-gray-200 leading-relaxed max-w-sm mx-auto">
                  One beautiful link: <span className="text-white font-semibold">driplypay.com/yourname</span>. Share it everywhere. 
                  Instagram bio, TikTok, Twitter, everywhere.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 md:py-20 px-6 bg-gradient-to-b from-gray-950/60 via-black to-black">
        <div className="max-w-6xl mx-auto">
          <div className="bg-black/90 backdrop-blur-xl border border-gray-600/30 rounded-2xl md:rounded-3xl p-6 md:p-12 text-center hover:bg-black/95 hover:border-gray-400/50 transition-all duration-500">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
              <span className="inline-block px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-gray-950 to-gray-900 rounded-full text-white border border-gray-700/50 shadow-xl">
                Ready for beautiful simplicity?
              </span>
            </h2>
            
            <p className="text-base sm:text-xl text-gray-300 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
              Join creators who choose elegance over complexity. Your fans deserve 
              a beautiful experience, and you deserve easy monetization.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
              <Link 
                href="/signup"
                className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-gray-950 to-gray-900 rounded-full text-white font-bold text-lg md:text-xl hover:from-gray-900 hover:to-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl border border-gray-600/50"
              >
                Create Your Profile Now
              </Link>
              
              <Link 
                href="/creators" 
                className="text-gray-400 hover:text-white font-semibold text-base md:text-lg transition-colors"
              >
                See successful creators →
              </Link>
            </div>
            
            <p className="text-gray-400 text-xs md:text-sm mt-6 md:mt-8">
              Free to start • Beautiful profiles • Easy monetization
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
