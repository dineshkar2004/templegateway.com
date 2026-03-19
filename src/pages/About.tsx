import Layout from "@/components/layout/Layout";
import { Heart, Target, Eye, Users, Phone, Pin, Sofa } from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";
import SEO from "@/components/SEO";

const About = () => {
  return (
    <Layout>
      <SEO 
        title="About Us" 
        description="Temple Gateway was founded to make India's rich spiritual heritage accessible. Discover our story, mission, and dedication to connecting spiritual seekers with sacred spaces."
      />
      {/* Hero Section */}
      <section className="h-[350px] flex items-center justify-center bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <span className="text-secondary font-body text-sm uppercase tracking-widest">
              About Us
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground">
              Connecting Souls to
              <span className="text-primary"> Sacred Spaces</span>
            </h1>
            <div className="section-divider" />
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Temple Gateway was founded with a mission to make India's rich spiritual heritage
              accessible to devotees and travelers from around the world.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      {/* Story Section */}
      <section className="py-20 bg-background">
        <RevealOnScroll>
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <span className="text-secondary font-body text-sm uppercase tracking-widest">
                  Our Story
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  A Journey Born from Devotion
                </h2>
                <div className="space-y-4 font-body text-muted-foreground leading-relaxed">
                  <p>
                    Temple Gateway was born from a deep reverence for India's ancient spiritual traditions.
                    Our founders, passionate pilgrims themselves, recognized the need for a comprehensive
                    resource that could guide devotees to the countless sacred sites across the subcontinent.
                  </p>
                  <p>
                    What started as a personal project to document temple visits has grown into a
                    comprehensive platform serving thousands of spiritual seekers. We combine detailed
                    historical information, geographical data, and practical travel guidance to create
                    meaningful pilgrimage experiences.
                  </p>
                  <p>
                    Each temple in our database has been carefully documented with information about its
                    deity, history, architectural significance, and the spiritual beliefs associated with it.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-hero rounded-2xl p-8 shadow-elevated">
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { value: "32+", label: "Temples Listed" },
                      { value: "15+", label: "States Covered" },
                      { value: "1000+", label: "Years of Heritage" },
                      { value: "∞", label: "Divine Blessings" },
                    ].map((stat, index) => (
                      <div key={index} className="text-center p-4 bg-background/10 rounded-xl backdrop-blur-sm">
                        <div className="font-display text-3xl font-bold text-primary-foreground">
                          {stat.value}
                        </div>
                        <div className="font-body text-sm text-primary-foreground/80">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-muted rounded-2xl -z-10" />
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Values Section */}
      {/* Values Section */}
      <section className="py-20 bg-muted">
        <RevealOnScroll>
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-14">
              <span className="text-secondary font-body text-sm uppercase tracking-widest">
                Our Values
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                What Guides Us
              </h2>
              <div className="section-divider" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Heart,
                  title: "Devotion",
                  description: "We approach our work with the same reverence that devotees bring to their pilgrimage.",
                },
                {
                  icon: Target,
                  title: "Accuracy",
                  description: "Every piece of information is carefully researched and verified for authenticity.",
                },
                {
                  icon: Eye,
                  title: "Accessibility",
                  description: "We believe spiritual knowledge should be freely accessible to all seekers.",
                },
                {
                  icon: Users,
                  title: "Community",
                  description: "Building a community of devotees who share and preserve our sacred heritage.",
                },
              ].map((value, index) => (
                <div key={index} className="bg-card p-8 rounded-xl shadow-card text-center group hover:shadow-elevated transition-all duration-300">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-golden flex items-center justify-center group-hover:scale-110 transition-transform">
                    <value.icon size={28} className="text-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="font-body text-muted-foreground text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Mission Section */}
      {/* Mission Section */}
      <section className="py-20 bg-gradient-hero">
        <RevealOnScroll>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">
                Our Mission
              </h2>
              <p className="font-body text-xl text-primary-foreground/90 leading-relaxed">
                "To preserve and promote India's spiritual heritage by creating the most comprehensive
                and accessible temple directory, helping devotees connect with the divine through
                informed and meaningful pilgrimage experiences."
              </p>
              <div className="text-6xl"></div>
            </div>
          </div>
        </RevealOnScroll>
      </section>
    </Layout>
  );
};

export default About;
