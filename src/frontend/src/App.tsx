import {
  ChefHat,
  Clock,
  Coffee,
  Leaf,
  MapPin,
  Menu,
  Phone,
  Star,
  Truck,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { Suspense, lazy, useEffect, useRef, useState } from "react";

const CoffeeCup3D = lazy(() => import("./components/CoffeeCup3D"));

// ─── Data ────────────────────────────────────────────────────────────────────

const menuCategories = [
  {
    name: "Coffee & Tea",
    icon: "☕",
    items: [
      {
        name: "Turkish Coffee",
        price: "₹320",
        popular: true,
        desc: "Rich aromatic brew served in traditional copper",
      },
      {
        name: "Café Cortado",
        price: "₹280",
        popular: true,
        desc: "Equal parts espresso and warm steamed milk",
      },
      {
        name: "Masala Chai",
        price: "₹180",
        popular: false,
        desc: "Spiced Indian tea with ginger and cardamom",
      },
      {
        name: "Caramel Mocha",
        price: "₹340",
        popular: false,
        desc: "Espresso, chocolate, steamed milk and caramel",
      },
    ],
  },
  {
    name: "Food & Bites",
    icon: "🍳",
    items: [
      {
        name: "Eggs Benedict",
        price: "₹480",
        popular: true,
        desc: "Poached eggs, hollandaise on toasted English muffin",
      },
      {
        name: "Cheese Garlic Bread",
        price: "₹220",
        popular: false,
        desc: "Crusty artisan bread with herb garlic butter",
      },
      {
        name: "Mezze Platter",
        price: "₹560",
        popular: false,
        desc: "Hummus, pita, olives and Mediterranean dips",
      },
      {
        name: "Shrimp Popcorn",
        price: "₹520",
        popular: false,
        desc: "Crispy fried shrimp with tangy dipping sauce",
      },
    ],
  },
  {
    name: "Desserts",
    icon: "🍰",
    items: [
      {
        name: "Old Fashioned Chocolate Cake",
        price: "₹380",
        popular: true,
        desc: "Dense fudgy layers with dark chocolate ganache",
      },
      {
        name: "Carrot Cake",
        price: "₹320",
        popular: true,
        desc: "Moist spiced cake with cream cheese frosting",
      },
    ],
  },
];

const reviews = [
  {
    name: "Subiksha Senthilkumar",
    role: "Local Guide · 15 reviews",
    rating: 5,
    time: "3 months ago",
    text: "The garden area has a very pleasant ambience, felt very romantic to sit under the gazebos on a drizzly evening. We ordered a creamy chicken soup which was very comforting in the cold weather. Next came the penne Alfredo chicken pasta which was excellent.",
    initials: "SS",
  },
  {
    name: "Jeena James",
    role: "Local Guide · 271 reviews",
    rating: 5,
    time: "a month ago",
    text: "Great spot to come with friends, loved ones, or even by yourself! Loved my cappuccino and I got an interesting omelette with parsley and spinach and sundried tomatoes, feta and pine nuts on top! They had an assortment of cakes.",
    initials: "JJ",
  },
  {
    name: "Somsubhra De",
    role: "Local Guide · 520 reviews",
    rating: 4,
    time: "3 months ago",
    text: "A cafe located within the premises of Savera Hotel. It has tasteful deco within. There are sitting arrangements outside as well. The food items are beyond cafe, not just tea and coffee but also food choices.",
    initials: "SD",
  },
];

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Our Story", href: "#story" },
  { label: "Menu", href: "#menu" },
  { label: "Location", href: "#location" },
  { label: "Reviews", href: "#reviews" },
];

