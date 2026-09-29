import { type FormEvent, type ReactNode, useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowUpRight, ChevronRight, Clock3, Menu, Moon, Search, Sparkles, Sun, X } from 'lucide-react';
import { Link, Route, Switch, Router as WouterRouter, useLocation, useParams } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { allContent, articles, categories, rankings, trending, type Article, type Ranking } from '@/content';
import { AdSenseScript } from '@/lib/adsense';

const queryClient = new QueryClient();
const artBackground: Record<string, string> = {
  coral: 'linear-gradient(135deg, #ec7351 0%, #a83e35 48%, #e4d45a 100%)',
  teal: 'linear-gradient(135deg, #173f47 0%, #3d8c9b 48%, #d8df9a 100%)',
  violet: 'linear-gradient(135deg, #48446f 0%, #7d6da4 48%, #d9a45a 100%)',
  ochre: 'linear-gradient(135deg, #b66b36 0%, #e1a34b 50%, #3a6a67 100%)',
  lime: 'linear-gradient(135deg, #91a83f 0%, #d9df76 48%, #e67250 100%)',
  indigo: 'linear-gradient(135deg, #202b61 0%, #596cb5 52%, #efb26d 100%)',
  rose: 'linear-gradient(135deg, #7f3347 0%, #d17c86 48%, #f1cf8a 100%)',
  ocean: 'linear-gradient(135deg, #0b4f62 0%, #2ca1a0 48%, #d3e598 100%)',
  plum: 'linear-gradient(135deg, #402341 0%, #9b547e 48%, #e9ac69 100%)',
  graphite: 'linear-gradient(135deg, #22262d 0%, #66717c 50%, #d69a61 100%)',
};
const artPalettes = Object.values(artBackground);

function paletteForLabel(label: string) {
  const hash = [...label].reduce((total, character) => (total * 31 + character.charCodeAt(0)) >>> 0, 7);
  return artPalettes[hash % artPalettes.length];
}

function motifForLabel(label: string) {
  return [...label].reduce((total, character) => (total * 31 + character.charCodeAt(0)) >>> 0, 7) % 4;
}

function Meta({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = `${title} — TOP 10 WORLD`;
    const setMeta = (selector: string, value: string, attr = 'content') => {
      let node = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!node) { node = document.createElement('meta'); document.head.appendChild(node); }
      node.setAttribute(attr, value);
    };
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', `${title} — TOP 10 WORLD`);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[name="twitter:card"]', 'summary_large_image');
    setMeta('meta[property="og:type"]', 'website');
    setMeta('meta[property="og:url"]', window.location.href);
    setMeta('meta[name="twitter:title"]', `${title} — TOP 10 WORLD`);
    setMeta('meta[name="twitter:description"]', description);
    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `${window.location.origin}${window.location.pathname}`;
    const existingSchema = document.head.querySelector('script[data-top10-schema]');
    existingSchema?.remove();
    const schema = document.createElement('script');
    schema.type = 'application/ld+json';
    schema.dataset.top10Schema = 'true';
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'TOP 10 WORLD',
      url: window.location.origin,
      description,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${window.location.origin}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    });
    document.head.appendChild(schema);
  }, [title, description]);
  return null;
}

function EditorialArt({ art, label, className = '', image, imageAlt, variant }: { art: string; label: string; className?: string; image?: string; imageAlt?: string; variant?: string }) {
  const motif = variant ? motifForLabel(variant) : 0;
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: variant ? paletteForLabel(variant) : artBackground[art] ?? artBackground.coral }} aria-label={imageAlt ?? label} role="img">
      {image ? <img src={image} alt={imageAlt ?? label} width="900" height="1125" loading="lazy" className="absolute inset-0 h-full w-full object-cover" /> : <>
        {motif === 0 && <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border-[22px] border-[hsl(var(--card)/.28)]" />}
        {motif === 1 && <div className="absolute -right-10 top-8 h-48 w-28 rotate-45 border-[18px] border-[hsl(var(--card)/.25)]" />}
        {motif === 2 && <div className="absolute inset-x-[-20%] top-1/3 h-20 rotate-[-18deg] border-y-[3px] border-[hsl(var(--card)/.28)] shadow-[0_18px_0_hsl(var(--card)/.12),0_-18px_0_hsl(var(--card)/.12)]" />}
        {motif === 3 && <div className="absolute -bottom-16 -left-8 h-48 w-48 rounded-full border-[24px] border-[hsl(var(--card)/.28)] shadow-[70px_-45px_0_-20px_hsl(var(--card)/.16)]" />}
        <div className="absolute bottom-[-18%] left-[8%] h-3/4 w-1/2 rotate-12 rounded-[45%] border-[2px] border-[hsl(var(--card)/.35)]" />
        <div className="absolute left-5 top-5 font-editorial text-5xl uppercase text-[hsl(var(--card)/.78)]">{variant ? variant.split(/\s+/).map((word) => word[0]).join('').slice(0, 3) : '10'}</div>
      </>}
      <span className="absolute bottom-4 left-4 max-w-[80%] font-mono-editorial text-[10px] uppercase tracking-[.18em] text-[hsl(var(--card)/.9)]">{label}</span>
    </div>
  );
}

