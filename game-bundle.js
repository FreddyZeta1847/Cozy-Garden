// Cozy Garden Game - Complete Bundle
// All game code in one file for direct browser loading

// ==================== DATA ====================

// Plants Database
const PLANTS = {
    tomato: {
        name: "Tomato",
        seedCost: 10,
        growthTime: 120,
        waterInterval: 30,
        harvestYield: 2,
        sellPrice: 8,
        stages: 3,
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
        color: "#D2B48C",
        secondaryColor: "#8B7355",
        description: "Hearty russet potatoes"
    }
};

// Fruits Database
const FRUITS = {
    apple: {
        name: "Apple",
        seedCost: 80,
        growthTime: 240,
        waterInterval: 10,
        harvestYield: 1,
        sellPrice: 50,
        stages: 4,
        color: "#DC143C",
        secondaryColor: "#8B0000",
        description: "Crisp red apples from your own tree"
    },
    orange: {
        name: "Orange",
        seedCost: 100,
        growthTime: 300,
        waterInterval: 12,
        harvestYield: 1,
        sellPrice: 70,
        stages: 4,
        color: "#FF8C00",
        secondaryColor: "#FF6347",
        description: "Juicy sweet oranges bursting with flavor"
    },
    banana: {
        name: "Banana",
        seedCost: 120,
        growthTime: 360,
        waterInterval: 15,
        harvestYield: 1,
        sellPrice: 100,
        stages: 4,
        color: "#FFD700",
        secondaryColor: "#FF8C00",
        description: "Tropical yellow bananas from your grove"
    },
    pear: {
        name: "Pear",
        seedCost: 90,
        growthTime: 270,
        waterInterval: 11,
        harvestYield: 1,
        sellPrice: 60,
        stages: 4,
        color: "#9ACD32",
        secondaryColor: "#6B8E23",
        description: "Sweet golden pears straight from the tree"
    }
};

// Upgrades Database
const UPGRADES = {
    autoWatering: {
        name: "Auto-Watering System",
        icon: "💦",
        description: "Automatically waters all plants every 30 seconds. No more manual watering!",
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
        description: "Expand your garden to 8x5 tiles for more planting space.",
        cost: 300,
        effect: "expandedGarden"
    },
    premiumOrchard: {
        name: "Premium Orchard",
        icon: "🌳",
        description: "Unlock a premium fruit orchard with 5 tree slots. Grow expensive fruits for high profits!",
        cost: 500,
        effect: "premiumOrchard"
    }
};

