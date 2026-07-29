import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDownRight, ArrowUpRight, Code2, Mail, MapPin, Menu, X } from 'lucide-react'
import avatar from './assets/avatar.png'
import './styles.css'

const projects = [
  {
    index: '01',
    title: 'AI 药管家',
    type: 'HEALTHCARE SYSTEM / 2026',
    description: '面向独居 / 空巢老人，构建“提醒—识别—指导—告警”安全用药闭环，并支持家属远程监护。',
    highlights: [
      '负责 React 老人端 / 家属端、Spring Boot 后端与 WebSocket 通知的整体架构和全栈落地。',
      '覆盖 10+ 业务模块，独立编写 20,000+ 行 Java（170 类）。',
      '设计 JWT 双角色权限体系，隔离老人与家属数据边界。',
      '实现 ReminderStage 状态机与每分钟调度，推进提醒、逾期和家属告警流程。',
      '搭建百度 OCR + 阿里云 OSS + 线程池异步处理的识药流水线，并接入 DeepSeek 分层风险分析。',
    ],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=85',
    tags: ['Spring Boot', 'DeepSeek', 'OCR'],
    github: 'https://github.com/sjr666666/aaagame',
    accent: 'mint',
  },
  {
    index: '02',
    title: 'Amazon Growth Platform',
    type: 'COMMERCE INFRASTRUCTURE / 2025',
    description: '参与面向海外商家的推广 / 测评平台建设，完善申请、问卷、审核和商品展示业务流程。',
    highlights: [
      '参与 Spring Boot + MySQL + Redis 核心模块开发。',
      '负责试用申请、问卷提交、返现审核接口与前后端联调。',
      '参与亚马逊商品数据抓取与入库，协助设计业务表结构和 Redis 缓存策略。',
      '基于 RESTful API 参与异常场景联调与接口问题排查。',
    ],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=85',
    tags: ['MySQL', 'Redis', 'REST API'],
    status: 'CLIENT PROJECT',
    accent: 'amber',
  },
]

