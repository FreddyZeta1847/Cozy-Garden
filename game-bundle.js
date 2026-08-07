/*
 * Cozy Garden Game - Complete Bundle
 * All game code in one file for direct browser loading (no build step, no ES6 modules,
 * so it works over the file:// protocol). Contains game data, Player/Garden/FruitGarden
 * state, ParticleEffects, UIManager (DOM rendering), and the Game controller class.
 */

// ==================== DATA ====================

// Plants Database
// bestSeason: +SEASON_BONUS_MULTIPLIER to yield (at harvest) and sell price (at sell time)
// blockedSeason: cannot be planted; an already-growing plant withers if the season shifts into it
const SEASON_BONUS_MULTIPLIER = 1.3;

const PLANTS = {
    tomato: {
        name: "Tomato",
        seedCost: 10,
        growthTime: 120,
        waterInterval: 30,
        harvestYield: 2,
        sellPrice: 8,
        stages: 3,
        bestSeason: "summer",
        blockedSeason: "winter",
        color: "#FF6347",
        secondaryColor: "#8B0000",
        description: "Juicy red tomatoes, perfect for salads"
    },
    lettuce: {
        name: "Lettuce",
        seedCost: 5,
        growthTime: 60,
        waterInterval: 20,
        harvestYield: 5,
        sellPrice: 3,
        stages: 3,
        bestSeason: "spring",
        blockedSeason: "summer",
        color: "#90EE90",
        secondaryColor: "#228B22",
        description: "Crispy fresh lettuce leaves"
    },
    carrot: {
        name: "Carrot",
        seedCost: 8,
        growthTime: 90,
        waterInterval: 25,
        harvestYield: 3,
        sellPrice: 6,
        stages: 3,
        bestSeason: "fall",
        blockedSeason: "summer",
        color: "#FF8C00",
        secondaryColor: "#FF6347",
        description: "Sweet crunchy carrots"
    },
    corn: {
        name: "Corn",
        seedCost: 15,
        growthTime: 180,
        waterInterval: 40,
        harvestYield: 4,
        sellPrice: 10,
        stages: 3,
        bestSeason: "summer",
        blockedSeason: "winter",
        color: "#FFD700",
        secondaryColor: "#FF8C00",
        description: "Golden sweet corn on the cob"
    },
    potato: {
        name: "Potato",
        seedCost: 12,
        growthTime: 150,
        waterInterval: 35,
        harvestYield: 6,
        sellPrice: 4,
        stages: 3,
        bestSeason: "fall",
        blockedSeason: "summer",
        color: "#D2B48C",
        secondaryColor: "#8B7355",
        description: "Hearty russet potatoes"
    },
    cabbage: {
        name: "Cabbage",
        seedCost: 14,
        growthTime: 140,
        waterInterval: 32,
        harvestYield: 4,
        sellPrice: 7,
        stages: 3,
        bestSeason: "winter",
        blockedSeason: "summer",
        color: "#A9D18E",
        secondaryColor: "#4F7942",
        description: "Hearty cabbage that thrives in cold weather"
    },
    pumpkin: {
        name: "Pumpkin",
        seedCost: 22,
        growthTime: 220,
        waterInterval: 45,
        harvestYield: 2,
        sellPrice: 20,
        stages: 3,
        bestSeason: "fall",
        blockedSeason: "winter",
        color: "#FF7518",
        secondaryColor: "#A0522D",
        description: "Plump orange pumpkins, perfect for harvest season"
    },
    garlic: {
        name: "Garlic",
        seedCost: 18,
        growthTime: 100,
        waterInterval: 22,
        harvestYield: 6,
        sellPrice: 9,
        stages: 3,
        bestSeason: "spring",
        blockedSeason: "winter",
        color: "#F5F0E6",
        secondaryColor: "#D8CFC0",
        description: "Pungent garlic bulbs with a strong, savory flavor"
    }
};

// Fruits Database - With Tree Lifecycle System
const FRUITS = {
    apple: {
        name: "Apple",
        seedCost: 80,
        growthTime: 240,        // Time to grow from seed to mature tree (240 game seconds)
        waterInterval: 10,       // Needs water every 10 seconds during growth
        harvestYield: 1,         // Fruits produced per harvest
        sellPrice: 50,           // Price per fruit
        stages: 4,               // Growth stages (0: seed, 1: sapling, 2: young, 3: mature)
        productionInterval: 60,  // NEW: Seconds between fruit production (mature tree only)
        maxHarvests: 10,         // NEW: Total fruits before tree dies
        color: "#DC143C",
        secondaryColor: "#8B0000",
        description: "Crisp red apples from your own tree - produces fruit every 60s"
    },
    orange: {
        name: "Orange",
        seedCost: 100,
        growthTime: 300,
        waterInterval: 12,
        harvestYield: 1,
        sellPrice: 70,
        stages: 4,
        productionInterval: 80,  // NEW: Slower production (premium fruit)
        maxHarvests: 8,          // NEW: Fewer total harvests
        color: "#FF8C00",
        secondaryColor: "#FF6347",
        description: "Juicy sweet oranges - produces fruit every 80s"
    },
    banana: {
        name: "Banana",
        seedCost: 120,
        growthTime: 360,
        waterInterval: 15,
        harvestYield: 1,
        sellPrice: 100,
        stages: 4,
        productionInterval: 100, // NEW: Slowest production (most valuable)
        maxHarvests: 6,          // NEW: Fewest total harvests
        color: "#FFD700",
        secondaryColor: "#FF8C00",
        description: "Tropical yellow bananas - produces fruit every 100s"
    },
    pear: {
        name: "Pear",
        seedCost: 90,
        growthTime: 270,
        waterInterval: 11,
        harvestYield: 1,
        sellPrice: 60,
        stages: 4,
        productionInterval: 70,  // NEW: Moderate production
        maxHarvests: 9,          // NEW: Good longevity
        color: "#9ACD32",
        secondaryColor: "#6B8E23",
        description: "Sweet golden pears - produces fruit every 70s"
    }
};

// Upgrades Database
const UPGRADES = {
    autoWatering: {
        name: "Auto-Watering System",
        icon: "💧",
        description: "Automatically waters all vegetables plants every 30 seconds. No more manual watering!",
        cost: 200,
        effect: "autoWatering"
    },
    fasterGrowth: {
        name: "Fertilizer Package",
        icon: "⚡",
        description: "Plants grow 25% faster with premium fertilizer.",
        cost: 150,
        effect: "fasterGrowth"
    },
    expandedGarden: {
        name: "Garden Expansion",
        icon: "📏",
        description: "Expand your garden to 4×8 tiles for more planting space (adds 2 more columns).",
        cost: 300,
        effect: "expandedGarden"
    },
    premiumOrchard: {
        name: "Premium Orchard",
        icon: "🌳",
        description: "Unlock a premium fruit orchard with 5 tree slots. Grow expensive fruits for high profits!",
        cost: 500,
        effect: "premiumOrchard"
    },
    premiumAutoWatering: {
        name: "Premium Auto Watering",
        icon: "💦",
        description: "Automatically waters all fruits plants every 15 seconds. No more manual watering (for real)!",
        cost: 800,
        effect: "premiumAutoWatering"
    },
    plotCluster1: {
        name: "Plot Cluster I",
        icon: "🌱",
        description: "Clear and unlock 5 more garden plots.",
        cost: 50,
        effect: "plotCluster1",
        plotsToUnlock: 5
    },
    plotCluster2: {
        name: "Plot Cluster II",
        icon: "🌿",
        description: "Clear and unlock 5 more garden plots.",
        cost: 120,
        effect: "plotCluster2",
        plotsToUnlock: 5
    },
    plotCluster3: {
        name: "Plot Cluster III",
        icon: "🌳",
        description: "Clear and unlock 5 more garden plots.",
        cost: 250,
        effect: "plotCluster3",
        plotsToUnlock: 5
    },
    plotCluster4: {
        name: "Plot Cluster IV",
        icon: "🏞️",
        description: "Clear and unlock the last 4 plots, filling your garden.",
        cost: 400,
        effect: "plotCluster4",
        plotsToUnlock: 4
    }
};

// Level System - Progression and Unlocks
const LEVEL_SYSTEM = {
    // XP required for each level (cumulative)
    levels: [
        { level: 1, xpRequired: 0, xpToNext: 100 },      // Start - Lettuce, Tomato
        { level: 2, xpRequired: 100, xpToNext: 150 },    // Unlock Carrot
        { level: 3, xpRequired: 250, xpToNext: 200 },    // Unlock Auto-Watering
        { level: 4, xpRequired: 450, xpToNext: 250 },    // Unlock Potato
        { level: 5, xpRequired: 700, xpToNext: 300 },    // Unlock Faster Growth
        { level: 6, xpRequired: 1000, xpToNext: 350 },   // Unlock Corn
        { level: 7, xpRequired: 1350, xpToNext: 400 },   // Unlock Garden Expansion
        { level: 8, xpRequired: 1750, xpToNext: 500 },   // Unlock Premium Orchard
        { level: 9, xpRequired: 2250, xpToNext: 600 },   // Unlock all fruits
        { level: 10, xpRequired: 2850, xpToNext: 0 }     // Max level - Premium Auto Watering
    ],

    // XP rewards for different actions
    xpRewards: {
        plant: 5,           // XP for planting a seed
        harvest: 10,        // XP for harvesting a crop
        sellItem: 3,        // XP per item sold
        buySeed: 2,         // XP for buying a seed
        waterPlant: 1,      // XP for watering a plant
        purchaseUpgrade: 50 // XP for buying an upgrade
    },

    // Unlock requirements per level
    unlocks: {
        vegetables: {
            lettuce: 1,   // Available from start
            tomato: 1,    // Available from start
            carrot: 2,    // Unlocks at level 2
            potato: 4,    // Unlocks at level 4
            cabbage: 5,   // Unlocks at level 5
            corn: 6,      // Unlocks at level 6
            pumpkin: 7,   // Unlocks at level 7
            garlic: 9     // Unlocks at level 9
        },
        fruits: {
            apple: 8,     // Unlocks at level 8 (requires orchard first)
            pear: 8,      // Unlocks at level 8
            orange: 9,    // Unlocks at level 9
            banana: 9     // Unlocks at level 9
        },
        upgrades: {
            autoWatering: 3,           // Unlocks at level 3
            fasterGrowth: 5,           // Unlocks at level 5
            expandedGarden: 7,         // Unlocks at level 7
            premiumOrchard: 8,         // Unlocks at level 8
            premiumAutoWatering: 10,   // Unlocks at level 10
            plotCluster1: 2,           // Unlocks at level 2
            plotCluster2: 3,           // Unlocks at level 3
            plotCluster3: 5,           // Unlocks at level 5
            plotCluster4: 6            // Unlocks at level 6
        }
    }
};

// Calendar - ticks per in-game day (season duration 300 / DAY_LENGTH 10 = 30 days/season)
const DAY_LENGTH = 10;

// Water neglect - ticks a vegetable can stay thirsty before it rots (3 days)
const ROT_THRESHOLD_TICKS = DAY_LENGTH * 3;

// News - market events that temporarily move vegetable sell prices
const NEWS_CHECK_CHANCE = 0.10; // chance per day to spawn a new event
const MAX_ACTIVE_NEWS = 2;      // max concurrent events

const NEWS_EVENTS = [
    {
        id: 'marketUpswing', headline: 'Market Upswing', icon: '📈',
        scope: 'all', multiplier: 1.15, durationDays: 5,
        message: () => `Vegetable prices are trending up across the board this week!`
    },
    {
        id: 'marketDownturn', headline: 'Market Downturn', icon: '📉',
        scope: 'all', multiplier: 0.85, durationDays: 5,
        message: () => `Vegetable prices are soft across the board this week.`
    },
    {
        id: 'cropShortage', headline: 'Shortage', icon: '🔥',
        scope: 'single', multiplier: 1.4, durationDays: 4,
        message: (target) => `A regional shortage has ${PLANTS[target].name} prices soaring!`
    },
    {
        id: 'cropContamination', headline: 'Contamination Scare', icon: '🦠',
        scope: 'single', multiplier: 0.6, durationDays: 4,
        message: (target) => `Excess fertilizer found in ${PLANTS[target].name} batches - prices have crashed.`
    },
    {
        id: 'heatwave', headline: 'Scorching Heatwave', icon: '🥵',
        scope: 'seasonBlocked', fixedTarget: 'summer', multiplier: 1.25, durationDays: 6,
        message: () => `A brutal heatwave is making cool-weather produce scarce and pricey.`
    },
    {
        id: 'coldSnap', headline: 'Bitter Cold Snap', icon: '🥶',
        scope: 'seasonBlocked', fixedTarget: 'winter', multiplier: 1.25, durationDays: 6,
        message: () => `A harsh cold snap is driving up prices on warm-weather crops that can't be found.`
    },
    {
        id: 'bumperHarvest', headline: 'Bumper Harvest', icon: '🌾',
        scope: 'seasonBest', multiplier: 0.8, durationDays: 5,
        message: (target) => `An excellent growing season has flooded the market with ${target}'s best crops, dropping prices.`
    }
];

// Seasons - Seasonal background images
const SEASONS = [
    {
        name: "Spring",
        icon: "🌸",
        duration: 300, // 5 minutes
        backgroundImage: "assets/images/grass-field/Spring.png",
        colors: {
            sky: "linear-gradient(to bottom, #87CEEB 0%, #7CB342 50%, #558B2F 100%)",
            primary: "#FFB6C1",
            secondary: "#90EE90"
        },
        particles: {
            color: "#FFB6C1",
            count: 30
        }
    },
    {
        name: "Summer",
        icon: "☀️",
        duration: 300, // 5 minutes
        backgroundImage: "assets/images/grass-field/Summer.png",
        colors: {
            sky: "linear-gradient(to bottom, #FFD700 0%, #9CCC65 40%, #689F38 100%)",
            primary: "#FFD700",
            secondary: "#FFA500"
        },
        particles: {
            color: "#FFD700",
            count: 20
        }
    },
    {
        name: "Fall",
        icon: "🍂",
        duration: 300, // 5 minutes
        backgroundImage: "assets/images/grass-field/Autumn.png",
        colors: {
            sky: "linear-gradient(to bottom, #FF8C00 0%, #8BC34A 50%, #558B2F 100%)",
            primary: "#FF8C00",
            secondary: "#D2691E"
        },
        particles: {
            color: "#FF8C00",
            count: 40
        }
    },
    {
        name: "Winter",
        icon: "❄️",
        duration: 300, // 5 minutes
        backgroundImage: "assets/images/grass-field/Winter.png",
        colors: {
            sky: "linear-gradient(to bottom, #E0F7FA 0%, #81C784 50%, #66BB6A 100%)",
            primary: "#B0E0E6",
            secondary: "#87CEEB"
        },
        particles: {
            color: "#FFFFFF",
            count: 50
        }
    }
];

// ==================== CLASSES ====================

// Player Class
class Player {
    constructor() {
        this.money = 100;
        this.level = 1;
        this.xp = 0;
        // Lifetime stats (never decrease, unlike money/inventory) - for the stats panel
        this.totalMoneyEarned = 0;
        this.totalSoldByType = {};
        this.totalHarvestedByType = {};
        this.inventory = {
            seeds: {
                tomato: 5,
                lettuce: 3,
                carrot: 0,
                corn: 0,
                potato: 0
            },
            harvested: {
                tomato: 0,
                lettuce: 0,
                carrot: 0,
                corn: 0,
                potato: 0
            },
            fruitSeeds: {
                apple: 0,
                orange: 0,
                banana: 0,
                pear: 0
            },
            harvestedFruits: {
                apple: 0,
                orange: 0,
                banana: 0,
                pear: 0
            }
        };
        this.upgrades = {
            autoWatering: false,
            fasterGrowth: 1.0,
            expandedGarden: false,
            premiumOrchard: false,
            premiumAutoWatering: false,
            plotCluster1: false,
            plotCluster2: false,
            plotCluster3: false,
            plotCluster4: false
        };
    }

    addMoney(amount) {
        this.money += amount;
        this.totalMoneyEarned += amount;
        console.log(`Added ${amount} money. Total: ${this.money}`);
    }

    spendMoney(amount) {
        if (this.money >= amount) {
            this.money -= amount;
            console.log(`Spent ${amount} money. Remaining: ${this.money}`);
            return true;
        }
        return false;
    }

    addSeed(type, amount = 1) {
        this.inventory.seeds[type] += amount;
        console.log(`Added ${amount} ${type} seeds. Total: ${this.inventory.seeds[type]}`);
    }

    useSeed(type) {
        if (this.inventory.seeds[type] > 0) {
            this.inventory.seeds[type]--;
            console.log(`Used 1 ${type} seed. Remaining: ${this.inventory.seeds[type]}`);
            return true;
        }
        return false;
    }

    addHarvest(type, amount) {
        console.log(`🌾 addHarvest called: type=${type}, amount=${amount}`);
        if (!this.inventory.harvested[type]) {
            this.inventory.harvested[type] = 0;
        }
        const oldTotal = this.inventory.harvested[type];
        this.inventory.harvested[type] += amount;
        this.totalHarvestedByType[type] = (this.totalHarvestedByType[type] || 0) + amount;
        console.log(`🌾 Harvested ${amount} ${type}. Old total: ${oldTotal}, New total: ${this.inventory.harvested[type]}`);
        console.log('🌾 Full harvested inventory:', this.inventory.harvested);
    }

    sellHarvest(type, amount) {
        if (this.inventory.harvested[type] >= amount) {
            this.inventory.harvested[type] -= amount;
            this.totalSoldByType[type] = (this.totalSoldByType[type] || 0) + amount;
            console.log(`Sold ${amount} ${type}. Remaining: ${this.inventory.harvested[type]}`);
            return true;
        }
        return false;
    }

