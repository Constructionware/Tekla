<script>
    
    export default {
        name: "accountWithdrawals",
        props:{
            account: {Object},
            id: {String}
        }
    }

</script>
<template>
    <p class="h-12 bg-gray-300 rounded-md my-5 px-5 py-2">{{id}}/ Account Withdrawals </p>
   
    <div>
        <ul class="p-2 h-96 overflow-y-auto">
            <li 
            class="h-12 w-full border-b rounded-md my-1 relative cursor-pointer" 
            v-for="t of account.transactions.withdraw"
            :key="t.ref"
            @click="$emit('accountTransaction', t)"
            >
               <span class="text-xs">{{t.ref}}</span>  <span class="text-xs font-semibold absolute right-2">Recipient <span>{{t.recipient.name}}</span></span>
            </li>
        </ul> 
    </div>
       
       

</template>