/**
 * API Client for Pershop Backend
 * Centralized HTTP client for all API calls
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string = API_BASE_URL) {
        this.baseUrl = baseUrl;
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;

        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        return response.json();
    }

    // Shopper endpoints
    async getShoppers() {
        return this.request('/api/shoppers');
    }

    async getShopper(id: number) {
        return this.request(`/api/shoppers/${id}`);
    }

    // Dashboard endpoints
    async getClientDashboard() {
        return this.request('/api/dashboard/client');
    }

    async getShopperDashboard() {
        return this.request('/api/dashboard/shopper');
    }

    // Client pre-brief for shopper
    async getClientBrief(clientId: number) {
        return this.request(`/api/shopper/clients/${clientId}`);
    }

    // AI Matching
    async analyzeAndMatch(text: string) {
        return this.request('/api/analyze-and-match', {
            method: 'POST',
            body: JSON.stringify({ text }),
        });
    }
}

export const apiClient = new ApiClient();
