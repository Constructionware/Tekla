<script>
    import axios from 'axios';
    
    import { setErrors } from '@formkit/vue'
    export default {
        props: { id: String },
        data() {return {
            complete: false,
            image: null
        }},
        methods: {
            async submitHandler (file, progress, error, option) {
            // We need to submit this as a multipart/form-data
            // to do this we use the FormData API.
            const self = this; 
                //img = self.image[0], 
                //fileName=img.name,
                //fileObj = img.file;
            //console.log(typeof(img.file))
            let formData = new FormData();
                //formData.append("id", self.id);
                //formData.append("name", fileName);
                //formData.append("name",  self.image[0].name );
                formData.append("file",  file );
            // We can append other data to our form data:
            
            // Finally, we append the actual File object(s)
            //this.image.forEach((fileItem) => {formData.append('profile', fileItem.file) })
           
               
            
            
            // We'll perform a real upload to httpbin.org
            axios.post('http://centryplan-012:9000/', formData, {
                headers: {
                "Content-Type": "multipart/form-data",
                }
            })
            .then(res => {
                this.complete = true
                console.log(res)
                
            }).catch(err => {
                setErrors('profileForm', [err.message])
            })
            
            
            }

        }
    }
    
   
    </script>
        
    <template>
        <p class="text-blue-500">{{id}}</p>
      <FormKit
        v-if="!complete"
        id="profileForm"
        type="form"
        @submit="submitHandler"
      >
        
        <FormKit
          type="file"
          label="Profile Image"
          name="file"
          help="Please add a scan of your driver’s license"
          accept=".jpg,.png,.pdf"
          validation="required"
          
        />
      </FormKit>
     

      <div v-else class="complete">Profile Image upload complete 👍</div>
      <pre v-if="image">{{image[0]}}</pre>
    </template>