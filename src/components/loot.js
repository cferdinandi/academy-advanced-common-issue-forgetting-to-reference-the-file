import TreasureChest from './treasure-chest.js';


// Hold the treasure instance
let treasure;

/**
 * Create new treasure instance
 * @return {Constructor} A new TreasureChest instance
 */
function createTreasure () {

	// Get any saved loot from localStorage
	let savedLoot = JSON.parse(localStorage.getItem('ss-treasure'));

	// Create new Treasure Chest instance
	treasure = new TreasureChest(savedLoot);

}

/**
 * Display the amount of loot in the UI
 */
function showLoot () {
	let loot = document.querySelector('#loot');
	if (!loot) return;
	loot.textContent = treasure.getLoot();
}

/**
 * Save loot to localStorage and update the UI
 * @param  {Event} event The event object
 */
function saveLoot (event) {

	// Create the treasure object
	let treasure = {
		gold: event.detail.getGold(),
		silver: event.detail.getSilver(),
		bronze: event.detail.getBronze()
	};

	// Save it to localStorage
	localStorage.setItem('ss-treasure', JSON.stringify(treasure));

	// Update the UI
	showLoot(event.detail);

}

/**
 * Handle treasure submit events
 * @param  {Event} event The event object
 */
function submitHandler (event) {

	// Get the coin type
	// Only run on [data-treasure] forms
	let coin = event.target.getAttribute('data-treasure');
	if (!coin) return;

	// Stop the form from reloading the page
	event.preventDefault();

	// Get coin value
	let val = parseFloat(event.target.querySelector('[type="number"]').value);
	if (!val) return;

	// Add the correct loot
	if (coin === 'gold') {
		treasure.addGold(val);
	} else if (coin === 'silver') {
		treasure.addSilver(val);
	} else if (coin === 'bronze') {
		treasure.addBronze(val);
	}

}

/**
 * Listen for loot events
 * @param  {Constructor} treasure The TreasureChest object
 */
function lootListeners () {
	document.addEventListener('submit', submitHandler);
	document.addEventListener('treasure:gold', saveLoot);
	document.addEventListener('treasure:silver', saveLoot);
	document.addEventListener('treasure:bronze', saveLoot);
}


export {createTreasure, showLoot, lootListeners};