import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useCMSTemples } from "@/hooks/useWixCMS";
import TempleMap from "@/components/TempleMap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Search, Filter, X } from "lucide-react";
import SEO from "@/components/SEO";

const Temples = () => {
  const { temples } = useCMSTemples(); // ✅ Only Wix CMS

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDeity, setSelectedDeity] = useState("all");
  const [selectedState, setSelectedState] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTemple, setSelectedTemple] = useState<any | null>(null);

  const [showFilters, setShowFilters] = useState(false);

  // Dynamic filter options from Wix data
  const deities = useMemo(
    () => [...new Set(temples.map((t: any) => t.deity).filter(Boolean))],
    [temples]
  );

  const states = useMemo(
    () => [...new Set(temples.map((t: any) => t.state).filter(Boolean))],
    [temples]
  );

  const categories = useMemo(() => {
    const cats = temples
      .map((t: any) => t.famousFor?.split(",")[0]?.trim())
      .filter(Boolean);
    return [...new Set(cats)];
  }, [temples]);

  const filteredTemples = useMemo(() => {
    return temples.filter((temple: any) => {
      const matchesSearch =
        temple.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        temple.famousFor?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        temple.state?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDeity =
        selectedDeity === "all" || temple.deity === selectedDeity;

      const matchesState =
        selectedState === "all" || temple.state === selectedState;

      const matchesCategory =
        selectedCategory === "all" ||
        temple.famousFor
          ?.toLowerCase()
          .includes(selectedCategory.toLowerCase());

      return matchesSearch && matchesDeity && matchesState && matchesCategory;
    });
  }, [temples, searchQuery, selectedDeity, selectedState, selectedCategory]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedDeity("all");
    setSelectedState("all");
    setSelectedCategory("all");
  };

  const hasActiveFilters =
    searchQuery ||
    selectedDeity !== "all" ||
    selectedState !== "all" ||
    selectedCategory !== "all";

  return (
    <Layout>
      <SEO 
        title="Sacred Temples Directory" 
        description="Explore our extensive directory of sacred temples across India with interactive maps. Search, filter, and discover divine heritage by deity, state, or significance."
      />
      {/* Hero Section */}
      <section className="relative h-[350px] flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#f5f1eb' }}>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <span className="text-secondary font-body text-sm uppercase tracking-widest">
              Temples
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground leading-tight">
              Explore Sacred <span style={{ color: '#c34b22' }}>Temples</span>
            </h1>
            <div className="section-divider" />
            <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover temples across India with detailed information and interactive maps.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 pt-4">
        <div className="container mx-auto px-4">

          {/* Search and Filters Card */}
          <div className="bg-card rounded-2xl p-6 mb-8 shadow-sm border border-border/50">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Search temples by name, location, or significance..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 h-12 text-base rounded-lg border-muted-foreground/20 bg-transparent"
                />
              </div>
              <Button
                variant="outline"
                className="h-12 px-6 rounded-lg border-muted-foreground/20 flex items-center gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={18} /> Filters
              </Button>
            </div>

            {/* In the screenshot it seems filters are always shown or nicely toggled */}
            <div className={`mt-6 ${!showFilters ? "hidden" : ""}`}>
              <hr className="mb-6 border-muted-foreground/10" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Deity</Label>
                  <Select value={selectedDeity} onValueChange={setSelectedDeity}>
                    <SelectTrigger className="h-12 rounded-lg border-muted-foreground/20 bg-transparent">
                      <SelectValue placeholder="All Deities" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Deities</SelectItem>
                      {deities.map((d: string) => (
                        <SelectItem key={d} value={d}>{d}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">State</Label>
                  <Select value={selectedState} onValueChange={setSelectedState}>
                    <SelectTrigger className="h-12 rounded-lg border-muted-foreground/20 bg-transparent">
                      <SelectValue placeholder="All States" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All States</SelectItem>
                      {states.map((s: string) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Significance</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="h-12 rounded-lg border-muted-foreground/20 bg-transparent">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((c: string) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {hasActiveFilters && (
                <div className="mt-4 flex justify-end">
                  <Button variant="ghost" onClick={clearFilters} className="text-muted-foreground">
                    <X size={16} className="mr-2" /> Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Results */}
          {/* Results Header */}
          <div className="mb-4">
            <p className="text-muted-foreground">
              Showing <span className="font-bold text-foreground">{filteredTemples.length}</span> temples
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">

            {/* Temple List */}
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 scrollbar-hide lg:col-span-7">
              {filteredTemples.length === 0 ? (
                <p>No temples found</p>
              ) : (
                filteredTemples.map((temple: any) => (
                  <div
                    key={temple.id}
                    className={`bg-card p-6 rounded-2xl shadow-sm border cursor-pointer flex flex-col relative transition-all duration-300 ease-in-out hover:shadow-md ${selectedTemple?.id === temple.id
                      ? "border-saffron border-2 shadow-md rounded-[1.5rem]"
                      : "border-saffron/20 hover:border-saffron/50 hover:rounded-[2rem]"
                      }`}
                    onClick={() => setSelectedTemple(temple)}
                  >
                    <div className="pr-12">
                      <div className="flex gap-2 mb-3">
                        {temple.deity && (
                          <span className="text-[10px] font-bold text-saffron bg-saffron/10 tracking-widest uppercase px-2 py-1 rounded">
                            {temple.deity}
                          </span>
                        )}
                        {temple.state && (
                          <span className="text-[10px] font-medium text-muted-foreground bg-muted tracking-widest px-2 py-1 rounded">
                            {temple.state}
                          </span>
                        )}
                      </div>

                      <h3 className="font-bold text-lg text-foreground mb-1 leading-tight">{temple.name}</h3>

                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
                        <MapPin size={14} className="text-primary" />
                        <span>{[temple.district, temple.state].filter(Boolean).join(", ")}</span>
                      </div>

                      {temple.content && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {temple.content}
                        </p>
                      )}

                      {/* View Details always visible natively */}
                      <Link
                        to={`/temple/${temple.slug}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="inline-flex items-center text-primary font-body text-sm hover:underline font-medium">
                          View details →
                        </span>
                      </Link>
                    </div>

                  </div>
                ))
              )}
            </div>

            {/* Map */}
            <div className="h-[70vh] lg:col-span-5 relative z-0">
              <TempleMap
                temples={filteredTemples}
                selectedTemple={selectedTemple}
                onTempleSelect={setSelectedTemple}
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Temples;