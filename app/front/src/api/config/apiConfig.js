
const apiConfig={
    baseUrl: 'http://localhost:1234/api',
    timeout: 50000000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
}

const apiConfigNotToken={
    baseUrl: 'http://localhost:1234/api',
    timeout: 50000000,
    headers: {
        'Content-Type': 'application/json',
    }
}

export {apiConfig, apiConfigNotToken};