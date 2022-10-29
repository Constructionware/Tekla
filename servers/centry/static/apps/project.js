
var transaction = Vue.component('projectransaction',{
    template: `<div>
    <p class="flex flex-row h-10 mx-5 spacing-5">
       
    </p>
    <div class="flex flex-col w-1/3">
                <p class="text-lg text-center bg-gray-300 rounded py-2">Transaction Details</p>
                <div class="form-control w-full max-w-xs">
                <label class="label"><span class="label-text">Date</span></label>
                <input type="date" placeholder="Date" class="input input-bordered w-full max-w-xs" v-model="transaction.date"/>
                <label class="label"><span class="label-text-alt">{{err}}</span></label>

                <label class="label"><span class="label-text">What are you known as?</span></label>
                <input type="text" placeholder="Otherwise called" class="input input-bordered w-full max-w-xs" v-model="transaction.type"/>
                <label class="label"><span class="label-text-alt">{{err}}</span></label>

                <label class="label"><span class="label-text">Amount</span></label>
                <input type="number" placeholder="Amount" class="input input-bordered w-full max-w-xs" v-model.number="transaction.amount"/>
                <label class="label"><span class="label-text-alt">{{err}}</span></label>

                <section v-if="transaction.type === 'deposit'">
                    <label class="label"><span class="label-text">Payee</span></label>
                    <input type="text" placeholder="Payee" class="input input-bordered w-full max-w-xs" v-model="transaction.payee"/>
                    <label class="label"><span class="label-text-alt">{{err}}</span></label>
                
                </section>
                <section v-else>
                    <label class="label"><span class="label-text">Recipient</span></label>
                    <input type="text" placeholder="Recipient" class="input input-bordered w-full max-w-xs" v-model="transaction.recipient"/>
                    <label class="label"><span class="label-text-alt">{{err}}</span></label>
                
                </section>
                <label class="label"><span class="label-text">Refference</span></label>
                <input type="text" placeholder="Refference" class="input input-bordered w-full max-w-xs" v-model="transaction.ref"/>
                <label class="label"><span class="label-text-alt">{{err}}</span></label>
    </div>
    <button class="btn btn-primary" @click="submit">Submit</button>
    
    </div>`,
    
    props:['id'],
    data() {return {
        project: "",
        handler: "",
        transaction:{
            id: null,
            date: null, 
            type:"",            
            amount: 0, 
            ref: ""
        },
        result: {},
        err: null
    }},
    methods:{
        submit(){
            var url = `/transaction/${this.id}`
            this.transaction.date = Date.parse(new Date(this.transaction.date))
            
            axios.post(url, this.transaction)
            .then(result => {
                this.result = result.data
            })
            .catch(error => {
                this.err = error.message
            })
        }
    }
})

var papp = new Vue({
    el: '#ptapp',
    delimiters: ['<%', '%>'],
    components: {
        transaction,
    },
    data() { return {
        message: 'Hello Vue Accounts!'

    }
    }
})