function Header() {
  const [location, setLocation] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [dark, setDark] = useState(() => localStorage.getItem('top10-theme') === 'dark');
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('top10-theme', dark ? 'dark' : 'light');
  }, [dark]);
  useEffect(() => { setMenuOpen(false); setSearchOpen(false); }, [location]);
  const submitSearch = (event: FormEvent) => {
    event.preventDefault();
    if (query.trim()) setLocation(`/search?q=${encodeURIComponent(query.trim())}`);
  };
  const nav = [
    ['/top10', 'Rankings'], ['/articles', 'Essays'], ['/categories', 'Explore'], ['/trending', 'Trending'],
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-[hsl(var(--border)/.8)] bg-[hsl(var(--background)/.92)] backdrop-blur-md">
      <div className="mx-auto flex h-[70px] max-w-[1360px] items-center justify-between px-5 lg:px-10">
        <Link href="/" className="group flex items-center gap-3" data-testid="link-brand">
          <span className="grid h-9 w-9 place-items-center bg-[hsl(var(--primary))] font-serif text-lg text-[hsl(var(--primary-foreground))] transition-transform group-hover:rotate-6">10</span>
          <span className="font-mono-editorial text-[11px] font-medium uppercase tracking-[.16em]">Top 10<br />World</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {nav.map(([href, label]) => <Link key={href} href={href} className={`font-mono-editorial text-[11px] uppercase tracking-[.14em] transition-colors hover:text-[hsl(var(--primary))] ${location === href ? 'text-[hsl(var(--primary))]' : ''}`} data-testid={`link-nav-${label.toLowerCase()}`}>{label}</Link>)}
        </nav>
        <div className="flex items-center gap-1">
          <button type="button" onClick={() => setSearchOpen((open) => !open)} className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-[hsl(var(--muted))]" aria-label="Open search" data-testid="button-open-search"><Search size={18} strokeWidth={1.8} /></button>
          <button type="button" onClick={() => setDark((value) => !value)} className="hidden h-10 w-10 place-items-center rounded-full transition-colors hover:bg-[hsl(var(--muted))] sm:grid" aria-label="Toggle color theme" data-testid="button-theme">{dark ? <Sun size={17} /> : <Moon size={17} />}</button>
          <button type="button" onClick={() => setMenuOpen((open) => !open)} className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-[hsl(var(--muted))] md:hidden" aria-label="Toggle navigation" data-testid="button-mobile-menu">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </div>
      {searchOpen && <form onSubmit={submitSearch} className="border-t border-[hsl(var(--border)/.8)] px-5 py-4 md:px-10" data-testid="form-header-search">
        <div className="mx-auto flex max-w-[1360px] items-center gap-3">
          <Search size={18} className="text-[hsl(var(--muted-foreground))]" />
          <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} className="w-full bg-transparent font-editorial text-xl outline-none placeholder:text-[hsl(var(--muted-foreground))]" placeholder="Search rankings, essays, and ideas" data-testid="input-header-search" />
          <span className="font-mono-editorial text-[10px] text-[hsl(var(--muted-foreground))]">Enter</span>
        </div>
      </form>}
      {menuOpen && <div className="border-t border-[hsl(var(--border)/.8)] bg-[hsl(var(--background))] px-5 py-5 md:hidden">
        <nav className="mx-auto grid max-w-[1360px] gap-1" aria-label="Mobile navigation">
          {nav.map(([href, label]) => <Link key={href} href={href} className="flex items-center justify-between border-b border-[hsl(var(--border)/.7)] py-4 font-editorial text-2xl" data-testid={`link-mobile-${label.toLowerCase()}`}>{label}<ChevronRight size={18} /></Link>)}
          <button type="button" onClick={() => setDark((value) => !value)} className="flex items-center justify-between py-4 text-left font-mono-editorial text-xs uppercase tracking-[.15em]" data-testid="button-mobile-theme">Switch to {dark ? 'light' : 'dark'} mode</button>
        </nav>
      </div>}
    </header>
  );
}

function Footer() {
  return <footer className="mt-24 bg-[hsl(var(--sidebar))] px-5 py-14 text-[hsl(var(--sidebar-foreground))] lg:px-10">
    <div className="mx-auto max-w-[1360px]">
      <div className="grid gap-12 border-b border-[hsl(var(--sidebar-border))] pb-14 lg:grid-cols-[1.1fr_.7fr_.7fr_1.3fr]">
        <div><div className="font-editorial text-4xl">Useful. Interesting.<br /><em>Worth your time.</em></div><p className="mt-5 max-w-xs text-sm leading-6 text-[hsl(var(--sidebar-foreground)/.65)]">TOP 10 WORLD is an independent editorial guide to the things that make a life richer.</p></div>
        <div><p className="eyebrow text-[hsl(var(--secondary))]">Explore</p><div className="mt-4 grid gap-3 text-sm text-[hsl(var(--sidebar-foreground)/.75)]"><Link href="/top10" data-testid="link-footer-rankings">Rankings</Link><Link href="/articles" data-testid="link-footer-essays">Essays</Link><Link href="/categories" data-testid="link-footer-categories">Categories</Link><Link href="/trending" data-testid="link-footer-trending">Trending</Link></div></div>
        <div><p className="eyebrow text-[hsl(var(--secondary))]">About</p><div className="mt-4 grid gap-3 text-sm text-[hsl(var(--sidebar-foreground)/.75)]"><Link href="/about" data-testid="link-footer-about">Our point of view</Link><Link href="/contact" data-testid="link-footer-contact">Contact the desk</Link><Link href="/privacy-policy" data-testid="link-footer-privacy">Privacy</Link><Link href="/terms" data-testid="link-footer-terms">Terms</Link></div></div>
        <div><p className="eyebrow text-[hsl(var(--secondary))]">The good stuff, occasionally</p><p className="mt-4 max-w-sm text-sm leading-6 text-[hsl(var(--sidebar-foreground)/.65)]">A concise dispatch of new rankings, smart ideas, and places worth going.</p><a href="mailto:hello@top10.world?subject=TOP%2010%20WORLD%20newsletter" className="mt-5 inline-flex border-b border-[hsl(var(--sidebar-foreground)/.45)] pb-2 font-mono-editorial text-[10px] uppercase tracking-[.12em] text-[hsl(var(--secondary))]" data-testid="link-newsletter-email">Email the desk to join</a></div>
      </div>
      <div className="flex flex-col justify-between gap-4 pt-6 font-mono-editorial text-[10px] uppercase tracking-[.12em] text-[hsl(var(--sidebar-foreground)/.5)] sm:flex-row"><span>© 2026 TOP 10 WORLD</span><span>Made for curious people, everywhere.</span></div>
    </div>
  </footer>;
}