    addFruitSeed(type, amount = 1) {
        if (!this.inventory.fruitSeeds[type]) {
            this.inventory.fruitSeeds[type] = 0;
        }
        this.inventory.fruitSeeds[type] += amount;
        console.log(`Added ${amount} ${type} fruit seeds. Total: ${this.inventory.fruitSeeds[type]}`);
    }

    useFruitSeed(type) {
        if (this.inventory.fruitSeeds[type] > 0) {
            this.inventory.fruitSeeds[type]--;
            console.log(`Used 1 ${type} fruit seed. Remaining: ${this.inventory.fruitSeeds[type]}`);
            return true;
        }
        return false;
    }

    addFruitHarvest(type, amount) {
        console.log(`🍎 addFruitHarvest called: type=${type}, amount=${amount}`);
        if (!this.inventory.harvestedFruits[type]) {
            this.inventory.harvestedFruits[type] = 0;
        }
        const oldTotal = this.inventory.harvestedFruits[type];
        this.inventory.harvestedFruits[type] += amount;
        this.totalHarvestedByType[type] = (this.totalHarvestedByType[type] || 0) + amount;
        console.log(`🍎 Harvested ${amount} ${type}. Old total: ${oldTotal}, New total: ${this.inventory.harvestedFruits[type]}`);
        console.log('🍎 Full harvested fruits inventory:', this.inventory.harvestedFruits);
    }

    sellFruit(type, amount) {
        if (this.inventory.harvestedFruits[type] >= amount) {
            this.inventory.harvestedFruits[type] -= amount;
            this.totalSoldByType[type] = (this.totalSoldByType[type] || 0) + amount;
            console.log(`Sold ${amount} ${type} fruit. Remaining: ${this.inventory.harvestedFruits[type]}`);
            return true;
        }
        return false;
    }

    // Highest cumulative count in a { type: count } map, resolved to a display name via PLANTS/FRUITS
    static topEntry(counts) {
        let bestType = null, bestCount = 0;
        for (const [type, count] of Object.entries(counts)) {
            if (count > bestCount) {
                bestType = type;
                bestCount = count;
            }
        }
        if (!bestType) return null;
        const name = (PLANTS[bestType] || FRUITS[bestType] || {}).name || bestType;
        return { type: bestType, name, count: bestCount };
    }

    getBestSeller() {
        return Player.topEntry(this.totalSoldByType);
    }

    getTopHarvest() {
        return Player.topEntry(this.totalHarvestedByType);
    }

    purchaseUpgrade(upgradeType) {
        switch (upgradeType) {
            case 'autoWatering':
                this.upgrades.autoWatering = true;
                break;
            case 'fasterGrowth':
                this.upgrades.fasterGrowth = 1.25;
                break;
            case 'expandedGarden':
                this.upgrades.expandedGarden = true;
                break;
            case 'premiumOrchard':
                this.upgrades.premiumOrchard = true;
                break;
            case 'premiumAutoWatering':
                this.upgrades.premiumAutoWatering = true;
                break;
            case 'plotCluster1':
                this.upgrades.plotCluster1 = true;
                break;
            case 'plotCluster2':
                this.upgrades.plotCluster2 = true;
                break;
            case 'plotCluster3':
                this.upgrades.plotCluster3 = true;
                break;
            case 'plotCluster4':
                this.upgrades.plotCluster4 = true;
                break;
        }
        console.log(`Purchased upgrade: ${upgradeType}`);
    }

    // Level System Methods
    addXP(amount, actionType = 'general') {
        const oldXP = this.xp;
        const oldLevel = this.level;
        this.xp += amount;

        console.log(`⭐ Gained ${amount} XP from ${actionType}! Total XP: ${this.xp}`);

        // Check for level up
        const leveledUp = this.checkLevelUp();

        return {
            xpGained: amount,
            oldXP,
            newXP: this.xp,
            oldLevel,
            newLevel: this.level,
            leveledUp
        };
    }

    checkLevelUp() {
        let leveledUp = false;

        // Check if player has enough XP for next level
        while (this.level < LEVEL_SYSTEM.levels.length) {
            const currentLevelData = LEVEL_SYSTEM.levels[this.level - 1];
            const nextLevelData = LEVEL_SYSTEM.levels[this.level];

            if (nextLevelData && this.xp >= nextLevelData.xpRequired) {
                this.level++;
                leveledUp = true;
                console.log(`🎉 LEVEL UP! Now level ${this.level}!`);
            } else {
                break;
            }
        }

        return leveledUp;
    }

    getCurrentLevelData() {
        return LEVEL_SYSTEM.levels[this.level - 1];
    }

    getXPProgress() {
        const currentLevelData = this.getCurrentLevelData();
        const xpIntoCurrentLevel = this.xp - currentLevelData.xpRequired;
        const xpNeededForNext = currentLevelData.xpToNext;

        return {
            current: xpIntoCurrentLevel,
            required: xpNeededForNext,
            percentage: xpNeededForNext > 0 ? (xpIntoCurrentLevel / xpNeededForNext) * 100 : 100
        };
    }

    isUnlocked(type, itemKey) {
        const unlockLevel = LEVEL_SYSTEM.unlocks[type]?.[itemKey];
        if (unlockLevel === undefined) return true; // Not in unlock system, assume unlocked
        return this.level >= unlockLevel;
    }

    getUnlockedVegetables() {
        return Object.keys(PLANTS).filter(veg => this.isUnlocked('vegetables', veg));
    }

    getUnlockedFruits() {
        return Object.keys(FRUITS).filter(fruit => this.isUnlocked('fruits', fruit));
    }

    getUnlockedUpgrades() {
        return Object.keys(UPGRADES).filter(upgrade => this.isUnlocked('upgrades', upgrade));
    }

    getSaveData() {
        return {
            money: this.money,
            level: this.level,
            xp: this.xp,
            totalMoneyEarned: this.totalMoneyEarned,
            totalSoldByType: this.totalSoldByType,
            totalHarvestedByType: this.totalHarvestedByType,
            inventory: JSON.parse(JSON.stringify(this.inventory)),
            upgrades: JSON.parse(JSON.stringify(this.upgrades))
        };
    }

    loadSaveData(data) {
        if (data.money !== undefined) this.money = data.money;
        if (data.level !== undefined) this.level = data.level;
        if (data.xp !== undefined) this.xp = data.xp;
        this.totalMoneyEarned = data.totalMoneyEarned || 0;
        this.totalSoldByType = data.totalSoldByType || {};
        this.totalHarvestedByType = data.totalHarvestedByType || {};

        // Merge inventory to ensure backward compatibility
        if (data.inventory) {
            // Preserve existing structure and merge saved data
            if (data.inventory.seeds) {
                Object.assign(this.inventory.seeds, data.inventory.seeds);
            }
            if (data.inventory.harvested) {
                Object.assign(this.inventory.harvested, data.inventory.harvested);
            }
            // Load fruit inventory if exists (new in v2.8)
            if (data.inventory.fruitSeeds) {
                Object.assign(this.inventory.fruitSeeds, data.inventory.fruitSeeds);
            }
            if (data.inventory.harvestedFruits) {
                Object.assign(this.inventory.harvestedFruits, data.inventory.harvestedFruits);
            }
        }

        // Merge upgrades to ensure backward compatibility
        if (data.upgrades) {
            Object.assign(this.upgrades, data.upgrades);
        }

        console.log('Player data loaded:', this);
    }
}

// Garden Class
class Garden {
    constructor(rows = 4, cols = 6, startingUnlockedPlots = 5) {
        this.rows = rows;
        this.cols = cols;
        this.grid = [];
        this.unlockedCount = startingUnlockedPlots;
        this.initializeGrid();
    }

    initializeGrid() {
        let index = 0;
        for (let row = 0; row < this.rows; row++) {
            this.grid[row] = [];
            for (let col = 0; col < this.cols; col++) {
                const cell = this.createEmptyCell();
                if (index >= this.unlockedCount) {
                    cell.status = 'locked';
                }
                this.grid[row][col] = cell;
                index++;
            }
        }
    }

    createEmptyCell() {
        return {
            status: 'empty',
            plantType: null,
            growthStage: 0,
            lastWatered: 0,
            needsWater: false,
            readyToHarvest: false,
            plantedAt: 0,
            thirstySince: null,   // game time when the current dry streak began, null if not thirsty
            totalDryTicks: 0      // cumulative ticks spent thirsty over this plant's life - locks the growth clock
        };
    }

    expand(newRows, newCols) {
        const oldRows = this.rows;
        const oldCols = this.cols;

        for (let row = oldRows; row < newRows; row++) {
            this.grid[row] = [];
            for (let col = 0; col < newCols; col++) {
                this.grid[row][col] = this.createEmptyCell();
            }
        }

        for (let row = 0; row < oldRows; row++) {
            for (let col = oldCols; col < newCols; col++) {
                this.grid[row][col] = this.createEmptyCell();
            }
        }

        this.rows = newRows;
        this.cols = newCols;
        this.unlockedCount += (newRows * newCols) - (oldRows * oldCols);
        console.log(`Garden expanded to ${newRows}x${newCols}`);
    }

    // Unlocks up to `count` locked plots, in reading order. Returns how many were actually unlocked.
    unlockNextPlots(count) {
        let unlocked = 0;
        for (let row = 0; row < this.rows && unlocked < count; row++) {
            for (let col = 0; col < this.cols && unlocked < count; col++) {
                if (this.grid[row][col].status === 'locked') {
                    this.grid[row][col] = this.createEmptyCell();
                    unlocked++;
                }
            }
        }
        this.unlockedCount += unlocked;
        console.log(`Unlocked ${unlocked} plot(s), total unlocked: ${this.unlockedCount}`);
        return unlocked;
    }

    getCell(row, col) {
        if (row >= 0 && row < this.rows && col >= 0 && col < this.cols) {
            return this.grid[row][col];
        }
        return null;
    }

    till(row, col) {
        const cell = this.getCell(row, col);
        if (cell && cell.status === 'empty') {
            cell.status = 'tilled';
            return true;
        }
        return false;
    }

    plant(row, col, plantType, currentTime) {
        const cell = this.getCell(row, col);
        if (cell && cell.status === 'tilled') {
            cell.status = 'planted';
            cell.plantType = plantType;
            cell.growthStage = 0;
            cell.plantedAt = currentTime;
            cell.lastWatered = currentTime;
            cell.needsWater = false;
            cell.readyToHarvest = false;
            cell.thirstySince = null;
            cell.totalDryTicks = 0;
            console.log(`Planted ${plantType} at ${row},${col}`);
            return true;
        }
        return false;
    }

    water(row, col, currentTime) {
        const cell = this.getCell(row, col);
        if (cell && (cell.status === 'planted' || cell.status === 'growing')) {
            cell.lastWatered = currentTime;
            cell.needsWater = false;
            cell.thirstySince = null;
            console.log(`Watered plant at ${row},${col}`);
            return true;
        }
        return false;
    }

    harvest(row, col) {
        const cell = this.getCell(row, col);
        console.log(`🌾 Garden.harvest - cell at [${row},${col}]:`, cell);

        if (cell && cell.readyToHarvest) {
            const plantType = cell.plantType;
            const plant = PLANTS[plantType];
            const yield_ = plant.harvestYield;

            console.log(`🌾 Plant ready! Type: ${plantType}, Yield: ${yield_}`);
            this.grid[row][col] = this.createEmptyCell();

            console.log(`🌾 Harvested ${yield_} ${plantType} from [${row},${col}]`);
            return { plantType, yield: yield_ };
        }

        console.log(`🌾 Cell not ready to harvest. readyToHarvest: ${cell ? cell.readyToHarvest : 'cell is null'}`);
        return null;
    }

    updateGrowth(currentTime, growthMultiplier = 1.0) {
        let updated = false;
        const stageChanges = []; // Track cells that changed growth stage
        const rottedCells = []; // Track cells lost to prolonged neglect

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const cell = this.grid[row][col];

                if (cell.status === 'planted' || cell.status === 'growing') {
                    const plant = PLANTS[cell.plantType];
                    cell.totalDryTicks = cell.totalDryTicks || 0;

                    const timeSinceWatered = currentTime - cell.lastWatered;
                    if (timeSinceWatered > plant.waterInterval) {
                        if (!cell.needsWater) {
                            cell.needsWater = true;
                            updated = true;
                        }
                        if (cell.thirstySince === null || cell.thirstySince === undefined) {
                            cell.thirstySince = currentTime;
                        }

                        cell.totalDryTicks++; // growth clock stays locked while thirsty

                        if (currentTime - cell.thirstySince >= ROT_THRESHOLD_TICKS) {
                            rottedCells.push({ row, col, plantName: plant.name });
                            this.grid[row][col] = this.createEmptyCell();
                            updated = true;
                        }

                        continue;
                    }

                    const adjustedGrowthTime = plant.growthTime / growthMultiplier;
                    const stageTime = adjustedGrowthTime / plant.stages;
                    const timeSincePlanted = Math.max(0, (currentTime - cell.plantedAt) - cell.totalDryTicks);
                    const newStage = Math.min(
                        Math.floor(timeSincePlanted / stageTime),
                        plant.stages - 1
                    );

                    if (newStage !== cell.growthStage) {
                        cell.growthStage = newStage;
                        cell.status = 'growing';
                        updated = true;
                        stageChanges.push({ row, col }); // Track this cell for animation
                    }

                    if (cell.growthStage === plant.stages - 1 && !cell.readyToHarvest) {
                        cell.readyToHarvest = true;
                        updated = true;
                    }
                }
            }
        }

        return { updated, stageChanges, rottedCells };
    }

    autoWater(currentTime) {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const cell = this.grid[row][col];
                if (cell.status === 'planted' || cell.status === 'growing') {
                    cell.lastWatered = currentTime;
                    cell.needsWater = false;
                    cell.thirstySince = null;
                }
            }
        }
        console.log('Auto-watered all plants');
    }

    getSaveData() {
        return {
            rows: this.rows,
            cols: this.cols,
            unlockedCount: this.unlockedCount,
            grid: JSON.parse(JSON.stringify(this.grid))
        };
    }

    loadSaveData(data) {
        if (data.rows) this.rows = data.rows;
        if (data.cols) this.cols = data.cols;

        // Backward compatibility: saves from before plot-locking existed had every
        // plot free to use - don't retroactively lock plots a returning player already had.
        this.unlockedCount = data.unlockedCount !== undefined ? data.unlockedCount : this.rows * this.cols;

        // Backward compatibility: Fix old 5x8 expansion to 4x8
        if (this.rows === 5 && this.cols === 8) {
            console.log('🔧 Fixing old 5×8 garden to 4×8...');
            this.rows = 4;
            // Remove the 5th row from grid if it exists
            if (data.grid && data.grid.length === 5) {
                data.grid = data.grid.slice(0, 4); // Keep only first 4 rows
            }
        }

        if (data.grid) this.grid = data.grid;
        console.log(`Garden data loaded: ${this.rows}×${this.cols}`);
    }
}

// Fruit Garden Class
class FruitGarden {
    constructor() {
        this.slots = 5;
        this.trees = [];
        this.initializeTrees();
    }

    initializeTrees() {
        for (let i = 0; i < this.slots; i++) {
            this.trees[i] = this.createEmptyTree();
        }
    }

    createEmptyTree() {
        return {
            status: 'empty',           // 'empty', 'planted', 'growing', 'mature', 'producing', 'dead'
            fruitType: null,
            growthStage: 0,            // 0: seed, 1: sapling, 2: young, 3: mature
            lastWatered: 0,
            needsWater: false,
            readyToHarvest: false,     // True when fruit is ready to pick
            plantedAt: 0,
            harvestCount: 0,           // Total fruits harvested from this tree
            lastProduced: 0,           // NEW: Timestamp of last fruit production
            isMature: false            // NEW: True when tree reaches final growth stage
        };
    }

    getTree(slot) {
        if (slot >= 0 && slot < this.slots) {
            return this.trees[slot];
        }
        return null;
    }

    plantTree(slot, fruitType, currentTime) {
        const tree = this.getTree(slot);
        if (tree && (tree.status === 'empty' || tree.status === 'tilled')) {
            tree.status = 'planted';
            tree.fruitType = fruitType;
            tree.growthStage = 0;
            tree.plantedAt = currentTime;
            tree.lastWatered = currentTime;
            tree.needsWater = false;
            tree.readyToHarvest = false;
            console.log(`Planted ${fruitType} tree in slot ${slot}`);
            return true;
        }
        return false;
    }

    waterTree(slot, currentTime) {
        const tree = this.getTree(slot);
        if (tree && (tree.status === 'planted' || tree.status === 'growing')) {
            tree.lastWatered = currentTime;
            tree.needsWater = false;
            console.log(`Watered fruit tree in slot ${slot}`);
            return true;
        }
        return false;
    }

    harvestFruit(slot, currentTime) {
        const tree = this.getTree(slot);
        console.log(`🍎 FruitGarden.harvestFruit - tree at slot ${slot}:`, tree);

        if (tree && tree.readyToHarvest) {
            const fruitType = tree.fruitType;
            const fruit = FRUITS[fruitType];
            const yield_ = fruit.harvestYield;

            console.log(`🍎 Fruit ready! Type: ${fruitType}, Yield: ${yield_}`);

            // Increment harvest count
            tree.harvestCount = (tree.harvestCount || 0) + 1;

            // Check if tree has reached max harvests (tree dies)
            if (tree.harvestCount >= fruit.maxHarvests) {
                console.log(`🍎 Tree has produced ${tree.harvestCount}/${fruit.maxHarvests} times - tree dies 🍂`);
                tree.status = 'dead';
                tree.readyToHarvest = false;
                tree.growthStage = -1; // Special stage for dead tree
                console.log(`🍎 Tree died after ${tree.harvestCount} harvests. Click to remove.`);
            } else {
                // Tree remains mature, start production timer for next fruit
                tree.readyToHarvest = false;
                tree.lastProduced = currentTime;
                tree.status = 'mature';
                console.log(`🍎 Harvested ${yield_} ${fruitType} from slot ${slot} (${tree.harvestCount}/${fruit.maxHarvests} harvests)`);
                console.log(`🍎 Next fruit in ${fruit.productionInterval} seconds`);
            }

            return { fruitType, yield: yield_ };
        }

        console.log(`🍎 Tree not ready to harvest. readyToHarvest: ${tree ? tree.readyToHarvest : 'tree is null'}`);
        return null;
    }

