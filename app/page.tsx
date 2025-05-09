"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { Environment, Float, Sparkles } from "@react-three/drei"
import { ChevronDown, Dumbbell, Apple, Clock, LineChart, Instagram, Twitter, Facebook, Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// 3D Models
const DumbbellModel = () => {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh position={[0, 0, 0]} scale={1.5}>
        <cylinderGeometry args={[0.5, 0.5, 0.2, 32]} />
        <meshStandardMaterial color="#ff0040" metalness={0.8} roughness={0.2} />

        {/* Left weight */}
        <mesh position={[-1.5, 0, 0]}>
          <cylinderGeometry args={[1, 1, 0.8, 32]} />
          <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Bar */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.15, 0.15, 3, 32]} />
          <meshStandardMaterial color="#777" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Right weight */}
        <mesh position={[1.5, 0, 0]}>
          <cylinderGeometry args={[1, 1, 0.8, 32]} />
          <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
        </mesh>
      </mesh>
    </Float>
  )
}

// Magnetic Button Component
const MagneticButton = ({ children, className, ...props }) => {
  const buttonRef = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setPosition({ x, y })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: isHovered ? position.x * 0.3 : 0,
        y: isHovered ? position.y * 0.3 : 0,
      }}
      className="relative"
    >
      <Button
        className={cn(
          "relative overflow-hidden transition-all duration-300",
          isHovered && "shadow-[0_0_15px_rgba(255,0,64,0.5)]",
          className,
        )}
        {...props}
      >
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-500/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
        {children}
      </Button>
    </motion.div>
  )
}

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className="relative overflow-hidden bg-black/40 backdrop-blur-sm border-neutral-800 p-6 h-full transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative z-10">
        <div className="mb-4 rounded-full w-12 h-12 flex items-center justify-center bg-red-500/20 text-red-500">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-neutral-400">{description}</p>
      </div>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </Card>
  )
}

// Trainer Card Component
const TrainerCard = ({ name, specialty, image }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative overflow-hidden rounded-xl"
      whileHover={{ y: -10 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[3/4] overflow-hidden rounded-xl relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
        />
        <div className="absolute bottom-0 left-0 p-4 z-20">
          <h3 className="text-xl font-bold text-white">{name}</h3>
          <p className="text-red-400">{specialty}</p>
        </div>
      </div>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 border-2 border-red-500 rounded-xl z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Pricing Card Component
const PricingCard = ({ title, price, features, isPopular }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className={cn(
        "relative overflow-hidden bg-black/40 backdrop-blur-sm border-neutral-800 p-6 transition-all duration-500",
        isPopular && "border-red-500/50",
        isHovered && "shadow-[0_0_30px_rgba(255,0,64,0.3)]",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isPopular && (
        <div className="absolute top-0 right-0">
          <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
        </div>
      )}
      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <div className="mb-4">
          <span className="text-3xl font-bold">${price}</span>
          <span className="text-neutral-400">/month</span>
        </div>
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span className="text-neutral-300">{feature}</span>
            </li>
          ))}
        </ul>
        <MagneticButton className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0">
          Choose Plan
        </MagneticButton>
      </div>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </Card>
  )
}

