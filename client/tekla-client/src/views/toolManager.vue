<script setup>
  import axios from 'axios'
    import { ref } from 'vue'
    import siteAlert from '../components/ui/siteAlert.vue' 
    import baseTpl from '../components/tpl/baseTpl.vue'    

    import toolIndex from '../components/tool/toolIndex.vue'
    import NewTool from '../components/tool/newTool.vue'
    import etool from '../components/tool/tool.vue'
    
    const emit = defineEmits(['inFocus', 'submit'])
    const ealert= ref({'message': 'Welcome to CentryPlan Resource Manager!', 'status': 'info'});
    var tool = ref({});
    
       


    function getToolEvent(id){
      tool.value = {} // clear object
      
      if (window.location.hostname == 'localhost'){
            var url = `http://127.0.0.1/gettool/${id}`
        }else{ var url = `http://192.168.0.10/gettool/${id}`}

      axios.get(url)
      .then(res =>  {
        tool.value = res.data
      }).catch(err => {
        ealert.value.message = err.message
      })
    }
    function updateTool(){
      var url = `/updatetool`
      if (window.location.hostname == 'localhost'){
            var url = `http://127.0.0.1/updatetool`
        }else{ var url = `http://192.168.0.10/updatetool`}
      axios.put(url, tool.value)
      .then(res =>  {
        tool.value = res.data
      }).catch(err => {
        ealert.value.message = err.message
      })
      window.location.reload()
    }
    /*watch(occupation, async (newQuestion, oldQuestion) => {
        worker.value.occupation = occupation.value
        updateWorkerData()   
    })*/

    </script>
    
    <template>
      <base-tpl>
        <template v-slot:xalert><site-alert :msg="ealert" /></template>

        <template v-slot:header>
        <p>Welcome to CentryPlan Tools and Equipment Resource Manager</p>       
      </template>

      <template v-slot:lsbar>        
        <toolIndex @gettool="getToolEvent"/>    
      
      </template>

      <template v-slot:xdisplay>
        <NewTool/>
        <p>Equipment
         
        </p>   
        <div v-if="Object.keys(tool).length > 0 ">
       <etool :tool="tool" @updatetool="updateTool"/>
       </div>
      

      </template>

      </base-tpl>
    </template>
    
    