function Layout({ children }: { children: ReactNode }) {
  const [cookie, setCookie] = useState(() => localStorage.getItem('top10-cookie') !== 'dismissed');
  return <div className="noise min-h-[100dvh]"><AdSenseScript /><Header /><main>{children}</main><Footer />{cookie && <div className="fixed bottom-4 left-4 right-4 z-30 flex flex-col gap-3 border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 shadow-xl sm:left-auto sm:max-w-md"><p className="text-xs leading-5 text-[hsl(var(--muted-foreground))]">We use essential cookies to keep this publication working. No behavioural advertising.</p><button type="button" onClick={() => { localStorage.setItem('top10-cookie', 'dismissed'); setCookie(false); }} className="self-start border-b border-[hsl(var(--primary))] font-mono-editorial text-[10px] uppercase tracking-[.12em]" data-testid="button-dismiss-cookie">Sounds good</button></div>}</div>;
}

function SectionHeading({ eyebrow, title, href, action = 'See all' }: { eyebrow: string; title: string; href?: string; action?: string }) {
  return <div className="mb-7 flex items-end justify-between gap-4"><div><p className="eyebrow text-[hsl(var(--primary))]">{eyebrow}</p><h2 className="mt-2 font-editorial text-4xl leading-none sm:text-5xl">{title}</h2></div>{href && <Link href={href} className="hidden items-center gap-2 border-b border-[hsl(var(--foreground)/.3)] pb-1 font-mono-editorial text-[10px] uppercase tracking-[.12em] sm:flex" data-testid={`link-section-${eyebrow.toLowerCase().replaceAll(' ', '-')}`}>{action}<ArrowUpRight size={13} /></Link>}</div>;
}

function RankingCard({ ranking, featured = false }: { ranking: Ranking; featured?: boolean }) {
  return <Link href={`/top10/${ranking.slug}`} className={`group block overflow-hidden border border-[hsl(var(--card-border))] bg-[hsl(var(--card))] hover-lift ${featured ? 'md:col-span-2' : ''}`} data-testid={`card-ranking-${ranking.slug}`}>
    <EditorialArt art={ranking.art} image={ranking.image} imageAlt={ranking.imageAlt} label={`${ranking.category} / ranking`} className={featured ? 'aspect-[16/8]' : 'aspect-[4/3]'} />
    <div className="p-5 sm:p-6"><div className="flex items-center justify-between gap-3"><span className="eyebrow text-[hsl(var(--primary))]">{ranking.category}</span><span className="font-mono-editorial text-[10px] text-[hsl(var(--muted-foreground))]">{ranking.readTime}</span></div><h3 className={`mt-3 font-editorial leading-[.98] transition-colors group-hover:text-[hsl(var(--primary))] ${featured ? 'text-4xl sm:text-6xl' : 'text-3xl'}`}>{ranking.title}</h3><p className="mt-4 max-w-xl text-sm leading-6 text-[hsl(var(--muted-foreground))]">{ranking.dek}</p><div className="mt-6 flex items-center justify-between border-t border-[hsl(var(--border))] pt-4 font-mono-editorial text-[10px] uppercase tracking-[.1em] text-[hsl(var(--muted-foreground))]"><span>By {ranking.byline}</span><span className="transition-transform group-hover:translate-x-1">Read ranking →</span></div></div>
  </Link>;
}

function ArticleCard({ article }: { article: Article }) {
  return <Link href={`/articles/${article.slug}`} className="group grid grid-cols-[108px_1fr] gap-4 border-t border-[hsl(var(--border))] py-5 sm:grid-cols-[160px_1fr] sm:gap-6" data-testid={`card-article-${article.slug}`}><EditorialArt art={article.art} image={article.image} imageAlt={article.imageAlt} label={article.category} className="aspect-square" /><div><div className="flex items-center gap-3"><span className="eyebrow text-[hsl(var(--primary))]">{article.category}</span><span className="font-mono-editorial text-[10px] text-[hsl(var(--muted-foreground))]">{article.readTime}</span></div><h3 className="mt-2 font-editorial text-2xl leading-tight transition-colors group-hover:text-[hsl(var(--primary))] sm:text-3xl">{article.title}</h3><p className="mt-2 hidden text-sm leading-6 text-[hsl(var(--muted-foreground))] sm:block">{article.dek}</p><p className="mt-4 font-mono-editorial text-[10px] uppercase tracking-[.1em] text-[hsl(var(--muted-foreground))]">{article.date}</p></div></Link>;
}

