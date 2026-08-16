import { type ReactNode, useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Music2,
  Plus,
  X,
} from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const socials = {
  instagram: 'https://www.instagram.com/majangmejeng_/',
  tiktok: 'https://www.tiktok.com/@majangmejeng_?lang=id-ID',
  mail: 'mailto:halo@majangmejeng.studio',
};

const navItems = [
  { label: 'cerita', href: '#cerita' },
  { label: 'konten', href: '#konten' },
  { label: 'tentang', href: '#tentang' },
  { label: 'kontak', href: '#kontak' },
];

const contentItems = [
  {
    id: '01',
    type: 'video pendek',
    title: 'Kok bisa warung kopi jadi tempat paling jujur di kota?',
    note: 'Satu kursi kosong, tiga cerita, dan sedikit es batu.',
    href: socials.tiktok,
    className: 'bg-[#f4d814] text-[#162338]',
  },
  {
    id: '02',
    type: 'catatan jalan',
    title: 'Mencari suara kota setelah hujan reda.',
    note: 'Dari Malioboro sampai gang kecil di Kotabaru.',
    href: socials.instagram,
    className: 'bg-[#ff5a1f] text-[#f8f0dc]',
  },
  {
    id: '03',
    type: 'orang-orang',
    title: 'Kenalan dengan yang bikin kota terus bergerak.',
    note: 'Bukan profil. Lebih mirip obrolan panjang.',
    href: socials.instagram,
    className: 'bg-[#1554c2] text-[#f8f0dc]',
  },
];

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('cerita');

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter((section): section is Element => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: '-22% 0px -64% 0px', threshold: [0.05, 0.2, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="min-h-[100dvh] overflow-hidden bg-[#f8f0dc] text-[#162338]">
      <div className="pointer-events-none fixed inset-0 z-40 border-[8px] border-[#162338]/[0.035] sm:border-[12px]" />

      <header className="fixed left-0 right-0 top-0 z-30 px-3 pt-3 sm:px-7 sm:pt-5 lg:px-10">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between border border-[#f8f0dc]/20 bg-[#162338]/95 px-4 py-3 text-[#f8f0dc] shadow-[0_10px_35px_rgba(22,35,56,.18)] backdrop-blur-md sm:px-5">
          <a href="#atas" data-testid="link-brand" onClick={closeMenu} className="focus-ring group flex items-center gap-3">
            <img src="/majang-mejeng-logo.png" alt="Majang Mejeng" className="w-[112px] transition-transform duration-300 group-hover:-rotate-2 sm:w-[136px]" data-testid="img-header-logo" />
            <span className="hidden border-l border-[#f8f0dc]/25 pl-3 font-mono-brand text-[9px] uppercase tracking-[.14em] text-[#f8f0dc]/55 lg:block">cerita dari dekat</span>
          </a>

          <nav aria-label="Navigasi utama" className="hidden items-center gap-8 md:flex">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                data-testid={`link-nav-${item.label}`}
                className={`focus-ring font-mono-brand text-[10px] uppercase tracking-[.16em] transition-colors hover:text-[#f4d814] ${activeSection === item.href.slice(1) ? 'text-[#f4d814]' : 'text-[#f8f0dc]/65'}`}
              >
                <span className="mr-2 text-[#ff5a1f]">0{index + 1}</span>{item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href={socials.instagram} target="_blank" rel="noreferrer" data-testid="link-header-instagram" aria-label="Buka Instagram Majang Mejeng" className="focus-ring hidden h-8 w-8 items-center justify-center border border-[#f8f0dc]/25 transition-colors hover:border-[#f4d814] hover:bg-[#f4d814] hover:text-[#162338] sm:flex">
              <Instagram size={15} />
            </a>
            <a href={socials.tiktok} target="_blank" rel="noreferrer" data-testid="link-header-tiktok" aria-label="Buka TikTok Majang Mejeng" className="focus-ring hidden h-8 w-8 items-center justify-center border border-[#f8f0dc]/25 transition-colors hover:border-[#f4d814] hover:bg-[#f4d814] hover:text-[#162338] sm:flex">
              <Music2 size={15} />
            </a>
            <button type="button" data-testid="button-menu" aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)} className="focus-ring flex h-8 w-8 items-center justify-center border border-[#f8f0dc]/25 transition-colors hover:border-[#f4d814] hover:bg-[#f4d814] hover:text-[#162338] md:hidden">
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="mx-auto mt-2 max-w-[1440px] border border-[#f8f0dc]/20 bg-[#162338] p-5 text-[#f8f0dc] shadow-[0_18px_35px_rgba(22,35,56,.2)] md:hidden">
            <nav aria-label="Navigasi mobile" className="grid gap-1">
              {navItems.map((item, index) => (
                <a key={item.href} href={item.href} data-testid={`link-mobile-nav-${item.label}`} onClick={closeMenu} className="focus-ring flex items-center justify-between border-b border-[#f8f0dc]/15 py-3 font-display text-2xl font-semibold">
                  <span><span className="mr-3 font-mono-brand text-[10px] text-[#ff5a1f]">0{index + 1}</span>{item.label}</span>
                  <ArrowUpRight size={18} className="text-[#f4d814]" />
                </a>
              ))}
            </nav>
            <div className="mt-5 flex gap-2">
              <a href={socials.instagram} target="_blank" rel="noreferrer" data-testid="link-mobile-instagram" className="focus-ring flex flex-1 items-center justify-center gap-2 bg-[#f4d814] py-2.5 text-xs font-bold text-[#162338] transition-transform hover:-translate-y-0.5"><Instagram size={14} /> Instagram</a>
              <a href={socials.tiktok} target="_blank" rel="noreferrer" data-testid="link-mobile-tiktok" className="focus-ring flex flex-1 items-center justify-center gap-2 border border-[#f8f0dc]/30 py-2.5 text-xs font-bold transition-colors hover:border-[#f4d814]"><Music2 size={14} /> TikTok</a>
            </div>
          </div>
        )}
      </header>

      <section id="atas" className="relative overflow-hidden bg-[#162338] px-4 pb-20 pt-32 text-[#f8f0dc] sm:px-8 sm:pb-28 sm:pt-44 lg:px-10" data-testid="section-hero">
        <div className="absolute -right-28 top-24 h-[28rem] w-[28rem] rounded-full bg-[#ff5a1f] sm:h-[38rem] sm:w-[38rem]" />
        <div className="absolute -bottom-40 left-[42%] h-80 w-80 rounded-full border-[34px] border-[#1554c2] sm:h-[30rem] sm:w-[30rem]" />
        <div className="absolute right-[18%] top-[19%] h-4 w-4 rotate-45 bg-[#f4d814]" />
        <div className="absolute left-[8%] top-[29%] h-3 w-3 rounded-full bg-[#ff5a1f]" />
        <div className="relative mx-auto grid max-w-[1440px] items-end gap-14 lg:grid-cols-[1.03fr_.97fr] lg:gap-16">
          <div className="relative z-10">
            <div className="reveal mb-8 flex items-center gap-3 font-mono-brand text-[10px] uppercase tracking-[.18em] text-[#f4d814]">
              <span className="h-2 w-2 rounded-full bg-[#ff5a1f]" /> media sosial dari Yogyakarta
            </div>
            <h1 className="reveal reveal-delay-1 max-w-[800px] font-display text-[clamp(4.2rem,12vw,12rem)] font-bold leading-[.77] tracking-[-.105em]">
              <span className="block text-[#f4d814]">hal kecil,</span>
              <span className="relative block pl-[.14em] text-[#f8f0dc] after:absolute after:bottom-[.04em] after:left-0 after:h-[.075em] after:w-[.7em] after:bg-[#ff5a1f] after:content-['']">bunyi besar.</span>
            </h1>
            <p className="reveal reveal-delay-2 mt-10 max-w-[490px] text-[17px] leading-[1.55] text-[#f8f0dc]/72 sm:text-[19px]">
              Cerita, orang, dan kejadian kecil yang bikin kota terasa dekat. Kami mengubah momen sehari-hari jadi alasan untuk berhenti scroll.
            </p>
            <div className="reveal reveal-delay-3 mt-8 flex flex-wrap gap-3">
              <a href="#konten" data-testid="link-hero-content" className="focus-ring group flex items-center gap-3 bg-[#f4d814] px-5 py-3 text-sm font-bold text-[#162338] transition-transform hover:-translate-y-1">
                lihat yang baru <ArrowDown size={16} className="transition-transform group-hover:translate-y-1" />
              </a>
              <a href={socials.instagram} target="_blank" rel="noreferrer" data-testid="link-hero-instagram" className="focus-ring flex items-center gap-2 border border-[#f8f0dc]/30 px-5 py-3 text-sm font-semibold transition-colors hover:border-[#f4d814] hover:text-[#f4d814]">
                <Instagram size={16} /> @majangmejeng_
              </a>
            </div>
          </div>
          <div className="reveal reveal-delay-2 relative mx-auto w-full max-w-[590px] lg:mb-1">
            <div className="absolute -left-3 -top-5 z-10 rotate-[-6deg] bg-[#f4d814] px-3 py-2 font-mono-brand text-[10px] font-medium uppercase tracking-[.12em] text-[#162338] shadow-[5px_5px_0_#ff5a1f]">volume 01 / jogja</div>
            <div className="relative aspect-square rotate-[2deg] overflow-hidden border-[7px] border-[#f8f0dc] bg-[#ff5a1f] shadow-[14px_16px_0_#1554c2]">
              <img src="/majang-editorial-collage.png" alt="Kolase editorial Majang Mejeng dengan suasana kota dan manusia" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" data-testid="img-hero-collage" />
              <div className="absolute bottom-3 left-3 bg-[#162338] px-3 py-2 font-mono-brand text-[9px] uppercase tracking-[.12em] text-[#f4d814]">dibuat dekat, bukan jauh</div>
            </div>
            <div className="absolute -bottom-10 -right-4 z-10 flex h-24 w-24 rotate-[9deg] items-center justify-center rounded-full bg-[#ff5a1f] text-center font-display text-[14px] font-bold leading-[.95] text-[#f8f0dc] shadow-[5px_5px_0_#f4d814] sm:h-28 sm:w-28">ikut<br />ceritanya</div>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y-2 border-[#162338] bg-[#f4d814] py-3 text-[#162338]" aria-hidden="true">
        <div className="marquee-track flex w-max items-center font-display text-[20px] font-bold uppercase tracking-[-.03em] sm:text-[25px]">
          <span className="px-4">orang biasa / cerita luar biasa</span><Plus size={17} /><span className="px-4">jogja / jakarta / di mana saja</span><Plus size={17} /><span className="px-4">orang biasa / cerita luar biasa</span><Plus size={17} /><span className="px-4">jogja / jakarta / di mana saja</span><Plus size={17} />
        </div>
      </div>

      <section id="cerita" className="scroll-mt-20 px-4 py-20 sm:px-8 sm:py-28 lg:px-10" data-testid="section-story">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-12 lg:grid-cols-[.33fr_1fr] lg:gap-20">
            <div>
              <div className="font-mono-brand text-[10px] uppercase tracking-[.18em] text-[#ff5a1f]">01 / kenapa kami ada</div>
              <div className="mt-7 hidden font-display text-[10rem] font-bold leading-none tracking-[-.1em] text-[#162338]/10 lg:block">01</div>
              <div className="mt-10 hidden h-px w-28 bg-[#ff5a1f] lg:block" />
            </div>
            <div>
              <h2 className="max-w-[930px] font-display text-[clamp(2.8rem,6.4vw,6.8rem)] font-semibold leading-[.9] tracking-[-.08em] text-balance">Kota punya banyak suara. Kami <span className="text-[#ff5a1f]">mendengarkan</span> yang sering kelewat.</h2>
              <div className="mt-10 grid gap-8 border-t border-[#162338]/25 pt-8 sm:grid-cols-2">
                <p className="max-w-[380px] text-[17px] leading-[1.55] text-[#162338]/74">Kami tidak sedang mencari hal paling viral. Kami mencari alasan kenapa orang berhenti di satu tempat, menoleh ke satu arah, lalu pulang dengan cerita baru.</p>
                <p className="max-w-[380px] text-[17px] leading-[1.55] text-[#162338]/74">Di Instagram dan TikTok, kami membagikan potongan kecil dari hidup yang terasa familiar: makanan, musik, ruang, dan orang-orang yang membuat kota terus bernapas.</p>
              </div>
              <a href={socials.tiktok} target="_blank" rel="noreferrer" data-testid="link-story-tiktok" className="focus-ring editorial-link group mt-10 inline-flex items-center gap-3 font-bold transition-colors hover:text-[#ff5a1f]">lihat kami bergerak <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a>
            </div>
          </div>
        </div>
      </section>

      <section id="konten" className="scroll-mt-20 bg-[#162338] px-4 py-20 text-[#f8f0dc] sm:px-8 sm:py-28 lg:px-10" data-testid="section-content">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="font-mono-brand text-[10px] uppercase tracking-[.18em] text-[#f4d814]">02 / isi kepala kami</div>
              <h2 className="mt-4 font-display text-[clamp(3.4rem,8vw,8rem)] font-bold leading-[.78] tracking-[-.1em]">yang lagi<br /><span className="text-[#ff5a1f]">mejeng.</span></h2>
            </div>
            <p className="max-w-[280px] text-sm leading-[1.5] text-[#f8f0dc]/62">Tiga pintu masuk. Satu rasa penasaran. Pilih yang paling dekat dengan harimu.</p>
          </div>
          <div className="grid gap-4 lg:grid-cols-[1.15fr_.85fr]">
            <a href={contentItems[0].href} target="_blank" rel="noreferrer" data-testid="card-content-01" className={`tilt-card focus-ring relative min-h-[440px] overflow-hidden p-6 sm:p-9 ${contentItems[0].className}`}>
              <div className="absolute right-7 top-7 flex h-14 w-14 items-center justify-center rounded-full border-2 border-current transition-transform duration-500 group-hover:rotate-45"><ArrowUpRight size={23} /></div>
              <div className="absolute bottom-0 right-0 h-[72%] w-[62%] overflow-hidden sm:w-[52%]"><img src="/majang-film-still.png" alt="Suasana obrolan dan produksi konten Majang Mejeng" className="h-full w-full object-cover grayscale transition-all duration-700 hover:scale-105 hover:grayscale-0" data-testid="img-content-film" /></div>
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="font-mono-brand text-[10px] uppercase tracking-[.15em]">/ {contentItems[0].type}</div>
                <div className="max-w-[440px]"><div className="mb-4 font-mono-brand text-xs">[{contentItems[0].id}]</div><h3 className="font-display text-[clamp(2rem,4vw,4.5rem)] font-bold leading-[.88] tracking-[-.07em]">{contentItems[0].title}</h3><p className="mt-5 max-w-[250px] text-sm leading-[1.4] opacity-70">{contentItems[0].note}</p></div>
              </div>
            </a>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {contentItems.slice(1).map((item) => (
                <a key={item.id} href={item.href} target="_blank" rel="noreferrer" data-testid={`card-content-${item.id}`} className={`tilt-card focus-ring group relative flex min-h-[215px] flex-col justify-between overflow-hidden p-6 sm:p-7 ${item.className}`}>
                  <div className="flex items-start justify-between font-mono-brand text-[10px] uppercase tracking-[.15em]"><span>/ {item.type}</span><ArrowUpRight size={19} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" /></div>
                  <div><div className="mb-3 font-mono-brand text-xs">[{item.id}]</div><h3 className="max-w-[570px] font-display text-[clamp(1.8rem,3vw,3rem)] font-bold leading-[.9] tracking-[-.06em]">{item.title}</h3><p className="mt-3 text-sm opacity-70">{item.note}</p></div>
                </a>
              ))}
            </div>
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-[#f8f0dc]/20 pt-5">
            <div className="flex items-center gap-3 font-mono-brand text-[10px] uppercase tracking-[.13em] text-[#f8f0dc]/55"><span className="h-2 w-2 rounded-full bg-[#ff5a1f]" /> konten baru tiap minggu, kalau sempat</div>
            <a href={socials.instagram} target="_blank" rel="noreferrer" data-testid="link-content-instagram" className="focus-ring font-bold text-[#f4d814] transition-colors hover:text-[#ff5a1f]">buka arsip Instagram <ArrowUpRight className="ml-1 inline" size={15} /></a>
          </div>
        </div>
      </section>

      <section id="tentang" className="scroll-mt-20 px-4 py-20 sm:px-8 sm:py-28 lg:px-10" data-testid="section-about">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:gap-20">
            <div className="relative min-h-[420px] overflow-hidden bg-[#ff5a1f] p-7 sm:min-h-[500px] sm:p-9">
              <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full border-[30px] border-[#f4d814]" />
              <div className="absolute bottom-[-90px] left-[-70px] h-64 w-64 rounded-full border-[23px] border-[#1554c2]" />
              <div className="relative z-10 flex h-full flex-col justify-between text-[#162338]">
                <div className="flex justify-between font-mono-brand text-[10px] uppercase tracking-[.14em]"><span>est. di internet</span><span>02—25</span></div>
                <div><div className="mb-5 font-display text-[7.5rem] font-bold leading-[.7] tracking-[-.12em]">mm<span className="text-[#f4d814]">.</span></div><p className="max-w-[280px] font-display text-2xl font-semibold leading-[.95] tracking-[-.045em]">ruang kecil untuk rasa ingin tahu yang besar.</p></div>
              </div>
            </div>
            <div>
              <div className="font-mono-brand text-[10px] uppercase tracking-[.18em] text-[#ff5a1f]">03 / siapa kami</div>
              <h2 className="mt-6 max-w-[700px] font-display text-[clamp(2.8rem,5.7vw,6rem)] font-semibold leading-[.9] tracking-[-.08em]">Bukan media besar. Justru itu <span className="text-[#1554c2]">serunya.</span></h2>
              <p className="mt-8 max-w-[550px] text-[17px] leading-[1.55] text-[#162338]/75">Majang Mejeng lahir dari kebiasaan menunjuk hal-hal kecil sambil bilang, “Eh, lihat deh.” Kami bikin video, foto, dan catatan yang tidak buru-buru menjelaskan semuanya.</p>
              <div className="mt-10 grid max-w-[550px] grid-cols-2 gap-4 border-y border-[#162338]/25 py-6 sm:grid-cols-3">
                <div><div className="font-display text-4xl font-bold tracking-[-.08em]">02</div><div className="mt-1 font-mono-brand text-[9px] uppercase tracking-[.08em] text-[#162338]/55">kota utama</div></div>
                <div><div className="font-display text-4xl font-bold tracking-[-.08em]">1.7k</div><div className="mt-1 font-mono-brand text-[9px] uppercase tracking-[.08em] text-[#162338]/55">rasa penasaran</div></div>
                <div><div className="font-display text-4xl font-bold tracking-[-.08em]">∞</div><div className="mt-1 font-mono-brand text-[9px] uppercase tracking-[.08em] text-[#162338]/55">kemungkinan</div></div>
              </div>
              <div className="mt-7 flex items-center gap-2 font-mono-brand text-[10px] uppercase tracking-[.12em] text-[#162338]/60"><MapPin size={15} className="text-[#ff5a1f]" /> berbasis di Yogyakarta, berkeliling seperlunya</div>
            </div>
          </div>
        </div>
      </section>

      <section id="kontak" className="scroll-mt-20 overflow-hidden bg-[#1554c2] px-4 py-20 text-[#f8f0dc] sm:px-8 sm:py-28 lg:px-10" data-testid="section-contact">
        <div className="relative mx-auto max-w-[1440px]">
          <div className="absolute -right-20 -top-28 h-80 w-80 rounded-full border-[38px] border-[#f4d814]/70" />
          <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_.7fr] lg:items-end">
            <div>
              <div className="font-mono-brand text-[10px] uppercase tracking-[.18em] text-[#f4d814]">04 / mari ngobrol</div>
              <h2 className="mt-6 max-w-[900px] font-display text-[clamp(4rem,10vw,10rem)] font-bold leading-[.78] tracking-[-.11em]">punya<br /><span className="text-[#f4d814]">cerita?</span></h2>
            </div>
            <div className="max-w-[350px] lg:pb-3">
              <p className="text-[17px] leading-[1.45] text-[#f8f0dc]/85">Mau berbagi tempat, kenalan, atau ide yang belum sempat jadi? Kotak masuk kami terbuka.</p>
              <a href={socials.mail} data-testid="link-contact-email" className="focus-ring editorial-link group mt-7 inline-flex items-center gap-3 font-bold transition-colors hover:text-[#f4d814]">halo@majangmejeng.studio <Mail size={17} className="transition-transform group-hover:rotate-12" /></a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#162338] px-4 py-10 text-[#f8f0dc] sm:px-8 lg:px-10" data-testid="footer-site">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-10 border-b border-[#f8f0dc]/20 pb-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_.8fr_.8fr]">
            <div>
              <a href="#atas" data-testid="link-footer-brand" className="focus-ring group inline-block" aria-label="Kembali ke beranda"><img src="/majang-mejeng-logo.png" alt="Majang Mejeng" className="w-[168px] transition-transform duration-300 group-hover:-rotate-2" data-testid="img-footer-logo" /></a>
              <p className="mt-4 max-w-[270px] text-sm leading-[1.45] text-[#f8f0dc]/55">Media sosial untuk hal-hal yang terlalu menarik untuk dilewatkan.</p>
            </div>
            <div><div className="font-mono-brand text-[10px] uppercase tracking-[.15em] text-[#f4d814]">temui kami</div><div className="mt-4 grid gap-2 text-sm"><a href={socials.instagram} target="_blank" rel="noreferrer" data-testid="link-footer-instagram" className="focus-ring flex items-center gap-2 text-[#f8f0dc]/70 transition-colors hover:text-[#f4d814]"><Instagram size={15} /> Instagram</a><a href={socials.tiktok} target="_blank" rel="noreferrer" data-testid="link-footer-tiktok" className="focus-ring flex items-center gap-2 text-[#f8f0dc]/70 transition-colors hover:text-[#f4d814]"><Music2 size={15} /> TikTok</a></div></div>
            <div><div className="font-mono-brand text-[10px] uppercase tracking-[.15em] text-[#f4d814]">lompat ke</div><div className="mt-4 grid gap-2 text-sm">{navItems.map((item) => <a key={item.href} href={item.href} data-testid={`link-footer-${item.label}`} className="focus-ring text-[#f8f0dc]/70 transition-colors hover:text-[#f4d814]">{item.label}</a>)}</div></div>
          </div>
          <div className="flex flex-col justify-between gap-3 pt-6 font-mono-brand text-[9px] uppercase tracking-[.14em] text-[#f8f0dc]/40 sm:flex-row"><span>© 2025 majang mejeng</span><span>dibuat dengan rasa penasaran</span><a href={socials.mail} data-testid="link-footer-email" className="focus-ring transition-colors hover:text-[#f4d814]">email kami</a></div>
        </div>
      </footer>
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;