<script>
    import axios from 'axios';

    export default {
        name: "account-transaction",
        props:{
            account: {Object},
            id: {String}
        },
        data() {return {
        project: "",
        
        transaction:{
            id: null,
            date: null, 
            type:"",            
            amount: null, 
            ref: ""
        },
        result: {},
        err: null
    }},
    methods:{
        submit(){
            axios.post(`${this.http}transaction/${this.id}`, this.transaction)
            .then(result => {
                this.result = result.data
            })
            .catch(error => {
                this.err = error.message
            })
            window.location.reload()
        }
    }
    }

</script>
<template>
    <!-- The button to open modal -->
    <label for="acc-trans" class="badge modal-button">Transaction</label>

    <!-- Put this part before </body> tag -->
    <input type="checkbox" id="acc-trans" class="modal-toggle" />
    <label for="acc-trans" class="modal cursor-pointer">
    <label class="modal-box relative" for="">


        <p class="text-lg text-center bg-gray-300 rounded py-2">{{id}}/Transaction Details</p>
      <div class="form-control w-full max-w-xs">
      <label class="label"><span class="label-text">Date</span></label>
      <input type="date" placeholder="Date" class="input input-bordered w-full max-w-xs" v-model="transaction.date"/>
      <label class="label"><span class="label-text-alt">{{err}}</span></label>

      <label class="label"><span class="label-text">Transaction Type</span></label>
      <select class="select w-full max-w-xs" v-model="transaction.type">
          <option disabled selected></option>
          <option>Deposit</option>
          <option>Withdraw</option>
         
          </select>
      

      <label class="label"><span class="label-text">Amount</span></label>
      <input type="number" step="0.01" placeholder="Amount" class="input input-bordered w-full max-w-xs" v-model.number="transaction.amount"/>
      <label class="label"><span class="label-text-alt">{{err}}</span></label>

      <section v-if="transaction.type === 'Deposit'">
          <label class="label"><span class="label-text">Payee</span></label>
          <input type="text" placeholder="Payee" class="input input-bordered w-full max-w-xs" v-model="transaction.payee"/>
          <label class="label"><span class="label-text-alt">{{err}}</span></label>
      
      </section>
      <section v-if="transaction.type === 'Withdraw'">
          <label class="label"><span class="label-text">Recipient</span></label>
          <input type="text" placeholder="Recipient" class="input input-bordered w-full max-w-xs" v-model="transaction.recipient"/>
          <label class="label"><span class="label-text-alt">{{err}}</span></label>
      
      </section>
      <label class="label"><span class="label-text">Refference</span></label>
      <input type="text" placeholder="Refference" class="input input-bordered w-full max-w-xs" v-model="transaction.ref"/>
      <label class="label"><span class="label-text-alt">{{err}}</span></label>
      <button class="btn btn-primary" @click="submit">Submit</button>
      </div>


       
    </label>
    </label>
</template>