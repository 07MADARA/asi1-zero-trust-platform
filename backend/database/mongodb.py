import urllib.parse
from motor.motor_asyncio import AsyncIOMotorClient

# Safely encode the username and password to handle special characters
username = urllib.parse.quote_plus("sivakukkuluri82")
password = urllib.parse.quote_plus("Siva5003@") # I'm assuming the @ is part of your password!

# The properly formatted MongoDB connection string
MONGO_URL = f"mongodb+srv://{username}:{password}@cluster0.fmzbynr.mongodb.net/?appName=Cluster0"

client = AsyncIOMotorClient(MONGO_URL)

db = client.threat_intelligence
threats_collection = db.get_collection("threats")
iot_devices_collection = db.get_collection("cloud_assets")