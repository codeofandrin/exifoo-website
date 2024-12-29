import Hero from "@/components/root/Hero"
import Preview from "@/components/root/Preview"
import Features from "@/components/root/Features"
import Benefits from "@/components/root/Benefits"
import Pricing from "@/components/root/Pricing"
import Testimonials from "@/components/root/Testimonials"
import CTA from "@/components/root/CTA"

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Preview />
      <Features />
      <Benefits />
      <Pricing />
      <Testimonials />
      <CTA />
    </div>
  )
}
