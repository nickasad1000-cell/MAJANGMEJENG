import { useState, type ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const nav = [
  { href: '/cerita', label: 'Cerita' },
  { href: '/jasa', label: 'Jasa' },
  { href: '/hasil-kerja', label: 'Hasil Kerja' },
  { href: '/tentang-kami', label: 'Tentang Kami' },
];

export function SiteShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  return (
    <div className="site-noise min-h-[100dvh]">
      <header className="sticky top-0 z-40 border-b border-foreground/10 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-[1360px] items-center justify-between px-5 lg:px-10">
          <Link href="/" className="group flex items-center gap-3" data-testid="link-home">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground transition-transform group-hover:rotate-[-12deg]">mm</span>
            <span className="font-display text-[1.25rem] font-semibold tracking-[-.04em]">Majang Mejeng</span>
          </Link>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Navigasi utama">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`} className={`text-sm transition-colors hover:text-secondary ${location.startsWith(item.href) ? 'font-semibold text-secondary' : 'text-foreground/70'}`}>
                {item.label}
              </Link>
            ))}
            <Link href="/titipkan-cerita" data-testid="link-submit-story" className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground transition-transform hover:-translate-y-0.5">
              Titipkan Cerita <ArrowUpRight size={15} />
            </Link>
          </nav>
          <button type="button" onClick={() => setOpen(!open)} className="rounded-full border border-foreground/20 p-2 md:hidden" aria-label={open ? 'Tutup menu' : 'Buka menu'} data-testid="button-menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {open && (
          <div className="border-t border-foreground/10 bg-background px-5 py-5 md:hidden">
            <nav className="mx-auto flex max-w-[1360px] flex-col gap-4" aria-label="Navigasi mobile">
              {nav.map((item) => <Link key={item.href} onClick={() => setOpen(false)} href={item.href} className="font-display text-2xl" data-testid={`link-mobile-${item.label.toLowerCase().replaceAll(' ', '-')}`}>{item.label}</Link>)}
              <Link onClick={() => setOpen(false)} href="/titipkan-cerita" className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-4 py-2 font-semibold" data-testid="link-mobile-submit">Titipkan Cerita <ArrowUpRight size={15} /></Link>
            </nav>
          </div>
        )}
      </header>
      <main>{children}</main>
      <footer className="bg-primary px-5 py-14 text-primary-foreground lg:px-10">
        <div className="mx-auto grid max-w-[1360px] gap-12 md:grid-cols-[1.2fr_.8fr_.8fr]">
          <div><div className="mb-5 flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-secondary font-bold text-secondary-foreground">mm</span><span className="font-display text-2xl">Majang Mejeng</span></div><p className="max-w-sm text-sm leading-6 text-primary-foreground/65">Studio media dan kreatif dari Lumajang. Membuat cerita lokal punya tempat untuk tumbuh.</p></div>
          <div><p className="eyebrow mb-5 text-accent">Jelajah</p><div className="flex flex-col gap-3 text-sm text-primary-foreground/75">{nav.slice(0, 3).map((item) => <Link key={item.href} href={item.href} className="hover:text-accent">{item.label}</Link>)}</div></div>
          <div><p className="eyebrow mb-5 text-accent">Buka percakapan</p><p className="mb-3 text-sm text-primary-foreground/75">Punya proyek, atau cerita yang ingin dibagi?</p><Link href="/jasa" className="font-display text-xl text-accent hover:underline" data-testid="link-footer-brief">Mulai Brief <ArrowUpRight className="inline" size={18} /></Link></div>
        </div>
        <div className="mx-auto mt-14 flex max-w-[1360px] justify-between border-t border-primary-foreground/15 pt-5 text-xs text-primary-foreground/45"><span>© 2024 Majang Mejeng</span><span>Lumajang, Jawa Timur</span></div>
      </footer>
    </div>
  );
}