function Home() {
  return <><Meta title="Independent rankings for curious people" description="TOP 10 WORLD is an independent editorial guide to useful, interesting, and well-researched rankings across technology, culture, travel, and more." /><div className="mx-auto max-w-[1360px] px-5 lg:px-10">
    <section className="relative grid min-h-[600px] items-end border-x border-[hsl(var(--border))] px-5 pb-12 pt-20 page-grid md:grid-cols-[1.1fr_.9fr] md:px-10 md:pb-16 md:pt-28">
      <div className="relative z-10 reveal"><p className="eyebrow text-[hsl(var(--primary))]">An independent editorial guide / 2025</p><h1 className="mt-5 max-w-4xl font-editorial text-[clamp(4.5rem,12vw,10.5rem)] leading-[.78] tracking-[-.045em]">The world,<br /><em>ranked.</em></h1><p className="mt-9 max-w-md text-base leading-7 text-[hsl(var(--muted-foreground))]">Useful things. Interesting ideas. The places, people, and objects worth your attention right now.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="/top10" className="group inline-flex items-center gap-3 bg-[hsl(var(--primary))] px-5 py-3 font-mono-editorial text-[10px] uppercase tracking-[.12em] text-[hsl(var(--primary-foreground))] transition-transform hover:-translate-y-1" data-testid="link-hero-rankings">Explore the rankings <ArrowUpRight size={14} /></Link><Link href="/about" className="inline-flex items-center gap-3 border-b border-[hsl(var(--foreground)/.4)] px-1 py-3 font-mono-editorial text-[10px] uppercase tracking-[.12em]" data-testid="link-hero-about">Our point of view</Link></div></div>
      <EditorialArt art="lime" image={rankings[0].image} imageAlt={rankings[0].imageAlt} label="No. 01 / Attention is the new luxury" className="mt-12 aspect-square w-full md:mt-0 md:ml-auto md:max-w-[450px] reveal reveal-delay-2" />
      <div className="absolute bottom-4 right-4 hidden font-mono-editorial text-[10px] uppercase tracking-[.14em] text-[hsl(var(--muted-foreground))] md:block">Scroll to investigate ↓</div>
    </section>
    <div className="overflow-hidden border-x border-b border-[hsl(var(--border))] bg-[hsl(var(--primary))] py-3 text-[hsl(var(--primary-foreground))]"><div className="flex min-w-max animate-[ticker_24s_linear_infinite] gap-10 font-mono-editorial text-[10px] uppercase tracking-[.16em]"><span>Fresh thinking for a noisy world</span><span>◆</span><span>Rankings with a reason</span><span>◆</span><span>Fresh thinking for a noisy world</span><span>◆</span><span>Rankings with a reason</span><span>◆</span></div></div>
    <section className="border-x border-b border-[hsl(var(--border))] px-5 py-16 md:px-10 md:py-24"><SectionHeading eyebrow="The edit" title="Start here" href="/top10" /><div className="grid gap-5 md:grid-cols-3">{rankings.slice(0, 3).map((ranking, index) => <RankingCard key={ranking.slug} ranking={ranking} featured={index === 0} />)}</div></section>
    <section className="grid border-x border-b border-[hsl(var(--border))] md:grid-cols-[.8fr_1.2fr]"><div className="bg-[hsl(var(--secondary))] p-7 md:p-10"><p className="eyebrow">The short version</p><p className="mt-10 font-editorial text-4xl leading-[.98] sm:text-5xl">A point of view is not a filter. It is a promise to pay attention.</p><Link href="/about" className="mt-12 inline-flex items-center gap-2 font-mono-editorial text-[10px] uppercase tracking-[.12em]" data-testid="link-manifesto">Read our manifesto <ArrowUpRight size={14} /></Link></div><div className="p-7 md:p-10"><p className="eyebrow text-[hsl(var(--primary))]">From the desk</p><div className="mt-8 grid gap-1">{articles.slice(0, 3).map((article) => <ArticleCard key={article.slug} article={article} />)}</div><Link href="/articles" className="mt-5 inline-flex items-center gap-2 border-b border-[hsl(var(--foreground)/.3)] pb-1 font-mono-editorial text-[10px] uppercase tracking-[.12em]" data-testid="link-more-essays">More essays <ArrowUpRight size={13} /></Link></div></section>
    <section className="border-x border-b border-[hsl(var(--border))] px-5 py-16 md:px-10 md:py-24"><SectionHeading eyebrow="Find your next rabbit hole" title="Browse by instinct" href="/categories" action="All categories" /><div className="grid grid-cols-2 gap-px overflow-hidden border border-[hsl(var(--border))] bg-[hsl(var(--border))] md:grid-cols-3">{categories.map((category) => <Link key={category.slug} href={`/categories/${category.slug}`} className="group min-h-[150px] bg-[hsl(var(--background))] p-5 transition-colors hover:bg-[hsl(var(--card))] sm:min-h-[190px] sm:p-7" data-testid={`link-category-${category.slug}`}><span className="mb-8 block h-3 w-3 rounded-full" style={{ backgroundColor: category.color }} /><span className="font-editorial text-2xl group-hover:text-[hsl(var(--primary))] sm:text-3xl">{category.name}</span><p className="mt-2 font-mono-editorial text-[10px] uppercase tracking-[.1em] text-[hsl(var(--muted-foreground))]">{category.count} guides</p></Link>)}</div></section>
  </div></>;
}

