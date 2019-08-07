# pubnub-airport

Prerequisites
	Node
   npm install pubnub


Airfield
 - Settings
 	- Difficulty = Plane generation frequency = PGen
 	- Announce frequency = AF
 	- Tick frequency = T
 - Every PGen, spawn a plane
 - Every AF
 	- Calulate plane position
 	- Publish status of planes
 - On receive of commands update plane info

Both
 - Supported commands
 	- Continue straight (Extend your downwind I'll call your base -> <Plane> Continuing downwind)
 	- Enter traffic pattern (Enter left base for runway -> <Plane> Traffic in sight)
 	- Leave airspace (Remain outside class delta -> <Plane> Keeping distance / <Plane> Negative, low on fuel)
 	- Cleared to land - only when in final stage of traffic pattern (Cleared to land -> <Plane> Rodger, cleared to land)

ATC
 - Define map, draw grass, runway, traffic pattern, landing clearance zone
 - On receive of plane position, update plane states for redraw
 	- Position, heading, fuel, name
 - Tap on plane to show/hide valid commands and chat
 - Clicking on command publishes message (contacting plane whilst waiting or show outmessage?)

Features to add/consider
 - Collision / Airfield shutdown
 - Score
 - Multi ATC support
 - Multi Airfield support
 
 
 
 
 t's finally happened: nearly 4 years after the import keyword was introduced in ES6, Node.js introduced experimental support for ES6 imports and exports. In Node.js 12, you can use import and export in your project if you do both of the below items.
 
 1) Add the --experimental-modules flag when running Node.js
 
 2) Use the .mjs extension or set "type": "module" in your package.json.