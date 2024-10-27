import axios from 'axios'

class AvaguardService {
    private baseURL: string
    private timeout: number

    constructor(baseURL: string, timeout = 5000) {
        this.baseURL = baseURL
        this.timeout = timeout
    }

    public async get<T>(endpoint: string): Promise<T> {
        return this.request('GET', endpoint)
    }

    public async post(endpoint: string, data: any): Promise<any> {
        return this.request('POST', endpoint, data)
    }

    public async put(endpoint: string, data: any): Promise<any> {
        return this.request('PUT', endpoint, data)
    }

    public async delete(endpoint: string): Promise<any> {
        return this.request('DELETE', endpoint)
    }

    private async request(method: 'GET' | 'POST' | 'PUT' | 'DELETE', endpoint: string, data?: any): Promise<any> {
        try {
            const response = await axios({
                method,
                url: `${this.baseURL}${endpoint}`,
                data,
                timeout: this.timeout,
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            return response.data
        } catch (error) {
            return this.handleError(error)
        }
    }

    private handleError(error: any): { error: string } {
        return { error: error.message }
    }
}

const avaguardService = new AvaguardService('http://localhost:3500')

export {
    avaguardService
}
