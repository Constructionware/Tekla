<script>
    export default {
        name: "site-alert",
        props: {
            msg: Object
        },
        data(){return{
            statuses: ['info','success','warning','error','dialog','message'],
            store: {status: null},
            timeout: 15000,
        }},
        mounted(){
            this.setMessage ()
        },
        computed: {
            message(){
                setTimeout(() => {  // Reset 
                    this.store.status = null
                    this.store.message = ""
                }, this.timeout);
                
                return this.store.message
            }
        },
        methods: {
            setMessage (){
                if(this.statuses.includes(this.msg.status)) { // check for status validity
                this.store = this.msg // set reactive
                }
            },
            getMessage(){
                setTimeout(() => {  // Reset 
                    this.store.status = null
                    this.store.message = ""
                }, this.timeout);
                
                return this.store.message
            }
        }

    }
   
</script>

<template>
    <div class="alert alert-info shadow-lg" 
    v-if="store.status == 'info'"  
    >
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>{{message}}</span>
        </div>
    </div>
    <div class="alert alert-success shadow-lg" v-if="store.status == 'success'">
    <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>{{message}}</span>
    </div>
    </div>
    <div class="alert alert-warning shadow-lg" v-if="store.status == 'warning'">
    <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        <span>Warning: {{message}}</span>
    </div>
    </div>
    <div class="alert alert-error shadow-lg" v-if="store.status == 'error'">
    <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Error! {{message}}</span>
    </div>
    </div>

    <div class="alert shadow-lg" v-if="store.status == 'dialog'">
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    <span>{{message}}</span>
  </div>
  <div class="flex-none">
    <button class="btn btn-sm btn-ghost">Deny</button>
    <button class="btn btn-sm btn-primary">Accept</button>
  </div>
</div>
<div class="alert shadow-lg" v-if="store.status == 'message'">
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    <div>
      <h3 class="font-bold">New message!</h3>
      <div class="text-xs">{{message}}</div>
    </div>
  </div>
  <div class="flex-none">
    <button class="btn btn-sm">See</button>
  </div>
</div>
   
</template>