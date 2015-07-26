/**
 *
 * First point for the app
 * Initialize Global components and creates a game
 *
 */

import Prefixer from './util/Prefixer';

export default class App {

	init() {
		Prefixer.prefixAll();

		return this;
	}
}

export default App;
