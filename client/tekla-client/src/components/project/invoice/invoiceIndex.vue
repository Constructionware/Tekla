<script>

import invoiceIndexItem from './invoiceIndexItem.vue'
export default {
    name: 'invoice-index',
    props: { invoices: {Array}  },
    data() {return {
        invoice: null

    }},
    components: {invoiceIndexItem},
    methods: {
        displayInvoice(record){
            this.invoice = record
        }
    }

}
</script>
<template>
    <div class="flex flex-row">
        <div class="flex flex-col w-full">
            <p class="bg-gray-300 h-12 rounded-md mx-5 my-5 items-inline py-2 px-2 relative">Project Invoice Records
                <span class="absolute right-2">
                    <button class="badge mx-2" @click="$emit('clearInvoice')">Clear Invoice</button>
                    <span class="badge badge-primary">{{invoices.length}}</span>
                </span>
            </p>
            <ul class="my-5 h-96 overflow-y-auto bg-base">
                    <li  v-for="item of invoices" :key="item.id" @click="$emit('displayinvoice', item)">

                        <invoiceIndexItem :record="item"/>
                    </li>
                </ul>
        </div>
      
    </div>

   
</template>