function RankingsPage() {
  const [active, setActive] = useState('All');
  const filter = ['All', ...categories.map((category) => category.name)];
  const visible = active === 'All' ? rankings : rankings.filter((ranking) => ranking.category === active);
  return <PageFrame title="Rankings" intro="The lists with a little more thought behind them." description="Explore the latest TOP 10 WORLD rankings across technology, travel, entertainment, products, and culture."><div className="mb-10 flex gap-2 overflow-x-auto pb-2">{filter.map((name) => <button key={name} onClick={() => setActive(name)} type="button" className={`shrink-0 border px-4 py-2 font-mono-editorial text-[10px] uppercase tracking-[.1em] transition-colors ${active === name ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]' : 'border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]'}`} data-testid={`button-filter-${name.toLowerCase()}`}>{name}</button>)}</div><div className="grid gap-5 md:grid-cols-2">{visible.map((ranking, index) => <RankingCard key={ranking.slug} ranking={ranking} featured={index === 0 && visible.length > 2} />)}</div>{visible.length === 0 && <EmptyState title="Nothing in this edition yet" text="We are researching this corner of the world. Check back soon." />}</PageFrame>;
}

function RankingPage() {
  const { slug } = useParams<{ slug: string }>();
  const ranking = rankings.find((entry) => entry.slug === slug);
  if (!ranking) return <NotFoundPage />;
  return <><Meta title={ranking.title} description={ranking.dek} /><div className="mx-auto max-w-[1120px] px-5 lg:px-10"><div className="grid gap-8 border-x border-b border-[hsl(var(--border))] px-5 pb-12 pt-16 md:grid-cols-[1fr_360px] md:px-10 md:pt-24"><div><Link href="/top10" className="eyebrow text-[hsl(var(--primary))]" data-testid="link-back-rankings">← All rankings</Link><p className="eyebrow mt-12 text-[hsl(var(--primary))]">{ranking.category} / {ranking.updated}</p><h1 className="mt-4 font-editorial text-6xl leading-[.88] tracking-[-.03em] sm:text-8xl">{ranking.title}</h1><p className="mt-7 max-w-xl text-lg leading-8 text-[hsl(var(--muted-foreground))]">{ranking.dek}</p><p className="mt-7 font-mono-editorial text-[10px] uppercase tracking-[.1em] text-[hsl(var(--muted-foreground))]">Words by {ranking.byline} · {ranking.readTime}</p></div><EditorialArt art={ranking.art} image={ranking.image} imageAlt={ranking.imageAlt} label={`${ranking.category} / field notes`} className="aspect-[4/5] md:mt-10" /></div><div className="border-x border-b border-[hsl(var(--border))]"><div className="flex items-center justify-between border-b border-[hsl(var(--border))] px-5 py-4 font-mono-editorial text-[10px] uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))] md:px-10"><span>Our order of preference</span><span>{ranking.items.length} entries</span></div>{ranking.items.map((entry) => <div key={entry.rank} className="group grid grid-cols-[42px_72px_1fr_auto] gap-4 border-b border-[hsl(var(--border))] px-5 py-6 transition-colors hover:bg-[hsl(var(--card))] md:grid-cols-[70px_120px_1fr_120px] md:gap-6 md:px-10"><span className="font-editorial text-4xl text-[hsl(var(--primary))]">{String(entry.rank).padStart(2, '0')}</span><EditorialArt art={entry.art} variant={entry.title} label={`${entry.title} visual`} className="aspect-square w-[72px] md:w-[120px]" /><div><h2 className="font-editorial text-2xl leading-tight sm:text-3xl">{entry.title}</h2><p className="mt-2 max-w-xl text-sm leading-6 text-[hsl(var(--muted-foreground))]">{entry.note}</p></div><span className="hidden self-center text-right font-mono-editorial text-[10px] uppercase tracking-[.1em] text-[hsl(var(--muted-foreground))] md:block">{entry.metric}</span></div>)}</div><Related title="More to read" items={rankings.filter((entry) => entry.slug !== ranking.slug).slice(0, 2)} /></div></>;
}

function ArticlesPage() {
  return <PageFrame title="Essays" intro="Ideas, context, and the occasional strong opinion." description="Read essays from TOP 10 WORLD on technology, culture, travel, products, and the ideas behind the lists."><div className="grid gap-1">{articles.map((article) => <ArticleCard key={article.slug} article={article} />)}</div></PageFrame>;
}