// Testimonial Card Component
const TestimonialCard = ({ name, text, image }) => {
  return (
    <Card className="bg-black/40 backdrop-blur-sm border-neutral-800 p-6 h-full">
      <div className="flex flex-col h-full">
        <div className="mb-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-red-500">
            <img src={image || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="font-bold">{name}</h4>
            <div className="flex text-red-500">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
        <p className="text-neutral-400 flex-grow">{text}</p>
      </div>
    </Card>
  )
}

// Class Schedule Card Component
const ClassCard = ({ name, time, trainer, intensity }) => {
  return (
    <Card className="bg-black/40 backdrop-blur-sm border-neutral-800 p-4">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-bold text-lg">{name}</h4>
          <p className="text-neutral-400">{time}</p>
          <p className="text-sm text-red-400">with {trainer}</p>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-sm text-neutral-400 mb-1">Intensity</div>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={cn("w-2 h-6 rounded-full", i < intensity ? "bg-red-500" : "bg-neutral-700")} />
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}

// Background Particles Component
const BackgroundParticles = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-black to-black" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
        <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-red-500 to-transparent" />
        <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-red-500 to-transparent" />
      </div>
    </div>
  )
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const trainersRef = useRef(null)
  const scheduleRef = useRef(null)
  const pricingRef = useRef(null)
  const testimonialsRef = useRef(null)
  const contactRef = useRef(null)

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.8])

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
    setMobileMenuOpen(false)
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <BackgroundParticles />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-neutral-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">NEXUS</span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollTo(heroRef)} className="text-sm hover:text-red-500 transition-colors">
                HOME
              </button>
              <button onClick={() => scrollTo(featuresRef)} className="text-sm hover:text-red-500 transition-colors">
                FEATURES
              </button>
              <button onClick={() => scrollTo(trainersRef)} className="text-sm hover:text-red-500 transition-colors">
                TRAINERS
              </button>
              <button onClick={() => scrollTo(scheduleRef)} className="text-sm hover:text-red-500 transition-colors">
                CLASSES
              </button>
              <button onClick={() => scrollTo(pricingRef)} className="text-sm hover:text-red-500 transition-colors">
                PRICING
              </button>
              <button onClick={() => scrollTo(contactRef)} className="text-sm hover:text-red-500 transition-colors">
                CONTACT
              </button>
            </nav>

            <div className="hidden md:block">
              <MagneticButton className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0">
                JOIN NOW
              </MagneticButton>
            </div>

            <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/95 pt-20 px-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col gap-4">
              <button
                onClick={() => scrollTo(heroRef)}
                className="py-3 text-left border-b border-neutral-800 hover:text-red-500 transition-colors"
              >
                HOME
              </button>
              <button
                onClick={() => scrollTo(featuresRef)}
                className="py-3 text-left border-b border-neutral-800 hover:text-red-500 transition-colors"
              >
                FEATURES
              </button>
              <button
                onClick={() => scrollTo(trainersRef)}
                className="py-3 text-left border-b border-neutral-800 hover:text-red-500 transition-colors"
              >
                TRAINERS
              </button>
              <button
                onClick={() => scrollTo(scheduleRef)}
                className="py-3 text-left border-b border-neutral-800 hover:text-red-500 transition-colors"
              >
                CLASSES
              </button>
              <button
                onClick={() => scrollTo(pricingRef)}
                className="py-3 text-left border-b border-neutral-800 hover:text-red-500 transition-colors"
              >
                PRICING
              </button>
              <button
                onClick={() => scrollTo(contactRef)}
                className="py-3 text-left border-b border-neutral-800 hover:text-red-500 transition-colors"
              >
                CONTACT
              </button>
              <div className="mt-4">
                <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0">
                  JOIN NOW
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-20">
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold bg-red-500/20 text-red-500 rounded-full">
                THE FUTURE OF FITNESS
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Train Smarter, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">
                  Live Stronger
                </span>
              </h1>
              <p className="text-neutral-400 mb-8 max-w-lg">
                Experience the next evolution in fitness with cutting-edge equipment, personalized training, and a
                community that pushes you beyond your limits.
              </p>
              <div className="flex flex-wrap gap-4">
                <MagneticButton className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0">
                  JOIN THE FUTURE OF FITNESS
                </MagneticButton>
                <MagneticButton variant="outline" className="border-neutral-700 hover:bg-neutral-900/50">
                  TAKE A TOUR
                </MagneticButton>
              </div>
            </motion.div>

            <motion.div style={{ opacity, scale }} className="relative h-[400px] lg:h-[600px]">
              <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />
                <DumbbellModel />
                <Sparkles count={100} scale={10} size={1} speed={0.3} color="#ff0040" />
                <Environment preset="night" />
              </Canvas>

              <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="flex flex-col items-center gap-2 text-neutral-500"
                >
                  <span className="text-xs">SCROLL DOWN</span>
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-block px-3 py-1 mb-4 text-xs font-semibold bg-red-500/20 text-red-500 rounded-full"
            >
              FEATURES
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              The Complete Fitness Experience
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-neutral-400 max-w-2xl mx-auto"
            >
              Our state-of-the-art facility combines cutting-edge technology with expert guidance to deliver a fitness
              experience like no other.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <FeatureCard
                icon={Dumbbell}
                title="Personal Training"
                description="One-on-one sessions with expert trainers who create customized workout plans to help you reach your goals faster."
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <FeatureCard
                icon={Apple}
                title="Smart Diet Plans"
                description="Nutrition plans tailored to your body type, goals, and preferences, designed by certified nutritionists."
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <FeatureCard
                icon={Clock}
                title="24/7 Access"
                description="Our facilities are open around the clock, allowing you to work out whenever it fits your schedule."
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <FeatureCard
                icon={LineChart}
                title="Fitness Tracking"
                description="Advanced tracking technology that monitors your progress and provides real-time feedback to optimize your workouts."
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trainers Section */}
      <section ref={trainersRef} className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-block px-3 py-1 mb-4 text-xs font-semibold bg-red-500/20 text-red-500 rounded-full"
            >
              EXPERT TRAINERS
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Meet Our Elite Team
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-neutral-400 max-w-2xl mx-auto"
            >
              Our certified trainers are dedicated to helping you achieve your fitness goals with personalized guidance
              and motivation.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <TrainerCard
                name="Alex Morgan"
                specialty="Strength & Conditioning"
                image="/placeholder.svg?height=400&width=300"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <TrainerCard name="Sarah Chen" specialty="HIIT & Cardio" image="/placeholder.svg?height=400&width=300" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <TrainerCard
                name="Marcus Johnson"
                specialty="Bodybuilding"
                image="/placeholder.svg?height=400&width=300"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <TrainerCard
                name="Emma Rodriguez"
                specialty="Yoga & Flexibility"
                image="/placeholder.svg?height=400&width=300"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Class Schedule Section */}
      <section ref={scheduleRef} className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{
                opacity: 1,
                y: 0,
              }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-block px-3 py-1 mb-4 text-xs font-semibold bg-red-500/20 text-red-500 rounded-full"
            >
              CLASS SCHEDULE
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Weekly Class Lineup
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-neutral-400 max-w-2xl mx-auto"
            >
              Join our diverse range of classes led by expert trainers, designed to challenge and inspire you at every
              fitness level.
            </motion.p>
          </div>

          <Tabs defaultValue="monday" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-7 mb-8">
              <TabsTrigger value="monday">MON</TabsTrigger>
              <TabsTrigger value="tuesday">TUE</TabsTrigger>
              <TabsTrigger value="wednesday">WED</TabsTrigger>
              <TabsTrigger value="thursday">THU</TabsTrigger>
              <TabsTrigger value="friday">FRI</TabsTrigger>
              <TabsTrigger value="saturday">SAT</TabsTrigger>
              <TabsTrigger value="sunday">SUN</TabsTrigger>
            </TabsList>
            <TabsContent value="monday" className="space-y-4">
              <ClassCard name="Power HIIT" time="6:00 AM - 7:00 AM" trainer="Sarah Chen" intensity={4} />
              <ClassCard name="Strength Basics" time="9:00 AM - 10:30 AM" trainer="Alex Morgan" intensity={3} />
              <ClassCard name="Cardio Blast" time="12:00 PM - 1:00 PM" trainer="Marcus Johnson" intensity={5} />
              <ClassCard name="Evening Yoga" time="6:00 PM - 7:30 PM" trainer="Emma Rodriguez" intensity={2} />
            </TabsContent>
            <TabsContent value="tuesday" className="space-y-4">
              <ClassCard name="Morning Flow" time="7:00 AM - 8:00 AM" trainer="Emma Rodriguez" intensity={2} />
              <ClassCard name="Bodybuilding" time="10:00 AM - 11:30 AM" trainer="Marcus Johnson" intensity={4} />
              <ClassCard name="Lunch Express" time="12:30 PM - 1:15 PM" trainer="Sarah Chen" intensity={3} />
              <ClassCard name="Advanced Strength" time="7:00 PM - 8:30 PM" trainer="Alex Morgan" intensity={5} />
            </TabsContent>
            <TabsContent value="wednesday" className="space-y-4">
              <ClassCard name="HIIT Circuit" time="6:00 AM - 7:00 AM" trainer="Sarah Chen" intensity={5} />
              <ClassCard name="Core Focus" time="9:00 AM - 10:00 AM" trainer="Emma Rodriguez" intensity={3} />
              <ClassCard name="Functional Training" time="12:00 PM - 1:00 PM" trainer="Alex Morgan" intensity={4} />
              <ClassCard name="Evening Cardio" time="6:00 PM - 7:00 PM" trainer="Marcus Johnson" intensity={4} />
            </TabsContent>
            <TabsContent value="thursday" className="space-y-4">
              <ClassCard name="Strength & Tone" time="7:00 AM - 8:30 AM" trainer="Alex Morgan" intensity={3} />
              <ClassCard name="Flexibility" time="10:00 AM - 11:00 AM" trainer="Emma Rodriguez" intensity={2} />
              <ClassCard name="Express HIIT" time="12:30 PM - 1:15 PM" trainer="Sarah Chen" intensity={4} />
              <ClassCard name="Muscle Building" time="7:00 PM - 8:30 PM" trainer="Marcus Johnson" intensity={5} />
            </TabsContent>
            <TabsContent value="friday" className="space-y-4">
              <ClassCard name="Morning Cardio" time="6:00 AM - 7:00 AM" trainer="Marcus Johnson" intensity={4} />
              <ClassCard name="Pilates Fusion" time="9:00 AM - 10:00 AM" trainer="Emma Rodriguez" intensity={3} />
              <ClassCard name="Lunch HIIT" time="12:00 PM - 1:00 PM" trainer="Sarah Chen" intensity={5} />
              <ClassCard name="Weekend Prep" time="6:00 PM - 7:30 PM" trainer="Alex Morgan" intensity={4} />
            </TabsContent>
            <TabsContent value="saturday" className="space-y-4">
              <ClassCard name="Weekend Warrior" time="8:00 AM - 9:30 AM" trainer="Alex Morgan" intensity={5} />
              <ClassCard name="Full Body Blast" time="10:30 AM - 12:00 PM" trainer="Marcus Johnson" intensity={4} />
              <ClassCard name="Yoga Flow" time="1:00 PM - 2:30 PM" trainer="Emma Rodriguez" intensity={3} />
            </TabsContent>
            <TabsContent value="sunday" className="space-y-4">
              <ClassCard name="Recovery Yoga" time="9:00 AM - 10:30 AM" trainer="Emma Rodriguez" intensity={2} />
              <ClassCard name="Open Gym" time="11:00 AM - 3:00 PM" trainer="All Trainers" intensity={3} />
              <ClassCard name="Meditation" time="4:00 PM - 5:00 PM" trainer="Emma Rodriguez" intensity={1} />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Pricing Section */}
      <section ref={pricingRef} className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-block px-3 py-1 mb-4 text-xs font-semibold bg-red-500/20 text-red-500 rounded-full"
            >
              MEMBERSHIP PLANS
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Choose Your Path
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-neutral-400 max-w-2xl mx-auto"
            >
              Flexible membership options designed to fit your lifestyle and goals, with no long-term commitments
              required.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <PricingCard
                title="Basic"
                price={49}
                features={[
                  "Access to gym facilities",
                  "Basic equipment usage",
                  "2 group classes per week",
                  "Locker room access",
                  "Fitness assessment",
                ]}
                isPopular={false}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <PricingCard
                title="Premium"
                price={89}
                features={[
                  "Unlimited gym access",
                  "All equipment usage",
                  "Unlimited group classes",
                  "1 personal training session/month",
                  "Nutrition consultation",
                  "Access to mobile app",
                ]}
                isPopular={true}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <PricingCard
                title="Elite"
                price={129}
                features={[
                  "24/7 premium access",
                  "All premium equipment",
                  "Unlimited classes with priority",
                  "4 personal training sessions/month",
                  "Advanced nutrition planning",
                  "Recovery spa access",
                  "Exclusive events",
                ]}
                isPopular={false}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-block px-3 py-1 mb-4 text-xs font-semibold bg-red-500/20 text-red-500 rounded-full"
            >
              TESTIMONIALS
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Success Stories
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-neutral-400 max-w-2xl mx-auto"
            >
              Hear from our members who have transformed their lives through dedication and the support of our
              community.
            </motion.p>
          </div>

          <Carousel className="max-w-5xl mx-auto">
            <CarouselContent>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3 p-2">
                <TestimonialCard
                  name="Michael T."
                  text="I've tried many gyms before, but NEXUS is on another level. The trainers are exceptional and the atmosphere pushes you to achieve more than you thought possible."
                  image="/placeholder.svg?height=100&width=100"
                />
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3 p-2">
                <TestimonialCard
                  name="Jennifer K."
                  text="The personalized approach at NEXUS has completely changed my fitness journey. I've lost 30 pounds and gained confidence I never thought I'd have."
                  image="/placeholder.svg?height=100&width=100"
                />
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3 p-2">
                <TestimonialCard
                  name="David L."
                  text="As a busy professional, the 24/7 access and efficient workouts have been game-changing. The trainers know exactly how to maximize my limited time."
                  image="/placeholder.svg?height=100&width=100"
                />
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3 p-2">
                <TestimonialCard
                  name="Sophia R."
                  text="The community aspect of NEXUS keeps me coming back. It's not just a gym, it's a supportive family that celebrates every victory together."
                  image="/placeholder.svg?height=100&width=100"
                />
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3 p-2">
                <TestimonialCard
                  name="James W."
                  text="The technology integration at NEXUS is incredible. Being able to track my progress in real-time has been a huge motivator in reaching my goals."
                  image="/placeholder.svg?height=100&width=100"
                />
              </CarouselItem>
            </CarouselContent>
            <div className="flex justify-center mt-8">
              <CarouselPrevious className="static transform-none mr-2" />
              <CarouselNext className="static transform-none ml-2" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative py-20 bg-gradient-to-b from-black to-neutral-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-black/40 backdrop-blur-sm border border-neutral-800 rounded-xl p-8">
            <div className="text-center mb-8">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-bold mb-4"
              >
                Stay Updated
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-neutral-400"
              >
                Subscribe to our newsletter for exclusive fitness tips, special offers, and upcoming events.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-neutral-900/50 border-neutral-700 text-white placeholder:text-neutral-500 focus:border-red-500 focus:ring-red-500/20"
              />
              <MagneticButton className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0 sm:w-auto w-full">
                SUBSCRIBE
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-block px-3 py-1 mb-4 text-xs font-semibold bg-red-500/20 text-red-500 rounded-full"
            >
              CONTACT US
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Get In Touch
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-neutral-400 max-w-2xl mx-auto"
            >
              Have questions or ready to start your fitness journey? Reach out to our team.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">Visit Us</h3>
                  <p className="text-neutral-400">
                    123 Fitness Avenue
                    <br />
                    New York, NY 10001
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Opening Hours</h3>
                  <p className="text-neutral-400">
                    Monday - Friday: 24 Hours
                    <br />
                    Saturday - Sunday: 6am - 10pm
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Contact</h3>
                  <p className="text-neutral-400">
                    info@nexusfitness.com
                    <br />
                    (555) 123-4567
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Follow Us</h3>
                  <div className="flex gap-4">
                    <a href="#" className="text-neutral-400 hover:text-red-500 transition-colors">
                      <Instagram className="w-6 h-6" />
                    </a>
                    <a href="#" className="text-neutral-400 hover:text-red-500 transition-colors">
                      <Twitter className="w-6 h-6" />
                    </a>
                    <a href="#" className="text-neutral-400 hover:text-red-500 transition-colors">
                      <Facebook className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      className="bg-neutral-900/50 border-neutral-700 text-white placeholder:text-neutral-500 focus:border-red-500 focus:ring-red-500/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Your email"
                      className="bg-neutral-900/50 border-neutral-700 text-white placeholder:text-neutral-500 focus:border-red-500 focus:ring-red-500/20"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    placeholder="Subject"
                    className="bg-neutral-900/50 border-neutral-700 text-white placeholder:text-neutral-500 focus:border-red-500 focus:ring-red-500/20"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Your message"
                    className="min-h-[120px] bg-neutral-900/50 border-neutral-700 text-white placeholder:text-neutral-500 focus:border-red-500 focus:ring-red-500/20"
                  />
                </div>
                <MagneticButton className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0">
                  SEND MESSAGE
                </MagneticButton>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 border-t border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">NEXUS</span>
            </div>

            <div className="flex flex-wrap justify-center gap-8 mb-4 md:mb-0">
              <button
                onClick={() => scrollTo(heroRef)}
                className="text-sm text-neutral-400 hover:text-red-500 transition-colors"
              >
                HOME
              </button>
              <button
                onClick={() => scrollTo(featuresRef)}
                className="text-sm text-neutral-400 hover:text-red-500 transition-colors"
              >
                FEATURES
              </button>
              <button
                onClick={() => scrollTo(trainersRef)}
                className="text-sm text-neutral-400 hover:text-red-500 transition-colors"
              >
                TRAINERS
              </button>
              <button
                onClick={() => scrollTo(scheduleRef)}
                className="text-sm text-neutral-400 hover:text-red-500 transition-colors"
              >
                CLASSES
              </button>
              <button
                onClick={() => scrollTo(pricingRef)}
                className="text-sm text-neutral-400 hover:text-red-500 transition-colors"
              >
                PRICING
              </button>
              <button
                onClick={() => scrollTo(contactRef)}
                className="text-sm text-neutral-400 hover:text-red-500 transition-colors"
              >
                CONTACT
              </button>
            </div>

            <div className="flex gap-4">
              <a href="#" className="text-neutral-400 hover:text-red-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-red-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-red-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-neutral-800 text-center text-sm text-neutral-500">
            <p>© {new Date().getFullYear()} NEXUS Fitness. All rights reserved.</p>
            <div className="flex justify-center gap-4 mt-2">
              <a href="#" className="hover:text-neutral-300 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-neutral-300 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
