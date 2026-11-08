import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import MarqueeStrip from '../components/MarqueeStrip'
import AboutSection from '../components/AboutSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'


function Home() {

  return (
    <>
      <Navbar/>

      <main>

        <Hero />

        <MarqueeStrip />

        <AboutSection />

        <ContactSection />

      </main>

      <Footer />

    </>
  )
}

export default Home