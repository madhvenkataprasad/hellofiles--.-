/**
 * Shared API utility for making HTTP requests.
 * Centralizes fetch logic, error handling, and response parsing.
 */
const Api = {
  baseUrl: 'http://localhost:3000',

  async post(endpoint, data) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  },

  async get(endpoint) {
    const response = await fetch(`${this.baseUrl}${endpoint}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }
};
