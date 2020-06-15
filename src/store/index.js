import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        tasks: JSON.parse(localStorage.getItem('tasks') || '[]')
    },
    mutations: {
        createTask(state, task) {
            state.tasks.push(task)
            localStorage.setItem('tasks', JSON.stringify(state.tasks))
        },
        updateTask(state, {id, description, date}) {
            const tasks = state.tasks.concat()

            const idx = tasks.findIndex(task => task.id === id)
            const task = tasks[idx]

            const status = new Date(date) > new Date() ? 'active' : 'outdated'

            tasks[idx] = {...task, date, description, status}

            state.tasks = tasks
            localStorage.setItem('tasks', JSON.stringify(state.tasks))
        },
        completeTask(state, id) {
            const idx = state.tasks.findIndex(task => task.id === id)

            state.tasks[idx].status = 'completed'
            localStorage.setItem('tasks', JSON.stringify(state.tasks))
        }
    },
    actions: {
        createTask({commit}, task) {
            commit('createTask', task)
        },
        updateTask({commit}, task) {
            commit('updateTask', task)
        },
        completeTask({commit}, id) {
            commit('completeTask', id)
        }
    },
    getters: {
        tasks: store => store.tasks,
        taskById: store => id => store.tasks.find(task => task.id === id),
    }
})
