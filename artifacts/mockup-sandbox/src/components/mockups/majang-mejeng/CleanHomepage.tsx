import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Instagram,
  Menu,
  MessageCircle,
  X,
} from "lucide-react";

import "./_group.css";

const WHATSAPP_URL =
  "https://wa.me/6282225666497?text=Halo%20Majang%20Mejeng%2C%20saya%20ingin%20memulai%20percakapan.";

const navItems = [
  { label: "Cerita", target: "cerita" },
  { label: "Tentang", target: "tentang" },
  { label: "Kontak", target: "kontak" },
];

function jumpTo(target: string) {
  document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
  window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
}

export function CleanHomepage() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <main className="mm-page">
      <style>{`
        @keyframes mm-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes mm-reveal { from { opacity: 0; transform: translateX(-14px); } to { opacity: 1; transform: translateX(0); } }
        .mm-reveal { animation: mm-rise .7s cubic-bezier(.2,.7,.2,1) both; }
        .mm-reveal-left { animation: mm-reveal .7s cubic-bezier(.2,.7,.2,1) both; }
        .mm-delay-1 { animation-delay: .08s; } .mm-delay-2 { animation-delay: .16s; }
        .mm-delay-3 { animation-delay: .24s; } .mm-delay-4 { animation-delay: .32s; }
        @media (prefers-reduced-motion: reduce) {
          .mm-reveal, .mm-reveal-left { animation: none; }
          html { scroll-behavior: auto; }
        }
      `}</style>

      <header className="mm-header">
        <button
          type="button"
          aria-label="Kembali ke atas"
          onClick={() => jumpTo("atas")}
          className="mm-mark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff5a12]"
        >
          <img src="/__mockup/images/majang-m-mark.png" alt="Logo M Majang Mejeng" />
        </button>
        <div className="mm-wordmark" aria-label="Majang Mejeng">
          <span>Majang</span> <span>Mejeng</span>
        </div>
        <nav className="mm-nav" aria-label="Navigasi utama">
          {navItems.map((item) => (
            <button key={item.target} type="button" onClick={() => jumpTo(item.target)}>
              {item.label}
            </button>
          ))}
        </nav>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="mm-header-cta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff5a12]"
        >
          Mulai ngobrol <ArrowUpRight size={15} strokeWidth={2.2} />
        </a>
        <button
          type="button"
          className="mm-menu-button focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff5a12]"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Tutup navigasi" : "Buka navigasi"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      {menuOpen && (
        <nav className="mm-mobile-nav mm-reveal" aria-label="Navigasi mobile">
          {navItems.map((item) => (
            <button
              key={item.target}
              type="button"
              onClick={() => {
                jumpTo(item.target);
                setMenuOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
            Mulai ngobrol <ArrowUpRight size={15} />
          </a>
        </nav>
      )}

      <section id="atas" className="mm-hero">
        <div className="mm-hero-copy">
          <p className="mm-kicker mm-reveal-left">Dari Jogja, untuk yang memperhatikan.</p>
          <h1 className="mm-reveal mm-delay-1">
            Kota ini punya
            <em> cerita.</em>
          </h1>
          <p className="mm-hero-note mm-reveal mm-delay-2">
            Kami mengumpulkan detail kecil yang sering luput: orangnya, tempatnya,
            rasanya, bunyinya.
          </p>
          <div className="mm-hero-actions mm-reveal mm-delay-3">
            <button type="button" className="mm-primary-button" onClick={() => jumpTo("cerita")}>
              Lihat yang kami temukan <ArrowDownRight size={18} />
            </button>
            <a href="https://www.instagram.com/majangmejeng_/" target="_blank" rel="noreferrer" className="mm-text-link">
              Ikuti di Instagram <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        <div className="mm-hero-art mm-reveal mm-delay-2">
          <div className="mm-art-label">01 / catatan lapangan</div>
          <img
            src="/__mockup/images/majang-editorial-collage.png"
            alt="Kolase editorial tentang sudut-sudut kehidupan sehari-hari di Yogyakarta"
          />
          <p className="mm-art-caption">Yang akrab, dilihat lagi.</p>
        </div>
      </section>

      <section id="cerita" className="mm-story">
        <div className="mm-section-intro">
          <p className="mm-kicker">Sedang diperhatikan</p>
          <h2>Bukan panduan kota.<br /><span>Lebih dekat dari itu.</span></h2>
        </div>
        <div className="mm-feature">
          <div className="mm-film-wrap">
            <img
              src="/__mockup/images/majang-film-still.png"
              alt="Potret sinematik suasana jalan dan warga Yogyakarta"
            />
            <span className="mm-film-tag">Tonton cuplikannya</span>
          </div>
          <div className="mm-feature-copy">
            <p className="mm-feature-number">Catatan 014</p>
            <h3>Suara-suara yang membuat kita tahu: ini Jogja.</h3>
            <p>
              Dari obrolan di warung sampai jeda panjang di gang kecil. Kami
              merekam, menulis, dan membagikannya dalam format yang terasa dekat.
            </p>
            <a href="https://www.tiktok.com/@majangmejeng_" target="_blank" rel="noreferrer" className="mm-feature-link">
              Lihat di TikTok <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <section id="tentang" className="mm-about">
        <div>
          <p className="mm-kicker">Majang Mejeng</p>
          <h2>Ruang kecil untuk<br /><em>cerita yang besar artinya.</em></h2>
        </div>
        <p className="mm-about-copy">
          Akun sosial lokal yang tumbuh dari rasa ingin tahu. Kami percaya
          budaya bukan hanya yang dirayakan, tapi juga yang berlangsung setiap
          hari — pelan, lucu, dan apa adanya.
        </p>
      </section>

      <section id="kontak" className="mm-contact">
        <div className="mm-contact-heading">
          <p className="mm-kicker">Ada cerita?</p>
          <h2>Mulai dari<br /><span>halo.</span></h2>
        </div>
        <div className="mm-contact-side">
          <p>Untuk kolaborasi, titip cerita, atau sekadar menyapa. Pintu kami terbuka.</p>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="mm-whatsapp">
            <MessageCircle size={19} />
            <span>
              Buka percakapan WhatsApp
              <small>0822 2566 6497</small>
            </span>
            <ArrowUpRight size={17} />
          </a>
        </div>
      </section>

      <footer className="mm-footer">
        <div className="mm-footer-brand">
          <img src="/__mockup/images/majang-m-mark.png" alt="" />
          <span>Majang Mejeng</span>
        </div>
        <p>Yogyakarta, Indonesia · Melihat lebih dekat sejak 2020</p>
        <div className="mm-socials">
          <a href="https://www.instagram.com/majangmejeng_/" target="_blank" rel="noreferrer" aria-label="Instagram Majang Mejeng">
            <Instagram size={18} />
          </a>
          <a href="https://www.tiktok.com/@majangmejeng_" target="_blank" rel="noreferrer" aria-label="TikTok Majang Mejeng" className="mm-tiktok">
            Tt
          </a>
        </div>
      </footer>
    </main>
  );
}