    updateGrowth(currentTime, growthMultiplier = 1.0) {
        let updated = false;

        for (let slot = 0; slot < this.slots; slot++) {
            const tree = this.trees[slot];

            // Skip empty and dead trees
            if (tree.status === 'empty' || tree.status === 'dead') continue;

            const fruit = FRUITS[tree.fruitType];

            // PHASE 1: Growing to maturity (planted → mature)
            if (tree.status === 'planted' || tree.status === 'growing') {
                // Check if tree needs water during growth
                const timeSinceWatered = currentTime - tree.lastWatered;
                if (timeSinceWatered > fruit.waterInterval) {
                    if (!tree.needsWater) {
                        tree.needsWater = true;
                        updated = true;
                    }
                    continue; // Stop growth if needs water
                }

                // Calculate growth stage
                const adjustedGrowthTime = fruit.growthTime / growthMultiplier;
                const stageTime = adjustedGrowthTime / fruit.stages;
                const timeSincePlanted = currentTime - tree.plantedAt;
                const newStage = Math.min(
                    Math.floor(timeSincePlanted / stageTime),
                    fruit.stages - 1
                );

                if (newStage !== tree.growthStage) {
                    tree.growthStage = newStage;
                    tree.status = 'growing';
                    updated = true;
                }

                // Tree reaches maturity (final growth stage)
                if (tree.growthStage === fruit.stages - 1 && !tree.isMature) {
                    tree.isMature = true;
                    tree.status = 'mature';
                    tree.lastProduced = currentTime; // Start production timer
                    updated = true;
                    console.log(`🌳 Tree in slot ${slot} reached maturity! Starting fruit production...`);
                }
            }

            // PHASE 2: Mature tree producing fruit periodically
            if (tree.status === 'mature' && tree.isMature) {
                const timeSinceProduced = currentTime - tree.lastProduced;

                // Check if it's time to produce a new fruit
                if (timeSinceProduced >= fruit.productionInterval && !tree.readyToHarvest) {
                    tree.readyToHarvest = true;
                    updated = true;
                    console.log(`🍎 Fruit ready in slot ${slot}! (${tree.harvestCount + 1}/${fruit.maxHarvests})`);
                }
            }
        }

        return updated;
    }

    autoWater(currentTime) {
        for (let slot = 0; slot < this.slots; slot++) {
            const tree = this.trees[slot];
            if (tree.status === 'planted' || tree.status === 'growing') {
                tree.lastWatered = currentTime;
                tree.needsWater = false;
            }
        }
        console.log('Auto-watered all fruit trees');
    }

    getSaveData() {
        return {
            slots: this.slots,
            trees: JSON.parse(JSON.stringify(this.trees))
        };
    }

    loadSaveData(data) {
        if (data.slots) this.slots = data.slots;
        if (data.trees) this.trees = data.trees;
        console.log('Fruit garden data loaded');
    }
}

// Particle Effects Class
class ParticleEffects {
    constructor() {
        this.initializeParticles();
    }

    initializeParticles() {
        if (window.particlesJS) {
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 30,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: '#ffffff'
                    },
                    shape: {
                        type: 'circle'
                    },
                    opacity: {
                        value: 0.3,
                        random: true
                    },
                    size: {
                        value: 3,
                        random: true
                    },
                    line_linked: {
                        enable: false
                    },
                    move: {
                        enable: true,
                        speed: 1,
                        direction: 'bottom',
                        random: true,
                        straight: false,
                        out_mode: 'out',
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: {
                            enable: false
                        },
                        onclick: {
                            enable: false
                        },
                        resize: true
                    }
                },
                retina_detect: true
            });
        }
    }

    updateSeason(season) {
        const config = {
            Spring: { color: '#FFB6C1', count: 30, speed: 1 },
            Summer: { color: '#FFD700', count: 20, speed: 0.5 },
            Fall: { color: '#FF8C00', count: 40, speed: 2 },
            Winter: { color: '#FFFFFF', count: 50, speed: 1.5 }
        };

        const settings = config[season];
        if (settings && window.pJSDom && window.pJSDom[0]) {
            window.pJSDom[0].pJS.particles.color.value = settings.color;
            window.pJSDom[0].pJS.particles.number.value = settings.count;
            window.pJSDom[0].pJS.particles.move.speed = settings.speed;
            window.pJSDom[0].pJS.fn.particlesRefresh();
        }
    }

    createWaterSplash(element) {
        const splash = document.createElement('div');
        splash.className = 'water-splash-effect';
        splash.innerHTML = '💧💧💧';
        element.appendChild(splash);

        if (window.anime) {
            anime({
                targets: splash,
                translateY: [-20, 0],
                opacity: [1, 0],
                scale: [0.5, 1.5],
                duration: 600,
                easing: 'easeOutQuad',
                complete: () => splash.remove()
            });
        } else {
            setTimeout(() => splash.remove(), 600);
        }
    }

    createHarvestSparkle(element) {
        const sparkles = document.createElement('div');
        sparkles.className = 'harvest-sparkles';
        sparkles.innerHTML = '✨✨✨';
        element.appendChild(sparkles);

        if (window.anime) {
            anime({
                targets: sparkles,
                translateY: [0, -30],
                opacity: [1, 0],
                scale: [1, 2],
                rotate: 360,
                duration: 800,
                easing: 'easeOutQuad',
                complete: () => sparkles.remove()
            });
        } else {
            setTimeout(() => sparkles.remove(), 800);
        }
    }

    createMoneyPopup(element, amount) {
        const popup = document.createElement('div');
        popup.className = 'money-popup';
        popup.innerHTML = `+$${amount}`;
        element.appendChild(popup);

        if (window.anime) {
            anime({
                targets: popup,
                translateY: [0, -50],
                opacity: [1, 0],
                scale: [0.5, 1.2],
                duration: 1000,
                easing: 'easeOutCubic',
                complete: () => popup.remove()
            });
        } else {
            setTimeout(() => popup.remove(), 1000);
        }
    }

    animatePlantGrowth(element) {
        if (window.anime) {
            anime({
                targets: element,
                scale: [0.8, 1],
                opacity: [0.5, 1],
                duration: 500,
                easing: 'easeOutElastic(1, .6)'
            });
        }
    }

    animateTilePulse(element) {
        if (window.anime) {
            anime({
                targets: element,
                scale: [1, 1.05, 1],
                duration: 400,
                easing: 'easeInOutQuad'
            });
        }
    }
}

// UI Manager Class
class UIManager {
    constructor(game) {
        this.game = game;
        this.currentScreen = 'garden';
    }

    updateAll() {
        this.updateMoney();
        this.updateHarvestedCount();
        this.updateLevelDisplay();
        this.updateSeedSelector();
        this.updateSeason();
        this.updateGardenLockState();
        this.updateStatsPanel();
    }

    updateStatsPanel() {
        const stats = this.game.getLifetimeStats();
        const totalEarnedEl = document.getElementById('stat-total-earned');
        const bestSellerEl = document.getElementById('stat-best-seller');
        const topHarvestEl = document.getElementById('stat-top-harvest');
        const playTimeEl = document.getElementById('stat-play-time');

        if (totalEarnedEl) totalEarnedEl.textContent = stats.totalMoneyEarned;
        if (bestSellerEl) bestSellerEl.textContent = stats.bestSeller ? `${stats.bestSeller.name} (${stats.bestSeller.count})` : '-';
        if (topHarvestEl) topHarvestEl.textContent = stats.topHarvest ? `${stats.topHarvest.name} (${stats.topHarvest.count})` : '-';
        if (playTimeEl) playTimeEl.textContent = stats.playTime;
    }

    // Grey out + lock-badge the Fruit Garden entry points until Premium Orchard is purchased
    updateGardenLockState() {
        const unlocked = this.game.player.upgrades.premiumOrchard;
        const switchOption = document.querySelector('.garden-switch-option[data-garden="fruits"]');
        const fruitDot = document.querySelector('.garden-dot[data-garden="fruits"]');

        if (switchOption) {
            switchOption.classList.toggle('locked', !unlocked);
            switchOption.title = unlocked ? '' : 'Locked - Purchase Premium Orchard (Level 8)';
        }
        if (fruitDot) {
            fruitDot.classList.toggle('locked', !unlocked);
        }
    }

