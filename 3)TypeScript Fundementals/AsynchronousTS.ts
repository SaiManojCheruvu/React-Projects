interface Todo {
    userId?: number;
    id: number;
    title: string;
    completed: boolean;
}

async function fetchTodos(): Promise<Todo[]> {
    const response: Response = await fetch('https://jsonplaceholder.typicode.com/todos');

    if (!response.ok) {
        throw new Error('Failed to fetch todos');
    }

    const todos: Todo[] = await response.json();
    return todos;
}

async function main(): Promise<void> {
    try {
        const todos: Todo[] = await fetchTodos();
        console.log('Todos fetched: ', todos);
    } catch (error: any) {
        console.error('Error fetching todos:', error);
    }
}

main();
