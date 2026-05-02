import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  ChevronDown,
  ExternalLink,
  Code2,
  Database,
  BrainCircuit,
  Terminal,
  Cpu,
  GraduationCap,
  MapPin,
  Menu,
  X,
  Award,
  CalendarDays,
  Building2
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// --- Data ---
const SKILLS = [
  { name: "Machine Learning", progress: 90, icon: BrainCircuit, color: "bg-blue-500" },
  { name: "Deep Learning", progress: 85, icon: Cpu, color: "bg-purple-500" },
  { name: "NLP", progress: 88, icon: Database, color: "bg-cyan-500" },
  { name: "Python", progress: 95, icon: Terminal, color: "bg-green-500" },
  { name: "Data Analysis", progress: 85, icon: Code2, color: "bg-yellow-500" },
  { name: "Web Development", progress: 75, icon: ExternalLink, color: "bg-pink-500" },
];

const TECHNOLOGIES = [
  "Python", "TensorFlow", "PyTorch", "Scikit-learn", "Flask", "React", "NLP", "Deep Learning"
];

const PROJECTS = [
  {
    id: 1,
    title: "Mental Health AI Assistant",
    description: "Built an intelligent assistant that recommends mental health resources and coping strategies using NLP and collaborative filtering.",
    image: `${import.meta.env.BASE_URL}images/mental-health.jpg`,
    tags: ["NLP", "Python", "TensorFlow", "Recommender System"],
    category: "NLP",
  },
  {
    id: 2,
    title: "Arabic Speech Recognition",
    description: "Fine-tuned Whisper model for Arabic speech-to-text with improved accuracy on dialectal Arabic dialects and audio data.",
    image: `${import.meta.env.BASE_URL}images/whisper-arabic.jpg`,
    tags: ["PyTorch", "Whisper", "NLP", "Deep Learning"],
    category: "Deep Learning",
  },
  {
    id: 3,
    title: "Customer Support Chatbot",
    description: "Fine-tuned MistralAI LLM for automated customer support with context-aware responses and sentiment analysis.",
    image: `${import.meta.env.BASE_URL}images/chatbot-mistral.jpg`,
    tags: ["LLM", "MistralAI", "Python", "NLP"],
    category: "NLP",
  },
  {
    id: 4,
    title: "Histopathologic Cancer Detection",
    description: "Image classification using CNN to detect cancer in histopathology slides with high accuracy and low false-positive rates.",
    image: `${import.meta.env.BASE_URL}images/cancer-detection.png`,
    tags: ["CNN", "Deep Learning", "PyTorch", "Computer Vision"],
    category: "Computer Vision",
  },
];

const COURSES = [
  "Data Mining", "Artificial Intelligence", "Operating Systems",
  "Software Engineering", "Computer Architecture", "Algorithms",
  "Data Structures & OOP", "Big Data", "Cloud & Networks"
];

const CERTIFICATIONS = [
  {
    id: 1,
    title: "Artificial Intelligence",
    subtitle: "90 Hours — Intensive Course",
    issuer: "Information Technology Institute (ITI)",
    date: "Jul 26 – Aug 8, 2025",
    image: `${import.meta.env.BASE_URL}images/cert-iti-ai.jpg`,
    topics: ["Intro to AI", "ML & Statistics", "Neural Networks & Deep Learning", "Data Preparation", "Hands-On Project"],
  },
  {
    id: 2,
    title: "Getting Started with Deep Learning",
    subtitle: "Certificate of Competency",
    issuer: "NVIDIA",
    date: "August 14, 2025",
    image: `${import.meta.env.BASE_URL}images/cert-nvidia-dl.jpg`,
    topics: ["Deep Learning Fundamentals", "Neural Network Architecture", "Model Training & Evaluation"],
  },
];

// --- Components ---

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-16 md:mb-20">
    <motion.h2 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-5xl font-bold mb-4 font-display text-foreground"
    >
      {children}
      <span className="text-primary">.</span>
    </motion.h2>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-muted-foreground text-lg md:text-xl max-w-2xl"
      >
        {subtitle}
      </motion.p>
    )}
    <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent mt-6 rounded-full" />
  </div>
);

