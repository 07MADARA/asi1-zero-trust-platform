import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const threatService = {
    analyzeThreat: (logData) => api.post('/analyze-threat', logData),
    getStats: () => api.get('/threat-stats'),
    generateReport: (threats) => api.post('/generate-report', threats)
};

export const iotService = {
    scanVulnerability: (data) => api.post('/vulnerability-scan', data)
};