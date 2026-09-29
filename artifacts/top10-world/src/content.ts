export type Category = {
  slug: string;
  name: string;
  description: string;
  color: string;
  count: number;
};

export type RankingItem = {
  rank: number;
  title: string;
  note: string;
  metric: string;
  art: string;
};

export type Ranking = {
  slug: string;
  title: string;
  dek: string;
  category: string;
  categorySlug: string;
  updated: string;
  readTime: string;
  byline: string;
  art: string;
  image: string;
  imageAlt: string;
  items: RankingItem[];
};

export type Article = {
  slug: string;
  title: string;
  dek: string;
  category: string;
  categorySlug: string;
  date: string;
  readTime: string;
  author: string;
  art: string;
  image: string;
  imageAlt: string;
  body: string[];
};

const itemArt = ['coral', 'teal', 'violet', 'ochre', 'lime'];
const item = (rank: number, title: string, note: string, metric: string): RankingItem => ({
  rank,
  title,
  note,
  metric,
  art: itemArt[(rank - 1) % itemArt.length],
});

export const categories: Category[] = [
  { slug: 'technology', name: 'Technology', description: 'The tools, ideas, and quiet revolutions shaping what comes next.', color: '#e75a3c', count: 18 },
  { slug: 'culture', name: 'Culture', description: 'The people, places, and works giving the present its texture.', color: '#b6d84c', count: 14 },
  { slug: 'travel', name: 'Travel', description: 'Routes worth taking, from known cities to the edges of the map.', color: '#3d8c9b', count: 12 },
  { slug: 'entertainment', name: 'Entertainment', description: 'What to watch, listen to, read, and talk about after the credits.', color: '#d8984a', count: 16 },
  { slug: 'sports', name: 'Sports', description: 'The stories, athletes, and rivalries that move the world.', color: '#7676ae', count: 9 },
  { slug: 'products', name: 'Products', description: 'Useful objects that earn their place in your everyday life.', color: '#cf7d8a', count: 11 },
];

