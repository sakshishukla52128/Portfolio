import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import image from './assets/image.png'; // Placeholder image, replace with your own

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showContactForm, setShowContactForm] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [clickedSkill, setClickedSkill] = useState(null);

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Create trail effect
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.left = e.clientX + 'px';
      trail.style.top = e.clientY + 'px';
      document.body.appendChild(trail);
      
      setTimeout(() => {
        trail.remove();
      }, 500);
    };
    
    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      
      // Check if user is near bottom (within 100px)
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        setIsAtBottom(true);
      } else {
        setIsAtBottom(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setMenuOpen(false);
      
      // Open contact form modal when clicking on Contact nav item
      if (sectionId === 'contact') {
        setTimeout(() => setShowContactForm(true), 600);
      }
    }
  };

  const textEnter = () => setIsHovering(true);
  const textLeave = () => setIsHovering(false);

  const handleSkillClick = (skillName) => {
    if (clickedSkill === skillName) {
      setClickedSkill(null); // Hide if already showing
    } else {
      setClickedSkill(skillName); // Show the clicked skill
    }
  };

  const skills = [
    { name: 'React', level: 90, icon: '⚛️', color: '#61DAFB' },
    { name: 'JavaScript', level: 85, icon: '🟡', color: '#F7DF1E' },
    { name: 'Node.js', level: 80, icon: '📗', color: '#68A063' },
    { name: 'Python', level: 75, icon: '🐍', color: '#3776AB' },
    { name: 'CSS/SASS', level: 88, icon: '🎨', color: '#1572B6' },
    { name: 'MongoDB', level: 70, icon: '🍃', color: '#47A248' },
    { name: 'TypeScript', level: 82, icon: '📘', color: '#3178C6' },
    { name: 'Git', level: 85, icon: '🔀', color: '#F05032' },
    { name: 'Express.js', level: 78, icon: '⚡', color: '#000000' },
    { name: 'Tailwind CSS', level: 90, icon: '🌊', color: '#06B6D4' },
    { name: 'Redux', level: 75, icon: '🔄', color: '#764ABC' },
    { name: 'Next.js', level: 80, icon: '▲', color: '#000000' },
    { name: 'Docker', level: 68, icon: '🐳', color: '#2496ED' },
    { name: 'REST APIs', level: 88, icon: '🔌', color: '#4ECDC4' },
    { name: 'SQL', level: 74, icon: '💾', color: '#CC2927' },
    { name: 'AWS', level: 65, icon: '☁️', color: '#FF9900' }
  ];

  const projects = [
    { 
      title: 'E-Commerce Platform', 
      desc: 'Full-stack MERN application with payment integration, user authentication, and admin dashboard', 
      color: '#FF6B6B',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      link: '#'
    },
    { 
      title: 'AI Chat Bot', 
      desc: 'NLP-powered chatbot using Python and TensorFlow with real-time responses', 
      color: '#4ECDC4',
      tags: ['Python', 'TensorFlow', 'NLP', 'Flask'],
      link: '#'
    },
    { 
      title: 'Social Media App', 
      desc: 'Real-time social platform with React and Firebase featuring posts, stories, and messaging', 
      color: '#45B7D1',
      tags: ['React', 'Firebase', 'Real-time DB'],
      link: '#'
    },
    { 
      title: 'Portfolio Website', 
      desc: 'Animated portfolio with Framer Motion featuring smooth transitions and interactions', 
      color: '#FFA07A',
      tags: ['React', 'Framer Motion', 'CSS3'],
      link: '#'
    }
  ];

  const navItems = ['home', 'about', 'skills', 'projects', 'contact'];

  return (
    <div className="App">
      {/* Modern Custom Cursor */}
      <motion.div 
        className="cursor-dot"
        animate={{
          left: mousePosition.x,
          top: mousePosition.y,
          scale: isHovering ? 1.5 : 1
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 30, mass: 0.5 }}
      />
      <motion.div 
        className="cursor-outline"
        animate={{
          left: mousePosition.x,
          top: mousePosition.y,
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? 'rgba(255, 107, 107, 0.8)' : 'rgba(255, 107, 107, 0.5)'
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
      />

      {/* Navigation Bar */}
      <motion.nav 
        className="navbar"
        initial={{ y: -100, x: "-50%" }}
        animate={{ y: 0, x: "-50%" }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="logo"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <div className="logo-shape">
            <span className="logo-letter">S</span>
          </div>
          <span className="logo-text">Portfolio</span>
        </motion.div>

        {/* Hamburger Menu */}
        <motion.div 
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div 
            className="line"
            animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          />
          <motion.div 
            className="line"
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
          />
          <motion.div 
            className="line"
            animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          />
        </motion.div>

        {/* Nav Links */}
        <motion.ul 
          className={`nav-links ${menuOpen ? 'active' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {navItems.map((item, index) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1, color: '#FF6B6B' }}
            >
              <a 
                href={`#${item}`}
                className={activeSection === item ? 'active' : ''}
                onClick={() => scrollToSection(item)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </motion.nav>

      {/* Floating Particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="hero" id="home">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            onMouseEnter={textEnter}
            onMouseLeave={textLeave}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="gradient-text"
            >
              Hi, I'm
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="name gradient-text-alt"
            >
              Sakshi Shukla
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="subtitle"
          >
            <TypewriterText text="Full Stack Developer | UI/UX Designer | Creative Coder" />
          </motion.p>

          <motion.div
            className="cta-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <motion.button
              className="btn-primary"
              whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(255,107,107,0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('projects')}
            >
              View Work
            </motion.button>
            <motion.button
              className="btn-secondary"
              whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(78,205,196,0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowContactForm(true)}
            >
              Contact Me
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-image"
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <motion.div
            className="avatar"
            animate={{
              y: [0, -20, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div 
              className="avatar-ring"
              animate={{
                rotate: 360
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="avatar-ring-2"
              animate={{
                rotate: -360
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="avatar-image-container"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 30px 80px rgba(102, 126, 234, 0.8)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* 
                Replace the placeholder image with your own photo:
                1. Add your image to the 'public' folder (e.g., public/profile.jpg)
                2. Replace src below with: "/profile.jpg"
                OR use an online image URL
              */}
              <img 
                src={image} 
                alt="Profile" 
                className="avatar-image"
              />
              <div className="avatar-overlay"></div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="about-section" id="about">
        <motion.div
          className="about-container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            About Me
          </motion.h2>

          <div className="about-content">
            <motion.div
              className="about-text"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                I'm a passionate Full Stack Developer with expertise in building modern web applications. 
                With a strong foundation in both frontend and backend technologies, I create seamless 
                digital experiences that are both beautiful and functional.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                My journey in web development has equipped me with a diverse skill set, allowing me to 
                tackle complex challenges and deliver innovative solutions. I'm always eager to learn 
                new technologies and stay updated with industry trends.
              </motion.p>
            </motion.div>

            <motion.div
              className="expertise-grid"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {[
                { 
                  icon: 'design', 
                  title: 'UI/UX Design',
                  description: 'Creating beautiful and intuitive user interfaces'
                },
                { 
                  icon: 'code', 
                  title: 'Web Development',
                  description: 'Building responsive and scalable web applications'
                },
                { 
                  icon: 'api', 
                  title: 'API Development',
                  description: 'Building robust and secure RESTful APIs'
                },
                { 
                  icon: 'performance', 
                  title: 'Performance',
                  description: 'Optimizing for speed and efficiency'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="expertise-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -10,
                    boxShadow: "0 20px 40px rgba(138, 43, 226, 0.3)"
                  }}
                >
                  <h3 className="expertise-title">{item.title}</h3>
                  <p className="expertise-desc">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section className="skills-section" id="skills">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title"
        >
          My Skills
        </motion.h2>

        <motion.div 
          className="skills-grid-container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="skill-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                whileHover={{ 
                  y: -8
                }}
                onClick={() => handleSkillClick(skill.name)}
              >
                <motion.div 
                  className="skill-card-icon-container"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: `linear-gradient(135deg, ${skill.color}20, ${skill.color}40)`
                  }}
                >
                  <div className="skill-card-icon">{skill.icon}</div>
                  <div 
                    className="icon-glow" 
                    style={{ 
                      background: `radial-gradient(circle, ${skill.color}60, transparent)` 
                    }}
                  />
                </motion.div>
                
                <motion.h3 
                  className="skill-card-name"
                  animate={{
                    opacity: clickedSkill === skill.name ? 1 : 1
                  }}
                >
                  {skill.name}
                </motion.h3>
                
                <div className="skill-progress-container">
                  <div className="skill-progress-wrapper">
                    <motion.span 
                      className="skill-percentage"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 + 1 }}
                    >
                      {skill.level}%
                    </motion.span>
                  </div>
                  <div className="skill-progress-track">
                    <motion.div 
                      className="skill-progress-bar"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 + 0.3, duration: 1 }}
                    />
                  </div>
                </div>

                {/* Animated background glow */}
                <motion.div className="skill-card-glow" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section className="projects-section" id="projects">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title"
        >
          Featured Projects
        </motion.h2>

        <div className="projects-bento">
          {projects.map((project, index) => {
            const isLarge = index % 3 === 0;
            const deviceType = index % 2 === 0 ? 'browser' : 'mobile';
            
            return (
              <motion.div
                key={project.title}
                className={`project-mockup ${isLarge ? 'large' : ''} ${deviceType}`}
                initial={{ 
                  opacity: 0, 
                  scale: 0.8,
                  rotateX: 20,
                  z: -100
                }}
                whileInView={{ 
                  opacity: 1, 
                  scale: 1,
                  rotateX: 0,
                  z: 0
                }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.15,
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100
                }}
              >
                {/* Device Frame */}
                <motion.div
                  className="device-frame"
                  whileHover={{
                    rotateY: deviceType === 'browser' ? 8 : -8,
                    rotateX: -5,
                    z: 50,
                    scale: 1.02
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Browser/Mobile Top Bar */}
                  <div className="device-bar" style={{ background: project.color }}>
                    {deviceType === 'browser' ? (
                      <>
                        <div className="browser-dots">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                        <div className="address-bar">
                          <span className="lock-icon">🔒</span>
                          <span className="url">{project.title.toLowerCase().replace(/\s+/g, '')}.com</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="mobile-notch" />
                        <div className="mobile-status">
                          <span>9:41</span>
                          <div className="status-icons">📶 📡 🔋</div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Device Screen Content */}
                  <div className="device-screen">
                    {/* Animated Background Gradient */}
                    <motion.div
                      className="screen-gradient"
                      animate={{
                        background: [
                          `linear-gradient(135deg, ${project.color}30 0%, transparent 100%)`,
                          `linear-gradient(225deg, ${project.color}40 0%, transparent 100%)`,
                          `linear-gradient(135deg, ${project.color}30 0%, transparent 100%)`
                        ]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />

                    {/* Floating Icon */}
                    <motion.div
                      className="project-float-icon"
                      animate={{
                        y: [0, -15, 0],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                      style={{ 
                        background: `linear-gradient(135deg, ${project.color}, ${project.color}dd)`,
                        boxShadow: `0 20px 40px ${project.color}60`
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="white" width="40" height="40">
                        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10h2v2H6zm0 4h8v2H6zm10 0h2v2h-2zm0-4h2v2h-2z"/>
                      </svg>
                    </motion.div>

                    {/* Project Info Overlay */}
                    <div className="project-overlay">
                      <h3>{project.title}</h3>
                      <p>{project.desc}</p>
                      
                      {/* Tech Tags with Stagger */}
                      <div className="project-tags-float">
                        {project.tags.map((tag, i) => (
                          <motion.span
                            key={i}
                            className="tag-pill"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 + i * 0.1 }}
                            whileHover={{ 
                              scale: 1.15,
                              backgroundColor: project.color,
                              boxShadow: `0 5px 15px ${project.color}60`
                            }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>

                      {/* View Button */}
                      <motion.button
                        className="view-project-btn"
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: `0 10px 30px ${project.color}80`
                        }}
                        whileTap={{ scale: 0.95 }}
                        style={{ 
                          background: `linear-gradient(135deg, ${project.color}, ${project.color}cc)` 
                        }}
                        onClick={() => window.open(project.link, '_blank')}
                      >
                        <span>Explore</span>
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </motion.button>
                    </div>

                    {/* Particle Effects on Hover */}
                    <div className="screen-particles">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="particle-dot"
                          animate={{
                            y: [-20, -60],
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0.5]
                          }}
                          transition={{
                            duration: 2 + i * 0.5,
                            repeat: Infinity,
                            delay: i * 0.4
                          }}
                          style={{ 
                            left: `${30 + i * 25}%`,
                            background: project.color
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Device Shadow */}
                  <motion.div
                    className="device-shadow"
                    animate={{
                      opacity: [0.3, 0.5, 0.3],
                      scale: [0.95, 1, 0.95]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" id="contact">
        <motion.div
          className="contact-content"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="contact-title"
          >
            Let's Work Together!
          </motion.h2>

          <motion.p className="contact-subtitle">
            Have a project in mind? Let's create something amazing together!
          </motion.p>

          <motion.button
            className="btn-contact-main"
            whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(255,107,107,0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowContactForm(true)}
          >
            Get In Touch
          </motion.button>

          <motion.div className="social-icons">
            {[
              { 
                icon: <svg viewBox="0 0 24 24" fill="currentColor" width="35" height="35">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>, 
                label: 'LinkedIn', 
                link: '#',
                color: '#0077b5'
              },
              { 
                icon: <svg viewBox="0 0 24 24" fill="currentColor" width="35" height="35">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                </svg>, 
                label: 'GitHub', 
                link: '#',
                color: '#333'
              },
              { 
                icon: <svg viewBox="0 0 24 24" fill="currentColor" width="35" height="35">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>, 
                label: 'Email', 
                link: 'mailto:your@email.com',
                color: '#ea4335'
              },
              { 
                icon: <svg viewBox="0 0 24 24" fill="currentColor" width="35" height="35">
                  <path d="M22.46 6c-.85.38-1.78.64-2.75.76 1-.6 1.76-1.55 2.12-2.68-.93.55-1.96.95-3.06 1.17-.88-.94-2.13-1.53-3.51-1.53-2.66 0-4.81 2.16-4.81 4.81 0 .38.04.75.13 1.1-4-.2-7.54-2.12-9.91-5.04-.42.72-.66 1.55-.66 2.44 0 1.67.85 3.14 2.14 4-.79-.03-1.53-.24-2.18-.61v.06c0 2.33 1.66 4.28 3.86 4.72-.4.11-.83.17-1.27.17-.31 0-.62-.03-.92-.08.62 1.94 2.42 3.35 4.55 3.39-1.67 1.31-3.77 2.09-6.05 2.09-.39 0-.78-.02-1.17-.07 2.18 1.4 4.76 2.21 7.54 2.21 9.05 0 14-7.5 14-14 0-.21 0-.42-.02-.63.96-.69 1.8-1.56 2.46-2.55z"/>
                </svg>, 
                label: 'Twitter', 
                link: '#',
                color: '#1da1f2'
              }
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                whileHover={{ 
                  scale: 1.25, 
                  rotate: [0, -10, 10, -10, 0],
                  backgroundColor: social.color,
                  boxShadow: `0 10px 30px ${social.color}60`
                }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.1,
                  hover: { duration: 0.4 }
                }}
                title={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {showContactForm && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowContactForm(false)}
          >
            <motion.div
              className="contact-form-modal"
              initial={{ scale: 0.5, rotateY: -180, opacity: 0 }}
              animate={{ scale: 1, rotateY: 0, opacity: 1 }}
              exit={{ scale: 0.5, rotateY: 180, opacity: 0 }}
              transition={{ type: "spring", duration: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                className="close-btn"
                onClick={() => setShowContactForm(false)}
                whileHover={{ rotate: 90, scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>

              <motion.h2
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="form-title"
              >
                Send Me a Message
              </motion.h2>

              <form className="contact-form">
                <motion.div
                  className="form-group"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.input
                    type="text"
                    placeholder="Your Name"
                    className="form-input"
                    whileFocus={{ scale: 1.02, borderColor: '#FF6B6B' }}
                  />
                </motion.div>

                <motion.div
                  className="form-group"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.input
                    type="email"
                    placeholder="Your Email"
                    className="form-input"
                    whileFocus={{ scale: 1.02, borderColor: '#FF6B6B' }}
                  />
                </motion.div>

                <motion.div
                  className="form-group"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.input
                    type="text"
                    placeholder="Subject"
                    className="form-input"
                    whileFocus={{ scale: 1.02, borderColor: '#FF6B6B' }}
                  />
                </motion.div>

                <motion.div
                  className="form-group"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.textarea
                    placeholder="Your Message"
                    className="form-input"
                    rows="5"
                    whileFocus={{ scale: 1.02, borderColor: '#FF6B6B' }}
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  className="submit-btn"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 30px rgba(255,107,107,0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Message 🚀
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Indicator */}
      {!isAtBottom && (
        <motion.div
          className="scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <span>Scroll</span>
          <div className="arrow">↓</div>
        </motion.div>
      )}

      {/* SVG Definitions for Gradients */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ECDC4" />
            <stop offset="50%" stopColor="#FF6B6B" />
            <stop offset="100%" stopColor="#FFD93D" />
          </linearGradient>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4ECDC4" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#FF6B6B" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#4ECDC4" stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// Typewriter Component
function TypewriterText({ text }) {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[index]);
        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return <span>{displayText}</span>;
}

export default App;