    updateMoney() {
        const money = this.game.player.money;
        const displays = ['money-display', 'shop-money', 'market-money', 'upgrades-money'];
        displays.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = money;
        });
    }

    updateHarvestedCount() {
        // Count total harvested vegetables and fruits
        let total = 0;
        if (this.game.player.inventory.harvested) {
            for (const count of Object.values(this.game.player.inventory.harvested)) {
                total += count;
            }
        }
        // Add fruits if orchard unlocked
        if (this.game.player.upgrades.premiumOrchard && this.game.player.inventory.harvestedFruits) {
            for (const count of Object.values(this.game.player.inventory.harvestedFruits)) {
                total += count;
            }
        }
        const el = document.getElementById('harvested-count');
        if (el) {
            el.textContent = total;
            console.log(`🧺 Updated harvested display: ${total} total produce`);
        }
    }

    updateLevelDisplay() {
        const levelNum = document.getElementById('level-number');
        const xpBar = document.getElementById('xp-bar');
        const xpText = document.getElementById('xp-text');

        if (!levelNum || !xpBar || !xpText) return;

        const player = this.game.player;
        const progress = player.getXPProgress();

        levelNum.textContent = player.level;
        xpBar.style.width = `${progress.percentage}%`;

        // Display XP text
        if (progress.required > 0) {
            xpText.textContent = `${progress.current} / ${progress.required} XP`;
        } else {
            xpText.textContent = 'MAX LEVEL';
        }

        console.log(`⭐ Level display updated: Level ${player.level}, ${progress.current}/${progress.required} XP (${progress.percentage.toFixed(1)}%)`);
    }

    updateSeedSelector() {
        const vegetableSection = document.getElementById('vegetable-seeds');
        const fruitSection = document.getElementById('fruit-seeds');
        if (!vegetableSection || !fruitSection) return;

        vegetableSection.innerHTML = '';
        fruitSection.innerHTML = '';

        // Crop emoji icons (fully grown)
        const cropIcons = {
            tomato: '🍅', lettuce: '🥬', carrot: '🥕', corn: '🌽', potato: '🥔',
            cabbage: '🥬', pumpkin: '🎃', garlic: '🧄'
        };

        // Fruit emoji icons
        const fruitIcons = {
            apple: '🍎',
            orange: '🍊',
            banana: '🍌',
            pear: '🍐'
        };

        // Render every vegetable - unlocked ones are selectable, locked ones show a level badge
        const unlockedVegetables = this.game.player.getUnlockedVegetables();
        for (const [key, plant] of Object.entries(PLANTS)) {
            const isUnlocked = unlockedVegetables.includes(key);
            const requiredLevel = LEVEL_SYSTEM.unlocks.vegetables[key] || 1;
            const count = this.game.player.inventory.seeds[key] || 0;
            vegetableSection.appendChild(this.createSeedMenuButton({
                key, name: plant.name, icon: cropIcons[key] || '🌱',
                isUnlocked, requiredLevel, count,
                isActive: this.game.selectedSeed === key && this.game.selectedTool === `seed-${key}`,
                onSelect: () => this.game.selectSeed(key)
            }));
        }

        // Render every fruit - locked until the orchard is purchased, then per-level like vegetables
        const unlockedFruits = this.game.player.getUnlockedFruits();
        const hasOrchard = this.game.player.upgrades.premiumOrchard;

        for (const [key, fruit] of Object.entries(FRUITS)) {
            const isUnlocked = hasOrchard && unlockedFruits.includes(key);
            const requiredLevel = LEVEL_SYSTEM.unlocks.fruits[key] || 1;
            const count = this.game.player.inventory.fruitSeeds[key] || 0;
            fruitSection.appendChild(this.createSeedMenuButton({
                key, name: fruit.name, icon: fruitIcons[key] || '🌳',
                isUnlocked, requiredLevel, count,
                lockReason: hasOrchard ? null : 'Requires Premium Orchard',
                isActive: this.game.selectedSeed === key && this.game.selectedTool === `seed-${key}`,
                onSelect: () => this.game.selectSeed(key)
            }));
        }
    }

    // Shared builder for one seed/fruit button in the expandable seed menu
    createSeedMenuButton({ key, name, icon, isUnlocked, requiredLevel, count, isActive, onSelect, lockReason }) {
        const btn = document.createElement('button');
        btn.className = 'seed-button';
        btn.dataset.seed = key;

        if (!isUnlocked) {
            btn.classList.add('locked');
        } else if (count === 0) {
            btn.classList.add('disabled');
        }
        if (isActive) {
            btn.classList.add('active');
        }

        btn.onclick = () => {
            if (!isUnlocked) {
                this.showToast('error', '🔒', 'Locked', lockReason || `Unlocks at Level ${requiredLevel}`);
                return;
            }
            if (count > 0) onSelect();
        };

        const seedVisual = document.createElement('div');
        seedVisual.className = 'seed-icon';
        seedVisual.textContent = icon;
        seedVisual.style.fontSize = '32px';

        const countLabel = document.createElement('span');
        countLabel.className = 'seed-count';
        countLabel.textContent = isUnlocked ? count : '';

        const nameLabel = document.createElement('span');
        nameLabel.className = 'seed-name';
        nameLabel.textContent = name;

        btn.appendChild(seedVisual);
        btn.appendChild(countLabel);
        btn.appendChild(nameLabel);

        return btn;
    }

    // Updates the collapsed seed-menu button to summarize what's currently selected
    updateSeason() {
        const season = SEASONS[this.game.currentSeason];
        const display = document.getElementById('season-display');
        if (display) {
            const seasonIcon = display.querySelector('.season-icon');
            if (seasonIcon) {
                seasonIcon.textContent = season.icon;
            }
            const seasonName = display.querySelector('.topbar-season-text');
            if (seasonName) {
                seasonName.textContent = season.name;
            }
        }
        this.updateCalendarText();

        // Add data-season attribute to body - the seasonal CSS gradient (--season-background)
        // reacts to this automatically, no background image needed
        document.body.setAttribute('data-season', season.name.toLowerCase());

        if (this.game.particles) {
            this.game.particles.updateSeason(season.name);
        }
    }

    updateCalendarText() {
        const dateText = document.getElementById('topbar-date-text');
        if (dateText) {
            const info = this.game.getCalendarInfo();
            dateText.textContent = `Day ${info.day}, Year ${info.year}`;
        }
    }

    transitionSeason(previousSeason, newSeason) {
        // Add transition class to body for smooth CSS transitions
        document.body.classList.add('season-transitioning');

        // Show beautiful season change notification
        this.showSeasonChangeNotification(previousSeason, newSeason);

        // Update season display with animation
        const display = document.getElementById('season-display');
        if (display) {
            // Fade out old season
            display.style.opacity = '0';
            display.style.transform = 'translateY(-10px)';

            setTimeout(() => {
                // Update icon and name
                const seasonIcon = display.querySelector('.season-icon');
                if (seasonIcon) {
                    seasonIcon.textContent = newSeason.icon;
                }
                const seasonName = display.querySelector('.topbar-season-text');
                if (seasonName) {
                    seasonName.textContent = newSeason.name;
                }
                this.updateCalendarText();

                // Fade in new season
                display.style.opacity = '1';
                display.style.transform = 'translateY(0)';
            }, 300);
        }

        // Smoothly transition data-season attribute - the CSS gradient (--season-background)
        // and its existing --season-primary/--season-secondary transition handle the crossfade
        document.body.style.opacity = '0.85';
        setTimeout(() => {
            document.body.setAttribute('data-season', newSeason.name.toLowerCase());
            document.body.style.opacity = '1';

            setTimeout(() => {
                document.body.classList.remove('season-transitioning');
            }, 800);
        }, 400);

        // Update particles with animation
        if (this.game.particles) {
            this.game.particles.updateSeason(newSeason.name);
        }
    }

    showSeasonChangeNotification(previousSeason, newSeason) {
        // Update the center-screen season announcement
        const announcement = document.getElementById('season-announcement');
        const oldSeasonIcon = document.getElementById('old-season-icon');
        const oldSeasonName = document.getElementById('old-season-name');
        const newSeasonIcon = document.getElementById('new-season-icon');
        const newSeasonName = document.getElementById('new-season-name');

        if (announcement && oldSeasonIcon && oldSeasonName && newSeasonIcon && newSeasonName) {
            // Update content
            oldSeasonIcon.textContent = previousSeason.icon;
            oldSeasonName.textContent = previousSeason.name;
            newSeasonIcon.textContent = newSeason.icon;
            newSeasonName.textContent = newSeason.name;

            // Show announcement
            announcement.classList.add('show');

            // Hide after 4 seconds
            setTimeout(() => {
                announcement.classList.remove('show');
            }, 4000);
        }
    }

    renderGarden() {
        const gardenGrid = document.getElementById('garden-grid');
        if (!gardenGrid) return;

        gardenGrid.innerHTML = '';
        gardenGrid.style.gridTemplateColumns = `repeat(${this.game.garden.cols}, 70px)`;
        gardenGrid.style.gridTemplateRows = `repeat(${this.game.garden.rows}, 70px)`;

        for (let row = 0; row < this.game.garden.rows; row++) {
            for (let col = 0; col < this.game.garden.cols; col++) {
                const tile = this.createTile(row, col);
                gardenGrid.appendChild(tile);
            }
        }
    }

    createTile(row, col) {
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.dataset.row = row;
        tile.dataset.col = col;
        tile.onclick = () => this.game.handleTileClick(row, col);

        // Add hover delay for growth tooltip
        let hoverTimeout = null;
        tile.addEventListener('mouseenter', () => {
            hoverTimeout = setTimeout(() => {
                this.game.showGrowthTooltip(tile, row, col, 'vegetable');
            }, 2000); // 2 second delay
        });

        tile.addEventListener('mouseleave', () => {
            if (hoverTimeout) {
                clearTimeout(hoverTimeout);
            }
            this.game.hideGrowthTooltip(tile);
        });

        this.updateTileVisual(tile, row, col);
        return tile;
    }

    updateTileVisual(tile, row, col) {
        const cell = this.game.garden.getCell(row, col);
        if (!cell) return;

        tile.className = 'tile';
        tile.innerHTML = '';

        tile.classList.add(cell.status);

        // Add plant type as data attribute for CSS styling
        if (cell.plantType) {
            tile.setAttribute('data-plant', cell.plantType);
        } else {
            tile.removeAttribute('data-plant');
        }

        if (cell.needsWater) {
            tile.classList.add('needs-water');
        }

        if (cell.readyToHarvest) {
            tile.classList.add('harvestable');
        }

        switch (cell.status) {
            case 'empty':
                // Empty tiles don't need extra visual - CSS handles it
                break;
            case 'tilled':
                // Tilled tiles don't need extra visual - CSS handles it
                break;
            case 'planted':
            case 'growing':
                tile.appendChild(this.createPlantVisual(cell));
                break;
        }
    }

    createEmptyTileVisual() {
        const visual = document.createElement('div');
        visual.className = 'tile-dirt';
        return visual;
    }

    createTilledVisual() {
        const visual = document.createElement('div');
        visual.className = 'tile-tilled';
        return visual;
    }

    createPlantVisual(cell) {
        const container = document.createElement('div');
        container.className = 'plant-svg-container';

        const plant = PLANTS[cell.plantType];
        if (!plant) return container;

        // Use SVG plant system if available, fallback to emoji
        if (window.SVGPlants && window.SVGPlants[cell.plantType]) {
            const svgWrapper = document.createElement('div');
            svgWrapper.className = `plant-svg stage-${cell.growthStage}`;
            svgWrapper.innerHTML = window.SVGPlants.getPlantSVG(cell.plantType, cell.growthStage);
            container.appendChild(svgWrapper);
        } else {
            // Fallback to emoji icons
            const stageIcons = {
                tomato: ['🌱', '🪴', '🍅'],
                lettuce: ['🌱', '🌿', '🥬'],
                carrot: ['🌱', '🌿', '🥕'],
                corn: ['🌱', '🌾', '🌽'],
                potato: ['🌱', '🌿', '🥔']
            };
            const plantEl = document.createElement('div');
            plantEl.className = 'plant';
            plantEl.textContent = stageIcons[cell.plantType][cell.growthStage] || '🌱';
            container.appendChild(plantEl);
        }

        // Water indicator using SVG
        if (cell.needsWater) {
            const waterIndicator = document.createElement('div');
            waterIndicator.className = 'water-indicator';
            if (window.SVGPlants) {
                waterIndicator.innerHTML = window.SVGPlants.getWaterIndicator();
            } else {
                waterIndicator.textContent = '💧';
                waterIndicator.style.fontSize = '18px';
            }
            container.appendChild(waterIndicator);
        }

        // Harvest indicator with sparkle and particles
        if (cell.readyToHarvest) {
            // Sparkle star indicator
            const harvestIndicator = document.createElement('div');
            harvestIndicator.className = 'harvest-indicator';
            if (window.SVGPlants) {
                harvestIndicator.innerHTML = window.SVGPlants.getHarvestIndicator();
            } else {
                harvestIndicator.textContent = '✨';
            }
            container.appendChild(harvestIndicator);

            // Floating particles
            if (window.SVGPlants) {
                const particles = document.createElement('div');
                particles.innerHTML = window.SVGPlants.createHarvestParticles();
                container.appendChild(particles.firstElementChild);
            }
        }

        return container;
    }

    updateTile(row, col, triggerGrowthAnimation = false) {
        const tile = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        if (tile) {
            this.updateTileVisual(tile, row, col);

            // Trigger growth animation if requested
            if (triggerGrowthAnimation) {
                const plantSvg = tile.querySelector('.plant-svg');
                if (plantSvg) {
                    plantSvg.classList.add('growing-transition', 'stage-transition');
                    setTimeout(() => {
                        plantSvg.classList.remove('growing-transition', 'stage-transition');
                    }, 600);
                }
            }

            if (this.game.particles) {
                this.game.particles.animateTilePulse(tile);
            }
        }
    }

    renderShop() {
        const shopItems = document.getElementById('shop-items');
        if (!shopItems) return;
        const fruitTitle = document.createElement('div');
        fruitTitle.style.cssText = 'grid-column: 1/-1; text-align: center; margin: 20px 0; font-size: 24px; font-weight: bold; color: #5d5d5dff;';
        fruitTitle.innerHTML = '🥬 Vegetables Seeds';

        shopItems.innerHTML = '';

        // Crop emoji icons (fully grown)
        const cropIcons = {
            tomato: '🍅',
            lettuce: '🥬',
            carrot: '🥕',
            corn: '🌽',
            potato: '🥔'
        };

        shopItems.appendChild(fruitTitle);

        // Add vegetable seeds section
        for (const [key, plant] of Object.entries(PLANTS)) {
            const item = document.createElement('div');
            const isUnlocked = this.game.player.isUnlocked('vegetables', key);
            const requiredLevel = LEVEL_SYSTEM.unlocks.vegetables[key] || 1;

            item.className = isUnlocked ? 'shop-item' : 'shop-item locked';

            const canBuy = this.game.player.money >= plant.seedCost && isUnlocked;

            // Calculate max affordable quantity
            const maxAffordable = Math.floor(this.game.player.money / plant.seedCost);
            const canBuy1 = maxAffordable >= 1 && isUnlocked;
            const canBuy10 = maxAffordable >= 10 && isUnlocked;
            const canBuy50 = maxAffordable >= 50 && isUnlocked;
            const canBuyMax = maxAffordable >= 1 && isUnlocked;

            item.innerHTML = `
                ${!isUnlocked ? `<div class="level-requirement">🔒 Level ${requiredLevel}</div>` : ''}
                <div class="shop-item-icon">${cropIcons[key] || '🌱'}</div>
                <div class="shop-item-header">
                    <h3>${plant.name} Seeds</h3>
                </div>
                <div class="shop-item-details">
                    <p>${plant.description}</p>
                    <div class="stats">
                        <div class="stat"><span>⏱️</span> ${plant.growthTime}s</div>
                        <div class="stat"><span>💧</span> ${plant.waterInterval}s</div>
                        <div class="stat"><span>🌾</span> Yield: ${plant.harvestYield}</div>
                        <div class="stat"><span>💰</span> Sells for: $${plant.sellPrice}</div>
                    </div>
                </div>
                <div class="shop-item-footer">
                    <div class="quantity-buttons">
                        <button class="qty-select-btn" onclick="game.buySeed('${key}', 1)" ${!canBuy1 ? 'disabled' : ''}>x1</button>
                        <button class="qty-select-btn" onclick="game.buySeed('${key}', 10)" ${!canBuy10 ? 'disabled' : ''}>x10</button>
                        <button class="qty-select-btn" onclick="game.buySeed('${key}', 50)" ${!canBuy50 ? 'disabled' : ''}>x50</button>
                        <button class="qty-select-btn" onclick="game.buySeed('${key}', ${maxAffordable})" ${!canBuyMax ? 'disabled' : ''}>MAX</button>
                    </div>
                    <div class="price-row">
                        <div class="price"><div class="coin-icon"></div>${plant.seedCost}/ea</div>
                        <div class="buy-qty-display">${isUnlocked ? `Can buy: ${maxAffordable}` : 'Locked'}</div>
                    </div>
                </div>
            `;

            shopItems.appendChild(item);
        }

        // Add fruit seeds section if orchard is unlocked
        if (this.game.player.upgrades.premiumOrchard) {
            // Add section divider
            const divider = document.createElement('div');
            divider.style.cssText = 'grid-column: 1/-1; text-align: center; margin: 20px 0; font-size: 24px; font-weight: bold; color: #DAA520;';
            divider.innerHTML = '🌳 Fruit Seeds';
            shopItems.appendChild(divider);

            const fruitIcons = {
                apple: '🍎',
                orange: '🍊',
                banana: '🍌',
                pear: '🍐'
            };

            for (const [key, fruit] of Object.entries(FRUITS)) {
                const item = document.createElement('div');
                const isUnlocked = this.game.player.isUnlocked('fruits', key);
                const requiredLevel = LEVEL_SYSTEM.unlocks.fruits[key] || 8;

                item.className = isUnlocked ? 'shop-item' : 'shop-item locked';

                // Calculate max affordable quantity for fruit trees
                const maxAffordable = Math.floor(this.game.player.money / fruit.seedCost);
                const canBuy1 = maxAffordable >= 1 && isUnlocked;
                const canBuy10 = maxAffordable >= 10 && isUnlocked;
                const canBuy50 = maxAffordable >= 50 && isUnlocked;
                const canBuyMax = maxAffordable >= 1 && isUnlocked;

                item.innerHTML = `
                    ${!isUnlocked ? `<div class="level-requirement">🔒 Level ${requiredLevel}</div>` : ''}
                    <div class="shop-item-icon">${fruitIcons[key] || '🌳'}</div>
                    <div class="shop-item-header">
                        <h3>${fruit.name} Seeds</h3>
                    </div>
                    <div class="shop-item-details">
                        <p>${fruit.description}</p>
                        <div class="stats">
                            <div class="stat"><span>⏱️</span> ${fruit.growthTime}s</div>
                            <div class="stat"><span>💧</span> ${fruit.waterInterval}s</div>
                            <div class="stat"><span>🌾</span> Yield: ${fruit.harvestYield}</div>
                            <div class="stat"><span>💰</span> Sells for: $${fruit.sellPrice}</div>
                        </div>
                    </div>
                    <div class="shop-item-footer">
                        <div class="quantity-buttons">
                            <button class="qty-select-btn" onclick="game.buyFruitSeed('${key}', 1)" ${!canBuy1 ? 'disabled' : ''}>x1</button>
                            <button class="qty-select-btn" onclick="game.buyFruitSeed('${key}', 10)" ${!canBuy10 ? 'disabled' : ''}>x10</button>
                            <button class="qty-select-btn" onclick="game.buyFruitSeed('${key}', 50)" ${!canBuy50 ? 'disabled' : ''}>x50</button>
                            <button class="qty-select-btn" onclick="game.buyFruitSeed('${key}', ${maxAffordable})" ${!canBuyMax ? 'disabled' : ''}>MAX</button>
                        </div>
                        <div class="price-row">
                            <div class="price"><div class="coin-icon"></div>${fruit.seedCost}/ea</div>
                            <div class="buy-qty-display">${isUnlocked ? `Can buy: ${maxAffordable}` : 'Locked'}</div>
                        </div>
                    </div>
                `;

                shopItems.appendChild(item);
            }
        }
    }

    renderMarket() {
        this.renderProductGrid();
        this.renderSellCart();
    }

    // NEW: Render product selection grid
    renderProductGrid() {
        const productGrid = document.getElementById('product-grid');
        if (!productGrid) return;

        productGrid.innerHTML = '';

        const hasVegetables = this.game.player.inventory.harvested &&
            Object.values(this.game.player.inventory.harvested).some(count => count > 0);
        const hasFruits = this.game.player.inventory.harvestedFruits &&
            Object.values(this.game.player.inventory.harvestedFruits).some(count => count > 0);

        if (!hasVegetables && !hasFruits) {
            productGrid.innerHTML = '<p class="empty-message">No harvested produce yet! Go plant and harvest some vegetables!</p>';
            return;
        }

        // Vegetable icons
        const vegIcons = {
            tomato: '🍅',
            lettuce: '🥬',
            carrot: '🥕',
            corn: '🌽',
            potato: '🥔'
        };

        // Add vegetables to grid
        for (const [key, count] of Object.entries(this.game.player.inventory.harvested)) {
            if (count > 0) {
                const plant = PLANTS[key];
                const productCard = this.createProductCard('veg', key, plant, vegIcons[key], count);
                productGrid.appendChild(productCard);
            }
        }

        // Fruit icons
        const fruitIcons = {
            apple: '🍎',
            orange: '🍊',
            banana: '🍌',
            pear: '🍐'
        };

        // Add fruits if orchard unlocked
        if (this.game.player.upgrades.premiumOrchard) {
            for (const [key, count] of Object.entries(this.game.player.inventory.harvestedFruits)) {
                if (count > 0) {
                    const fruit = FRUITS[key];
                    const productCard = this.createProductCard('fruit', key, fruit, fruitIcons[key], count);
                    productCard.style.border = '3px solid #DAA520';
                    productCard.classList.add('fruit-product');
                    productGrid.appendChild(productCard);
                }
            }
        }
    }

    // NEW: Create product card for selection
    createProductCard(type, key, item, icon, count) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.type = type;
        card.dataset.key = key;

        // Check if already in cart
        const isInCart = this.game.sellCart && this.game.sellCart.some(p => p.type === type && p.key === key);
        if (isInCart) {
            card.classList.add('in-cart');
        }

        card.innerHTML = `
            <div class="product-icon">${icon}</div>
            <div class="product-name">${item.name}</div>
            <div class="product-stock">Stock: ${count}</div>
            <div class="product-price">
                <div class="coin-icon"></div>
                <span>${item.sellPrice} each</span>
            </div>
            <div class="product-select-overlay">
                <span class="checkmark">✓</span>
            </div>
        `;

        card.onclick = () => this.game.toggleProductSelection(type, key, item, icon, count);

        return card;
    }

    // NEW: Render sell cart with selected products
    renderSellCart() {
        const sellCart = document.getElementById('sell-cart');
        const cartCount = document.getElementById('cart-count');
        const sellButton = document.getElementById('sell-button');

        if (!sellCart) return;

        const cart = this.game.sellCart || [];

        // Update cart count
        if (cartCount) {
            cartCount.textContent = cart.length;
        }

        if (cart.length === 0) {
            sellCart.innerHTML = '<p class="empty-cart-message">No products selected. Click on products above to add them.</p>';
            if (sellButton) sellButton.disabled = true;
            this.updateSellTotal();
            return;
        }

        // Enable sell button
        if (sellButton) sellButton.disabled = false;

        sellCart.innerHTML = '';

        cart.forEach((product, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';

            const maxQty = product.type === 'veg'
                ? this.game.player.inventory.harvested[product.key]
                : this.game.player.inventory.harvestedFruits[product.key];

            cartItem.innerHTML = `
                <div class="cart-item-icon">${product.icon}</div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${product.item.name}</div>
                    <div class="cart-item-price">${product.item.sellPrice}/ea · Stock: ${maxQty}</div>
                    <div class="cart-qty-presets">
                        <button class="cart-qty-preset" onclick="game.addCartQuantity(${index}, 10)">+10</button>
                        <button class="cart-qty-preset" onclick="game.addCartQuantity(${index}, 50)">+50</button>
                        <button class="cart-qty-preset max-btn" onclick="game.setCartQuantity(${index}, ${maxQty})">MAX</button>
                    </div>
                </div>
                <div class="cart-item-quantity">
                    <button class="qty-btn" onclick="game.decreaseCartQuantity(${index})">-</button>
                    <input type="number"
                           class="qty-input"
                           value="${product.quantity || 0}"
                           min="0"
                           max="${maxQty}"
                           onchange="game.updateCartQuantity(${index}, this.value)">
                    <button class="qty-btn" onclick="game.increaseCartQuantity(${index})">+</button>
                </div>
                <div class="cart-item-total">
                    <div class="coin-icon"></div>
                    <span>${(product.quantity || 0) * product.item.sellPrice}</span>
                </div>
                <button class="cart-remove-btn" onclick="game.removeFromCart(${index})" title="Remove from cart">✕</button>
            `;

            sellCart.appendChild(cartItem);
        });

        this.updateSellTotal();
    }

    // Keep old renderInventory for backwards compatibility
    renderInventory() {
        const inventoryList = document.getElementById('inventory-list');
        if (!inventoryList) return;

        const hasVegetables = this.game.player.inventory.harvested &&
            Object.values(this.game.player.inventory.harvested).some(count => count > 0);
        const hasFruits = this.game.player.inventory.harvestedFruits &&
            Object.values(this.game.player.inventory.harvestedFruits).some(count => count > 0);

        if (!hasVegetables && !hasFruits) {
            inventoryList.innerHTML = '<p class="empty-message">No harvested produce yet! Go plant and harvest some vegetables!</p>';
            return;
        }

        inventoryList.innerHTML = '<div class="inventory-grid"></div>';
        const grid = inventoryList.querySelector('.inventory-grid');

        // Vegetable icons
        const vegIcons = {
            tomato: '🍅',
            lettuce: '🥬',
            carrot: '🥕',
            corn: '🌽',
            potato: '🥔'
        };

        // Add vegetables
        for (const [key, count] of Object.entries(this.game.player.inventory.harvested)) {
            if (count > 0) {
                const plant = PLANTS[key];
                const item = document.createElement('div');
                item.className = 'inventory-item';
                item.style.setProperty('--plant-color', plant.color);
                item.style.setProperty('--plant-secondary', plant.secondaryColor);

                item.innerHTML = `
                    <div class="inventory-visual" style="font-size: 48px;">${vegIcons[key]}</div>
                    <div class="inventory-name">${plant.name}</div>
                    <div class="inventory-count">×${count}</div>
                `;
                grid.appendChild(item);
            }
        }

        // Fruit icons
        const fruitIcons = {
            apple: '🍎',
            orange: '🍊',
            banana: '🍌',
            pear: '🍐'
        };

        // Add fruits if orchard unlocked
        if (this.game.player.upgrades.premiumOrchard) {
            for (const [key, count] of Object.entries(this.game.player.inventory.harvestedFruits)) {
                if (count > 0) {
                    const fruit = FRUITS[key];
                    const item = document.createElement('div');
                    item.className = 'inventory-item';
                    item.style.setProperty('--plant-color', fruit.color);
                    item.style.setProperty('--plant-secondary', fruit.secondaryColor);
                    item.style.border = '3px solid #DAA520';

                    item.innerHTML = `
                        <div class="inventory-visual" style="font-size: 48px;">${fruitIcons[key]}</div>
                        <div class="inventory-name">${fruit.name}</div>
                        <div class="inventory-count">×${count}</div>
                    `;
                    grid.appendChild(item);
                }
            }
        }
    }

    renderSellSlots() {
        const sellSlots = document.getElementById('sell-slots');
        if (!sellSlots) return;

        sellSlots.innerHTML = '';

        for (let i = 0; i < 5; i++) {
            const slot = document.createElement('div');
            slot.className = 'sell-slot';
            slot.id = `sell-slot-${i}`;

            const select = document.createElement('select');
            select.innerHTML = '<option value="">Select produce...</option>';

            // Add vegetables
            for (const [key, count] of Object.entries(this.game.player.inventory.harvested)) {
                if (count > 0) {
                    const plant = PLANTS[key];
                    select.innerHTML += `<option value="veg:${key}">${plant.name} (${count} available)</option>`;
                }
            }

            // Add fruits if orchard unlocked
            if (this.game.player.upgrades.premiumOrchard) {
                for (const [key, count] of Object.entries(this.game.player.inventory.harvestedFruits)) {
                    if (count > 0) {
                        const fruit = FRUITS[key];
                        select.innerHTML += `<option value="fruit:${key}">🌳 ${fruit.name} (${count} available)</option>`;
                    }
                }
            }

            const input = document.createElement('input');
            input.type = 'number';
            input.min = '0';
            input.max = '20'; // Default max for vegetables
            input.value = '0';
            input.placeholder = 'Qty';

            const calc = document.createElement('div');
            calc.className = 'sell-slot-calculation';
            calc.innerHTML = '<div class="coin-icon"></div><span>0</span>';

            select.onchange = () => this.updateSellCalculation(i);
            input.oninput = () => this.updateSellCalculation(i);

            slot.appendChild(select);
            slot.appendChild(input);
            slot.appendChild(calc);
            sellSlots.appendChild(slot);
        }

        this.updateSellTotal();
    }

    updateSellCalculation(slotIndex) {
        const slot = document.getElementById(`sell-slot-${slotIndex}`);
        if (!slot) return;

        const select = slot.querySelector('select');
        const input = slot.querySelector('input');
        const calc = slot.querySelector('.sell-slot-calculation span');

        const selectedValue = select.value;
        const quantity = parseInt(input.value) || 0;

        if (selectedValue && quantity > 0) {
            const [type, key] = selectedValue.split(':');

            if (type === 'veg') {
                const plant = PLANTS[key];
                const available = this.game.player.inventory.harvested[key];
                const slotLimit = 20; // Max 20 vegetables per slot
                input.max = slotLimit;
                const actualQty = Math.min(quantity, available, slotLimit);
                input.value = actualQty;
                const total = actualQty * plant.sellPrice;
                calc.textContent = total;
            } else if (type === 'fruit') {
                const fruit = FRUITS[key];
                const available = this.game.player.inventory.harvestedFruits[key];
                const slotLimit = 5; // Max 5 fruits per slot
                input.max = slotLimit;
                const actualQty = Math.min(quantity, available, slotLimit);
                input.value = actualQty;
                const total = actualQty * fruit.sellPrice;
                calc.textContent = total;
            }
        } else {
            calc.textContent = '0';
        }

        this.updateSellTotal();
    }

    updateSellTotal() {
        let total = 0;

        // NEW: Check if using new cart system or old slot system
        if (this.game.sellCart && this.game.sellCart.length > 0) {
            // New cart system
            for (const product of this.game.sellCart) {
                if (product.quantity > 0) {
                    total += product.quantity * product.item.sellPrice;
                }
            }
        } else {
            // Old slot system (backwards compatibility)
            for (let i = 0; i < 5; i++) {
                const slot = document.getElementById(`sell-slot-${i}`);
                if (!slot) continue;

                const select = slot.querySelector('select');
                const input = slot.querySelector('input');

                const selectedValue = select.value;
                const quantity = parseInt(input.value) || 0;

                if (selectedValue && quantity > 0) {
                    const [type, key] = selectedValue.split(':');

                    if (type === 'veg') {
                        const plant = PLANTS[key];
                        const available = this.game.player.inventory.harvested[key];
                        const slotLimit = 20; // Max 20 vegetables per slot
                        const actualQty = Math.min(quantity, available, slotLimit);
                        total += actualQty * plant.sellPrice;
                    } else if (type === 'fruit') {
                        const fruit = FRUITS[key];
                        const available = this.game.player.inventory.harvestedFruits[key];
                        const slotLimit = 5; // Max 5 fruits per slot
                        const actualQty = Math.min(quantity, available, slotLimit);
                        total += actualQty * fruit.sellPrice;
                    }
                }
            }
        }

        const totalEl = document.getElementById('sell-total');
        if (totalEl) totalEl.textContent = total;
    }

    renderUpgrades() {
        const upgradesList = document.getElementById('upgrades-list');
        if (!upgradesList) return;

        upgradesList.innerHTML = '';

        for (const [key, upgrade] of Object.entries(UPGRADES)) {
            const item = document.createElement('div');
            const isUnlocked = this.game.player.isUnlocked('upgrades', key);
            const requiredLevel = LEVEL_SYSTEM.unlocks.upgrades[key] || 1;

            item.className = 'upgrade-item';

            const isOwned = this.game.player.upgrades[upgrade.effect === 'fasterGrowth' ? 'fasterGrowth' : upgrade.effect];
            const owned = (upgrade.effect === 'fasterGrowth' && isOwned > 1.0) || isOwned === true;

            if (owned) {
                item.classList.add('owned');
            }

            if (!isUnlocked) {
                item.classList.add('locked');
            }

            const canBuy = this.game.player.money >= upgrade.cost && !owned && isUnlocked;

            item.innerHTML = `
                ${!isUnlocked && !owned ? `<div class="level-requirement">🔒 Level ${requiredLevel}</div>` : ''}
                <div class="upgrade-icon-large">${upgrade.icon}</div>
                <div class="upgrade-info">
                    <h3>${upgrade.name}</h3>
                    <p>${upgrade.description}</p>
                </div>
                ${owned ?
                    '<div class="owned-badge">✓ Owned</div>' :
                    `<div class="upgrade-footer">
                        <div class="price"><div class="coin-icon"></div>${upgrade.cost}</div>
                        <button class="upgrade-button" onclick="game.buyUpgrade('${key}')" ${!canBuy ? 'disabled' : ''}>
                            ${isUnlocked ? 'Purchase' : 'Locked'}
                        </button>
                    </div>`
                }
            `;

            upgradesList.appendChild(item);
        }
    }

    showScreen(screenId) {
        // Fade out current screen
        const currentActive = document.querySelector('.screen.active');

        if (currentActive && window.anime) {
            anime({
                targets: currentActive,
                opacity: 0,
                duration: 200,
                easing: 'easeInQuad',
                complete: () => {
                    currentActive.classList.remove('active');
                }
            });
        } else {
            document.querySelectorAll('.screen').forEach(screen => {
                screen.classList.remove('active');
            });
        }

        // Fade and slide in new screen
        const screen = document.getElementById(screenId);
        if (screen) {
            setTimeout(() => {
                screen.classList.add('active');
                this.currentScreen = screenId.replace('-screen', '');

                if (window.anime) {
                    anime({
                        targets: screen,
                        opacity: [0, 1],
                        translateY: [30, 0],
                        duration: 500,
                        easing: 'easeOutCubic'
                    });
                }
            }, currentActive && window.anime ? 200 : 0);
        }
    }

    showToast(type, icon, title, message) {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        toast.innerHTML = `
            <div class="toast-icon">${icon}</div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
        `;

        container.appendChild(toast);

        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 3000);
    }

    // ===== ORCHARD UI METHODS =====

    showOrchard() {
        const panel = document.getElementById('orchard-panel');
        if (panel && this.game.player.upgrades.premiumOrchard) {
            panel.classList.add('visible', 'unlocking');
            setTimeout(() => {
                panel.classList.remove('unlocking');
            }, 800);
            console.log('🌳 Orchard panel shown');
        }
    }

    hideOrchard() {
        const panel = document.getElementById('orchard-panel');
        if (panel) {
            panel.classList.remove('visible');
            console.log('🌳 Orchard panel hidden');
        }
    }

    toggleOrchard() {
        const panel = document.getElementById('orchard-panel');
        if (panel) {
            panel.classList.toggle('collapsed');
        }
    }

    renderOrchard() {
        if (!this.game.player.upgrades.premiumOrchard) {
            return;
        }

        const slotsContainer = document.getElementById('orchard-slots');
        if (!slotsContainer) return;

        slotsContainer.innerHTML = '';

        for (let slot = 0; slot < this.game.fruitGarden.slots; slot++) {
            const slotEl = this.createFruitSlot(slot);
            slotsContainer.appendChild(slotEl);
        }

        console.log('🌳 Orchard rendered with 5 slots');
    }

    createFruitSlot(slot) {
        const slotEl = document.createElement('div');
        slotEl.className = 'fruit-slot';
        slotEl.dataset.slot = slot;
        slotEl.onclick = () => this.game.handleFruitSlotClick(slot);

        this.updateFruitSlotVisual(slotEl, slot);
        return slotEl;
    }

    updateFruitSlotVisual(slotEl, slot) {
        const tree = this.game.fruitGarden.getTree(slot);
        if (!tree) return;

        slotEl.className = 'fruit-slot';
        slotEl.innerHTML = '';

        slotEl.classList.add(tree.status);

        if (tree.needsWater) {
            slotEl.classList.add('needs-water');
        }

        if (tree.readyToHarvest) {
            slotEl.classList.add('harvestable');
        }

        if (tree.status === 'empty') {
            const label = document.createElement('div');
            label.className = 'empty-label';
            label.textContent = '🌳 Empty Slot';
            slotEl.appendChild(label);
        } else {
            const fruit = FRUITS[tree.fruitType];
            if (!fruit) return;

            // Fruit type label
            const label = document.createElement('div');
            label.className = 'fruit-label';
            label.textContent = fruit.name;
            slotEl.appendChild(label);

            // Tree visual with growth stages
            const treeVisual = document.createElement('div');
            treeVisual.className = `fruit-tree stage-${tree.growthStage}`;
            treeVisual.textContent = this.getFruitTreeEmoji(tree.fruitType, tree.growthStage);
            slotEl.appendChild(treeVisual);

            // Water indicator
            if (tree.needsWater) {
                const waterIndicator = document.createElement('div');
                waterIndicator.className = 'fruit-water-indicator';
                waterIndicator.textContent = '💧';
                slotEl.appendChild(waterIndicator);
            }

            // Harvest ready sparkle
            if (tree.readyToHarvest) {
                const sparkle = document.createElement('div');
                sparkle.className = 'fruit-harvest-sparkle';
                sparkle.textContent = '✨';
                slotEl.appendChild(sparkle);
            }
        }
    }

    getFruitTreeEmoji(fruitType, stage) {
        // Premium tree growth progression:
        // Stage 0: Seedling/sapling
        // Stage 1: Young tree (establishing)
        // Stage 2: Mature tree (ready to fruit)
        // Stage 3: Abundant harvest (large fruit display)
        const treeStages = {
            apple: ['🌰', '🌳', '🌳', '🍎'],
            orange: ['🌰', '🌳', '🌳', '🍊'],
            banana: ['🌰', '🌳', '🌳', '🍌'],
            pear: ['🌰', '🌳', '🌳', '🍐']
        };

        return treeStages[fruitType] ? treeStages[fruitType][stage] : '🌰';
    }

    refreshFruitSlots() {
        if (!this.game.player.upgrades.premiumOrchard) {
            return;
        }

        for (let slot = 0; slot < this.game.fruitGarden.slots; slot++) {
            const slotEl = document.querySelector(`.fruit-slot[data-slot="${slot}"]`);
            if (slotEl) {
                this.updateFruitSlotVisual(slotEl, slot);
            }
        }
    }
}

