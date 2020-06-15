<template>
    <div class="row">
        <div class="input-field col s6 offset-s3">
            <h1>Create task</h1>
            <form @submit.prevent="submitHandler">
                <div class="input-field">
                    <input id="title" v-model="title" type="text" class="validate" required>
                    <label for="title">Title</label>
                    <span class="helper-text" data-error="Title is required"></span>
                </div>
                <div class="input-field">
                    <div class="chips" ref="chips"></div>
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
                <button class="btn" type="submit">Create Task</button>
            </form>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'create',
        data: () => ({
                description: '',
                title: '',
                tags: null,
                date: null
            }
        ),
        mounted() {
            this.tags = M.Chips.init(this.$refs.chips, {
                placeholder: 'Task tags',
                limit: 10
            });

            this.date = M.Datepicker.init(this.$refs.datepicker, {
                defaultDate: new Date(),
                setDefaultDate: true,
                format: 'dd.mm.yyyy'
            });
        },
        methods: {
            submitHandler() {
                const task = {
                    id: Date.now(),
                    title: this.title,
                    description: this.description,
                    status: 'active',
                    tags: this.tags.chipsData,
                    date: this.date.date
                }
                this.$store.dispatch('createTask', task)
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
