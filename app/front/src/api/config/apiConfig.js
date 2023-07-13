
const apiConfig={
    baseUrl: 'http://back.groupe7.hetic-projects.arcplex.tech/api',
    timeout: 50000000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
}

const apiConfigNotToken={
    baseUrl: 'http://back.groupe7.hetic-projects.arcplex.tech/api',
    timeout: 50000000,
    headers: {
        'Content-Type': 'application/json',
    }
}

export {apiConfig, apiConfigNotToken};