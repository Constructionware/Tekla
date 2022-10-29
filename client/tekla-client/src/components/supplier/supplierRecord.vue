<script setup>

const props = defineProps({
     record: {Object} 
}) 

</script>
<template>
    <div class="card w-full bg-base-100 shadow-xl mx-5 my-5">
    <div class="card-body">
        <h2 class="card-title text-center">{{props.record.name}}</h2>
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
        <button class="badge badge-primary">Contact </button>
        </div>
    </div>
    </div>
    
</template>