function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((entry) => entry.slug === slug);
  if (!article) return <NotFoundPage />;
  return <><Meta title={article.title} description={article.dek} /><article className="mx-auto max-w-[1120px] px-5 lg:px-10"><div className="grid gap-10 border-x border-b border-[hsl(var(--border))] px-5 pb-14 pt-16 md:grid-cols-[1fr_360px] md:px-10 md:pt-24"><div><Link href="/articles" className="eyebrow text-[hsl(var(--primary))]" data-testid="link-back-articles">← All essays</Link><p className="eyebrow mt-12 text-[hsl(var(--primary))]">{article.category} / {article.date}</p><h1 className="mt-4 max-w-3xl font-editorial text-6xl leading-[.9] sm:text-8xl">{article.title}</h1><p className="mt-7 max-w-xl text-lg leading-8 text-[hsl(var(--muted-foreground))]">{article.dek}</p><p className="mt-7 font-mono-editorial text-[10px] uppercase tracking-[.1em] text-[hsl(var(--muted-foreground))]">By {article.author} · {article.readTime}</p></div><EditorialArt art={article.art} image={article.image} imageAlt={article.imageAlt} label="An essay from the desk" className="aspect-square md:mt-10" /></div><div className="mx-auto max-w-2xl border-x border-b border-[hsl(var(--border))] px-6 py-12 sm:px-14 sm:py-20">{article.body.map((paragraph, index) => <p key={paragraph} className={`font-editorial text-2xl leading-[1.35] ${index ? 'mt-8' : ''}`}>{paragraph}</p>)}<div className="mt-14 border-t border-[hsl(var(--border))] pt-6 font-mono-editorial text-[10px] uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))]">Filed under {article.category}</div></div><Related title="Keep reading" items={articles.filter((entry) => entry.slug !== article.slug).slice(0, 2)} /></article></>;
}

function CategoriesPage() {
  return <PageFrame title="Explore" intro="Six lenses on a very large world." description="Browse all TOP 10 WORLD categories and find your next rabbit hole."><div className="grid grid-cols-1 gap-px overflow-hidden border border-[hsl(var(--border))] bg-[hsl(var(--border))] sm:grid-cols-2">{categories.map((category, index) => <Link href={`/categories/${category.slug}`} key={category.slug} className="group min-h-[235px] bg-[hsl(var(--background))] p-7 transition-colors hover:bg-[hsl(var(--card))] md:p-10" data-testid={`card-category-${category.slug}`}><div className="flex items-start justify-between"><span className="grid h-10 w-10 place-items-center rounded-full font-editorial text-xl text-[hsl(var(--foreground))]" style={{ backgroundColor: category.color }}>{String(index + 1).padStart(2, '0')}</span><ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></div><h2 className="mt-16 font-editorial text-4xl group-hover:text-[hsl(var(--primary))]">{category.name}</h2><p className="mt-2 max-w-sm text-sm leading-6 text-[hsl(var(--muted-foreground))]">{category.description}</p></Link>)}</div></PageFrame>;
}

function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const category = categories.find((entry) => entry.slug === slug);
  if (!category) return <NotFoundPage />;
  const categoryRankings = rankings.filter((entry) => entry.categorySlug === slug);
  const categoryArticles = articles.filter((entry) => entry.categorySlug === slug);
  return <PageFrame title={category.name} intro={category.description} description={`${category.name} rankings and essays from TOP 10 WORLD.`}><div className="mb-10 flex items-center gap-3 border-y border-[hsl(var(--border))] py-4 font-mono-editorial text-[10px] uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))]"><span className="h-3 w-3 rounded-full" style={{ background: category.color }} />{category.count} field notes in this category</div><div className="grid gap-5 md:grid-cols-2">{categoryRankings.map((ranking) => <RankingCard key={ranking.slug} ranking={ranking} />)}</div>{categoryRankings.length === 0 && <EmptyState title="The next list is being researched" text="We are taking our time with this category." />}<div className="mt-16"><SectionHeading eyebrow="From the desk" title="Related essays" />{categoryArticles.length ? categoryArticles.map((article) => <ArticleCard key={article.slug} article={article} />) : <EmptyState title="No essays here yet" text="The desk is sharpening its pencils." />}</div></PageFrame>;
}

function SearchPage() {
  const search = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('q') ?? '' : '';
  const [query, setQuery] = useState(search);
  const [location, setLocation] = useLocation();
  const results = useMemo(() => { const q = query.trim().toLowerCase(); if (!q) return []; return allContent.filter((entry) => `${entry.title} ${entry.dek} ${entry.category}`.toLowerCase().includes(q)); }, [query]);
  const submit = (event: FormEvent) => { event.preventDefault(); if (query.trim()) setLocation(`/search?q=${encodeURIComponent(query.trim())}`); };
  return <PageFrame title="Search" intro="Find the next thing worth your attention." description="Search the TOP 10 WORLD archive."><form onSubmit={submit} className="mb-12 flex items-center gap-3 border-b-2 border-[hsl(var(--foreground))] pb-3"><Search size={21} /><input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full bg-transparent font-editorial text-3xl outline-none placeholder:text-[hsl(var(--muted-foreground))] sm:text-5xl" placeholder="Try “cities” or “AI”" autoFocus data-testid="input-search-page" /><button type="submit" className="font-mono-editorial text-[10px] uppercase tracking-[.12em] text-[hsl(var(--primary))]" data-testid="button-submit-search">Search</button></form>{query && <p className="eyebrow mb-5 text-[hsl(var(--muted-foreground))]">{results.length} result{results.length === 1 ? '' : 's'} for “{query}”</p>}{results.length ? <div className="grid gap-1">{results.map((entry) => entry.kind === 'Ranking' ? <RankingCard key={entry.slug} ranking={entry as Ranking} /> : <ArticleCard key={entry.slug} article={entry as Article} />)}</div> : <EmptyState title={query ? 'No exact matches' : 'Search the archive'} text={query ? 'Try a broader phrase, or explore one of the categories below.' : 'Look for a place, a tool, a film, or an idea.'} />}</PageFrame>;
}

