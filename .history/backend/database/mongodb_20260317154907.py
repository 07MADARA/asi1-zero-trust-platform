from motor.motor_asyncio import AsyncIOMotorClient

# Hardcoding the local fallback to prevent InvalidURI errors during the hackathon
MONGO_URL = "mongodb+srv://sivakukkuluri82:Siva5003@:@cluster0.fmzbynr.mongodb.net/?appName=Cluster0"
client = AsyncIOMotorClient(MONGO_URL)

db = client.threat_intelligence
threats_collection = db.get_collection("threats")
iot_devices_collection = db.get_collection("cloud_assets") # Changed from IoT