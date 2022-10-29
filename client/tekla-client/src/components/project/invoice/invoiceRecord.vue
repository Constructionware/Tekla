<script>
import axios from 'axios';
import DCurrency from '../../ui/dCurrency.vue';
export default {
    name: "invoiceRecord",
    props: {
        id: String
    },
    components: { DCurrency},
    data(){ return {
        error: null,
        invoiceIdIndex: null,
        checker: null,
        title: "Project Invoice Record",
        record: {
            supplier: {
                name: null,
                taxid: null,
            },
            invoiceno: null,
            datetime: null,
            items:[],
            tax: null,
            total:null

        },
        item: {
            itemno:null,
            description: null,
            quantity: null,
            unit: null,
            price: null
        },

        supplier: {
            name: null,
            taxid: null,
            address: {},
            contact: {},

        },
        suppliers: [],
        itemSchema: [
        {
            $formkit: 'text',
            name: 'itemno',
            label: 'Item no.',           
            validation: 'required|itemno'
        },
        {
            $formkit: 'text',
            name: 'description',
            label: 'Description'           
           
        },
        {
            $formkit: 'number',
            name: 'quantity',
            label: 'Quantity',
            step: '0.01'
        },
        {
            $formkit: 'text',
            name: 'unit',
            label: 'Unit'          
            
        },
        {
            $formkit: 'number',
            name: 'price',
            label: 'Price', 
            step: '0.01',
            placeholder: '$1.00'
            
            
        }


        ],


    }},
    created(){
        this.getInvoiceIds()
    },
    watch: {
        checker(){ this.checkIn() }
    },
    computed: {
        accountWithdrawal(){
            return {
                id: Date.parse(new Date()),
                date: this.record.datetime, 
                type:"Withdraw",            
                amount: this.record.total, 
                recipient:this.record.supplier,
                ref: this.record.invoiceno
            }
        },
        suppliersIndex() {
            const self = this;
            function transformData(data){
                return {label: data.name, value: data}
            }
            var data = self.globalSuppliers.map(transformData)
            data.unshift({label: 'Select Supplier', value:""})
            return data
        },
        
    },
    
    methods: {
       
        validateInvoice() {
            const self = this;
            var payload = { 
                invoiceno: self.record.invoiceno, 
                supplier: self.record.supplier.name
            }
            axios.post(`http://${location.hostname}/check_invoice`, payload)
            .then(result => {                
                if( result.status == 200) {
                    self.checker = result.data.result                    
                }else{ self.checker = null }               
            })
            .catch(err => {
                self.error = err.message
            })
        },
        checkIn(){
            const self = this;
            if(self.checker == true ){
                alert('Stop right deso! Da invoice deh already in deh.')
                setTimeout(() => {
                    self.record.invoiceno = null 
                }, 2500);
              
                
            }
            else{ 
                //pass 
            }
        },
        
        async getInvoiceIds(){
            const self = this;
            axios.get(`${self.http}invoiceids`)
            .then(res => {
                if( res.status === 200 ){
                    self.invoiceIdIndex = res.data
                }
            })
            .catch(err => {
                self.error = err.message
            })

        },
        submitRecord(){
            
            const self = this;
            self.validateInvoice()
            
            setTimeout(() => {
                if(self.checker == true ){
                    alert('Yu neva hear seh Da invoice deh already in deh?. System Reject yu request.')
                    self.record.invoiceno = null 
                    self.record.items = []
                    self.record.tax = null
                    self.record.total = null
                }
                else{ 
                axios.post(`${this.http}add_project_invoice/${this.id}`, this.record)
                .then(res => {
                    if(res.status == 200){
                        self. submitInvoicePayment()
                    }
                })
                .catch(err => {
                    self.error = err.message
                }) 
            }
                
            }, 2500);
          
            
        },
        async addInvoiceItem(){
            const self = this;
            self.record.items.push(self.item)
            setTimeout(() => {
                self.item = {
                    itemno: null,
                    description: null,
                    quantity: null,
                    unit: null,
                    price: 0
                }
                self.item.itemno = self.record.items.length + 1
            }, 50);

            
        },
        setItemTotal(price, amt){
            return parseFloat(price) * parseFloat(amt)
        },
        submitInvoicePayment(){
            axios.post(`${this.http}transaction/${this.id}`,  this.accountWithdrawal)
            .then(result => {
                if(result.status == 200) {
                    window.location.reload()
                }
            })
            .catch(error => {
                this.error = error.message
            })
          
        },
        
        
    }
}
</script>
<template>
    
    <!-- The button to open modal -->
