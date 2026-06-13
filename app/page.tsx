"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight, Cpu, Zap, Shield, FileText, Award, Layers, Menu, X, ExternalLink, Code2, Boxes, Database, Lock, Terminal } from "lucide-react";

// --- Advanced Canvas Background (Lusion-style) ---
function LusionBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    const particles: any[] = [];
    const properties = {
      bgColor: "rgba(10, 10, 10, 1)",
      particleColor: "rgba(0, 255, 255, 0.5)",
      particleRadius: 1.5,
      particleCount: 80,
      particleMaxVelocity: 0.5,
      lineLength: 150,
      particleLife: 6,
    };

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    class Particle {
      x: number;
      y: number;
      velocityX: number;
      velocityY: number;
      life: number;

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
        this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
        this.life = Math.random() * properties.particleLife * 60;
      }

      position() {
        (this.x + this.velocityX > w || this.x + this.velocityX < 0) ? this.velocityX *= -1 : this.velocityX;
        (this.y + this.velocityY > h || this.y + this.velocityY < 0) ? this.velocityY *= -1 : this.velocityY;
        this.x += this.velocityX;
        this.y += this.velocityY;
      }

      reDraw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
        ctx!.closePath();
        ctx!.fillStyle = properties.particleColor;
        ctx!.fill();
      }
    }

    function drawLines() {
      let x1, y1, x2, y2, length, opacity;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          x1 = particles[i].x;
          y1 = particles[i].y;
          x2 = particles[j].x;
          y2 = particles[j].y;
          length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
          if (length < properties.lineLength) {
            opacity = 1 - length / properties.lineLength;
            ctx!.lineWidth = 0.5;
            ctx!.strokeStyle = "rgba(0, 255, 255, " + opacity + ")";
            ctx!.beginPath();
            ctx!.moveTo(x1, y1);
            ctx!.lineTo(x2, y2);
            ctx!.closePath();
            ctx!.stroke();
          }
        }
      }
    }

    function loop() {
      ctx!.clearRect(0, 0, w, h);
      if (particles.length < properties.particleCount) {
        particles.push(new Particle());
      }
      for (let i = 0; i < particles.length; i++) {
        particles[i].position();
        particles[i].reDraw();
      }
      drawLines();
      requestAnimationFrame(loop);
    }

    loop();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-40" />;
}

