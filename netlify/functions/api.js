// In-memory storage implementation for Netlify function
class MemStorage {
  constructor() {
    this.applications = new Map();
    this.files = new Map();
    this.currentId = 1;
  }

  async createRentalApplication(insertApplication) {
    const application = {
      id: this.currentId++,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...insertApplication
    };
    
    this.applications.set(application.id, application);
    return application;
  }

  async getRentalApplication(id) {
    return this.applications.get(id);
  }

  async updateRentalApplication(id, updates) {
    const existing = this.applications.get(id);
    if (!existing) return undefined;
    
    const updated = {
      ...existing,
      ...updates,
      updatedAt: new Date()
    };
    
    this.applications.set(id, updated);
    return updated;
  }

  async getAllRentalApplications() {
    return Array.from(this.applications.values());
  }

  async storeFile(filename, content) {
    this.files.set(filename, content);
    return filename;
  }

  async getFile(filename) {
    return this.files.get(filename);
  }
}

// Create storage instance for serverless function
const storage = new MemStorage();

export const handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    const { httpMethod, path, body } = event;
    const parsedBody = body ? JSON.parse(body) : null;

    // Route handling
    if (httpMethod === 'POST' && path.endsWith('/rental-applications')) {
      const application = await storage.createRentalApplication(parsedBody);
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(application)
      };
    }

    if (httpMethod === 'GET' && path.includes('/rental-applications/')) {
      const id = parseInt(path.split('/').pop());
      const application = await storage.getRentalApplication(id);
      
      if (!application) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Application not found' })
        };
      }
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(application)
      };
    }

    if (httpMethod === 'GET' && path.endsWith('/rental-applications')) {
      const applications = await storage.getAllRentalApplications();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(applications)
      };
    }

    // Route not found
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Route not found' })
    };

  } catch (error) {
    console.error('Netlify function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};