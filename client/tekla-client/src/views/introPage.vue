<script setup>
import { ref,  onMounted } from 'vue'
import siteAlert from '../components/ui/siteAlert.vue' 
import baseTpl from '../components/tpl/baseTpl.vue'



const metric = ref(false),
  alert={'message': 'Project Phase is not set!', 'status': 'warning'};

</script>

<template>
  <base-tpl>
    <template v-slot:xalert><site-alert :msg="alert" /></template>
    <template v-slot:header>
    <p>Welcome to CentryPlan </p>
    <FormKit
    type="text"
    label="Email address"
    prefix-icon="email"
    suffix-icon="search"
    help="Enter a full email address"
    validation="required|email"
    validation-visibility="live"
  />
  </template>
  <section>
    <p class="text-3xl font-bold">Financial Markets</p>
    
  </section>
  </base-tpl>
</template>