export const rankings: Ranking[] = [
  {
    slug: 'most-useful-ai-tools',
    title: 'The 10 AI tools actually worth your attention',
    dek: 'A practical field guide to the assistants that save time without asking you to change how you work.',
    category: 'Technology', categorySlug: 'technology', updated: 'May 28, 2025', readTime: '9 min read', byline: 'Mina Okafor', art: 'coral', image: '/images/top10/ai-tools.png', imageAlt: 'Editorial still life representing useful AI tools',
    items: [
      item(1, 'Perplexity', 'Search that shows its work, with citations that make a first draft feel like a head start.', 'Research'),
      item(2, 'Granola', 'A meeting notepad that turns fragments into a useful record without becoming another dashboard.', 'Meetings'),
      item(3, 'Claude', 'Thoughtful long-form collaboration for writing, planning, and difficult first passes.', 'Thinking'),
      item(4, 'NotebookLM', 'A calm way to interrogate a pile of source material and keep the edges intact.', 'Synthesis'),
      item(5, 'Raycast', 'The keyboard layer for a faster Mac, now with genuinely useful AI shortcuts.', 'Workflow'),
      item(6, 'ElevenLabs', 'Voice tools with enough control for small teams to prototype audio ideas.', 'Audio'),
      item(7, 'Cursor', 'A code editor that makes pair programming feel less like a metaphor.', 'Code'),
      item(8, 'Krea', 'Fast visual exploration for when the first idea needs to become ten.', 'Images'),
      item(9, 'Otter', 'Reliable transcription that gives busy conversations a searchable afterlife.', 'Notes'),
      item(10, 'ChatGPT', 'Still the broadest generalist when you know how to give it a narrow job.', 'Generalist'),
    ],
  },
  {
    slug: 'cities-for-a-long-weekend',
    title: '10 cities made for a long weekend',
    dek: 'The best short escapes balance one great walk, one excellent meal, and a reason to stay out late.',
    category: 'Travel', categorySlug: 'travel', updated: 'May 21, 2025', readTime: '7 min read', byline: 'Owen Finch', art: 'teal', image: '/images/top10/long-weekend-cities.png', imageAlt: 'Sunlit Lisbon alley representing a long weekend city',
    items: [
      item(1, 'Lisbon', 'Hills, tiled façades, and a city that knows the value of a late lunch.', 'Portugal'),
      item(2, 'Kyoto', 'The quieter side streets are still the best itinerary.', 'Japan'),
      item(3, 'Mexico City', 'Museums in the morning, excellent noise after dark.', 'Mexico'),
      item(4, 'Copenhagen', 'Design, canals, and the confidence to close the kitchen early.', 'Denmark'),
      item(5, 'Marrakech', 'A sensory reset with enough courtyards to find your own rhythm.', 'Morocco'),
      item(6, 'Melbourne', 'Coffee is only the beginning; follow the laneways.', 'Australia'),
      item(7, 'Edinburgh', 'A compact, dramatic city with a story on every incline.', 'Scotland'),
      item(8, 'Seoul', 'The most rewarding days have no fixed destination.', 'South Korea'),
      item(9, 'Porto', 'River light, tiled churches, and a persuasive case for walking.', 'Portugal'),
      item(10, 'New Orleans', 'Music, architecture, and meals that refuse to be rushed.', 'United States'),
    ],
  },
  {
    slug: 'films-that-stayed-with-us',
    title: '10 films that stayed with us this year',
    dek: 'Not the loudest releases. The films that kept returning in conversation after the lights came up.',
    category: 'Entertainment', categorySlug: 'entertainment', updated: 'May 16, 2025', readTime: '11 min read', byline: 'Talia Brooks', art: 'violet', image: '/images/top10/films-that-stayed.png', imageAlt: 'Projector beam over cinema seats',
    items: [
      item(1, 'The Quiet Season', 'A formally daring family drama with a pulse beneath every silence.', 'Drama'),
      item(2, 'Afterlight', 'Science fiction with more questions than spectacle, exactly as it should be.', 'Sci-fi'),
      item(3, 'Soft Focus', 'A small film about looking closely at the life you already have.', 'Romance'),
      item(4, 'The Long Way Home', 'A road movie that takes the scenic route through grief.', 'Road film'),
      item(5, 'Signal / Noise', 'A documentary about attention in the age of permanent distraction.', 'Documentary'),
      item(6, 'Blue Hour', 'A gorgeous, bruised coming-of-age story.', 'Coming-of-age'),
      item(7, 'The Archivist', 'Mystery as a meditation on who gets remembered.', 'Mystery'),
      item(8, 'No Fixed Address', 'Funny, tender, and smart about the instability of a new life.', 'Comedy'),
      item(9, 'House Lights', 'Theatre people behaving badly, with real affection underneath.', 'Ensemble'),
      item(10, 'Far Country', 'An unhurried western that earns every horizon.', 'Western'),
    ],
  },
  {
    slug: 'objects-for-a-better-desk',
    title: '10 objects for a better desk',
    dek: 'The small upgrades that make a working day feel considered rather than merely endured.',
    category: 'Products', categorySlug: 'products', updated: 'May 08, 2025', readTime: '6 min read', byline: 'Inez Park', art: 'ochre', image: '/images/top10/better-desk.png', imageAlt: 'Considered creative desk with a task lamp and objects',
    items: [
      item(1, 'A good task light', 'The best productivity hack is kinder light at 4:30pm.', 'Atmosphere'),
      item(2, 'A wool desk mat', 'Quietly changes the sound and feel of the entire surface.', 'Tactility'),
      item(3, 'A compact mechanical keyboard', 'The right amount of feedback, with no gamer theatre.', 'Input'),
      item(4, 'A ceramic catchall', 'For the objects that otherwise become a small daily avalanche.', 'Order'),
      item(5, 'A proper pen', 'Because some thoughts arrive better on paper.', 'Analog'),
      item(6, 'A USB-C monitor lamp', 'Useful, flattering, and far less committed than a renovation.', 'Utility'),
      item(7, 'A small speaker', 'Work needs a soundtrack, not another notification.', 'Sound'),
      item(8, 'A footrest', 'The least glamorous item here is the one you will thank us for.', 'Comfort'),
      item(9, 'A paper calendar', 'A month you can see is a different kind of information.', 'Time'),
      item(10, 'A plant with low expectations', 'Something alive that does not need a status update.', 'Balance'),
    ],
  },
];

