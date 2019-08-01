# pubnub-airport

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