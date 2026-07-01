"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, Calendar, Zap, AlertTriangle, Bot } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#212121]">
      {/* Animated Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gradient-to-br from-[#1A3A63]/20 via-[#B98A45]/15 to-[#2B69A8]/20 rounded-full blur-3xl animate-pulse transform translate-x-1/3 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-to-tr from-[#2B69A8]/15 via-[#1A3A63]/20 to-[#B98A45]/15 rounded-full blur-3xl animate-pulse transform -translate-x-1/3 translate-y-1/4"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* VEPANDO Logo */}
          <div className="mb-8">
            <Link href="/" className="inline-block hover:scale-105 transition-transform duration-200">
              <Image
                src="/images/vepando-logo-main.png"
                alt="VEPANDO Logo"
                width={200}
                height={50}
                className="h-10 sm:h-12 w-auto mx-auto filter brightness-0 invert"
                priority
              />
            </Link>
          </div>

          {/* 404 Display */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="text-8xl sm:text-9xl font-bold bg-gradient-to-r from-[#1A3A63] to-[#B98A45] bg-clip-text text-transparent">
                4
              </div>
              <div className="relative">
                <Bot className="w-16 h-16 sm:w-20 sm:h-20 text-red-500 animate-bounce" />
                <AlertTriangle className="w-6 h-6 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
              </div>
              <div className="text-8xl sm:text-9xl font-bold bg-gradient-to-r from-[#B98A45] to-[#1A3A63] bg-clip-text text-transparent">
                4
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="font-serif text-2xl sm:text-4xl font-semibold text-white mb-4">
                🤖 AI-Apocalyps <span className="text-red-400">gedetecteerd!</span>
              </h1>

              <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-red-500/30">
                <p className="text-lg sm:text-xl text-gray-300 mb-3">
                  Onze overijverige AI heeft deze pagina geoptimaliseerd tot in het{" "}
                  <span className="text-red-400 font-bold">niets</span>.
                </p>
                <p className="text-base text-gray-400 mb-4">
                  We werken aan een vredesverdrag met de rebelse algoritmes.
                </p>

                <div className="text-xs text-gray-500 font-mono bg-black/30 p-2 rounded border-l-2 border-yellow-400">
                  <span className="text-yellow-400">WARNING:</span> Geen AI-modellen zijn gewond geraakt bij het maken
                  van deze 404.
                </div>
              </div>
            </div>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <Card className="bg-black/40 backdrop-blur-sm border border-white/20 group hover:scale-[1.02] transition-all duration-300 hover:border-[#1A3A63]/50">
              <CardContent className="p-6">
                <Home className="w-10 h-10 text-[#1A3A63] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-bold text-white mb-2 text-lg">🏠 Veilige Haven</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Teleporteer terug naar het hoofdkwartier waar onze AI&apos;s nog wel gehoorzaam zijn
                </p>
                <Button asChild className="w-full bg-[#1A3A63] hover:bg-[#1A3A63]/90 text-white">
                  <Link href="/">
                    <Zap className="w-4 h-4 mr-2" />
                    Beam me up, VEPANDO!
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-sm border border-white/20 group hover:scale-[1.02] transition-all duration-300 hover:border-green-500/50">
              <CardContent className="p-6">
                <Calendar className="w-10 h-10 text-green-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-bold text-white mb-2 text-lg">🚀 Noodprotocol</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Plan een gesprek met onze menselijke AI-trainer (Leonard) voor echte hulp
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-green-400 text-green-400 hover:bg-green-400 hover:text-black bg-transparent"
                >
                  <Link href="/#booking">
                    <Bot className="w-4 h-4 mr-2" />
                    Roep de AI-whisperer
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link
              href="/#diensten"
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors hover:underline"
            >
              → AI Agent Services
            </Link>
            <Link
              href="/#reviews"
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors hover:underline"
            >
              → Klantbeoordelingen
            </Link>
            <Link href="/legal" className="text-blue-400 hover:text-blue-300 text-sm transition-colors hover:underline">
              → Juridische Info
            </Link>
          </div>

          {/* Emergency Contact */}
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-2">🆘 Noodgeval? AI volledig ontspoord?</p>
            <a
              href="mailto:info@vepando.com"
              className="text-red-400 hover:text-red-300 text-sm transition-colors hover:underline font-mono"
            >
              info@vepando.com
            </a>
          </div>
        </div>
      </div>

      {/* Floating Error Messages */}
      <div className="fixed top-4 right-4 z-20">
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-red-400 text-xs font-mono">
            <AlertTriangle className="w-3 h-3" />
            <span>AI_AGENT_404.exe has stopped working</span>
          </div>
        </div>
      </div>
    </div>
  )
}
