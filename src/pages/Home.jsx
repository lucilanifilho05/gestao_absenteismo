import React, { useEffect, useState } from "react";
import { useSEO } from "../hooks/useSEO";
import Header from "../components/Home/Header";
import Hero from "../components/Home/Hero";
import Features from "../components/Home/Features";
import Stats from "../components/Home/Stats";
import CTA from "../components/Home/CTA";
import Footer from "../components/Home/Footer";

const Home = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useSEO({
    title: "Seraphinys | Inteligência Preditiva para Gestão de Absenteísmo",
    description: "Transforme a gestão de ausências com IA preditiva. Reduza o absenteísmo e aumente a produtividade com a Seraphinys.",
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f7ff] to-[#eef0ff] text-gray-900">
      <Header 
        scrolled={scrolled} 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen} 
      />
      
      <Hero />
      <Features />
      <Stats />
      <CTA />
      <Footer />
    </div>
  );
};

export default Home;