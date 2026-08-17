import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Instagram,
  Menu,
  MessageCircle,
  X,
} from "lucide-react";

import "./_poster.css";

const WHATSAPP_URL =
  "https://wa.me/6282225666497?text=Halo%20Majang%20Mejeng%2C%20saya%20ingin%20memulai%20percakapan.";
const INSTAGRAM_URL = "https://www.instagram.com/majangmejeng_/";
const TIKTOK_URL = "https://www.tiktok.com/@majangmejeng_";

const navItems = [
  { label: "Arsip", target: "cerita" },
  { label: "Sudut pandang", target: "tentang" },
  { label: "Sapa kami", target: "kontak" },
];

function jumpTo(target: string) {
  document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
}

export function BrightPoster() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <main className="poster-page">
      <header className="poster-header">
        <button className="poster-logo" type="button" onClick={() => jumpTo("atas")} aria-label="Kembali ke atas">
          <img src="/__mockup/images/majang-m-mark.png" alt="Logo M Majang Mejeng" />
        </button>
        <span className="poster-wordmark">Majang Mejeng</span>
        <nav className="poster-nav" aria-label="Navigasi utama">
          {navItems.map((item) => (
            <button key={item.target} type="button" onClick={() => jumpTo(item.target)}>{item.label}</button>
          ))}
        </nav>
        <a className="poster-top-link" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
          Mulai ngobrol <ArrowUpRight size={15} />
        </a>
        <button
          className="poster-menu"
          type="button"
          aria-label={menuOpen ? "Tutup navigasi" : "Buka navigasi"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {menuOpen && (
        <nav className="poster-mobile-nav" aria-label="Navigasi mobile">
          {navItems.map((item) => (
            <button key={item.target} type="button" onClick={() => { jumpTo(item.target); setMenuOpen(false); }}>
              {item.label}
            </button>
          ))}
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">Mulai ngobrol <ArrowUpRight size={15} /></a>
        </nav>
      )}

      <section id="atas" className="poster-hero">
        <div className="poster-hero-top">
          <p className="poster-eyebrow">07° 48′ S / 110° 22′ E — YOGYAKARTA</p>
          <p className="poster-issue">MM / VOL. 01</p>
        </div>
        <div className="poster-hero-grid">
          <div className="poster-hero-copy">
            <h1>
              <span>Kota</span>
              <span>ini punya</span>
              <em>cerita.</em>
            </h1>
            <p className="poster-deck">
              Catatan kecil dari tempat-tempat yang kita lewati, orang-orang yang kita temui,
              dan kebiasaan yang membuat Jogja terasa pulang.
            </p>
            <button className="poster-underlined-action" type="button" onClick={() => jumpTo("cerita")}>
              Buka arsip <ArrowDownRight size={18} />
            </button>
          </div>
          <figure className="poster-hero-image">
            <div className="poster-image-index">01 / 04</div>
            <img
              src="/__mockup/images/majang-editorial-collage.png"
              alt="Kolase editorial tentang detail kehidupan sehari-hari di Yogyakarta"
            />
            <figcaption>Yang akrab, dilihat lagi.</figcaption>
          </figure>
        </div>
        <div className="poster-scroll-note"><span /> Geser pelan, ada yang ingin diceritakan</div>
      </section>

      <section id="cerita" className="poster-archive">
        <div className="poster-section-heading">
          <p className="poster-eyebrow">Arsip terpilih / 2024—2025</p>
          <h2>Yang kami<br /><em>perhatikan.</em></h2>
        </div>
        <div className="poster-archive-list">
          <a href={TIKTOK_URL} target="_blank" rel="noreferrer" className="poster-story poster-story-feature">
            <span className="poster-story-number">014</span>
            <span className="poster-story-title">Suara-suara yang membuat kita tahu: ini Jogja.</span>
            <span className="poster-story-meta">Film pendek / 02:18 <ArrowUpRight size={16} /></span>
          </a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="poster-story">
            <span className="poster-story-number">013</span>
            <span className="poster-story-title">Satu bangku, tiga obrolan, sore yang tidak buru-buru.</span>
            <span className="poster-story-meta">Catatan / 6 foto <ArrowUpRight size={16} /></span>
          </a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="poster-story">
            <span className="poster-story-number">012</span>
            <span className="poster-story-title">Ritual kecil sebelum toko buka.</span>
            <span className="poster-story-meta">Potret / 4 foto <ArrowUpRight size={16} /></span>
          </a>
        </div>
        <a className="poster-archive-link" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
          Lihat semua di Instagram <ArrowUpRight size={16} />
        </a>
      </section>

      <section id="tentang" className="poster-about">
        <div className="poster-about-label">
          <img src="/__mockup/images/majang-mark-source.png" alt="Majang Mejeng" />
          <span>Tentang cara kami melihat</span>
        </div>
        <div className="poster-about-copy">
          <h2>Bukan panduan kota.<br /><em>Lebih dekat dari itu.</em></h2>
          <p>
            Majang Mejeng adalah akun sosial lokal yang tumbuh dari rasa ingin tahu.
            Kami percaya budaya bukan hanya yang dirayakan, tetapi juga yang berlangsung
            setiap hari: pelan, lucu, dan apa adanya.
          </p>
        </div>
      </section>

      <section id="kontak" className="poster-contact">
        <p className="poster-eyebrow">Punya cerita untuk dibagi?</p>
        <div className="poster-contact-row">
          <h2>Mulai dari<br /><em>halo.</em></h2>
          <div className="poster-contact-side">
            <p>Kolaborasi, titip cerita, atau sekadar menyapa. Pintu kami terbuka.</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="poster-whatsapp">
              <MessageCircle size={19} />
              <span>Buka percakapan WhatsApp<small>0822 2566 6497</small></span>
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>

      <footer className="poster-footer">
        <div className="poster-footer-brand">
          <img src="/__mockup/images/majang-m-mark.png" alt="" />
          <span>Majang Mejeng</span>
        </div>
        <span>Yogyakarta, Indonesia — melihat lebih dekat sejak 2020</span>
        <div className="poster-socials">
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram Majang Mejeng"><Instagram size={18} /></a>
          <a href={TIKTOK_URL} target="_blank" rel="noreferrer" aria-label="TikTok Majang Mejeng" className="poster-tiktok">Tt</a>
        </div>
      </footer>
    </main>
  );
}

export default BrightPoster;