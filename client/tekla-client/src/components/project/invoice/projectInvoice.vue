<script>

import DCurrency from '../../ui/dCurrency.vue';
import { FormKitIcon } from '@formkit/vue'
import screenfull from 'screenfull';

export default {
    name: 'projectInvoice',
    props: { 
        record: {Object}
    },
    components:{DCurrency},
    methods: {
        setItemTotal(price, amt){
            return parseFloat(price) * parseFloat(amt)
        },
        printInvoice() {
          // this.$printJs('invoice-rec')
            alert('This Feature is being tested! Use with caution.')
           printJS({ 
            printable: 'invoice-rec', 
            type: 'html',
            targetStyles: ['*'],
            footer: `PrintJS - Print Form With Customized Header`
         });

          
            
        }


    }

}
</script>
<template>
     <div class="flex flex-col mx-2 items-center">
           
           <section id="invoice-rec" class="bg-gray-100 text-xs border-2 border-gray-200 rounded-md p-2 shadow-md" v-if="record.invoiceno">
               <h2 class="text-center text-lg font-semibold my-2">{{record.supplier.name}}</h2>
               <h2 class="text-center text-sm font-semibold my-2"><span class="mx-2">Tax id</span> {{record.supplier.taxid}}</h2>
               <h1 class="text-center text-lg font-semibold my-2">Invoice No. {{record.invoiceno}}</h1>
              
               <p class="text-left text-sm my-2 flex flex-col mx-5">
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
                       <tr v-for="item of record.items" :key="item.itemno">
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
                           <td><DCurrency :amount="record.tax"/></td>
                       </tr>
                       <tr>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td></td>
                           <td>Total</td>
                           <td><DCurrency :amount="record.total"/></td>
                       </tr>
                   </tbody>
                  
                  
               </table>
               <p class="text-right text-sm my-2 flex flex-col" v-else>
                   <span>Tax <DCurrency :amount="record.tax"/></span>
                   <span>Invoice Total: <DCurrency :amount="record.total"/></span>
               </p>
               </section>
               <button class="btn btn-sm btn-primary my-5 " @click="printInvoice">Print</button>
       </div>

</template>