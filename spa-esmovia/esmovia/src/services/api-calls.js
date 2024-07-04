const root = "https://dummyjson.com/"

export async function LoginMe (credentials) {

    let rawData = await fetch(`${root}auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          
          username: credentials.name,
          password: credentials.password,
          expiresInMins: 30, 
        })
      })
      
    let data = await rawData.json()
    return data;
}