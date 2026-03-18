import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { VolumeX, Volume2, Play } from "lucide-react";
import backgroundMusic from "./assets/backgroundmusic.mp3";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Temples from "./pages/Temples";
import TempleDetail from "./pages/TempleDetail";
import Pilgrimage from "./pages/Pilgrimage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import TourDetail from "./pages/TourDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.loop = true;

      const playAudio = async () => {
        try {
          await audioRef.current?.play();
          setIsPlaying(true);
        } catch (err) {
          console.log("Autoplay blocked by browser policy:", err);
          setIsPlaying(false);
        }
      };

      playAudio();
    }
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(() => {
          // Play failed, perhaps due to browser policy
        });
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/temples" element={<Temples />} />
            <Route path="/temple/:id" element={<TempleDetail />} />
            <Route path="/pilgrimage" element={<Pilgrimage />} />
            <Route path="/tour/:slug" element={<TourDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <audio ref={audioRef} src={backgroundMusic} preload="auto" />
        <button
          onClick={isPlaying ? toggleMute : toggleMusic}
          className="fixed bottom-4 right-4 z-50 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          aria-label={isPlaying ? (isMuted ? "Unmute music" : "Mute music") : "Play music"}
        >
          {isPlaying ? (isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />) : <Play size={24} />}
        </button>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
