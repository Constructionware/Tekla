<script>
    import axios from 'axios'
    export default {
        name: "workersIndex",
        data(){
            return{
                employeeIndex: [],
                eids: [],
            }
        },
        mounted(){
            setTimeout(() => {
                this.loadWorkers()
            }, 60);    
        },
        methods: {
            loadWorkers (){
                const self = this;
                axios.get(`${self.http}workers`)
                .then(res => {
                    self.employeeIndex = res.data.data.rows           
                })
            }

        }
}

</script>
<template>
    <p class="h-12 bg-gray-400 text-lg font-bold relative">Registered Employees
        <span class="badge badge-primary my-2 absolute right-1">{{employeeIndex.length}}</span>
    </p>   
    <ul class="my-5 h-96 overflow-y-auto">

        <li class="h-12 w-full border-b border-gray-400 cursor-pointer relative" v-for="element of employeeIndex" @click="$emit('getworker', element.id)">
            <span>{{ element.id }} {{element.value.name}}/ {{element.value.oc}}</span>
            <span class="badge badge-primary my-2 absolute right-1">{{element.value.occupation}}</span>
        </li>
    </ul>

</template>