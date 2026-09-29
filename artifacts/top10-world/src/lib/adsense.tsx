import { useEffect } from 'react';

export const ADSENSE_CLIENT = 'ca-pub-8414812837690453';

export function AdSenseScript() {
  useEffect(() => {
    if (document.querySelector(`script[src*="adsbygoogle.js?client=${ADSENSE_CLIENT}"]`)) return;
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  }, []);
  return null;
}

type AdUnitProps = {
  slot?: string;
  className?: string;
};

export function AdUnit({ slot, className = '' }: AdUnitProps) {
  if (!slot) return null;
  return (
    <aside className={`ad-slot ${className}`} aria-label="Advertisement">
      <span className="ad-slot-label">Advertisement</span>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}

export function AdInArticle(props: AdUnitProps) {
  return <AdUnit {...props} className={`ad-in-article ${props.className ?? ''}`} />;
}

export function AdSidebar(props: AdUnitProps) {
  return <AdUnit {...props} className={`ad-sidebar ${props.className ?? ''}`} />;
}