// --- Component: Hero Circle ---
const ConcentricCircles = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
    {[1, 2, 3].map((i) => (
      <motion.div
        key={i}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: i * 2, opacity: [0, 0.1, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: i * 0.8,
          ease: "linear"
        }}
        className="absolute w-96 h-96 border border-cyan/30 rounded-full"
      />
    ))}
  </div>
);

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const words = [
    { text: "Design", color: "text-white" },
    { text: "Architect", color: "text-cyan" },
    { text: "Scale", color: "text-amber-400" },
    { text: "Transform", color: "text-gradient" }
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index === words.length - 1) {
      setTimeout(onComplete, 1200);
      return;
    }
    const timer = setTimeout(() => {
      setIndex(prev => prev + 1);
    }, 850);
    return () => clearTimeout(timer);
  }, [index, onComplete, words.length]);

  return (
    <motion.div 
      exit={{ y: "-100%" }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="h-[150px] overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.h1 
            key={index}
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className={`text-[9vw] font-black uppercase italic leading-none px-[0.2em] whitespace-nowrap ${words[index].color}`}
          >
            {words[index].text}
          </motion.h1>
        </AnimatePresence>
      </div>
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-40 h-[2px] bg-white/10">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 3.5, ease: "linear" }}
          className="h-full bg-cyan shadow-[0_0_15px_rgba(0,255,255,0.5)]"
        />
      </div>
    </motion.div>
  );
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <main className="bg-[#0a0a0a] text-white selection:bg-cyan/30">
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <LusionBackground />
      <motion.div className="fixed top-0 left-0 right-0 h-[3px] bg-cyan z-[60] origin-left" style={{ scaleX }} />

      <div className="relative z-10">
        {/* Floating Menu */}
        <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 floating-menu px-8 py-4 flex gap-8 items-center border border-white/10 shadow-2xl shadow-cyan/10">
          {[
            { name: "About", href: "#about" },
            { name: "Projects", href: "#projects" },
            { name: "Skills", href: "#tech" },
            { name: "Sync", href: "#contact" }
          ].map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 hover:text-cyan transition-colors"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Hero Section */}
        <section className="h-screen flex items-center justify-center px-8 relative">
          <ConcentricCircles />
          <div className="text-center z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              <h2 className="font-mono text-cyan text-sm uppercase tracking-[0.5em] mb-8 block">Software Engineer @ TCS</h2>
              <h1 className="text-[14vw] md:text-[10vw] font-black tracking-tighter leading-none uppercase italic">
                SMIT<br />KOTAK
              </h1>
              <div className="mt-12 flex flex-col items-center">
                <p className="text-white/40 max-w-sm uppercase text-[10px] tracking-widest leading-loose">
                  High-performance Java & Distributed Systems Architect<br />
                  Modernizing enterprise engines for <span className="text-white">GE Aerospace</span>
                </p>
                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="mt-20 w-[1px] h-20 bg-gradient-to-b from-cyan to-transparent"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-40 px-8 max-w-7xl mx-auto border-t border-white/5">
           <div className="grid md:grid-cols-2 gap-20 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                 <span className="font-mono text-cyan text-[10px] uppercase tracking-[0.5em] mb-4 block">01 // Background</span>
                 <h2 className="text-5xl font-black tracking-tighter uppercase italic leading-none mb-8">Origins of<br />Efficiency.</h2>
                 <p className="text-xl text-white/50 leading-relaxed mb-8">
                    Currently a <span className="text-white font-bold">Software Developer at Tata Consultancy Services</span>, leading offshore teams in architecting high-performance Java systems. My focus is on <span className="text-cyan">Spring Boot modernization</span>, security hardening, and process excellence.
                 </p>
                 <div className="flex gap-12">
                    <div>
                       <div className="text-4xl font-black mb-2">3.5+</div>
                       <div className="text-[10px] uppercase tracking-widest text-white/30">Years of Exp</div>
                    </div>
                    <div>
                       <div className="text-4xl font-black mb-2">11</div>
                       <div className="text-[10px] uppercase tracking-widest text-white/30">TCS Awards</div>
                    </div>
                 </div>
              </motion.div>
              <div className="relative group flex justify-center">
                  <div className="absolute inset-0 bg-cyan blur-[120px] opacity-10 group-hover:opacity-20 transition-opacity" />
                  <img src="/caricature.png" alt="Smit" className="w-80 relative z-10 grayscale hover:grayscale-0 transition-all duration-1000" />
              </div>
           </div>
        </section>

        {/* Projects / Manifesto */}
        <section id="projects" className="py-40 px-8 max-w-7xl mx-auto border-t border-white/5">
          <div className="flex justify-between items-end mb-32">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-none">The<br />Manifesto</h2>
            <div className="font-mono text-[10px] text-cyan uppercase tracking-widest mb-4 border-b border-cyan/30 pb-2">Selected Works [06]</div>
          </div>

          <div className="grid md:grid-cols-2 gap-x-20 gap-y-40">
            <ProjectCard 
              index="01"
              title="Modernization"
              subtitle="Spring Boot 3 Migration"
              desc="Led modernization of 12+ critical production applications for GE Aerospace. Strengthened system resilience and security posture."
              img="/project_modernization.png"
            />
            <ProjectCard 
              index="02"
              title="Automation"
              subtitle="B2B Onboarding"
              desc="90% productivity gain via automated bulk email notification workflow for onboarding. From 2 min/record to 10+ in <3 mins."
              img="/project_automation.png"
              className="md:mt-40"
            />
            <ProjectCard 
              index="03"
              title="Optimization"
              subtitle="PDF Generation Service"
              desc="87% reduction in processing time (15 mins to 2 mins) by refactoring Spring Boot backend code. Saving 90+ hours weekly."
              img="/project_pdf.png"
            />
            <ProjectCard 
              index="04"
              title="Scalability"
              subtitle="Finance Asset Workflow"
              desc="India Asset Workflow financial calculations automation. Reduced settlement turnaround from 1-2 days to same-day processing."
              img="/project_finance.png"
              className="md:mt-40"
            />
            <ProjectCard 
              index="05"
              title="Performance"
              subtitle="Server-side Pagination"
              desc="Implemented Spring Data JPA Pageable for large datasets. Reduced API response payload by 70% and improved frontend load times."
              img="/project_modernization.png"
            />
            <ProjectCard 
              index="06"
              title="Modern Stack"
              subtitle="Struts to Spring Migration"
              desc="Spearheaded migration of critical enterprise apps from Struts 2.x to Spring Boot/Angular. Eliminated high-severity vulnerabilities."
              img="/project_automation.png"
              className="md:mt-40"
            />
          </div>
        </section>

        {/* Engineering Logic Section */}
        <section className="py-40 px-8 border-y border-white/5 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-black mb-20 tracking-tighter uppercase italic text-cyan">Engineering Logic</h2>
            <div className="grid md:grid-cols-3 gap-12">
               {[
                 { icon: <Code2 />, title: "Lean Implementation", desc: "Acknowledged for automating India Asset Workflow, cutting manual effort by 80%." },
                 { icon: <Shield />, title: "Secure Retrieval", desc: "Engineered multi-layered encryption/decryption for secure server-side password management." },
                 { icon: <Terminal />, title: "SOP Development", desc: "Developed standard procedures for troubleshooting, resulting in a 20% reduction in ticket count." }
               ].map((exp, i) => (
                 <motion.div 
                  key={i}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="p-8 border border-white/10 rounded-2xl bg-[#0a0a0a]/50 hover:border-cyan/50 transition-all group"
                 >
                   <div className="text-cyan mb-6 group-hover:scale-110 transition-transform">{exp.icon}</div>
                   <h3 className="text-xl font-bold mb-4 uppercase">{exp.title}</h3>
                   <p className="text-white/40 text-sm leading-relaxed">{exp.desc}</p>
                 </motion.div>
               ))}
            </div>
          </div>
        </section>

        {/* Core (Technical Arsenal) */}
        <section id="tech" className="py-40 px-8 max-w-7xl mx-auto border-t border-white/5">
          <div className="grid md:grid-cols-2 gap-20">
            <div>
              <span className="font-mono text-cyan text-[10px] uppercase tracking-[0.5em] mb-4 block">03 // The Arsenal</span>
              <h2 className="text-6xl font-black tracking-tighter uppercase leading-none mb-12">Technical<br />Mastery.</h2>
              <div className="space-y-12">
                <TechItem label="Programming" val="Java (8, 17), TypeScript, JavaScript" />
                <TechItem label="Frameworks" val="Spring Boot (1.x, 2.x, 3.x), Hibernate, Angular, Struts" />
                <TechItem label="Cloud & DevOps" val="AWS, Jenkins, Git/GitHub, CI/CD Pipelines" />
                <TechItem label="Database" val="MySQL, PostgreSQL, SQL" />
                <TechItem label="Tools" val="Swagger, Postman, SonarQube, BuildSmart" />
                <TechItem label="Architecture" val="REST APIs, Microservices, MVC, Gen AI, Lean" />
              </div>
            </div>
            <div className="flex flex-col gap-12">
               <div className="bg-white/5 rounded-3xl p-12 border border-white/5">
                  <span className="font-mono text-cyan text-[10px] uppercase tracking-[0.5em] mb-8 block">04 // Recognition</span>
                  <h3 className="text-3xl font-black italic uppercase mb-12">Accolades</h3>
                  <div className="space-y-8">
                      <AwardItem title="Contextual Masters Award (TCS)" desc="Enterprise-wide Spring Boot 3.x migration across 12+ critical apps." />
                      <AwardItem title="CIO-Level Recognition" desc="Architecting automated PDF service delivering 90+ hours weekly savings." />
                      <AwardItem title="Process Excellence (Lean)" desc="Reducing India Asset turnaround from 2 days to same-day settlement." />
                      <AwardItem title="11X CLAP Awards" desc="On the Spot, Star Team, and Best Team recognition for high-quality delivery." />
                      <AwardItem title="Stakeholder Appreciation" desc="Consistently recognized by Client leadership for technical excellence." />
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="py-20 px-8 border-y border-white/5 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
            <h2 className="text-4xl font-black tracking-tighter uppercase italic">Origins</h2>
            <div className="flex-1 max-w-xl text-right md:text-left">
              <div className="text-cyan font-mono text-xs uppercase tracking-[0.4em] mb-2">Education</div>
              <div className="text-2xl font-bold uppercase">Masters of Computer Applications</div>
              <div className="text-white/40 uppercase tracking-widest text-xs mt-1">Nirma University, Ahmedabad // CGPA 8.9</div>
            </div>
          </div>
        </section>

        {/* Sync (Footer) */}
        <footer id="contact" className="py-60 px-8 bg-cyan text-black text-center relative overflow-hidden">
           <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
              <h2 className="text-[40vw] font-black italic tracking-tighter select-none">SYNC</h2>
           </div>
           <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-7xl md:text-9xl font-black tracking-tighter mb-12 uppercase italic leading-none">Let's<br />Sync.</h2>
              <a href="mailto:smitkotak1999@gmail.com" className="text-2xl md:text-4xl font-bold border-b-4 border-black pb-2 hover:bg-black hover:text-cyan px-4 transition-all inline-block mb-12">
                smitkotak1999@gmail.com
              </a>
              <div className="flex justify-center gap-12 font-mono text-[10px] uppercase tracking-[0.4em] font-black">
                <a href="https://www.linkedin.com/in/smit-kotak-170804129/" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">LinkedIn</a>
                <a href="#" className="hover:opacity-60 transition-opacity">GitHub</a>
              </div>
              <p className="mt-40 text-[8px] uppercase tracking-[0.6em] font-black opacity-40">SMIT KOTAK // EST. 1999 // TCS</p>
           </div>
        </footer>
      </div>
    </main>
  );
}

