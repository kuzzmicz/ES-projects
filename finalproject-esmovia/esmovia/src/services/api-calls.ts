import { Answer, FetchTodo } from "../interfaces"
async function bringTodo () : Promise<Answer> {

    try {
        const response : any = await fetch(`https://jsonplaceholder.typicode.com/todos`)

        const data: FetchTodo[] = await response.json()

        const answer : Answer = {
            success: true,
            data: data,
            message: "Everything is cool"
        }

        return answer

    } catch (error: any) {
        const answer : Answer = {
            success: true,
            data: [],
            message: error
        }
        return answer 
    }

}

export default bringTodo;