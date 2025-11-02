# 🐛 Debug Instructions - Harvest Bug

## Issue
When harvesting vegetables, they don't get added to the inventory count.

## Fixes Applied

### 1. Tool Icons ✅
- Changed from CSS art to simple emoji icons
- Hoe: 🔨
- Water: 💧

### 2. Harvest Bug Debug ✅
Added extensive logging to track the harvest process:
- `🎯` markers for main game flow
- `🌾` markers for harvest operations
- Full inventory dumps after each harvest

## Testing Instructions

### Step 1: Clear Browser Cache
**IMPORTANT**: You must force-refresh to load the new code!

- **Chrome/Edge**: Press `Ctrl + Shift + R` or `Ctrl + F5`
- **Firefox**: Press `Ctrl + Shift + R`
- **Safari**: Press `Cmd + Option + R`

### Step 2: Open Developer Console
Press `F12` or right-click → "Inspect" → "Console" tab

### Step 3: Test Harvest
1. Start the game
2. Plant a tomato (you start with 3 seeds)
3. Water it when it needs water (red border)
4. Wait for it to grow (🌱 → 🪴 → 🍅)
5. When it has a golden glow, click to harvest

### Step 4: Check Console Logs
You should see detailed logs like:
```
🎯 harvestPlant called for tile [0,0]
🌾 Garden.harvest - cell at [0,0]: {status: 'growing', plantType: 'tomato', ...}
🌾 Plant ready! Type: tomato, Yield: 2
🌾 Harvested 2 tomato from [0,0]
🎯 Garden.harvest result: {plantType: 'tomato', yield: 2}
🎯 Calling player.addHarvest(tomato, 2)
🌾 addHarvest called: type=tomato, amount=2
🌾 Harvested 2 tomato. Old total: 0, New total: 2
🌾 Full harvested inventory: {tomato: 2, lettuce: 0, ...}
✅ Harvested 2 tomato!
```

## Expected Behavior

### Seeds Inventory
- **Before planting**: 3 tomato seeds
- **After planting 1**: 2 tomato seeds ✅
- Seeds decrease when planting ✅

### Harvested Inventory
- **Before harvest**: 0 tomatoes harvested
- **After harvest**: 2 tomatoes harvested ✅ (tomato yield is 2)
- **After second harvest**: 4 tomatoes harvested ✅

## What to Report

If the bug still happens, please share:
1. Screenshot of the console logs
2. What inventory counts you see
3. What inventory counts you expected

## Code Changes

### game-bundle.js
- Line 212-221: Enhanced `addHarvest()` with logging
- Line 358-376: Enhanced `Garden.harvest()` with logging
- Line 1168-1189: Enhanced `Game.harvestPlant()` with logging

### index.html
- Line 60-66: Changed tool icons to emoji
- Line 153: Added version query parameter to force cache refresh

## Notes

The harvest logic is correct in the code:
1. ✅ `Garden.harvest()` returns `{plantType, yield}`
2. ✅ `Game.harvestPlant()` calls `player.addHarvest()`
3. ✅ `Player.addHarvest()` increments inventory

If the bug persists, it's likely a browser caching issue. Try:
- Hard refresh (Ctrl+Shift+R)
- Clear browser cache completely
- Try in incognito/private mode
- Try a different browser
