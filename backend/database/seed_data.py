import asyncio
from mongodb import threats_collection, iot_devices_collection

async def seed_database():
    await threats_collection.delete_many({})
    await iot_devices_collection.delete_many({})

    # Seed Enterprise Cloud Asset
    device = {
        "device_id": "GATEWAY-PROD-01",
        "type": "API_Gateway",
        "firmware_version": "v1.4.2 (Zero-Trust)",
        "status": "online",
        "location": "AWS-Mumbai-Region"
    }
    await iot_devices_collection.insert_one(device)

    threats = [
        {
            "timestamp": "2026-03-17T10:00:00Z",
            "source_ip": "192.168.1.105",
            "event_type": "sql_injection_attempt",
            "log_data": "Multiple failed SQLi payloads detected hitting the main authentication endpoint.",
            "severity": "critical"
        },
        {
            "timestamp": "2026-03-17T10:05:00Z",
            "source_ip": "10.0.0.50",
            "event_type": "ddos_anomaly",
            "log_data": "Traffic spike of 400% above baseline. Suspected Layer 7 DDoS attack.",
            "severity": "high"
        }
    ]
    await threats_collection.insert_many(threats)
    print("✅ Database successfully seeded with Enterprise Cloud threats!")

if __name__ == "__main__":
    asyncio.run(seed_database())