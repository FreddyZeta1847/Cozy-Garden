# Vegetable Garden Game - Development Log

## Project Overview
Building a cozy, tile-based vegetable garden game with the following core features:
- Plant and grow vegetables in a grid-based garden
- Water plants to keep them growing
- Harvest and sell produce for profit
- Purchase seeds and upgrades
- Seasonal visual changes

## Technical Stack
- HTML5 + CSS3 for UI
- Vanilla JavaScript for game logic
- localStorage for game persistence
- CSS Grid for garden layout

## Game Architecture

### Core Systems
1. **Tile-based Garden System**: 6x4 grid with cell states (empty → tilled → planted → growing → harvestable)
2. **Time System**: Real-time tick-based updates (1 second = 1 game minute)
3. **Resource Management**: Track money, inventory (seeds, products), and tool levels

### Data Structures

#### Plants Database
```javascript
{
  tomato: {
    name: "Tomato",
    seedCost: 10,
    growthTime: 120,
    waterInterval: 30,
    harvestYield: 2,
    sellPrice: 8,
    stages: 3
  },
  lettuce: {
    seedCost: 5,
    growthTime: 60,
    waterInterval: 20,
    harvestYield: 5,
    sellPrice: 3
  },
  carrot: {
    seedCost: 8,
    growthTime: 90,
    waterInterval: 25,
    harvestYield: 3,
    sellPrice: 6
  },
  corn: {
    seedCost: 15,
    growthTime: 180,
    waterInterval: 40,
    harvestYield: 4,
    sellPrice: 10
  },
  potato: {
    seedCost: 12,
    growthTime: 150,
    waterInterval: 35,
    harvestYield: 6,
    sellPrice: 4
  }
}
```

#### Garden Cell State
```javascript
{
  status: 'empty' | 'tilled' | 'planted' | 'growing',
  plantType: null | 'tomato',
  growthStage: 0-3,
  lastWatered: timestamp,
  needsWater: boolean,
  readyToHarvest: boolean,
  plantedAt: timestamp
}
```

#### Player Data
```javascript
{
  money: 100,
  inventory: {
    seeds: { tomato: 5, lettuce: 3 },
    harvested: { tomato: 0, lettuce: 0 }
  },
  upgrades: {
    autoWatering: false,
    fasterGrowth: 1.0,
    toolLevel: 1
  }
}
```

## Game Screens

### 1. Main Garden View
- Garden grid (6x4 tiles)
- Tools bar (hoe, watering can, seed selector)
- Resources display (money, seed count)
- Season indicator
- Navigation to Shop, Upgrade Hut, Market

### 2. Shop Screen
- List of available seeds with prices
- Purchase functionality
- Back to garden button

### 3. Market Screen
- 5 selling slots with dropdown + quantity selector
- Price calculation display
- Sell All button

### 4. Upgrade Hut Screen
- Available upgrades list
- Cost and description
- Visual indicators for owned upgrades

## Game Mechanics

### Action Flow
1. Empty Tile → Use Hoe → Tilled
2. Tilled Tile → Select Seed + Click → Planted
3. Planted → Use Watering Can → Enable Growth
4. Stage 3 + Ready → Click to Harvest → Add to Inventory

### Water System
- Each plant tracks `lastWatered` timestamp
- Growth pauses if not watered within `waterInterval`
- Watering resets timer and resumes growth

### Growth Logic
- If watered, progress stage every `growthTime / 3` seconds
- Visual indicators for dry plants
- Sparkle effect when ready to harvest

## Implementation Phases

### Phase 1: Core Garden ✓
- Basic tile system
- One plant type (tomato)
- Tilling and planting

### Phase 2: Water & Harvest
- Watering mechanics
- Harvest functionality
- Inventory system

### Phase 3: Economy
- Shop screen
- Money system
- Seed purchasing

### Phase 4: Market
- Selling interface
- Price calculations
- Inventory management

### Phase 5: Upgrades
- Upgrade hut
- Auto-watering system
- Growth boosters

### Phase 6: Polish
- Multiple plant types
- Seasons system
- Animations & effects

## Visual Style Guide
- **Art Style**: Thick outlines (3-4px), rounded shapes, warm colors
- **Color Palette**: Earthy browns, vibrant greens, saturated veggie colors
- **Effects**: Water droplets, harvest glow, season particles

## Development Notes
- Using React-style state management with vanilla JS
- Game tick runs every second via setInterval
- Auto-save every 30 seconds to localStorage
- CSS Grid for garden layout
- Emoji/Unicode for initial placeholder graphics

## Session Log

### Session 1 - Initial Setup
- Created project structure
- Implemented core data structures
- Built main garden view with 6x4 grid
- Added basic game mechanics (tilling, planting, watering, harvesting)
- Implemented time system and growth logic
- Created shop, market, and upgrade screens
- Added save/load functionality
- Implemented all 5 plant types
- Added visual polish and basic animations