// Seasons - Seasonal background images
const SEASONS = [
    {
        name: "Spring",
        icon: "🌸",
        duration: 300,
        backgroundImage: "src/images/grass-field/Spring.png",
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
        duration: 300,
        backgroundImage: "src/images/grass-field/Summer.png",
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
        duration: 300,
        backgroundImage: "src/images/grass-field/Autumn.png",
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
        duration: 300,
        backgroundImage: "src/images/grass-field/Winter.png",
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
            premiumOrchard: false
        };
    }

    addMoney(amount) {
        this.money += amount;
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
        console.log(`🌾 Harvested ${amount} ${type}. Old total: ${oldTotal}, New total: ${this.inventory.harvested[type]}`);
        console.log('🌾 Full harvested inventory:', this.inventory.harvested);
    }

    sellHarvest(type, amount) {
        if (this.inventory.harvested[type] >= amount) {
            this.inventory.harvested[type] -= amount;
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
        console.log(`🍎 Harvested ${amount} ${type}. Old total: ${oldTotal}, New total: ${this.inventory.harvestedFruits[type]}`);
        console.log('🍎 Full harvested fruits inventory:', this.inventory.harvestedFruits);
    }

    sellFruit(type, amount) {
        if (this.inventory.harvestedFruits[type] >= amount) {
            this.inventory.harvestedFruits[type] -= amount;
            console.log(`Sold ${amount} ${type} fruit. Remaining: ${this.inventory.harvestedFruits[type]}`);
            return true;
        }
        return false;
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
        }
        console.log(`Purchased upgrade: ${upgradeType}`);
    }

    getSaveData() {
        return {
            money: this.money,
            inventory: JSON.parse(JSON.stringify(this.inventory)),
            upgrades: JSON.parse(JSON.stringify(this.upgrades))
        };
    }

    loadSaveData(data) {
        if (data.money !== undefined) this.money = data.money;

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
    constructor(rows = 4, cols = 6) {
        this.rows = rows;
        this.cols = cols;
        this.grid = [];
        this.initializeGrid();
    }

    initializeGrid() {
        for (let row = 0; row < this.rows; row++) {
            this.grid[row] = [];
            for (let col = 0; col < this.cols; col++) {
                this.grid[row][col] = this.createEmptyCell();
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
            plantedAt: 0
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
        console.log(`Garden expanded to ${newRows}x${newCols}`);
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

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const cell = this.grid[row][col];

                if (cell.status === 'planted' || cell.status === 'growing') {
                    const plant = PLANTS[cell.plantType];

                    const timeSinceWatered = currentTime - cell.lastWatered;
                    if (timeSinceWatered > plant.waterInterval) {
                        if (!cell.needsWater) {
                            cell.needsWater = true;
                            updated = true;
                        }
                        continue;
                    }

                    const adjustedGrowthTime = plant.growthTime / growthMultiplier;
                    const stageTime = adjustedGrowthTime / plant.stages;
                    const timeSincePlanted = currentTime - cell.plantedAt;
                    const newStage = Math.min(
                        Math.floor(timeSincePlanted / stageTime),
                        plant.stages - 1
                    );

                    if (newStage !== cell.growthStage) {
                        cell.growthStage = newStage;
                        cell.status = 'growing';
                        updated = true;
                    }

                    if (cell.growthStage === plant.stages - 1 && !cell.readyToHarvest) {
                        cell.readyToHarvest = true;
                        updated = true;
                    }
                }
            }
        }

        return updated;
    }

    autoWater(currentTime) {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const cell = this.grid[row][col];
                if (cell.status === 'planted' || cell.status === 'growing') {
                    cell.lastWatered = currentTime;
                    cell.needsWater = false;
                }
            }
        }
        console.log('Auto-watered all plants');
    }

    getSaveData() {
        return {
            rows: this.rows,
            cols: this.cols,
            grid: JSON.parse(JSON.stringify(this.grid))
        };
    }

    loadSaveData(data) {
        if (data.rows) this.rows = data.rows;
        if (data.cols) this.cols = data.cols;
        if (data.grid) this.grid = data.grid;
        console.log('Garden data loaded');
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
            status: 'empty',
            fruitType: null,
            growthStage: 0,
            lastWatered: 0,
            needsWater: false,
            readyToHarvest: false,
            plantedAt: 0
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
        if (tree && tree.status === 'empty') {
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

    harvestFruit(slot) {
        const tree = this.getTree(slot);
        console.log(`🍎 FruitGarden.harvestFruit - tree at slot ${slot}:`, tree);

        if (tree && tree.readyToHarvest) {
            const fruitType = tree.fruitType;
            const fruit = FRUITS[fruitType];
            const yield_ = fruit.harvestYield;

            console.log(`🍎 Fruit ready! Type: ${fruitType}, Yield: ${yield_}`);

            // Reset tree to stage 2 (mature tree) after harvest - tree persists
            tree.growthStage = 2;
            tree.readyToHarvest = false;
            tree.plantedAt = Date.now(); // Reset growth timer for next fruit
            tree.lastWatered = Date.now();

            console.log(`🍎 Harvested ${yield_} ${fruitType} from slot ${slot}`);
            return { fruitType, yield: yield_ };
        }

        console.log(`🍎 Tree not ready to harvest. readyToHarvest: ${tree ? tree.readyToHarvest : 'tree is null'}`);
        return null;
    }

    updateGrowth(currentTime, growthMultiplier = 1.0) {
        let updated = false;

        for (let slot = 0; slot < this.slots; slot++) {
            const tree = this.trees[slot];

            if (tree.status === 'planted' || tree.status === 'growing') {
                const fruit = FRUITS[tree.fruitType];

                // Check if tree needs water
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

                // Check if ready to harvest (final stage)
                if (tree.growthStage === fruit.stages - 1 && !tree.readyToHarvest) {
                    tree.readyToHarvest = true;
                    updated = true;
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
        this.updateSeedSelector();
        this.updateSeason();
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

    updateSeedSelector() {
        const selector = document.getElementById('seed-selector');
        if (!selector) return;

        selector.innerHTML = '';

        // Crop emoji icons (fully grown)
        const cropIcons = {
            tomato: '🍅',
            lettuce: '🥬',
            carrot: '🥕',
            corn: '🌽',
            potato: '🥔'
        };

        for (const [key, plant] of Object.entries(PLANTS)) {
            const btn = document.createElement('button');
            btn.className = 'seed-button';
            btn.dataset.seed = key;

            const count = this.game.player.inventory.seeds[key];
            if (count === 0) {
                btn.classList.add('disabled');
            }

            btn.onclick = () => {
                if (count > 0) {
                    this.game.selectSeed(key);
                }
            };

            const seedVisual = document.createElement('div');
            seedVisual.className = 'seed-icon';
            seedVisual.textContent = cropIcons[key] || '🌱';
            seedVisual.style.fontSize = '32px';

            const countLabel = document.createElement('span');
            countLabel.className = 'seed-count';
            countLabel.textContent = count;

            const nameLabel = document.createElement('span');
            nameLabel.className = 'seed-name';
            nameLabel.textContent = plant.name;

            btn.appendChild(seedVisual);
            btn.appendChild(countLabel);
            btn.appendChild(nameLabel);

            selector.appendChild(btn);
        }
    }

    updateSeason() {
        const season = SEASONS[this.game.currentSeason];
        const display = document.getElementById('season-display');
        if (display) {
            const seasonIcon = display.querySelector('.season-icon');
            if (seasonIcon) {
                seasonIcon.textContent = season.icon;
            }
            const seasonName = display.querySelector('span:last-child');
            if (seasonName) {
                seasonName.textContent = season.name;
            }
        }

        // Add data-season attribute to body for CSS theming
        document.body.setAttribute('data-season', season.name.toLowerCase());

        // Use seasonal background image
        document.body.style.backgroundImage = `url('${season.backgroundImage}')`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundColor = season.colors.primary;

        if (this.game.particles) {
            this.game.particles.updateSeason(season.name);
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

        this.updateTileVisual(tile, row, col);
        return tile;
    }

    updateTileVisual(tile, row, col) {
        const cell = this.game.garden.getCell(row, col);
        if (!cell) return;

        tile.className = 'tile';
        tile.innerHTML = '';

        tile.classList.add(cell.status);

        if (cell.needsWater) {
            tile.classList.add('needs-water');
        }

        if (cell.readyToHarvest) {
            tile.classList.add('harvestable');
        }

        switch (cell.status) {
            case 'empty':
                tile.appendChild(this.createEmptyTileVisual());
                break;
            case 'tilled':
                tile.appendChild(this.createTilledVisual());
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
        container.className = 'plant-container';

        const plant = PLANTS[cell.plantType];
        if (!plant) return container;

        // Simple emoji icons for plant stages
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

        if (cell.needsWater) {
            const droplet = document.createElement('div');
            droplet.className = 'water-droplet-indicator';
            droplet.textContent = '💧';
            droplet.style.position = 'absolute';
            droplet.style.top = '5px';
            droplet.style.right = '5px';
            droplet.style.fontSize = '18px';
            container.appendChild(droplet);
        }

        if (cell.readyToHarvest) {
            const sparkle = document.createElement('div');
            sparkle.className = 'harvest-ready-indicator';
            container.appendChild(sparkle);
        }

        container.appendChild(plantEl);
        return container;
    }

    updateTile(row, col) {
        const tile = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        if (tile) {
            this.updateTileVisual(tile, row, col);

            if (this.game.particles) {
                this.game.particles.animateTilePulse(tile);
            }
        }
    }

    renderShop() {
        const shopItems = document.getElementById('shop-items');
        if (!shopItems) return;

        shopItems.innerHTML = '';

        // Crop emoji icons (fully grown)
        const cropIcons = {
            tomato: '🍅',
            lettuce: '🥬',
            carrot: '🥕',
            corn: '🌽',
            potato: '🥔'
        };

        // Add vegetable seeds section
        for (const [key, plant] of Object.entries(PLANTS)) {
            const item = document.createElement('div');
            item.className = 'shop-item';

            const canBuy = this.game.player.money >= plant.seedCost;

            item.innerHTML = `
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
                    <div class="price"><div class="coin-icon"></div>${plant.seedCost}</div>
                    <button class="buy-button" onclick="game.buySeed('${key}')" ${!canBuy ? 'disabled' : ''}>
                        Buy Seed
                    </button>
                </div>
            `;

            shopItems.appendChild(item);
        }

        // Add fruit seeds section if orchard is unlocked
        if (this.game.player.upgrades.premiumOrchard) {
            // Add section divider
            const divider = document.createElement('div');
            divider.style.cssText = 'grid-column: 1/-1; text-align: center; margin: 20px 0; font-size: 24px; font-weight: bold; color: #DAA520;';
            divider.innerHTML = '🌳 Premium Fruit Seeds';
            shopItems.appendChild(divider);

            const fruitIcons = {
                apple: '🍎',
                orange: '🍊',
                banana: '🍌',
                pear: '🍐'
            };

            for (const [key, fruit] of Object.entries(FRUITS)) {
                const item = document.createElement('div');
                item.className = 'shop-item';
                item.style.borderColor = '#DAA520';
                item.style.boxShadow = '0 6px 0 #DAA520, 0 8px 16px rgba(218, 165, 32, 0.3)';

                const canBuy = this.game.player.money >= fruit.seedCost;

                item.innerHTML = `
                    <div class="shop-item-icon" style="background: linear-gradient(135deg, rgba(218, 165, 32, 0.1), rgba(184, 134, 11, 0.1));">${fruitIcons[key] || '🌳'}</div>
                    <div class="shop-item-header">
                        <h3>🌳 ${fruit.name} Tree</h3>
                    </div>
                    <div class="shop-item-details">
                        <p>${fruit.description}</p>
                        <div class="stats">
                            <div class="stat"><span>⏱️</span> ${fruit.growthTime}s</div>
                            <div class="stat"><span>💧</span> ${fruit.waterInterval}s</div>
                            <div class="stat"><span>🍇</span> Yield: ${fruit.harvestYield}</div>
                            <div class="stat"><span>💰</span> Sells for: $${fruit.sellPrice}</div>
                        </div>
                    </div>
                    <div class="shop-item-footer">
                        <div class="price" style="color: #DAA520;"><div class="coin-icon"></div>${fruit.seedCost}</div>
                        <button class="buy-button" style="background: linear-gradient(135deg, #DAA520, #B8860B);" onclick="game.buyFruitSeed('${key}')" ${!canBuy ? 'disabled' : ''}>
                            Buy Tree
                        </button>
                    </div>
                `;

                shopItems.appendChild(item);
            }
        }
    }

    renderMarket() {
        this.renderInventory();
        this.renderSellSlots();
    }

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
                        <div class="inventory-name">🌳 ${fruit.name}</div>
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
            input.max = '100';
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
                const actualQty = Math.min(quantity, available);
                input.value = actualQty;
                const total = actualQty * plant.sellPrice;
                calc.textContent = total;
            } else if (type === 'fruit') {
                const fruit = FRUITS[key];
                const available = this.game.player.inventory.harvestedFruits[key];
                const actualQty = Math.min(quantity, available);
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
                    const actualQty = Math.min(quantity, available);
                    total += actualQty * plant.sellPrice;
                } else if (type === 'fruit') {
                    const fruit = FRUITS[key];
                    const available = this.game.player.inventory.harvestedFruits[key];
                    const actualQty = Math.min(quantity, available);
                    total += actualQty * fruit.sellPrice;
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
            item.className = 'upgrade-item';

            const isOwned = this.game.player.upgrades[upgrade.effect === 'fasterGrowth' ? 'fasterGrowth' : upgrade.effect];
            const owned = (upgrade.effect === 'fasterGrowth' && isOwned > 1.0) || isOwned === true;

            if (owned) {
                item.classList.add('owned');
            }

            const canBuy = this.game.player.money >= upgrade.cost && !owned;

            item.innerHTML = `
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
                            Purchase
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
        const treeStages = {
            apple: ['🌱', '🌿', '🌳', '🍎'],
            orange: ['🌱', '🌿', '🌳', '🍊'],
            banana: ['🌱', '🌿', '🌳', '🍌'],
            pear: ['🌱', '🌿', '🌳', '🍐']
        };

        return treeStages[fruitType] ? treeStages[fruitType][stage] : '🌱';
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
        this.gameTime = 0;
        this.autoWateringTimer = 0;

        this.initialize();
    }

    initialize() {
        console.log('🌱 Cozy Garden Game Starting...');

        this.loadGame();

        console.log('📊 Initial game state:');
        console.log('  💰 Money:', this.player.money);
        console.log('  🌱 Seeds:', this.player.inventory.seeds);
        console.log('  🧺 Harvested:', this.player.inventory.harvested);

        this.ui.renderGarden();
        this.ui.updateAll();

        // Show orchard if already unlocked
        if (this.player.upgrades.premiumOrchard) {
            this.ui.showOrchard();
            this.ui.renderOrchard();
        }

        this.startGameLoop();

        console.log('✅ Game initialized successfully!');
    }

    startGameLoop() {
        setInterval(() => {
            this.gameTime++;

            // Update vegetable garden growth
            const updated = this.garden.updateGrowth(this.gameTime, this.player.upgrades.fasterGrowth);
            if (updated) {
                this.refreshAllTiles();
            }

            // Update fruit garden growth
            const fruitUpdated = this.fruitGarden.updateGrowth(this.gameTime, this.player.upgrades.fasterGrowth);
            if (fruitUpdated) {
                this.ui.refreshFruitSlots();
            }

            this.updateSeasons();

            // Auto-watering system
            if (this.player.upgrades.autoWatering) {
                this.autoWateringTimer++;
                if (this.autoWateringTimer >= 30) {
                    this.autoWateringTimer = 0;
                    this.garden.autoWater(this.gameTime);
                    this.fruitGarden.autoWater(this.gameTime);
                    this.refreshAllTiles();
                    this.ui.refreshFruitSlots();
                }
            }

            if (this.gameTime % 30 === 0) {
                this.saveGame();
            }
        }, 1000);
    }

    updateSeasons() {
        this.seasonTimer++;
        const currentSeasonDuration = SEASONS[this.currentSeason].duration;

        if (this.seasonTimer >= currentSeasonDuration) {
            this.seasonTimer = 0;
            this.currentSeason = (this.currentSeason + 1) % SEASONS.length;
            this.ui.updateSeason();
            console.log(`🌸 Season changed to ${SEASONS[this.currentSeason].name}`);
        }
    }

    handleTileClick(row, col) {
        const cell = this.garden.getCell(row, col);
        if (!cell) return;

        if (cell.readyToHarvest) {
            this.harvestPlant(row, col);
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
            if (cell.status === 'tilled' && this.player.useSeed(seedType)) {
                this.garden.plant(row, col, seedType, this.gameTime);
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

    waterPlant(row, col) {
        if (this.garden.water(row, col, this.gameTime)) {
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
            console.log(`🎯 Calling player.addHarvest(${result.plantType}, ${result.yield})`);
            this.player.addHarvest(result.plantType, result.yield);

            this.ui.updateTile(row, col);
            this.ui.updateAll();

            const tile = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            if (tile && this.particles) {
                this.particles.createHarvestSparkle(tile);
            }

            this.saveGame();
            console.log(`✅ Harvested ${result.yield} ${result.plantType}!`);
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

    refreshAllTiles() {
        for (let row = 0; row < this.garden.rows; row++) {
            for (let col = 0; col < this.garden.cols; col++) {
                this.ui.updateTile(row, col);
            }
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

    showShop() {
        this.ui.showScreen('shop-screen');
        this.ui.renderShop();
    }

    buySeed(seedType) {
        const plant = PLANTS[seedType];

        if (this.player.spendMoney(plant.seedCost)) {
            this.player.addSeed(seedType, 1);
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
            this.ui.showToast('success', cropIcons[seedType], 'Seed Purchased!', `Bought 1 ${plant.name} seed for $${plant.seedCost}`);
        }
    }

    buyFruitSeed(fruitType) {
        const fruit = FRUITS[fruitType];

        if (this.player.spendMoney(fruit.seedCost)) {
            this.player.addFruitSeed(fruitType, 1);
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
            this.ui.showToast('success', fruitIcons[fruitType], 'Tree Purchased!', `Bought 1 ${fruit.name} tree for $${fruit.seedCost}`);
        }
    }

    showMarket() {
        this.ui.showScreen('market-screen');
        this.ui.renderMarket();
    }

    sellAll() {
        let totalEarned = 0;

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
                        const earnings = actualQty * plant.sellPrice;
                        totalEarned += earnings;
                    }
                } else if (type === 'fruit') {
                    const fruit = FRUITS[key];
                    const available = this.player.inventory.harvestedFruits[key];
                    const actualQty = Math.min(quantity, available);

                    if (this.player.sellFruit(key, actualQty)) {
                        const earnings = actualQty * fruit.sellPrice;
                        totalEarned += earnings;
                    }
                }
            }
        }

        this.player.addMoney(totalEarned);
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

    showUpgrades() {
        this.ui.showScreen('upgrades-screen');
        this.ui.renderUpgrades();
    }

    buyUpgrade(upgradeKey) {
        const upgrade = UPGRADES[upgradeKey];

        if (this.player.spendMoney(upgrade.cost)) {
            this.player.purchaseUpgrade(upgrade.effect);

            if (upgrade.effect === 'expandedGarden') {
                this.garden.expand(5, 8);
                this.ui.renderGarden();
            }

            if (upgrade.effect === 'premiumOrchard') {
                this.ui.showOrchard();
                this.ui.renderOrchard();
            }

            this.ui.updateAll();
            this.ui.renderUpgrades();
            this.saveGame();

            // Show success toast
            this.ui.showToast('success', upgrade.icon, 'Upgrade Purchased!', `${upgrade.name} - $${upgrade.cost}`);

            console.log(`✅ Purchased upgrade: ${upgrade.name}`);
        }
    }

    showGarden() {
        this.ui.showScreen('garden-screen');
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
    console.log('✨ Game ready to play!');
});
