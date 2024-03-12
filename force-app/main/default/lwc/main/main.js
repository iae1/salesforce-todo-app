import { LightningElement, track, wire } from 'lwc';
import getProdUrl from '@salesforce/apex/TodoAPIController.getProdUrl';

export default class Main extends LightningElement {
    @track todos = [];
    newTodo = '';
    @track apiUrl;

    @wire(getProdUrl)
    wiredUrl({ error, data }) {
        if (data) {
            this.apiUrl = data;
            this.fetchTodos()
        } else if (error) {
            console.error('Error retrieving API URL:', error);
        }
    }

    connectedCallback() {
        this.fetchTodos();
    }

    fetchTodos = async () => {
        if (this.apiUrl) {
            try {
                const res = await fetch(`${this.apiUrl}/todos`)
                const todos = await res.json()
                this.todos = todos
                console.log('this.todos', this.todos)
            } catch (error) {
                console.error(error)
            }  
        } else {
            console.log('this.apiUrl is not available')
        }
    }

    handleInputChange(event) {
        this.newTodo = event.target.value;
    }

    addTodo() {
        console.log('this.apiUrl', this.apiUrl)
        fetch(`${this.apiUrl}/todos`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: this.newTodo, completed: false})
        })
        .then(() => {
            this.fetchTodos()
        })
        .catch((err) => {
            console.error(err)
        })
    }

    updateTodoStatus(event) {
        const todoId = event.target.dataset.id
        const todoTitle = event.target.dataset.title
        const isCompleted = event.target.checked
        
        fetch(`${this.apiUrl}/todos/${todoId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: todoId, completed: isCompleted, title: todoTitle})
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not OK')
            }
            this.fetchTodos()
        })
        .catch((err) => {
            console.error(err)
        })
    }

    deleteTodo(event) {
        const todoId = event.target.dataset.id

        fetch(`${this.apiUrl}/todos/${todoId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: todoId})
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not OK')
            }

            this.fetchTodos()
        })
        .catch((err) => {
            console.error(err)
        })
    }
}