<script>
import accountWithdrawals from './accountWithdrawals.vue';   
import DCurrency from '../../ui/dCurrency.vue';
    export default {
    props: {
        id: String,
        account: Object,
        
    },
    components: { DCurrency, accountWithdrawals },
    methods: {
        transferTransaction(t){
            this.$emit('accountTransaction', t)
        }
    }
}
</script>
<template>
    <div>
        <ul class="p-2 h-96 overflow-y-auto my-5">
            <li 
            class="h-12 w-full border-b rounded-md my-1 relative" 
            v-for="t of account.transactions.deposit"
            :key="t.ref"
            @click="$emit('accountTransaction', t)"
            >
               <span class="text-xs">{{t.ref}}</span> {{ new Date(t.date).toDateString() }} <span class="font-bold mx-2"><DCurrency :amount="t.amount" /></span> <span class="text-xs font-semibold absolute right-2">{{t.payee}}</span>
            </li>
        </ul> 
        <accountWithdrawals :id="id" :account="account" @accountTransaction="transferTransaction"></accountWithdrawals>
    </div>
</template>