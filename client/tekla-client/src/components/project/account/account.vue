<script>
    
    export default {
        name: "account",
        props:{
            account: {Object},
            id: {String}
        }
    }

</script>
<template>
    <p>{{id}}/ Accounting <span>Ballance {{account.ballance}}</span></p>
   
    <ul class="h-96 overflow-y-auto">
        <li v-for="(val, key) of account" :key="key"> <strong>{{key}}</strong> {{ val }}</li>
    </ul>
    <table>
          <caption>Deposits</caption>
          <thead>
            <tr>
              <th>Refference</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Payee</th>
            </tr>
          </thead>
          <tbody v-if="account">
            
            <tr v-for="item of account.transactions.deposit" :key="item.ref">
              <td>{{item.ref}}</td>
              <td>{{new Date(item.date).toDateString()}}</td>
              <td>{{item.amount}}</td>
              <td>{{item.payee}}</td>
            </tr>
          
            </tbody>
    </table>
         
       
       

</template>