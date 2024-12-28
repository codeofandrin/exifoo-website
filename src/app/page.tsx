import Hero from "@/components/root/Hero"
import Preview from "@/components/root/Preview"
import Features from "@/components/root/Features"

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Preview />
      <Features />
    </div>
  )
}
