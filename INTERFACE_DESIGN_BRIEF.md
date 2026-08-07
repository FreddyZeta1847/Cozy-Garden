# Cozy Garden — Interface Design Brief

You are designing the visual interface for a game called **Cozy Garden**. This document
describes everything the game does and everything each screen must show. It does **not**
prescribe layout, visual style, screen order, or how anything should look — design all of
that freely. Where a number, rule, or piece of content is stated, it is a real game fact to
respect; everything else (arrangement, hierarchy, color, motion, iconography) is yours to
decide.

## Tone (hard requirement)

Cozy, relaxing, and family-friendly. The game is built around the passage of seasons — it
should feel gentle and unhurried, never stressful or punishing in *feel*, even when the
game mechanics themselves have real stakes (a plant can be lost). Motion and transitions
should read as smooth and soft, not sharp or jarring. Nothing violent, nothing dark,
nothing aimed above a general family audience. Every screen should feel like part of the
same warm, sunny, small-farm world — no screen should suddenly feel clinical, corporate,
or game-y in a way that breaks that mood.

---

## Part 1 — How the game works

### 1.1 The core loop

Till an empty plot → plant a seed → water it periodically until it matures → harvest it →
sell the harvest for money → spend money on more seeds, more plots, or upgrades → repeat,
while the seasons turn and the game's economy shifts around you.

### 1.2 Calendar and seasons

- Time is tracked as **Day** (1–30) within a **Season**, and **Season** cycles through
  **Spring → Summer → Fall → Winter → Spring...**
- Each full cycle of the four seasons completes a **Year**, and the year number keeps
  climbing (Year 1, Year 2, Year 3...).
- Each season has its own distinct look (already-established seasonal background art and
  a seasonal color palette that the rest of the interface should be able to tint itself
  with).
- The player should always be able to see, at a glance, what season/day/year it currently
  is.

### 1.3 The vegetable garden and plots

- The garden is a grid of individual **plots**. Each plot is in exactly one of these
  states at any time:
  - **Locked** — not yet unlocked by the player; cannot be interacted with at all.
  - **Empty** — unlocked, bare dirt.
  - **Tilled** — empty dirt has been worked with the hoe, ready for a seed.
  - **Planted / Growing** — a seed has been planted and is progressing through 3 growth
    stages toward maturity.
  - **Ready to harvest** — fully grown, waiting to be picked.
- A new game starts with only **5 unlocked plots** out of a larger potential garden. The
  rest are purchased in tiers from the Upgrade Hub (see 1.7) — each purchase unlocks a
  batch of additional plots. A locked plot should be visually obviously different from a
  usable one (it cannot be tilled, planted, or watered).
- Two tools are used on plots: a **hoe** (till empty dirt) and a **watering can** (water a
  planted/growing plot).

### 1.4 Vegetables

There are 8 vegetables, each unlocked at a specific player level. Each vegetable has:

- A name and a distinct look/icon
- A seed cost (to buy)
- A growth time and a water interval (how often it needs watering while growing)
- A harvest yield (how many units one harvest produces) and a base sell price per unit
- 3 growth stages, visually distinguishable
- **A best season** — growing or selling this vegetable during its best season gives a
  **+30% bonus to both harvest yield and sell price**
- **A blocked season** — this vegetable cannot be planted during its blocked season at
  all; if it's already growing when the season turns into its blocked season, **it withers
  and is lost**

| Vegetable | Unlocks at level | Best season | Blocked season |
|---|---|---|---|
| Lettuce | 1 (start) | Spring | Summer |
| Tomato | 1 (start) | Summer | Winter |
| Carrot | 2 | Fall | Summer |
| Potato | 4 | Fall | Summer |
| Cabbage | 5 | Winter | Summer |
| Corn | 6 | Summer | Winter |
| Pumpkin | 7 | Fall | Winter |
| Garlic | 9 | Spring | Winter |

A vegetable that isn't unlocked yet at the player's current level should be visibly
present-but-locked wherever vegetables are listed (shop, seed selection), showing the
level required to unlock it — never simply hidden.

### 1.5 Watering, growth, and rot

- A growing plot needs water periodically (its water interval). If not watered in time, it
  becomes **thirsty** — growth pauses entirely and does not resume until watered again
  (the plant does not lose any progress, it just stops advancing).
- If a plot stays thirsty for **3 full days** without being watered, the plant **rots and
  is lost** — the plot returns to empty, and the seed investment is gone.
- The player should be able to tell, per plot, whether a plant needs water, and there
  should be some way to see how long until it's fully grown and how long until it needs
  water again for a plant they're currently looking at.

### 1.6 The fruit orchard (the "second garden")

- A completely separate growing area from the vegetable garden, unlocked via a Premium
  Orchard purchase (see 1.7). Until purchased, this second garden is inaccessible and
  should be shown as locked, not hidden.
- Has exactly **5 tree slots** in a single row.
- 4 fruits: Apple, Orange, Banana, Pear. Each has a seed cost, growth time, water
  interval, sell price, and 4 growth stages (seed → sapling → young → mature).
- Fruit trees are **perennial**: once mature, a tree keeps producing a new batch of fruit
  every "production interval" automatically, without needing to be replanted — up to a
  fixed maximum number of harvests, after which the tree dies and must be cleared before
  something new can be planted in that slot.
- Fruit trees also need periodic watering while growing, same general idea as vegetables,
  but currently have no rot/wither mechanic (that only applies to vegetables for now).
- Fruits are not affected by the seasonal best/blocked system that vegetables use.

### 1.7 Money, shop, market, and upgrades

**Shop (buying seeds)**

- Lists every vegetable and, if the orchard is unlocked, every fruit — including ones the
  player hasn't reached the required level for yet (shown locked, with the level needed).
