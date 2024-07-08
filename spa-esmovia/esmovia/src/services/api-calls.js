const root = "https://dummyjson.com/";
const root2 = "https://api.themoviedb.org/3/";
const movie_api_key = "210d6a5dd3f16419ce349c9f1b200d6d";

export async function LoginMe(credentials) {
  let rawData = await fetch(`${root}auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: credentials.name,
      password: credentials.password,
      expiresInMins: 30, // optional, defaults to 60
    }),
  });

  let data = await rawData.json();
  return data;
}

export async function bringMovies() {
  let rawData = await fetch(
    `${root2}movie/top_rated?api_key=210d6a5dd3f16419ce349c9f1b200d6d&language=en-US&page=1`
  );

  let movieData = await rawData.json();

  return movieData;
}

export async function searchMovieCriteria(criteria) {
  let rawData = await fetch(
    `${root2}search/movie?api_key=${movie_api_key}&language=en-US&query=${criteria}&page=1&include_adult=false`
  );

  let movieData = await rawData.json();

  return movieData;
}