// Main Game Class
class Game {
    constructor() {
        this.player = new Player();
        this.garden = new Garden(4, 6);
        this.fruitGarden = new FruitGarden();
        this.ui = new UIManager(this);
        this.particles = new ParticleEffects();

        this.selectedTool = 'hoe';
        this.selectedSeed = 'tomato';
        this.currentSeason = 0;
        this.seasonTimer = 0;
        this.currentYear = 1;
        this.gameTime = 0;
        this.autoWateringTimer = 0;
        this.premiumAutoWateringTimer = 0;
        this.activeNews = [];

        // NEW: Sell cart for new market interface
        this.sellCart = [];

        // Plant info popup tracking
        this.currentPlantInfoCell = null;

        // Mobile UI reference (initialized after DOM ready)
        this.mobileUI = null;

        this.initialize();
    }

    initialize() {
        console.log('🌱 Cozy Garden Game Starting...');

        this.loadGame();

        console.log('📊 Initial game state:');
        console.log('  💰 Money:', this.player.money);
        console.log('  🌱 Seeds:', this.player.inventory.seeds);
        console.log('  🧺 Harvested:', this.player.inventory.harvested);

        // Check if welcome screen should be shown
        const hasSeenWelcome = localStorage.getItem('cozyGardenWelcomeSeen');
        if (!hasSeenWelcome) {
            this.showWelcomeScreen();
        } else {
            this.startGameAfterWelcome();
        }

        console.log('✅ Game initialized successfully!');
    }

    showWelcomeScreen() {
        const welcomeScreen = document.getElementById('welcome-screen');
        const gardenScreen = document.getElementById('garden-screen');

        if (welcomeScreen && gardenScreen) {
            welcomeScreen.classList.add('active');
            gardenScreen.classList.remove('active');
        }
    }

    startGame() {
        // Mark welcome as seen
        localStorage.setItem('cozyGardenWelcomeSeen', 'true');

        // Fade out welcome screen
        const welcomeScreen = document.getElementById('welcome-screen');
        if (welcomeScreen) {
            welcomeScreen.style.animation = 'fadeOut 0.5s ease-out';
            setTimeout(() => {
                welcomeScreen.classList.remove('active');
                welcomeScreen.style.animation = '';
            }, 500);
        }

        // Start the actual game
        this.startGameAfterWelcome();
    }

    startGameAfterWelcome() {
        const gardenScreen = document.getElementById('garden-screen');
        if (gardenScreen) {
            gardenScreen.classList.add('active');
        }

        this.ui.renderGarden();
        this.ui.updateAll();

        // Initialize fruit cells
        this.initializeFruitCells();

        // Show orchard if already unlocked
        if (this.player.upgrades.premiumOrchard) {
            this.ui.showOrchard();
            this.ui.renderOrchard();
        }

        // Initialize tool selection UI to match the default tool
        this.selectTool(this.selectedTool);

        // Setup click-outside handler for plant info popup
        document.addEventListener('click', (e) => {
            const popup = document.getElementById('plant-info-popup');
            if (popup && !popup.classList.contains('hidden')) {
                // Check if click is outside popup and not on a tile
                if (!popup.contains(e.target) && !e.target.closest('.tile') && !e.target.closest('.fruit-cell')) {
                    this.closePlantInfoPopup();
                }
            }
        });

        this.startGameLoop();
    }

    startGameLoop() {
        setInterval(() => {
            this.gameTime++;
            this.ui.updateStatsPanel(); // keeps play time genuinely real-time

            // Update vegetable garden growth
            const growthResult = this.garden.updateGrowth(this.gameTime, this.player.upgrades.fasterGrowth);
            if (growthResult.updated) {
                this.refreshAllTiles(growthResult.stageChanges);
            }
            if (growthResult.rottedCells.length > 0) {
                this.announceRottedCrops(growthResult.rottedCells);
            }

            // Update fruit garden growth
            const fruitUpdated = this.fruitGarden.updateGrowth(this.gameTime, this.player.upgrades.fasterGrowth);
            if (fruitUpdated) {
                this.refreshAllFruitCells();
            }

            this.updateSeasons();

            if (this.gameTime % DAY_LENGTH === 0) {
                this.updateNews();
                this.ui.updateCalendarText();
            }

            // Update plant info popup timers (if open)
            this.updatePlantInfoTimers();

            // Auto-watering system
            if (this.player.upgrades.autoWatering) {
                this.autoWateringTimer++;
                if (this.autoWateringTimer >= 30) {
                    this.autoWateringTimer = 0;
                    this.garden.autoWater(this.gameTime);
                    this.refreshAllTiles();
                }
            }

            if(this.player.upgrades.premiumAutoWatering) {
                this.premiumAutoWateringTimer++;
                if(this.premiumAutoWateringTimer >= 15) {
                    this.premiumAutoWateringTimer = 0;
                    this.fruitGarden.autoWater(this.gameTime);
                    this.refreshAllFruitCells();
                }
            }

            if (this.gameTime % 30 === 0) {
                this.saveGame();
            }

            // Update mobile UI floating buttons
            if (this.mobileUI && this.mobileUI.isMobile) {
                this.mobileUI.updateFloatingButtons();
                this.mobileUI.updateMobileUI();
            }
        }, 1000);
    }

