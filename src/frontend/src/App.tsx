import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock,
  Facebook,
  HardHat,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  Twitter,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Project } from "./backend.d";
import { useGetAllProjects, useSubmitContactForm } from "./hooks/useQueries";

const FALLBACK_PROJECTS: Project[] = [
  {
    title: "Skyline Residences",
    category: "Real Estate",
    location: "Chennai, Tamil Nadu",
    status: "Completed",
    description:
      "Premium luxury apartments with panoramic city views and world-class amenities.",
  },
  {
    title: "Green Valley Villas",
    category: "Real Estate",
    location: "Coimbatore",
    status: "Ongoing",
    description:
      "Exclusive gated community villas surrounded by lush greenery and tranquil environment.",
  },
  {
    title: "Metro Commercial Hub",
    category: "Construction",
    location: "Bangalore",
    status: "Completed",
    description:
      "State-of-the-art commercial complex designed for modern businesses.",
  },
];

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function scrollTo(id: string) {
  const el = document.getElementById(id.replace("#", ""));
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const { data: projects } = useGetAllProjects();
  const submitMutation = useSubmitContactForm();

  const displayProjects =
    projects && projects.length > 0 ? projects : FALLBACK_PROJECTS;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      await submitMutation.mutateAsync(form);
      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <Toaster />

      {/* ── Utility Bar ── */}
      <div className="bg-charcoal text-white text-xs py-2 text-center font-sans tracking-wider">
        <span className="text-gold font-semibold">Aiyan Developers</span> •{" "}
        Building Your Future | Premium Real Estate &amp; Construction
      </div>

      {/* ── Sticky Header / Nav ── */}
      <header
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-card" : "border-b border-border"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollTo("#home")}
            className="flex items-center gap-2 group"
            data-ocid="nav.link"
          >
            <div className="w-8 h-8 bg-charcoal flex items-center justify-center">
              <Building2 className="w-5 h-5 text-gold" />
            </div>
            <span className="font-serif text-lg font-bold tracking-widest uppercase text-charcoal">
              AIYAN DEVELOPERS
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => scrollTo(link.href)}
                className="text-sm font-sans text-muted-foreground hover:text-charcoal transition-colors tracking-wide"
                data-ocid="nav.link"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Button
              onClick={() => scrollTo("#contact")}
              className="hidden sm:flex bg-gold text-charcoal hover:bg-gold/90 font-semibold tracking-wide rounded-sm px-5"
              data-ocid="nav.primary_button"
            >
              Get a Quote
            </Button>
            <button
              type="button"
              className="lg:hidden p-2"
              onClick={() => setMobileOpen((v) => !v)}
              data-ocid="nav.toggle"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden overflow-hidden border-t border-border bg-white"
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => {
                      scrollTo(link.href);
                      setMobileOpen(false);
                    }}
                    className="text-left text-sm font-medium text-charcoal py-1"
                    data-ocid="nav.link"
                  >
                    {link.label}
                  </button>
                ))}
                <Button
                  onClick={() => {
                    scrollTo("#contact");
                    setMobileOpen(false);
                  }}
                  className="bg-gold text-charcoal hover:bg-gold/90 font-semibold rounded-sm w-full"
                  data-ocid="nav.primary_button"
                >
                  Get a Quote
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Hero ── */}
      <section
        id="home"
        className="relative min-h-[88vh] flex items-center overflow-hidden"
        data-ocid="hero.section"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/assets/generated/hero-building.dim_1200x700.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full flex justify-end">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl text-right"
          >
            <p className="text-gold font-sans text-sm font-semibold tracking-[0.25em] uppercase mb-4">
              Premium Real Estate &amp; Construction
            </p>
            <h1 className="font-serif text-5xl lg:text-6xl font-bold text-white leading-tight uppercase tracking-wide mb-6">
              Building
              <br />
              Your Future
            </h1>
            <p className="text-white/80 font-sans text-lg mb-8 leading-relaxed">
              With 15+ years of excellence, Aiyan Developers delivers
              world-class real estate and construction solutions across South
              India.
            </p>
            <div className="flex gap-4 justify-end">
              <Button
                onClick={() => scrollTo("#projects")}
                className="bg-charcoal text-white hover:bg-charcoal/80 px-7 py-3 h-auto font-semibold rounded-sm tracking-wide"
                data-ocid="hero.primary_button"
              >
                View Projects
              </Button>
              <Button
                onClick={() => scrollTo("#services")}
                className="bg-gold text-charcoal hover:bg-gold/90 px-7 py-3 h-auto font-semibold rounded-sm tracking-wide"
                data-ocid="hero.secondary_button"
              >
                Our Services
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Services ── */}
      <section
        id="services"
        className="py-20 bg-white"
        data-ocid="services.section"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-gold font-sans text-sm font-semibold tracking-[0.25em] uppercase mb-3">
              What We Offer
            </p>
            <h2 className="font-serif text-4xl font-bold text-charcoal uppercase tracking-wide">
              Our Services
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Real Estate Card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-background border border-border p-10 flex flex-col gap-5 shadow-card"
              data-ocid="services.item.1"
            >
              <div className="w-14 h-14 bg-charcoal flex items-center justify-center">
                <Building2 className="w-7 h-7 text-gold" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-charcoal uppercase tracking-wide">
                Real Estate
              </h3>
              <p className="text-muted-foreground font-sans leading-relaxed">
                From luxury apartments to gated villa communities, we develop
                premium residential and commercial properties that redefine
                modern living. Our properties are built in prime locations with
                meticulous attention to detail.
              </p>
              <ul className="space-y-2">
                {[
                  "Luxury Apartments",
                  "Gated Communities",
                  "Commercial Spaces",
                  "Plot Developments",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm font-sans text-muted-foreground"
                  >
                    <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => scrollTo("#contact")}
                className="mt-auto bg-charcoal text-white hover:bg-charcoal/80 rounded-sm font-semibold tracking-wide w-fit"
                data-ocid="services.primary_button"
              >
                Learn More <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>

            {/* Construction Card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-background border border-border p-10 flex flex-col gap-5 shadow-card"
              data-ocid="services.item.2"
            >
              <div className="w-14 h-14 bg-gold flex items-center justify-center">
                <HardHat className="w-7 h-7 text-charcoal" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-charcoal uppercase tracking-wide">
                Construction
              </h3>
              <p className="text-muted-foreground font-sans leading-relaxed">
                We offer end-to-end construction services for residential,
                commercial, and industrial projects. Our experienced team
                ensures timely delivery with the highest quality standards and
                transparent processes.
              </p>
              <ul className="space-y-2">
                {[
                  "Residential Construction",
                  "Commercial Buildings",
                  "Industrial Projects",
                  "Renovation & Interiors",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm font-sans text-muted-foreground"
                  >
                    <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => scrollTo("#contact")}
                className="mt-auto bg-charcoal text-white hover:bg-charcoal/80 rounded-sm font-semibold tracking-wide w-fit"
                data-ocid="services.secondary_button"
              >
                Learn More <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section
        id="projects"
        className="py-20 bg-charcoal"
        data-ocid="projects.section"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-gold font-sans text-sm font-semibold tracking-[0.25em] uppercase mb-3">
              Our Portfolio
            </p>
            <h2 className="font-serif text-4xl font-bold text-white uppercase tracking-wide">
              Featured Projects
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {displayProjects.slice(0, 6).map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 p-6 flex flex-col gap-3 hover:bg-white/10 transition-colors group"
                data-ocid={`projects.item.${i + 1}`}
              >
                <div className="flex items-center justify-between">
                  <Badge className="bg-gold/20 text-gold border-gold/30 text-xs font-sans tracking-wider uppercase">
                    {project.category}
                  </Badge>
                  <span
                    className={`text-xs font-sans font-semibold tracking-wide ${
                      project.status === "Completed"
                        ? "text-green-400"
                        : "text-gold"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-white group-hover:text-gold transition-colors">
                  {project.title}
                </h3>
                <p className="text-white/60 font-sans text-sm leading-relaxed flex-1">
                  {project.description}
                </p>
                <div className="flex items-center gap-2 text-white/50 text-sm font-sans">
                  <MapPin className="w-3.5 h-3.5 text-gold" />
                  {project.location}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Button
              onClick={() => scrollTo("#contact")}
              variant="outline"
              className="border-gold text-gold hover:bg-gold hover:text-charcoal font-semibold rounded-sm px-8 py-3 h-auto tracking-wide"
              data-ocid="projects.secondary_button"
            >
              View All Projects <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── About Us ── */}
      <section id="about" className="py-20 bg-white" data-ocid="about.section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <img
                src="/assets/generated/construction-site.dim_800x600.jpg"
                alt="Aiyan Developers construction site"
                className="w-full h-[440px] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-charcoal p-6 hidden lg:block">
                <p className="font-serif text-4xl font-bold text-gold">15+</p>
                <p className="font-sans text-sm text-white/80 tracking-wide">
                  Years Experience
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex flex-col gap-6"
            >
              <div>
                <p className="text-gold font-sans text-sm font-semibold tracking-[0.25em] uppercase mb-3">
                  About Us
                </p>
                <h2 className="font-serif text-4xl font-bold text-charcoal uppercase tracking-wide leading-tight">
                  Building Dreams Since 2009
                </h2>
              </div>
              <p className="text-muted-foreground font-sans leading-relaxed">
                Aiyan Developers is a premier real estate and construction
                company headquartered in Tamil Nadu. Founded with a vision to
                transform the South Indian real estate landscape, we have
                successfully delivered 200+ projects across residential,
                commercial, and industrial sectors.
              </p>
              <p className="text-muted-foreground font-sans leading-relaxed">
                Our team of experienced architects, engineers, and project
                managers work in close collaboration to bring your vision to
                life — on time, within budget, and beyond expectations.
              </p>
              <div className="grid grid-cols-3 gap-6 border-t border-border pt-6">
                {[
                  { value: "200+", label: "Projects Completed" },
                  { value: "5000+", label: "Happy Families" },
                  { value: "15+", label: "Years Experience" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="font-serif text-3xl font-bold text-charcoal">
                      {stat.value}
                    </p>
                    <p className="font-sans text-xs text-muted-foreground tracking-wide mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => scrollTo("#contact")}
                className="flex items-center gap-2 text-gold font-semibold font-sans tracking-wide hover:gap-3 transition-all w-fit"
                data-ocid="about.link"
              >
                Get In Touch <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Contact / Get in Touch ── */}
      <section
        id="contact"
        className="py-20 bg-tan-band"
        data-ocid="contact.section"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-gold font-sans text-sm font-semibold tracking-[0.25em] uppercase mb-3">
              Reach Out
            </p>
            <h2 className="font-serif text-4xl font-bold text-charcoal uppercase tracking-wide">
              Get in Touch
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-14">
            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onSubmit={handleSubmit}
              className="bg-white p-8 shadow-card flex flex-col gap-5"
              data-ocid="contact.modal"
            >
              <h3 className="font-serif text-2xl font-bold text-charcoal uppercase tracking-wide">
                Send Us a Message
              </h3>
              <div>
                <label
                  htmlFor="contact-name"
                  className="font-sans text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1.5 block"
                >
                  Full Name *
                </label>
                <Input
                  id="contact-name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="Your full name"
                  className="rounded-sm border-border font-sans"
                  data-ocid="contact.input"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-email"
                    className="font-sans text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1.5 block"
                  >
                    Email Address *
                  </label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    placeholder="your@email.com"
                    className="rounded-sm border-border font-sans"
                    data-ocid="contact.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-phone"
                    className="font-sans text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1.5 block"
                  >
                    Phone Number
                  </label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, phone: e.target.value }))
                    }
                    placeholder="+91 7639113333"
                    className="rounded-sm border-border font-sans"
                    data-ocid="contact.input"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="font-sans text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1.5 block"
                >
                  Message *
                </label>
                <Textarea
                  id="contact-message"
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  placeholder="Tell us about your project..."
                  rows={5}
                  className="rounded-sm border-border font-sans resize-none"
                  data-ocid="contact.textarea"
                />
              </div>
              <Button
                type="submit"
                disabled={submitMutation.isPending}
                className="bg-charcoal text-white hover:bg-charcoal/80 rounded-sm font-semibold tracking-wide h-12"
                data-ocid="contact.submit_button"
              >
                {submitMutation.isPending ? "Sending..." : "Send Message"}
              </Button>
              {submitMutation.isSuccess && (
                <p
                  className="text-green-600 text-sm font-sans"
                  data-ocid="contact.success_state"
                >
                  ✓ Message sent successfully!
                </p>
              )}
            </motion.form>

            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col gap-8"
            >
              <div>
                <h3 className="font-serif text-2xl font-bold text-charcoal uppercase tracking-wide mb-6">
                  Contact Information
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-charcoal flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="font-sans font-semibold text-charcoal text-sm tracking-wide">
                        Head Office
                      </p>
                      <p className="text-muted-foreground font-sans text-sm mt-1 leading-relaxed">
                        No. 205, First Floor, Vysial Street,
                        <br />
                        Heritage Town, Puducherry - 605001
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-charcoal flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="font-sans font-semibold text-charcoal text-sm tracking-wide">
                        Phone
                      </p>
                      <p className="text-muted-foreground font-sans text-sm mt-1">
                        +91 7639113333
                      </p>
                      <p className="text-muted-foreground font-sans text-sm">
                        +91 9092063333
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-charcoal flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="font-sans font-semibold text-charcoal text-sm tracking-wide">
                        Email
                      </p>
                      <p className="text-muted-foreground font-sans text-sm mt-1">
                        info@aiyan-developers.com
                      </p>
                      <p className="text-muted-foreground font-sans text-sm">
                        sales@aiyan-developers.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-charcoal flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="font-sans font-semibold text-charcoal text-sm tracking-wide">
                        Business Hours
                      </p>
                      <p className="text-muted-foreground font-sans text-sm mt-1">
                        Monday – Saturday: 9:00 AM – 6:00 PM
                      </p>
                      <p className="text-muted-foreground font-sans text-sm">
                        Sunday: By Appointment Only
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="bg-charcoal text-white py-12"
        data-ocid="footer.section"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-8 border-b border-white/10">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gold flex items-center justify-center">
                <Building2 className="w-5 h-5 text-charcoal" />
              </div>
              <div>
                <p className="font-serif text-lg font-bold tracking-widest uppercase">
                  AIYAN DEVELOPERS
                </p>
                <p className="text-white/50 text-xs font-sans tracking-wider">
                  Building Your Future
                </p>
              </div>
            </div>

            {/* Footer Nav */}
            <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => scrollTo(link.href)}
                  className="text-white/60 hover:text-gold transition-colors text-sm font-sans tracking-wide"
                  data-ocid="footer.link"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Instagram, label: "Instagram" },
                { icon: Twitter, label: "Twitter" },
                { icon: Linkedin, label: "LinkedIn" },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  className="w-9 h-9 border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold text-white/60 transition-colors"
                  data-ocid="footer.link"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/40 text-xs font-sans">
            <p>
              © {new Date().getFullYear()} Aiyan Developers. All rights
              reserved.
            </p>
            <p>
              Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold/70 hover:text-gold transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
