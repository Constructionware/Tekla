<script>
    import axios from 'axios';

    export default {
        name: 'log-service',
        props: {
            tool: Object
        },
        data(){return {
            sv: {
                timestamp: Date.parse(new Date()),
                
            },
            url: 'http://centryplan-012/'
        }},
        methods:{
            submitHandler(){
                this.tool.service.push(this.sv)
                var payload = {
                    _id: this.tool._id,
                    service: this.tool.service
                }                
                axios.put(`${this.http}updatetool`, payload)

            }
        }
    }


</script>
<template>
   <!-- The button to open modal -->
<label for="service-log" class="btn modal-button btn-xs">Log Service</label>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="service-log" class="modal-toggle" />
<label for="service-log" class="modal cursor-pointer">
  <label class="modal-box relative" for="">
    <h3 class="text-lg font-bold">{{tool.name}}/Service Log</h3>
                <FormKit type="form" v-model="sv" @submit="submitHandler">
                <div class="flex flex-row">                
                <FormKit type="text" label="Serviceman Name" name="service_man" />
                <FormKit type="date" label="Service Date" name="service_date" />  
                
            </div>
            <FormKit type="textarea" label="Description" name="description" />
            
        </FormKit>
       

        <p class="text-xs">{{sv}}</p>
  </label>
</label>


  
</template>