export const articles: Article[] = [
  { slug: 'why-good-rankings-need-a-point-of-view', title: 'Why good rankings need a point of view', dek: 'A list is easy. The hard part is deciding what deserves to be on it.', category: 'Culture', categorySlug: 'culture', date: 'June 02, 2025', readTime: '5 min read', author: 'The TOP 10 WORLD desk', art: 'lime', image: '/images/articles/rankings-point-of-view.png', imageAlt: 'Index cards and red thread arranged as an editorial ranking', body: ['Rankings promise order in a noisy world. That promise is useful, but it is also a little dangerous: the moment we put ten things in a row, we make a claim about value.', 'At TOP 10 WORLD, the number is a format, not a verdict. We look for the detail that survives the first impression, the choice that makes a person’s day better, and the work that becomes more interesting with a second look.', 'That means our lists are edited, not assembled. We talk to people who use the things we write about, compare the obvious options with the overlooked ones, and leave room for taste. A ranking without a point of view is just a search result with better typography.'] },
  { slug: 'the-return-of-the-specific-weekend', title: 'The return of the specific weekend', dek: 'Travel is getting smaller, slower, and much more particular. Good.', category: 'Travel', categorySlug: 'travel', date: 'May 26, 2025', readTime: '8 min read', author: 'Owen Finch', art: 'teal', image: '/images/articles/specific-weekend.png', imageAlt: 'Train ticket and folded city map beside a coffee', body: ['The most memorable trips now begin with a constraint: one neighbourhood, one train line, one market open on Sunday morning. The broad itinerary has lost some of its shine.', 'Specificity leaves room for the texture that makes a place itself. You notice the bakery that only makes one thing, the swimming hour locals protect, the turn you would miss from a taxi.', 'This is not an argument against seeing more. It is an argument for staying long enough to see what cannot be added to a checklist.'] },
  { slug: 'a-short-history-of-the-home-screen', title: 'A short history of the home screen', dek: 'Our most intimate interface has changed shape many times. What are we asking it to be now?', category: 'Technology', categorySlug: 'technology', date: 'May 12, 2025', readTime: '10 min read', author: 'Mina Okafor', art: 'coral', image: '/images/articles/home-screen.png', imageAlt: 'Hand reaching toward a layered smartphone home screen reflection', body: ['The home screen used to be a place you went. Now it is a place that comes to you, with badges, suggested actions, and an increasingly opinionated idea of what matters.', 'The next era may be less about adding tools and more about reducing the number of decisions between intention and action. The best interface is often the one that gets out of the way before you notice it was there.', 'We are paying attention to the small signals: fewer colours, better defaults, and software that respects the difference between a moment and a habit.'] },
  { slug: 'what-we-mean-by-useful', title: 'What we mean by useful', dek: 'A working definition for the most overused word in modern product writing.', category: 'Products', categorySlug: 'products', date: 'May 03, 2025', readTime: '4 min read', author: 'Inez Park', art: 'ochre', image: '/images/articles/useful.png', imageAlt: 'Wooden chair, open notebook, and ceramic cup in morning light', body: ['Useful does not always mean efficient. A chair can be useful because it makes a room feel like somewhere you want to stay; a book can be useful because it gives a difficult feeling a name.', 'We use the word carefully. We mean that an object, place, or idea earns the attention it asks for. It should give something back: time, clarity, joy, or a better question.', 'That is a higher bar than functional. It is also a more human one.'] },
];

export const trending = [
  { label: 'The 10 AI tools actually worth your attention', slug: 'most-useful-ai-tools', kind: 'Ranking' },
  { label: 'The return of the specific weekend', slug: 'the-return-of-the-specific-weekend', kind: 'Article' },
  { label: '10 cities made for a long weekend', slug: 'cities-for-a-long-weekend', kind: 'Ranking' },
  { label: 'Why good rankings need a point of view', slug: 'why-good-rankings-need-a-point-of-view', kind: 'Essay' },
];

export const allContent = [
  ...rankings.map((entry) => ({ ...entry, kind: 'Ranking' as const })),
  ...articles.map((entry) => ({ ...entry, kind: 'Article' as const })),
];