const handleExecute = async (threatId, ipAddress) => {
    try {
        const response = await fetch('http://localhost:8000/api/remediate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ threat_id: threatId, ip_address: ipAddress })
        });
        
        const result = await response.json();
        
        if (result.status === 'success') {
            alert(result.message); 
        }
    } catch (error) {
        console.error("Execution failed:", error);
    }
};
<button onClick={() => handleExecute(threat.id, threat.ip)}>
    Approve & Execute
</button>