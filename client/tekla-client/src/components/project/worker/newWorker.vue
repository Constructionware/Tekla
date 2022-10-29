<script>
    import axios from 'axios';

    export default {
        name: "new-worker",
        props: {
            id: {String, default: null}
        },
        data(){ 
            return{
                error: null,            
                worker: {
                    name: "",                    
                    oc: "",
                    sex:"Male",
                    dob: 0,
                    identity: "",
                    id_type: "",
                    occupation: "",
                    height:0,
                    imgurl: "",
                    contact: {
                        email: "",
                        tel: "",
                        mobile: ""
                    },
                    address: {
                        lot:"", street:"", town:"", city_parish:""
                    },
                    nok: {
                        name: "",
                        relation: "",
                        contact: {
                            email: "", tel: "", mobile: ""
                        },
                        address: {
                            lot:"", street:"", town:"", city_parish:""
                        }
                    },
                    tasks: [],
                    account: {
                        bank: {
                        name: "",
                        branch: "",
                        account: 0
                        },
                        payments: [],
                        loans:[],
                        totals_payments: [],
                        total: 0                                        
                    },
                    days: [],
                    state: {
                        active: false,
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
                project: {},
                parishes: [
                            'St. Andrew',
                            'St. Ann',
                            'St. Catherine',
                            'St. Elizabeth',
                            'St. Mary',
                            'St. James',
                            'St. Thomas',
                            'Clarendon',
                            'Kingston',
                            'Hanover',
                            'Manchester',
                            'Trelawney',
                            'Westmoreland',
                            'Portland',
                ],

                
            }},
            methods: {
                cancelSubmit(){
                    this.worker = {}
                   // window.location.reload()
                },
                getProject(){
                    const self = this
                    axios.get(`${this.http}jsonproject/${self.id}`)
                    .then(res => {
                        self.project = res.data
                        self.alert = {'message': `Project ${self.id} was loaded successfully to your Desktop.`, 'status': 'success'}
                    })
                    .catch(err => {
                        self.alert = {'message': err.message, 'status': 'error'}
                    })
                },
                addNewWorker() {
                    /* saves employee data to workers central storage */
                    const self = this
                    self.worker.event.employed = Date.parse(new Date())
                    
                    axios.post(`${this.http}newworker`, self.worker)
                    .then(res => {
                        // on accept
                        if(res.status == 200){                        
                        self.worker = res.data
                        }                       

                    }).catch(err => {
                        self.error = err.message
                    })
                },
                addNewProjectWorker(){
                    const self = this;                    
                    var projectWorker = [
                        {
                            _id: self.worker._id,
                            key: self.worker._id,
                            value: {
                                name: self.worker.name,
                                oc: self.worker.oc,
                                occupation: self.worker.occupation,
                                added: Date.parse(new Date())
                            }
                        },
                    ]
                    axios.post(`${this.http}addworker/${self.id}`, projectWorker)
                    .then(res => {
                        if(res.status == 200 ){
                            console.log(res.data)
                        }                        
                    })
                    .catch(err => {
                        self.error = err.message
                    })                                   

                },

                submitHandler(){
                    const self = this;
                    self.addNewWorker()
                    if(self.id){
                        setTimeout(() => {
                            self.addNewProjectWorker()
                        }, 500);
                    }else{ window.location.reload()}
                    setTimeout(() => {
                        window.location.reload()
                    }, 1500);
                   
                   
                },
                setState(){
                    if(this.id){
                        return "bg-green-400 py-2 px-2 rounded-md"
                    }else{ return "bg-blue-300 py-2 px-2 rounded-md"}
                },
                printForm() {
                   
                    printJS({ 
                        printable: 'employment-form', 
                        type: 'html',
                        targetStyles: ['*'],
                        footer: `PrintJS - Print Form With Customized Header`
                    });

                
                    
                }
            }
    }

</script>
<template>
    <p class="text-red-600 font-semibold my-3 mx-5" v-if="error">{{error}}</p>
    <!-- The button to open modal -->
    <label for="new-worker" class="badge modal-button">Employ</label>

    <!-- Put this part before </body> tag -->
    <input type="checkbox" id="new-worker" class="modal-toggle" />
    <label for="new-worker" class="modal cursor-pointer">
    <label class="modal-box relative" for="new-worker">
        <p :class="setState()">NEW EMPLOYEE/{{id}}</p>
       <div id="employment-form" class="w-full items-center">
       
                    <div class="divider">Identity</div>
                    <div class="flex flex-row py-5 w-full ">
                     <div class="flex flex-col mx-5 w-1/2">
                    <FormKit
                        type="text"
                        label="Name"
                        v-model="worker.name"
                        prefix-icon="avatarMan"                       
                        help="Enter Worker Full Name"
                        validation="required|name"
                        validation-visibility="live"
                    />
                    
                    <FormKit
                        id="sex"
                        v-model="worker.sex"
                        type="select"
                        label="Sex"
                        placeholder="Select Sex"
                        :options="{
                            male: 'Male',
                            female: 'Female',
                            other: 'Other'
                        }"
                        />
                        <FormKit
                        type="text"
                        label="Identity"
                        v-model="worker.identity"
                        prefix-icon="fileImage"                       
                        help="Identification "
                        
                    />
                    <FormKit
                        type="text"
                        label="Height"
                        v-model="worker.height"
                        prefix-icon="tools"                       
                        help="Height"
                        
                    />
                    
                

            </div>
            <div class="flex flex-col mx-5 w-1/2">
                <FormKit
                        type="text"
                        label="Also known as"
                        v-model="worker.oc"
                        prefix-icon="avatarMan"                       
                        help="Alias or Pet name"
                        
                    />
                    <FormKit
                        type="date"
                        label="Date Of Birth"
                        v-model="worker.dob"
                        prefix-icon="date"                       
                        help="Date of Birth"
                        validation="required|DOB"
                        validation-visibility="live"
                    />
                    <FormKit
                        id="id"
                        v-model="worker.id_type"
                        type="select"
                        label="Id Type"
                        placeholder="Select Id Type"
                        :options="{
                            drivers_lic: 'Drivers Lic.',
                            passport: 'Passport',
                            national: 'National'
                        }"
                        />
                   
                    <FormKit
                        id="occupation"
                        v-model="worker.occupation"
                        type="select"
                        label="Occupation"
                        placeholder="Select Occupation"
                        :options="{
                            labourer: 'Labourer',
                            carpenter: 'Carpenter',
                            joiner: 'Joiner',
                            mason: 'Mason',
                            plumber: 'Plumber',
                            electrician: 'Electrician',
                            steelman: 'Steelman',
                            watchman: 'Watchman',
                            supervisor: 'Supervisor',
                            foreman: 'Foreman',
                            sub: 'Sub Contractor',

                        }"
                        />
                    
            </div>
        </div>
   
        <div class="divider">Address</div>       
            <div class="flex flex-row py-5">
                     <div class="flex flex-col mx-5 w-1/2">                   
                    <FormKit
                        type="text"
                        label="Lot"
                        v-model="worker.address.lot"
                        help="Address Lot"                        
                    />
                    <FormKit
                        type="text"
                        label="Town"
                        v-model="worker.address.town"
                        help="Town Name"                        
                    />            
                </div>
            <div class="flex flex-col mx-5 w-1/2">
                <FormKit
                        type="text"
                        label="Street"
                        v-model="worker.address.street"
                                          
                        help="Street Name"
                        
                    />
                    <FormKit
                        id="parish"
                        v-model="worker.address.city_parish"
                        type="select"
                        label="Parish"
                        placeholder="Select Parish"
                        :options="parishes"
                        />
            </div>
        </div>
        <div class="divider">Contact</div>
        <div class="flex flex-row py-5">
            <FormKit
                type="text"
                label="Email"
                v-model="worker.contact.email"
                prefix-icon="email"                       
                help="Email Address"                        
            />
            <FormKit
                type="text"
                label="Mobile"
                v-model="worker.contact.mobile"
                prefix-icon="telephone"                       
                help="Mobile"                        
            />
            <FormKit
                type="text"
                label="Tel."
                v-model="worker.contact.tel"
                prefix-icon="telephone"                       
                help="Telephone"                        
            />

        </div>
        <div class="divider">Banking</div>
        <div class="flex flex-row py-5">
            <FormKit
                type="text"
                label="Bank Name"
                v-model="worker.account.bank.name"
                prefix-icon="usdc"                       
                                        
            />
            <FormKit
                type="text"
                label="Branch"
                v-model="worker.account.bank.branch"
                                       
            />
            <FormKit
                type="text"
                label="Account No."
                v-model="worker.account.bank.account"
                                   
                help="Account No."                        
            />

        </div>
        <div class="divider">Next Of kin</div>
        <div class="flex flex-row py-5">
            <FormKit
                type="text"
                label="Kin Name"
                v-model="worker.nok.name"
                                
                help="Family Member Full Name"                        
            />
            <FormKit
                type="text"
                label="Relation"
                v-model="worker.nok.relation"                                     
                help="How are you related"                        
            />
            
        </div>
        <div class="divider text-yellow-600">Next Of kin Contact Info</div>
        <div class="flex flex-row py-5">
            <FormKit
                type="text"
                label="Email"
                v-model="worker.nok.contact.email"
                prefix-icon="email"                       
                help="Email Address"                        
            />
            <FormKit
                type="text"
                label="Mobile"
                v-model="worker.nok.contact.mobile"
                prefix-icon="telephone"                       
                help="Mobile"                        
            />
            <FormKit
                type="text"
                label="Tel."
                v-model="worker.nok.contact.tel"
                prefix-icon="telephone"                       
                help="Telephone"                        
            />

        </div>
        <div class="divider text-yellow-600">Next Of kin Address</div>
        <div class="flex flex-row py-5">
                     <div class="flex flex-col mx-5 w-1/2">                   
                    <FormKit
                        type="text"
                        label="Lot"
                        v-model="worker.nok.address.lot"
                        help="Address Lot"                        
                    />
                    <FormKit
                        type="text"
                        label="Town"
                        v-model="worker.nok.address.town"
                        help="Town Name"                        
                    />            
                </div>
            <div class="flex flex-col mx-5 w-1/2">
                <FormKit
                        type="text"
                        label="Street"
                        v-model="worker.nok.address.street"
                                             
                        help="Street Name"
                        
                    />
                    <FormKit
                        id="parish"
                        v-model="worker.nok.address.city_parish"
                        type="select"
                        label="Parish"
                        placeholder="Select Parish"
                        :options="parishes"
                        />
            </div>
        </div>
        
    </div>
        <div class="flex flex-row py-5">
            <button class="btn btn-primary" @click="submitHandler">Submit</button>
            <button class="btn mx-5" @click="printForm">Print</button>
            <button class="btn mx-5" @click="cancelSubmit">Cancel</button>
            </div>
            <ul class="bg-indigo-100 mx-5 my-2 text-xs">
                <li v-for="val, key of worker">{{key}} {{val}}</li>
            </ul>
    </label>
    </label>


</template>