    updateSeasons() {
        this.seasonTimer++;
        const currentSeasonDuration = SEASONS[this.currentSeason].duration;

        if (this.seasonTimer >= currentSeasonDuration) {
            this.seasonTimer = 0;
            const previousSeason = SEASONS[this.currentSeason];
            const wrappedToSpring = this.currentSeason === SEASONS.length - 1;
            this.currentSeason = (this.currentSeason + 1) % SEASONS.length;
            const newSeason = SEASONS[this.currentSeason];

            if (wrappedToSpring) {
                this.currentYear++;
            }

            // Wither any vegetables that can't survive the new season
            const witheredCounts = this.witherOutOfSeasonCrops();
            if (Object.keys(witheredCounts).length > 0) {
                this.refreshAllTiles();
                const summary = Object.entries(witheredCounts)
                    .map(([name, count]) => `${count} ${name}`)
                    .join(', ');
                this.ui.showToast('error', '🥀', 'Crops Withered!', `${summary} couldn't survive ${newSeason.name} and were lost.`);
            }

            // Trigger smooth season transition
            this.ui.transitionSeason(previousSeason, newSeason);

            console.log(`🌸 Season changed: ${previousSeason.name} → ${newSeason.name} (Year ${this.currentYear})`);
        }
    }

    // Calendar day within the current season, 1-30
    getCurrentDay() {
        return Math.floor(this.seasonTimer / DAY_LENGTH) + 1;
    }

    getCalendarInfo() {
        return {
            year: this.currentYear,
            season: SEASONS[this.currentSeason].name,
            day: this.getCurrentDay()
        };
    }

    getLifetimeStats() {
        return {
            totalMoneyEarned: this.player.totalMoneyEarned,
            bestSeller: this.player.getBestSeller(),
            topHarvest: this.player.getTopHarvest(),
            playTime: this.formatTime(this.gameTime)
        };
    }

    getCurrentSeasonName() {
        return SEASONS[this.currentSeason].name.toLowerCase();
    }

    // +SEASON_BONUS_MULTIPLIER if plantType's bestSeason is the current season, else no bonus
    getSeasonalMultiplier(plantType) {
        const plant = PLANTS[plantType];
        if (plant && plant.bestSeason === this.getCurrentSeasonName()) {
            return SEASON_BONUS_MULTIPLIER;
        }
        return 1.0;
    }

    // Combined sell-price multiplier: seasonal bonus x any active news events. Yield only uses the seasonal part.
    getPriceMultiplier(plantType) {
        return this.getSeasonalMultiplier(plantType) * this.getNewsMultiplier(plantType);
    }

    getNewsMultiplier(plantType) {
        const plant = PLANTS[plantType];
        let multiplier = 1.0;

        for (const event of this.activeNews) {
            if (event.scope === 'all') {
                multiplier *= event.multiplier;
            } else if (event.scope === 'single' && event.target === plantType) {
                multiplier *= event.multiplier;
            } else if (event.scope === 'seasonBlocked' && plant.blockedSeason === event.target) {
                multiplier *= event.multiplier;
            } else if (event.scope === 'seasonBest' && plant.bestSeason === event.target) {
                multiplier *= event.multiplier;
            }
        }

        return multiplier;
    }

    // Expire finished events and roll a chance to spawn a new one. Called once per in-game day.
    updateNews() {
        this.activeNews = this.activeNews.filter(event => event.expiresAt > this.gameTime);

        if (this.activeNews.length < MAX_ACTIVE_NEWS && Math.random() < NEWS_CHECK_CHANCE) {
            this.spawnNewsEvent();
        }
    }

    spawnNewsEvent() {
        const template = NEWS_EVENTS[Math.floor(Math.random() * NEWS_EVENTS.length)];

        let target = null;
        if (template.scope === 'single') {
            const keys = Object.keys(PLANTS);
            target = keys[Math.floor(Math.random() * keys.length)];
        } else if (template.scope === 'seasonBlocked') {
            target = template.fixedTarget;
        } else if (template.scope === 'seasonBest') {
            const seasons = SEASONS.map(s => s.name.toLowerCase());
            target = seasons[Math.floor(Math.random() * seasons.length)];
        }

        const event = {
            id: template.id,
            headline: template.headline,
            icon: template.icon,
            scope: template.scope,
            target,
            multiplier: template.multiplier,
            message: template.message(target),
            expiresAt: this.gameTime + template.durationDays * DAY_LENGTH
        };

        this.activeNews.push(event);
        this.ui.showToast(
            event.multiplier >= 1 ? 'success' : 'error',
            event.icon,
            `NEWS: ${event.headline}`,
            event.message
        );
        console.log(`📰 News event started: ${event.headline} (expires at tick ${event.expiresAt})`);
    }

    getActiveNews() {
        return this.activeNews.map(event => ({
            headline: event.headline,
            message: event.message,
            daysRemaining: Math.ceil((event.expiresAt - this.gameTime) / DAY_LENGTH)
        }));
    }

    // Wither any vegetable whose blockedSeason matches the season just entered.
    // Returns a map of plantType -> count withered (empty if none).
    witherOutOfSeasonCrops() {
        const seasonName = this.getCurrentSeasonName();
        const witheredCounts = {};

        for (let row = 0; row < this.garden.rows; row++) {
            for (let col = 0; col < this.garden.cols; col++) {
                const cell = this.garden.grid[row][col];
                if (!cell || (cell.status !== 'planted' && cell.status !== 'growing')) continue;

                const plant = PLANTS[cell.plantType];
                if (plant && plant.blockedSeason === seasonName) {
                    witheredCounts[plant.name] = (witheredCounts[plant.name] || 0) + 1;
                    this.garden.grid[row][col] = this.garden.createEmptyCell();
                }
            }
        }

        return witheredCounts;
    }

    // Summarize rotted cells (from Garden.updateGrowth) into a single toast
    announceRottedCrops(rottedCells) {
        const counts = {};
        for (const { plantName } of rottedCells) {
            counts[plantName] = (counts[plantName] || 0) + 1;
        }
        const summary = Object.entries(counts)
            .map(([name, count]) => `${count} ${name}`)
            .join(', ');
        this.ui.showToast('error', '🥀', 'Crops Rotted!', `${summary} went too long without water and rotted.`);
    }

    handleTileClick(row, col) {
        const cell = this.garden.getCell(row, col);
        if (!cell) return;

        if (cell.status === 'locked') {
            this.ui.showToast('error', '🔒', 'Plot Locked!', 'Unlock this plot from the Upgrade Hut first.');
            return;
        }

        if (cell.readyToHarvest) {
            this.harvestPlant(row, col);
            return;
        }

        // Show plant info popup when clicking on growing plant (and no tool selected)
        if (!this.selectedTool && (cell.status === 'planted' || cell.status === 'growing')) {
            const tile = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            if (tile) {
                this.showPlantInfoPopup(tile, row, col);
            }
            return;
        }

        if (this.selectedTool === 'hoe') {
            if (cell.status === 'empty') {
                this.garden.till(row, col);
                this.ui.updateTile(row, col);
                this.saveGame();
            }
        } else if (this.selectedTool === 'water') {
            if (cell.status === 'planted' || cell.status === 'growing') {
                this.waterPlant(row, col);
            }
        } else if (this.selectedTool.startsWith('seed-')) {
            const seedType = this.selectedTool.replace('seed-', '');
            if (cell.status === 'tilled') {
                const plant = PLANTS[seedType];
                if (plant && plant.blockedSeason === this.getCurrentSeasonName()) {
                    this.ui.showToast('error', '🚫', 'Wrong Season!', `${plant.name} can't be planted in ${SEASONS[this.currentSeason].name}.`);
                    return;
                }

                if (this.player.useSeed(seedType)) {
                    this.garden.plant(row, col, seedType, this.gameTime);

                    // Award XP for planting
                    const xpResult = this.player.addXP(LEVEL_SYSTEM.xpRewards.plant, 'plant');
                    if (xpResult.leveledUp) {
                        this.handleLevelUp(xpResult.oldLevel, xpResult.newLevel);
                    }

                    this.ui.updateTile(row, col);
                    this.ui.updateSeedSelector();
                    this.saveGame();

                    const tile = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
                    if (tile && this.particles) {
                        this.particles.animatePlantGrowth(tile);
                    }
                }
            }
        }
    }

    waterPlant(row, col) {
        if (this.garden.water(row, col, this.gameTime)) {
            // Award XP for watering
            const xpResult = this.player.addXP(LEVEL_SYSTEM.xpRewards.waterPlant, 'water');
            if (xpResult.leveledUp) {
                this.handleLevelUp(xpResult.oldLevel, xpResult.newLevel);
            }

            this.ui.updateTile(row, col);

            const tile = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            if (tile && this.particles) {
                this.particles.createWaterSplash(tile);
            }

            this.saveGame();
        }
    }

    harvestPlant(row, col) {
        console.log(`🎯 harvestPlant called for tile [${row},${col}]`);
        const result = this.garden.harvest(row, col);
        console.log('🎯 Garden.harvest result:', result);

        if (result) {
            const bonusYield = Math.round(result.yield * this.getSeasonalMultiplier(result.plantType));
            console.log(`🎯 Calling player.addHarvest(${result.plantType}, ${bonusYield})`);
            this.player.addHarvest(result.plantType, bonusYield);

            // Award XP for harvesting
            const xpResult = this.player.addXP(LEVEL_SYSTEM.xpRewards.harvest, 'harvest');
            if (xpResult.leveledUp) {
                this.handleLevelUp(xpResult.oldLevel, xpResult.newLevel);
            }

            this.ui.updateTile(row, col);
            this.ui.updateAll();

            const tile = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            if (tile && this.particles) {
                this.particles.createHarvestSparkle(tile);
            }

            this.saveGame();
            console.log(`✅ Harvested ${bonusYield} ${result.plantType}!`);
        } else {
            console.error('❌ harvest() returned null - plant not ready or not found');
        }
    }

    handleFruitSlotClick(slot) {
        const tree = this.fruitGarden.getTree(slot);
        if (!tree) return;

        // If ready to harvest, harvest the fruit
        if (tree.readyToHarvest) {
            this.harvestFruit(slot);
            return;
        }

        // If empty slot, check if user has selected a fruit seed to plant
        if (tree.status === 'empty') {
            // For now, let's assume user needs to select from shop or we'll add selection later
            console.log(`🌳 Clicked empty fruit slot ${slot}. Need to implement seed selection.`);
            this.ui.showToast('info', '🌳', 'Empty Slot', 'Visit the shop to buy fruit seeds!');
            return;
        }

        // If planted or growing, water the tree
        if (tree.status === 'planted' || tree.status === 'growing') {
            this.waterFruitTree(slot);
        }
    }

    waterFruitTree(slot) {
        if (this.fruitGarden.waterTree(slot, this.gameTime)) {
            this.ui.refreshFruitSlots();

            const slotEl = document.querySelector(`.fruit-slot[data-slot="${slot}"]`);
            if (slotEl && this.particles) {
                this.particles.createWaterSplash(slotEl);
            }

            this.saveGame();
        }
    }

    harvestFruit(slot) {
        console.log(`🎯 harvestFruit called for slot ${slot}`);
        const result = this.fruitGarden.harvestFruit(slot);
        console.log('🎯 FruitGarden.harvestFruit result:', result);

        if (result) {
            console.log(`🎯 Calling player.addFruitHarvest(${result.fruitType}, ${result.yield})`);
            this.player.addFruitHarvest(result.fruitType, result.yield);

            this.ui.refreshFruitSlots();
            this.ui.updateAll();

            const slotEl = document.querySelector(`.fruit-slot[data-slot="${slot}"]`);
            if (slotEl && this.particles) {
                this.particles.createHarvestSparkle(slotEl);
            }

            this.saveGame();
            console.log(`✅ Harvested ${result.yield} ${result.fruitType}!`);
        } else {
            console.error('❌ harvestFruit() returned null - fruit not ready or not found');
        }
    }

    plantFruitTree(slot, fruitType) {
        if (this.player.useFruitSeed(fruitType) && this.fruitGarden.plantTree(slot, fruitType, this.gameTime)) {
            this.ui.refreshFruitSlots();
            this.ui.updateAll();
            this.saveGame();

            const slotEl = document.querySelector(`.fruit-slot[data-slot="${slot}"]`);
            if (slotEl && this.particles) {
                this.particles.animatePlantGrowth(slotEl);
            }

            console.log(`🌳 Planted ${fruitType} tree in slot ${slot}`);
            this.ui.showToast('success', '🌳', 'Tree Planted!', `${FRUITS[fruitType].name} tree is growing`);
            return true;
        }
        return false;
    }

    refreshAllTiles(stageChanges = []) {
        // Create a set of cells that had stage changes for quick lookup
        const changedCells = new Set(stageChanges.map(c => `${c.row},${c.col}`));

        for (let row = 0; row < this.garden.rows; row++) {
            for (let col = 0; col < this.garden.cols; col++) {
                // Trigger growth animation if this cell changed stage
                const triggerAnimation = changedCells.has(`${row},${col}`);
                this.ui.updateTile(row, col, triggerAnimation);
            }
        }
    }

    refreshAllFruitCells() {
        for (let i = 0; i < this.fruitGarden.slots; i++) {
            this.updateFruitCell(i);
        }
    }

