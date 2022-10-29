<script>
import axios from 'axios';
import supplierRecord from './supplierRecord.vue'
export default {
    name: "newSupplier",
    data(){ return {
        error: null,
        title: "New Supplier Record",
        record: {
            name: null,
            account: {
                bank: {
                    branch: null,
                    name: null,                   
                    account: null
                },
                transactions: [{id: 'project-inv no.', ref:'invoice no.', date: null, amt: null},]
            },
            address: {
                lot: null,
                street: null,
                town: null,
                city_parish: null,
                country: "Jamaica"
            },
            contact: {
                tel: null,
                mobile: null,
                email: null
            },
            taxid: null
            

        },
        nameSchema: [
        {
            $formkit: 'text',
            name: 'name',
            label: 'Name',           
            validation: 'required|name',
            placeholder: "Supplier's name"
        },
        {
            $formkit: 'text',
            name: 'taxid',
            label: 'Tax Id.',
            
        }
       
        ],
        addressSchema:[
        {
            $formkit: 'text',
            name: 'lot',
            label: 'Lot',            
            placeholder: "Lot number"
        },
        {
            $formkit: 'text',
            name: 'street',
            label: 'Street',
            placeholder: "Street  name"
            
        },
        {
            $formkit: 'text',
            name: 'city_parish',
            label: 'City or Parish',
            placeholder: "City or Parish"
            
        },
        {
            $formkit: 'text',
            name: 'country',
            label: 'Country',
            placeholder: "Country"
            
        }

        ],
        contactSchema: [
        {
            $formkit: 'tel',
            name: 'tel',
            label: 'Phone number',              
            placeholder: 'xxx-xxx-xxxx',
            validation: 'matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/'
           
        },
          
        {
            $formkit: 'text',
            name: 'mobile',
            label: 'Mobile No.',           
            placeholder: "Mobile No."
        },
        {
            $formkit: 'email',
            name: 'email',
            label: 'Email',
            
        }
       
        ],


    }},
    methods: {
        submitRecord(){
            //console.table(this.record)
            const self = this;
            if( self.record.taxid){
                self.record['_id'] = self.record.taxid // set record id to tax id
            }else if( self.record.contact.tel){
                self.record['_id'] = self.record.contact.tel
            }else if( self.record.contact.mobile){
                self.record['_id'] = self.record.contact.mobile
            }
            axios.post(`${this.http}newsupplier`, self.record)
            .then(res => {
                
                if(res.status == 200){
                    window.location.reload
                    
                }else{
                    self.error = 'Duplicate Data, The data you are trying to submit is already in our database.'
                }
            })
            .catch(err => {
                self.error = err.message
            })
        },
        
    }
}
</script>
<template>
    
    <!-- The button to open modal -->
<label for="spl-rec" class="btn btn-primary btn-sm modal-button">New Supplier</label>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="spl-rec" class="modal-toggle" />
<label for="spl-rec" class="modal cursor-pointer">
  <label class="modal-box relative  w-11/12 max-w-full" for="">
    <p class="text-red-500">{{error}}</p>
    <h3 class="text-lg font-bold">{{title}}/ {{id}}</h3>
    <div class="flex flex-row">
        <div class="flex flex-col mx-2 w-1/3">
            <p class="my-5 font-semibold">Supplier's Identity</p>
            <FormKit 
                type="form"
                id="supplier-record"               
                v-model="record"   
                :actions="false"
                                           
               >
                <FormKitSchema :schema="nameSchema" />
                <div class="divider w-3/4 my-5">Contact Information</div>
                <FormKit 
                    type="form"
                    id="supplier-contact"                
                    v-model="record.contact"
                    @submit="submitRecord"
                                 
                >
                    <FormKitSchema :schema="contactSchema" />
                </FormKit>

            </FormKit>
            
          
        </div>
        <div class="flex flex-col mx-2 w-1/3">
            <p class="my-5 font-semibold">Supplier's Banking Information</p>
           
                <FormKit 
                    type= "text"
                    v-model= "record.account.bank.name"                   
                    label="Bank Name"  
                    placeholder="NCB/CNBC/BNS ...." 
               />
               <FormKit 
                    type= "text"
                    v-model= "record.account.bank.branch"                   
                    label="Bank Branch" 
                    placeholder="MAY PEN"  
               />
               <FormKit 
                    type= "text"
                    v-model= "record.account.bank.account"                   
                    label="Account no." 
                    placeholder="Acc. Number"  
               />
            

            <p class="my-5 font-semibold">Supplier's Address</p>
            
                <FormKit 
                    type= "text"
                    v-model= "record.address.lot"                   
                    label="Lot"   
               />
               <FormKit 
                    type= "text"
                    v-model= "record.address.street"                   
                    label="Street"   
               />
               <FormKit 
                    type= "text"
                    v-model= "record.address.town"                   
                    label="Town"   
               />
               <FormKit 
                    type= "text"
                    v-model= "record.address.city_parish"                   
                    label="City or Parish"   
               />
               <FormKit 
                    type= "text"
                    v-model= "record.address.country"                   
                    label="Country"   
               />

        </div>
        <div class="flex flex-col mx-2 w-1/3">
            <p>Supplier</p>
            <div class="card w-full bg-base-100 shadow-xl mx-5 my-5">
                <div class="card-body">
                    <h2 class="card-title">{{record.name}}</h2>
                    <p class="flex flex-row">
                        <span>Tax ID. {{record.taxid}}</span>
                        
                    </p> 
                    <section class="flex flex-row">
                        <address class="w-1/2">
                            <ul>

                            <li v-for="val, k of record.address" :key="k"> {{val}}</li>
                            </ul>
                          
                        </address>
                        <p class="w-1/2">
                            <ul>

                                <li v-for="vall, keyl of record.contact" :key="keyl"> {{keyl}}  {{vall}}</li>
                            </ul>
                            
                        </p>
                        
                        
                    </section>   
                    <section>
                        <div class="divider">Banking Details</div>
                        <ul>
                            <li v-for="val, key of record.account.bank" :key="key"> <span class="font-semibold mx-5">{{key}}</span>  {{val}}</li>
                        </ul>
                    </section>             
                    <div class="card-actions justify-end">
                    <button class="badge badge-primary">contact supplier </button>
                    </div>
                </div>
                </div>        
            
            </div>
       
    </div>
   
  </label>
</label>

</template>