### Session 2 - Major Refactor & Enhancement
**Date**: November 1, 2025

**Issues Identified**:
1. Harvest bug - vegetables not being collected into inventory
2. Emoji-based graphics not unique or cozy enough
3. Monolithic code structure (single game.js file)
4. No visual effects or animations

**Solutions Implemented**:

#### 1. Modular Architecture
Created organized folder structure:
```
src/
├── classes/         # OOP class modules
│   ├── Game.js      # Main game controller
│   ├── Player.js    # Player data management (FIX: Added addHarvest method)
│   ├── Garden.js    # Garden grid & plant logic
│   ├── UIManager.js # All UI rendering
│   └── ParticleEffects.js # Visual effects system
├── data/            # Game data
│   ├── plants.js    # Plants database
│   └── upgrades.js  # Upgrades & seasons config
└── main.js          # Entry point

styles/
├── main.css         # Base layout & theme
├── garden.css       # Garden & house CSS art
├── plants.css       # Hand-drawn plant sprites (15 unique sprites!)
└── ui.css           # Shop, market, upgrades UI
```

#### 2. Fixed Harvest Bug
**Root Cause**: In old code, `harvestPlant()` didn't call `player.addHarvest()`
**Solution**:
- Created `Player.addHarvest(type, amount)` method in src/classes/Player.js:147
- Called from `Game.harvestPlant()` in src/classes/Game.js:94
- Added console logging to track harvest events

#### 3. Hand-Drawn CSS Plant Sprites
Replaced all emoji with custom CSS art:
- **Tomato**: Green stem with leaves and red tomatoes (3 stages)
- **Lettuce**: Leafy head with radiating leaves (3 stages)
- **Carrot**: Green tops with visible orange root (3 stages)
- **Corn**: Tall stalk with golden corn cob (3 stages)
- **Potato**: Bushy plant with potato hints (3 stages)

Each plant has unique animations:
- Leaf sway animation
- Growth transitions
- Stage-specific visual details

#### 4. CSS Art Gallery
Created entirely in CSS:
- **Cozy House**: Roof, walls, door, windows, chimney (styles/garden.css:3-138)
- **Tool Icons**: Hoe and watering can (styles/ui.css:56-89)
- **Gold Coins**: Gradient with shadow (styles/main.css:79-96)
- **Seed Packets**: Color-coded plant packets (styles/ui.css:29-55)

#### 5. Integrated Libraries
- **Particles.js**: Seasonal particle effects (Spring: flowers, Winter: snow)
- **Anime.js**: Smooth animations for UI transitions
- **Google Fonts**: Fredoka & Comfortaa for cozy typography

#### 6. Visual Effects System
Created ParticleEffects class with:
- `createWaterSplash()` - Blue droplets when watering
- `createHarvestSparkle()` - Golden sparkles on harvest
- `createMoneyPopup()` - +$ animation when selling
- `animatePlantGrowth()` - Elastic bounce on planting
- `updateSeason()` - Dynamic particle colors per season

#### 7. Enhanced UI Components
- Hover effects on all buttons
- 3D shadow effects (box-shadow layering)
- Smooth screen transitions
- Animated indicators (pulse, sparkle, glow)
- Responsive tile states

**Technical Improvements**:
- ES6 Modules for better organization
- Separation of concerns (MVC-like pattern)
- Centralized UI management
- Better state management
- Improved code maintainability

**Result**:
✅ Harvest bug fixed - vegetables now properly increment
✅ Unique visual identity with CSS art
✅ Professional animations and effects
✅ Scalable, maintainable codebase
✅ Cozy, polished game feel

### Session 3 - UI Refinements & Wood Borders
**Date**: November 2, 2025

**User Feedback & Iterations**:

#### Iteration 1: Remove House, Fix Grid & Toolbar
**User Issues**:
- House decoration not wanted
- Background should be blue, not azure
- Grid not visible
- Bottom toolbar not accessible