const menuImages: Record<string, string> = {
  "Cheese Garlic Bread":
    "/assets/generated/cheese-garlic-bread.dim_600x600.jpg",
  "Masala Chai": "/assets/generated/masala-chai.dim_600x600.jpg",
  "Caramel Mocha": "/assets/generated/caramel-mocha.dim_600x600.jpg",
  "Mezze Platter": "/assets/generated/mezze-platter.dim_600x600.jpg",
  "Shrimp Popcorn": "/assets/generated/shrimp-popcorn.dim_600x600.jpg",
  "Turkish Coffee": "/assets/generated/turkish-coffee.dim_600x600.jpg",
  "Eggs Benedict": "/assets/generated/eggs-benedict.dim_600x600.jpg",
  "Old Fashioned Chocolate Cake":
    "/assets/generated/chocolate-cake.dim_600x600.jpg",
  "Carrot Cake": "/assets/generated/carrot-cake.dim_600x600.jpg",
  "Café Cortado": "/assets/generated/cafe-cortado.dim_600x600.jpg",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function SectionWrapper({
  children,
  className = "",
  id,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      id={id}
      style={style}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function GoldDivider() {
  return (
    <div className="flex items-center gap-4 my-6">
      <div
        className="flex-1 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, oklch(0.72 0.12 75 / 0.5))",
        }}
      />
      <div className="w-2 h-2 rotate-45 bg-gold" />
      <div
        className="flex-1 h-px"
        style={{
          background:
            "linear-gradient(to left, transparent, oklch(0.72 0.12 75 / 0.5))",
        }}
      />
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-4 h-4 ${s <= rating ? "fill-current text-gold" : "text-muted-foreground"}`}
        />
      ))}
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      data-ocid="nav.panel"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}
      style={{
        background: scrolled
          ? "oklch(0.11 0.005 280 / 0.92)"
          : "linear-gradient(to bottom, oklch(0.08 0.004 280 / 0.8), transparent)",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid oklch(0.72 0.12 75 / 0.15)"
          : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#home"
          data-ocid="nav.link"
          className="flex items-center gap-3"
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: "oklch(0.72 0.12 75 / 0.15)",
              border: "1px solid oklch(0.72 0.12 75 / 0.4)",
            }}
          >
            <Coffee className="w-5 h-5 text-gold" />
          </div>
          <div className="leading-tight">
            <div
              className="font-serif text-lg font-semibold text-gold"
              style={{ letterSpacing: "0.12em" }}
            >
              THE BREW ROOM
            </div>
            <div
              className="font-sans text-xs"
              style={{ color: "oklch(0.5 0.01 80)", letterSpacing: "0.05em" }}
            >
              தி ப்ரூ ரூம்
            </div>
          </div>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              data-ocid="nav.link"
              className="font-sans text-sm font-medium uppercase hover:text-gold transition-colors"
              style={{ color: "oklch(0.75 0.015 80)", letterSpacing: "0.1em" }}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex">
          <motion.a
            href="#location"
            data-ocid="nav.primary_button"
            whileHover={{
              scale: 1.04,
              boxShadow: "0 0 25px oklch(0.72 0.12 75 / 0.5)",
            }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-2.5 font-sans text-sm font-semibold uppercase rounded-sm"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.72 0.12 75), oklch(0.82 0.14 80))",
              color: "oklch(0.12 0.005 280)",
              letterSpacing: "0.12em",
            }}
          >
            Order Online
          </motion.a>
        </div>
        <button
          type="button"
          data-ocid="nav.toggle"
          className="md:hidden text-gold p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{
              background: "oklch(0.11 0.005 280 / 0.98)",
              borderTop: "1px solid oklch(0.72 0.12 75 / 0.2)",
            }}
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-sans text-sm font-medium uppercase hover:text-gold transition-colors text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  window.location.hash = "location";
                }}
                className="px-6 py-3 text-center font-sans text-sm font-semibold uppercase rounded-sm"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.12 75), oklch(0.82 0.14 80))",
                  color: "oklch(0.12 0.005 280)",
                }}
              >
                Order Online
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      id="home"
      data-ocid="hero.section"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <img
          src="/assets/generated/hero-cafe-interior.dim_1400x900.jpg"
          alt="The Brew Room Interior"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, oklch(0.08 0.008 280 / 0.95) 0%, oklch(0.1 0.01 50 / 0.75) 50%, oklch(0.06 0.005 280 / 0.65) 100%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-64"
          style={{
            background:
              "linear-gradient(to top, oklch(0.12 0.005 280), transparent)",
          }}
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{
                background: "oklch(0.72 0.12 75 / 0.15)",
                border: "1px solid oklch(0.72 0.12 75 / 0.4)",
              }}
            >
              <Star className="w-4 h-4 fill-current text-gold" />
              <span className="font-sans text-sm font-medium text-gold">
                4.4 · 3,496 Reviews · ₹₹₹
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="font-serif text-5xl lg:text-7xl font-bold leading-tight mb-6 text-shadow-gold"
              style={{ color: "oklch(0.82 0.12 75)" }}
            >
              Where Every
              <br />
              <span className="italic" style={{ color: "oklch(0.9 0.02 80)" }}>
                Cup Tells
              </span>
              <br />a Story
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="font-sans text-lg leading-relaxed mb-8 max-w-lg"
              style={{ color: "oklch(0.78 0.015 80)" }}
            >
              A white-walled European-style haven nestled within Savera Hotel,
              Mylapore. Indulge in artisan coffee, garden dining, and flavours
              crafted with soul.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex items-center gap-3 mb-10 flex-wrap"
            >
              {[
                {
                  icon: <Coffee className="w-4 h-4 text-gold" />,
                  label: "Dine-in",
                },
                {
                  icon: <ChefHat className="w-4 h-4 text-gold" />,
                  label: "Takeaway",
                },
                {
                  icon: <Truck className="w-4 h-4 text-gold" />,
                  label: "Delivery",
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                  style={{
                    background: "oklch(0.15 0.006 280)",
                    border: "1px solid oklch(0.3 0.02 80 / 0.4)",
                  }}
                >
                  {s.icon}
                  <span className="font-sans text-xs text-foreground">
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="#menu"
                data-ocid="hero.primary_button"
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 0 30px oklch(0.72 0.12 75 / 0.5)",
                }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 font-sans font-semibold uppercase text-sm rounded-sm"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.12 75), oklch(0.82 0.14 80))",
                  color: "oklch(0.12 0.005 280)",
                  letterSpacing: "0.1em",
                }}
              >
                Explore the Menu
              </motion.a>
              <motion.a
                href="#story"
                data-ocid="hero.secondary_button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 font-sans font-semibold uppercase text-sm rounded-sm border"
                style={{
                  borderColor: "oklch(0.72 0.12 75 / 0.5)",
                  color: "oklch(0.82 0.12 75)",
                  background: "oklch(0.72 0.12 75 / 0.08)",
                  letterSpacing: "0.1em",
                }}
              >
                Our Story
              </motion.a>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="hidden lg:block h-[520px] relative"
          >
            <div
              className="absolute inset-0 rounded-3xl overflow-hidden"
              style={{
                filter: "drop-shadow(0 0 40px oklch(0.72 0.12 75 / 0.3))",
              }}
            >
              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border-2 border-gold border-t-transparent animate-spin" />
                  </div>
                }
              >
                <CoffeeCup3D />
              </Suspense>
            </div>
            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 w-64 h-8 rounded-full blur-2xl"
              style={{ background: "oklch(0.72 0.12 75 / 0.2)" }}
            />
          </motion.div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="font-sans text-xs uppercase"
          style={{ color: "oklch(0.5 0.02 80)", letterSpacing: "0.15em" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
          style={{ border: "1px solid oklch(0.72 0.12 75 / 0.4)" }}
        >
          <div className="w-1 h-2 rounded-full bg-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Story ────────────────────────────────────────────────────────────────────

function StorySection() {
  return (
    <SectionWrapper id="story" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span
              className="font-sans text-xs uppercase text-gold mb-4 block"
              style={{ letterSpacing: "0.15em" }}
            >
              Our Story
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              A Garden of <span className="text-gold italic">Flavours</span>
            </h2>
            <GoldDivider />
            <p
              className="font-sans text-base leading-relaxed mb-6"
              style={{ color: "oklch(0.75 0.015 80)" }}
            >
              Nestled within the historic Savera Hotel on Dr Radha Krishnan
              Salai in Mylapore, The Brew Room is Chennai's most beloved
              European-style café. Our white-walled sanctuary opens to a lush
              garden, where guests dine under gazebos amid tropical greenery.
            </p>
            <p
              className="font-sans text-base leading-relaxed mb-10"
              style={{ color: "oklch(0.75 0.015 80)" }}
            >
              From artisan coffees that honour tradition to breakfast plates and
              vibrant lunch menus, every dish and drink is crafted with love and
              precision. Come for the coffee, stay for the story.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  icon: <Coffee className="w-5 h-5" />,
                  label: "Dine-in",
                  desc: "Garden & Indoor",
                },
                {
                  icon: <ChefHat className="w-5 h-5" />,
                  label: "Takeaway",
                  desc: "Ready to go",
                },
                {
                  icon: <Truck className="w-5 h-5" />,
                  label: "Delivery",
                  desc: "No-contact",
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className="p-4 rounded-lg text-center dark-card"
                >
                  <div className="flex justify-center mb-2 text-gold">
                    {s.icon}
                  </div>
                  <div className="font-sans text-sm font-semibold text-foreground">
                    {s.label}
                  </div>
                  <div
                    className="font-sans text-xs mt-1"
                    style={{ color: "oklch(0.55 0.015 80)" }}
                  >
                    {s.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl overflow-hidden relative"
              style={{ boxShadow: "0 30px 80px oklch(0 0 0 / 0.6)" }}
            >
              <img
                src="/assets/generated/garden-seating.dim_800x600.jpg"
                alt="The Brew Room Garden"
                className="w-full h-80 lg:h-[450px] object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, oklch(0.08 0.005 280 / 0.6) 0%, transparent 60%)",
                }}
              />
            </motion.div>
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute -bottom-6 -left-6 p-5 rounded-xl dark-card"
              style={{ boxShadow: "0 10px 40px oklch(0.72 0.12 75 / 0.2)" }}
            >
              <div className="font-serif text-3xl font-bold text-gold">4.4</div>
              <div className="flex gap-0.5 my-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-3 h-3 ${s <= 4 ? "fill-current text-gold" : "text-muted-foreground"}`}
                  />
                ))}
              </div>
              <div
                className="font-sans text-xs"
                style={{ color: "oklch(0.6 0.015 80)" }}
              >
                3,496 reviews
              </div>
            </motion.div>
            <div
              className="absolute -top-4 -right-4 w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: "oklch(0.72 0.12 75 / 0.12)",
                border: "1px solid oklch(0.72 0.12 75 / 0.3)",
              }}
            >
              <Leaf className="w-7 h-7 text-gold" />
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

