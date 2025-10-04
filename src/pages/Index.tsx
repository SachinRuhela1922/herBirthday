import { CustomCursor } from "@/components/CustomCursor";
import { FloatingParticles } from "@/components/FloatingParticles";
import { HeroSection } from "@/components/HeroSection";
import { CubeGallery } from "@/components/CubeGallery";
import { HexagonShowcase } from "@/components/HexagonShowcase";
import { FlipCardGallery } from "@/components/FlipCardGallery";
import { MusicPlayer } from "@/components/MusicPlayer";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <CustomCursor />
      <FloatingParticles />
      <MusicPlayer />
      
      <main className="relative z-10">
        <HeroSection />
        <CubeGallery />
        <HexagonShowcase />
        <FlipCardGallery />
        
        {/* Final message section */}
        <section className="min-h-[50vh] flex items-center justify-center px-4 pb-20">
          <div className="text-center max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-dancing gradient-text mb-6 glow-text">
              May Your Day Be Filled With Magic ✨
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground font-poppins">
              Wishing you endless happiness, beautiful moments, and dreams come true.
              You deserve all the love and joy in the world! 💖
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