**Solutions**:
- Removed house decoration from garden
- Changed background to darker blue gradient
- Fixed ES6 module loading issue (file:// protocol) by creating `game-bundle.js`
- Made bottom toolbar visible with proper flex settings

#### Iteration 2: Green Grass Background
**User Feedback**: "vorrei che il bg fosse un prato verde" (I want the bg to be green grass)

**Solutions**:
- Changed all backgrounds from blue to green grass gradients
- Sky → grass transition effect
- Made toolbar more compact to fit viewport

#### Iteration 3: Icon Simplification & Harvest Bug Investigation
**User Issues**:
- Still CSS-drawn tool icons instead of emoji
- **Critical Bug**: "avevo 3 pomodori, ne ho piantato uno e sono arrivato a 2 pomodori, quando lho raccolto sono rimasto a 2" (Had 3 tomatoes, planted 1 → 2 tomatoes, harvested and stayed at 2)

**Root Cause Discovery**:
User was confusing TWO separate inventories:
- **Seeds inventory** (bottom bar) - DECREASES when planting ✅
- **Harvested inventory** (not displayed) - INCREASES when harvesting ✅

Console showed `harvested: {tomato: 2}` but user saw seed count (3 tomato) thinking they're the same!

**Solutions**:
- Changed ALL icons from CSS art to emoji:
  - Tools: 🔨 (hoe), 💧 (water)
  - Plants: 🌱 → 🪴 → 🍅 (growth stages)
- Added 🧺 basket counter in header showing total harvested vegetables
- Added 🔄 Reset button to clear corrupted saves
- Added extensive console logging for debugging
- Reduced all UI elements to fit in single viewport (no scrolling)
- Created DEBUG.md and HARVEST_FIX.md documentation

#### Iteration 4: Harvest Inventory Popup (v2.2)
**User Request**: "devo avere una sorta di menu dove posso vedere i miei prodotti raccolti, magari se premo sul cestino esce una vista" (I need a menu to see my harvested products, maybe when I click the basket)

**Implementation**:
- Created modal popup system with backdrop blur
- Click 🧺 basket icon → opens harvest inventory popup
- Popup displays:
  - Each vegetable with emoji icon
  - Quantity owned
  - Unit price
  - Total value (qty × price)
  - Grand total of all harvested vegetables
- "Go to Market" button for quick navigation
- "Close" button to dismiss
- Empty state: "Your basket is empty! Plant and harvest vegetables to fill your basket"
- Smooth animations (fade in backdrop, slide up modal)

**Files Modified**:
- `index.html`: Added modal structure (lines 161-185)
- `game-bundle.js`: Added `showHarvestPopup()` and `closeHarvestPopup()` methods (lines 1398-1479)
- `styles/main.css`: Added complete modal styling (~260 lines, 325-585)

#### Iteration 5: Wood Bark Borders (v2.3)
**User Request**: "le righe che separano il main dalla top e bottom bar perchè non la facciamo non dritta? magari ricordando il legno con qualche dettaglio che possa ricordare la corteggia di un albero" (why not make the separating lines not straight? maybe resembling wood with details reminiscent of tree bark)

**Implementation - Organic Wood Border Design**:

**Header Bottom Border**:
- Wavy irregular line using SVG `clip-path` with Bezier curves
- Wood grain gradient (alternating `#654321` ↔ `#6B4423`)
- 5 wood knots (elliptical radial gradients) distributed organically
- 10+ vertical grain lines simulating wood texture
- Multiple shadows (inset + drop) for 3D depth

**Bottom Bar Top Border**:
- Mirrored wavy pattern with different rhythm
- Similar wood grain texture with varied pattern
- 6 wood knots positioned naturally
- 8+ vertical grain lines
- Matching shadow effects

**Technical Details**:
- Pure CSS implementation (no images)
- SVG path with `Q` (quadratic curves) and `T` (smooth curves)
- `box-shadow` trick to multiply knots and grain lines
- Radial gradients for knot depth effect
- Linear gradients for wood grain pattern

**Files Modified**:
- `styles/main.css`:
  - `.header::after` - wavy bottom border (lines 72-94)
  - `.header::before` - wood knots (lines 96-113)
  - `.game-container::before` - grain lines (lines 115-136)
  - `.bottom-bar::before` - wavy top border (lines 224-248)
  - `.bottom-bar::after` - wood knots (lines 267-284)
  - `.tools-bar::before` - grain lines (lines 286-305)
- `index.html`: Version bump to v2.3 (line 20)

**Architecture Changes**:
- Converted from ES6 modules to single `game-bundle.js` for file:// protocol compatibility
- All classes bundled: Game, Player, Garden, UIManager, ParticleEffects
- All data included: PLANTS, UPGRADES, SEASONS
- No build process required - pure HTML/CSS/JS

**Visual Design Evolution**:
- v1.0: Emoji-based graphics
- v2.0: Hand-drawn CSS art (complex plant sprites)
- v2.2: Back to emoji for clarity (user preference)
- v2.3: Emoji graphics + rustic wood borders

**Result**:
✅ Dual inventory system clearly communicated
✅ Harvest popup shows detailed inventory with values
✅ Rustic wood borders with organic, natural appearance
✅ Compact UI fits in single viewport
✅ Reset functionality for corrupted saves
✅ Complete documentation (README, DEBUG, HARVEST_FIX)
✅ Green grass aesthetic throughout
✅ Professional modal/popup system