<label for="inv-rec" class="btn btn-accent btn-xs modal-button">Invoice Record</label>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="inv-rec" class="modal-toggle" />
<label for="inv-rec" class="modal cursor-pointer">
  <label class="modal-box relative  w-11/12 max-w-full" for="">
    <p class="text-red-500">{{error}}</p>
    <h3 class="text-lg font-bold">{{title}}/ {{id}}</h3>
    <div class="flex flex-row">
        <div class="flex flex-col mx-2 w-1/3">
            <FormKit type="form" @submit="submitRecord">
            <FormKit 
            type="text" 
            v-model.lazy="record.invoiceno" 
            label="Invoice No." 
            placeholder="Invoice Number"
            validation="required"
            validation-visibility="live"
            help="You must enter an Invoice number here!"
            @input="validateInvoice"
            />
            <div class="divider w-96"></div>
                <FormKit type="text" v-model="record.supplier.name" label="Supplier's Name" placeholder="Supplier"/>
                <FormKit type="select" v-model="record.supplier" label="Select" placeholder="Supplier" :options="suppliersIndex"/>             
                
                <div class="divider w-96"></div>
           
            <FormKit type="date" v-model="record.datetime" label="Date" @focus="validateInvoice"/>
            <FormKit type="number" v-model.number="record.tax" label="Tax" step="0.01" placeholder="$1.00"/>
            <FormKit type="number" v-model.number="record.total" label="Total" step="0.01" placeholder="$1.00"/>
            </FormKit>
        </div>
        <div class="divider lg:divider-horizontal">AND</div>
        <div class="flex flex-col mx-2 w-1/3">
            <p>Invoice Items</p>
            
            <FormKit 
                type="form"
                id="invoice-item"                
                submit-label="Add Item"
                v-model="item"
                @submit="addInvoiceItem"                
               >
                <FormKitSchema :schema="itemSchema" />
            </FormKit>
            
        </div>
        <div class="divider lg:divider-horizontal">RESULT</div>
        <div class="flex flex-col mx-2 w-1/3">

        
            <div class="alert alert-warning shadow-lg my-5" v-if="checker == true">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <span>Warning! Duplicate Invoice Data detected. Resetting form...</span>
                </div>
            </div>
            <div class="alert alert-success shadow-lg my-5" v-else>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Good to go!</span>
                </div>
            </div>
            <section class="bg-gray-100 text-xs border-2 border-gray-200 rounded-md p-2 shadow-md" v-if="record.invoiceno">
                <h2 class="text-center text-lg font-semibold my-2">{{record.supplier.name}}</h2>
                <h2 class="text-center text-sm">TAX ID {{record.supplier.taxid}}</h2>
                <h1 class="text-center text-lg font-semibold my-2">Invoice No. {{record.invoiceno}}</h1>
               
                <p class="text-left text-sm my-2 flex flex-col">
                    <span>Inv.no {{record.invoiceno}}</span>
                    <span>Date: {{record.datetime}}</span>
                </p>
                <table class="table table-xs mx-2" v-if="record.items.length > 0">
                    <thead>
                        <tr>
                            <td>Item</td>
                            <td>Description</td>
                            <td>Unit</td>
                            <td>Amt</td>
                            <td>Price</td>
                            <td>Total</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item of record.items">
                            <td>{{item.itemno}}</td>
                            <td>{{item.description}}</td>
                            <td>{{item.unit}}</td>
                            <td> {{item.quantity}} </td>
                            <td><DCurrency :amount="item.price"/></td>
                            <td><DCurrency :amount="setItemTotal(item.price, item.quantity)"/></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>Tax</td>
                            <td><DCurrency :amount="parseFloat(record.tax)"/></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>Total</td>
                            <td><DCurrency :amount="parseFloat(record.total)"/></td>
                        </tr>
                    </tbody>
                   
                   
                </table>
                <p class="text-right text-sm my-2 flex flex-col" v-else>
                    <span>Tax <DCurrency :amount="record.tax"/></span>
                    <span>Invoice Total: <DCurrency :amount="record.total"/></span>
                </p>
               
                </section>
                
               
                
        </div>
    </div>
  
  </label>
</label>

</template>