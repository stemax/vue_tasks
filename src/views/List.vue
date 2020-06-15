<template>
    <div>
        <h1>List</h1>

        <hr/>
        <table v-if="tasks.length">
            <thead>
            <th>#</th>
            <th>Title</th>
            <th>Date</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
            </thead>
            <tbody>
            <tr v-for="(task,idx) of tasks" :key="task.id">
                <td>{{idx +1}}</td>
                <td>{{task.title}}</td>
                <td>{{ new Date(task.date).toLocaleDateString()}}</td>
                <td style="max-width: 400px">
                    <div class="description-text">{{task.description}}</div>
                </td>
                <td>{{task.status}}</td>
                <td>
                    <router-link tag="button" class="btn btn-small" :to="'/task/' + task.id">Open</router-link>
                </td>
            </tr>
            </tbody>
        </table>
        <p v-else>No tasks</p>
    </div>
</template>

<script>
    export default {
        name: "List",
        computed: {
            tasks() {
                return this.$store.getters.tasks
            }
        }
    }
</script>

<style scoped>
    .description-text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
