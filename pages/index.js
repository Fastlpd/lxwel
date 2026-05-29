import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [form, setForm] = useState({ name: '', email: '', message: '', type: 'Bundle enquiry' })
  const [status, setStatus] = useState(null) // null | 'sending' | 'sent' | 'error'

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const d = await r.json()
      if (d.success) { setStatus('sent'); setForm({ name: '', email: '', message: '', type: 'Bundle enquiry' }) }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <>
      <Head>
        <title>Lxwel — The Content Starter Bundle</title>
        <meta name="description" content="Three tools for Nigerian creators. 30-Day Calendar, Daily Journal, Content Build Guide. ₦7,500 instant download." />
        <meta property="og:title" content="Lxwel — The Content Starter Bundle" />
        <meta property="og:description" content="Built for Nigerian businessmen and working class builders. Post consistently. Sell confidently." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Cinzel:wght@400;500&family=DM+Mono:wght@300;400&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        :root {
          --black: #06050A;
          --warm: #F5EDD8;
          --gold: #C9A84C;
          --gold2: #E2C06A;
          --muted: rgba(245,237,216,0.4);
          --border: rgba(201,168,76,0.2);
          --glass: rgba(201,168,76,0.06);
          --serif: 'Cormorant Garamond', serif;
          --caps: 'Cinzel', serif;
          --mono: 'DM Mono', monospace;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: var(--black); color: var(--warm); font-family: var(--serif); overflow-x: hidden; }

        /* TICKER */
        .ticker { border-bottom: 1px solid var(--border); overflow: hidden; padding: 10px 0; }
        .ticker-track { display: flex; width: max-content; animation: tick 28s linear infinite; }
        .ticker-item { font-family: var(--mono); font-size: 10px; letter-spacing: .2em; color: var(--gold); text-transform: uppercase; padding: 0 3rem; white-space: nowrap; }
        @keyframes tick { from { transform: translateX(0) } to { transform: translateX(-50%) } }

        /* NAV */
        nav { display: flex; align-items: center; justify-content: space-between; padding: 1.5rem 4rem; border-bottom: 1px solid var(--border); }
        .nav-logo { font-family: var(--caps); font-size: 1.4rem; color: var(--warm); }
        .nav-logo span { color: var(--gold); }
        .nav-right { font-family: var(--mono); font-size: 9px; letter-spacing: .14em; color: var(--muted); text-transform: uppercase; }
        .nav-cta { background: var(--gold); color: var(--black); text-decoration: none; font-family: var(--mono); font-size: 9px; letter-spacing: .14em; text-transform: uppercase; padding: 8px 18px; transition: background .2s; }
        .nav-cta:hover { background: var(--gold2); }

        /* HERO */
        .hero { min-height: 92vh; display: flex; flex-direction: column; justify-content: center; padding: 6rem 4rem 4rem; position: relative; overflow: hidden; }
        .hero-glow { position: absolute; border-radius: 50%; pointer-events: none; }
        .g1 { width: 600px; height: 600px; background: radial-gradient(circle, rgba(201,168,76,.08) 0%, transparent 65%); top: -120px; right: -80px; }
        .g2 { width: 400px; height: 400px; background: radial-gradient(circle, rgba(201,168,76,.04) 0%, transparent 70%); bottom: 0; left: 8%; }
        .eyebrow { font-family: var(--mono); font-size: 10px; letter-spacing: .22em; color: var(--gold); text-transform: uppercase; margin-bottom: 2rem; display: flex; align-items: center; gap: 12px; }
        .eyebrow::before { content: ''; display: block; width: 30px; height: 1px; background: var(--gold); }
        h1 { font-family: var(--serif); font-size: clamp(3rem, 8vw, 7rem); font-weight: 300; line-height: 1.02; letter-spacing: -.02em; max-width: 800px; }
        h1 em { font-style: italic; color: var(--gold); }
        .hero-sub { font-size: 1.05rem; color: var(--muted); max-width: 480px; line-height: 1.8; margin-top: 1.8rem; }
        .hero-btns { display: flex; align-items: center; gap: 1.4rem; margin-top: 3rem; flex-wrap: wrap; }
        .btn-gold { background: var(--gold); color: var(--black); text-decoration: none; font-family: var(--mono); font-size: 11px; font-weight: 400; letter-spacing: .1em; padding: 1rem 2.5rem; text-transform: uppercase; transition: background .2s; }
        .btn-gold:hover { background: var(--gold2); }
        .btn-ghost { font-family: var(--mono); font-size: 10px; letter-spacing: .14em; color: var(--muted); text-decoration: none; text-transform: uppercase; transition: color .2s; }
        .btn-ghost:hover { color: var(--warm); }
        .hero-note { font-family: var(--mono); font-size: 9px; color: rgba(201,168,76,.35); letter-spacing: .12em; margin-top: 1.2rem; }

        /* DIVIDER */
        .divider { border: none; border-top: 1px solid var(--border); }
        .rule { display: flex; align-items: center; gap: 10px; }
        .rl { flex: 1; height: 1px; background: linear-gradient(to right, transparent, rgba(201,168,76,.4), transparent); }
        .rd { width: 5px; height: 5px; background: var(--gold); transform: rotate(45deg); flex-shrink: 0; }

        /* FOR WHO */
        .forwho { display: grid; grid-template-columns: 1fr 1fr; border-bottom: 1px solid var(--border); }
        .fw { padding: 4rem; }
        .fw:first-child { border-right: 1px solid var(--border); }
        .fw-tag { font-family: var(--mono); font-size: 9px; letter-spacing: .2em; color: var(--gold); text-transform: uppercase; margin-bottom: 1.4rem; }
        .fw-h { font-family: var(--serif); font-size: clamp(1.6rem, 3vw, 2.4rem); font-weight: 300; line-height: 1.15; margin-bottom: 1rem; }
        .fw-h em { font-style: italic; color: var(--gold); }
        .fw-p { font-size: .88rem; color: var(--muted); line-height: 1.8; margin-bottom: 2rem; }
        .sched { border: 1px solid var(--border); background: var(--glass); padding: 1.2rem 1.4rem; }
        .sched-title { font-family: var(--mono); font-size: 9px; letter-spacing: .14em; color: var(--gold); text-transform: uppercase; margin-bottom: 1rem; }
        .sched-row { display: flex; gap: 1rem; padding: .5rem 0; border-bottom: 1px solid rgba(201,168,76,.07); font-size: .78rem; }
        .sched-row:last-child { border-bottom: none; }
        .sched-time { font-family: var(--mono); font-size: 9px; color: var(--gold); min-width: 72px; flex-shrink: 0; }
        .sched-text { color: var(--muted); line-height: 1.5; }

        /* INSIDE */
        .inside { padding: 6rem 4rem; border-bottom: 1px solid var(--border); }
        .sec-eye { font-family: var(--mono); font-size: 9px; letter-spacing: .2em; color: var(--gold); text-transform: uppercase; margin-bottom: 1.2rem; display: flex; align-items: center; gap: 10px; }
        .sec-eye::before { content: ''; width: 22px; height: 1px; background: var(--gold); }
        .sec-h { font-family: var(--serif); font-size: clamp(2rem, 5vw, 3.6rem); font-weight: 300; line-height: 1.08; margin-bottom: 3rem; }
        .sec-h em { font-style: italic; color: var(--gold); }
        .docs { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); }
        .doc { background: var(--black); padding: 2.2rem; transition: background .3s; position: relative; overflow: hidden; }
        .doc::after { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(to right, transparent, var(--gold), transparent); transform: scaleX(0); transition: transform .4s; }
        .doc:hover { background: var(--glass); }
        .doc:hover::after { transform: scaleX(1); }
        .doc-n { font-family: var(--mono); font-size: 9px; color: var(--gold); letter-spacing: .14em; margin-bottom: 1rem; }
        .doc-t { font-family: var(--serif); font-size: 1.25rem; font-weight: 300; margin-bottom: .8rem; line-height: 1.25; }
        .doc-d { font-size: .8rem; color: var(--muted); line-height: 1.7; margin-bottom: 1.2rem; }
        .doc-ul { list-style: none; display: flex; flex-direction: column; gap: .4rem; }
        .doc-ul li { font-size: .76rem; color: rgba(245,237,216,.45); display: flex; gap: 8px; line-height: 1.4; }
        .doc-ul li::before { content: '—'; color: var(--gold); flex-shrink: 0; }

        /* QUOTE */
        .quote-sec { padding: 7rem 4rem; border-bottom: 1px solid var(--border); text-align: center; }
        .qm { font-family: var(--serif); font-size: 8rem; color: rgba(201,168,76,.2); line-height: .7; margin-bottom: .5rem; }
        .qt { font-family: var(--serif); font-style: italic; font-size: clamp(1.4rem, 3vw, 2.2rem); font-weight: 300; line-height: 1.45; max-width: 740px; margin: 0 auto 1.5rem; }
        .qa { font-family: var(--mono); font-size: 9px; letter-spacing: .18em; color: var(--muted); text-transform: uppercase; }

        /* PRICING */
        .pricing { padding: 6rem 4rem; border-bottom: 1px solid var(--border); display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: center; }
        .price-p { font-size: .88rem; color: var(--muted); line-height: 1.85; margin: 1rem 0 0; }
        .pcard { border: 1px solid rgba(201,168,76,.35); padding: 3rem; position: relative; overflow: hidden; }
        .pcard::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at top left, rgba(201,168,76,.06), transparent 55%); pointer-events: none; }
        .pc-top { display: flex; align-items: baseline; gap: .7rem; margin-bottom: .4rem; flex-wrap: wrap; }
        .pc-price { font-family: var(--serif); font-size: 4.2rem; font-weight: 300; line-height: 1; }
        .pc-sym { font-family: var(--serif); font-size: 1.6rem; color: var(--gold); align-self: flex-start; margin-top: .5rem; }
        .pc-was { font-size: .9rem; color: var(--muted); text-decoration: line-through; align-self: center; }
        .pc-badge { font-family: var(--mono); font-size: 9px; letter-spacing: .1em; color: var(--black); background: var(--gold); padding: 3px 10px; text-transform: uppercase; }
        .pc-name { font-family: var(--serif); font-size: 1.05rem; font-weight: 300; margin-bottom: 1.5rem; }
        .pc-ul { list-style: none; display: flex; flex-direction: column; gap: .6rem; border-top: 1px solid var(--border); padding-top: 1.5rem; margin-bottom: 2rem; }
        .pc-ul li { font-size: .8rem; color: rgba(245,237,216,.55); display: flex; gap: 10px; line-height: 1.45; }
        .pc-ul li::before { content: '—'; color: var(--gold); flex-shrink: 0; }
        .pc-btn { display: block; background: var(--gold); color: var(--black); text-decoration: none; text-align: center; font-family: var(--mono); font-size: 11px; letter-spacing: .1em; text-transform: uppercase; padding: 1.05rem; transition: background .2s; }
        .pc-btn:hover { background: var(--gold2); }
        .pc-note { font-family: var(--mono); font-size: 9px; color: var(--muted); letter-spacing: .1em; text-align: center; margin-top: .8rem; }

        /* AFFIRMATIONS */
        .affirmations { padding: 6rem 4rem; border-bottom: 1px solid var(--border); }
        .aff-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--border); margin-top: 3rem; }
        .aff { background: var(--black); padding: 2.2rem; transition: background .25s; }
        .aff:hover { background: var(--glass); }
        .aff::before { content: '\201C'; font-family: var(--serif); font-size: 3.5rem; color: rgba(201,168,76,.2); line-height: .8; display: block; margin-bottom: .6rem; }
        .aff-t { font-family: var(--serif); font-style: italic; font-size: .95rem; line-height: 1.7; color: rgba(245,237,216,.65); }

        /* CONTACT */
        .contact { padding: 6rem 4rem; border-bottom: 1px solid var(--border); display: grid; grid-template-columns: 1fr 1.2fr; gap: 6rem; align-items: start; }
        .contact-info-title { font-family: var(--serif); font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 300; line-height: 1.1; margin-bottom: 1rem; }
        .contact-info-title em { font-style: italic; color: var(--gold); }
        .contact-p { font-size: .88rem; color: var(--muted); line-height: 1.8; margin-bottom: 2rem; }
        .contact-details { display: flex; flex-direction: column; gap: 12px; }
        .contact-detail { display: flex; gap: 12px; align-items: flex-start; }
        .cd-label { font-family: var(--mono); font-size: 9px; letter-spacing: .14em; color: var(--gold); text-transform: uppercase; min-width: 52px; margin-top: 2px; }
        .cd-val { font-size: .85rem; color: rgba(245,237,216,.65); }
        .form { display: flex; flex-direction: column; gap: 16px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .form input, .form textarea, .form select {
          width: 100%; background: transparent; border: 1px solid var(--border); color: var(--warm);
          font-family: var(--serif); font-size: 14px; padding: 12px 14px;
          outline: none; transition: border-color .2s;
          -webkit-appearance: none;
        }
        .form input:focus, .form textarea:focus, .form select:focus { border-color: rgba(201,168,76,.6); }
        .form input::placeholder, .form textarea::placeholder { color: var(--muted); }
        .form select option { background: #1a1610; color: var(--warm); }
        .form textarea { resize: vertical; min-height: 130px; }
        .form-label { font-family: var(--mono); font-size: 9px; letter-spacing: .14em; color: var(--gold); text-transform: uppercase; margin-bottom: 5px; display: block; }
        .form-btn { background: var(--gold); color: var(--black); border: none; font-family: var(--mono); font-size: 11px; letter-spacing: .12em; text-transform: uppercase; padding: 1rem 2rem; cursor: pointer; transition: background .2s; width: 100%; }
        .form-btn:hover:not(:disabled) { background: var(--gold2); }
        .form-btn:disabled { opacity: .6; cursor: not-allowed; }
        .form-status { font-family: var(--mono); font-size: 10px; letter-spacing: .1em; text-align: center; padding: 10px; }
        .form-status.sent { color: #6DD4A3; background: rgba(109,212,163,.08); border: 1px solid rgba(109,212,163,.2); }
        .form-status.error { color: #E88A7A; background: rgba(232,138,122,.08); border: 1px solid rgba(232,138,122,.2); }

        /* FAQ */
        .faq-sec { padding: 5rem 4rem; border-bottom: 1px solid var(--border); max-width: 740px; }
        .faq-h { font-family: var(--serif); font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 300; margin-bottom: 2.5rem; }
        .faq-item { border-bottom: 1px solid var(--border); cursor: pointer; }
        .faq-q { display: flex; justify-content: space-between; align-items: center; gap: 1rem; padding: 1.2rem 0; font-size: .88rem; color: rgba(245,237,216,.75); }
        .faq-icon { font-family: var(--serif); font-size: 1.5rem; color: var(--gold); flex-shrink: 0; transition: transform .25s; line-height: 1; }
        .faq-item.open .faq-icon { transform: rotate(45deg); }
        .faq-a { font-size: .8rem; color: var(--muted); line-height: 1.8; max-height: 0; overflow: hidden; transition: max-height .35s ease, padding .25s; }
        .faq-item.open .faq-a { max-height: 300px; padding-bottom: 1.2rem; }

        /* CLOSER */
        .closer { padding: 9rem 4rem; text-align: center; position: relative; overflow: hidden; }
        .closer h2 { font-family: var(--serif); font-size: clamp(2.6rem, 7vw, 6rem); font-weight: 300; line-height: 1.04; letter-spacing: -.02em; max-width: 780px; margin: 0 auto 1.5rem; }
        .closer h2 em { font-style: italic; color: var(--gold); }
        .closer-sub { font-size: .88rem; color: var(--muted); margin: 0 auto 3rem; max-width: 420px; line-height: 1.8; }
        .closer-cta { display: inline-block; background: var(--gold); color: var(--black); text-decoration: none; font-family: var(--mono); font-size: 11px; letter-spacing: .12em; text-transform: uppercase; padding: 1.1rem 3rem; transition: background .2s; }
        .closer-cta:hover { background: var(--gold2); }

        /* FOOTER */
        footer { border-top: 1px solid var(--border); padding: 2rem 4rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
        .foot-logo { font-family: var(--caps); font-size: 1rem; color: var(--muted); }
        .foot-logo span { color: var(--gold); }
        .foot-info { font-family: var(--mono); font-size: 9px; letter-spacing: .12em; color: rgba(201,168,76,.3); text-transform: uppercase; }

        @media (max-width: 768px) {
          nav, footer { padding: 1.2rem 1.5rem; }
          .hero, .inside, .pricing, .affirmations, .contact, .faq-sec, .closer, .quote-sec { padding-left: 1.5rem; padding-right: 1.5rem; }
          .forwho, .docs, .aff-grid, .pricing, .contact { grid-template-columns: 1fr; }
          .fw:first-child { border-right: none; border-bottom: 1px solid var(--border); }
          .fw { padding: 2.5rem 1.5rem; }
          .pricing, .contact { gap: 3rem; }
          .form-row { grid-template-columns: 1fr; }
          .nav-right { display: none; }
        }
      `}</style>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-track">
          {['The Lxwel Content Starter Bundle', 'By Lawrence K', 'Built for Nigerian Creators', '₦7,500 · Instant Download', 'Businessman · Working Class · Builder', 'Instagram · TikTok · Telegram',
            'The Lxwel Content Starter Bundle', 'By Lawrence K', 'Built for Nigerian Creators', '₦7,500 · Instant Download', 'Businessman · Working Class · Builder', 'Instagram · TikTok · Telegram'
          ].map((t,i) => <span key={i} className="ticker-item">{t}</span>)}
        </div>
      </div>

      {/* NAV */}
      <nav>
        <div className="nav-logo">Lx<span>wel</span></div>
        <div className="nav-right">Lawrence K · laxwellremzy50@gmail.com</div>
        <a href="#pricing" className="nav-cta">Get the bundle — ₦7,500</a>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-glow g1" /><div className="hero-glow g2" />
        <div className="eyebrow">The Content Starter Bundle</div>
        <h1>Your content.<br /><em>Finally</em> has<br />a system.</h1>
        <p className="hero-sub">Three tools built for Nigerian creators — the businessman building authority and the worker building freedom. One bundle. One price.</p>
        <div className="hero-btns">
          <a href="#pricing" className="btn-gold">Get the bundle — ₦7,500</a>
          <a href="#inside" className="btn-ghost">See what's inside →</a>
        </div>
        <div className="hero-note">Instant download via Selar · selar.co/lxwel · laxwellremzy50@gmail.com</div>
      </section>

      <hr className="divider" />

      {/* FOR WHO */}
      <section className="forwho">
        <div className="fw">
          <div className="fw-tag">Type A</div>
          <h2 className="fw-h">The Nigerian<br /><em>Businessman</em></h2>
          <p className="fw-p">You run something. A business, a hustle, a vision. You post to build authority and attract serious clients. This system respects your time.</p>
          <div className="sched">
            <div className="sched-title">Your posting windows</div>
            <div className="sched-row"><div className="sched-time">7:30am</div><div className="sched-text">Instagram carousel — catches decision makers before their day fills up</div></div>
            <div className="sched-row"><div className="sched-time">12:00pm</div><div className="sched-text">TikTok — lunch scroll, relaxed mindset, high engagement</div></div>
            <div className="sched-row"><div className="sched-time">8:30pm</div><div className="sched-text">Instagram Reels — peak Nigerian IG time, algorithm rewards you here</div></div>
            <div className="sched-row"><div className="sched-time">6:00pm Sun</div><div className="sched-text">Telegram — weekly reflection and soft sell</div></div>
          </div>
        </div>
        <div className="fw">
          <div className="fw-tag">Type B</div>
          <h2 className="fw-h">The Working Class<br /><em>Builder</em></h2>
          <p className="fw-p">You have a job and a dream at the same time. You build in the margins — before the commute, at lunch, after traffic and NEPA. Your content is your exit plan.</p>
          <div className="sched">
            <div className="sched-title">Your posting windows</div>
            <div className="sched-row"><div className="sched-time">5:30–7am</div><div className="sched-text">Instagram — quiet, focused, post goes live while you commute</div></div>
            <div className="sched-row"><div className="sched-time">12:30pm</div><div className="sched-text">TikTok — record and post at lunch, workers scroll heavily here</div></div>
            <div className="sched-row"><div className="sched-time">6:30pm</div><div className="sched-text">Instagram Reels — after work, after traffic, people are home scrolling</div></div>
            <div className="sched-row"><div className="sched-time">9:00pm</div><div className="sched-text">Telegram — final check before bed, messages read overnight</div></div>
          </div>
        </div>
      </section>

      {/* INSIDE */}
      <section className="inside" id="inside">
        <div className="sec-eye">What's inside</div>
        <h2 className="sec-h">Three tools.<br /><em>One complete system.</em></h2>
        <div className="docs">
          {[
            { n: '01', t: '30-Day Content Calendar Kit', d: 'A complete month of content — mapped, structured, ready. Open it. Post.', items: ['30 daily posting prompts', '30 caption frameworks', '15 viral hook starters', '5-type content cycle', 'Status tracker', 'Notion + PDF'] },
            { n: '02', t: 'Daily Journal Template', d: '10-minute daily operating system for Type A and Type B creators.', items: ['Type A + B daily templates', 'Exact posting time slots', 'Weekly + monthly reviews', 'DM and outreach tracker', 'Sales tracker', 'Content idea bank'] },
            { n: '03', t: 'Day-by-Day Content Build Guide', d: 'How to create every day without burning out or running out of ideas.', items: ['Type A 30-day plan', 'Type B 30-day plan', 'Genuine posting method', '20-minute content process', 'Soft sell 4:1 framework', '30-day checklist'] }
          ].map(doc => (
            <div key={doc.n} className="doc">
              <div className="doc-n">Document {doc.n} —</div>
              <div className="doc-t">{doc.t}</div>
              <p className="doc-d">{doc.d}</p>
              <ul className="doc-ul">{doc.items.map(i => <li key={i}>{i}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      {/* QUOTE */}
      <section className="quote-sec">
        <div className="qm">"</div>
        <p className="qt">History does not remember the people who waited for the perfect moment. It remembers the ones who created in the middle of the uncertainty.</p>
        <div className="qa">— From the Lxwel Daily Journal · By Lawrence K</div>
      </section>

      {/* PRICING */}
      <section className="pricing" id="pricing">
        <div>
          <div className="sec-eye">Pricing</div>
          <h2 className="sec-h" style={{fontSize:'clamp(1.8rem,4vw,3.2rem)',marginBottom:0}}>One payment.<br /><em>Infinite months</em><br />of content.</h2>
          <p className="price-p">Priced at ₦7,500 — less than a full meal out — because good systems should be accessible to every Nigerian creator who is serious about building something. Price rises after 50 sales.</p>
        </div>
        <div>
          <div className="pcard">
            <div className="pc-top">
              <span className="pc-sym">₦</span><span className="pc-price">7,500</span>
              <span className="pc-was">₦15,000</span><span className="pc-badge">Launch price</span>
            </div>
            <div className="pc-name">The Lxwel Content Starter Bundle</div>
            <ul className="pc-ul">
              <li>30-Day Content Calendar Kit (Notion + PDF)</li>
              <li>Daily Journal — Type A + Type B templates</li>
              <li>Day-by-Day Content Build Guide</li>
              <li>Exact posting windows for IG, TikTok, Telegram</li>
              <li>DM tracker, sales tracker, idea bank</li>
              <li>Historical affirmations + 30-day checklist</li>
            </ul>
            <a href="https://selar.co/lxwel" className="pc-btn" target="_blank" rel="noreferrer">Get instant access — ₦7,500 →</a>
            <div className="pc-note">Secure checkout · Selar · Instant download · laxwellremzy50@gmail.com</div>
          </div>
        </div>
      </section>

      {/* AFFIRMATIONS */}
      <section className="affirmations">
        <div className="sec-eye">From the journal</div>
        <h2 className="sec-h" style={{maxWidth:'580px'}}>Words that bond<br />the soul to the <em>work</em></h2>
        <div className="aff-grid">
          {[
            'Every empire you admire began as a single person who refused to stop on the day it mattered most.',
            'You were not given this vision to watch someone else build it. The idea found you because you are the right person to carry it.',
            'The version of you that succeeds is not smarter or more gifted. They simply did not quit during the season when quitting felt reasonable.',
            'The world will one day read what you are writing right now and call it the beginning.'
          ].map((t,i) => <div key={i} className="aff"><p className="aff-t">{t}</p></div>)}
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact" id="contact">
        <div>
          <div className="sec-eye">Contact</div>
          <h2 className="contact-info-title">Get in touch.<br /><em>Lawrence reads every message.</em></h2>
          <p className="contact-p">Questions about the bundle, download issues, or anything else — send a message here and expect a personal reply within 24 hours.</p>
          <div className="contact-details">
            <div className="contact-detail"><div className="cd-label">Email</div><div className="cd-val">laxwellremzy50@gmail.com</div></div>
            <div className="contact-detail"><div className="cd-label">Store</div><div className="cd-val">selar.co/lxwel</div></div>
            <div className="contact-detail"><div className="cd-label">Reply</div><div className="cd-val">Within 24 hours · Always personal</div></div>
          </div>
        </div>
        <div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div>
                <label className="form-label">Your name</label>
                <input type="text" placeholder="Full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
              </div>
              <div>
                <label className="form-label">Email address</label>
                <input type="email" placeholder="your@email.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
              </div>
            </div>
            <div>
              <label className="form-label">Enquiry type</label>
              <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
                <option>Bundle enquiry</option>
                <option>Download issue</option>
                <option>Bulk / agency order</option>
                <option>Partnership</option>
                <option>General message</option>
              </select>
            </div>
            <div>
              <label className="form-label">Message</label>
              <textarea placeholder="Write your message here..." value={form.message} onChange={e=>setForm({...form,message:e.target.value})} required />
            </div>
            <button className="form-btn" type="submit" disabled={status==='sending'}>
              {status==='sending' ? 'Sending...' : 'Send message →'}
            </button>
            {status==='sent' && <div className="form-status sent">Message sent. Lawrence will reply within 24 hours.</div>}
            {status==='error' && <div className="form-status error">Something went wrong. Email laxwellremzy50@gmail.com directly.</div>}
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-sec">
        <h2 className="faq-h">Questions worth<br />asking before you buy</h2>
        {[
          ['Who is this built for?', 'Two types of Nigerian creator — the businessman building authority and the working class builder creating in the margins. Both have separate schedules, 30-day plans, and platform-specific instructions inside the bundle.'],
          ['What platforms does this cover?', 'Instagram (carousels and Reels), TikTok, and Telegram. Every posting instruction is written specifically for each platform with Nigeria-specific timing and format guidance.'],
          ['I have never posted consistently. Will this work?', 'The system is built for people who have started and stopped. The daily journal removes the blank screen. The 20-minute process removes overwhelm. The rest days remove guilt. You need the right structure — that is what this is.'],
          ['What do I receive after purchase?', 'One merged PDF bundle containing all three documents. Delivered instantly after payment via Selar. No waiting, no manual sending.'],
          ['Why ₦7,500?', 'Because good systems should be accessible to every serious Nigerian creator. The price increases after the first 50 sales. Early buyers get the most value at the lowest price.'],
          ['How do I contact Lawrence?', 'Use the contact form above or email laxwellremzy50@gmail.com. Every message is read personally. Reply within 24 hours is the standard.'],
        ].map(([q,a],i) => (
          <div key={i} className="faq-item" onClick={e=>e.currentTarget.classList.toggle('open')}>
            <div className="faq-q">{q}<span className="faq-icon">+</span></div>
            <div className="faq-a">{a}</div>
          </div>
        ))}
      </section>

      {/* CLOSER */}
      <section className="closer">
        <h2>Your next 30 days<br />of content are<br /><em>already written.</em></h2>
        <p className="closer-sub">You just have to show up and fill in your story. The structure, the hooks, the strategy, the timing — it is all here.</p>
        <a href="https://selar.co/lxwel" className="closer-cta" target="_blank" rel="noreferrer">Get the bundle for ₦7,500 →</a>
      </section>

      <footer>
        <div className="foot-logo">Lx<span>wel</span> — By Lawrence K</div>
        <div className="foot-info">laxwellremzy50@gmail.com · selar.co/lxwel · © 2025 Lawrence K</div>
      </footer>
    </>
  )
}