    selectTool(tool) {
        this.selectedTool = tool;

        document.querySelectorAll('.tool-button').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tool === tool) {
                btn.classList.add('active');
            }
        });

        document.querySelectorAll('.seed-button').forEach(btn => {
            btn.classList.remove('active');
        });
    }

    selectSeed(seedType) {
        this.selectedTool = `seed-${seedType}`;
        this.selectedSeed = seedType;

        document.querySelectorAll('.seed-button').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.seed === seedType) {
                btn.classList.add('active');
            }
        });

        document.querySelectorAll('.tool-button').forEach(btn => {
            btn.classList.remove('active');
        });
    }

    showStatsPanel() {
        document.getElementById('stats-modal')?.classList.add('active');
    }

    closeStatsPanel() {
        document.getElementById('stats-modal')?.classList.remove('active');
    }

    showShop() {
        this.ui.showScreen('shop-screen');
        this.switchShopTab('buy'); // Default to buy tab
        this.ui.renderShop();
    }

    showMarket() {
        // Redirect to shop with sell tab active
        this.ui.showScreen('shop-screen');
        this.switchShopTab('sell');
        this.ui.renderMarket();
    }

    switchShopTab(tab) {
        // Remove active class from all tabs
        document.querySelectorAll('.shop-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.shop-tab-content').forEach(c => c.classList.remove('active'));

        // Add active class to selected tab
        const tabButton = document.querySelector(`.shop-tab[data-tab="${tab}"]`);
        const tabContent = document.getElementById(`${tab}-tab`);

        if (tabButton) tabButton.classList.add('active');
        if (tabContent) tabContent.classList.add('active');

        // Update content based on tab
        if (tab === 'buy') {
            this.ui.renderShop();
        } else if (tab === 'sell') {
            this.ui.renderMarket();
        }
    }

    buySeed(seedType, quantity = 1) {
        const plant = PLANTS[seedType];
        const totalCost = plant.seedCost * quantity;

        // Check if player can afford
        if (this.player.money < totalCost) {
            this.ui.showToast('error', '❌', 'Not Enough Money!', `You need $${totalCost} but only have $${this.player.money}`);
            return;
        }

        if (this.player.spendMoney(totalCost)) {
            this.player.addSeed(seedType, quantity);

            // Award XP for buying seeds (XP per seed)
            for (let i = 0; i < quantity; i++) {
                const xpResult = this.player.addXP(LEVEL_SYSTEM.xpRewards.buySeed, 'buy seed');
                if (xpResult.leveledUp) {
                    this.handleLevelUp(xpResult.oldLevel, xpResult.newLevel);
                }
            }

            this.ui.updateAll();
            this.ui.renderShop();
            this.saveGame();

            const shopMoney = document.getElementById('shop-money');
            if (shopMoney && this.particles) {
                this.particles.animateTilePulse(shopMoney.parentElement);
            }

            // Get the crop icon for the toast
            const cropIcons = {
                tomato: '🍅',
                lettuce: '🥬',
                carrot: '🥕',
                corn: '🌽',
                potato: '🥔'
            };

            // Show success toast
            const seedWord = quantity === 1 ? 'seed' : 'seeds';
            this.ui.showToast('success', cropIcons[seedType], 'Seeds Purchased!', `Bought ${quantity} ${plant.name} ${seedWord} for $${totalCost}`);
        }
    }

    buyFruitSeed(fruitType, quantity = 1) {
        const fruit = FRUITS[fruitType];
        const totalCost = fruit.seedCost * quantity;

        // Check if player can afford
        if (this.player.money < totalCost) {
            this.ui.showToast('error', '❌', 'Not Enough Money!', `You need $${totalCost} but only have $${this.player.money}`);
            return;
        }

        if (this.player.spendMoney(totalCost)) {
            this.player.addFruitSeed(fruitType, quantity);
            this.ui.updateAll();
            this.ui.renderShop();
            this.saveGame();

            const shopMoney = document.getElementById('shop-money');
            if (shopMoney && this.particles) {
                this.particles.animateTilePulse(shopMoney.parentElement);
            }

            // Get the fruit icon for the toast
            const fruitIcons = {
                apple: '🍎',
                orange: '🍊',
                banana: '🍌',
                pear: '🍐'
            };

            // Show success toast
            const treeWord = quantity === 1 ? 'tree' : 'trees';
            this.ui.showToast('success', fruitIcons[fruitType], 'Trees Purchased!', `Bought ${quantity} ${fruit.name} ${treeWord} for $${totalCost}`);
        }
    }


    sellAll() {
        let totalEarned = 0;
        let totalItemsSold = 0;

        for (let i = 0; i < 5; i++) {
            const slot = document.getElementById(`sell-slot-${i}`);
            if (!slot) continue;

            const select = slot.querySelector('select');
            const input = slot.querySelector('input');

            const selectedValue = select.value;
            const quantity = parseInt(input.value) || 0;

            if (selectedValue && quantity > 0) {
                const [type, key] = selectedValue.split(':');

                if (type === 'veg') {
                    const plant = PLANTS[key];
                    const available = this.player.inventory.harvested[key];
                    const actualQty = Math.min(quantity, available);

                    if (this.player.sellHarvest(key, actualQty)) {
                        const earnings = Math.round(actualQty * plant.sellPrice * this.getPriceMultiplier(key));
                        totalEarned += earnings;
                        totalItemsSold += actualQty;
                    }
                } else if (type === 'fruit') {
                    const fruit = FRUITS[key];
                    const available = this.player.inventory.harvestedFruits[key];
                    const actualQty = Math.min(quantity, available);

                    if (this.player.sellFruit(key, actualQty)) {
                        const earnings = actualQty * fruit.sellPrice;
                        totalEarned += earnings;
                        totalItemsSold += actualQty;
                    }
                }
            }
        }

        this.player.addMoney(totalEarned);

        // Award XP for selling (XP per item sold)
        if (totalItemsSold > 0) {
            const xpGained = totalItemsSold * LEVEL_SYSTEM.xpRewards.sellItem;
            const xpResult = this.player.addXP(xpGained, 'sell');
            if (xpResult.leveledUp) {
                this.handleLevelUp(xpResult.oldLevel, xpResult.newLevel);
            }
        }

        this.ui.updateAll();
        this.ui.renderMarket();
        this.saveGame();

        if (totalEarned > 0) {
            const marketMoney = document.getElementById('market-money');
            if (marketMoney && this.particles) {
                this.particles.createMoneyPopup(marketMoney.parentElement, totalEarned);
            }

            // Show success toast
            this.ui.showToast('success', '💰', 'Sale Complete!', `Sold produce for $${totalEarned}`);
        }

        console.log(`💰 Sold produce for $${totalEarned}!`);
    }

    // NEW: Toggle product selection for cart (max 3)
    toggleProductSelection(type, key, item, icon, count) {
        const existingIndex = this.sellCart.findIndex(p => p.type === type && p.key === key);

        if (existingIndex !== -1) {
            // Remove from cart
            this.sellCart.splice(existingIndex, 1);
            this.ui.showToast('info', '🛒', 'Removed from Cart', `${item.name} removed`);
        } else {
            // Check max limit
            if (this.sellCart.length >= 3) {
                this.ui.showToast('error', '⚠️', 'Cart Full!', 'You can only select up to 3 products at a time');
                return;
            }

            // Add to cart
            this.sellCart.push({
                type: type,
                key: key,
                item: item,
                icon: icon,
                maxCount: count,
                quantity: 0  // Start with 0, user must set quantity
            });
            this.ui.showToast('success', '✓', 'Added to Cart', `${item.name} added`);
        }

        // Re-render both grid and cart
        this.ui.renderProductGrid();
        this.ui.renderSellCart();
    }

    // NEW: Remove product from cart
    removeFromCart(index) {
        if (index >= 0 && index < this.sellCart.length) {
            const product = this.sellCart[index];
            this.sellCart.splice(index, 1);
            this.ui.showToast('info', '🗑️', 'Removed', `${product.item.name} removed from cart`);
            this.ui.renderProductGrid();
            this.ui.renderSellCart();
        }
    }

    // NEW: Update cart item quantity
    updateCartQuantity(index, value) {
        if (index >= 0 && index < this.sellCart.length) {
            const product = this.sellCart[index];
            const qty = Math.max(0, Math.min(parseInt(value) || 0, product.maxCount));
            product.quantity = qty;
            this.ui.renderSellCart();
        }
    }

    // NEW: Increase cart quantity
    increaseCartQuantity(index) {
        if (index >= 0 && index < this.sellCart.length) {
            const product = this.sellCart[index];
            if (product.quantity < product.maxCount) {
                product.quantity++;
                this.ui.renderSellCart();
            }
        }
    }

    // NEW: Decrease cart quantity
    decreaseCartQuantity(index) {
        if (index >= 0 && index < this.sellCart.length) {
            const product = this.sellCart[index];
            if (product.quantity > 0) {
                product.quantity--;
                this.ui.renderSellCart();
            }
        }
    }

    // NEW: Set cart quantity to a specific amount (for MAX button)
    setCartQuantity(index, amount) {
        if (index >= 0 && index < this.sellCart.length) {
            const product = this.sellCart[index];
            const maxQty = product.type === 'veg'
                ? this.player.inventory.harvested[product.key]
                : this.player.inventory.harvestedFruits[product.key];
            product.quantity = Math.min(amount, maxQty);
            this.ui.renderSellCart();
        }
    }

    // NEW: Add to cart quantity (cumulative, for +10, +50 buttons)
    addCartQuantity(index, amount) {
        if (index >= 0 && index < this.sellCart.length) {
            const product = this.sellCart[index];
            const maxQty = product.type === 'veg'
                ? this.player.inventory.harvested[product.key]
                : this.player.inventory.harvestedFruits[product.key];
            product.quantity = Math.min((product.quantity || 0) + amount, maxQty);
            this.ui.renderSellCart();
        }
    }

    // NEW: Sell selected products from cart
    sellSelectedProducts() {
        let totalEarned = 0;
        let totalItemsSold = 0;

        // Process each cart item
        for (const product of this.sellCart) {
            if (product.quantity > 0) {
                if (product.type === 'veg') {
                    const available = this.player.inventory.harvested[product.key];
                    const actualQty = Math.min(product.quantity, available);

                    if (this.player.sellHarvest(product.key, actualQty)) {
                        const earnings = Math.round(actualQty * product.item.sellPrice * this.getPriceMultiplier(product.key));
                        totalEarned += earnings;
                        totalItemsSold += actualQty;
                    }
                } else if (product.type === 'fruit') {
                    const available = this.player.inventory.harvestedFruits[product.key];
                    const actualQty = Math.min(product.quantity, available);

                    if (this.player.sellFruit(product.key, actualQty)) {
                        const earnings = actualQty * product.item.sellPrice;
                        totalEarned += earnings;
                        totalItemsSold += actualQty;
                    }
                }
            }
        }

        if (totalEarned > 0) {
            this.player.addMoney(totalEarned);

            // Award XP for selling
            const xpGained = totalItemsSold * LEVEL_SYSTEM.xpRewards.sellItem;
            const xpResult = this.player.addXP(xpGained, 'sell');
            if (xpResult.leveledUp) {
                this.handleLevelUp(xpResult.oldLevel, xpResult.newLevel);
            }

            // Clear cart after successful sale
            this.sellCart = [];

            this.ui.updateAll();
            this.ui.renderMarket();
            this.saveGame();

            // Show success toast
            this.ui.showToast('success', '💰', 'Sale Complete!', `Sold ${totalItemsSold} items for $${totalEarned}`);

            console.log(`💰 Sold ${totalItemsSold} items for $${totalEarned}!`);
        } else {
            this.ui.showToast('error', '⚠️', 'No Items Selected', 'Please set quantities for items in your cart');
        }
    }

    showUpgrades() {
        this.ui.showScreen('upgrades-screen');
        this.ui.renderUpgrades();
    }

    buyUpgrade(upgradeKey) {
        const upgrade = UPGRADES[upgradeKey];

        if (this.player.spendMoney(upgrade.cost)) {
            this.player.purchaseUpgrade(upgrade.effect);

            // Award XP for purchasing an upgrade
            const xpResult = this.player.addXP(LEVEL_SYSTEM.xpRewards.purchaseUpgrade, 'upgrade');
            if (xpResult.leveledUp) {
                this.handleLevelUp(xpResult.oldLevel, xpResult.newLevel);
            }

            if (upgrade.effect === 'expandedGarden') {
                this.garden.expand(4, 8); // Keep 4 rows, expand to 8 columns (horizontal only)
                this.ui.renderGarden();
            }

            if (upgrade.effect === 'premiumOrchard') {
                this.ui.showOrchard();
                this.ui.renderOrchard();
            }

            if (upgrade.plotsToUnlock) {
                this.garden.unlockNextPlots(upgrade.plotsToUnlock);
                this.ui.renderGarden();
            }

            this.ui.updateAll();
            this.ui.renderUpgrades();
            this.saveGame();

            // Show success toast
            this.ui.showToast('success', upgrade.icon, 'Upgrade Purchased!', `${upgrade.name} - $${upgrade.cost}`);

            console.log(`✅ Purchased upgrade: ${upgrade.name}`);
        }
    }

    handleLevelUp(oldLevel, newLevel) {
        console.log(`🎉 LEVEL UP! ${oldLevel} → ${newLevel}`);

        // Show level up celebration toast
        this.ui.showToast('success', '🎉', `LEVEL ${newLevel}!`, `You reached level ${newLevel}! New content unlocked!`);

        // Update all UI elements (this will show newly unlocked items)
        this.ui.updateAll();
        this.ui.renderShop();
        this.ui.renderUpgrades();

        // Save the game with new level
        this.saveGame();
    }

    showGarden() {
        this.ui.showScreen('garden-screen');
    }

    // TODO(interface redesign task 17): replace with the real Level page
    showLevelPage() {
        this.ui.showToast('info', '⭐', 'Level Page', 'Coming soon - the full level roadmap.');
    }

    // TODO(interface redesign task 16): replace with the real News page
    showNews() {
        this.ui.showToast('info', '📰', 'News Page', 'Coming soon - active market events.');
    }

    switchToFruitGarden() {
        // Check if orchard is unlocked
        if (!this.player.upgrades.premiumOrchard) {
            this.ui.showToast('error', '🔒', 'Orchard Locked!', 'Purchase the Premium Orchard upgrade first! (Level 8)');
            return;
        }

        const slider = document.querySelector('.gardens-slider');
        if (slider) {
            slider.classList.add('show-fruits'); // mobile slide (mobile.css owns this behavior)
        }
        document.querySelector('.garden-view.vegetable-garden')?.classList.remove('active');
        document.querySelector('.garden-view.fruit-garden')?.classList.add('active');
        this.updateGardenIndicators('fruits');
        this.hideSwipeHint();
        console.log('🍎 Switched to fruit garden');
    }

    switchToVegetableGarden() {
        const slider = document.querySelector('.gardens-slider');
        if (slider) {
            slider.classList.remove('show-fruits'); // mobile slide (mobile.css owns this behavior)
        }
        document.querySelector('.garden-view.fruit-garden')?.classList.remove('active');
        document.querySelector('.garden-view.vegetable-garden')?.classList.add('active');
        this.updateGardenIndicators('vegetables');
        this.hideSwipeHint();
        console.log('🥕 Switched to vegetable garden');
    }

    // Switch to garden by name (for indicator dots and the desktop garden switch)
    switchToGarden(gardenName) {
        if (gardenName === 'fruits') {
            this.switchToFruitGarden();
        } else {
            this.switchToVegetableGarden();
        }
    }

    // Update garden indicator dots (mobile) and the garden switch buttons (desktop)
    updateGardenIndicators(activeGarden) {
        const dots = document.querySelectorAll('.garden-dot');
        dots.forEach(dot => {
            dot.classList.toggle('active', dot.dataset.garden === activeGarden);
        });

        const switchOptions = document.querySelectorAll('.garden-switch-option');
        switchOptions.forEach(option => {
            option.classList.toggle('active', option.dataset.garden === activeGarden);
        });
    }

    // Hide swipe hint after first swipe
    hideSwipeHint() {
        const hint = document.getElementById('swipe-hint');
        if (hint) {
            hint.classList.add('hidden');
        }
    }

    scrollToFruitSeeds() {
        const seedsSlider = document.getElementById('seeds-slider');
        if (seedsSlider) {
            seedsSlider.classList.add('show-fruits');
            console.log('🍎 Scrolled to fruit seeds');
        }
    }

    scrollToVegetableSeeds() {
        const seedsSlider = document.getElementById('seeds-slider');
        if (seedsSlider) {
            seedsSlider.classList.remove('show-fruits');
            console.log('🥕 Scrolled to vegetable seeds');
        }
    }

    initializeFruitCells() {
        const fruitCells = document.querySelectorAll('.fruit-cell');
        fruitCells.forEach((cell, index) => {
            cell.onclick = () => this.handleFruitCellClick(index);

            // Add hover delay for growth tooltip
            let hoverTimeout = null;
            cell.addEventListener('mouseenter', () => {
                hoverTimeout = setTimeout(() => {
                    this.showGrowthTooltip(cell, index, null, 'fruit');
                }, 2000); // 2 second delay
            });

            cell.addEventListener('mouseleave', () => {
                if (hoverTimeout) {
                    clearTimeout(hoverTimeout);
                }
                this.hideGrowthTooltip(cell);
            });

            // Update cell to match saved state from FruitGarden
            this.updateFruitCell(index);
        });
        console.log('🍎 Initialized 5 fruit cells with saved state');
    }

    handleFruitCellClick(index) {
        const tree = this.fruitGarden.getTree(index);
        if (!tree) return;

        console.log(`🍎 Clicked fruit cell ${index}, tool: ${this.selectedTool}, tree status: ${tree.status}`);

        // Check if clicking on a dead tree (remove it)
        if (tree.status === 'dead') {
            console.log(`🍂 Removing dead tree from slot ${index}`);
            Object.assign(tree, this.fruitGarden.createEmptyTree());
            this.updateFruitCell(index);
            this.ui.updateAll();
            this.saveGame();
            this.ui.showToast('info', '🍂', 'Tree Removed', 'Dead tree cleared - ready to plant again!');
            return;
        }

        // If ready to harvest, harvest the fruit
        if (tree.readyToHarvest) {
            this.harvestFruitCell(index);
            return;
        }

        // Handle tool actions
        if (this.selectedTool === 'hoe') {
            // Hoe on empty cell = "till" (prepare for planting)
            if (tree.status === 'empty') {
                tree.status = 'tilled';
                this.updateFruitCell(index);
                this.saveGame();
                console.log(`🍎 Tilled fruit cell ${index}`);
            }
        } else if (this.selectedTool === 'water') {
            // Water on planted/growing trees
            if (tree.status === 'planted' || tree.status === 'growing') {
                this.waterFruitCell(index);
            }
        } else if (this.selectedTool.startsWith('seed-')) {
            // Plant fruit seed on tilled cell
            const seedType = this.selectedTool.replace('seed-', '');
            // Check if this is a fruit seed
            if (FRUITS[seedType] && tree.status === 'tilled' && this.player.useFruitSeed(seedType)) {
                this.fruitGarden.plantTree(index, seedType, this.gameTime);
                this.updateFruitCell(index);
                this.ui.updateSeedSelector();
                this.saveGame();

                const cellEl = document.querySelector(`.fruit-cell[data-index="${index}"]`);
                if (cellEl && this.particles) {
                    this.particles.animatePlantGrowth(cellEl);
                }
                console.log(`🌳 Planted ${seedType} tree in cell ${index}`);
                this.ui.showToast('success', '🌳', 'Tree Planted!', `${FRUITS[seedType].name} tree is growing`);
            }
        }
    }

    waterFruitCell(index) {
        if (this.fruitGarden.waterTree(index, this.gameTime)) {
            this.updateFruitCell(index);

            const cellEl = document.querySelector(`.fruit-cell[data-index="${index}"]`);
            if (cellEl && this.particles) {
                this.particles.createWaterSplash(cellEl);
            }

            this.saveGame();
            console.log(`💧 Watered fruit cell ${index}`);
        }
    }

    harvestFruitCell(index) {
        console.log(`🎯 harvestFruitCell called for cell ${index}`);
        const tree = this.fruitGarden.getTree(index);

        // Check if clicking on a dead tree (remove it)
        if (tree && tree.status === 'dead') {
            console.log(`🍂 Removing dead tree from slot ${index}`);
            Object.assign(tree, this.fruitGarden.createEmptyTree());
            this.updateFruitCell(index);
            this.ui.updateAll();
            this.saveGame();
            return;
        }

        // Otherwise, harvest fruit if ready
        const result = this.fruitGarden.harvestFruit(index, this.gameTime);
        console.log('🎯 FruitGarden.harvestFruit result:', result);

        if (result) {
            console.log(`🎯 Calling player.addFruitHarvest(${result.fruitType}, ${result.yield})`);
            this.player.addFruitHarvest(result.fruitType, result.yield);

            this.updateFruitCell(index);
            this.ui.updateAll();

            const cellEl = document.querySelector(`.fruit-cell[data-index="${index}"]`);
            if (cellEl && this.particles) {
                this.particles.createHarvestSparkle(cellEl);
            }

            this.saveGame();
            console.log(`✅ Harvested ${result.yield} ${result.fruitType}!`);
        } else {
            console.error('❌ harvestFruit() returned null - fruit not ready or not found');
        }
    }

    updateFruitCell(index) {
        const tree = this.fruitGarden.getTree(index);
        const cell = document.querySelector(`.fruit-cell[data-index="${index}"]`);
        if (!cell || !tree) return;

        // Clear all status classes
        cell.className = 'fruit-cell';
        cell.setAttribute('data-index', index);

        // Add status class and fruit type for CSS styling
        cell.classList.add(tree.status);
        if (tree.fruitType) {
            cell.setAttribute('data-fruit', tree.fruitType);
        }

        // Add special state classes
        if (tree.needsWater) {
            cell.classList.add('needs-water');
        }
        if (tree.readyToHarvest) {
            cell.classList.add('harvestable');
        }

        // Clear previous content
        cell.innerHTML = '';

        // Handle DEAD tree status
        if (tree.status === 'dead') {
            // Use SVG dead tree if available
            if (window.SVGPlants) {
                const treeContainer = document.createElement('div');
                treeContainer.className = 'tree-svg-container';
                const svgWrapper = document.createElement('div');
                svgWrapper.className = 'tree-svg dead-tree';
                svgWrapper.innerHTML = window.SVGPlants.deadTree;
                treeContainer.appendChild(svgWrapper);
                cell.appendChild(treeContainer);
            } else {
                const deadTreeEl = document.createElement('div');
                deadTreeEl.className = 'plant-sprite dead-tree';
                deadTreeEl.textContent = '🍂';
                deadTreeEl.style.fontSize = '48px';
                deadTreeEl.style.filter = 'grayscale(0.5)';
                deadTreeEl.style.opacity = '0.7';
                cell.appendChild(deadTreeEl);
            }

            // Add "Click to remove" tooltip
            const removeLabel = document.createElement('div');
            removeLabel.className = 'remove-label';
            removeLabel.textContent = 'Click to remove';
            cell.appendChild(removeLabel);
            return;
        }

        // Add visual representation based on tree status
        if (tree.status === 'empty') {
            // Empty cell - add dirt texture
            const dirtEl = document.createElement('div');
            dirtEl.className = 'fruit-dirt';
            cell.appendChild(dirtEl);
        } else if (tree.status === 'tilled') {
            // Tilled cell - add tilled soil texture
            const tilledEl = document.createElement('div');
            tilledEl.className = 'fruit-tilled';
            cell.appendChild(tilledEl);
        } else if (tree.status === 'planted' || tree.status === 'growing' || tree.status === 'mature') {
            // Add planted soil texture as background
            const plantedSoilEl = document.createElement('div');
            plantedSoilEl.className = 'fruit-planted';
            cell.appendChild(plantedSoilEl);
            const fruit = FRUITS[tree.fruitType];

            // Use SVG tree system if available
            if (window.SVGPlants && window.SVGPlants[tree.fruitType]) {
                const treeContainer = document.createElement('div');
                treeContainer.className = 'tree-svg-container';

                const svgWrapper = document.createElement('div');
                svgWrapper.className = `tree-svg stage-${tree.growthStage}`;
                svgWrapper.innerHTML = window.SVGPlants.getTreeSVG(tree.fruitType, tree.growthStage);
                treeContainer.appendChild(svgWrapper);
                cell.appendChild(treeContainer);
            } else {
                // Fallback to emoji
                const stageEmojis = ['🌱', '🪴', '🌳', '🌳'];
                const emoji = stageEmojis[tree.growthStage] || '🌱';
                const plantEl = document.createElement('div');
                plantEl.className = 'plant-sprite';
                plantEl.textContent = emoji;
                plantEl.style.fontSize = '48px';
                cell.appendChild(plantEl);
            }

            // Add water indicator using SVG if available
            if (tree.needsWater) {
                const waterIndicator = document.createElement('div');
                waterIndicator.className = 'water-indicator';
                if (window.SVGPlants) {
                    waterIndicator.innerHTML = window.SVGPlants.getWaterIndicator();
                } else {
                    waterIndicator.textContent = '💧';
                    waterIndicator.style.fontSize = '20px';
                }
                cell.appendChild(waterIndicator);
            }

            // Add harvest counter indicator (always show for mature trees)
            if ((tree.isMature || tree.harvestCount > 0) && fruit && fruit.maxHarvests) {
                const harvestCounter = document.createElement('div');
                harvestCounter.className = 'harvest-counter';
                harvestCounter.textContent = `🧺 ${tree.harvestCount || 0}/${fruit.maxHarvests}`;
                cell.appendChild(harvestCounter);
            }

            // Add production timer for mature trees (not ready to harvest yet)
            if (tree.isMature && tree.status === 'mature' && !tree.readyToHarvest && this.gameTime) {
                if (tree.lastProduced && tree.lastProduced > 0) {
                    const timeSinceProduced = this.gameTime - tree.lastProduced;
                    const timeUntilNext = fruit.productionInterval - timeSinceProduced;

                    if (timeUntilNext > 0 && timeUntilNext <= fruit.productionInterval) {
                        const timerEl = document.createElement('div');
                        timerEl.className = 'production-timer';
                        timerEl.textContent = `⏱️ ${Math.ceil(timeUntilNext)}s`;
                        cell.appendChild(timerEl);
                    }
                }
            }

            // Add sparkle/harvest indicator if ready to harvest
            if (tree.readyToHarvest) {
                // Harvest sparkle indicator
                const harvestIndicator = document.createElement('div');
                harvestIndicator.className = 'harvest-indicator';
                if (window.SVGPlants) {
                    harvestIndicator.innerHTML = window.SVGPlants.getHarvestIndicator();
                } else {
                    harvestIndicator.textContent = '✨';
                }
                cell.appendChild(harvestIndicator);

                // Floating particles
                if (window.SVGPlants) {
                    const particles = document.createElement('div');
                    particles.innerHTML = window.SVGPlants.createHarvestParticles();
                    cell.appendChild(particles.firstElementChild);
                }
            }
        }
    }

    showGrowthTooltip(element, rowOrIndex, col, type) {
        // Calculate remaining time
        let remainingTime = null;

        if (type === 'vegetable') {
            const cell = this.garden.getCell(rowOrIndex, col);
            if (!cell || cell.status === 'empty' || cell.status === 'tilled' || cell.readyToHarvest) {
                return; // Don't show tooltip for empty, tilled, or harvestable tiles
            }

            const plant = PLANTS[cell.plantType];
            if (!plant) return;

            // Calculate remaining time
            const adjustedGrowthTime = plant.growthTime / this.player.upgrades.fasterGrowth;
            const stageTime = adjustedGrowthTime / plant.stages;
            const timeSincePlanted = this.gameTime - cell.plantedAt;
            const totalGrowthTime = plant.stages * stageTime;
            remainingTime = Math.max(0, totalGrowthTime - timeSincePlanted);

        } else if (type === 'fruit') {
            // Don't show tooltip for fruit trees - they have their own timer display
            return;
        }

        if (remainingTime === null) return;

        // Create tooltip element
        const tooltip = document.createElement('div');
        tooltip.className = 'growth-tooltip show';
        tooltip.innerHTML = `
            <div class="time-label">Time Remaining:</div>
            <div class="time-value">${this.formatTime(remainingTime)}</div>
        `;

        element.style.position = 'relative';
        element.appendChild(tooltip);
    }

    hideGrowthTooltip(element) {
        const tooltip = element.querySelector('.growth-tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }

    showPlantInfoPopup(tileElement, row, col) {
        const cell = this.garden.getCell(row, col);
        if (!cell || !cell.plantType) return;

        const plant = PLANTS[cell.plantType];
        if (!plant) return;

        // Get crop icons mapping
        const cropIcons = {
            tomato: '🍅',
            lettuce: '🥬',
            carrot: '🥕',
            corn: '🌽',
            potato: '🥔'
        };

        // Get popup element
        const popup = document.getElementById('plant-info-popup');
        if (!popup) return;

        // Position popup near the clicked tile
        const rect = tileElement.getBoundingClientRect();
        const popupWidth = 300; // Approximate width from CSS
        const popupHeight = 200; // Approximate height

        // Position to the right of the tile, or left if not enough space
        let left = rect.right + 10;
        if (left + popupWidth > window.innerWidth) {
            left = rect.left - popupWidth - 10;
        }

        // Center vertically relative to tile
        let top = rect.top + (rect.height / 2) - (popupHeight / 2);

        // Keep within viewport
        if (top < 10) top = 10;
        if (top + popupHeight > window.innerHeight) {
            top = window.innerHeight - popupHeight - 10;
        }

        popup.style.left = `${left}px`;
        popup.style.top = `${top}px`;

        // Update popup content
        document.getElementById('plant-info-icon').textContent = cropIcons[cell.plantType] || '🌱';
        document.getElementById('plant-info-name').textContent = plant.name;

        // Calculate growth progress
        const currentStage = cell.growthStage || 0;
        const totalStages = plant.stages;
        const progressText = `Stage ${currentStage + 1} of ${totalStages}`;
        document.getElementById('plant-info-growth').textContent = progressText;

        // Store cell info for live updates
        this.currentPlantInfoCell = { row, col };

        // Initial timer update
        this.updatePlantInfoTimers();

        // Show popup
        popup.classList.remove('hidden');

        console.log(`🌱 Showing plant info for ${plant.name} at (${row}, ${col})`);
    }

    closePlantInfoPopup() {
        const popup = document.getElementById('plant-info-popup');
        if (popup) {
            popup.classList.add('hidden');
            this.currentPlantInfoCell = null;
        }
    }

    updatePlantInfoTimers() {
        if (!this.currentPlantInfoCell) return;

        const { row, col } = this.currentPlantInfoCell;
        const cell = this.garden.getCell(row, col);
        if (!cell || !cell.plantType) {
            this.closePlantInfoPopup();
            return;
        }

        const plant = PLANTS[cell.plantType];
        if (!plant) return;

        // Calculate time until fully grown
        const adjustedGrowthTime = plant.growthTime / this.player.upgrades.fasterGrowth;
        const stageTime = adjustedGrowthTime / plant.stages;
        const timeSincePlanted = this.gameTime - cell.plantedAt;
        const totalGrowthTime = plant.stages * stageTime;
        const timeUntilFullyGrown = Math.max(0, totalGrowthTime - timeSincePlanted);

        // Calculate time until next watering needed
        const timeSinceWatered = this.gameTime - cell.lastWatered;
        const timeUntilWaterNeeded = Math.max(0, plant.waterInterval - timeSinceWatered);

        // Update UI
        const growthTimerEl = document.getElementById('plant-info-growth-timer');
        const waterTimerEl = document.getElementById('plant-info-water-timer');

        if (growthTimerEl) {
            if (timeUntilFullyGrown === 0) {
                growthTimerEl.textContent = 'Ready to harvest! ✨';
                growthTimerEl.style.color = '#FFD700';
            } else {
                growthTimerEl.textContent = this.formatTime(timeUntilFullyGrown);
                growthTimerEl.style.color = '#1565C0';
            }
        }

        if (waterTimerEl) {
            if (timeUntilWaterNeeded === 0) {
                waterTimerEl.textContent = 'Needs water! 💧';
                waterTimerEl.style.color = '#FF6B6B';
            } else {
                waterTimerEl.textContent = this.formatTime(timeUntilWaterNeeded);
                waterTimerEl.style.color = '#1565C0';
            }
        }
    }

    formatTime(seconds) {
        if (seconds < 60) {
            return `${Math.ceil(seconds)}s`;
        } else if (seconds < 3600) {
            const minutes = Math.floor(seconds / 60);
            const secs = Math.ceil(seconds % 60);
            return secs > 0 ? `${minutes}m ${secs}s` : `${minutes}m`;
        } else {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
        }
    }

    saveGame() {
        const saveData = {
            version: '2.8',
            player: this.player.getSaveData(),
            garden: this.garden.getSaveData(),
            fruitGarden: this.fruitGarden.getSaveData(),
            gameTime: this.gameTime,
            currentSeason: this.currentSeason,
            seasonTimer: this.seasonTimer,
            currentYear: this.currentYear,
            activeNews: this.activeNews,
            selectedTool: this.selectedTool,
            selectedSeed: this.selectedSeed
        };

        localStorage.setItem('cozyGardenSave', JSON.stringify(saveData));
        console.log('💾 Game saved (v2.8 with fruit garden)');
    }

    loadGame() {
        const saveData = localStorage.getItem('cozyGardenSave');

        if (saveData) {
            try {
                const data = JSON.parse(saveData);

                this.player.loadSaveData(data.player);
                this.garden.loadSaveData(data.garden);

                // Load fruit garden if exists (backward compatibility)
                if (data.fruitGarden) {
                    this.fruitGarden.loadSaveData(data.fruitGarden);
                }

                this.gameTime = data.gameTime || 0;
                this.currentSeason = data.currentSeason || 0;
                this.seasonTimer = data.seasonTimer || 0;
                this.currentYear = data.currentYear || 1;
                this.activeNews = data.activeNews || [];
                this.selectedTool = data.selectedTool || 'hoe';
                this.selectedSeed = data.selectedSeed || 'tomato';

                console.log('📂 Game loaded from save (v' + (data.version || '2.7') + ')');
                console.log('📦 Loaded inventory:', this.player.inventory);
            } catch (e) {
                console.error('❌ Failed to load save data:', e);
            }
        } else {
            console.log('📝 Starting new game');
        }
    }

    resetGame() {
        if (confirm('🔄 Are you sure you want to reset the game? This will delete all progress!')) {
            console.log('🔄 Resetting game...');
            localStorage.removeItem('cozyGardenSave');
            location.reload();
        }
    }

    showHarvestPopup() {
        console.log('🧺 Opening harvest popup');
        const modal = document.getElementById('harvest-popup');
        const harvestList = document.getElementById('harvest-list');

        // Check if there are any harvested items
        let hasVegetables = false;
        let hasFruits = false;
        let totalValue = 0;

        if (this.player.inventory.harvested) {
            for (const [key, count] of Object.entries(this.player.inventory.harvested)) {
                if (count > 0) {
                    hasVegetables = true;
                    const plant = PLANTS[key];
                    totalValue += count * plant.sellPrice;
                }
            }
        }

        if (this.player.inventory.harvestedFruits) {
            for (const [key, count] of Object.entries(this.player.inventory.harvestedFruits)) {
                if (count > 0) {
                    hasFruits = true;
                    const fruit = FRUITS[key];
                    totalValue += count * fruit.sellPrice;
                }
            }
        }

        // Populate the list
        if (!hasVegetables && !hasFruits) {
            harvestList.innerHTML = `
                <div class="harvest-empty">
                    <div class="harvest-empty-icon">🧺</div>
                    <div class="harvest-empty-text">Your basket is empty!</div>
                    <div class="harvest-empty-hint">Plant and harvest vegetables to fill your basket</div>
                </div>
            `;
            document.getElementById('harvest-total-value').textContent = '0';
        } else {
            harvestList.innerHTML = '';

            // Add vegetables
            if (this.player.inventory.harvested) {
                for (const [key, count] of Object.entries(this.player.inventory.harvested)) {
                if (count > 0) {
                    const plant = PLANTS[key];
                    const itemValue = count * plant.sellPrice;

                    const item = document.createElement('div');
                    item.className = 'harvest-item';
                    item.style.setProperty('--item-color', plant.color);
                    item.style.setProperty('--item-secondary', plant.secondaryColor);

                    // Get plant emoji based on type
                    const plantEmoji = {
                        tomato: '🍅',
                        lettuce: '🥬',
                        carrot: '🥕',
                        corn: '🌽',
                        potato: '🥔'
                    }[key] || '🌱';

                    item.innerHTML = `
                        <div class="harvest-item-icon">${plantEmoji}</div>
                        <div class="harvest-item-info">
                            <div class="harvest-item-name">${plant.name}</div>
                            <div class="harvest-item-details">
                                <div class="harvest-item-quantity">Qty: <strong>${count}</strong></div>
                                <div class="harvest-item-price">
                                    <div class="coin-icon" style="width: 16px; height: 16px; font-size: 10px;"></div>
                                    ${plant.sellPrice} each
                                </div>
                            </div>
                        </div>
                        <div class="harvest-item-total">
                            <div class="coin-icon" style="width: 20px; height: 20px; font-size: 12px;"></div>
                            ${itemValue}
                        </div>
                    `;

                    harvestList.appendChild(item);
                }
                }
            }

            // Add fruits
            if (this.player.upgrades.premiumOrchard && this.player.inventory.harvestedFruits) {
                for (const [key, count] of Object.entries(this.player.inventory.harvestedFruits)) {
                    if (count > 0) {
                        const fruit = FRUITS[key];
                        const itemValue = count * fruit.sellPrice;

                        const item = document.createElement('div');
                        item.className = 'harvest-item';
                        item.style.setProperty('--item-color', fruit.color);
                        item.style.setProperty('--item-secondary', fruit.secondaryColor);
                        item.style.border = '3px solid #DAA520';

                        // Get fruit emoji based on type
                        const fruitEmoji = {
                            apple: '🍎',
                            orange: '🍊',
                            banana: '🍌',
                            pear: '🍐'
                        }[key] || '🌳';

                        item.innerHTML = `
                            <div class="harvest-item-icon">${fruitEmoji}</div>
                            <div class="harvest-item-info">
                                <div class="harvest-item-name">🌳 ${fruit.name}</div>
                                <div class="harvest-item-details">
                                    <div class="harvest-item-quantity">Qty: <strong>${count}</strong></div>
                                    <div class="harvest-item-price">
                                        <div class="coin-icon" style="width: 16px; height: 16px; font-size: 10px;"></div>
                                        ${fruit.sellPrice} each
                                    </div>
                                </div>
                            </div>
                            <div class="harvest-item-total">
                                <div class="coin-icon" style="width: 20px; height: 20px; font-size: 12px;"></div>
                                ${itemValue}
                            </div>
                        `;

                        harvestList.appendChild(item);
                    }
                }
            }

            document.getElementById('harvest-total-value').textContent = totalValue;
        }

        // Show modal
        modal.classList.add('active');
    }

    closeHarvestPopup() {
        const modal = document.getElementById('harvest-popup');
        modal.classList.remove('active');
    }
}

// Initialize game when DOM is ready
let game;

window.addEventListener('DOMContentLoaded', () => {
    console.log('🌱 Welcome to Cozy Garden!');
    game = new Game();
    window.game = game;

    // Initialize Mobile UI if available
    if (window.MobileUI) {
        game.mobileUI = new MobileUI(game);
        if (game.mobileUI.isMobile) {
            console.log('📱 Mobile UI activated!');
        }
    }

    console.log('✨ Game ready to play!');
});