const strengths = [
  ['01', '从 0 到 1 交付', '不止写接口。能从需求拆解、架构判断到前后端联调，独立推进一个产品落地。'],
  ['02', '后端系统思维', '关注权限边界、状态流转、异步任务、缓存策略和异常兜底，让功能成为系统。'],
  ['03', 'AI 应用落地', '不把模型当黑盒。用规则、OCR、缓存和降级策略，把 AI 能力接进真实业务流程。'],
  ['04', '快速学习与协作', '专业排名前 10%，熟悉 Git / PR 协作，习惯用清晰的接口和文档推动团队。'],
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const revealRef = useRef(null)

  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal')
    let lastScrollY = window.scrollY
    let scrollDirection = 'down'
    const updateDirection = () => {
      const currentY = window.scrollY
      scrollDirection = currentY >= lastScrollY ? 'down' : 'up'
      lastScrollY = currentY
    }
    window.addEventListener('scroll', updateDirection, { passive: true })
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.dataset.direction = scrollDirection
          entry.target.classList.add('is-visible')
        } else if (!entry.target.closest('.hero')) {
          // Reset content after leaving the viewport so it animates again on re-entry.
          entry.target.classList.remove('is-visible')
        }
      })
    }, { threshold: 0.18 })
    nodes.forEach((node) => observer.observe(node))
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', updateDirection)
    }
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell" ref={revealRef}>
      <header className="site-header">
        <a className="brand" href="#top" onClick={closeMenu}><span className="brand-dot" />SJR / 26</a>
        <nav className={menuOpen ? 'main-nav open' : 'main-nav'} aria-label="主导航">
          <a href="#about" onClick={closeMenu}>关于我 <span>01</span></a>
          <a href="#projects" onClick={closeMenu}>项目 <span>02</span></a>
          <a href="#strengths" onClick={closeMenu}>优势 <span>03</span></a>
        </nav>
        <a className="header-contact" href="mailto:itjingrong@qq.com">联系我 <ArrowUpRight size={15} /></a>
        <button className="menu-toggle" aria-label={menuOpen ? '关闭菜单' : '打开菜单'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <main>
        <section className="hero" id="top">
          <video className="hero-video" autoPlay muted loop playsInline poster="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2200&q=80">
            <source src="https://cdn.coverr.co/videos/coverr-a-close-up-of-a-server-1574/1080p.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay" />
          <div className="hero-grid" />
          <div className="hero-signal hero-signal-one" />
          <div className="hero-signal hero-signal-two" />
          <div className="hero-particles" />
          <div className="hero-scanline" />
          <div className="hero-runtime" aria-hidden="true">
            <div className="runtime-topline"><span><i /> RUNTIME CONSOLE</span><b>LIVE  /  01</b></div>
            <div className="runtime-heading"><strong>JAVA 21</strong><span>SPRING BOOT / ONLINE</span></div>
            <div className="runtime-chart">
              <div className="chart-grid" />
              <div className="chart-line chart-line-one" />
              <div className="chart-line chart-line-two" />
              <div className="chart-pulse pulse-one" />
              <div className="chart-pulse pulse-two" />
              <span className="chart-label chart-label-one">WS / 42ms</span>
              <span className="chart-label chart-label-two">API / 99.9%</span>
            </div>
            <div className="runtime-metrics"><span><b>42</b><small>LATENCY / MS</small></span><span><b>99.9</b><small>UPTIME / %</small></span><span><b>10+</b><small>MODULES</small></span></div>
            <div className="runtime-stack"><span>JWT AUTH</span><span>REDIS CACHE</span><span>DEEPSEEK</span></div>
          </div>
          <div className="hero-stats"><div><strong>20K<span>+</span></strong><small>JAVA LINES</small></div><div><strong>10<span>+</span></strong><small>MODULES SHIPPED</small></div><div><strong>170</strong><small>JAVA CLASSES</small></div><div className="hero-live"><i /> LIVE SYSTEM <span>↗</span></div></div>
          <div className="hero-content">
            <p className="kicker reveal">JAVA BACKEND / FULL-STACK DEVELOPER</p>
            <h1 className="hero-title reveal">让复杂系统<br /><em>安静地工作。</em></h1>
            <div className="hero-bottom reveal">
              <p>石敬荣是一名软件工程本科在读开发者，专注 Java 后端、全栈交付与 AI 应用工程。</p>
              <a className="round-link" href="#projects" aria-label="查看项目"><ArrowDownRight size={28} /></a>
            </div>
          </div>
          <div className="hero-meta"><span>SCROLL TO EXPLORE</span><span>深圳 / CHINA</span><span>AVAILABLE NOW</span></div>
        </section>

        <section className="about section" id="about">
          <div className="section-aside reveal"><span className="section-number">01</span><span>PROFILE</span></div>
          <div className="about-main">
            <div className="about-intro reveal"><p className="eyebrow">A builder with system instincts.</p><h2>我喜欢把“能运行”<br /><span>推进到“值得使用”。</span></h2></div>
            <div className="about-details reveal">
              <div className="portrait-frame"><div className="portrait-image-wrap"><img className="portrait-image" src={avatar} alt="石敬荣个人照片" /><div className="portrait-tint" /></div><div className="portrait-orbit orbit-one" /><div className="portrait-orbit orbit-two" /><div className="portrait-id"><strong>石敬荣</strong><span>SJR / JAVA BACKEND</span></div><span className="portrait-label">BUILD / TEST / SHIP</span></div>
              <div className="about-copy"><p>我以 Java 后端开发为主，也能完成 React 前端与 AI 能力接入。最近独立负责 AI 药管家，从架构设计、权限体系、提醒状态机，到 OCR 识药与 DeepSeek 分层分析，完成了一个真实可用的产品闭环。</p><p>我在意代码背后的用户：系统是否清晰、错误是否可控、功能是否真的减少了问题。正在寻找互联网 / AI 方向的后端开发、Java 开发或全栈开发机会。</p><div className="contact-line"><a href="mailto:itjingrong@qq.com"><Mail size={15} /> itjingrong@qq.com</a><span><MapPin size={15} /> 深圳 · 可随时到岗</span></div><div className="toolkit"><span className="toolkit-label">CODING WORKFLOW</span><div className="toolkit-tools"><span>TRAE</span><span>WORKBUDDY</span><span>CODEX</span><span>CLAUDE CODE</span></div><p>熟练使用国内外 AI 编程工具辅助开发、调试与交付。</p></div></div>
            </div>
            <div className="stats reveal"><div><strong>20K<span>+</span></strong><small>JAVA CODE LINES</small></div><div><strong>10<span>+</span></strong><small>BUSINESS MODULES</small></div><div><strong>TOP 10<span>%</span></strong><small>ACADEMIC RANK</small></div><div><strong>170</strong><small>JAVA CLASSES</small></div></div>
          </div>
        </section>

        <section className="projects section" id="projects">
          <div className="section-aside reveal"><span className="section-number">02</span><span>SELECTED WORK</span></div>
          <div className="projects-main"><div className="section-heading reveal"><p className="eyebrow">Systems in the wild</p><h2>精选项目</h2><span className="heading-note">真实业务，真实约束，真实交付。</span></div>
            <div className="project-list">{projects.map((project) => <article className={`project-card ${project.accent} reveal`} key={project.index}><div className="project-visual"><img src={project.image} alt="" /><div className="visual-shade" /><span className="project-index">{project.index}</span>{project.github ? <a className="project-open" href={project.github} target="_blank" rel="noreferrer" aria-label={`在 GitHub 查看${project.title}`}><ArrowUpRight size={21} /></a> : <span className="project-status">{project.status}</span>}<div className="visual-console"><span className="console-dot" /><span>LIVE / {project.index === '01' ? 'MEDICATION_FLOW' : 'GROWTH_PIPELINE'}</span></div></div><div className="project-info"><div><p className="project-type">{project.type}</p><h3>{project.title}</h3><p className="project-description">{project.description}</p></div><div className="project-highlights"><p className="highlight-label">MY CONTRIBUTION</p><ul>{project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></div><div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></article>)}</div>
            <a className="github-link reveal" href="https://github.com/sjr666666/aaagame" target="_blank" rel="noreferrer"><span className="github-icon"><Code2 size={20} /></span><span className="github-copy"><strong>在 GitHub 查看完整项目</strong><small>源码、架构与实现细节</small></span><span className="github-arrow"><ArrowUpRight size={20} /></span></a>
          </div>
        </section>

        <section className="strengths section" id="strengths"><div className="section-aside reveal"><span className="section-number">03</span><span>WHAT I BRING</span></div><div className="strengths-main"><div className="section-heading reveal"><p className="eyebrow">Not just a stack</p><h2>个人优势</h2></div><div className="strength-grid">{strengths.map(([number, title, copy]) => <article className="strength-card reveal" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>

        <section className="closing" id="contact"><div className="closing-noise" /><div className="closing-inner"><p className="eyebrow reveal">Open to meaningful work</p><h2 className="reveal">下一个系统，<br /><em>一起做得更好。</em></h2><a className="closing-email reveal" href="mailto:itjingrong@qq.com">itjingrong@qq.com <ArrowUpRight size={22} /></a><div className="closing-footer reveal"><span>石敬荣 / JAVA BACKEND & FULL-STACK</span><span>© 2026</span><a href="#top">回到顶部 ↑</a></div></div></section>
      </main>
    </div>
  )
}

export default App

createRoot(document.getElementById('root')).render(<App />)