function TrendingPage() {
  return <PageFrame title="Trending" intro="What readers are circling back to this week." description="The most-read rankings and essays on TOP 10 WORLD."><div className="grid gap-1">{trending.map((entry, index) => <Link key={entry.slug} href={entry.kind === 'Ranking' ? `/top10/${entry.slug}` : `/articles/${entry.slug}`} className="group grid grid-cols-[54px_1fr_auto] items-center gap-4 border-t border-[hsl(var(--border))] py-6 sm:grid-cols-[75px_1fr_150px]" data-testid={`link-trending-${entry.slug}`}><span className="font-editorial text-5xl text-[hsl(var(--primary))]">{String(index + 1).padStart(2, '0')}</span><span className="font-editorial text-2xl leading-tight group-hover:text-[hsl(var(--primary))] sm:text-4xl">{entry.label}</span><span className="hidden font-mono-editorial text-[10px] uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))] sm:block">{entry.kind} <ArrowUpRight className="ml-2 inline" size={13} /></span></Link>)}</div></PageFrame>;
}

function AboutPage() {
  return <PageFrame title="About TOP 10 WORLD" intro="A publication for people who would rather be curious than certain." description="Learn about the editorial point of view behind TOP 10 WORLD."><div className="grid gap-10 border-t border-[hsl(var(--border))] pt-10 md:grid-cols-[.7fr_1.3fr]"><p className="font-editorial text-4xl leading-tight">We make lists for the moment after you ask, “But what is actually good?”</p><div className="space-y-6 text-lg leading-8 text-[hsl(var(--muted-foreground))]"><p>TOP 10 WORLD is an independent editorial destination covering technology, entertainment, travel, sports, products, and culture. We are interested in useful things, beautiful ideas, and the details that make an experience worth recommending.</p><p>Our rankings are deliberately subjective. We research widely, explain our choices, and leave room for disagreement. The number ten gives a story shape; it does not pretend to make taste objective.</p><p>Every guide is made to be used. Save it for later, send it to someone who needs a recommendation, or use it as the beginning of your own list.</p></div></div><div className="mt-20 grid gap-5 md:grid-cols-3"><div className="bg-[hsl(var(--secondary))] p-7"><Sparkles size={19} /><h2 className="mt-12 font-editorial text-3xl">Curiosity first</h2><p className="mt-3 text-sm leading-6">We follow the question, not the algorithm.</p></div><div className="bg-[hsl(var(--primary))] p-7 text-[hsl(var(--primary-foreground))]"><Clock3 size={19} /><h2 className="mt-12 font-editorial text-3xl">Worth the time</h2><p className="mt-3 text-sm leading-6">A good recommendation should repay your attention.</p></div><div className="bg-[hsl(var(--accent))] p-7 text-[hsl(var(--accent-foreground))]"><ArrowUpRight size={19} /><h2 className="mt-12 font-editorial text-3xl">Make it useful</h2><p className="mt-3 text-sm leading-6">Every list should help you decide what to do next.</p></div></div></PageFrame>;
}

function ContactPage() {
  return <PageFrame title="Contact the desk" intro="Good recommendations often start with a good tip." description="Contact the TOP 10 WORLD editorial desk."><div className="grid gap-12 md:grid-cols-[.65fr_1.35fr]"><div><p className="text-sm leading-6 text-[hsl(var(--muted-foreground))]">Have a story, correction, collaboration, or place we should know about? Send it our way.</p><p className="mt-8 font-mono-editorial text-xs uppercase tracking-[.1em] text-[hsl(var(--primary))]">hello@top10.world</p></div><div className="border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8"><p className="eyebrow text-[hsl(var(--primary))]">Open a real conversation</p><p className="mt-4 max-w-lg font-editorial text-4xl">Tell us what you are researching, recommending, or correcting.</p><a href="mailto:hello@top10.world?subject=TOP%2010%20WORLD%20editorial%20note" className="mt-8 inline-flex items-center gap-2 bg-[hsl(var(--primary))] px-5 py-3 font-mono-editorial text-[10px] uppercase tracking-[.12em] text-[hsl(var(--primary-foreground))]" data-testid="link-contact-email">Email the desk <ArrowUpRight size={14} /></a></div></div></PageFrame>;
}

