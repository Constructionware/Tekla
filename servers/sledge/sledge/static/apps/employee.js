Vue.use(VueFormulate)

var paysal = Vue.component('paysalary',{
    template: `<div>
    <p class="flex flex-row h-10 mx-5 spacing-5">
        <formulate-input label="Project Id" type="text" v-model="project" class="border border-1-gray-500 rounded"></formulate-input>
        <formulate-input label="Paybill Id" type="text" v-model="paybill" class="border border-1-gray-500 rounded"></formulate-input>
    
    </p>
    <formulate-form v-model="pay" @submit="submitPay">
    
    <formulate-input label="Description" type="text" name="description"></formulate-input>
    <formulate-input label="Amount" type="number" name="amount"></formulate-input>
    <formulate-input label="Date" type="date" name="date"></formulate-input>
    
    </formulate-form>
    <button class="btn btn-primary" @click="submitPay">Submit</button>
    <pre>{{pay}}</pre>
    <section class="text-xs">{{result}}</section>
    </div>`,
    props:['id'],
    data() {return {
        project: "",
        paybill: "",
        pay:{},
        result: {}
    }},
    methods:{
        submitPay(){
            var url = `/payworker/${this.id}`
            this.pay.date = Date.parse(new Date(this.pay.date))
            this.pay.ref = `${this.project}-${this.paybill}`
            axios.post(url, this.pay)
            .then(result => {
                this.result = result.data
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
})

var app = new Vue({
    el: '#eapp',
    components: {paysal},
    delimiters: ['<%', '%>'],
    
    data: {
        message: 'Hello Workers'
    },
    methods: {
        setDate(arg) {
            return new Date(arg).toDateString()
        }

    }
})