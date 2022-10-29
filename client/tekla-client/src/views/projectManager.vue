<script setup>
    import { ref,  onMounted } from 'vue'
    import siteAlert from '../components/ui/siteAlert.vue' 
    import baseTpl from '../components/tpl/baseTpl.vue'    
    
    import projectIndex from '../components/project/projectIndex.vue'
    import ProjectIndex from '../components/project/projectIndex.vue';
    
    const metric = ref(false),

      alert= ref({'message': 'Welcome to CentryPlan Project Manager!', 'status': 'info'});
    
    </script>
    
    <template>
      <base-tpl>
        <template v-slot:xalert><site-alert :msg="alert" /></template>

        <template v-slot:header>
        <p>Welcome to CentryPlan Project Manager</p>       
      </template>

      <template v-slot:lsbar>
        
        <project-index />
      
      </template>

      <template v-slot:xdisplay>
        <p>Display</p>       
      </template>

      </base-tpl>
    </template>
    
    