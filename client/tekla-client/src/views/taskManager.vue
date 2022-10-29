<script setup>
    import { ref } from 'vue'
    import siteAlert from '../components/ui/siteAlert.vue' 
    import flatTpl from '../components/tpl/flatTpl.vue' 

    import TaskView from '../components/task/taskView.vue';    
    import TasksIndex from '../components/task/tasksIndex.vue';
    
    
    const metric = ref(false),

      alert= ref({'message': 'Welcome to CentryPlan Project Manager!', 'status': 'info'});
    
    </script>
    
    <template>
      <flat-tpl>
        <template v-slot:xalert><site-alert :msg="alert" /></template>

        <template v-slot:header>
        <p class="flex flex-row h-14 relative">Welcome to CentryPlan Task Manager
       <span class="absolute right-1"><task-view id="1"></task-view></span> 
      </p>         
      </template>      

      <template v-slot:xdisplay>
        
         
        <tasks-index ></tasks-index>
       
      </template>

      </flat-tpl>
    </template>
    
    