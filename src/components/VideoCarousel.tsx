import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const videos = [

  { src: "/videos/temple-video-1.mp4", title: "Temple Experience" },
  { src: "/videos/temple-video-2.mp4", title: "Devotee Testimonial" },
  { src: "/videos/temple-video-3.mp4", title: "Sacred Moments" },
  { src: "/videos/temple-video-4.mp4", title: "Pilgrimage Journey" },
  { src: "/videos/video.mp4", title: "Featured Temple Video" },
];

const VideoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  }, [currentIndex]);

  return (
    <section className="relative py-20 overflow-hidden bg-[#ede7de]">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center space-y-4 mb-14">
          <span className="text-saffron font-body text-sm uppercase tracking-widest">
            Watch & Experience
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Temple Videos & Testimonials
          </h2>
          <div className="w-24 h-1 bg-saffron mx-auto rounded-full" />
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            Witness the divine beauty of sacred temples and hear from fellow pilgrims about their spiritual experiences.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Left Arrow */}
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 z-10 h-12 w-12 rounded-full bg-gradient-hero text-white hover:opacity-90 shadow-elevated border-none"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          {/* Video Container with Dynamic Glow */}
          <div className="relative aspect-[9/16] max-h-[70vh] mx-auto">
            {/* Dynamic Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] -z-10 opacity-50 blur-3xl">
              <video
                key={`bg-${currentIndex}`}
                className="w-full h-full object-cover rounded-full"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={videos[currentIndex].src} type="video/mp4" />
              </video>
            </div>

            {/* Main Video Player */}
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-elevated bg-black">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                controls
                autoPlay
                muted
                playsInline
                key={currentIndex}
              >
                <source src={videos[currentIndex].src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Right Arrow */}
          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 z-10 h-12 w-12 rounded-full bg-gradient-hero text-white hover:opacity-90 shadow-elevated border-none"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                  ? "bg-saffron w-8"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
              />
            ))}
          </div>

          {/* Video Title */}
          <p className="text-center mt-4 font-display text-lg text-foreground">
            {videos[currentIndex].title}
          </p>
        </div>
      </div>
    </section>
  );
};

export default VideoCarousel;
