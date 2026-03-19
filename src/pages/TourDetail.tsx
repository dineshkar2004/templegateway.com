import { useParams, Link } from "react-router-dom";
import {
    MapPin,
    Star,
    Clock,
    Users,
    Calendar,
    CheckCircle,
    ArrowLeft,
    Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout/Layout";
import { useCMSTour } from "@/hooks/useWixCMS";
import SEO from "@/components/SEO";

const TourDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const { tour, isLoading } = useCMSTour(slug || "");

    if (isLoading) {
        return (
            <Layout>
                <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 border-4 border-saffron border-t-transparent rounded-full animate-spin mx-auto" />
                        <h1 className="font-display text-2xl font-bold text-foreground">Loading tour details...</h1>
                    </div>
                </div>
            </Layout>
        );
    }

    if (!tour) {
        return (
            <Layout>
                <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="text-center space-y-4">
                        <h1 className="font-display text-4xl font-bold text-foreground">Tour Not Found</h1>
                        <p className="text-lg text-muted-foreground">The tour you're looking for doesn't exist.</p>
                        <Button asChild className="mt-4 shadow-sm">
                            <Link to="/pilgrimage">Back to Tours</Link>
                        </Button>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <SEO 
                title={tour.name} 
                description={tour.description || tour.longDescription || `Embark on the spiritual ${tour.name} pilgrimage journey.`} 
                ogImage={tour.imageUrl || undefined}
            />
            {/* Hero Section */}
            <section
                className={`relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-cover bg-center ${!tour.imageUrl ? 'bg-gradient-hero' : ''}`}
                style={tour.imageUrl ? { backgroundImage: `url(${tour.imageUrl})` } : {}}
            >
                {/* Overlay */}
                <div className={`absolute inset-0 ${tour.imageUrl ? 'bg-black/60 md:bg-black/50' : 'opacity-10'}`}>
                    {!tour.imageUrl && (
                        <>
                            <div className="absolute top-10 left-10 w-40 h-40 border border-primary-foreground/50 rounded-full" />
                            <div className="absolute bottom-10 right-10 w-60 h-60 border border-primary-foreground/50 rounded-full" />
                        </>
                    )}
                </div>

                <div className="container mx-auto px-4 relative z-10 text-white">
                    <Link
                        to="/pilgrimage"
                        className={`inline-flex items-center gap-2 mb-8 transition-colors ${tour.imageUrl ? 'text-white/80 hover:text-white drop-shadow-md' : 'text-primary-foreground/80 hover:text-primary-foreground'}`}
                    >
                        <ArrowLeft size={20} />
                        <span className="font-medium text-sm tracking-wide uppercase">Back to Tours</span>
                    </Link>

                    <div className="max-w-4xl">
                        <Badge className="bg-saffron text-saffron-foreground border-none px-3 py-1 shadow-sm mb-5">
                            Featured Tour
                        </Badge>
                        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg leading-tight text-white">
                            {tour.name}
                        </h1>
                        <p className="font-body text-xl md:text-2xl text-white/95 mb-8 drop-shadow max-w-2xl leading-relaxed">
                            {tour.longDescription}
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2.5 bg-black/40 border border-white/10 backdrop-blur-md px-5 py-2.5 rounded-full shadow-lg">
                                <Clock size={18} className="text-saffron-light" />
                                <span className="font-body font-medium text-white">{tour.duration}</span>
                            </div>
                            <div className="flex items-center gap-2.5 bg-black/40 border border-white/10 backdrop-blur-md px-5 py-2.5 rounded-full shadow-lg">
                                <Users size={18} className="text-saffron-light" />
                                <span className="font-body font-medium text-white">{tour.groupSize}</span>
                            </div>
                            <div className="flex items-center gap-2.5 bg-black/40 border border-white/10 backdrop-blur-md px-5 py-2.5 rounded-full shadow-lg">
                                <Star size={18} className="text-golden fill-golden" />
                                <span className="font-body font-medium text-white">{tour.rating} Rating</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Stats */}
            <section className="py-12 bg-background border-b border-border">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center p-6 bg-muted rounded-xl">
                            <Calendar className="w-8 h-8 text-primary mx-auto mb-3" />
                            <p className="font-display text-3xl font-bold text-foreground">{tour.days}</p>
                            <p className="font-body text-muted-foreground">Days</p>
                        </div>
                        <div className="text-center p-6 bg-muted rounded-xl">
                            <Building2 className="w-8 h-8 text-primary mx-auto mb-3" />
                            <p className="font-display text-3xl font-bold text-foreground">{tour.templesCount}</p>
                            <p className="font-body text-muted-foreground">Temples</p>
                        </div>
                        <div className="text-center p-6 bg-muted rounded-xl">
                            <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
                            <p className="font-display text-3xl font-bold text-foreground">{tour.citiesCovered?.length || 0}</p>
                            <p className="font-body text-muted-foreground">Cities</p>
                        </div>
                        <div className="text-center p-6 bg-muted rounded-xl">
                            <Star className="w-8 h-8 text-golden fill-golden mx-auto mb-3" />
                            <p className="font-display text-3xl font-bold text-foreground">{tour.rating}</p>
                            <p className="font-body text-muted-foreground">Rating</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cities Covered */}
            <section className="py-12 bg-background">
                <div className="container mx-auto px-4">
                    <h2 className="font-display text-2xl font-bold text-foreground mb-6">Cities Covered</h2>
                    <div className="flex flex-wrap gap-3">
                        {tour.citiesCovered?.map((city, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full"
                            >
                                <MapPin size={16} className="text-primary" />
                                <span className="font-body text-foreground">{city}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tour Highlights */}
            <section className="py-12 bg-muted">
                <div className="container mx-auto px-4">
                    <h2 className="font-display text-2xl font-bold text-foreground mb-6">Tour Highlights</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {tour.highlights?.map((highlight, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-3 bg-background p-4 rounded-xl"
                            >
                                <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                                <span className="font-body text-foreground">{highlight}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Detailed Itinerary */}
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-secondary font-body text-sm uppercase tracking-widest">
                            Day by Day
                        </span>
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
                            Detailed Itinerary
                        </h2>
                        <div className="section-divider" />
                    </div>

                    <div className="max-w-4xl mx-auto space-y-6">
                        {tour.itinerary?.map((day, index) => (
                            <div
                                key={index}
                                className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow"
                            >
                                <div className="bg-gradient-hero p-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                                            <span className="font-display text-lg font-bold text-primary-foreground">
                                                {day.day}
                                            </span>
                                        </div>
                                        <h3 className="font-display text-xl font-semibold text-primary-foreground">
                                            {day.title}
                                        </h3>
                                    </div>
                                </div>

                                <div className="p-6 space-y-4">
                                    <p className="font-body text-muted-foreground">
                                        {day.description}
                                    </p>

                                    {day.temples && day.temples.length > 0 && (
                                        <div>
                                            <p className="font-body text-sm font-medium text-foreground mb-2">
                                                Temples Visited:
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {day.temples.map((temple, i) => (
                                                    <Badge
                                                        key={i}
                                                        variant="secondary"
                                                        className="bg-secondary/10 text-secondary border-secondary/20"
                                                    >
                                                        {temple}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {day.cities && day.cities.length > 0 && (
                                        <div>
                                            <p className="font-body text-sm font-medium text-foreground mb-2">
                                                Cities:
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {day.cities.map((city, i) => (
                                                    <span
                                                        key={i}
                                                        className="inline-flex items-center gap-1 text-sm text-muted-foreground"
                                                    >
                                                        <MapPin size={12} />
                                                        {city}
                                                        {i < day.cities!.length - 1 && " →"}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Inclusions */}
            <section className="py-12 bg-muted">
                <div className="container mx-auto px-4">
                    <h2 className="font-display text-2xl font-bold text-foreground mb-6">What's Included</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {tour.inclusions?.map((inclusion, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-3 bg-background p-4 rounded-xl"
                            >
                                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                <span className="font-body text-foreground">{inclusion}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gradient-hero">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">
                        Ready to Book This Tour?
                    </h2>
                    <p className="font-body text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                        Contact us today to reserve your spot on this divine pilgrimage journey.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button
                            asChild
                            size="lg"
                            className="bg-background text-foreground hover:bg-background/90 px-8 py-6 text-lg font-display"
                        >
                            <Link to="/contact">Contact Us</Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="border-primary-foreground text-primary-foreground bg-transparent hover:bg-primary-foreground hover:text-primary px-8 py-6 text-lg font-display transition-colors"
                        >
                            <Link to="/pilgrimage">View All Tours</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default TourDetail;
