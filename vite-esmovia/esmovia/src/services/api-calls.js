const root = "https://rickandmortyapi.com/api/";
export const bringData = async (criteria) => {


    let rawData = await fetch(`${root + criteria}`)
    let results = await rawData.json()
    return results;
}