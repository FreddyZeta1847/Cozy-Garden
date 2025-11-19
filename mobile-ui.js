// Mobile UI System - Cozy Garden
// Object-first contextual interaction for mobile devices
// This file handles mobile-specific UI logic without modifying desktop behavior

class MobileUI {
    constructor(game) {
        this.game = game;
        this.isMobile = this.detectMobile();
        this.contextMenu = null;
        this.bottomSheet = null;
        this.currentScreen = 'garden';
        this.sellCart = []; // Items selected for selling

        if (this.isMobile) {
            this.init();
        }
    }

    detectMobile() {
        // Check for mobile device or small screen
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const isSmallScreen = window.innerWidth <= 768;
        const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        return (isTouchDevice && isSmallScreen) || isMobileUA;
    }

    init() {
        console.log('📱 Mobile UI initialized');

        // Add mobile class to body
        document.body.classList.add('mobile-mode');

        // Create mobile UI elements
        this.createMobileLayout();
        this.createContextMenu();
        this.createBottomSheet();
        this.createFloatingButtons();
        this.createTabBar();

        // Override tile click behavior
        this.setupMobileInteractions();

        // Listen for orientation changes
        window.addEventListener('orientationchange', () => this.handleOrientationChange());
        window.addEventListener('resize', () => this.handleResize());
    }

    createMobileLayout() {
        // Hide desktop-specific elements
        const elementsToHide = [
            '.tools-bar .tool-section', // Hide hoe/water buttons
            '.seed-selector-container', // Hide seed selector bar
            '.seed-nav-arrow',
        ];

        elementsToHide.forEach(selector => {
            const el = document.querySelector(selector);
            if (el) el.style.display = 'none';
        });

        // Modify garden grid for mobile (4 columns)
        this.convertToMobileGrid();

        // Compact header for mobile
        this.compactifyHeader();
    }

    convertToMobileGrid() {
        const gardenGrid = document.getElementById('garden-grid');
        if (!gardenGrid) return;

        // Change grid to 4 columns, make it scrollable
        gardenGrid.style.gridTemplateColumns = 'repeat(4, 1fr)';
        gardenGrid.style.gridAutoRows = '1fr';
        gardenGrid.style.overflowY = 'auto';
        gardenGrid.style.maxHeight = '60vh';
        gardenGrid.style.padding = '10px';

        // Enable touch scrolling
        gardenGrid.style.webkitOverflowScrolling = 'touch';
    }

    compactifyHeader() {
        const header = document.querySelector('.header');
        if (!header) return;

        // Create mobile header layout
        header.innerHTML = `
            <div class="mobile-header-row">
                <div class="mobile-level-display">
                    <span class="level-icon">⭐</span>
                    <span class="level-number" id="mobile-level-number">${this.game.player.level}</span>
                    <div class="mobile-xp-bar">
                        <div class="xp-fill" id="mobile-xp-bar"></div>
                    </div>
                </div>
                <div class="mobile-resources">
                    <div class="mobile-resource">
                        <span class="coin-icon-small">🪙</span>
                        <span id="mobile-money-display">${this.game.player.money}</span>
                    </div>
                    <div class="mobile-resource" onclick="game.mobileUI.showInventory()">
                        <span>🧺</span>
                        <span id="mobile-harvested-count">0</span>
                    </div>
                </div>
                <div class="mobile-header-actions">
                    <span class="season-icon" id="mobile-season-icon">🌸</span>
                    <button class="settings-btn" onclick="game.mobileUI.showSettings()">⚙️</button>
                </div>
            </div>
        `;
    }

    createContextMenu() {
        // Create contextual action menu (appears when tapping a tile)
        const menu = document.createElement('div');
        menu.id = 'mobile-context-menu';
        menu.className = 'mobile-context-menu hidden';
        menu.innerHTML = `
            <div class="context-menu-content">
                <div class="context-actions" id="context-actions">
                    <!-- Actions will be populated dynamically -->
                </div>
            </div>
        `;
        document.body.appendChild(menu);
        this.contextMenu = menu;

        // Close on outside tap
        menu.addEventListener('click', (e) => {
            if (e.target === menu) {
                this.hideContextMenu();
            }
        });
    }

