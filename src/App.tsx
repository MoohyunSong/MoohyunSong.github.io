import { About } from "@/components/About"
import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import { Projects } from "@/components/Projects"
import { Publications } from "@/components/Publications"
import { SelectedPublications } from "@/components/SelectedPublications"
import { Vitae } from "@/components/Vitae"

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-[920px] px-8">
        <About />
        <SelectedPublications />
        <Publications />
        <Projects />
        <Vitae />
      </main>
      <Footer />
    </div>
  )
}

export default App
