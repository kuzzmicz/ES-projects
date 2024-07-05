const root = "https://dummyjson.com/"
const movie_api_key = "210d6a5dd3f16419ce349c9f1b200d6d"


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

export async function bringMovies () {

  let rawData = await fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=210d6a5dd3f16419ce349c9f1b200d6d&language=en-US&page=1")

  let movieData = await rawData.json()

  return movieData

}