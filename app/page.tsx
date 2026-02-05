'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<
      "idle" | "loading" | "success" | "error"
    >("idle");
    const [message, setMessage] = useState("");


  useEffect(() => {
    // Page load animation
    document.body.classList.add('loaded')

    // Scroll events
    const handleScroll = () => {
      const navbar = document.getElementById('navbar')
      const scrollTop = document.getElementById('scrollTop')

      if (window.scrollY > 50) {
        navbar?.classList.add('scrolled')
      } else {
        navbar?.classList.remove('scrolled')
      }

      if (window.scrollY > 500) {
        scrollTop?.classList.add('visible')
      } else {
        scrollTop?.classList.remove('visible')
      }

      // Parallax effect
      const heroBg = document.querySelector('.hero-bg-elements') as HTMLElement
      if (heroBg && window.scrollY < 800) {
        heroBg.style.transform = `translateY(${window.scrollY * 0.3}px)`
      }
    }

    // Intersection Observer for animations
    const observerOptions = {
      root: null,
      rootMargin: '-30px 0px -30px 0px',
      threshold: [0, 0.1, 0.2]
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
          requestAnimationFrame(() => {
            entry.target.classList.add('visible')
          })

          // Animate counters
          const counters = entry.target.querySelectorAll('[data-count]')
          counters.forEach(counter => animateCounter(counter as HTMLElement))

          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el)
    })

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  const animateCounter = (el: HTMLElement) => {
    if (el.classList.contains('counted')) return
    el.classList.add('counted')

    const target = parseInt(el.getAttribute('data-count') || '0')
    const suffix = el.getAttribute('data-suffix') || ''
    const prefix = el.getAttribute('data-prefix') || ''
    const duration = 2000
    const step = target / (duration / 16)
    let current = 0

    const updateCounter = () => {
      current += step
      if (current < target) {
        el.textContent = prefix + Math.floor(current) + suffix
        requestAnimationFrame(updateCounter)
      } else {
        el.textContent = prefix + target + suffix
      }
    }
    updateCounter()
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleFaq = (button: HTMLButtonElement) => {
    const faqItem = button.closest('.faq-item')
    const isActive = faqItem?.classList.contains('active')

    document.querySelectorAll('.faq-item.active').forEach(item => {
      item.classList.remove('active')
    })

    if (!isActive) {
      faqItem?.classList.add('active')
    }
  }

   const handleEmailSignup = async (e: FormEvent) => {
     e.preventDefault();
     setStatus("loading");

     try {
       const formData = new FormData();
       formData.append("email_address", email);

       const response = await fetch(
         "https://app.convertkit.com/forms/9049771/subscriptions",
         {
           method: "POST",
           body: formData,
           headers: {
             Accept: "application/json",
           },
         }
       );

       if (response.ok) {
         setStatus("success");
         setMessage("Thanks for joining! Check your inbox.");
         setEmail("");
         setTimeout(() => {
           setStatus("idle");
           setMessage("");
         }, 5000);
       } else {
         setStatus("error");
         setMessage("Something went wrong. Please try again.");
       }
     } catch (error) {
       setStatus("error");
       setMessage("Something went wrong. Please try again.");
     }
   };

  const handleHeroSignup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const email = (form.querySelector('.hero-email-input') as HTMLInputElement).value

    // You can replace this with your actual form submission logic
    console.log('Hero email submitted:', email)

    // Show success message
    const capture = form.closest('.hero-lead-capture') as HTMLElement
    if (capture) {
      capture.innerHTML = '<div class="hero-signup-success"><div class="success-icon">🎉</div><h4>You\'re In!</h4><p>Check your inbox for your consultation booking link. We can\'t wait to help you automate!</p></div>'
    }
  }

  return (
    <>
      {/* Navigation */}
      <nav id="navbar">
        <div className="nav-container">
          <div
            className="logo"
            onClick={scrollToTop}
            style={{ cursor: "pointer" }}
          >
            <span className="logo-text">The AI Capitol</span>
          </div>
          <ul className="nav-links">
            <li>
              <a href="#showcase" className="nav-link">
                Use Cases
              </a>
            </li>
            <li>
              <a href="#scorecard" className="nav-link">
                Assessment
              </a>
            </li>
            <li>
              <a href="#process" className="nav-link">
                How It Works
              </a>
            </li>
          </ul>
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu ${mobileMenuOpen ? "active" : ""}`}
        id="mobileMenu"
      >
        <a href="#showcase" onClick={() => setMobileMenuOpen(false)}>
          Use Cases
        </a>
        <a href="#scorecard" onClick={() => setMobileMenuOpen(false)}>
          Assessment
        </a>
        <a href="#process" onClick={() => setMobileMenuOpen(false)}>
          How It Works
        </a>
        <a
          href="#scorecard"
          onClick={() => setMobileMenuOpen(false)}
          className="btn btn-primary"
          style={{ marginTop: "16px", textAlign: "center" }}
        >
          Free Assessment →
        </a>
      </div>

      <div id="page-home" className="page active">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-bg-elements">
            <div className="floating-shape shape-1"></div>
            <div className="floating-shape shape-2"></div>
            <div className="floating-shape shape-3"></div>
          </div>
          <div className="container">
            <div className="hero-centered animate-hero">
              <span className="hero-eyebrow">
                AI-Powered Business Automation
              </span>
              <h1>
                Automate What Slows You Down.{" "}
                <span className="gradient-text">Scale What Drives Growth.</span>
              </h1>
              <p className="hero-tagline">
                We build custom automation systems using Make, Zapier, and n8n
                so your team can stop drowning in manual tasks and start
                focusing on revenue.
              </p>
              <div className="hero-cta-group">
                <div className="hero-lead-capture">
                  <form className="hero-email-form" onSubmit={handleHeroSignup}>
                    <div className="hero-input-wrap">
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        className="hero-email-input"
                        required
                      />
                      <button type="submit" className="btn btn-primary btn-lg">
                        Join Us Now →
                      </button>
                    </div>
                  </form>
                  <p className="lead-trust">
                    Subscribe Now for Free Consultation
                  </p>
                </div>
              </div>
              <div className="hero-tools animate-on-scroll fade-in">
                <span className="tools-label">Powered by:</span>
                <div className="tools-logos">
                  <div className="tool-badge animate-on-scroll pop delay-1">
                    Make
                  </div>
                  <div className="tool-badge animate-on-scroll pop delay-2">
                    Zapier
                  </div>
                  <div className="tool-badge animate-on-scroll pop delay-3">
                    n8n
                  </div>
                  <div className="tool-badge animate-on-scroll pop delay-4">
                    HubSpot
                  </div>
                  <div className="tool-badge animate-on-scroll pop delay-5">
                    Slack
                  </div>
                  <div className="tool-badge animate-on-scroll pop delay-6">
                    +200 more
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Research & Trends Section */}
        <section className="trends-section" id="trends">
          <div className="container">
            <div className="section-header animate-on-scroll">
              <span className="section-badge">📊 Industry Research</span>
              <h2 className="section-title">
                The Automation Advantage Is Real
              </h2>
              <p className="section-subtitle">
                Companies that automate outperform those that don&apos;t. The
                data is clear.
              </p>
            </div>

            <div className="trends-grid">
              <div className="trend-card animate-on-scroll">
                <div className="trend-stat">
                  <span
                    className="trend-number"
                    data-count="67"
                    data-suffix="%"
                  >
                    0%
                  </span>
                </div>
                <h3>of repetitive tasks</h3>
                <p>
                  can be fully automated with current AI tools—yet most
                  businesses still do them manually.
                </p>
                <cite>McKinsey Global Institute, 2024</cite>
              </div>

              <div className="trend-card animate-on-scroll delay-1">
                <div className="trend-stat">
                  <span
                    className="trend-number"
                    data-count="30"
                    data-suffix="%"
                  >
                    0%
                  </span>
                </div>
                <h3>productivity increase</h3>
                <p>
                  reported by companies that implement AI automation in their
                  first year of adoption.
                </p>
                <cite>Gartner Research, 2024</cite>
              </div>

              <div className="trend-card animate-on-scroll delay-2">
                <div className="trend-stat">
                  <span
                    className="trend-number"
                    data-prefix="$"
                    data-count="127"
                    data-suffix="K"
                  >
                    $0K
                  </span>
                </div>
                <h3>lost per employee annually</h3>
                <p>
                  to manual data entry, copy-paste tasks, and switching between
                  disconnected tools.
                </p>
                <cite>Harvard Business Review, 2023</cite>
              </div>
            </div>

            {/* Pain Points Section */}
            <div className="pain-points-v2 animate-on-scroll">
              <div className="pain-header">
                <span className="pain-badge">⚠️ The Hidden Cost</span>
                <h3>Your Team Is Losing Time Every Single Day</h3>
              </div>
              <div className="pain-content">
                <div className="pain-visual animate-on-scroll pop delay-1">
                  <div className="pain-circle">
                    <div className="pain-circle-inner">
                      <div className="pain-big-number">40%</div>
                      <div className="pain-big-label">of work hours</div>
                    </div>
                  </div>
                </div>
                <div className="pain-items">
                  <div className="pain-item animate-on-scroll from-right delay-1">
                    <div className="pain-icon">⏳</div>
                    <p>Copying data between spreadsheets and CRM</p>
                  </div>
                  <div className="pain-item animate-on-scroll from-right delay-2">
                    <div className="pain-icon">❄️</div>
                    <p>Leads going cold while waiting for follow-up</p>
                  </div>
                  <div className="pain-item animate-on-scroll from-right delay-3">
                    <div className="pain-icon">📊</div>
                    <p>Compiling reports that should take minutes</p>
                  </div>
                  <div className="pain-item animate-on-scroll from-right delay-4">
                    <div className="pain-icon">🔌</div>
                    <p>Switching between tools that don&apos;t connect</p>
                  </div>
                </div>
              </div>
              <div className="pain-cta-section">
                <p className="pain-cta-text">
                  <strong>These are fixable.</strong> Take 3 minutes to find out
                  how much you could save.
                </p>
                <a
                  href="https://form.typeform.com/to/f9AQSbx6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-cta-glow btn-lg"
                >
                  Get Your Free Assessment →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* AI Readiness Scorecard Section */}
        <section className="scorecard-section" id="scorecard">
          <div className="container">
            <div className="scorecard-block animate-on-scroll scale-up">
              <div className="scorecard-glow"></div>
              <div className="scorecard-left">
                <span className="scorecard-eyebrow">🎯 Free Assessment</span>
                <h2>Get Your AI Readiness Score</h2>
                <p className="scorecard-subhead">
                  Take a 3-minute assessment and discover how much time your
                  business could save with automation.
                </p>
                <ul className="scorecard-points">
                  <li>Identify your biggest time-wasters</li>
                  <li>Get your automation readiness score</li>
                  <li>See your top 3 quick-win opportunities</li>
                  <li>Receive a custom action plan</li>
                </ul>
                <div className="scorecard-cta-wrap">
                  <a href="#" className="btn btn-cta-glow btn-lg">
                    Start Free Assessment →
                  </a>
                  <div className="cta-reassurance">
                    <span>✓ No credit card</span>
                    <span>✓ No sales call</span>
                    <span>✓ Instant results</span>
                  </div>
                </div>
              </div>
              <div className="scorecard-right">
                <div className="score-demo premium">
                  <div className="score-ring-wrap">
                    <div className="score-ring">
                      <svg viewBox="0 0 120 120" className="ring-svg">
                        <defs>
                          <linearGradient
                            id="ringGradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop offset="0%" stopColor="#10b981" />
                            <stop offset="100%" stopColor="#06b6d4" />
                          </linearGradient>
                        </defs>
                        <circle cx="60" cy="60" r="54" className="ring-bg" />
                        <circle
                          cx="60"
                          cy="60"
                          r="54"
                          className="ring-progress"
                          stroke="url(#ringGradient)"
                        />
                      </svg>
                      <span className="score-value">73</span>
                    </div>
                    <div className="score-label">Your Score</div>
                  </div>
                  <div className="score-details">
                    <div className="score-item">
                      <span className="dot green"></span> High automation
                      potential
                    </div>
                    <div className="score-item">
                      <span className="dot orange"></span> 3 quick wins
                      identified
                    </div>
                    <div className="score-item">
                      <span className="dot blue"></span> 15+ hours saveable
                      weekly
                    </div>
                  </div>
                  <div className="score-badge">
                    <span className="badge-icon">⚡</span>
                    <span className="badge-text">
                      Sample result from a real assessment
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section" id="showcase">
          <div className="container">
            <div className="section-header animate-on-scroll">
              <span className="section-badge">⚡ Use Cases</span>
              <h2 className="section-title">See Automation In Action</h2>
              <p className="section-subtitle">
                These are real workflows we build for businesses every day. From
                lead follow-up to reporting, see how AI handles the repetitive
                work so your team doesn&apos;t have to.
              </p>
            </div>

            {/* Feature 1 */}
            <div className="feature-row animate-on-scroll from-left">
              <div className="feature-text">
                <span className="feature-tag">Sales</span>
                <h3>• Respond to leads in seconds, not hours</h3>
                <p>
                  When a lead fills out your form, AI instantly qualifies them,
                  sends a personalized follow-up, and books a meeting on your
                  calendar. No more leads going cold while your team catches up.
                </p>
                <div className="feature-stat">
                  <span className="stat-number">60 sec</span>
                  <span className="stat-label">
                    from form submit to meeting booked
                  </span>
                </div>
              </div>
              <div className="feature-visual">
                <div className="visual-mockup">
                  <div className="mockup-header">
                    <span className="mockup-dot"></span>
                    <span className="mockup-dot"></span>
                    <span className="mockup-dot"></span>
                  </div>
                  <div className="mockup-content">
                    <div className="mockup-flow">
                      <div className="flow-item incoming">
                        <span className="flow-label">New Lead</span>
                        <span className="flow-text">Sarah from Acme Corp</span>
                      </div>
                      <div className="flow-arrow">→</div>
                      <div className="flow-item process">
                        <span className="flow-label">AI Qualifies</span>
                        <span className="flow-text">Score: 87/100</span>
                      </div>
                      <div className="flow-arrow">→</div>
                      <div className="flow-item output">
                        <span className="flow-label">Auto-Booked</span>
                        <span className="flow-text">Thu 2:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="feature-row reverse animate-on-scroll from-right">
              <div className="feature-text">
                <span className="feature-tag">Support</span>
                <h3>• Route support tickets with full context</h3>
                <p>
                  AI reads every incoming ticket, identifies the issue, pulls
                  customer history, and routes it to the right person—with all
                  the context they need to resolve it fast.
                </p>
                <div className="feature-stat">
                  <span className="stat-number">3 sec</span>
                  <span className="stat-label">
                    full context ready for your support rep
                  </span>
                </div>
              </div>
              <div className="feature-visual">
                <div className="visual-mockup dark">
                  <div className="mockup-header">
                    <span className="mockup-dot"></span>
                    <span className="mockup-dot"></span>
                    <span className="mockup-dot"></span>
                  </div>
                  <div className="mockup-content">
                    <div className="ticket-demo">
                      <div className="ticket-in">
                        <span className="ticket-label">New Ticket</span>
                        <p>
                          &quot;Can&apos;t access my account. Order #4521&quot;
                        </p>
                      </div>
                      <div className="ticket-analysis">
                        <span className="analysis-title">🤖 AI Analysis</span>
                        <div className="analysis-items">
                          <span>✓ Issue: Password reset</span>
                          <span>✓ Customer: Premium</span>
                          <span>✓ Route: Senior support</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="feature-row animate-on-scroll from-left">
              <div className="feature-text">
                <span className="feature-tag">Operations</span>
                <h3>• Generate reports without lifting a finger</h3>
                <p>
                  AI pulls data from Stripe, HubSpot, and Google Analytics,
                  calculates your KPIs, formats a clean report, and drops it in
                  Slack every Monday at 8am. Your weekly 3-hour reporting task?
                  Gone.
                </p>
                <div className="feature-stat">
                  <span className="stat-number">3 hrs</span>
                  <span className="stat-label">saved every single week</span>
                </div>
              </div>
              <div className="feature-visual">
                <div className="visual-mockup">
                  <div className="mockup-header">
                    <span className="mockup-dot"></span>
                    <span className="mockup-dot"></span>
                    <span className="mockup-dot"></span>
                  </div>
                  <div className="mockup-content report">
                    <div className="report-header">📊 Weekly Report</div>
                    <div className="report-metrics">
                      <div className="metric">
                        <span className="metric-val">$47.2K</span>
                        <span className="metric-label">Revenue</span>
                      </div>
                      <div className="metric">
                        <span className="metric-val">+12%</span>
                        <span className="metric-label">Growth</span>
                      </div>
                      <div className="metric">
                        <span className="metric-val">89</span>
                        <span className="metric-label">NPS</span>
                      </div>
                    </div>
                    <div className="report-status">✓ Sent to #leadership</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="feature-row reverse animate-on-scroll from-right">
              <div className="feature-text">
                <span className="feature-tag">E-Commerce</span>
                <h3>• Keep inventory synced across every channel</h3>
                <p>
                  Sell on Shopify, Amazon, and your website? AI keeps inventory
                  perfectly synced in real-time. No more overselling. No more
                  manual updates. No more angry customers.
                </p>
                <div className="feature-stat">
                  <span className="stat-number">Instant</span>
                  <span className="stat-label">
                    sync across all sales channels
                  </span>
                </div>
              </div>
              <div className="feature-visual">
                <div className="visual-mockup">
                  <div className="mockup-header">
                    <span className="mockup-dot"></span>
                    <span className="mockup-dot"></span>
                    <span className="mockup-dot"></span>
                  </div>
                  <div className="mockup-content sync">
                    <div className="sync-hub">
                      <span className="sync-icon-center">🔄</span>
                    </div>
                    <div className="sync-channels">
                      <div className="channel">
                        🛒 Shopify
                        <span className="channel-count">142 items</span>
                      </div>
                      <div className="channel">
                        📦 Amazon
                        <span className="channel-count">142 items</span>
                      </div>
                      <div className="channel">
                        🌐 Website
                        <span className="channel-count">142 items</span>
                      </div>
                    </div>
                    <div className="sync-status">✓ All synced</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="process-section" id="process">
          <div className="container">
            <div className="section-header animate-on-scroll">
              <span className="section-badge">🚀 Your Journey</span>
              <h2 className="section-title">
                From First Call to Fully Automated
              </h2>
              <p className="section-subtitle">
                A simple process designed to get you results fast.
              </p>
            </div>

            <div className="process-steps">
              <div className="step-card animate-on-scroll">
                <div className="step-num">1</div>
                <h3>Free Strategy Call</h3>
                <p>
                  Share your biggest bottlenecks. We&apos;ll show you
                  what&apos;s possible and outline your roadmap.
                </p>
              </div>
              <div className="step-connector"></div>
              <div className="step-card animate-on-scroll delay-1">
                <div className="step-num">2</div>
                <h3>Custom Blueprint</h3>
                <p>
                  We design automations tailored to your exact workflow. No
                  generic templates.
                </p>
              </div>
              <div className="step-connector"></div>
              <div className="step-card animate-on-scroll delay-2">
                <div className="step-num">3</div>
                <h3>Build & Refine</h3>
                <p>
                  We build, you test. Iterate until it works perfectly for your
                  team.
                </p>
              </div>
              <div className="step-connector"></div>
              <div className="step-card animate-on-scroll delay-3">
                <div className="step-num">4</div>
                <h3>Launch & Scale</h3>
                <p>
                  Go live with full support. Watch your team reclaim hours every
                  week.
                </p>
              </div>
            </div>

            <div className="process-cta animate-on-scroll">
              <a href="#scorecard" className="btn btn-primary btn-lg">
                Start With a Free Assessment →
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section" id="faq">
          <div className="container">
            <div className="section-header animate-on-scroll">
              <span className="section-badge">❓ FAQ</span>
              <h2 className="section-title">Questions We Get Asked</h2>
              <p className="section-subtitle">
                Straight answers about working with us.
              </p>
            </div>

            <div className="faq-grid">
              <div className="faq-item animate-on-scroll scale-up delay-1">
                <button
                  className="faq-question"
                  onClick={(e) => toggleFaq(e.currentTarget)}
                >
                  <span>What kind of tasks can be automated?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>
                    Any repetitive, rule-based task is a candidate. Common
                    examples include: lead qualification and follow-up, data
                    entry between systems, report generation, customer support
                    ticket routing, invoice processing, inventory syncing,
                    appointment scheduling, and email responses. If your team
                    does it the same way every time, we can probably automate
                    it.
                  </p>
                </div>
              </div>

              <div className="faq-item animate-on-scroll scale-up delay-2">
                <button
                  className="faq-question"
                  onClick={(e) => toggleFaq(e.currentTarget)}
                >
                  <span>How long does implementation take?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>
                    Most projects take 4-8 weeks from kickoff to launch. Simple
                    automations (like lead routing or report generation) can be
                    live in 2-3 weeks. More complex multi-system integrations
                    take 6-10 weeks. We&apos;ll give you a realistic timeline
                    during the discovery call based on your specific needs.
                  </p>
                </div>
              </div>

              <div className="faq-item animate-on-scroll scale-up delay-3">
                <button
                  className="faq-question"
                  onClick={(e) => toggleFaq(e.currentTarget)}
                >
                  <span>What tools and platforms do you work with?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>
                    We work with whatever you&apos;re already using. That
                    includes CRMs (HubSpot, Salesforce, Pipedrive),
                    communication tools (Slack, Teams, email), e-commerce
                    platforms (Shopify, WooCommerce), support systems (Zendesk,
                    Intercom), and hundreds of other apps via APIs and
                    automation platforms like Make, Zapier, and n8n.
                  </p>
                </div>
              </div>

              <div className="faq-item animate-on-scroll scale-up delay-4">
                <button
                  className="faq-question"
                  onClick={(e) => toggleFaq(e.currentTarget)}
                >
                  <span>What happens if something breaks?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>
                    Every automation we build includes error handling and
                    monitoring. If something fails, it alerts us (and you, if
                    you want). All projects include 30 days of post-launch
                    support. For ongoing partnerships, you get priority support
                    with SLA guarantees. We also document everything so your
                    team can troubleshoot basic issues.
                  </p>
                </div>
              </div>

              <div className="faq-item animate-on-scroll scale-up delay-5">
                <button
                  className="faq-question"
                  onClick={(e) => toggleFaq(e.currentTarget)}
                >
                  <span>Do I own the automations you build?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>
                    Yes, 100%. Everything we build is yours. We don&apos;t lock
                    you into proprietary systems or charge ongoing fees for
                    access to your own automations. You get full documentation,
                    training, and ownership. If you ever want to part ways, you
                    keep everything.
                  </p>
                </div>
              </div>

              <div className="faq-item animate-on-scroll scale-up delay-6">
                <button
                  className="faq-question"
                  onClick={(e) => toggleFaq(e.currentTarget)}
                >
                  <span>How much does it cost?</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>
                    It depends on scope and complexity. Automation audits start
                    at a fixed fee. Build projects are typically scoped as
                    fixed-price or monthly retainers. We&apos;ll give you a
                    clear quote after the discovery call—no surprises. Most
                    clients see positive ROI within 60 days of launch.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="final-cta">
          <div className="container">
            <div className="cta-block animate-on-scroll pop">
              <h2>Ready to Automate?</h2>
              <p>
                Join our community and get automation tips, case studies, and
                exclusive insights.
              </p>
              <form className="email-signup-form" onSubmit={handleEmailSignup}>
                {status === "success" ? (
                  <div className="signup-success">
                    <span>✓</span> {message}
                  </div>
                ) : (
                  <>
                    <div className="email-input-wrap">
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        className="email-input"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={status === "loading"}
                      />
                      <button
                        type="submit"
                        className="btn btn-cta-glow"
                        disabled={status === "loading"}
                      >
                        {status === "loading" ? "Joining..." : "Join Us Now →"}
                      </button>
                    </div>
                    {status === "error" && (
                      <p
                        style={{
                          color: "#ef4444",
                          marginTop: "12px",
                          fontSize: "14px",
                        }}
                      >
                        {message}
                      </p>
                    )}
                  </>
                )}
              </form>
              <div className="cta-points">
                <span>✓ Free insights</span>
                <span>✓ No spam</span>
                <span>✓ Unsubscribe anytime</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="logo">
                <span className="logo-text">The AI Capitol</span>
              </div>
              <p>
                Your partner in AI-powered business transformation. We turn
                manual workflows into automated systems that save time, reduce
                errors, and scale with you.
              </p>
            </div>
            <div className="footer-column">
              <h4>Explore</h4>
              <ul className="footer-links">
                <li>
                  <a href="#showcase">Use Cases</a>
                </li>
                <li>
                  <a href="#scorecard">AI Assessment</a>
                </li>
                <li>
                  <a href="#process">How It Works</a>
                </li>
                <li>
                  <a href="#">Case Studies</a>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Resources</h4>
              <ul className="footer-links">
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">AI Automation Guide</a>
                </li>
                <li>
                  <a href="#">ROI Calculator</a>
                </li>
                <li>
                  <a href="#">Templates</a>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <ul className="footer-links">
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 The AI Capitol. All rights reserved.</p>
            <div className="footer-social">
              <a href="#">𝕏</a>
              <a href="#">in</a>
              <a href="#">▶</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button className="scroll-top" id="scrollTop" onClick={scrollToTop}>
        ↑
      </button>
    </>
  );
}
