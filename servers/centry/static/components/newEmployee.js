Vue.use(VueFormulate)

var newworker = Vue.component('newworker',{
    template: `<div>
        <label for="my-modal-5" class="btn modal-button btn-primary">Add Worker</label>

        <input type="checkbox" id="my-modal-5" class="modal-toggle" />
        <div class="modal">
        <div class="modal-box w-11/12 max-w-5xl">
            <h3 class="font-bold text-lg">Hire New Employee</h3>
            <p class="text-red-500 text-xs font-semibold my-2 mx-5" v-if="err">{{err}}</p>
           <div class="flex flex-row w-full mx-5">
           <div class="flex flex-col w-1/3">
                <p class="text-lg text-center bg-gray-300 rounded py-2">Personal Details</p>
                <div class="form-control w-full max-w-xs">
                <label class="label"><span class="label-text">What is your name?</span></label>
                <input type="text" placeholder="Full name" class="input input-bordered w-full max-w-xs" v-model="worker.name"/>
                <label class="label"><span class="label-text-alt">{{err}}</span></label>

                <label class="label"><span class="label-text">What are you known as?</span></label>
                <input type="text" placeholder="Otherwise called" class="input input-bordered w-full max-w-xs" v-model="worker.oc"/>
                <label class="label"><span class="label-text-alt">{{err}}</span></label>

                <label class="label"><span class="label-text">What is your occupation?</span></label>
                <input type="text" placeholder="Occupation" class="input input-bordered w-full max-w-xs" v-model="worker.occupation"/>
                <label class="label"><span class="label-text-alt">{{err}}</span></label>

                <label class="label"><span class="label-text">What is your date of birth?</span></label>
                <input type="date" placeholder="Date of Birth" class="input input-bordered w-full max-w-xs" v-model="worker.dob"/>
                <label class="label"><span class="label-text-alt">{{err}}</span></label>


                <p class="text-lg text-center bg-gray-300 rounded py-2">Contact Details</p>
                <label class="label"><span class="label-text">What is your Telephone number?</span></label>
                <input type="text" placeholder="Tel." class="input input-bordered w-full max-w-xs" v-model="worker.contact.tel"/>
                <label class="label"><span class="label-text-alt">{{err}}</span></label>

                <label class="label"><span class="label-text">What is your Mobile number?</span></label>
                <input type="text" placeholder="Mobile" class="input input-bordered w-full max-w-xs" v-model="worker.contact.mobile"/>
                <label class="label"><span class="label-text-alt">{{err}}</span></label>

                <label class="label"><span class="label-text">What is your email address?</span></label>
                <input type="text" placeholder="Email" class="input input-bordered w-full max-w-xs" v-model="worker.contact.email"/>
                <label class="label"><span class="label-text-alt">{{err}}</span></label>
                
                </div>

            </div>

            <div class="flex flex-col w-1/3 mx-5">
                <p class="text-lg text-center bg-gray-300 rounded py-2">Address Details</p>
                <div class="form-control w-full max-w-xs">
                <label class="label"><span class="label-text">Where do you live? your Lot number</span></label>
                <input type="text" placeholder="Lot" class="input input-bordered w-full max-w-xs" v-model="worker.address.lot"/>
                <label class="label"><span class="label-text-alt">{{err}}</span></label>

                <label class="label"><span class="label-text">What Street do you live on?</span></label>
                <input type="text" placeholder="Street" class="input input-bordered w-full max-w-xs" v-model="worker.address.street"/>
                <label class="label"><span class="label-text-alt">{{err}}</span></label>

                <label class="label"><span class="label-text">What is the name of your Town or District?</span></label>
                <input type="text" placeholder="Town" class="input input-bordered w-full max-w-xs" v-model="worker.address.town"/>
                <label class="label"><span class="label-text-alt">{{err}}</span></label>

                <label class="label"><span class="label-text">Which Parish do you reside in ?</span></label>
                <input type="text" placeholder="Parish" class="input input-bordered w-full max-w-xs" v-model="worker.address.parish"/>
                <label class="label"><span class="label-text-alt">{{err}}</span></label>

                <p class="text-lg text-center bg-gray-300 rounded py-2">Next of Kin Details</p>
                <label class="label"><span class="label-text">What is your relative name?</span></label>
                <input type="text" placeholder="Next of Kin Full name" class="input input-bordered w-full max-w-xs" v-model="worker.nok.name"/>
                <label class="label"><span class="label-text-alt">{{err}}</span></label>

                <label class="label"><span class="label-text">How are you related to this person?</span></label>
                <input type="text" placeholder="Relation" class="input input-bordered w-full max-w-xs" v-model="worker.nok.relation"/>
                <label class="label"><span class="label-text-alt">{{err}}</span></label>


                <label class="label"><span class="label-text">What is your relative's address?</span></label>
                <input type="text" placeholder="Relative's Address" class="input input-bordered w-full max-w-xs" v-model="worker.nok.address"/>
                <label class="label"><span class="label-text-alt">{{err}}</span></label>

                <label class="label"><span class="label-text">What is your relative's Telephone number?</span></label>
                <input type="text" placeholder="Relative's Telephone " class="input input-bordered w-full max-w-xs" v-model="worker.nok.tel"/>
                <label class="label"><span class="label-text-alt">{{err}}</span></label>

                <label class="label"><span class="label-text">What is your relative's Mobile number?</span></label>
                <input type="text" placeholder="Relative's Mobile" class="input input-bordered w-full max-w-xs" v-model="worker.nok.mobile"/>
                <label class="label"><span class="label-text-alt">{{err}}</span></label>


                </div>
            </div>

            <div class="flex flex-col w-1/3 mx-5">
            <p class="text-lg text-center bg-gray-300 rounded py-2">Banking Information</p>
            <div class="form-control w-full max-w-xs">
            <label class="label"><span class="label-text">What is the name of your Bank?</span></label>
            <input type="text" placeholder="Bank Name" class="input input-bordered w-full max-w-xs" v-model="worker.account.bank.name"/>
            <label class="label"><span class="label-text-alt">{{err}}</span></label>

            <label class="label"><span class="label-text">Where is the Branch?</span></label>
            <input type="text" placeholder="Branch" class="input input-bordered w-full max-w-xs" v-model="worker.account.bank.branch"/>
            <label class="label"><span class="label-text-alt">{{err}}</span></label>

            <label class="label"><span class="label-text">What is the account number?</span></label>
            <input type="text" placeholder="Account No." class="input input-bordered w-full max-w-xs" v-model="worker.account.bank.account"/>
            <label class="label"><span class="label-text-alt">{{err}}</span></label>
            </div>
        </div>
       
            </div>

            <button class="btn btn-primary" @click="submitHandler">Submit</button>
            <pre>{{worker}}</pre>
            <section class="text-xs">{{result}}</section>
            <div class="modal-action">
            <label for="my-modal-5" class="btn">Exit </label>
            </div>
        </div>
        </div>
    </div>`,
    
    data()  { return {
        err: null,
        worker: {
            address: {
                lot: "",
                street: "",
                town: "",
                parish: "",
                country: "Jamaica"
            },            
            contact: {
                tel: "",
                mobile: "",
                email: ""
            },
            nok: {
                name: "",
                relation: "",
                address: "",
                tel: "",
                mobile: ""
            },
            tasks: [],
            days: [],
            account: {
                bank: {
                  name: "",
                  branch: "",
                  account: ""
                },
                payments: [],
                totals_payments: [],
                total: 0,
                loans:[]
            },
            state: {
                active: true,
                terminated: false,
                onleave: false,
                quit: false
              },
              event: {
                employed: 0,
                terminated: 0,
                leave: 0,
                quited: 0
              },
            reports: []
              
        },
        result: {}
        
    }
    },
    methods: {
        submitHandler(){
            var url = '/newworker'
            axios.post(url, this.worker)
            .then(response => {
                this.result = response.data
            })
            .catch(error => {
                this.err = error.message
            })
        }
    }
})


var app = new Vue({
    el: '#employeeindex',
    components: {newworker},
    delimiters: ['<%', '%>'],
    
    data: {
        message: 'Hello New Workers'
    },
    methods: {
        setDate(arg) {
            return new Date(arg).toDateString()
        }
    }
})