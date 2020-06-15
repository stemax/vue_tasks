<template>
    <div class="row">
        <div class="input-field col s6 offset-s3">
            <div v-if="task">
                <h3>{{task.title}}</h3>

                <form @submit.prevent="submitHandler">
                    <div class="input-field">
                        <div class="chips disabled" ref="chips"></div>
                    </div>
                    <div class="input-field">
                        <textarea v-model="description" id="description" class="materialize-textarea"></textarea>
                        <label for="description">Description</label>
                        <span class="character-counter"
                              style="float: right; font-size: 12px;">{{description.length}}/2048</span>
                    </div>
                    <div class="input-field">
                        <input type="text" ref="datepicker" class="datepicker"/>
                    </div>
                    <div v-if="task.status !== 'completed'">
                        <button class="btn" type="submit" style="margin-right: 1rem;">Update</button>
                        <button class="btn blue" type="button" @click="completeTask">Complete</button>
                    </div>
                </form>
            </div>
            <p v-else>Task not found</p>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            task() {
                console.log(typeof this.$route.params.id)
                console.log(this.$route.params.id)
                return this.$store.getters.taskById(+this.$route.params.id)
            }
        },
        data: () => ({
                description: '',
                tags: null,
                date: null
            }
        ),
        mounted() {
            this.description = this.task.description

            this.tags = M.Chips.init(this.$refs.chips, {
                placeholder: 'Task tags',
                limit: 10,
                data: this.task.tags,
            });

            this.date = M.Datepicker.init(this.$refs.datepicker, {
                defaultDate: new Date(this.task.date),
                setDefaultDate: true,
                format: 'dd.mm.yyyy',
            });

            setTimeout(() => {
                M.updateTextFields()
            }, 0)
        },
        methods: {
            submitHandler() {
                this.$store.dispatch('updateTask', {
                    id: this.task.id,
                    description: this.description,
                    date: this.date.date
                })
                this.$router.push('/list')
            },
            completeTask() {
                this.$store.dispatch('completeTask', this.task.id)
                this.$router.push('/list')
            }
        },
        destroyed() {
            if (this.date || this.date.destroy) {
                this.date.destroy();
            }
            if (this.tags || this.tags.destroy) {
                this.tags.destroy();
            }
        }
    }
</script>

<style scoped>

</style>
