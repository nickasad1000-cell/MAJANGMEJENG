import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, Instagram, Menu, MessageCircle, X } from "lucide-react";

import "./_archive.css";

const WHATSAPP_URL =
  "https://wa.me/6282225666497?text=Halo%20Majang%20Mejeng%2C%20saya%20ingin%20memulai%20percakapan.";
const INSTAGRAM_URL = "https://www.instagram.com/majangmejeng_/";
const TIKTOK_URL = "https://www.tiktok.com/@majangmejeng_";

const stories = [
  { no: "01", type: "Warga", title: "Yang masih menyapa di jalan kecil", note: "tentang kebiasaan yang menolak hilang" },
  { no: "02", type: "Tempat", title: "Warung yang tahu pesananmu", note: "sepotong pagi di sudut Kotagede" },
  { no: "03", type: "Bunyi", title: "Ketika kota mulai berbicara", note: "rekaman suara dari jam-jam pertama" },
  { no: "04", type: "Rasa", title: "Manis, asin, lalu pulang", note: "mencari ingatan lewat semangkuk soto" },
  { no: "05", type: "Kerja", title: "Tangan-tangan sebelum matahari", note: "sehari bersama pembuat yang telaten" },
  { no: "06", type: "Ritual", title: "Malam yang tidak buru-buru", note: "catatan kecil selepas lampu toko padam" },
];

function jumpTo(target: string) {
  document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
}

export function StoryArchive() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const closeAndJump = (target: string) => {
    setMenuOpen(false);
    jumpTo(target);
  };

  return (
    <main className="archive-page">
      <header className="archive-header">
        <button className="archive-mark" type="button" aria-label="Kembali ke awal" onClick={() => jumpTo("awal")}>
          <img src="/__mockup/images/majang-m-mark.png" alt="M Majang Mejeng" />
        </button>
        <a className="archive-wordmark" href="#awal" onClick={(event) => { event.preventDefault(); jumpTo("awal"); }}>
          Majang <span>Mejeng</span>
        </a>
        <nav className="archive-nav" aria-label="Navigasi utama">
          <button type="button" onClick={() => jumpTo("arsip")}>Arsip</button>
          <button type="button" onClick={() => jumpTo("tentang")}>Tentang</button>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={14} /></a>
        </nav>
        <a className="archive-top-cta" href={WHATSAPP_URL} target="_blank" rel="noreferrer">Mulai ngobrol <ArrowUpRight size={14} /></a>
        <button className="archive-menu" type="button" aria-expanded={menuOpen} aria-label={menuOpen ? "Tutup navigasi" : "Buka navigasi"} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {menuOpen && (
        <nav className="archive-mobile-nav" aria-label="Navigasi mobile">
          <button type="button" onClick={() => closeAndJump("arsip")}>Arsip cerita</button>
          <button type="button" onClick={() => closeAndJump("tentang")}>Tentang kami</button>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={15} /></a>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">Mulai ngobrol <ArrowUpRight size={15} /></a>
        </nav>
      )}

      <section id="awal" className="archive-hero">
        <div className="archive-hero-copy">
          <p className="archive-eyebrow">Indeks cerita lokal / Yogyakarta</p>
          <h1>Jogja, <em>dibaca</em><br />pelan-pelan.</h1>
          <p className="archive-intro">Majang Mejeng mengarsipkan orang, tempat, bunyi, dan kebiasaan yang membuat kota ini terasa dekat.</p>
          <button className="archive-scroll-link" type="button" onClick={() => jumpTo("arsip")}>Buka arsip <ArrowDown size={17} /></button>
        </div>
        <div className="archive-visual">
          <div className="archive-visual-index">lapangan 06 / 24</div>
          <img src="/__mockup/images/majang-editorial-collage.png" alt="Kolase suasana lokal Yogyakarta" />
          <span>yang akrab, dilihat lagi</span>
        </div>
      </section>

      <section id="arsip" className="archive-index">
        <div className="archive-index-heading">
          <div>
            <p className="archive-eyebrow">Arsip / 2020—sekarang</p>
            <h2>Enam cara<br /><em>untuk tinggal</em><br />lebih lama.</h2>
          </div>
          <p>Ini bukan daftar tempat yang harus didatangi. Ini daftar hal yang mungkin selama ini kamu lewati.</p>
        </div>
        <div className="story-list">
          {stories.map((story) => (
            <a className="story-row" href={TIKTOK_URL} target="_blank" rel="noreferrer" key={story.no}>
              <span className="story-number">{story.no}</span>
              <span className="story-type">{story.type}</span>
              <span className="story-title">{story.title}<small>{story.note}</small></span>
              <span className="story-open" aria-label={`Buka cerita ${story.title}`}><ArrowUpRight size={19} /></span>
            </a>
          ))}
        </div>
      </section>

      <section className="archive-feature">
        <div className="feature-photo">
          <img src="/__mockup/images/majang-film-still.png" alt="Film still kehidupan sehari-hari di Yogyakarta" />
          <span>catatan bergerak / 014</span>
        </div>
        <div className="feature-copy">
          <p className="archive-eyebrow">Pilihan editor</p>
          <h2>Suara-suara yang membuat kita tahu: <em>ini Jogja.</em></h2>
          <p>Dari obrolan di warung sampai jeda panjang di gang kecil. Kami merekam yang berlangsung sehari-hari, lalu membaginya dalam format yang terasa dekat.</p>
          <a href={TIKTOK_URL} target="_blank" rel="noreferrer">Tonton di TikTok <ArrowUpRight size={16} /></a>
        </div>
      </section>

      <section id="tentang" className="archive-about">
        <p className="archive-eyebrow">Tentang Majang Mejeng</p>
        <h2>Budaya bukan hanya yang <em>dirayakan.</em><br />Ia juga yang berlangsung.</h2>
        <p>Kami adalah akun sosial lokal yang tumbuh dari rasa ingin tahu—tentang cara orang bertemu, bekerja, makan, dan saling menjaga di Yogyakarta.</p>
      </section>

      <section id="kontak" className="archive-contact">
        <div><p className="archive-eyebrow">Punya cerita untuk kami?</p><h2>Mulai dari<br /><em>halo.</em></h2></div>
        <div className="contact-side">
          <p>Untuk kolaborasi, titip cerita, atau sekadar menyapa. Pintu kami terbuka.</p>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="whatsapp-link"><MessageCircle size={19} /><span>Buka percakapan WhatsApp<small>0822 2566 6497</small></span><ArrowUpRight size={17} /></a>
        </div>
      </section>

      <footer className="archive-footer">
        <div className="footer-brand"><img src="/__mockup/images/majang-m-mark.png" alt="" /><span>Majang Mejeng</span></div>
        <p>Yogyakarta, Indonesia / melihat lebih dekat sejak 2020</p>
        <div className="footer-socials"><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram Majang Mejeng"><Instagram size={17} /></a><a href={TIKTOK_URL} target="_blank" rel="noreferrer" aria-label="TikTok Majang Mejeng">Tt</a></div>
      </footer>
    </main>
  );
}