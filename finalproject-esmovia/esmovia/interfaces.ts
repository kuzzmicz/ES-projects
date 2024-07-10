export interface Answer  {
    success: boolean,
    data: FetchTodo[],
    message: string
}

export interface FetchTodo {
    userId: number,
    id: number,
    title: "string",
    completed: boolean
}