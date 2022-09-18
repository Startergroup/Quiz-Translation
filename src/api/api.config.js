export const baseURL = process.env.NODE_ENV === 'production' ? 'https://streamus.online' : 'http://localhost:8081'
export const apiVersion = 'v2'
export const wsBaseURL = process.env.NODE_ENV === 'production' ? 'wss://streamus.online' : 'ws://localhost:8081'
