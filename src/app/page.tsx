import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ProfileBento from "@/components/ProfileBento";
import Capabilities from "@/components/Capabilities";
import Trajectory from "@/components/Trajectory";
import Archive from "@/components/Archive";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <ProfileBento />
        <Capabilities />
        <Trajectory />
        <Archive />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
