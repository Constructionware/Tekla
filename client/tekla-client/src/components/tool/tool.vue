<script>
    import axios from 'axios';
    import LogHire from './logHire.vue';
    
    import LogService from './logService.vue'


    export default {
    name: "etool",
    props: {
        tool: Object
    },
    data() {
        return {
            err: null,
            update: null,            
            show: {
                runtime: true
            }
        };
    },
    methods: {
        updateRuntime() {
            
            var payload = {
                _id: this.tool._id,
                runtime: this.tool.runtime
            };
            axios.put(`${this.http}updatetool`, payload)
                .then(res => { this.update = res.data; })
                .catch(error => {
                this.err = error.message;
            });
            this.show.runtime = true;
        }
    },
    components: { LogHire, LogService }
}
</script>
<template>
        <p class="text-red-400 font-fine mx-5" v-if="err">{{err}}</p>
        <p class="text-green-300 font-fine mx-5" v-if="update">{{update}}</p>
        <section class="my-5">
            <div class="card card-side bg-base-100 shadow-xl">
            <figure class="w-64"><img :src="tool.meta_data.img_url" alt="tool" /></figure>
            <div class="card-body">
                <h2 class="card-title">{{tool.name}}</h2>
                <section class="flex flex-row mx-2">
                    <p class="w-1/2 flex flex-col">
                      <span> Model. {{tool.model}} Serial.{{tool.serial}} </span>
                      <span> Brand. {{tool.brand}} Power.{{tool.power}}</span>
                    </p>
                <p class="w-1/2">
                    <span class="flex flex-row" >
                    runtime
                    <span  v-if="show.runtime">
                         <span class="mx-2 cursor-pointer " @dblclick="show.runtime=false">{{tool.runtime.value}}</span> 
                        </span>
                       
                        <span class="flex flex-row mx-2" v-else> 
                            <span class="w-32">
                            <FormKit type="number" v-model.number="tool.runtime.value" />
                            </span>
                            <button class="btn btn-primary btn-sm mx-2" @click="updateRuntime">update runtime</button>

                        </span>
                         {{tool.runtime.unit}}
                      
                    </span>    
                        </p>
                </section>
                <div class="card-actions justify-end">
                    <button class="btn btn-secondary">Brand</button>
                </div>
            </div>
            </div>
        </section>
        <section class="my-5 bg-gray-200 rounded-md shadow-lg">
          <p class="flex flex-row h-12 "><span class="mx-5">Hireage</span> <LogHire :tool="tool" /> </p>
         
          <div class="overflow-x-auto">
            <table class="table w-full">
            <thead>
                <tr>
                    <th>Customer</th>
                    <th>Terms</th>
                    <th>Hire Date</th>
                    <th>Return Date</th>
                    <th>Out Condition</th>
                    <th>Return Condition</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item of tool.hireage">
                    <td>{{item.customer_name}}</td>
                    <td class="mx-2">{{item.terms}}</td>
                    <td>{{item.hire_date}}</td>
                    <td>{{item.return_date}}</td>
                    <td>{{item.state_out}}</td>
                    <td>{{item.state_returned}}</td>
                </tr>
            </tbody>
           </table>
           </div>
        </section>
        <section class="my-5 bg-gray-200 rounded-md shadow-lg">
          <p class="flex flex-row h-12 bg-gray-200"><span class="mx-5">Service Log</span> <LogService :tool="tool" /></p>
          <div class="overflow-x-auto">
            <table class="table w-full">
            <thead>
                <tr>
                    <th>Service Date</th>
                    <th class="mx-2">Service Man</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item of tool.service">
                    <td>{{item.service_date}}</td>
                    <td class="mx-2">{{item.service_man}}</td>
                    <td>{{item.description}}</td>
                </tr>
            </tbody>
           </table>
           </div>
        
        </section>
        

    
</template>