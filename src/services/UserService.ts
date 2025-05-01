import axios from 'axios';

const BASE_API_URL = 'http://localhost:8080/';

const API = axios.create({
    baseURL: BASE_API_URL
});

export default class UserService {
    static async uploadLogs(file: File): Promise<any> {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await API.post('/log-users', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    }

    static async getSuperUsers(): Promise<any> {
        try {
            const response = await API.get('/superusers');
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }
}
