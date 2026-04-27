/* ============================================================
   OSRS GUIDE LIBRARY — GUIDE REGISTRY
   ============================================================
   To add a new guide:
   1. Create a new HTML file in /guides/ (copy _template.html as a start)
   2. Add a new entry to the GUIDES array below
   3. That's it — the homepage will pick it up automatically
   ============================================================ */

const GUIDES = [
  {
    id: 'cowhide',
    title: 'Cowhide Farming',
    file: 'guides/cowhide.html',
    category: 'Money Making',
    difficulty: 'Easy',
    membership: 'F2P',
    thumbEmoji: '🐄',
    description:
      'The most efficient cowhide farming route from start to sell. Low requirements, high consistency, ~1.2M+ GP/hr.',
    tags: ['F2P', 'Easy', 'Beginner', 'AFK-Friendly'],
    requirements: 'No skill requirements',
    profitPerHour: '~1.2M GP/hr',
    featured: true,
  },

  // ─── ADD MORE GUIDES BELOW ───
  // Examples (uncomment and edit to add):
  //
  // {
  //   id: 'wines-of-zamorak',
  //   title: 'Wines of Zamorak',
  //   file: 'guides/wines-of-zamorak.html',
  //   category: 'Money Making',
  //   difficulty: 'Easy',
  //   membership: 'Members',
  //   thumbEmoji: '🍷',
  //   description: 'Telegrab wines for ~1.5M GP/hr. Requires 33 Magic.',
  //   tags: ['Members', 'Easy', 'Magic'],
  //   requirements: '33 Magic, completed Mountain Daughter',
  //   profitPerHour: '~1.5M GP/hr',
  //   featured: false,
  // },
  //
  // {
  //   id: 'fletching-1-99',
  //   title: 'Fletching 1–99 Guide',
  //   file: 'guides/fletching.html',
  //   category: 'Skilling',
  //   difficulty: 'Easy',
  //   membership: 'F2P',
  //   thumbEmoji: '🏹',
  //   description: 'The fastest and cheapest paths to 99 Fletching.',
  //   tags: ['F2P', 'Easy', 'Skilling', 'AFK-Friendly'],
  //   requirements: 'None',
  //   profitPerHour: 'Varies',
  //   featured: false,
  // },
];

// Categories — auto-derived from the guides above, but you can override the order here:
const CATEGORY_ORDER = [
  'All',
  'Money Making',
  'Skilling',
  'Combat',
  'Quests',
  'Bossing',
  'Minigames',
  'Account Building',
];

/* Difficulty colors for tags — matches CSS classes tag-easy / tag-medium / tag-hard */
const DIFFICULTY_CLASS = {
  Easy: 'tag-easy',
  Medium: 'tag-medium',
  Hard: 'tag-hard',
  Elite: 'tag-hard',
};

const MEMBERSHIP_CLASS = {
  'F2P': 'tag-f2p',
  'Members': 'tag-members',
  'F2P/Members': 'tag-f2p',
};