- For each item: enough information to decide whether to buy it — its growth time, water
  interval, harvest yield, sell price, and cost — plus quantity-buy controls (buying 1, a
  bundle, or "as many as affordable").
- Because of the seasonal system (1.4), the shop should be able to indicate whether an
  item is currently in its best season, currently blocked (can't be bought/planted right
  now), or neither.

**Market (selling harvest)**

- Shows everything currently sitting in the player's harvested inventory (vegetables and
  fruits), each with its quantity and its **current** sell price — which is not fixed, it
  moves with the season and with active news events (see 1.8), so the price shown must
  reflect what the player would actually get right now, not a flat base number.
- The player builds a small selling batch: **at most 3 different products** can be
  selected into it at once, each with its own quantity (adjustable up to how many the
  player owns), and a running total of what the batch will earn. Selling clears the batch
  and pays out.
- When there's nothing harvested yet, this should say so clearly rather than showing an
  empty grid.

**Upgrade Hub**

A separate space for one-time purchases, each gated by both a level requirement and a
money cost, shown as locked (with the level needed) until both are met, and marked as
owned once purchased:

- **Auto-Watering** — automatically waters vegetable plots on a timer.
- **Fertilizer** — vegetables grow faster.
- **Garden Expansion** — grows the vegetable garden's total plot count.
- **Premium Orchard** — unlocks the fruit orchard (1.6).
- **Premium Auto-Watering** — automatically waters fruit trees on a timer.
- **Plot Cluster I / II / III / IV** — four separate purchases, each unlocking another
  batch of vegetable plots (this is how the garden grows from its starting 5 plots, see
  1.3).

### 1.8 News

- The game periodically generates **market events** — short-lived news items that move
  the sell price of vegetables up or down for a limited number of days. Kinds of events:
  - General **market trend** (all vegetables' prices shift together, mildly)
  - A **shortage** or a **scandal/contamination scare** targeting one specific vegetable
    (a bigger price swing, up or down, for just that crop)
  - A **weather event** tied to a season (e.g. a heatwave or a cold snap), which moves
    prices for the group of vegetables that struggle in that season
  - A **bumper harvest**, which drops prices for the group of vegetables that thrive in a
    given season (oversupply)
- Multiple events can be active at once (currently up to 2), each with its own remaining
  duration in days.
- Each event has a short headline, a one-line explanation of what's happening and why, and
  a countdown of days left before it expires.
- There needs to be a place the player can go to see everything currently active — a
  "newspaper" of sorts — and it should be obvious when there is currently no news at all
  (this shouldn't be a rare/broken-looking empty state, it's a normal condition).

### 1.9 Progression: XP and levels

- The player earns XP from planting, harvesting, watering, selling, and buying upgrades,
  and levels up as XP accumulates. There are 10 levels total.
- Leveling up is what unlocks new vegetables, new fruits, and new upgrades (including the
  plot clusters that grow the garden) — see the tables in 1.4 and 1.7 for exactly what
  unlocks where.
- The player should always be able to see their current level and progress toward the
  next one.
- There should be a way to look ahead — not just "what do I unlock next," but a full
  roadmap of **what unlocks at every level**, 1 through 10 (which vegetables, which
  fruits, which upgrades — including all 4 plot clusters), so a player can plan ahead
  instead of being surprised.

---

## Part 2 — Screens

List of screens this game needs, and what content each one must contain. Nothing below
implies layout, order, or how a player navigates between them — only what information and
interactions must exist somewhere on that screen.

### Main Garden Screen

The primary screen — where the player spends most of their time.

- The vegetable garden grid itself, with every plot showing its current state (locked /
  empty / tilled / growing with visible stage / ready-to-harvest / needs water)
- A way to reach the fruit orchard (the "second garden") from here, and for it to be
  obviously locked if not yet purchased
- Current money
- Current season, day, and year
- A way to see how much the player has harvested in total / has waiting to be sold
- Current level, and a way to open the full level roadmap (Part 1.9) from it
- The hoe and watering can tools, and a way to select which seed is about to be planted
  from the player's owned seeds
- A way to reach the Shop, the Market, the Upgrade Hub, and the News page from here
- A separate, clearly non-core control to reset/restart the game — this is a developer
  convenience, not part of the game itself, and should not be presented as an equal
  peer to real gameplay actions

### Shop Screen

Content as described in 1.7 — every vegetable (and fruit, if unlocked) with its stats,
lock state, seasonal state, and quantity-buy controls. A way to see current money. A way
to get back to the main screen.

### Market Screen

Content as described in 1.7 — the full harvested inventory with live current prices, the
3-product selling batch with adjustable quantities and a running total, and the
appropriate empty state. A way to see current money. A way to get back to the main screen.

### Fruit Orchard (second garden)

- The 5 tree slots, each showing its state (empty / growing with stage / mature and
  producing / ready to harvest / dead and needing to be cleared)
- Enough per-tree information to know what's planted and how it's doing
- A way to plant a fruit seed into an empty slot, from the player's owned fruit seeds
- A way back to the main vegetable garden

### News Page

- Every currently active event: headline, explanation, which vegetable(s) or group it
  affects and how, and days remaining
- The no-news-today state, handled gracefully
- A way back to the main screen

### Level Page

Opened from the level indicator on the Main Garden Screen.

- Current level and current XP progress toward the next one
- The full level-by-level roadmap described in 1.9 — every level from 1 to 10, and
  exactly what becomes available at each one (vegetables, fruits, upgrades, plot
  clusters), including levels the player hasn't reached yet
- A way back to the main screen

### Upgrade Hub

- Every upgrade described in 1.7, with its cost, level requirement, lock/owned state, and
  what it does
- A way to see current money
- A way back to the main screen
