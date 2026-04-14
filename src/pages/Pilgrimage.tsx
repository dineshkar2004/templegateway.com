import { Link } from "react-router-dom";
import { Clock, MapPin, Users, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout/Layout";
import { useCMSTours } from "@/hooks/useWixCMS";
import SEO from "@/components/SEO";
import { useState } from "react";
import BookingModal from "@/components/BookingModal";

const Pilgrimage = () => {
  const { tours } = useCMSTours();

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState<{ name: string, details?: string } | null>(null);

  return (
    <Layout>
      <SEO
        title="Pilgrimage Tour Packages"
        description="Book transformative Hindu pilgrimage packages with Temple Gateway. Browse our expert-guided yatra tours, book spiritual guides, and experience divine blessings across India."
      />
      {/* Hero Section */}
      <section className="relative h-[350px] flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#f5f1eb' }}>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <span className="text-secondary font-body text-sm uppercase tracking-widest">
              Pilgrimage
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground leading-tight">
              Pilgrimage <span style={{ color: '#c34b22' }}>Packages</span>
            </h1>
            <div className="section-divider" />
            <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Embark on transformative spiritual journeys with our expertly crafted pilgrimage packages.
            </p>
          </div>
        </div>
      </section>

      {/* All Tour Packages */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-14">
            <span className="text-secondary font-body text-sm uppercase tracking-widest">
              Explore Our Journeys
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Tour Packages
            </h2>
            <div className="section-divider" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {tours.map((pkg, index) => (
              <div
                key={pkg.id}
                className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 bg-gradient-hero flex items-center justify-center overflow-hidden">
                  {pkg.imageUrl ? (
                    <img
                      src={pkg.imageUrl}
                      alt={pkg.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <span className="font-display text-8xl text-primary-foreground/20">
                      {pkg.name.charAt(0)}
                    </span>
                  )}
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-background/90 px-2 py-1 rounded-full">
                    <Star size={14} className="text-golden fill-golden" />
                    <span className="text-sm font-medium text-foreground">{pkg.rating}</span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="space-y-4 flex-1">
                    <h3 className="font-display text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {pkg.name}
                    </h3>

                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span className="font-body">{pkg.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={14} />
                        <span className="font-body">{pkg.groupSize}</span>
                      </div>
                    </div>

                    <p className="font-body text-muted-foreground text-sm line-clamp-2">
                      {pkg.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {pkg.citiesCovered.slice(0, 3).map((dest) => (
                        <Badge key={dest} variant="outline" className="text-xs font-body">
                          <MapPin size={10} className="mr-1" />
                          {dest}
                        </Badge>
                      ))}
                      {pkg.citiesCovered.length > 3 && (
                        <Badge variant="outline" className="text-xs font-body">
                          +{pkg.citiesCovered.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="pt-6 mt-auto flex flex-col xl:flex-row items-center gap-3 border-t border-border">
                    <Button asChild variant="outline" className="font-body w-full xl:flex-1">
                      <Link to={`/tour/${pkg.slug}`}>
                        View Details
                      </Link>
                    </Button>
                    <Button
                      className="bg-gradient-hero text-primary-foreground hover:opacity-90 w-full xl:flex-1"
                      onClick={() => {
                        setSelectedTour({ name: pkg.name, details: `${pkg.duration} / ${pkg.groupSize}` });
                        setIsBookingModalOpen(true);
                      }}
                    >
                      Book Now <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Tour CTA */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-hero rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-20 -right-20 w-80 h-80 border border-primary-foreground/50 rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-60 h-60 border border-primary-foreground/50 rounded-full" />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">
                Need a Custom Pilgrimage?
              </h2>
              <p className="font-body text-primary-foreground/80">
                We can create a personalized pilgrimage package tailored to your spiritual needs,
                schedule, and budget. Contact us to plan your unique journey.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-background text-foreground hover:bg-background/90 font-display"
                >
                  <Link to="/contact">Request Custom Tour</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="bg-background text-foreground hover:bg-background/90 font-display"
                >
                  <Link to="/temples">Browse Temples</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BookingModal
        isOpen={isBookingModalOpen}
        onOpenChange={setIsBookingModalOpen}
        tourPackage={selectedTour?.name}
        tourDetails={selectedTour?.details}
      />
    </Layout>
  );
};

export default Pilgrimage;