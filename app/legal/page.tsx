import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Shield, Cookie, Scale, FileText, Mail, Phone, MapPin } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Juridische Informatie - VEPANDO | Privacy, Cookies & Voorwaarden",
  description:
    "Alle juridische informatie van VEPANDO op één plek: privacybeleid, cookiebeleid en algemene voorwaarden. AVG-compliant en transparant.",
  robots: { index: true, follow: true },
}

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Button asChild variant="ghost" size="sm">
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Terug naar home
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">AVG-compliant</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Juridische Informatie</h1>
          <p className="text-lg text-muted-foreground">Privacy, cookies en voorwaarden op één plek</p>
          <p className="text-sm text-muted-foreground mt-2">Laatst bijgewerkt: 12 januari 2025</p>
        </div>

        {/* Quick Navigation */}
        <Card className="glass-card mb-12">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-card-foreground mb-4">Snelle navigatie</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href="#privacy" className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors">
                <Shield className="w-5 h-5 text-primary" />
                <span className="font-medium">Privacybeleid</span>
              </a>
              <a href="#cookies" className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors">
                <Cookie className="w-5 h-5 text-primary" />
                <span className="font-medium">Cookiebeleid</span>
              </a>
              <a
                href="#voorwaarden"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
              >
                <FileText className="w-5 h-5 text-primary" />
                <span className="font-medium">Algemene Voorwaarden</span>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* PRIVACY SECTION */}
        <section id="privacy" className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Privacybeleid</h2>
          </div>

          <Card className="glass-card mb-8">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-xl font-semibold text-card-foreground mb-4">Jouw privacy is belangrijk</h3>
              <p className="text-muted-foreground mb-4">
                VEPANDO is een eenmanszaak gevestigd in Nederland, gespecialiseerd in AI- en automatiseringsdiensten.
                Jouw privacy en de veiligheid van je gegevens zijn van het grootste belang.
              </p>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold text-card-foreground mb-3">Welke gegevens verzamelen we?</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>
                    • <strong>Naam en e-mail:</strong> Voor communicatie
                  </li>
                  <li>
                    • <strong>Bedrijfsinfo:</strong> Voor context van je vraag
                  </li>
                  <li>
                    • <strong>Websitegebruik:</strong> Anonieme statistieken
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold text-card-foreground mb-3">Waarom gebruiken we je gegevens?</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>
                    • <strong>Dienstverlening:</strong> AI-services leveren
                  </li>
                  <li>
                    • <strong>Communicatie:</strong> Vragen beantwoorden
                  </li>
                  <li>
                    • <strong>Analyse:</strong> Website verbeteren
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="border-l-4 border-l-green-500 mb-8">
            <CardContent className="p-6">
              <h4 className="font-semibold text-card-foreground mb-2">Jouw rechten onder de AVG</h4>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="text-sm text-muted-foreground">
                  <p>• Recht op inzage van je gegevens</p>
                  <p>• Recht op correctie van onjuiste gegevens</p>
                  <p>• Recht op verwijdering van je gegevens</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>• Recht op beperking van verwerking</p>
                  <p>• Recht op dataportabiliteit</p>
                  <p>• Recht van bezwaar tegen verwerking</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* COOKIES SECTION */}
        <section id="cookies" className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Cookie className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Cookiebeleid</h2>
          </div>

          <Card className="glass-card mb-8">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-card-foreground mb-4">Wat zijn cookies?</h3>
              <p className="text-muted-foreground">
                Cookies zijn kleine tekstbestanden die op je apparaat worden opgeslagen om de website goed te laten
                functioneren en je ervaring te verbeteren.
              </p>
            </CardContent>
          </Card>

          <div className="grid gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold text-card-foreground mb-2">🔧 Functionele Cookies (Noodzakelijk)</h4>
                <p className="text-sm text-muted-foreground mb-2">Essentieel voor het functioneren van de website.</p>
                <ul className="text-xs text-muted-foreground">
                  <li>• Theme-voorkeur (licht/donker)</li>
                  <li>• Sessie-informatie</li>
                </ul>
                <span className="text-xs text-green-600 font-medium">✅ Geen toestemming vereist</span>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold text-card-foreground mb-2">📊 Analytische Cookies</h4>
                <p className="text-sm text-muted-foreground mb-2">Voor anonieme bezoekersstatistieken.</p>
                <ul className="text-xs text-muted-foreground">
                  <li>• Google Analytics (geanonimiseerd)</li>
                  <li>• Bewaartijd: 2 jaar</li>
                </ul>
                <span className="text-xs text-blue-600 font-medium">ℹ️ Toestemming vereist</span>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold text-card-foreground mb-2">🎯 Marketing Cookies</h4>
                <p className="text-sm text-muted-foreground mb-2">Voor gepersonaliseerde advertenties.</p>
                <ul className="text-xs text-muted-foreground">
                  <li>• LinkedIn Insight</li>
                  <li>• Cal.com afspraakplanning</li>
                </ul>
                <span className="text-xs text-orange-600 font-medium">⚠️ Toestemming vereist</span>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* TERMS SECTION */}
        <section id="voorwaarden" className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <FileText className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Algemene Voorwaarden</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold text-card-foreground mb-3">Ontwikkelproces</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Intake en analyse van processen</li>
                  <li>• Ontwerp en specificatie AI Agent</li>
                  <li>• Ontwikkeling en testing</li>
                  <li>• Implementatie en overdracht</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold text-card-foreground mb-3">Betaling & Garantie</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 50% vooruit, 50% bij oplevering</li>
                  <li>• Betalingstermijn: 14 dagen</li>
                  <li>• 3 maanden garantie op gebreken</li>
                  <li>• Gratis bugfixes binnen garantie</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="border-l-4 border-l-blue-500 mb-8">
            <CardContent className="p-6">
              <h4 className="font-semibold text-card-foreground mb-3">Belangrijke bepalingen</h4>
              <div className="grid gap-4 md:grid-cols-2 text-sm text-muted-foreground">
                <div>
                  <p>
                    <strong>Levertijd:</strong> 30 dagen vanaf akkoord ontwerp
                  </p>
                  <p>
                    <strong>Eigendom:</strong> AI Agent wordt jouw eigendom na betaling
                  </p>
                  <p>
                    <strong>Aansprakelijkheid:</strong> Beperkt tot gefactureerd bedrag
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Geheimhouding:</strong> Wederzijdse vertrouwelijkheid
                  </p>
                  <p>
                    <strong>Toepasselijk recht:</strong> Nederlands recht
                  </p>
                  <p>
                    <strong>Geschillen:</strong> Rechter Amsterdam
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CONTACT SECTION */}
        <Card className="glass-card">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-card-foreground mb-4">Contact & Vragen</h3>
                <p className="text-muted-foreground mb-6">
                  Heb je vragen over deze juridische informatie? Neem gerust contact op.
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-primary" />
                      <a href="mailto:info@vepando.com" className="text-primary hover:underline">
                        info@vepando.com
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-primary" />
                      <a href="tel:+31612345678" className="text-primary hover:underline">
                        +31 6 12 34 56 78
                      </a>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>
                      <strong>VEPANDO</strong>
                    </p>
                    <p>KvK: 87313634</p>
                    <p>BTW: NL004567890B01</p>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p>Hoofdstraat 123</p>
                        <p>1234 AB Amsterdam</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-12 pt-8 border-t border-border">
          <Button asChild size="lg">
            <Link href="/" className="flex items-center gap-2 mx-auto">
              <ArrowLeft className="w-4 h-4" />
              Terug naar VEPANDO
            </Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