    createBottomSheet() {
        // Create bottom sheet for seed selection
        const sheet = document.createElement('div');
        sheet.id = 'mobile-bottom-sheet';
        sheet.className = 'mobile-bottom-sheet hidden';
        sheet.innerHTML = `
            <div class="bottom-sheet-backdrop"></div>
            <div class="bottom-sheet-content">
                <div class="bottom-sheet-handle"></div>
                <div class="bottom-sheet-header">
                    <h3 id="bottom-sheet-title">Select Seed</h3>
                    <button class="close-sheet-btn" onclick="game.mobileUI.hideBottomSheet()">✕</button>
                </div>
                <div class="bottom-sheet-body" id="bottom-sheet-body">
                    <!-- Content populated dynamically -->
                </div>
            </div>
        `;
        document.body.appendChild(sheet);
        this.bottomSheet = sheet;

        // Close on backdrop tap
        sheet.querySelector('.bottom-sheet-backdrop').addEventListener('click', () => {
            this.hideBottomSheet();
        });

        // Swipe down to close
        this.setupSwipeToClose(sheet);
    }

    createFloatingButtons() {
        // Create QoL floating action buttons
        const container = document.createElement('div');
        container.id = 'mobile-floating-buttons';
        container.className = 'mobile-floating-buttons';
        container.innerHTML = `
            <button class="fab water-all-fab hidden" id="water-all-btn" onclick="game.mobileUI.waterAll()">
                <span>💧</span>
                <span class="fab-label">Water All</span>
            </button>
            <button class="fab harvest-all-fab hidden" id="harvest-all-btn" onclick="game.mobileUI.harvestAll()">
                <span>🧺</span>
                <span class="fab-label">Harvest All</span>
            </button>
        `;
        document.body.appendChild(container);
    }

    createTabBar() {
        // Create mobile bottom navigation tab bar
        const tabBar = document.createElement('nav');
        tabBar.id = 'mobile-tab-bar';
        tabBar.className = 'mobile-tab-bar';
        tabBar.innerHTML = `
            <button class="tab-item active" data-tab="garden" onclick="game.mobileUI.switchTab('garden')">
                <span class="tab-icon">🏠</span>
                <span class="tab-label">Garden</span>
            </button>
            <button class="tab-item" data-tab="shop" onclick="game.mobileUI.switchTab('shop')">
                <span class="tab-icon">🛒</span>
                <span class="tab-label">Shop</span>
            </button>
            <button class="tab-item" data-tab="inventory" onclick="game.mobileUI.switchTab('inventory')">
                <span class="tab-icon">📦</span>
                <span class="tab-label">Silo</span>
            </button>
            <button class="tab-item" data-tab="upgrades" onclick="game.mobileUI.switchTab('upgrades')">
                <span class="tab-icon">✨</span>
                <span class="tab-label">Upgrades</span>
            </button>
        `;
        document.body.appendChild(tabBar);

        // Hide desktop navigation buttons
        const navButtons = document.querySelector('.nav-buttons');
        if (navButtons) navButtons.style.display = 'none';
    }

    setupMobileInteractions() {
        // Override tile click to show context menu instead of direct action
        const originalHandleTileClick = this.game.handleTileClick.bind(this.game);

        this.game.handleTileClick = (row, col) => {
            if (this.isMobile) {
                this.showTileContextMenu(row, col);
            } else {
                originalHandleTileClick(row, col);
            }
        };

        // Also override fruit cell clicks
        const originalHandleFruitCellClick = this.game.handleFruitCellClick?.bind(this.game);
        if (originalHandleFruitCellClick) {
            this.game.handleFruitCellClick = (slot) => {
                if (this.isMobile) {
                    this.showFruitContextMenu(slot);
                } else {
                    originalHandleFruitCellClick(slot);
                }
            };
        }
    }

    showTileContextMenu(row, col) {
        const cell = this.game.garden.getCell(row, col);
        if (!cell) return;

        const actions = this.getTileActions(cell, row, col);
        if (actions.length === 0) return;

        this.renderContextMenu(actions, row, col);
    }