function TechItem({ label, val }: any) {
  return (
    <div className="border-l border-cyan/20 pl-8 group hover:border-cyan transition-colors">
      <div className="text-[8px] uppercase tracking-[0.5em] text-white/40 mb-2">{label}</div>
      <div className="text-2xl font-bold group-hover:text-cyan transition-colors">{val}</div>
    </div>
  );
}

function AwardItem({ title, desc }: any) {
  return (
    <div className="border-b border-white/5 pb-6 last:border-0 group">
      <div className="text-white font-bold uppercase tracking-widest text-sm mb-2 group-hover:text-cyan transition-colors">{title}</div>
      <p className="text-white/30 text-xs uppercase leading-relaxed">{desc}</p>
    </div>
  );
}

function ProjectCard({ index, title, subtitle, desc, img, className }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`group perspective-1000 ${className}`}
    >
      <div className="relative overflow-hidden aspect-[16/10] bg-[#111] rounded-sm border border-white/5 preserve-3d group-hover:rotate-x-12 group-hover:rotate-y-12 transition-transform duration-700 ease-out shadow-2xl">
        <img src={img} alt={title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-8 left-8">
           <div className="text-[10px] font-mono text-cyan uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity delay-300">{index}</div>
           <h3 className="text-3xl font-black uppercase italic leading-none">{title}</h3>
        </div>
      </div>
      <div className="mt-8 space-y-4">
        <h4 className="text-sm font-bold uppercase tracking-widest text-white/60">{subtitle}</h4>
        <p className="text-white/40 text-sm max-w-sm leading-relaxed">{desc}</p>
        <div className="w-10 h-[2px] bg-cyan group-hover:w-full transition-all duration-700" />
      </div>
    </motion.div>
  );
}
