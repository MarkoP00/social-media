export default{
    baseLink: 'https://api.apiforge.net/v1/api',

    get: async function(endPoint){
       const response = await fetch(this.baseLink + endPoint, {
            method: 'GET',
            headers: headers(),
        })
        if(response.ok){
            const responseData = await response.json();
            return responseData
        }else{
            console.log('error');
        }
    },
    post: async function(endPoint, body){
        const response = await fetch (this.baseLink + endPoint ,{
            method: 'POST',
            headers: headers(),
            body: JSON.stringify(body)
        })
        if(response.ok){
            const responseData = await response.json();
            return responseData
        }else{
            console.log('error');
        }
    },
    patch: async function(endPoint, body){
        const response = await fetch (this.baseLink + endPoint, {
            method: 'PATCH',
            headers: headers(),
            body: JSON.stringify(body)
        })
        if(response.ok){
            const responseData = await response.json();
            return responseData
        }else{
            console.log('error');
        }
    },
    delete: async function(endPoint){
        const response = await fetch(this.baseLink + endPoint, {
            method: 'DELETE',
            headers: headers()
        })
        if(response.ok){
            const responseData = await response.json();
            return responseData
        }else{
            console.log('error');
        }
    }

    }

function headers(){
    const api_key = '65fb08b9df7bc89ef3a6f520';
    const token = localStorage.getItem('token');

    return{
            'Content-Type': 'application/json',
            'api_key': api_key,
            'authorization': `Bearer ${token}`
    }
}