    getTileActions(cell, row, col) {
        const actions = [];

        switch (cell.status) {
            case 'empty':
                actions.push({
                    icon: '⛏️',
                    label: 'Till',
                    action: () => {
                        this.game.garden.till(row, col);
                        this.game.ui.renderGarden();
                        this.game.particles.animateTilePulse(document.querySelector(`[data-row="${row}"][data-col="${col}"]`));
                        this.hideContextMenu();
                    }
                });
                break;

            case 'tilled':
                actions.push({
                    icon: '🌱',
                    label: 'Plant',
                    action: () => {
                        this.hideContextMenu();
                        this.showSeedSelector(row, col);
                    }
                });
                break;

            case 'planted':
            case 'growing':
                if (cell.needsWater) {
                    actions.push({
                        icon: '💧',
                        label: 'Water',
                        action: () => {
                            this.game.garden.water(row, col, this.game.gameTime);
                            const tile = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
                            if (tile) this.game.particles.createWaterSplash(tile);
                            this.game.ui.renderGarden();
                            this.game.awardXP(LEVEL_SYSTEM.xpRewards.waterPlant, 'waterPlant');
                            this.hideContextMenu();
                        }
                    });
                }

                if (cell.readyToHarvest) {
                    actions.push({
                        icon: '🧺',
                        label: 'Harvest',
                        action: () => {
                            const result = this.game.garden.harvest(row, col);
                            if (result) {
                                this.game.player.addHarvest(result.plantType, result.yield);
                                const tile = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
                                if (tile) this.game.particles.createHarvestSparkle(tile);
                                this.game.awardXP(LEVEL_SYSTEM.xpRewards.harvest, 'harvest');
                                this.game.ui.updateAll();
                                this.game.ui.renderGarden();
                                this.game.save();
                            }
                            this.hideContextMenu();
                        }
                    });
                }

                // Show plant info
                const plant = PLANTS[cell.plantType];
                if (plant) {
                    actions.push({
                        icon: 'ℹ️',
                        label: 'Info',
                        action: () => {
                            this.showPlantInfo(cell, plant);
                        }
                    });
                }
                break;
        }

        return actions;
    }

    renderContextMenu(actions, row, col) {
        const actionsContainer = document.getElementById('context-actions');
        actionsContainer.innerHTML = '';

        actions.forEach(action => {
            const btn = document.createElement('button');
            btn.className = 'context-action-btn';
            btn.innerHTML = `
                <span class="action-icon">${action.icon}</span>
                <span class="action-label">${action.label}</span>
            `;
            btn.onclick = action.action;
            actionsContainer.appendChild(btn);
        });

        // Position menu near the tapped tile
        const tile = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        if (tile) {
            const rect = tile.getBoundingClientRect();
            const menu = this.contextMenu.querySelector('.context-menu-content');

            // Position above or below tile based on screen position
            const menuHeight = 80;
            if (rect.top > menuHeight + 20) {
                menu.style.top = `${rect.top - menuHeight - 10}px`;
            } else {
                menu.style.top = `${rect.bottom + 10}px`;
            }
            menu.style.left = `${rect.left + rect.width / 2}px`;
            menu.style.transform = 'translateX(-50%)';
        }

        this.contextMenu.classList.remove('hidden');
    }

    hideContextMenu() {
        if (this.contextMenu) {
            this.contextMenu.classList.add('hidden');
        }
    }

    showSeedSelector(row, col) {
        const body = document.getElementById('bottom-sheet-body');
        const title = document.getElementById('bottom-sheet-title');
        title.textContent = 'Select Seed';

        const unlockedVegetables = this.game.player.getUnlockedVegetables();

        const cropIcons = {
            tomato: '🍅',
            lettuce: '🥬',
            carrot: '🥕',
            corn: '🌽',
            potato: '🥔'
        };

        let html = '<div class="seed-grid">';

        for (const key of unlockedVegetables) {
            const plant = PLANTS[key];
            const count = this.game.player.inventory.seeds[key];
            const disabled = count === 0 ? 'disabled' : '';

            html += `
                <button class="seed-card ${disabled}" ${disabled} onclick="game.mobileUI.plantSeed('${key}', ${row}, ${col})">
                    <span class="seed-card-icon">${cropIcons[key]}</span>
                    <span class="seed-card-name">${plant.name}</span>
                    <span class="seed-card-count">x${count}</span>
                </button>
            `;
        }

        html += '</div>';
        body.innerHTML = html;

        this.showBottomSheet();
    }

    plantSeed(seedType, row, col) {
        if (this.game.player.useSeed(seedType)) {
            this.game.garden.plant(row, col, seedType, this.game.gameTime);
            this.game.awardXP(LEVEL_SYSTEM.xpRewards.plant, 'plant');
            this.game.ui.updateAll();
            this.game.ui.renderGarden();
            this.game.save();

            // Animate
            const tile = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            if (tile) this.game.particles.animatePlantGrowth(tile);
        }
        this.hideBottomSheet();
    }

