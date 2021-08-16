import axios from "axios";

const state = {
	todos: [],
};

const getters = {
	allTodos: (state) => state.todos,
};

const actions = {
	async fetchTodos({ commit }) {
		const response = await axios.get(
			"https://jsonplaceholder.typicode.com/todos"
		);
		// console.log(response.data)
		commit("setTodos", response.data);
	},
	async addTodo({ commit }, title) {
		const response = await axios.post(
			"https://jsonplaceholder.typicode.com/todos",
			{ title, completed: false }
		);

		commit("newTodo", response.data);
	},
	async deleteTodo({ commit }, id) {
		await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

		commit("removeTodo", id);
	},
	async filterTodos({ commit }, limit) {
		const response = await axios.get(
			`https://jsonplaceholder.typicode.com/todos/?_limit=${limit}`
		);

		commit("setTodos", response.data);
	},
	async updateTodoCompleted({ commit }, todo) {
		const response = await axios.put(
			`https://jsonplaceholder.typicode.com/todos/${todo.id}`,
			{ ...todo, completed: !todo.completed }
		);

		commit("updateTodo", response.data);
	},
};

const mutations = {
	setTodos: (state, todos) => (state.todos = todos),
	newTodo: (state, todo) => {
		state.todos = [todo, ...state.todos];
	},
	removeTodo: (state, id) => {
		state.todos = state.todos.filter((todo) => todo.id !== id);
	},
	updateTodo: (state, todo) => {
		state.todos = state.todos.map((item) => {
			if (item.id === todo.id) {
				item.completed = todo.completed;
			}
			return item;
		});
	},
};

export default {
	state,
	getters,
	actions,
	mutations,
};