function LegalPage({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return <PageFrame title={title} intro={intro} description={`${title} for TOP 10 WORLD.`}><div className="prose prose-lg max-w-2xl text-[hsl(var(--muted-foreground))] prose-headings:font-editorial prose-headings:text-[hsl(var(--foreground))] prose-p:leading-8">{children}</div></PageFrame>;
}

function FuturePage({ title }: { title: string }) {
  return <PageFrame title={title} intro="A new corner of the publication is taking shape." description={`${title} — coming soon from TOP 10 WORLD.`}><EmptyState title="Coming into focus" text="We are researching the first edition. In the meantime, explore the latest rankings and essays." link="/top10" /></PageFrame>;
}

function PageFrame({ title, intro, description, children }: { title: string; intro: string; description: string; children: ReactNode }) {
  return <><Meta title={title} description={description} /><div className="mx-auto max-w-[1120px] px-5 lg:px-10"><div className="border-x border-b border-[hsl(var(--border))] px-5 pb-12 pt-20 md:px-10 md:pb-16 md:pt-28"><p className="eyebrow text-[hsl(var(--primary))]">TOP 10 WORLD / FIELD NOTES</p><h1 className="mt-4 max-w-4xl font-editorial text-6xl leading-[.88] tracking-[-.03em] sm:text-8xl">{title}</h1><p className="mt-7 max-w-xl text-lg leading-8 text-[hsl(var(--muted-foreground))]">{intro}</p></div><section className="border-x border-b border-[hsl(var(--border))] px-5 py-10 md:px-10 md:py-14">{children}</section></div></>;
}

function Related({ title, items }: { title: string; items: Array<Ranking | Article> }) {
  return <section className="border-x border-b border-[hsl(var(--border))] px-5 py-12 md:px-10"><SectionHeading eyebrow="The next page" title={title} />{items.map((item) => 'items' in item ? <RankingCard ranking={item} key={item.slug} /> : <ArticleCard article={item} key={item.slug} />)}</section>;
}

function EmptyState({ title, text, link }: { title: string; text: string; link?: string }) {
  return <div className="border border-dashed border-[hsl(var(--border))] bg-[hsl(var(--card)/.4)] px-6 py-14 text-center"><p className="eyebrow text-[hsl(var(--primary))]">Nothing here yet</p><h2 className="mt-3 font-editorial text-4xl">{title}</h2><p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[hsl(var(--muted-foreground))]">{text}</p>{link && <Link href={link} className="mt-6 inline-flex border-b border-[hsl(var(--primary))] pb-1 font-mono-editorial text-[10px] uppercase tracking-[.12em]" data-testid="link-empty-state">Explore the rankings</Link>}</div>;
}

function NotFoundPage() {
  return <PageFrame title="Page not found" intro="This page wandered off the list." description="The requested TOP 10 WORLD page could not be found."><EmptyState title="A dead end, for now" text="Try the front page or search the archive for what you had in mind." link="/" /></PageFrame>;
}

function Router() {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}><Layout><Switch>
    <Route path="/" component={Home} />
    <Route path="/top10" component={RankingsPage} />
    <Route path="/top10/:slug" component={RankingPage} />
    <Route path="/articles" component={ArticlesPage} />
    <Route path="/articles/:slug" component={ArticlePage} />
    <Route path="/categories" component={CategoriesPage} />
    <Route path="/categories/:slug" component={CategoryPage} />
    <Route path="/search" component={SearchPage} />
    <Route path="/trending" component={TrendingPage} />
    <Route path="/about" component={AboutPage} />
    <Route path="/contact" component={ContactPage} />
    <Route path="/privacy-policy" component={() => <LegalPage title="Privacy policy" intro="A clear explanation of what we collect and why."><h2>In short</h2><p>We collect only what this publication needs to work. Newsletter addresses are used to send the newsletter and nothing else. We do not sell personal data.</p><h2>Site usage</h2><p>Essential cookies help us remember preferences such as your colour theme. We may use aggregate, non-identifying analytics to understand which stories are useful.</p><h2>Your choices</h2><p>Write to hello@top10.world to ask about your data, unsubscribe from an email, or request a correction.</p></LegalPage>} />
    <Route path="/cookie-policy" component={() => <LegalPage title="Cookie policy" intro="Small files, plainly explained."><h2>Essential cookies</h2><p>We use essential storage to remember your theme preference and whether you have dismissed the cookie notice. These are not used for advertising.</p><h2>Managing cookies</h2><p>You can clear cookies and local storage from your browser settings at any time. The publication will continue to work.</p></LegalPage>} />
    <Route path="/terms" component={() => <LegalPage title="Terms of use" intro="The simple rules for using this publication."><h2>Use the work well</h2><p>TOP 10 WORLD is editorial work intended for personal, non-commercial use. You may link to and quote short excerpts with credit.</p><h2>Editorial independence</h2><p>Rankings reflect the views of our editors. Inclusion is not a guarantee, warranty, or endorsement for every use case.</p></LegalPage>} />
    <Route path="/disclaimer" component={() => <LegalPage title="Disclaimer" intro="A little context is always useful."><h2>Editorial recommendations</h2><p>We research and test where possible, but readers should make decisions based on their own needs, circumstances, and current information.</p><h2>Corrections</h2><p>If you spot an error, please contact the desk. We take accuracy seriously and will update published work when the evidence changes.</p></LegalPage>} />
    <Route path="/guides" component={() => <FuturePage title="Guides" />} />
    <Route path="/comparisons" component={() => <FuturePage title="Comparisons" />} />
    <Route path="/reviews" component={() => <FuturePage title="Reviews" />} />
    <Route path="/software" component={() => <FuturePage title="Software" />} />
    <Route path="/apps" component={() => <FuturePage title="Apps" />} />
    <Route path="/tools" component={() => <FuturePage title="Tools" />} />
    <Route component={NotFoundPage} />
  </Switch></Layout></ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;