/* ===========================================
   COZY GARDEN - SVG PLANT SPRITES SYSTEM
   Beautiful pixel-art inspired vector plants
   =========================================== */

const SVGPlants = {
    // =====================================
    // TOMATO PLANT SVG SPRITES
    // =====================================
    tomato: {
        // Stage 0: Tiny seedling
        0: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <!-- Soil mound -->
            <ellipse cx="32" cy="56" rx="18" ry="6" fill="#5a3d2b"/>
            <!-- Stem -->
            <path d="M32 56 L32 42" stroke="#4a7c23" stroke-width="3" stroke-linecap="round"/>
            <!-- Baby leaves -->
            <ellipse cx="28" cy="40" rx="6" ry="4" fill="#7cb342" transform="rotate(-30 28 40)"/>
            <ellipse cx="36" cy="40" rx="6" ry="4" fill="#8bc34a" transform="rotate(30 36 40)"/>
            <!-- Tiny center bud -->
            <circle cx="32" cy="38" r="3" fill="#9ccc65"/>
        </svg>`,

        // Stage 1: Growing plant with small flowers
        1: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <!-- Soil mound -->
            <ellipse cx="32" cy="58" rx="20" ry="6" fill="#5a3d2b"/>
            <!-- Main stem -->
            <path d="M32 58 L32 28 M32 40 L22 35 M32 34 L42 30" stroke="#4a7c23" stroke-width="3" stroke-linecap="round"/>
            <!-- Leaves -->
            <ellipse cx="18" cy="33" rx="8" ry="5" fill="#7cb342" transform="rotate(-20 18 33)"/>
            <ellipse cx="46" cy="28" rx="8" ry="5" fill="#8bc34a" transform="rotate(25 46 28)"/>
            <ellipse cx="28" cy="26" rx="7" ry="4" fill="#9ccc65" transform="rotate(-10 28 26)"/>
            <ellipse cx="38" cy="22" rx="7" ry="4" fill="#7cb342" transform="rotate(15 38 22)"/>
            <!-- Yellow flowers -->
            <circle cx="32" cy="20" r="4" fill="#fdd835"/>
            <circle cx="24" cy="26" r="3" fill="#ffeb3b"/>
        </svg>`,

        // Stage 2: Mature with tomatoes
        2: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="tomatoGrad" cx="30%" cy="30%">
                    <stop offset="0%" stop-color="#ff6b6b"/>
                    <stop offset="100%" stop-color="#e74c3c"/>
                </radialGradient>
                <radialGradient id="tomatoGrad2" cx="30%" cy="30%">
                    <stop offset="0%" stop-color="#ff8a80"/>
                    <stop offset="100%" stop-color="#ef5350"/>
                </radialGradient>
            </defs>
            <!-- Soil mound -->
            <ellipse cx="32" cy="60" rx="22" ry="6" fill="#5a3d2b"/>
            <!-- Main stem and branches -->
            <path d="M32 60 L32 24 M32 45 L18 38 M32 38 L46 32 M32 30 L24 24" stroke="#4a7c23" stroke-width="4" stroke-linecap="round"/>
            <!-- Lush leaves -->
            <ellipse cx="14" cy="36" rx="10" ry="6" fill="#7cb342" transform="rotate(-25 14 36)"/>
            <ellipse cx="50" cy="30" rx="10" ry="6" fill="#8bc34a" transform="rotate(20 50 30)"/>
            <ellipse cx="22" cy="22" rx="8" ry="5" fill="#9ccc65" transform="rotate(-15 22 22)"/>
            <ellipse cx="40" cy="18" rx="8" ry="5" fill="#7cb342" transform="rotate(10 40 18)"/>
            <!-- Ripe tomatoes -->
            <circle cx="20" cy="44" r="9" fill="url(#tomatoGrad)"/>
            <circle cx="20" cy="44" r="9" fill="none" stroke="#c62828" stroke-width="1" opacity="0.3"/>
            <ellipse cx="17" cy="41" rx="3" ry="2" fill="rgba(255,255,255,0.3)"/>
            <circle cx="44" cy="38" r="7" fill="url(#tomatoGrad2)"/>
            <ellipse cx="42" cy="36" rx="2" ry="1.5" fill="rgba(255,255,255,0.3)"/>
            <circle cx="34" cy="48" r="6" fill="url(#tomatoGrad)"/>
            <!-- Tomato stems -->
            <path d="M20 35 L20 38 M44 31 L44 33 M34 42 L34 44" stroke="#2e7d32" stroke-width="2" stroke-linecap="round"/>
            <!-- Star leaves on tomatoes -->
            <path d="M18 35 L22 35 M20 33 L20 37" stroke="#4a7c23" stroke-width="2" stroke-linecap="round"/>
        </svg>`
    },

    // =====================================
    // LETTUCE PLANT SVG SPRITES
    // =====================================
    lettuce: {
        // Stage 0: Small sprout
        0: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="32" cy="56" rx="16" ry="5" fill="#5a3d2b"/>
            <!-- Tiny leaves -->
            <ellipse cx="28" cy="48" rx="8" ry="10" fill="#81c784" transform="rotate(-15 28 48)"/>
            <ellipse cx="36" cy="48" rx="8" ry="10" fill="#a5d6a7" transform="rotate(15 36 48)"/>
            <ellipse cx="32" cy="46" rx="6" ry="8" fill="#c8e6c9"/>
        </svg>`,

        // Stage 1: Growing head
        1: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="32" cy="58" rx="20" ry="6" fill="#5a3d2b"/>
            <!-- Outer leaves -->
            <ellipse cx="22" cy="44" rx="12" ry="16" fill="#66bb6a" transform="rotate(-25 22 44)"/>
            <ellipse cx="42" cy="44" rx="12" ry="16" fill="#81c784" transform="rotate(25 42 44)"/>
            <!-- Middle leaves -->
            <ellipse cx="26" cy="40" rx="10" ry="14" fill="#a5d6a7" transform="rotate(-10 26 40)"/>
            <ellipse cx="38" cy="40" rx="10" ry="14" fill="#c8e6c9" transform="rotate(10 38 40)"/>
            <!-- Center -->
            <ellipse cx="32" cy="38" rx="8" ry="10" fill="#e8f5e9"/>
        </svg>`,

        // Stage 2: Full lettuce head
        2: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="lettuceGrad" cx="50%" cy="30%">
                    <stop offset="0%" stop-color="#e8f5e9"/>
                    <stop offset="50%" stop-color="#a5d6a7"/>
                    <stop offset="100%" stop-color="#66bb6a"/>
                </radialGradient>
            </defs>
            <ellipse cx="32" cy="60" rx="22" ry="6" fill="#5a3d2b"/>
            <!-- Outer ruffled leaves -->
            <ellipse cx="16" cy="42" rx="14" ry="20" fill="#4caf50" transform="rotate(-30 16 42)"/>
            <ellipse cx="48" cy="42" rx="14" ry="20" fill="#66bb6a" transform="rotate(30 48 42)"/>
            <ellipse cx="24" cy="48" rx="12" ry="16" fill="#81c784" transform="rotate(-15 24 48)"/>
            <ellipse cx="40" cy="48" rx="12" ry="16" fill="#a5d6a7" transform="rotate(15 40 48)"/>
            <!-- Middle layer -->
            <ellipse cx="20" cy="38" rx="10" ry="14" fill="#a5d6a7" transform="rotate(-20 20 38)"/>
            <ellipse cx="44" cy="38" rx="10" ry="14" fill="#c8e6c9" transform="rotate(20 44 38)"/>
            <!-- Inner leaves -->
            <ellipse cx="28" cy="34" rx="8" ry="12" fill="#c8e6c9" transform="rotate(-8 28 34)"/>
            <ellipse cx="36" cy="34" rx="8" ry="12" fill="#e8f5e9" transform="rotate(8 36 34)"/>
            <!-- Crisp center -->
            <ellipse cx="32" cy="32" rx="10" ry="12" fill="url(#lettuceGrad)"/>
            <!-- Leaf vein details -->
            <path d="M32 44 L32 28" stroke="#4caf50" stroke-width="1" opacity="0.3"/>
            <path d="M28 42 L24 30" stroke="#4caf50" stroke-width="1" opacity="0.3"/>
            <path d="M36 42 L40 30" stroke="#4caf50" stroke-width="1" opacity="0.3"/>
        </svg>`
    },

    // =====================================
    // CARROT PLANT SVG SPRITES
    // =====================================
    carrot: {
        // Stage 0: Seedling
        0: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="32" cy="56" rx="16" ry="5" fill="#5a3d2b"/>
            <!-- Tiny fronds -->
            <path d="M32 52 L32 40" stroke="#558b2f" stroke-width="2"/>
            <path d="M32 44 L26 36" stroke="#7cb342" stroke-width="2" stroke-linecap="round"/>
            <path d="M32 44 L38 36" stroke="#8bc34a" stroke-width="2" stroke-linecap="round"/>
            <path d="M32 40 L32 32" stroke="#9ccc65" stroke-width="2" stroke-linecap="round"/>
        </svg>`,

        // Stage 1: Growing with visible carrot top
        1: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="32" cy="58" rx="18" ry="6" fill="#5a3d2b"/>
            <!-- Carrot peeking -->
            <ellipse cx="32" cy="56" rx="6" ry="4" fill="#ff9800"/>
            <!-- Feathery fronds -->
            <path d="M32 54 L32 30" stroke="#558b2f" stroke-width="3"/>
            <path d="M32 48 L20 38" stroke="#7cb342" stroke-width="2" stroke-linecap="round"/>
            <path d="M32 48 L44 38" stroke="#7cb342" stroke-width="2" stroke-linecap="round"/>
            <path d="M32 42 L24 30" stroke="#8bc34a" stroke-width="2" stroke-linecap="round"/>
            <path d="M32 42 L40 30" stroke="#8bc34a" stroke-width="2" stroke-linecap="round"/>
            <path d="M32 36 L28 24" stroke="#9ccc65" stroke-width="2" stroke-linecap="round"/>
            <path d="M32 36 L36 24" stroke="#9ccc65" stroke-width="2" stroke-linecap="round"/>
            <path d="M32 30 L32 18" stroke="#aed581" stroke-width="2" stroke-linecap="round"/>
        </svg>`,

        // Stage 2: Mature with big carrot
        2: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="carrotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#ffb74d"/>
                    <stop offset="50%" stop-color="#ff9800"/>
                    <stop offset="100%" stop-color="#f57c00"/>
                </linearGradient>
            </defs>
            <ellipse cx="32" cy="58" rx="20" ry="6" fill="#5a3d2b"/>
            <!-- Big carrot emerging -->
            <ellipse cx="32" cy="54" rx="10" ry="6" fill="url(#carrotGrad)"/>
            <ellipse cx="32" cy="52" rx="8" ry="4" fill="#ffcc80" opacity="0.5"/>
            <!-- Carrot rings detail -->
            <path d="M24 54 Q32 52 40 54" stroke="#e65100" stroke-width="1" fill="none" opacity="0.3"/>
            <path d="M26 56 Q32 54 38 56" stroke="#e65100" stroke-width="1" fill="none" opacity="0.3"/>
            <!-- Lush feathery top -->
            <path d="M32 52 L32 24" stroke="#558b2f" stroke-width="4"/>
            <path d="M32 48 L16 34" stroke="#7cb342" stroke-width="3" stroke-linecap="round"/>
            <path d="M32 48 L48 34" stroke="#7cb342" stroke-width="3" stroke-linecap="round"/>
            <path d="M32 42 L20 26" stroke="#8bc34a" stroke-width="2" stroke-linecap="round"/>
            <path d="M32 42 L44 26" stroke="#8bc34a" stroke-width="2" stroke-linecap="round"/>
            <path d="M32 36 L24 18" stroke="#9ccc65" stroke-width="2" stroke-linecap="round"/>
            <path d="M32 36 L40 18" stroke="#9ccc65" stroke-width="2" stroke-linecap="round"/>
            <path d="M32 30 L28 12" stroke="#aed581" stroke-width="2" stroke-linecap="round"/>
            <path d="M32 30 L36 12" stroke="#aed581" stroke-width="2" stroke-linecap="round"/>
            <path d="M32 24 L32 8" stroke="#c5e1a5" stroke-width="2" stroke-linecap="round"/>
        </svg>`
    },

    // =====================================
    // CORN PLANT SVG SPRITES
    // =====================================
    corn: {
        // Stage 0: Seedling
        0: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="32" cy="56" rx="14" ry="5" fill="#5a3d2b"/>
            <!-- Corn seedling -->
            <path d="M32 56 L32 38" stroke="#7cb342" stroke-width="3"/>
            <ellipse cx="32" cy="36" rx="6" ry="12" fill="#8bc34a" transform="rotate(5 32 36)"/>
            <ellipse cx="32" cy="38" rx="5" ry="10" fill="#9ccc65" transform="rotate(-5 32 38)"/>
        </svg>`,

        // Stage 1: Growing stalk
        1: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="32" cy="60" rx="16" ry="5" fill="#5a3d2b"/>
            <!-- Tall stalk -->
            <path d="M32 60 L32 20" stroke="#689f38" stroke-width="5"/>
            <!-- Long leaves -->
            <ellipse cx="22" cy="50" rx="14" ry="6" fill="#7cb342" transform="rotate(-45 22 50)"/>
            <ellipse cx="42" cy="48" rx="14" ry="6" fill="#8bc34a" transform="rotate(45 42 48)"/>
            <ellipse cx="24" cy="38" rx="12" ry="5" fill="#9ccc65" transform="rotate(-35 24 38)"/>
            <ellipse cx="40" cy="36" rx="12" ry="5" fill="#aed581" transform="rotate(35 40 36)"/>
            <!-- Young tassel -->
            <path d="M32 20 L32 14 M30 18 L28 12 M34 18 L36 12" stroke="#c5e1a5" stroke-width="2" stroke-linecap="round"/>
        </svg>`,

        // Stage 2: Mature with corn cob
        2: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="cornGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#fdd835"/>
                    <stop offset="50%" stop-color="#ffeb3b"/>
                    <stop offset="100%" stop-color="#fdd835"/>
                </linearGradient>
            </defs>
            <ellipse cx="32" cy="62" rx="18" ry="5" fill="#5a3d2b"/>
            <!-- Thick stalk -->
            <path d="M32 62 L32 12" stroke="#558b2f" stroke-width="6"/>
            <!-- Mature leaves -->
            <ellipse cx="18" cy="52" rx="16" ry="7" fill="#689f38" transform="rotate(-50 18 52)"/>
            <ellipse cx="46" cy="50" rx="16" ry="7" fill="#7cb342" transform="rotate(50 46 50)"/>
            <ellipse cx="20" cy="38" rx="14" ry="6" fill="#8bc34a" transform="rotate(-40 20 38)"/>
            <ellipse cx="44" cy="36" rx="14" ry="6" fill="#9ccc65" transform="rotate(40 44 36)"/>
            <!-- Corn cob -->
            <ellipse cx="40" cy="42" rx="8" ry="14" fill="url(#cornGrad)" transform="rotate(15 40 42)"/>
            <!-- Corn kernels pattern -->
            <circle cx="36" cy="36" r="2" fill="#ffc107"/>
            <circle cx="40" cy="34" r="2" fill="#ffca28"/>
            <circle cx="44" cy="36" r="2" fill="#ffc107"/>
            <circle cx="36" cy="42" r="2" fill="#ffca28"/>
            <circle cx="40" cy="40" r="2" fill="#ffc107"/>
            <circle cx="44" cy="42" r="2" fill="#ffca28"/>
            <circle cx="36" cy="48" r="2" fill="#ffc107"/>
            <circle cx="40" cy="46" r="2" fill="#ffca28"/>
            <circle cx="44" cy="48" r="2" fill="#ffc107"/>
            <!-- Corn husk -->
            <path d="M34 52 Q30 44 34 32" stroke="#8bc34a" stroke-width="3" fill="none"/>
            <path d="M46 52 Q50 44 46 32" stroke="#7cb342" stroke-width="3" fill="none"/>
            <!-- Tassel -->
            <path d="M32 12 L32 4 M28 10 L24 2 M36 10 L40 2 M30 8 L26 0 M34 8 L38 0" stroke="#f9a825" stroke-width="2" stroke-linecap="round"/>
        </svg>`
    },

    // =====================================
    // POTATO PLANT SVG SPRITES
    // =====================================
    potato: {
        // Stage 0: Seedling
        0: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="32" cy="56" rx="16" ry="5" fill="#5a3d2b"/>
            <!-- Small plant -->
            <path d="M32 56 L32 44" stroke="#558b2f" stroke-width="3"/>
            <ellipse cx="28" cy="42" rx="6" ry="8" fill="#7cb342" transform="rotate(-20 28 42)"/>
            <ellipse cx="36" cy="42" rx="6" ry="8" fill="#8bc34a" transform="rotate(20 36 42)"/>
            <ellipse cx="32" cy="40" rx="5" ry="6" fill="#9ccc65"/>
        </svg>`,

        // Stage 1: Bushy plant
        1: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="32" cy="58" rx="18" ry="6" fill="#5a3d2b"/>
            <!-- Potato hint underground -->
            <ellipse cx="26" cy="58" rx="6" ry="4" fill="#a1887f" opacity="0.5"/>
            <ellipse cx="38" cy="58" rx="5" ry="3" fill="#8d6e63" opacity="0.4"/>
            <!-- Bushy growth -->
            <path d="M32 56 L32 32" stroke="#558b2f" stroke-width="4"/>
            <path d="M32 48 L24 44 M32 48 L40 44" stroke="#689f38" stroke-width="3"/>
            <ellipse cx="20" cy="42" rx="10" ry="12" fill="#7cb342" transform="rotate(-25 20 42)"/>
            <ellipse cx="44" cy="42" rx="10" ry="12" fill="#8bc34a" transform="rotate(25 44 42)"/>
            <ellipse cx="26" cy="34" rx="8" ry="10" fill="#9ccc65" transform="rotate(-15 26 34)"/>
            <ellipse cx="38" cy="34" rx="8" ry="10" fill="#aed581" transform="rotate(15 38 34)"/>
            <ellipse cx="32" cy="30" rx="6" ry="8" fill="#c5e1a5"/>
        </svg>`,

        // Stage 2: Full bush with potatoes showing
        2: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="potatoGrad" cx="30%" cy="30%">
                    <stop offset="0%" stop-color="#d7ccc8"/>
                    <stop offset="50%" stop-color="#a1887f"/>
                    <stop offset="100%" stop-color="#8d6e63"/>
                </radialGradient>
            </defs>
            <ellipse cx="32" cy="60" rx="22" ry="6" fill="#5a3d2b"/>
            <!-- Potatoes emerging from soil -->
            <ellipse cx="20" cy="58" rx="9" ry="6" fill="url(#potatoGrad)"/>
            <ellipse cx="18" cy="56" rx="3" ry="2" fill="rgba(255,255,255,0.2)"/>
            <ellipse cx="44" cy="58" rx="8" ry="5" fill="url(#potatoGrad)"/>
            <ellipse cx="32" cy="60" rx="7" ry="5" fill="url(#potatoGrad)"/>
            <!-- Potato eyes (dots) -->
            <circle cx="22" cy="58" r="1" fill="#5d4037"/>
            <circle cx="18" cy="60" r="1" fill="#5d4037"/>
            <circle cx="42" cy="56" r="1" fill="#5d4037"/>
            <!-- Lush bushy top -->
            <path d="M32 56 L32 26" stroke="#558b2f" stroke-width="5"/>
            <path d="M32 50 L20 44 M32 50 L44 44 M32 42 L26 36 M32 42 L38 36" stroke="#689f38" stroke-width="3"/>
            <ellipse cx="14" cy="40" rx="12" ry="14" fill="#689f38" transform="rotate(-30 14 40)"/>
            <ellipse cx="50" cy="40" rx="12" ry="14" fill="#7cb342" transform="rotate(30 50 40)"/>
            <ellipse cx="22" cy="32" rx="10" ry="12" fill="#8bc34a" transform="rotate(-20 22 32)"/>
            <ellipse cx="42" cy="32" rx="10" ry="12" fill="#9ccc65" transform="rotate(20 42 32)"/>
            <ellipse cx="28" cy="24" rx="8" ry="10" fill="#aed581" transform="rotate(-10 28 24)"/>
            <ellipse cx="36" cy="24" rx="8" ry="10" fill="#c5e1a5" transform="rotate(10 36 24)"/>
            <ellipse cx="32" cy="20" rx="6" ry="8" fill="#dcedc8"/>
            <!-- Small flowers -->
            <circle cx="26" cy="18" r="4" fill="#e1bee7"/>
            <circle cx="26" cy="18" r="2" fill="#ffeb3b"/>
            <circle cx="38" cy="16" r="3" fill="#f3e5f5"/>
            <circle cx="38" cy="16" r="1.5" fill="#fdd835"/>
        </svg>`
    },

    // =====================================
    // INDICATOR SVGs
    // =====================================
    waterIndicator: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="waterDrop" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#81d4fa"/>
                <stop offset="100%" stop-color="#1976d2"/>
            </linearGradient>
        </defs>
        <path d="M12 2 C12 2 6 10 6 14 C6 18 8.5 22 12 22 C15.5 22 18 18 18 14 C18 10 12 2 12 2Z" fill="url(#waterDrop)"/>
        <ellipse cx="9" cy="12" rx="2" ry="3" fill="rgba(255,255,255,0.4)" transform="rotate(-20 9 12)"/>
    </svg>`,

    harvestIndicator: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="sparkleGrad" cx="50%" cy="50%">
                <stop offset="0%" stop-color="#fff59d"/>
                <stop offset="50%" stop-color="#fdd835"/>
                <stop offset="100%" stop-color="#f9a825"/>
            </radialGradient>
        </defs>
        <!-- 4-point star -->
        <path d="M16 2 L18 12 L28 14 L18 16 L16 26 L14 16 L4 14 L14 12 Z" fill="url(#sparkleGrad)"/>
        <!-- Small sparkles -->
        <circle cx="8" cy="6" r="2" fill="#ffeb3b"/>
        <circle cx="24" cy="8" r="1.5" fill="#fff59d"/>
        <circle cx="6" cy="22" r="1.5" fill="#fdd835"/>
        <circle cx="26" cy="24" r="2" fill="#ffeb3b"/>
    </svg>`,

    // =====================================
    // EFFECT SVGs
    // =====================================
    createWaterSplash: () => `
        <div class="water-splash-effect">
            <div class="water-drop"></div>
            <div class="water-drop"></div>
            <div class="water-drop"></div>
            <div class="water-splash-ground"></div>
        </div>
    `,

    createHarvestParticles: () => `
        <div class="harvest-particles">
            <div class="harvest-particle"></div>
            <div class="harvest-particle"></div>
            <div class="harvest-particle"></div>
            <div class="harvest-particle"></div>
            <div class="harvest-particle"></div>
        </div>
    `,

    // =====================================
    // APPLE TREE SVG SPRITES
    // =====================================
    apple: {
        // Stage 0: Sapling
        0: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="32" cy="58" rx="16" ry="5" fill="#5a3d2b"/>
            <!-- Small trunk -->
            <rect x="29" y="44" width="6" height="14" fill="#8b5a2b" rx="2"/>
            <!-- Small leaves -->
            <ellipse cx="32" cy="40" rx="12" ry="10" fill="#4caf50"/>
            <ellipse cx="26" cy="38" rx="8" ry="6" fill="#66bb6a"/>
            <ellipse cx="38" cy="38" rx="8" ry="6" fill="#81c784"/>
        </svg>`,

        // Stage 1: Young tree
        1: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="32" cy="60" rx="18" ry="5" fill="#5a3d2b"/>
            <!-- Trunk -->
            <rect x="27" y="38" width="10" height="22" fill="#8b5a2b" rx="3"/>
            <rect x="28" y="40" width="3" height="18" fill="#a0724c" rx="1"/>
            <!-- Crown -->
            <ellipse cx="32" cy="30" rx="20" ry="16" fill="#388e3c"/>
            <ellipse cx="24" cy="28" rx="12" ry="10" fill="#4caf50"/>
            <ellipse cx="40" cy="28" rx="12" ry="10" fill="#66bb6a"/>
            <ellipse cx="32" cy="22" rx="10" ry="8" fill="#81c784"/>
        </svg>`,

        // Stage 2: Mature tree
        2: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="32" cy="62" rx="20" ry="5" fill="#5a3d2b"/>
            <!-- Thick trunk -->
            <rect x="25" y="34" width="14" height="28" fill="#795548" rx="4"/>
            <rect x="27" y="36" width="4" height="24" fill="#8d6e63" rx="2"/>
            <!-- Large crown -->
            <ellipse cx="32" cy="24" rx="26" ry="20" fill="#2e7d32"/>
            <ellipse cx="20" cy="22" rx="14" ry="12" fill="#388e3c"/>
            <ellipse cx="44" cy="22" rx="14" ry="12" fill="#43a047"/>
            <ellipse cx="32" cy="16" rx="12" ry="10" fill="#4caf50"/>
            <ellipse cx="26" cy="28" rx="10" ry="8" fill="#66bb6a"/>
            <ellipse cx="38" cy="28" rx="10" ry="8" fill="#81c784"/>
        </svg>`,

        // Stage 3: Mature with fruit
        3: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="appleGrad" cx="30%" cy="30%">
                    <stop offset="0%" stop-color="#f44336"/>
                    <stop offset="100%" stop-color="#c62828"/>
                </radialGradient>
            </defs>
            <ellipse cx="32" cy="62" rx="20" ry="5" fill="#5a3d2b"/>
            <!-- Thick trunk -->
            <rect x="25" y="34" width="14" height="28" fill="#795548" rx="4"/>
            <rect x="27" y="36" width="4" height="24" fill="#8d6e63" rx="2"/>
            <!-- Large crown -->
            <ellipse cx="32" cy="24" rx="26" ry="20" fill="#2e7d32"/>
            <ellipse cx="20" cy="22" rx="14" ry="12" fill="#388e3c"/>
            <ellipse cx="44" cy="22" rx="14" ry="12" fill="#43a047"/>
            <ellipse cx="32" cy="16" rx="12" ry="10" fill="#4caf50"/>
            <!-- Apples -->
            <circle cx="18" cy="28" r="5" fill="url(#appleGrad)"/>
            <circle cx="46" cy="26" r="5" fill="url(#appleGrad)"/>
            <circle cx="32" cy="20" r="4" fill="url(#appleGrad)"/>
            <circle cx="24" cy="34" r="4" fill="url(#appleGrad)"/>
            <circle cx="40" cy="32" r="5" fill="url(#appleGrad)"/>
            <!-- Apple stems -->
            <path d="M18 23 L18 21 M46 21 L46 19 M32 16 L32 14" stroke="#5d4037" stroke-width="1" stroke-linecap="round"/>
        </svg>`
    },

    // =====================================
    // ORANGE TREE SVG SPRITES
    // =====================================
    orange: {
        0: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="32" cy="58" rx="16" ry="5" fill="#5a3d2b"/>
            <rect x="29" y="44" width="6" height="14" fill="#8b5a2b" rx="2"/>
            <ellipse cx="32" cy="40" rx="12" ry="10" fill="#2e7d32"/>
            <ellipse cx="26" cy="38" rx="8" ry="6" fill="#388e3c"/>
            <ellipse cx="38" cy="38" rx="8" ry="6" fill="#43a047"/>
        </svg>`,

        1: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="32" cy="60" rx="18" ry="5" fill="#5a3d2b"/>
            <rect x="27" y="38" width="10" height="22" fill="#8b5a2b" rx="3"/>
            <ellipse cx="32" cy="30" rx="20" ry="16" fill="#1b5e20"/>
            <ellipse cx="24" cy="28" rx="12" ry="10" fill="#2e7d32"/>
            <ellipse cx="40" cy="28" rx="12" ry="10" fill="#388e3c"/>
        </svg>`,

        2: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="32" cy="62" rx="20" ry="5" fill="#5a3d2b"/>
            <rect x="25" y="34" width="14" height="28" fill="#795548" rx="4"/>
            <ellipse cx="32" cy="24" rx="26" ry="20" fill="#1b5e20"/>
            <ellipse cx="20" cy="22" rx="14" ry="12" fill="#2e7d32"/>
            <ellipse cx="44" cy="22" rx="14" ry="12" fill="#388e3c"/>
            <ellipse cx="32" cy="16" rx="12" ry="10" fill="#43a047"/>
        </svg>`,

        3: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="orangeGrad" cx="30%" cy="30%">
                    <stop offset="0%" stop-color="#ffb74d"/>
                    <stop offset="100%" stop-color="#f57c00"/>
                </radialGradient>
            </defs>
            <ellipse cx="32" cy="62" rx="20" ry="5" fill="#5a3d2b"/>
            <rect x="25" y="34" width="14" height="28" fill="#795548" rx="4"/>
            <ellipse cx="32" cy="24" rx="26" ry="20" fill="#1b5e20"/>
            <ellipse cx="20" cy="22" rx="14" ry="12" fill="#2e7d32"/>
            <ellipse cx="44" cy="22" rx="14" ry="12" fill="#388e3c"/>
            <!-- Oranges -->
            <circle cx="16" cy="26" r="5" fill="url(#orangeGrad)"/>
            <circle cx="48" cy="24" r="5" fill="url(#orangeGrad)"/>
            <circle cx="30" cy="18" r="4" fill="url(#orangeGrad)"/>
            <circle cx="42" cy="32" r="5" fill="url(#orangeGrad)"/>
            <circle cx="22" cy="34" r="4" fill="url(#orangeGrad)"/>
        </svg>`
    },

    // =====================================
    // BANANA TREE SVG SPRITES
    // =====================================
    banana: {
        0: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="32" cy="58" rx="16" ry="5" fill="#5a3d2b"/>
            <rect x="29" y="44" width="6" height="14" fill="#6d4c41" rx="2"/>
            <!-- Palm fronds -->
            <ellipse cx="26" cy="40" rx="14" ry="4" fill="#4caf50" transform="rotate(-30 26 40)"/>
            <ellipse cx="38" cy="40" rx="14" ry="4" fill="#66bb6a" transform="rotate(30 38 40)"/>
        </svg>`,

        1: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="32" cy="60" rx="18" ry="5" fill="#5a3d2b"/>
            <rect x="28" y="35" width="8" height="25" fill="#6d4c41" rx="3"/>
            <!-- Larger palm fronds -->
            <ellipse cx="18" cy="32" rx="18" ry="5" fill="#388e3c" transform="rotate(-40 18 32)"/>
            <ellipse cx="46" cy="32" rx="18" ry="5" fill="#4caf50" transform="rotate(40 46 32)"/>
            <ellipse cx="22" cy="26" rx="16" ry="4" fill="#66bb6a" transform="rotate(-20 22 26)"/>
            <ellipse cx="42" cy="26" rx="16" ry="4" fill="#81c784" transform="rotate(20 42 26)"/>
        </svg>`,

        2: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="32" cy="62" rx="20" ry="5" fill="#5a3d2b"/>
            <rect x="26" y="28" width="12" height="34" fill="#5d4037" rx="4"/>
            <rect x="28" y="30" width="4" height="30" fill="#6d4c41" rx="2"/>
            <!-- Full palm crown -->
            <ellipse cx="12" cy="24" rx="20" ry="6" fill="#2e7d32" transform="rotate(-50 12 24)"/>
            <ellipse cx="52" cy="24" rx="20" ry="6" fill="#388e3c" transform="rotate(50 52 24)"/>
            <ellipse cx="18" cy="18" rx="18" ry="5" fill="#43a047" transform="rotate(-30 18 18)"/>
            <ellipse cx="46" cy="18" rx="18" ry="5" fill="#4caf50" transform="rotate(30 46 18)"/>
            <ellipse cx="26" cy="14" rx="14" ry="4" fill="#66bb6a" transform="rotate(-15 26 14)"/>
            <ellipse cx="38" cy="14" rx="14" ry="4" fill="#81c784" transform="rotate(15 38 14)"/>
        </svg>`,

        3: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="bananaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#ffeb3b"/>
                    <stop offset="100%" stop-color="#ffc107"/>
                </linearGradient>
            </defs>
            <ellipse cx="32" cy="62" rx="20" ry="5" fill="#5a3d2b"/>
            <rect x="26" y="28" width="12" height="34" fill="#5d4037" rx="4"/>
            <!-- Palm crown -->
            <ellipse cx="12" cy="24" rx="20" ry="6" fill="#2e7d32" transform="rotate(-50 12 24)"/>
            <ellipse cx="52" cy="24" rx="20" ry="6" fill="#388e3c" transform="rotate(50 52 24)"/>
            <ellipse cx="18" cy="18" rx="18" ry="5" fill="#43a047" transform="rotate(-30 18 18)"/>
            <ellipse cx="46" cy="18" rx="18" ry="5" fill="#4caf50" transform="rotate(30 46 18)"/>
            <!-- Banana bunch -->
            <ellipse cx="32" cy="34" rx="8" ry="4" fill="#8d6e63"/>
            <path d="M24 36 Q20 42 24 48" stroke="url(#bananaGrad)" stroke-width="4" fill="none" stroke-linecap="round"/>
            <path d="M28 36 Q25 43 28 50" stroke="url(#bananaGrad)" stroke-width="4" fill="none" stroke-linecap="round"/>
            <path d="M32 36 Q32 44 32 52" stroke="url(#bananaGrad)" stroke-width="4" fill="none" stroke-linecap="round"/>
            <path d="M36 36 Q39 43 36 50" stroke="url(#bananaGrad)" stroke-width="4" fill="none" stroke-linecap="round"/>
            <path d="M40 36 Q44 42 40 48" stroke="url(#bananaGrad)" stroke-width="4" fill="none" stroke-linecap="round"/>
        </svg>`
    },

    // =====================================
    // PEAR TREE SVG SPRITES
    // =====================================
    pear: {
        0: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="32" cy="58" rx="16" ry="5" fill="#5a3d2b"/>
            <rect x="29" y="44" width="6" height="14" fill="#8b5a2b" rx="2"/>
            <ellipse cx="32" cy="40" rx="12" ry="10" fill="#558b2f"/>
            <ellipse cx="26" cy="38" rx="8" ry="6" fill="#689f38"/>
            <ellipse cx="38" cy="38" rx="8" ry="6" fill="#7cb342"/>
        </svg>`,

        1: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="32" cy="60" rx="18" ry="5" fill="#5a3d2b"/>
            <rect x="27" y="38" width="10" height="22" fill="#8b5a2b" rx="3"/>
            <ellipse cx="32" cy="30" rx="20" ry="16" fill="#33691e"/>
            <ellipse cx="24" cy="28" rx="12" ry="10" fill="#558b2f"/>
            <ellipse cx="40" cy="28" rx="12" ry="10" fill="#689f38"/>
        </svg>`,

        2: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="32" cy="62" rx="20" ry="5" fill="#5a3d2b"/>
            <rect x="25" y="34" width="14" height="28" fill="#795548" rx="4"/>
            <ellipse cx="32" cy="24" rx="26" ry="20" fill="#33691e"/>
            <ellipse cx="20" cy="22" rx="14" ry="12" fill="#558b2f"/>
            <ellipse cx="44" cy="22" rx="14" ry="12" fill="#689f38"/>
            <ellipse cx="32" cy="16" rx="12" ry="10" fill="#7cb342"/>
        </svg>`,

        3: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="pearGrad" cx="30%" cy="30%">
                    <stop offset="0%" stop-color="#dce775"/>
                    <stop offset="100%" stop-color="#afb42b"/>
                </radialGradient>
            </defs>
            <ellipse cx="32" cy="62" rx="20" ry="5" fill="#5a3d2b"/>
            <rect x="25" y="34" width="14" height="28" fill="#795548" rx="4"/>
            <ellipse cx="32" cy="24" rx="26" ry="20" fill="#33691e"/>
            <ellipse cx="20" cy="22" rx="14" ry="12" fill="#558b2f"/>
            <ellipse cx="44" cy="22" rx="14" ry="12" fill="#689f38"/>
            <!-- Pears (pear shape) -->
            <ellipse cx="18" cy="30" rx="4" ry="6" fill="url(#pearGrad)"/>
            <ellipse cx="18" cy="26" rx="3" ry="3" fill="url(#pearGrad)"/>
            <ellipse cx="46" cy="28" rx="4" ry="6" fill="url(#pearGrad)"/>
            <ellipse cx="46" cy="24" rx="3" ry="3" fill="url(#pearGrad)"/>
            <ellipse cx="32" cy="22" rx="3" ry="5" fill="url(#pearGrad)"/>
            <ellipse cx="32" cy="18" rx="2" ry="2" fill="url(#pearGrad)"/>
            <ellipse cx="38" cy="34" rx="4" ry="6" fill="url(#pearGrad)"/>
            <ellipse cx="38" cy="30" rx="3" ry="3" fill="url(#pearGrad)"/>
            <!-- Stems -->
            <path d="M18 22 L18 20 M46 20 L46 18 M32 14 L32 12 M38 26 L38 24" stroke="#5d4037" stroke-width="1" stroke-linecap="round"/>
        </svg>`
    },

    // =====================================
    // DEAD TREE SVG SPRITE
    // =====================================
    deadTree: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="32" cy="62" rx="18" ry="5" fill="#5a3d2b"/>
        <!-- Dead trunk -->
        <rect x="26" y="30" width="12" height="32" fill="#5d4037" rx="3"/>
        <rect x="28" y="32" width="3" height="28" fill="#4e342e" rx="1"/>
        <!-- Bare branches -->
        <path d="M32 30 L32 16 M32 24 L20 14 M32 24 L44 14 M32 20 L24 8 M32 20 L40 8" stroke="#5d4037" stroke-width="3" stroke-linecap="round"/>
        <path d="M20 14 L14 10 M44 14 L50 10 M24 8 L20 4 M40 8 L44 4" stroke="#5d4037" stroke-width="2" stroke-linecap="round"/>
    </svg>`,

    // =====================================
    // TOOL ICONS (hoe, watering can)
    // =====================================
    hoe: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <!-- Wooden handle -->
        <path d="M48 8 L20 40" stroke="#8B5A2B" stroke-width="7" stroke-linecap="round"/>
        <path d="M48 8 L20 40" stroke="#6B4423" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
        <!-- Metal blade -->
        <path d="M12 38 L26 32 L36 48 L20 56 Z" fill="#90A4AE" stroke="#546E7A" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M17 43 L30 38" stroke="#ECEFF1" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
    </svg>`,

    wateringCan: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <!-- Body -->
        <ellipse cx="28" cy="40" rx="16" ry="14" fill="#4FC3F7" stroke="#0288D1" stroke-width="3"/>
        <!-- Shine -->
        <ellipse cx="22" cy="34" rx="4" ry="6" fill="#81D4FA" opacity="0.6"/>
        <!-- Handle -->
        <path d="M20 26 Q28 14 36 26" fill="none" stroke="#0288D1" stroke-width="4" stroke-linecap="round"/>
        <!-- Spout -->
        <path d="M42 34 L56 24" stroke="#0288D1" stroke-width="6" stroke-linecap="round"/>
        <ellipse cx="57" cy="23" rx="4" ry="3" fill="#4FC3F7" stroke="#0288D1" stroke-width="2" transform="rotate(-30 57 23)"/>
        <!-- Droplets -->
        <circle cx="58" cy="34" r="2.5" fill="#4FC3F7"/>
        <circle cx="52" cy="40" r="2" fill="#4FC3F7"/>
    </svg>`,

    // =====================================
    // HELPER METHODS
    // =====================================
    getPlantSVG(plantType, stage) {
        if (this[plantType] && this[plantType][stage] !== undefined) {
            return this[plantType][stage];
        }
        // Fallback to basic seedling
        return this.tomato[0];
    },

    getTreeSVG(fruitType, stage) {
        if (stage === -1) {
            return this.deadTree;
        }
        if (this[fruitType] && this[fruitType][stage] !== undefined) {
            return this[fruitType][stage];
        }
        // Fallback to apple tree
        return this.apple[0];
    },

    getWaterIndicator() {
        return this.waterIndicator;
    },

    getHoeSVG() {
        return this.hoe;
    },

    getWateringCanSVG() {
        return this.wateringCan;
    },

    getHarvestIndicator() {
        return this.harvestIndicator;
    }
};

// Make available globally
window.SVGPlants = SVGPlants;
