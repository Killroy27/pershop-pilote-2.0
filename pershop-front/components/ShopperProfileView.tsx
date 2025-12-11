
"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"
import { Calendar, CheckCircle2, Clock, Globe, Instagram, Linkedin, MapPin, X } from "lucide-react"
import { useState } from "react"

type ShopperProfileViewProps = {
  shopper: any
  onClose: () => void
}

export default function ShopperProfileView({ shopper, onClose }: ShopperProfileViewProps) {
  const [showBooking, setShowBooking] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)

  // Mock data for the luxury view
  const galleryImages = [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=300&auto=format&fit=crop"
  ]
  const services = [
    { title: "Séance Stylisme Personnalisée (2h)", price: "350 €", desc: "Consultation colorimétrie, morphologie et conseils ciblés en boutique." },
    { title: "Forfait Shopping VIP (Demi-journée)", price: "1500 €", desc: "Parcours shopping exclusif avec accès privé, essayages guidés." },
    { title: "Abonnement Annuel Elite", price: "Sur devis", desc: "Accès privilégié, conciergerie de mode, gestion complète de garde-robe." }
  ]

  // Mock available dates (next 7 days)
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i + 1)
    return {
      full: date.toISOString().split('T')[0],
      display: date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })
    }
  })

  // Mock time slots
  const timeSlots = ["09:00", "10:30", "14:00", "15:30", "17:00"]

  const handleBooking = () => {
    if (selectedDate && selectedSlot) {
      setBookingConfirmed(true)
      setTimeout(() => {
        setBookingConfirmed(false)
        setShowBooking(false)
        setSelectedDate(null)
        setSelectedSlot(null)
      }, 3000)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-5xl bg-background border border-amber-500/20 rounded-2xl shadow-[0_0_50px_-20px_rgba(251,191,36,0.2)] overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-4 right-4 z-20 text-white/50 hover:text-white"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>

        {/* TOP SECTION */}
        <div className="relative h-64 md:h-80 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
          
          <div className="absolute -bottom-16 left-8 md:left-12 flex items-end gap-6">
            <div className="h-32 w-32 md:h-40 md:w-40 rounded-full border-4 border-background bg-zinc-800 shrink-0 overflow-hidden shadow-2xl">
              <div className="h-full w-full flex items-center justify-center text-4xl font-serif text-white/20 bg-gradient-to-br from-amber-500/20 to-zinc-900">
                {shopper.shopper_name.charAt(0)}
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 left-44 md:left-60 space-y-1 text-white">
            <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight">{shopper.shopper_name}</h2>
            <div className="flex items-center gap-2 text-amber-400 font-medium">
                <MapPin className="h-4 w-4" /> {shopper.location} • Personal Shopper Elite
            </div>
          </div>

          <div className="absolute top-8 right-8 z-10 hidden md:block">
            <div className="h-24 w-24 rounded-full border-2 border-amber-500 bg-black/50 backdrop-blur flex flex-col items-center justify-center text-amber-400 shadow-xl shadow-amber-500/20 animate-in zoom-in spin-in-3 duration-700">
                <span className="text-2xl font-bold">{shopper.match_score}%</span>
                <span className="text-[10px] uppercase tracking-wider font-semibold">Match</span>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="pt-20 px-8 pb-12 grid md:grid-cols-3 gap-12">
            
            {/* LEFT COLUMN (2/3) */}
            <div className="md:col-span-2 space-y-10">
                <section>
                    <h3 className="text-2xl font-serif font-bold mb-4 flex items-center gap-2">
                        À propos
                        <div className="h-[1px] bg-border flex-1 ml-4 opacity-50" />
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-lg font-light">
                        {shopper.bio || "Expert en création de garde-robes de luxe pour une clientèle internationale exigeante. Avec plus d'une décennie d'expérience dans la haute couture, je mêle l'élégance parisienne à des stratégies de style personnalisées. J'excelle dans la sélection de pièces uniques, la création de looks confiants pour les affaires et l'événementiel."}
                    </p>
                </section>

                <section>
                    <h3 className="text-xl font-serif font-bold mb-4">Spécialités</h3>
                    <div className="flex flex-wrap gap-2">
                        {shopper.tags.map((tag: string) => (
                            <Badge key={tag} variant="outline" className="px-3 py-1 text-sm border-amber-500/40 text-amber-500 bg-amber-500/5">
                                {tag}
                            </Badge>
                        ))}
                        <Badge variant="outline" className="px-3 py-1 text-sm border-muted text-muted-foreground">Mode Luxe</Badge>
                        <Badge variant="outline" className="px-3 py-1 text-sm border-muted text-muted-foreground">Colorimétrie</Badge>
                    </div>
                </section>

                <section>
                    <h3 className="text-xl font-serif font-bold mb-4">Portfolio</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {galleryImages.map((src, i) => (
                            <div key={i} className="aspect-[3/4] rounded-lg overflow-hidden bg-zinc-900 border border-white/5 relative group cursor-pointer">
                                <img src={src} alt="Portfolio" className="object-cover w-full h-full opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                                    <span className="text-xs text-white">Lookbook {2024 - i}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* RIGHT COLUMN (1/3) - SIDEBAR */}
            <div className="space-y-8">
                <div className="bg-secondary/20 p-6 rounded-xl border border-white/5">
                    <h3 className="text-2xl font-serif font-bold mb-6">Services & Tarifs</h3>
                    <div className="space-y-6">
                        {services.map((s, i) => (
                            <div key={i} className="space-y-1">
                                <div className="flex justify-between items-baseline">
                                    <span className="font-semibold text-sm">{s.title}</span>
                                    <span className="font-bold text-amber-500">{s.price}</span>
                                </div>
                                <p className="text-xs text-muted-foreground">{s.desc}</p>
                                {i < services.length - 1 && <div className="h-[1px] bg-border pt-4" />}
                            </div>
                        ))}
                    </div>
                    
                    <AnimatePresence mode="wait">
                      {!showBooking ? (
                        <motion.div
                          key="buttons"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="space-y-3 mt-8"
                        >
                          <Button 
                            onClick={() => setShowBooking(true)}
                            className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold h-12 gap-2"
                          >
                            <Calendar className="h-4 w-4" /> Réserver un Créneau
                          </Button>
                          <Button variant="outline" className="w-full border-amber-500/50 text-amber-500 hover:bg-amber-500/10">
                            Contactez {shopper.shopper_name.split(' ')[0]}
                          </Button>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="booking"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="mt-8 space-y-4"
                        >
                          {bookingConfirmed ? (
                            <div className="bg-primary/20 border border-primary/40 rounded-lg p-6 text-center space-y-2">
                              <CheckCircle2 className="h-12 w-12 text-primary mx-auto" />
                              <h4 className="font-bold text-primary">Réservation Confirmée !</h4>
                              <p className="text-xs text-muted-foreground">
                                Vous recevrez un email de confirmation sous peu.
                              </p>
                            </div>
                          ) : (
                            <>
                              <div>
                                <label className="text-xs font-semibold text-muted-foreground mb-2 block">Choisissez une date</label>
                                <div className="grid grid-cols-3 gap-2">
                                  {availableDates.slice(0, 6).map((date) => (
                                    <button
                                      key={date.full}
                                      onClick={() => setSelectedDate(date.full)}
                                      className={`p-2 rounded-lg text-xs font-medium transition-all border ${
                                        selectedDate === date.full
                                          ? 'bg-amber-500 text-black border-amber-500'
                                          : 'bg-secondary/40 border-white/5 hover:border-amber-500/50'
                                      }`}
                                    >
                                      {date.display}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {selectedDate && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                >
                                  <label className="text-xs font-semibold text-muted-foreground mb-2 block flex items-center gap-1">
                                    <Clock className="h-3 w-3" /> Horaire disponible
                                  </label>
                                  <div className="grid grid-cols-2 gap-2">
                                    {timeSlots.map((slot) => (
                                      <button
                                        key={slot}
                                        onClick={() => setSelectedSlot(slot)}
                                        className={`p-2 rounded-lg text-sm font-medium transition-all border ${
                                          selectedSlot === slot
                                            ? 'bg-amber-500 text-black border-amber-500'
                                            : 'bg-secondary/40 border-white/5 hover:border-amber-500/50'
                                        }`}
                                      >
                                        {slot}
                                      </button>
                                    ))}
                                  </div>
                                </motion.div>
                              )}

                              <div className="flex gap-2 pt-2">
                                <Button
                                  variant="outline"
                                  onClick={() => {
                                    setShowBooking(false)
                                    setSelectedDate(null)
                                    setSelectedSlot(null)
                                  }}
                                  className="flex-1"
                                >
                                  Annuler
                                </Button>
                                <Button
                                  onClick={handleBooking}
                                  disabled={!selectedDate || !selectedSlot}
                                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-black font-bold disabled:opacity-50"
                                >
                                  Confirmer
                                </Button>
                              </div>
                            </>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex justify-center gap-6 mt-6 text-muted-foreground">
                        <Linkedin className="h-5 w-5 hover:text-white cursor-pointer transition-colors" />
                        <Instagram className="h-5 w-5 hover:text-white cursor-pointer transition-colors" />
                        <Globe className="h-5 w-5 hover:text-white cursor-pointer transition-colors" />
                    </div>
                </div>

                <div className="bg-primary/10 p-4 rounded-xl border border-primary/20 flex gap-4 items-start">
                    <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-bold text-primary text-sm">Satisfaction Garantie</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                            Nos personal shoppers sont vérifiés et notés par la communauté Pershop.
                        </p>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </motion.div>
  )
}
