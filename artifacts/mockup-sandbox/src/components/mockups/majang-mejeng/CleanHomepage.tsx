import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Instagram,
  Menu,
  MessageCircle,
  Play,
  X,
} from "lucide-react";

import "./_group.css";

const WHATSAPP_URL =
  "https://wa.me/6282225666497?text=Halo%20Majang%20Mejeng%2C%20saya%20ingin%20memulai%20percakapan.";

const navItems = [
  { label: "Arsip", target: "cerita" },
  { label: "Tentang", target: "tentang" },
  { label: "Kontak", target: "kontak" },
];

const storyFilters = ["Semua", "Ruang", "Orang", "Rasa", "Bunyi", "Gerak"] as const;

const storyArchive = [
  ["01", "Ruang", "Di balik pintu yang selalu terbuka", "12 Jun 2024", "Instagram"],
  ["02", "Orang", "Mereka yang menjaga malam tetap menyala", "30 Mei 2024", "TikTok"],
  ["03", "Rasa", "Sepiring cerita dari meja pojok", "18 Mei 2024", "Instagram"],
  ["04", "Bunyi", "Nada kecil yang tinggal di gang besar", "02 Mei 2024", "TikTok"],
  ["05", "Gerak", "Pagi-pagi, kota mulai berjalan", "21 Apr 2024", "Instagram"],
] as const;

function jumpTo(target: string) {
  document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
  window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
}

export function CleanHomepage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<(typeof storyFilters)[number]>("Semua");
  const visibleStories =
    activeFilter === "Semua"
      ? storyArchive
      : storyArchive.filter(([, category]) => category === activeFilter);

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
            <p className="mm-kicker mm-reveal-left">Jurnal lokal / Yogyakarta</p>
          <h1 className="mm-reveal mm-delay-1">
              Yang dekat
              <em> jadi berarti.</em>
          </h1>
          <p className="mm-hero-note mm-reveal mm-delay-2">
              Majang Mejeng melihat Yogyakarta dari jarak yang akrab: lewat orang,
              kebiasaan, tempat, dan percakapan yang terus bergerak.
          </p>
          <div className="mm-hero-actions mm-reveal mm-delay-3">
            <button type="button" className="mm-primary-button" onClick={() => jumpTo("cerita")}>
                Buka arsip cerita <ArrowDownRight size={18} />
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
          <div>
            <p className="mm-kicker">Arsip pengamatan</p>
            <h2>Catatan dari<br /><span>yang sedang hidup.</span></h2>
          </div>
          <div className="mm-archive-summary">
            <p className="mm-index-note">{String(visibleStories.length).padStart(2, "0")} cerita / diperbarui berkala</p>
            <div className="mm-archive-filters" aria-label="Saring arsip cerita">
              {storyFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={activeFilter === filter ? "is-active" : ""}
                  aria-pressed={activeFilter === filter}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mm-feature">
          <div className="mm-film-wrap">
            <img
              src="/__mockup/images/majang-film-still.png"
              alt="Potret sinematik suasana jalan dan warga Yogyakarta"
            />
            <span className="mm-film-tag"><Play size={12} fill="currentColor" /> Tonton cuplikannya</span>
          </div>
          <div className="mm-feature-copy">
            <p className="mm-feature-number">Pilihan minggu ini / 014</p>
            <h3>Suara-suara yang membuat kita tahu: <em>ini Jogja.</em></h3>
            <p>
              Dari obrolan di warung sampai jeda panjang di gang kecil. Kami
              merekam, menulis, dan membagikannya dalam format yang terasa dekat.
            </p>
            <a href="https://www.tiktok.com/@majangmejeng_" target="_blank" rel="noreferrer" className="mm-feature-link">
              Lihat di TikTok <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        <div className="mm-archive" aria-label="Daftar arsip cerita">
          {visibleStories.map(([number, category, title, date, channel]) => (
            <a
              className="mm-archive-row"
              href={channel === "TikTok" ? "https://www.tiktok.com/@majangmejeng_" : "https://www.instagram.com/majangmejeng_/"}
              target="_blank"
              rel="noreferrer"
              key={number}
            >
              <span className="mm-archive-number">{number}</span>
              <span className="mm-archive-category">{category}</span>
              <strong>{title}</strong>
              <span className="mm-archive-meta">{date} · {channel}</span>
              <ArrowUpRight size={17} />
            </a>
          ))}
          {visibleStories.length === 0 && (
            <p className="mm-archive-empty">Cerita untuk kategori ini sedang disiapkan.</p>
          )}
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
           <p className="mm-kicker">Punya cerita?</p>
           <h2>Mulai dari<br /><span>halo.</span></h2>
        </div>
        <div className="mm-contact-side">
           <p>Untuk kolaborasi, menitipkan cerita, atau sekadar menyapa. Pintu kami terbuka.</p>
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
           <img src="/__mockup/images/majang-mark-source.png" alt="" />
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