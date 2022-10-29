// Application Dependencies
import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'


// Forms
import { applicationIcons, ethereum } from '@formkit/icons'
import { createAutoAnimatePlugin } from '@formkit/addons'
import { plugin, defaultConfig } from '@formkit/vue'

// Router
import router from './router'

// Animation
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

// Css
import './style.css'
import '@formkit/themes/genesis'
import  './tabulate.css'

import './assets/css/dataval.css'

import 'print-js'



const app = createApp(App)    
    .use( autoAnimatePlugin )
    .use(plugin, defaultConfig({
        plugins: [
            createAutoAnimatePlugin({
            // optional config
            }),        
        ],
        icons: {
            ...applicationIcons, // spread an entire group of icons
            ethereum, // or add single icons
        
            formkit: `<svg ...` // or define your own
        }
    }))
    .use(router)   
    
// Delimiters changed to ES6 template string style
//app.config.compilerOptions.delimiters = ['<%', '%>']


function getNetworkAddress(){
    axios.get(`http://${window.location.hostname}/hostip`)
    .then(res => {  
        if(res.status == 200 ){            
            if (window.location.hostname == 'localhost'){
                app.config.globalProperties.http = `http://${res.data.LOCALHOST}/`
            }else{
                 app.config.globalProperties.http = `http://${res.data.IP}/`
            }
        }else{
            app.config.globalProperties.http = 'http://localhost/'
        }
                
    }).catch(err => {
        console.log(err.message)
    })   
}  

function getSuppliers(){    
    axios.get(`http://${window.location.hostname}/suppliers_name_index`)
    .then(res => {
        if(res.status === 200){
            app.config.globalProperties.globalSuppliers = res.data
        }
    }).catch(err => {
        console.log(err.message)
    })
}
async function  main(){
    getNetworkAddress()
    getSuppliers()
}
main()

app.provide('jobRoles', {
    labourer: 'Labourer',
    carpenter: 'Carpenter',
    joiner: 'Joiner',
    mason: 'Mason',
    plumber: 'Plumber',
    electrician: 'Electrician',
    steelman: 'Steelman',
    watchman: 'Watchman',
    supervisor: 'Supervisor',
    foreman: 'Foreman',
    sub: 'Sub Contractor',

} )
app.provide('message', 'Hello User, I am from the Main Function ok.')
app.provide('httpRequest', app.config.globalProperties.http)
app.mount('#app')
