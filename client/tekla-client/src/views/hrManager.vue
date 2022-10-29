<script setup>
  import axios from 'axios'
    import { ref,  watch, onMounted } from 'vue'
    import siteAlert from '../components/ui/siteAlert.vue' 
    import stackTpl from '../components/tpl/stackTpl.vue'    

    import workersIndex from '../components/worker/workersIndex.vue'
    import NewWorker from '../components/project/worker/newWorker.vue'
    import workerView from '../components/worker/workerView.vue'

    //const emit = defineEmits(['inFocus', 'submit'])
    const alert= ref({'message': 'Welcome to CentryPlan Human Resource Manager!', 'status': 'info'});
    var worker = ref({})
        

    function getWorkerEvent(id){
      worker.value = {} // clear object     
      
      axios.get(`http://${location.hostname}/getworker/${id}`)
      .then(res =>  {
        worker.value = res.data
      }).catch(err => {
        console.log(err.message)
      })
    }
    function updateWorkerData(){
      var url = `http://${location.hostname}/updateworker`
      axios.put(url, worker.value)
      .then(res =>  {
        worker.value = res.data
      }).catch(err => {
        console.log(err.message)
      })
      window.location.reload()
    }
    
    </script>
    
    <template>
      <stack-tpl>
        <template v-slot:xalert><site-alert :msg="alert" /></template>

        <template v-slot:header>
        <p>Welcome to CentryPlan Human Resource Manager</p>       
      </template>

      <template v-slot:lsbar>  
        <div class="mx-5">      
         <workersIndex @getworker="getWorkerEvent" /> 
        </div>   
      
      </template>

      <template v-slot:xdisplay>
        <NewWorker/>
        
        <section id="worker">
          <workerView :worker="worker"></workerView>
        </section>
        

      </template>

      </stack-tpl>
    </template>
    
    