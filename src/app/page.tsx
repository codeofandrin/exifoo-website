import Hero from "@/components/root/Hero"
import Preview from "@/components/root/Preview"
import Features from "@/components/root/Features"
import Benefits from "@/components/root/Benefits"

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Preview />
      <Features />
      <Benefits />
    </div>
  )
}
