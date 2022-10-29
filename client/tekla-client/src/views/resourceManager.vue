<script setup>
    import { ref } from 'vue'
    import siteAlert from '../components/ui/siteAlert.vue' 
    import baseTpl from '../components/tpl/baseTpl.vue'    
    
    
    const metric = ref(false),

      alert= ref({'message': 'Welcome to CentryPlan Resource Manager!', 'status': 'dialog'});
    
    </script>
    
    <template>
      <base-tpl>
        <template v-slot:xalert><site-alert :msg="alert" /></template>

        <template v-slot:header>
        <p>Welcome to CentryPlan Resource Manager</p>       
      </template>

      <template v-slot:lsbar>
        <p>Left Side </p>
      
      </template>

      <template v-slot:xdisplay>
        <p>Display</p>       
      </template>

      </base-tpl>
    </template>
    
    