export default function Portfolio() {
  const { toast } = useToast();
  const [activeFilter, setActiveFilter] = useState("All");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ["All", ...Array.from(new Set(PROJECTS.map(p => p.category)))];
  
  const filteredProjects = activeFilter === "All" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeFilter);

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    const mailtoUrl = `mailto:ebraamgamal57@gmail.com?subject=${subject}&body=${body}`;

    window.location.href = mailtoUrl;

    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Email client opened!",
        description: "Complete sending the message from your email app.",
      });
      form.reset();
    }, 800);
  };

  const navLinks = [
    { name: "Education", href: "#education" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Certifications", href: "#certifications" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-primary">
      
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="#" className="text-2xl font-bold font-display tracking-tight text-foreground hover:opacity-80 transition-opacity">
              AG<span className="text-primary">.</span>
            </a>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <ThemeToggle />
            </nav>

            {/* Mobile Menu Toggle */}
            <div className="flex items-center gap-4 md:hidden">
              <ThemeToggle />
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-border bg-background"
            >
              <div className="flex flex-col py-4 px-4 gap-4">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-base font-medium text-muted-foreground hover:text-foreground p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* HERO SECTION */}
        <section id="hero" className="relative pt-32 pb-20 md:pt-48 md:pb-32 flex items-center min-h-[90vh]">
          {/* Background Image / Glows */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-50 mix-blend-screen" />
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[150px] opacity-40 mix-blend-screen" />
            <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]" />
            <img 
              src={`${import.meta.env.BASE_URL}images/hero-bg.png`} 
              alt="" 
              className="w-full h-full object-cover opacity-[0.03] dark:opacity-[0.1] mix-blend-luminosity" 
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">
              {/* Text content */}
              <div className="flex-1 min-w-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 border border-primary/20"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  Available for opportunities
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-bold font-display leading-[1.1] mb-6"
                >
                  Hi, I'm <br />
                  <span className="text-gradient">Abram Gamal</span>
                </motion.h1>
                
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-xl md:text-2xl font-medium text-foreground mb-6"
                >
                  AI / Machine Learning Engineer
                </motion.h2>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-lg text-muted-foreground mb-10 max-w-xl leading-relaxed"
                >
                  Specializing in Artificial Intelligence and Machine Learning. Passionate about solving real-world problems through data, predictive modeling, and intelligent systems.
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-wrap gap-4"
                >
                  <Button asChild size="lg" className="h-14 px-8 text-base rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300">
                    <a href="#projects">View Projects</a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base rounded-full border-border/50 hover:bg-muted hover:-translate-y-1 transition-all duration-300 bg-background/50 backdrop-blur-sm">
                    <a href="#contact">Contact Me</a>
                  </Button>
                </motion.div>
              </div>

              {/* Profile Photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="shrink-0 flex justify-center"
              >
                <div className="relative">
                  <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 blur-2xl opacity-60" />
                  <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl shadow-primary/20 ring-1 ring-border">
                    <img
                      src={`${import.meta.env.BASE_URL}images/profile.jpeg`}
                      alt="Abram Gamal Boles"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  {/* Decorative ring */}
                  <div className="absolute -inset-3 rounded-full border border-primary/20 animate-[spin_20s_linear_infinite]" />
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block"
          >
            <a href="#education" className="p-2 rounded-full bg-background/50 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-primary transition-colors flex items-center justify-center">
              <ChevronDown className="w-5 h-5" />
            </a>
          </motion.div>
        </section>

        {/* EDUCATION SECTION */}
        <section id="education" className="py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading subtitle="Academic background and relevant coursework that shaped my expertise in AI.">
              Education
            </SectionHeading>

            <FadeIn>
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Degree Card */}
                <div className="md:w-1/3">
                  <div className="bg-card border border-border/50 rounded-2xl p-8 shadow-lg group hover:border-primary/50 transition-colors h-full">
                    <div className="flex items-center gap-3 text-primary mb-4">
                      <div className="p-2 rounded-xl bg-primary/10">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      <span className="font-semibold tracking-wide text-sm uppercase">Ongoing</span>
                    </div>
                    <h3 className="text-2xl font-bold font-display mb-2">Computer Science</h3>
                    <div className="flex items-center gap-2 text-muted-foreground mt-3">
                      <MapPin className="w-4 h-4 shrink-0" />
                      <span>Fayoum University, Egypt</span>
                    </div>
                  </div>
                </div>

                {/* Coursework */}
                <div className="md:flex-1">
                  <div className="bg-background rounded-2xl p-8 border border-border/40">
                    <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
                      <Database className="w-5 h-5 text-primary" />
                      Relevant Coursework
                    </h4>
                    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {COURSES.map((course, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 shrink-0" />
                          {course}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading subtitle="AI / Machine Learning Engineer passionate about building intelligent, real-world solutions.">
              About Me
            </SectionHeading>
            
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <FadeIn>
                <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
                  <p className="lead text-foreground font-medium text-xl">
                    I am a Computer Science graduate from Fayoum University with a strong focus on Artificial Intelligence and Machine Learning.
                  </p>
                  <p>
                    My journey in technology is driven by a deep curiosity about how machines can learn, adapt, and solve complex problems. Over the years, I have built a solid foundation in both the theoretical and practical aspects of Machine Learning, Deep Learning, and Natural Language Processing.
                  </p>
                  <p>
                    I specialize in developing intelligent systems — from fine-tuning large language models for conversational AI to building computer vision solutions for impactful domains such as healthcare.
                  </p>
                  <p>
                    I am continuously exploring cutting-edge research and applying it to real-world applications, with a strong passion for transforming complex data into actionable insights.
                  </p>
                </div>
              </FadeIn>
              
              <FadeIn delay={0.2}>
                <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-xl shadow-black/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[50px] group-hover:bg-primary/20 transition-colors duration-500" />
                  <h3 className="text-2xl font-bold mb-6 font-display">Technologies I Work With</h3>
                  <div className="flex flex-wrap gap-3">
                    {TECHNOLOGIES.map((tech, i) => (
                      <span 
                        key={tech}
                        className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors cursor-default"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading subtitle="A showcase of my recent work in AI, from natural language processing to computer vision.">
              Featured Projects
            </SectionHeading>

            {/* Filter */}
            <FadeIn delay={0.1} className="flex flex-wrap gap-2 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeFilter === category 
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" 
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </FadeIn>

            {/* Grid */}
            <motion.div layout className="grid md:grid-cols-2 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    key={project.id}
                    className="group bg-card rounded-3xl overflow-hidden border border-border/50 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col h-full"
                  >
                    <div className="relative h-64 w-full overflow-hidden bg-muted">
                      <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500" />
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                      <span className="text-primary text-xs font-bold uppercase tracking-wider mb-2">{project.category}</span>
                      <h3 className="text-2xl font-bold font-display mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                      <p className="text-muted-foreground mb-6 flex-1 leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/50">
                        {project.tags.map(tag => (
                          <span key={tag} className="text-[11px] font-semibold px-2 py-1 bg-primary/8 text-primary rounded border border-primary/25 whitespace-nowrap">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-24 bg-muted/30 relative overflow-hidden">
          {/* Decorative element */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <SectionHeading subtitle="My technical expertise spans across various domains of AI and Software Engineering.">
              Core Expertise
            </SectionHeading>

            <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
              {SKILLS.map((skill, index) => (
                <FadeIn key={skill.name} delay={index * 0.1}>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-background border border-border shadow-sm`}>
                          <skill.icon className={`w-5 h-5 text-primary`} />
                        </div>
                        <span className="text-lg font-semibold">{skill.name}</span>
                      </div>
                      <span className="text-muted-foreground font-mono">{skill.progress}%</span>
                    </div>
                    <div className="h-3 w-full bg-background border border-border/50 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.2 + (index * 0.1), ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full relative"
                      >
                        <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite] -skew-x-12" />
                      </motion.div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CERTIFICATIONS SECTION */}
        <section id="certifications" className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading subtitle="Professional certifications and training courses that validate my expertise.">
              Certifications
            </SectionHeading>

            <div className="grid md:grid-cols-2 gap-8">
              {CERTIFICATIONS.map((cert, index) => (
                <FadeIn key={cert.id} delay={index * 0.15}>
                  <div className="group bg-card border border-border/50 rounded-3xl overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col">
                    {/* Certificate Image */}
                    <div className="relative h-56 w-full overflow-hidden bg-muted">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-7 flex-1 flex flex-col">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-primary/10 shrink-0 mt-0.5">
                          <Award className="w-5 h-5 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-xl font-bold font-display leading-snug group-hover:text-primary transition-colors">{cert.title}</h3>
                          <p className="text-sm text-muted-foreground mt-0.5">{cert.subtitle}</p>
                        </div>
                      </div>

                      <div className="space-y-2 mb-5">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Building2 className="w-4 h-4 shrink-0 text-primary/60" />
                          <span className="font-medium text-foreground">{cert.issuer}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CalendarDays className="w-4 h-4 shrink-0 text-primary/60" />
                          <span>{cert.date}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/50 mt-auto">
                        {cert.topics.map(topic => (
                          <span key={topic} className="text-[11px] font-semibold px-2 py-1 bg-primary/8 text-primary rounded border border-primary/25 whitespace-nowrap">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-24 bg-card border-t border-border relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16">
              
              <FadeIn>
                <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">Let's build something <span className="text-primary">together.</span></h2>
                <p className="text-xl text-muted-foreground mb-12 max-w-md">
                  Whether you have a project in mind, a question about my work, or just want to say hi, my inbox is always open.
                </p>

                <div className="space-y-6">
                  <a href="mailto:ebraamgamal57@gmail.com" className="flex items-center gap-4 group p-4 rounded-2xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border">
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors shadow-sm">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">Email</p>
                      <p className="text-lg font-semibold">ebraamgamal57@gmail.com</p>
                    </div>
                  </a>

                  <a href="tel:+201552606776" className="flex items-center gap-4 group p-4 rounded-2xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border">
                    <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors shadow-sm">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">Phone</p>
                      <p className="text-lg font-semibold">+20 155 260 6776</p>
                    </div>
                  </a>

                  <div className="flex gap-4 pt-6 pl-4">
                    <a href="https://github.com/Abr4m/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-background border border-border shadow-sm hover:border-primary hover:text-primary transition-all hover:-translate-y-1">
                      <Github className="w-6 h-6" />
                      <span className="sr-only">GitHub</span>
                    </a>
                    <a href="https://eg.linkedin.com/in/abram-jamal/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-background border border-border shadow-sm hover:border-primary hover:text-primary transition-all hover:-translate-y-1">
                      <Linkedin className="w-6 h-6" />
                      <span className="sr-only">LinkedIn</span>
                    </a>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.2} className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-[2rem] blur opacity-20" />
                <div className="bg-background rounded-3xl p-8 relative border border-border shadow-xl">
                  <h3 className="text-2xl font-bold mb-6 font-display">Send a message</h3>
                  <form onSubmit={handleContactSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Name</label>
                      <Input id="name" required placeholder="John Doe" className="bg-muted/50 border-border/50 h-12 rounded-xl focus-visible:ring-primary/20" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <Input id="email" type="email" required placeholder="john@example.com" className="bg-muted/50 border-border/50 h-12 rounded-xl focus-visible:ring-primary/20" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">Message</label>
                      <Textarea id="message" required placeholder="How can I help you?" className="bg-muted/50 border-border/50 min-h-[150px] rounded-xl resize-none focus-visible:ring-primary/20" />
                    </div>
                    <Button type="submit" disabled={isSubmitting} className="w-full h-12 rounded-xl text-base shadow-lg shadow-primary/20 transition-all hover:shadow-primary/30">
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </div>
              </FadeIn>

            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="py-8 border-t border-border bg-background text-center">
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} Abram Gamal Boles. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