    showBottomSheet() {
        if (this.bottomSheet) {
            this.bottomSheet.classList.remove('hidden');
            // Animate in
            requestAnimationFrame(() => {
                this.bottomSheet.querySelector('.bottom-sheet-content').style.transform = 'translateY(0)';
            });
        }
    }

    hideBottomSheet() {
        if (this.bottomSheet) {
            const content = this.bottomSheet.querySelector('.bottom-sheet-content');
            content.style.transform = 'translateY(100%)';
            setTimeout(() => {
                this.bottomSheet.classList.add('hidden');
            }, 300);
        }
    }

    setupSwipeToClose(sheet) {
        const content = sheet.querySelector('.bottom-sheet-content');
        let startY = 0;
        let currentY = 0;

        content.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
        });

        content.addEventListener('touchmove', (e) => {
            currentY = e.touches[0].clientY;
            const diff = currentY - startY;
            if (diff > 0) {
                content.style.transform = `translateY(${diff}px)`;
            }
        });

        content.addEventListener('touchend', () => {
            const diff = currentY - startY;
            if (diff > 100) {
                this.hideBottomSheet();
            } else {
                content.style.transform = 'translateY(0)';
            }
        });
    }

    // QoL Floating Buttons
    updateFloatingButtons() {
        const waterBtn = document.getElementById('water-all-btn');
        const harvestBtn = document.getElementById('harvest-all-btn');

        // Check for plants needing water
        let needsWater = false;
        let readyToHarvest = false;

        for (let row = 0; row < this.game.garden.rows; row++) {
            for (let col = 0; col < this.game.garden.cols; col++) {
                const cell = this.game.garden.getCell(row, col);
                if (cell.needsWater) needsWater = true;
                if (cell.readyToHarvest) readyToHarvest = true;
            }
        }

        // Check fruit trees too
        if (this.game.fruitGarden) {
            for (let i = 0; i < this.game.fruitGarden.slots; i++) {
                const tree = this.game.fruitGarden.getTree(i);
                if (tree.needsWater) needsWater = true;
                if (tree.readyToHarvest) readyToHarvest = true;
            }
        }

        // Show/hide buttons
        if (waterBtn) {
            waterBtn.classList.toggle('hidden', !needsWater);
        }
        if (harvestBtn) {
            harvestBtn.classList.toggle('hidden', !readyToHarvest);
        }
    }

    waterAll() {
        // Water all plants that need water
        for (let row = 0; row < this.game.garden.rows; row++) {
            for (let col = 0; col < this.game.garden.cols; col++) {
                const cell = this.game.garden.getCell(row, col);
                if (cell.needsWater) {
                    this.game.garden.water(row, col, this.game.gameTime);
                    this.game.awardXP(LEVEL_SYSTEM.xpRewards.waterPlant, 'waterPlant');
                }
            }
        }

        // Water fruit trees too
        if (this.game.fruitGarden) {
            for (let i = 0; i < this.game.fruitGarden.slots; i++) {
                const tree = this.game.fruitGarden.getTree(i);
                if (tree.needsWater) {
                    this.game.fruitGarden.waterTree(i, this.game.gameTime);
                    this.game.awardXP(LEVEL_SYSTEM.xpRewards.waterPlant, 'waterPlant');
                }
            }
        }

        this.game.ui.renderGarden();
        this.game.ui.showToast('success', '💧', 'Watered All!', 'All plants have been watered');
        this.updateFloatingButtons();
        this.game.save();
    }

    harvestAll() {
        let totalHarvested = 0;

        // Harvest all ready vegetables
        for (let row = 0; row < this.game.garden.rows; row++) {
            for (let col = 0; col < this.game.garden.cols; col++) {
                const cell = this.game.garden.getCell(row, col);
                if (cell.readyToHarvest) {
                    const result = this.game.garden.harvest(row, col);
                    if (result) {
                        this.game.player.addHarvest(result.plantType, result.yield);
                        this.game.awardXP(LEVEL_SYSTEM.xpRewards.harvest, 'harvest');
                        totalHarvested += result.yield;
                    }
                }
            }
        }

        // Harvest all ready fruits
        if (this.game.fruitGarden) {
            for (let i = 0; i < this.game.fruitGarden.slots; i++) {
                const tree = this.game.fruitGarden.getTree(i);
                if (tree.readyToHarvest) {
                    const result = this.game.fruitGarden.harvestFruit(i, this.game.gameTime);
                    if (result) {
                        this.game.player.addFruitHarvest(result.fruitType, result.yield);
                        this.game.awardXP(LEVEL_SYSTEM.xpRewards.harvest, 'harvest');
                        totalHarvested += result.yield;
                    }
                }
            }
        }

        if (totalHarvested > 0) {
            this.game.ui.updateAll();
            this.game.ui.renderGarden();
            this.game.ui.showToast('success', '🧺', 'Harvested All!', `Collected ${totalHarvested} items`);
            this.game.save();
        }

        this.updateFloatingButtons();
    }

    // Tab Navigation
    switchTab(tab) {
        // Update tab bar active state
        document.querySelectorAll('.tab-item').forEach(item => {
            item.classList.toggle('active', item.dataset.tab === tab);
        });

        this.currentScreen = tab;

        switch (tab) {
            case 'garden':
                this.game.showGarden();
                break;
            case 'shop':
                this.game.showShop();
                break;
            case 'inventory':
                this.showInventory();
                break;
            case 'upgrades':
                this.game.showUpgrades();
                break;
        }
    }

    showInventory() {
        // Show inventory/silo screen
        const title = document.getElementById('bottom-sheet-title');
        const body = document.getElementById('bottom-sheet-body');
        title.textContent = 'Your Inventory';

        const cropIcons = {
            tomato: '🍅', lettuce: '🥬', carrot: '🥕', corn: '🌽', potato: '🥔',
            apple: '🍎', orange: '🍊', banana: '🍌', pear: '🍐'
        };

        let html = '<div class="inventory-sections">';

        // Seeds section
        html += '<div class="inventory-section"><h4>🌱 Seeds</h4><div class="inventory-grid">';
        for (const [key, count] of Object.entries(this.game.player.inventory.seeds)) {
            if (count > 0) {
                html += `
                    <div class="inventory-item">
                        <span class="item-icon">${cropIcons[key]}</span>
                        <span class="item-count">x${count}</span>
                    </div>
                `;
            }
        }
        html += '</div></div>';

        // Harvested vegetables
        html += '<div class="inventory-section"><h4>🥕 Vegetables</h4><div class="inventory-grid">';
        for (const [key, count] of Object.entries(this.game.player.inventory.harvested)) {
            if (count > 0) {
                const sellPrice = PLANTS[key]?.sellPrice || 0;
                html += `
                    <div class="inventory-item">
                        <span class="item-icon">${cropIcons[key]}</span>
                        <span class="item-count">x${count}</span>
                        <span class="item-price">$${sellPrice}</span>
                    </div>
                `;
            }
        }
        html += '</div></div>';

        // Harvested fruits (if orchard unlocked)
        if (this.game.player.upgrades.premiumOrchard) {
            html += '<div class="inventory-section"><h4>🍎 Fruits</h4><div class="inventory-grid">';
            for (const [key, count] of Object.entries(this.game.player.inventory.harvestedFruits)) {
                if (count > 0) {
                    const sellPrice = FRUITS[key]?.sellPrice || 0;
                    html += `
                        <div class="inventory-item">
                            <span class="item-icon">${cropIcons[key]}</span>
                            <span class="item-count">x${count}</span>
                            <span class="item-price">$${sellPrice}</span>
                        </div>
                    `;
                }
            }
            html += '</div></div>';
        }

        html += '</div>';

        // Quick sell button
        html += `
            <div class="inventory-actions">
                <button class="sell-all-btn" onclick="game.mobileUI.quickSellAll()">
                    💰 Quick Sell All
                </button>
            </div>
        `;

        body.innerHTML = html;
        this.showBottomSheet();
    }

    quickSellAll() {
        let totalEarned = 0;
        let itemsSold = 0;

        // Sell all vegetables
        for (const [key, count] of Object.entries(this.game.player.inventory.harvested)) {
            if (count > 0) {
                const plant = PLANTS[key];
                const earnings = count * plant.sellPrice;
                totalEarned += earnings;
                itemsSold += count;
                this.game.player.sellHarvest(key, count);
                this.game.awardXP(count * LEVEL_SYSTEM.xpRewards.sellItem, 'sell');
            }
        }

        // Sell all fruits
        if (this.game.player.upgrades.premiumOrchard) {
            for (const [key, count] of Object.entries(this.game.player.inventory.harvestedFruits)) {
                if (count > 0) {
                    const fruit = FRUITS[key];
                    const earnings = count * fruit.sellPrice;
                    totalEarned += earnings;
                    itemsSold += count;
                    this.game.player.sellFruit(key, count);
                    this.game.awardXP(count * LEVEL_SYSTEM.xpRewards.sellItem, 'sell');
                }
            }
        }

        if (totalEarned > 0) {
            this.game.player.addMoney(totalEarned);
            this.game.ui.updateAll();
            this.game.ui.showToast('success', '💰', 'Sold All!', `Earned $${totalEarned} from ${itemsSold} items`);
            this.game.save();
            this.hideBottomSheet();
        } else {
            this.game.ui.showToast('info', '📦', 'Nothing to Sell', 'Your harvest basket is empty');
        }
    }

    showSettings() {
        const title = document.getElementById('bottom-sheet-title');
        const body = document.getElementById('bottom-sheet-body');
        title.textContent = 'Settings';

        body.innerHTML = `
            <div class="settings-list">
                <button class="settings-item" onclick="game.resetGame()">
                    <span>🔄</span>
                    <span>Reset Game</span>
                </button>
                <button class="settings-item" onclick="game.mobileUI.hideBottomSheet()">
                    <span>❌</span>
                    <span>Close</span>
                </button>
            </div>
        `;

        this.showBottomSheet();
    }

    showPlantInfo(cell, plant) {
        const title = document.getElementById('bottom-sheet-title');
        const body = document.getElementById('bottom-sheet-body');
        title.textContent = plant.name;

        const cropIcons = {
            tomato: '🍅', lettuce: '🥬', carrot: '🥕', corn: '🌽', potato: '🥔'
        };

        const progress = ((cell.growthStage + 1) / plant.stages * 100).toFixed(0);
        const timeLeft = this.calculateTimeLeft(cell, plant);

        body.innerHTML = `
            <div class="plant-info-mobile">
                <div class="plant-info-icon">${cropIcons[cell.plantType]}</div>
                <div class="plant-info-stats">
                    <div class="stat-row">
                        <span>Growth:</span>
                        <span>${progress}%</span>
                    </div>
                    <div class="stat-row">
                        <span>Time left:</span>
                        <span>${timeLeft}</span>
                    </div>
                    <div class="stat-row">
                        <span>Sell price:</span>
                        <span>$${plant.sellPrice}</span>
                    </div>
                </div>
            </div>
        `;

        this.showBottomSheet();
        this.hideContextMenu();
    }

    calculateTimeLeft(cell, plant) {
        const elapsed = this.game.gameTime - cell.plantedAt;
        const growthTime = plant.growthTime / (this.game.player.upgrades.fasterGrowth || 1);
        const remaining = Math.max(0, growthTime - elapsed);

        if (remaining === 0) return 'Ready!';

        const minutes = Math.floor(remaining / 60);
        const seconds = remaining % 60;
        return `${minutes}m ${seconds}s`;
    }

    showFruitContextMenu(slot) {
        const tree = this.game.fruitGarden.getTree(slot);
        if (!tree) return;

        const actions = this.getFruitTreeActions(tree, slot);
        if (actions.length === 0) return;

        this.renderFruitContextMenu(actions, slot);
    }

    getFruitTreeActions(tree, slot) {
        const actions = [];

        if (tree.status === 'empty') {
            actions.push({
                icon: '🌳',
                label: 'Plant Tree',
                action: () => {
                    this.hideContextMenu();
                    this.showFruitSeedSelector(slot);
                }
            });
        } else if (tree.needsWater) {
            actions.push({
                icon: '💧',
                label: 'Water',
                action: () => {
                    this.game.fruitGarden.waterTree(slot, this.game.gameTime);
                    this.game.ui.renderFruitGarden();
                    this.game.awardXP(LEVEL_SYSTEM.xpRewards.waterPlant, 'waterPlant');
                    this.hideContextMenu();
                }
            });
        } else if (tree.readyToHarvest) {
            actions.push({
                icon: '🧺',
                label: 'Harvest',
                action: () => {
                    const result = this.game.fruitGarden.harvestFruit(slot, this.game.gameTime);
                    if (result) {
                        this.game.player.addFruitHarvest(result.fruitType, result.yield);
                        this.game.awardXP(LEVEL_SYSTEM.xpRewards.harvest, 'harvest');
                        this.game.ui.updateAll();
                        this.game.ui.renderFruitGarden();
                        this.game.save();
                    }
                    this.hideContextMenu();
                }
            });
        } else if (tree.status === 'dead') {
            actions.push({
                icon: '🗑️',
                label: 'Remove',
                action: () => {
                    this.game.fruitGarden.trees[slot] = this.game.fruitGarden.createEmptyTree();
                    this.game.ui.renderFruitGarden();
                    this.hideContextMenu();
                }
            });
        }

        return actions;
    }

    renderFruitContextMenu(actions, slot) {
        const actionsContainer = document.getElementById('context-actions');
        actionsContainer.innerHTML = '';

        actions.forEach(action => {
            const btn = document.createElement('button');
            btn.className = 'context-action-btn';
            btn.innerHTML = `
                <span class="action-icon">${action.icon}</span>
                <span class="action-label">${action.label}</span>
            `;
            btn.onclick = action.action;
            actionsContainer.appendChild(btn);
        });

        this.contextMenu.classList.remove('hidden');
    }

    showFruitSeedSelector(slot) {
        const body = document.getElementById('bottom-sheet-body');
        const title = document.getElementById('bottom-sheet-title');
        title.textContent = 'Select Fruit Tree';

        const unlockedFruits = this.game.player.getUnlockedFruits();

        const fruitIcons = {
            apple: '🍎',
            orange: '🍊',
            banana: '🍌',
            pear: '🍐'
        };

        let html = '<div class="seed-grid">';

        for (const key of unlockedFruits) {
            const fruit = FRUITS[key];
            const count = this.game.player.inventory.fruitSeeds[key] || 0;
            const disabled = count === 0 ? 'disabled' : '';

            html += `
                <button class="seed-card ${disabled}" ${disabled} onclick="game.mobileUI.plantFruitTree('${key}', ${slot})">
                    <span class="seed-card-icon">${fruitIcons[key]}</span>
                    <span class="seed-card-name">${fruit.name}</span>
                    <span class="seed-card-count">x${count}</span>
                </button>
            `;
        }

        html += '</div>';
        body.innerHTML = html;

        this.showBottomSheet();
    }

    plantFruitTree(fruitType, slot) {
        if (this.game.player.useFruitSeed(fruitType)) {
            this.game.fruitGarden.plantTree(slot, fruitType, this.game.gameTime);
            this.game.awardXP(LEVEL_SYSTEM.xpRewards.plant, 'plant');
            this.game.ui.updateAll();
            this.game.ui.renderFruitGarden();
            this.game.save();
        }
        this.hideBottomSheet();
    }

    // Mobile-specific UI updates
    updateMobileUI() {
        if (!this.isMobile) return;

        // Update header displays
        const levelNum = document.getElementById('mobile-level-number');
        const xpBar = document.getElementById('mobile-xp-bar');
        const moneyDisplay = document.getElementById('mobile-money-display');
        const harvestedCount = document.getElementById('mobile-harvested-count');
        const seasonIcon = document.getElementById('mobile-season-icon');

        if (levelNum) levelNum.textContent = this.game.player.level;
        if (moneyDisplay) moneyDisplay.textContent = this.game.player.money;

        if (xpBar) {
            const progress = this.game.player.getXPProgress();
            xpBar.style.width = `${progress.percentage}%`;
        }

        if (harvestedCount) {
            let total = 0;
            for (const count of Object.values(this.game.player.inventory.harvested)) {
                total += count;
            }
            if (this.game.player.upgrades.premiumOrchard) {
                for (const count of Object.values(this.game.player.inventory.harvestedFruits)) {
                    total += count;
                }
            }
            harvestedCount.textContent = total;
        }

        if (seasonIcon) {
            const season = SEASONS[this.game.currentSeason];
            seasonIcon.textContent = season.icon;
        }

        // Update floating buttons
        this.updateFloatingButtons();
    }

    handleOrientationChange() {
        // Adjust UI for orientation change
        setTimeout(() => {
            this.convertToMobileGrid();
        }, 100);
    }

    handleResize() {
        // Check if still mobile after resize
        const wasMobile = this.isMobile;
        this.isMobile = this.detectMobile();

        if (wasMobile !== this.isMobile) {
            if (this.isMobile) {
                document.body.classList.add('mobile-mode');
            } else {
                document.body.classList.remove('mobile-mode');
                // Restore desktop layout
                location.reload();
            }
        }
    }
}

// Export for use in game
window.MobileUI = MobileUI;
