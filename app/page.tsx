"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight, Cpu, Zap, Shield, FileText, Award, Layers, Menu, X, ExternalLink, Code2, Boxes, Database, Lock, Terminal } from "lucide-react";

// --- Advanced Canvas Background ---
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
      particleColor: "rgba(0, 255, 255, 0.5)",
      particleRadius: 1.5,
      particleCount: 80,
      particleMaxVelocity: 0.5,
      lineLength: 150,
    };

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    class Particle {
      x: number; y: number; vx: number; vy: number;
      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
        this.vy = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
      }
      position() {
        if (this.x + this.vx > w || this.x + this.vx < 0) this.vx *= -1;
        if (this.y + this.vy > h || this.y + this.vy < 0) this.vy *= -1;
        this.x += this.vx; this.y += this.vy;
      }
      reDraw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
        ctx!.fillStyle = properties.particleColor;
        ctx!.fill();
      }
    }

    function drawLines() {
      let x1, y1, x2, y2, length, opacity;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          x1 = particles[i].x; y1 = particles[i].y;
          x2 = particles[j].x; y2 = particles[j].y;
          length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
          if (length < properties.lineLength) {
            opacity = 1 - length / properties.lineLength;
            ctx!.lineWidth = 0.5;
            ctx!.strokeStyle = "rgba(0, 255, 255, " + opacity + ")";
            ctx!.beginPath(); ctx!.moveTo(x1, y1); ctx!.lineTo(x2, y2); ctx!.stroke();
          }
        }
      }
    }

    function loop() {
      ctx!.clearRect(0, 0, w, h);
      if (particles.length < properties.particleCount) particles.push(new Particle());
      particles.forEach(p => { p.position(); p.reDraw(); });
      drawLines();
      requestAnimationFrame(loop);
    }
    loop();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-40" />;
}

