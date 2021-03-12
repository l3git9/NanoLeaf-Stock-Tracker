const NanoLeaf = require('./libs/nanoLeaf');
let nanoLeaf = new NanoLeaf();
let scraper = require('./libs/webScrape')



nanoLeaf.turnOnOffLights(true);
scraper()
process.on('SIGINT', () => nanoLeaf.turnOnOffLights(false))
process.on('exit', () => nanoLeaf.turnOnOffLights(false))
process.on('uncaughtException', () => nanoLeaf.turnOnOffLights(false))

