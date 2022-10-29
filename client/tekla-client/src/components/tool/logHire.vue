<script>
    import axios from 'axios';

    export default {
        name: 'log-hire',
        props: {
            tool: Object
        },

        data(){return {
            hv: {
                timestamp: Date.parse(new Date()),
            },
            url: 'http://centryplan-012/'
        }},
        methods:{
            submitHandler(){
                this.tool.hireage.push(this.hv)
                var payload = {
                    _id: this.tool._id,
                    hireage: this.tool.hireage
                }                
                axios.put(`${this.http}updatetool`, payload)

            }
        }
    }


</script>
<template><!-- The button to open modal -->
    <label for="hire-log" class="btn modal-button btn-xs">Log Hire</label>
    
    <!-- Put this part before </body> tag -->
    <input type="checkbox" id="hire-log" class="modal-toggle" />
    <label for="hire-log" class="modal cursor-pointer">
      <label class="modal-box relative" for="">
        <h3 class="text-lg font-bold">{{tool.name}}/Hire Log</h3>
       
            <FormKit type="form" v-model="hv" @submit="submitHandler">
                <div class="flex flex-row">                
                <FormKit type="text" label="Customer Name" name="customer_name" />
                <FormKit type="text" label="Terms" name="terms" />
                
            </div>
            <div class="flex flex-row">
                <FormKit type="date" label="Hire Date" name="hire_date" />               
                <FormKit type="date" label="Return Date" name="return_date" />               
            </div>
            <div class="flex flex-row">               
                <FormKit type="textarea" label="Out Condition" name="state_out" />
                <FormKit type="textarea" label="Return Condition" name="state_returned" />
            </div>
        </FormKit>
       

        <p class="text-xs">{{hv}}</p>

      </label>
     
      
    </label>
    
  
</template>