const ConcentricCircles = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
    {[1, 2, 3].map((i) => (
      <motion.div
        key={i}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: i * 2, opacity: [0, 0.1, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: i * 0.8, ease: "linear" }}
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
    const timer = setTimeout(() => setIndex(prev => prev + 1), 850);
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
          initial={{ width: 0 }} animate={{ width: "100%" }}
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
      <AnimatePresence>{loading && <Preloader onComplete={() => setLoading(false)} />}</AnimatePresence>
      <LusionBackground />
      <motion.div className="fixed top-0 left-0 right-0 h-[3px] bg-cyan z-[60] origin-left" style={{ scaleX }} />

      <div className="relative z-10">
        {/* Floating Menu */}
        <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 floating-menu px-8 py-4 flex gap-8 items-center border border-white/10 shadow-2xl shadow-cyan/10">
          {["About", "Projects", "Skills", "Sync"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 hover:text-cyan transition-colors">{item}</a>
          ))}
        </nav>

        {/* Hero */}
        <section className="h-screen flex items-center justify-center px-8 relative">
          <ConcentricCircles />
          <div className="text-center z-10">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 1 }}>
                <h2 className="font-mono text-cyan text-sm uppercase tracking-[0.5em] mb-8 block">Software Engineer @ TCS</h2>
                <h1 className="text-[14vw] md:text-[10vw] font-black tracking-tighter leading-none uppercase italic">SMIT<br />KOTAK</h1>
                <div className="mt-12 flex flex-col items-center">
                  <p className="text-white/60 max-w-lg uppercase text-[10px] tracking-[0.4em] leading-loose font-bold">
                    Engineering <span className="text-cyan">High-Throughput</span> Ecosystems<br />
                    Optimizing the Digital Engines of <span className="text-white font-bold">GE Aerospace</span>
                  </p>
                  <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="mt-20 w-[1px] h-20 bg-gradient-to-b from-cyan to-transparent" />
                </div>
              </motion.div>
          </div>
        </section>

        {/* 01 // Origins */}
        <section id="about" className="py-40 px-8 max-w-7xl mx-auto border-t border-white/5">
           <div className="grid md:grid-cols-2 gap-20 items-center">
              <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                 <span className="font-mono text-white/40 text-xs uppercase tracking-[0.5em] mb-4 block">01 // Origins</span>
                 <h2 className="text-4xl font-black tracking-tighter uppercase italic leading-none mb-8 text-cyan">Architect of<br />Stability.</h2>
                 <p className="text-xl text-white/50 leading-relaxed mb-8">
                    Senior Software Developer at <span className="text-white font-bold">Tata Consultancy Services</span>, leading high-impact teams for <span className="text-white font-bold">GE Aerospace</span>. I specialize in <span className="text-cyan font-bold uppercase tracking-wide">developing clean, robust and secure Java applications</span>.
                 </p>
                 <div className="flex gap-12">
                    <div><div className="text-4xl font-black mb-2 text-cyan">3.5+</div><div className="text-[10px] uppercase tracking-widest text-white/30">Years of Exp</div></div>
                    <div><div className="text-4xl font-black mb-2 text-cyan">11</div><div className="text-[10px] uppercase tracking-widest text-white/30">TCS Awards</div></div>
                 </div>
              </motion.div>
              <div className="relative group flex justify-center">
                  <div className="absolute inset-0 bg-cyan blur-[120px] opacity-10 group-hover:opacity-20 transition-opacity" />
                  <img src="/caricature.png" alt="Smit" className="w-80 relative z-10 grayscale hover:grayscale-0 transition-all duration-1000" />
              </div>
           </div>
        </section>

        {/* 02 // Manifesto */}
        <section id="projects" className="py-40 px-8 max-w-7xl mx-auto border-t border-white/5">
          <div className="flex justify-between items-end mb-32">
            <div>
              <span className="font-mono text-white/40 text-xs uppercase tracking-[0.5em] mb-4 block">02 // Manifesto</span>
              <h2 className="text-5xl font-black tracking-tighter uppercase italic leading-none text-cyan">The<br />Manifesto</h2>
            </div>
            <div className="font-mono text-xs text-cyan uppercase tracking-widest mb-4 border-b border-cyan/30 pb-2 whitespace-nowrap">Selected Works [06]</div>
          </div>
          <div className="grid md:grid-cols-2 gap-x-20 gap-y-40">
            <ProjectCard index="01" title="Modernization" subtitle="Spring Boot 3 Migration" desc="Led modernization of 12+ critical production applications for GE Aerospace. Strengthened system resilience." img="/project_modernization.png" />
            <ProjectCard index="02" title="Automation" subtitle="B2B Onboarding" desc="90% productivity gain. Transformed 2 min manual tasks into sub-3 minute batch executions." img="/project_automation.png" className="md:mt-40" />
            <ProjectCard index="03" title="Optimization" subtitle="PDF Generation" desc="87% reduction in processing time. Saving over 90+ hours of manual effort weekly." img="/project_pdf.png" />
            <ProjectCard index="04" title="Scalability" subtitle="Asset Workflow" desc="Reduced settlement turnaround from 2 days to same-day processing with real-time forwarding." img="/project_finance.png" className="md:mt-40" />
            <ProjectCard index="05" title="Performance" subtitle="Server Pagination" desc="Implemented Spring Data JPA Pageable. Reduced API response payload by 70%." img="/project_modernization.png" />
            <ProjectCard index="06" title="Modern Stack" subtitle="Struts to Spring" desc="Spearheaded migration of critical apps to Spring Boot/Angular. Eliminated framework vulnerabilities." img="/project_automation.png" className="md:mt-40" />
          </div>
        </section>

        {/* 03 // Solutions */}
        <section className="py-40 px-8 border-y border-white/5 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto">
            <span className="font-mono text-white/40 text-xs uppercase tracking-[0.5em] mb-4 block">03 // Solutions</span>
            <h2 className="text-5xl font-black tracking-tighter uppercase italic leading-none mb-32 text-cyan">Engineering<br />Logic</h2>
            <div className="grid md:grid-cols-3 gap-24">
               {[
                 { icon: <Code2 />, title: "Lean Implementation", desc: "Acknowledged for automating India Asset Workflow, cutting manual effort by 80%." },
                 { icon: <Shield />, title: "Secure Retrieval", desc: "Engineered multi-layered encryption for secure server-side password management." },
                 { icon: <Terminal />, title: "SOP Development", desc: "Developed troubleshoot standard procedures, resulting in a 20% reduction in tickets." }
               ].map((exp, i) => (
                 <motion.div key={i} whileHover={{ scale: 1.05, y: -10 }} className="p-8 border border-white/10 rounded-2xl bg-[#0a0a0a]/50 hover:border-cyan/50 transition-all group">
                   <div className="text-cyan mb-12 group-hover:scale-110 transition-transform">{exp.icon}</div>
                   <h3 className="text-lg font-bold mb-6 uppercase tracking-widest group-hover:text-cyan transition-colors">{exp.title}</h3>
                   <p className="text-white/40 text-sm leading-relaxed">{exp.desc}</p>
                 </motion.div>
               ))}
            </div>
          </div>
        </section>

        {/* 04 & 05 // Arsenal & Accolades */}
        <section id="skills" className="py-40 px-8 max-w-7xl mx-auto border-t border-white/5">
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            <div className="bg-white/5 rounded-3xl p-12 border border-white/5 flex flex-col h-full">
              <span className="font-mono text-white/40 text-xs uppercase tracking-[0.5em] mb-8 block">04 // The Arsenal</span>
              <h2 className="text-4xl font-black tracking-tighter uppercase leading-none mb-12 text-cyan">Technical Mastery.</h2>
              <div className="space-y-8 flex-1 flex flex-col justify-between">
                <TechItem label="Programming" val="Java (8, 17), TypeScript, JavaScript" />
                <TechItem label="Frameworks" val="Spring Boot (1.x, 2.x, 3.x), Hibernate, Angular, Struts" />
                <TechItem label="Cloud & DevOps" val="AWS, Jenkins, Git/GitHub, CI/CD Pipelines" />
                <TechItem label="Database" val="MySQL, PostgreSQL, SQL" />
                <TechItem label="Tools" val="Swagger, Postman, SonarQube, BuildSmart" />
                <TechItem label="Architecture" val="REST APIs, Microservices, MVC, Gen AI, Lean" />
              </div>
            </div>
            <div className="bg-white/5 rounded-3xl p-12 border border-white/5 h-full flex flex-col justify-between">
               <div>
                 <span className="font-mono text-white/40 text-xs uppercase tracking-[0.5em] mb-8 block">05 // Recognition</span>
                 <h3 className="text-4xl font-black italic uppercase mb-12 text-cyan">Accolades</h3>
               </div>
               <div className="space-y-6 flex-1 flex flex-col justify-between">
                   <AwardItem title="Contextual Masters Award (TCS)" desc="Enterprise-wide Spring Boot 3.x migration across 12+ critical apps." />
                   <AwardItem title="CIO-Level Recognition" desc="Architecting automated PDF service delivering 90+ hours weekly savings." />
                   <AwardItem title="Process Excellence (Lean)" desc="Reducing India Asset turnaround from 2 days to same-day settlement." />
                   <AwardItem title="11X CLAP Awards" desc="On the Spot, Star Team, and Best Team recognition for high-quality delivery." />
                   <AwardItem title="Stakeholder Appreciation" desc="Consistently recognized by Client leadership for technical excellence." />
               </div>
            </div>
          </div>
        </section>

        {/* 06 // Education */}
        <section className="py-20 px-8 border-y border-white/5 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
            <div>
              <span className="font-mono text-white/40 text-xs uppercase tracking-[0.5em] mb-4 block">06 // Origins</span>
              <h2 className="text-4xl font-black tracking-tighter uppercase italic leading-none text-cyan">Education</h2>
            </div>
            <div className="flex-1 max-w-xl text-right md:text-left">
              <div className="text-2xl font-bold uppercase text-white">Masters of Computer Applications</div>
              <div className="text-white/40 uppercase tracking-widest text-xs mt-1">Nirma University, Ahmedabad // CGPA 8.9</div>
            </div>
          </div>
        </section>

        {/* Sync (Footer) */}
        <footer id="contact" className="py-60 px-8 bg-cyan text-black text-center relative overflow-hidden">
           <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
              <h2 className="text-[40vw] font-black italic tracking-tighter select-none">SYNC</h2>
           </div>
           <div className="relative z-10 max-w-6xl mx-auto text-center">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                <h2 className="text-7xl md:text-9xl font-black tracking-tighter mb-20 uppercase italic leading-none">Let's<br />Sync.</h2>
              </motion.div>
              <div className="grid md:grid-cols-2 gap-px bg-black/10 max-w-4xl mx-auto border border-black/10 rounded-2xl overflow-hidden shadow-2xl">
                 <a href="mailto:smitkotak1999@gmail.com" className="group bg-cyan hover:bg-black p-12 transition-all duration-500 flex flex-col items-center justify-center gap-4 border-r border-black/5">
                    <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-black group-hover:text-cyan opacity-60">Professional Inquiry</span>
                    <span className="text-xl md:text-2xl font-bold group-hover:text-cyan break-all">smitkotak1999@gmail.com</span>
                    <div className="w-8 h-px bg-black group-hover:bg-cyan group-hover:w-16 transition-all duration-500" />
                 </a>
                 <a href="https://www.linkedin.com/in/smit-kotak-170804129/" target="_blank" rel="noopener noreferrer" className="group bg-cyan hover:bg-black p-12 transition-all duration-500 flex flex-col items-center justify-center gap-4">
                    <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-black group-hover:text-cyan opacity-60">Network & Social</span>
                    <span className="text-xl md:text-2xl font-bold group-hover:text-cyan">linkedin.com/smit-kotak</span>
                    <div className="w-8 h-px bg-black group-hover:bg-cyan group-hover:w-16 transition-all duration-500" />
                 </a>
              </div>
              <div className="mt-24 space-y-4">
                 <div className="text-[10px] font-mono uppercase tracking-[0.5em] font-black opacity-40">Architecting Stability // Ahmedabad, India</div>
                 <p className="text-[8px] uppercase tracking-[0.6em] font-black opacity-30">Smit Kotak &copy; 2026</p>
              </div>
           </div>
        </footer>
      </div>
    </main>
  );
}