// ─── Menu ─────────────────────────────────────────────────────────────────────

function MenuSection() {
  const [activeCat, setActiveCat] = useState(0);
  const category = menuCategories[activeCat];

  return (
    <SectionWrapper
      id="menu"
      className="py-24 px-6"
      style={{ background: "oklch(0.10 0.005 280)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="font-sans text-xs uppercase text-gold mb-4 block"
            style={{ letterSpacing: "0.15em" }}
          >
            Our Menu
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4">
            A Taste of <span className="text-gold italic">Excellence</span>
          </h2>
          <GoldDivider />
          <p
            className="font-sans text-base max-w-xl mx-auto"
            style={{ color: "oklch(0.65 0.015 80)" }}
          >
            From the first sip to the last bite, every item is carefully curated
            for an unforgettable experience.
          </p>
        </div>
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {menuCategories.map((cat, i) => (
            <motion.button
              key={cat.name}
              data-ocid="menu.tab"
              onClick={() => setActiveCat(i)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 font-sans text-sm font-medium uppercase rounded-sm transition-all duration-300"
              style={{
                background:
                  i === activeCat
                    ? "linear-gradient(135deg, oklch(0.72 0.12 75), oklch(0.82 0.14 80))"
                    : "oklch(0.16 0.008 280)",
                color:
                  i === activeCat
                    ? "oklch(0.12 0.005 280)"
                    : "oklch(0.65 0.015 80)",
                border:
                  i === activeCat
                    ? "none"
                    : "1px solid oklch(0.3 0.02 80 / 0.3)",
                letterSpacing: "0.08em",
              }}
            >
              {cat.icon} {cat.name}
            </motion.button>
          ))}
        </div>
        <motion.div
          key={activeCat}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {category.items.map((item, i) => (
            <motion.div
              key={item.name}
              data-ocid={`menu.item.${i + 1}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{
                y: -6,
                boxShadow: "0 20px 60px oklch(0.72 0.12 75 / 0.15)",
              }}
              className="rounded-xl overflow-hidden dark-card group cursor-pointer"
            >
              {menuImages[item.name] ? (
                <div className="h-44 overflow-hidden">
                  <img
                    src={menuImages[item.name]}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              ) : (
                <div
                  className="h-44 flex items-center justify-center text-5xl"
                  style={{ background: "oklch(0.13 0.01 60)" }}
                >
                  {category.icon}
                </div>
              )}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-serif text-base font-semibold text-foreground leading-snug">
                    {item.name}
                  </h3>
                  {item.popular && (
                    <span
                      className="shrink-0 px-2 py-0.5 text-xs font-sans font-semibold uppercase rounded-sm"
                      style={{
                        background: "oklch(0.72 0.12 75 / 0.2)",
                        color: "oklch(0.82 0.12 75)",
                        border: "1px solid oklch(0.72 0.12 75 / 0.3)",
                      }}
                    >
                      Popular
                    </span>
                  )}
                </div>
                <p
                  className="font-sans text-xs leading-relaxed mb-3"
                  style={{ color: "oklch(0.55 0.015 80)" }}
                >
                  {item.desc}
                </p>
                <div className="font-serif text-lg font-semibold text-gold">
                  {item.price}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

// ─── Reviews ──────────────────────────────────────────────────────────────────

function ReviewsSection() {
  return (
    <SectionWrapper id="reviews" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="font-sans text-xs uppercase text-gold mb-4 block"
            style={{ letterSpacing: "0.15em" }}
          >
            Guest Experiences
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What Our <span className="text-gold italic">Guests Say</span>
          </h2>
          <GoldDivider />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              data-ocid={`reviews.item.${i + 1}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ y: -4 }}
              className="p-7 rounded-2xl dark-card relative"
            >
              <div
                className="absolute top-4 right-5 font-serif text-6xl leading-none select-none"
                style={{ color: "oklch(0.72 0.12 75 / 0.15)" }}
              >
                “
              </div>
              <div className="flex items-center gap-4 mb-5">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-serif font-bold text-lg"
                  style={{
                    background: "oklch(0.72 0.12 75 / 0.2)",
                    color: "oklch(0.82 0.12 75)",
                  }}
                >
                  {review.initials}
                </div>
                <div>
                  <div className="font-sans text-sm font-semibold text-foreground">
                    {review.name}
                  </div>
                  <div
                    className="font-sans text-xs mt-0.5"
                    style={{ color: "oklch(0.5 0.015 80)" }}
                  >
                    {review.role}
                  </div>
                </div>
              </div>
              <StarRating rating={review.rating} />
              <p
                className="font-sans text-sm leading-relaxed mt-4"
                style={{ color: "oklch(0.72 0.015 80)" }}
              >
                "{review.text}"
              </p>
              <div
                className="mt-4 font-sans text-xs"
                style={{ color: "oklch(0.45 0.01 80)" }}
              >
                {review.time}
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex flex-col items-center gap-3"
        >
          <div className="font-serif text-6xl font-bold text-gold">4.4</div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`w-6 h-6 ${s <= 4 ? "fill-current text-gold" : "text-muted-foreground"}`}
              />
            ))}
          </div>
          <div
            className="font-sans text-sm"
            style={{ color: "oklch(0.55 0.015 80)" }}
          >
            Based on 3,496 reviews
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

// ─── Location ─────────────────────────────────────────────────────────────────

function LocationSection() {
  return (
    <SectionWrapper
      id="location"
      className="py-24 px-6"
      style={{ background: "oklch(0.10 0.005 280)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="font-sans text-xs uppercase text-gold mb-4 block"
            style={{ letterSpacing: "0.15em" }}
          >
            Find Us
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Location & <span className="text-gold italic">Contact</span>
          </h2>
          <GoldDivider />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          <div className="dark-card p-10 rounded-2xl flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-2xl font-semibold text-gold mb-8">
                The Brew Room
              </h3>
              <div className="space-y-6">
                {[
                  {
                    icon: <MapPin className="w-5 h-5 text-gold" />,
                    label: "Address",
                    content: (
                      <span>
                        146, Dr Radha Krishnan Salai,
                        <br />
                        Mylapore, Chennai,
                        <br />
                        Tamil Nadu 600004
                      </span>
                    ),
                  },
                  {
                    icon: <Phone className="w-5 h-5 text-gold" />,
                    label: "Phone",
                    content: (
                      <a
                        href="tel:09710947380"
                        data-ocid="contact.link"
                        className="hover:text-gold transition-colors"
                        style={{ color: "oklch(0.65 0.015 80)" }}
                      >
                        097109 47380
                      </a>
                    ),
                  },
                  {
                    icon: <Clock className="w-5 h-5 text-gold" />,
                    label: "Hours",
                    content: (
                      <span>
                        <span className="text-green-400 font-semibold">
                          Open Now
                        </span>{" "}
                        · Closes 11 PM
                      </span>
                    ),
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{
                        background: "oklch(0.72 0.12 75 / 0.15)",
                        border: "1px solid oklch(0.72 0.12 75 / 0.3)",
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-sans text-sm font-medium text-foreground mb-1">
                        {item.label}
                      </div>
                      <div
                        className="font-sans text-sm leading-relaxed"
                        style={{ color: "oklch(0.65 0.015 80)" }}
                      >
                        {item.content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <motion.a
              href="https://maps.google.com/?q=146+Dr+Radha+Krishnan+Salai+Mylapore+Chennai"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="location.primary_button"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 25px oklch(0.72 0.12 75 / 0.4)",
              }}
              whileTap={{ scale: 0.97 }}
              className="mt-10 block text-center px-8 py-4 font-sans font-semibold uppercase text-sm rounded-sm"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.72 0.12 75), oklch(0.82 0.14 80))",
                color: "oklch(0.12 0.005 280)",
                letterSpacing: "0.1em",
              }}
            >
              Get Directions
            </motion.a>
          </div>
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              minHeight: 400,
              boxShadow: "0 20px 60px oklch(0 0 0 / 0.5)",
              border: "1px solid oklch(0.72 0.12 75 / 0.2)",
            }}
          >
            <iframe
              data-ocid="location.map_marker"
              src="https://maps.google.com/maps?q=146+Dr+Radha+Krishnan+Salai+Mylapore+Chennai&output=embed"
              title="The Brew Room Location"
              width="100%"
              height="100%"
              style={{
                minHeight: 400,
                border: "none",
                filter: "invert(90%) hue-rotate(180deg)",
              }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      data-ocid="footer.section"
      className="py-12 px-6"
      style={{
        background: "oklch(0.09 0.004 280)",
        borderTop: "1px solid oklch(0.72 0.12 75 / 0.15)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: "oklch(0.72 0.12 75 / 0.15)",
                border: "1px solid oklch(0.72 0.12 75 / 0.4)",
              }}
            >
              <Coffee className="w-5 h-5 text-gold" />
            </div>
            <div>
              <div
                className="font-serif text-lg font-semibold text-gold"
                style={{ letterSpacing: "0.12em" }}
              >
                THE BREW ROOM
              </div>
              <div
                className="font-sans text-xs"
                style={{ color: "oklch(0.45 0.01 80)" }}
              >
                Mylapore, Chennai
              </div>
            </div>
          </div>
          <div className="flex gap-8 flex-wrap justify-center">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="font-sans text-xs uppercase hover:text-gold transition-colors"
                style={{ color: "oklch(0.5 0.01 80)", letterSpacing: "0.1em" }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
        <div
          className="mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid oklch(0.2 0.005 280)" }}
        >
          <p
            className="font-sans text-xs"
            style={{ color: "oklch(0.4 0.01 80)" }}
          >
            © {year} The Brew Room · Mylapore, Chennai
          </p>
          <p
            className="font-sans text-xs"
            style={{ color: "oklch(0.4 0.01 80)" }}
          >
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
              style={{ color: "oklch(0.55 0.015 80)" }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.11 0.005 280)" }}
    >
      <Navbar />
      <main>
        <HeroSection />
        <StorySection />
        <MenuSection />
        <ReviewsSection />
        <LocationSection />
      </main>
      <Footer />
    </div>
  );
}
