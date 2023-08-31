const BASE_URL = "http://localhost:8080";

export const fetchCreatedTodos = (title) => {
    return fetch(`${BASE_URL}/todo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title:title, completed: false }),
      }).then((res) => res.json())
}

export const fetchTodos = () => {
    return fetch(`${BASE_URL}/todo`)
        .then((res) => res.json())
}

export const fetchUpdatedTodo = (id) => {
    return fetch(`${BASE_URL}/todo/${id}`, { method: 'PUT' })
        .then((res) => res.json())
}

export const fetchDeletedTodo = (id) => {
    return fetch(`${BASE_URL}/todo/${id}`, { method: 'DELETE' })
        .then((res) => res.json())
}