function TechItem({ label, val }: any) {
  return (
    <div className="border-l border-cyan/20 pl-8 group hover:border-cyan transition-colors">
      <div className="text-xs uppercase tracking-[0.5em] text-white/40 mb-2">{label}</div>
      <div className="text-lg font-bold group-hover:text-cyan transition-colors text-white uppercase tracking-widest">{val}</div>
    </div>
  );
}

function AwardItem({ title, desc }: any) {
  return (
    <div className="border-b border-white/5 pb-4 last:border-0 group text-left">
      <div className="text-white font-bold uppercase tracking-widest text-sm mb-1 group-hover:text-cyan transition-colors">{title}</div>
      <p className="text-white/40 text-[10px] uppercase leading-relaxed">{desc}</p>
    </div>
  );
}

function ProjectCard({ index, title, subtitle, desc, img, className }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`group perspective-1000 ${className}`}>
      <div className="relative overflow-hidden aspect-[16/10] bg-[#111] rounded-sm border border-white/5 preserve-3d group-hover:rotate-x-12 group-hover:rotate-y-12 transition-transform duration-700 ease-out shadow-2xl">
        <img src={img} alt={title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-8 left-8">
           <div className="text-xs font-mono text-cyan uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity delay-300">{index}</div>
           <h3 className="text-2xl font-black uppercase italic leading-none group-hover:text-cyan transition-colors">{title}</h3>
        </div>
      </div>
      <div className="mt-8 space-y-4">
        <h4 className="text-lg font-bold uppercase tracking-widest text-cyan">{subtitle}</h4>
        <p className="text-white/50 text-xl max-w-sm leading-relaxed">{desc}</p>
        <div className="w-10 h-[2px] bg-cyan group-hover:w-full transition-all duration-700" />
      </div>
    </motion.div>
  );
}
