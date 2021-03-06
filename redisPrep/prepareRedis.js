const getRedisFunctions = require("./createRedis");
const redis = require('redis');
const env = process.env;

async function prepareRedis() {
    const redisAddr = env.REDIS_HOST || "redis";
	const redisClient = redis.createClient({host: redisAddr,
                                            port: 6379,
                                            string_numbers: true,
                                            password: null});
	const redisFunctions = await getRedisFunctions(redisClient);
    const {redisExists, redisSet, redisGet} = redisFunctions
    // const exists = await redisExists("ctr")
    // if (!exists) {
    await redisSet("ctr", "4294967295"); // 4294967296 - 1
    // }
    const startingCounter = await redisGet("ctr")
    console.log("Starting from " + startingCounter)
	redisClient.quit();
	console.log("Done")
}

prepareRedis().then();