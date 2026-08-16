import { type ReactNode, useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, Instagram, Mail, MapPin, Menu, Music2, Play, Plus, X } from 'lucide-react';
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

const logoSrc = '/majang-mejeng-logo.png';

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
    color: 'bg-[#d8ff3e]',
    textColor: 'text-[#2b174e]',
    href: socials.tiktok,
  },
  {
    id: '02',
    type: 'catatan jalan',
    title: 'Mencari suara kota setelah hujan reda.',
    note: 'Dari Malioboro sampai gang kecil di Kotabaru.',
    color: 'bg-[#ef3e87]',
    textColor: 'text-[#f7f0df]',
    href: socials.instagram,
  },
  {
    id: '03',
    type: 'orang-orang',
    title: 'Kenalan dengan yang bikin kota terus bergerak.',
    note: 'Bukan profil. Lebih mirip obrolan panjang.',
    color: 'bg-[#1f9d91]',
    textColor: 'text-[#f7f0df]',
    href: socials.instagram,
  },
];

function SocialMark({ type }: { type: 'instagram' | 'tiktok' }) {
  return type === 'instagram' ? <Instagram size={17} strokeWidth={1.8} /> : <Music2 size={17} strokeWidth={1.8} />;
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('cerita');

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter((section): section is Element => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: '-30% 0px -55% 0px' },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="min-h-[100dvh] bg-[#f7f0df] text-[#2b174e]">
      <div className="pointer-events-none fixed inset-0 z-40 border-[10px] border-[#2b174e]/[0.04]" />

      <header className="fixed left-0 right-0 top-0 z-30 px-4 pt-4 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between rounded-[5px] border border-[#f7f0df]/20 bg-[#2b174e]/95 px-4 py-3 text-[#f7f0df] shadow-[0_10px_35px_rgba(43,23,78,.15)] backdrop-blur-md sm:px-5">
          <a href="#atas" data-testid="link-brand" className="group flex items-center gap-2.5" onClick={closeMenu}>
            <img
              src={logoSrc}
              alt="Majang Mejeng"
              className="w-[118px] transition-transform duration-300 group-hover:rotate-[-2deg] sm:w-[138px]"
              data-testid="img-header-logo"
            />
          </a>
          <nav aria-label="Navigasi utama" className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                data-testid={`link-nav-${item.label}`}
                className={`font-mono-brand text-[10px] uppercase tracking-[0.16em] transition-colors hover:text-[#d8ff3e] ${activeSection === item.href.slice(1) ? 'text-[#d8ff3e]' : 'text-[#f7f0df]/65'}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href={socials.instagram} target="_blank" rel="noreferrer" data-testid="link-header-instagram" aria-label="Buka Instagram Majang Mejeng" className="hidden h-8 w-8 items-center justify-center rounded-full border border-[#f7f0df]/25 transition-colors hover:border-[#d8ff3e] hover:bg-[#d8ff3e] hover:text-[#2b174e] sm:flex">
              <Instagram size={15} />
            </a>
            <a href={socials.tiktok} target="_blank" rel="noreferrer" data-testid="link-header-tiktok" aria-label="Buka TikTok Majang Mejeng" className="hidden h-8 w-8 items-center justify-center rounded-full border border-[#f7f0df]/25 transition-colors hover:border-[#d8ff3e] hover:bg-[#d8ff3e] hover:text-[#2b174e] sm:flex">
              <Music2 size={15} />
            </a>
            <button type="button" data-testid="button-menu" aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)} className="flex h-8 w-8 items-center justify-center rounded-full border border-[#f7f0df]/25 transition-colors hover:border-[#d8ff3e] hover:bg-[#d8ff3e] hover:text-[#2b174e] md:hidden">
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="mx-auto mt-2 max-w-[1440px] rounded-[5px] border border-[#f7f0df]/20 bg-[#2b174e] p-5 text-[#f7f0df] md:hidden">
            <nav aria-label="Navigasi mobile" className="grid gap-1">
              {navItems.map((item, index) => (
                <a key={item.href} href={item.href} data-testid={`link-mobile-nav-${item.label}`} onClick={closeMenu} className="flex items-center justify-between border-b border-[#f7f0df]/15 py-3 font-display text-2xl font-semibold">
                  <span><span className="mr-3 font-mono-brand text-[10px] text-[#d8ff3e]">0{index + 1}</span>{item.label}</span>
                  <ArrowUpRight size={18} className="text-[#d8ff3e]" />
                </a>
              ))}
            </nav>
            <div className="mt-5 flex gap-2">
              <a href={socials.instagram} target="_blank" rel="noreferrer" data-testid="link-mobile-instagram" className="flex flex-1 items-center justify-center gap-2 rounded-[3px] bg-[#d8ff3e] py-2.5 text-xs font-bold text-[#2b174e]"><Instagram size={14} /> Instagram</a>
              <a href={socials.tiktok} target="_blank" rel="noreferrer" data-testid="link-mobile-tiktok" className="flex flex-1 items-center justify-center gap-2 rounded-[3px] border border-[#f7f0df]/30 py-2.5 text-xs font-bold"><Music2 size={14} /> TikTok</a>
            </div>
          </div>
        )}
      </header>

      <section id="atas" className="relative overflow-hidden bg-[#2b174e] px-4 pb-16 pt-32 text-[#f7f0df] sm:px-8 sm:pb-24 sm:pt-40 lg:px-10 lg:pb-28" data-testid="section-hero">
        <div className="absolute -right-20 top-20 h-72 w-72 rounded-full bg-[#ef3e87] blur-[1px] sm:h-96 sm:w-96" />
        <div className="absolute -bottom-24 left-1/3 h-60 w-60 rounded-full border-[35px] border-[#1f9d91]/80" />
        <div className="relative mx-auto grid max-w-[1440px] items-end gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          <div className="relative z-10">
            <div className="reveal mb-8 flex items-center gap-3 font-mono-brand text-[10px] uppercase tracking-[0.18em] text-[#d8ff3e]">
              <span className="h-2 w-2 rounded-full bg-[#d8ff3e]" /> media sosial dari jogja / jakarta
            </div>
            <h1 className="reveal reveal-delay-1 max-w-[760px] font-display text-[clamp(4.8rem,12.8vw,12.5rem)] font-bold leading-[.78] tracking-[-0.085em]">
              <span className="block text-[#d8ff3e]">nggak</span>
              <span className="relative block pl-[.18em] text-[#f7f0df] after:absolute after:bottom-[.06em] after:left-0 after:h-[.09em] after:w-[.76em] after:bg-[#ef3e87] after:content-['']">cuma</span>
              <span className="block text-[#ef3e87]">scroll.</span>
            </h1>
            <p className="reveal reveal-delay-2 mt-10 max-w-[470px] text-[17px] leading-[1.5] text-[#f7f0df]/75 sm:text-[19px]">
              Cerita, orang, dan kejadian kecil yang bikin kota terasa dekat. Majang Mejeng adalah ruang digital untuk melihat Indonesia dari jarak yang lebih manusia.
            </p>
            <div className="reveal reveal-delay-3 mt-8 flex flex-wrap gap-3">
              <a href="#konten" data-testid="link-hero-content" className="group flex items-center gap-3 rounded-[3px] bg-[#d8ff3e] px-5 py-3 text-sm font-bold text-[#2b174e] transition-transform hover:-translate-y-1">
                lihat yang baru <ArrowDown size={16} className="transition-transform group-hover:translate-y-1" />
              </a>
              <a href={socials.instagram} target="_blank" rel="noreferrer" data-testid="link-hero-instagram" className="flex items-center gap-2 rounded-[3px] border border-[#f7f0df]/30 px-5 py-3 text-sm font-semibold transition-colors hover:border-[#d8ff3e] hover:text-[#d8ff3e]">
                <Instagram size={16} /> @majangmejeng_
              </a>
            </div>
          </div>
          <div className="reveal reveal-delay-2 relative mx-auto w-full max-w-[590px] lg:mb-1">
            <div className="absolute -left-3 -top-5 z-10 rotate-[-6deg] bg-[#d8ff3e] px-3 py-2 font-mono-brand text-[10px] font-medium uppercase tracking-[.12em] text-[#2b174e] shadow-[5px_5px_0_#ef3e87]">volume 01 / 2024—25</div>
            <div className="relative aspect-[4/3] rotate-[2deg] overflow-hidden border-[7px] border-[#f7f0df] bg-[#ef3e87] shadow-[14px_16px_0_#1f9d91]">
              <img src="/majang-editorial-collage.png" alt="Kolase editorial Majang Mejeng" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" data-testid="img-hero-collage" />
              <div className="absolute bottom-3 left-3 bg-[#2b174e] px-3 py-2 font-mono-brand text-[9px] uppercase tracking-[.12em] text-[#d8ff3e]">dibuat dekat, bukan jauh</div>
            </div>
            <div className="absolute -bottom-10 -right-4 z-10 flex h-24 w-24 rotate-[9deg] items-center justify-center rounded-full bg-[#ef3e87] text-center font-display text-[14px] font-bold leading-[.95] text-[#f7f0df] shadow-[5px_5px_0_#d8ff3e] sm:h-28 sm:w-28">ikuti<br />ceritanya</div>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-[#2b174e] bg-[#d8ff3e] py-3 text-[#2b174e]" aria-hidden="true">
        <div className="marquee-track flex w-max items-center font-display text-[20px] font-bold uppercase tracking-[-.03em] sm:text-[25px]">
          <span className="px-4">orang biasa / cerita luar biasa</span><Plus size={17} /><span className="px-4">jogja • jakarta • di mana saja</span><Plus size={17} /><span className="px-4">orang biasa / cerita luar biasa</span><Plus size={17} /><span className="px-4">jogja • jakarta • di mana saja</span><Plus size={17} />
        </div>
      </div>

      <section id="cerita" className="scroll-mt-20 px-4 py-20 sm:px-8 sm:py-28 lg:px-10" data-testid="section-story">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-12 lg:grid-cols-[.34fr_1fr] lg:gap-20">
            <div>
              <div className="font-mono-brand text-[10px] uppercase tracking-[.18em] text-[#ef3e87]">01 / kenapa kami ada</div>
              <div className="mt-7 hidden font-display text-[10rem] font-bold leading-none tracking-[-.1em] text-[#2b174e]/10 lg:block">01</div>
            </div>
            <div>
              <h2 className="max-w-[900px] font-display text-[clamp(2.8rem,6vw,6.6rem)] font-semibold leading-[.9] tracking-[-.075em] text-balance">Kota punya banyak suara. Kami <span className="text-[#ef3e87]">mendengarkan</span> yang sering kelewat.</h2>
              <div className="mt-10 grid gap-8 border-t border-[#2b174e]/25 pt-8 sm:grid-cols-2">
                <p className="max-w-[360px] text-[17px] leading-[1.55] text-[#2b174e]/75">Kami tidak sedang mencari hal paling viral. Kami mencari alasan kenapa orang berhenti di satu tempat, menoleh ke satu arah, lalu pulang dengan cerita baru.</p>
                <p className="max-w-[360px] text-[17px] leading-[1.55] text-[#2b174e]/75">Di Instagram dan TikTok, kami membagikan potongan kecil dari hidup yang terasa familiar: makanan, musik, ruang, dan orang-orang yang membuat kota terus bernapas.</p>
              </div>
              <a href={socials.tiktok} target="_blank" rel="noreferrer" data-testid="link-story-tiktok" className="group mt-10 inline-flex items-center gap-3 border-b-2 border-[#2b174e] pb-2 text-sm font-bold transition-colors hover:border-[#ef3e87] hover:text-[#ef3e87]">lihat kami bergerak <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a>
            </div>
          </div>
        </div>
      </section>

      <section id="konten" className="scroll-mt-20 bg-[#2b174e] px-4 py-20 text-[#f7f0df] sm:px-8 sm:py-28 lg:px-10" data-testid="section-content">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="font-mono-brand text-[10px] uppercase tracking-[.18em] text-[#d8ff3e]">02 / isi kepala kami</div>
              <h2 className="mt-4 font-display text-[clamp(3.4rem,8vw,8rem)] font-bold leading-[.8] tracking-[-.09em]">yang lagi<br /><span className="text-[#ef3e87]">mejeng.</span></h2>
            </div>
            <p className="max-w-[270px] text-sm leading-[1.5] text-[#f7f0df]/65">Tiga pintu masuk. Satu rasa penasaran. Pilih yang paling dekat dengan harimu.</p>
          </div>
          <div className="grid gap-4 lg:grid-cols-[1.15fr_.85fr]">
            <a href={contentItems[0].href} target="_blank" rel="noreferrer" data-testid="card-content-01" className={`group relative min-h-[440px] overflow-hidden rounded-[3px] p-6 ${contentItems[0].color} ${contentItems[0].textColor} sm:p-9`}>
              <div className="absolute right-7 top-7 flex h-14 w-14 items-center justify-center rounded-full border-2 border-current transition-transform duration-500 group-hover:rotate-45"><ArrowUpRight size={23} /></div>
              <div className="absolute bottom-0 right-0 h-[72%] w-[60%] overflow-hidden sm:w-[52%]"><img src="/majang-film-still.png" alt="Suasana produksi konten Majang Mejeng" className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0" data-testid="img-content-film" /></div>
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="font-mono-brand text-[10px] uppercase tracking-[.15em]">/ {contentItems[0].type}</div>
                <div className="max-w-[440px]"><div className="mb-4 font-mono-brand text-xs">[{contentItems[0].id}]</div><h3 className="font-display text-[clamp(2rem,4vw,4.5rem)] font-bold leading-[.88] tracking-[-.07em]">{contentItems[0].title}</h3><p className="mt-5 max-w-[250px] text-sm leading-[1.4] opacity-70">{contentItems[0].note}</p></div>
              </div>
            </a>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {contentItems.slice(1).map((item) => (
                <a key={item.id} href={item.href} target="_blank" rel="noreferrer" data-testid={`card-content-${item.id}`} className={`group relative flex min-h-[215px] flex-col justify-between overflow-hidden rounded-[3px] p-6 ${item.color} ${item.textColor} sm:p-7`}>
                  <div className="flex items-start justify-between font-mono-brand text-[10px] uppercase tracking-[.15em]"><span>/ {item.type}</span><ArrowUpRight size={19} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" /></div>
                  <div><div className="mb-3 font-mono-brand text-xs">[{item.id}]</div><h3 className="max-w-[570px] font-display text-[clamp(1.8rem,3vw,3rem)] font-bold leading-[.9] tracking-[-.06em]">{item.title}</h3><p className="mt-3 text-sm opacity-70">{item.note}</p></div>
                </a>
              ))}
            </div>
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-[#f7f0df]/20 pt-5">
            <div className="flex items-center gap-3 font-mono-brand text-[10px] uppercase tracking-[.13em] text-[#f7f0df]/55"><Play size={14} className="fill-[#d8ff3e] text-[#d8ff3e]" /> konten baru tiap minggu, kalau sempat</div>
            <a href={socials.instagram} target="_blank" rel="noreferrer" data-testid="link-content-instagram" className="text-sm font-bold text-[#d8ff3e] transition-colors hover:text-[#ef3e87]">buka arsip Instagram <ArrowUpRight className="ml-1 inline" size={15} /></a>
          </div>
        </div>
      </section>

      <section id="tentang" className="scroll-mt-20 px-4 py-20 sm:px-8 sm:py-28 lg:px-10" data-testid="section-about">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:gap-20">
            <div className="relative min-h-[420px] overflow-hidden rounded-[3px] bg-[#ef3e87] p-7 sm:min-h-[500px] sm:p-9">
              <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full border-[30px] border-[#d8ff3e]" />
              <div className="absolute bottom-[-90px] left-[-70px] h-64 w-64 rounded-full border-[23px] border-[#2b174e]" />
              <div className="relative z-10 flex h-full flex-col justify-between text-[#2b174e]">
                <div className="flex justify-between font-mono-brand text-[10px] uppercase tracking-[.14em]"><span>est. di internet</span><span>02—25</span></div>
                <div><div className="mb-5 font-display text-[7.5rem] font-bold leading-[.7] tracking-[-.12em] sm:text-[10rem]">mm<span className="text-[#d8ff3e]">.</span></div><p className="max-w-[270px] font-display text-2xl font-semibold leading-[.95] tracking-[-.045em]">ruang kecil untuk rasa ingin tahu yang besar.</p></div>
              </div>
            </div>
            <div>
              <div className="font-mono-brand text-[10px] uppercase tracking-[.18em] text-[#ef3e87]">03 / siapa kami</div>
              <h2 className="mt-6 max-w-[680px] font-display text-[clamp(2.8rem,5.7vw,6rem)] font-semibold leading-[.9] tracking-[-.075em]">Bukan media besar. Justru itu <span className="text-[#1f9d91]">serunya.</span></h2>
              <p className="mt-8 max-w-[530px] text-[17px] leading-[1.55] text-[#2b174e]/75">Majang Mejeng lahir dari kebiasaan menunjuk hal-hal kecil sambil bilang, “Eh, lihat deh.” Kami bikin video, foto, dan catatan yang tidak buru-buru menjelaskan semuanya.</p>
              <div className="mt-10 grid max-w-[530px] grid-cols-2 gap-4 border-y border-[#2b174e]/25 py-6 sm:grid-cols-3">
                <div><div className="font-display text-4xl font-bold tracking-[-.08em]">02</div><div className="mt-1 font-mono-brand text-[9px] uppercase tracking-[.08em] text-[#2b174e]/55">kota utama</div></div>
                <div><div className="font-display text-4xl font-bold tracking-[-.08em]">1.7k</div><div className="mt-1 font-mono-brand text-[9px] uppercase tracking-[.08em] text-[#2b174e]/55">rasa penasaran</div></div>
                <div><div className="font-display text-4xl font-bold tracking-[-.08em]">∞</div><div className="mt-1 font-mono-brand text-[9px] uppercase tracking-[.08em] text-[#2b174e]/55">kemungkinan</div></div>
              </div>
              <div className="mt-7 flex items-center gap-2 font-mono-brand text-[10px] uppercase tracking-[.12em] text-[#2b174e]/60"><MapPin size={15} className="text-[#ef3e87]" /> berbasis di Yogyakarta, berkeliling seperlunya</div>
            </div>
          </div>
        </div>
      </section>

      <section id="kontak" className="scroll-mt-20 overflow-hidden bg-[#d8ff3e] px-4 py-20 text-[#2b174e] sm:px-8 sm:py-28 lg:px-10" data-testid="section-contact">
        <div className="relative mx-auto max-w-[1440px]">
          <div className="absolute -right-20 -top-28 h-80 w-80 rounded-full border-[38px] border-[#ef3e87]/60" />
          <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_.7fr] lg:items-end">
            <div>
              <div className="font-mono-brand text-[10px] uppercase tracking-[.18em]">04 / mari ngobrol</div>
              <h2 className="mt-6 max-w-[850px] font-display text-[clamp(4rem,10vw,10rem)] font-bold leading-[.78] tracking-[-.1em]">punya<br /><span className="text-[#ef3e87]">cerita?</span></h2>
            </div>
            <div className="max-w-[330px] lg:pb-3">
              <p className="text-[17px] leading-[1.45]">Mau berbagi tempat, kenalan, atau ide yang belum sempat jadi? Kotak masuk kami terbuka.</p>
              <a href={socials.mail} data-testid="link-contact-email" className="group mt-7 inline-flex items-center gap-3 border-b-2 border-[#2b174e] pb-2 font-bold transition-colors hover:border-[#ef3e87] hover:text-[#ef3e87]">halo@majangmejeng.studio <Mail size={17} className="transition-transform group-hover:rotate-12" /></a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#2b174e] px-4 py-10 text-[#f7f0df] sm:px-8 lg:px-10" data-testid="footer-site">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-10 border-b border-[#f7f0df]/20 pb-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_.8fr_.8fr]">
            <div>
              <a href="#atas" data-testid="link-footer-brand" className="group inline-block" aria-label="Kembali ke beranda">
                <img src={logoSrc} alt="Majang Mejeng" className="w-[168px] transition-transform duration-300 group-hover:rotate-[-2deg]" data-testid="img-footer-logo" />
              </a>
              <p className="mt-4 max-w-[250px] text-sm leading-[1.45] text-[#f7f0df]/55">Media sosial untuk hal-hal yang terlalu menarik untuk dilewatkan.</p>
            </div>
            <div><div className="font-mono-brand text-[10px] uppercase tracking-[.15em] text-[#d8ff3e]">temui kami</div><div className="mt-4 grid gap-2 text-sm"><a href={socials.instagram} target="_blank" rel="noreferrer" data-testid="link-footer-instagram" className="flex items-center gap-2 text-[#f7f0df]/70 transition-colors hover:text-[#d8ff3e]"><Instagram size={15} /> Instagram</a><a href={socials.tiktok} target="_blank" rel="noreferrer" data-testid="link-footer-tiktok" className="flex items-center gap-2 text-[#f7f0df]/70 transition-colors hover:text-[#d8ff3e]"><Music2 size={15} /> TikTok</a></div></div>
            <div><div className="font-mono-brand text-[10px] uppercase tracking-[.15em] text-[#d8ff3e]">lompat ke</div><div className="mt-4 grid gap-2 text-sm">{navItems.slice(0, 3).map((item) => <a key={item.href} href={item.href} data-testid={`link-footer-${item.label}`} className="text-[#f7f0df]/70 transition-colors hover:text-[#d8ff3e]">{item.label}</a>)}</div></div>
          </div>
          <div className="flex flex-col justify-between gap-3 pt-6 font-mono-brand text-[9px] uppercase tracking-[.14em] text-[#f7f0df]/40 sm:flex-row"><span>© 2025 majang mejeng</span><span>dibuat dengan rasa penasaran</span><a href={socials.mail} data-testid="link-footer-email" className="transition-colors hover:text-[#d8ff3e]">email kami</a></div>
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