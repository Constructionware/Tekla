import{_ as S,i as v,o as s,c as r,d as e,t as l,F as x,e as w,h as B,B as E,b as g,j as U,w as b,f as p,m as h,g as I,A as W,n as m,z as _,r as C,s as P,u as F}from"./index.d0819ba4.js";import{s as A}from"./stackTpl.66f77d3f.js";import{N as q}from"./newWorker.0da50cd2.js";import{s as D}from"./index.10815fb0.js";const z={name:"workersIndex",data(){return{employeeIndex:[],eids:[]}},mounted(){setTimeout(()=>{this.loadWorkers()},100)},methods:{loadWorkers(){const o=this;v.get(`${o.http}workers`).then(n=>{o.employeeIndex=n.data.data.rows})}}},j={class:"h-12 bg-gray-400 text-lg font-bold relative"},K=B("Registered Employees "),O={class:"badge badge-primary my-2 absolute right-1"},L={class:"my-5 h-96 overflow-y-auto"},M=["onClick"],N={class:"badge badge-primary my-2 absolute right-1"};function J(o,n,d,u,t,i){return s(),r(x,null,[e("p",j,[K,e("span",O,l(t.employeeIndex.length),1)]),e("ul",L,[(s(!0),r(x,null,w(t.employeeIndex,c=>(s(),r("li",{class:"h-12 w-full border-b border-gray-400 cursor-pointer relative",onClick:T=>o.$emit("getworker",c.id)},[e("span",null,l(c.id)+" "+l(c.value.name)+"/ "+l(c.value.oc),1),e("span",N,l(c.value.occupation),1)],8,M))),256))])],64)}const R=S(z,[["render",J]]),H={props:{id:String},data(){return{complete:!1,image:null}},methods:{async submitHandler(o,n,d,u){let t=new FormData;t.append("file",o),v.post("http://centryplan-012:9000/",t,{headers:{"Content-Type":"multipart/form-data"}}).then(i=>{this.complete=!0,console.log(i)}).catch(i=>{E("profileForm",[i.message])})}}},Q={class:"text-blue-500"},G={key:1,class:"complete"},Y={key:2};function X(o,n,d,u,t,i){const c=g("FormKit");return s(),r(x,null,[e("p",Q,l(d.id),1),t.complete?(s(),r("div",G,"Profile Image upload complete \u{1F44D}")):(s(),U(c,{key:0,id:"profileForm",type:"form",onSubmit:i.submitHandler},{default:b(()=>[p(c,{type:"file",label:"Profile Image",name:"file",help:"Please add a scan of your driver\u2019s license",accept:".jpg,.png,.pdf",validation:"required"})]),_:1},8,["onSubmit"])),t.image?(s(),r("pre",Y,l(t.image[0]),1)):h("",!0)],64)}const Z=S(H,[["render",X]]),$={name:"worker-view",props:{worker:{type:Object}},inject:["jobRoles"],data(){return{err:null,update:null,currentWorker:{occupation:null,contact:{},address:{},state:{},event:{},nok:{address:{},contact:{}}},display:{statusBar:"flex flex-row h-14 border border-gray-300 my-5 mx-5 rounded-md min-w-full relative",statusText:"w-62 text-gray-400 font-bold py-2",state:null,menuBar:{menuText:"text-xs text-gray-700",state:null},fullScreen:{personal:!1}},switchCase:{occupation:!1},show:{page:!0},workerStatus:null}},components:{UploadProfile:Z,FormKitIcon:I},computed:{checkAvail(){return Object.keys(this.worker).length>0},manageStatusBar(){return this.display.statusBar="flex flex-row h-14 border border-gray-300 my-5 mx-5 rounded-md min-w-full relative hover:bg-gray-50 bg-gray-100",this.display.statusText="w-62 text-gray-600 font-bold py-2 px-2",this.display.state="JobStatus Unavailable!",this.display.menuBar.state=null,Object.keys(this.worker).includes("state")?this.currentWorker.state.active?(this.display.statusBar="flex flex-row h-14 border border-green-400 my-5 mx-5 rounded-md min-w-full relative hover:bg-green-50 bg-green-100",this.display.statusText="w-62 text-teal-600 font-bold py-2 px-2",this.display.state="JobStatus Active "):this.currentWorker.state.terminated?(this.display.statusBar="flex flex-row h-14 border border-red-400 my-5 mx-5 rounded-md min-w-full relative hover:bg-red-50 bg-red-100",this.display.statusText="w-62 text-red-600 font-bold py-2 px-2",this.display.state="JobStatus Terminated ",this.display.menuBar.menuText="text-xs text-red-700 mx-5",this.display.menuBar.state=`Services was terminated on ${new Date(this.currentWorker.event.terminated).toDateString()}`):this.currentWorker.state.onleave?(this.display.statusBar="flex flex-row h-14 border border-blue-400 my-5 mx-5 rounded-md min-w-full relative hover:bg-blue-50 bg-blue-100",this.display.statusText="w-62 text-blue-600 font-bold py-2 px-2",this.display.state="JobStatus OnLeave ",this.display.menuBar.menuText="text-xs text-blue-700 mx-5",this.display.menuBar.state=`Employee went on temporary Leave on ${new Date(this.currentWorker.event.leave).toDateString()}`):this.currentWorker.state.quit&&(this.display.statusBar="flex flex-row h-14 border border-slate-400 my-5 mx-5 rounded-md min-w-full relative hover:bg-slate-50 bg-slate-400",this.display.statusText="w-62 text-gray-50 font-bold py-2 px-2",this.display.state="JobStatus Quitted ",this.display.menuBar.menuText="text-xs text-purple-700 mx-5",this.display.menuBar.state=`Employee Quitted on ${new Date(this.currentWorker.event.quited).toDateString()}`):(this.display.statusBar="flex flex-row h-14 border border-gray-300 my-5 mx-5 rounded-md min-w-full relative hover:bg-gray-100",this.display.state="JobStatus Unavailable!"),this.display.statusBar}},watch:{workerStatus(){this.resetStatus()},worker(){this.triggerLoadWorker()}},methods:{async fullScreenPersonal(){this.display.fullScreen.personal=!this.display.fullScreen.personal;const o=document.getElementById("personal");D.isEnabled&&D.request(o)},async triggerLoadWorker(){await this.loadWorker()},async loadWorker(){const o=this;setTimeout(()=>{o.currentWorker=o.worker},100)},uploadProfileImage(){const o=this;var n=`${o.url}uploadprofile`,d={_id:o.worker._id};v.put(n,d).then(u=>{o.update=u.data}).catch(u=>{o.err=u.message})},async saveWorkerData(){const o=this;v.put(`http://${location.hostname}/worker/${o.currentWorker._id}`,o.currentWorker).then(n=>{n.status==200&&(alert("Data Saved..."),o.currentWorker=n.data)}).catch(n=>{o.err=n.message})},resetStatus(){const o=this;switch(o.workerStatus){case"active":alert(" Employment status set to active!"),o.currentWorker.state.terminated=!1,o.currentWorker.state.quit=!1,o.currentWorker.state.onleave=!1,o.currentWorker.state.active=!0;break;case"onleave":alert(" Employment status set to onleave!"),o.currentWorker.state.active=!1,o.currentWorker.state.terminated=!1,o.currentWorker.state.quit=!1,o.currentWorker.state.onleave=!0;break;case"quitted":alert(" Employment status set to quitted!"),o.currentWorker.state.active=!1,o.currentWorker.state.terminated=!1,o.currentWorker.state.onleave=!1,o.currentWorker.state.quit=!0;break;case"terminated":alert(" Employment status set to terminated!"),o.currentWorker.state.quit=!1,o.currentWorker.state.onleave=!1,o.currentWorker.state.active=!1,o.currentWorker.state.terminated=!0;break}}}},ee={id:"personal"},te={class:"absolute right-2"},se={class:"dropdown"},re=e("label",{tabindex:"0",class:"btn btn-md m-1"},"Manage State",-1),oe={tabindex:"0",class:"dropdown-content card card-compact w-64 p-2 shadow bg-slate-300"},ne={class:"card-body"},le=e("h4",{class:"card-title"},"Manage Employment Status!",-1),ae={wrap:""},ie=e("button",{class:"btn gap-2"},[B(" Inbox "),e("div",{class:"badge badge-secondary"},"+99")],-1),ce={key:1,class:"card lg:card-side bg-base-100 shadow-xl"},de={key:0,class:"flex flex-col"},ue=["src"],pe={class:"text-sm text-center text-gray-600 font-semibold"},me={key:1,class:"mx-5 my-5"},_e={class:"card-body"},he={class:"card-title"},ye={class:"flex flex-row w-full"},xe={class:"w-1/2"},ke=B(" Also Known as "),fe={class:"flex flex-row space-x-2"},be=e("span",null,"Date of Birth",-1),ve={class:"flex flex-row space-x-2"},we=e("span",null,"Sex.",-1),ge={class:"flex flex-row space-x-2"},We=e("span",null,"Id Type",-1),Se=e("span",null,"No.",-1),Be={class:"flex flex-row space-x-2"},Te=e("span",null,"Occupation",-1),Ce={key:1},De={class:"divider lg:divider-horizontal"},Ue={class:"w-8"},Ve={class:"w-1/2"},Ee={tabindex:"0",class:"collapse"},Ie=e("input",{type:"checkbox"},null,-1),Pe=e("div",{class:"collapse-title text-xl font-medium"}," Contact ",-1),Fe={class:"collapse-content"},Ae=e("span",{class:"font-semibold mx-5"},"Email",-1),qe={key:0},ze={key:1,class:"text-yellow-4"},je=e("span",{class:"font-semibold mx-5"},"Tel.",-1),Ke={key:0},Oe={key:1,class:"text-yellow-4"},Le=e("span",{class:"font-semibold mx-5"},"Mobile",-1),Me={key:0},Ne={key:1,class:"text-yellow-4"},Je={class:"text-xs bg-gray-200 rounded-md p-2"},Re={tabindex:"0",class:"collapse"},He=e("input",{type:"checkbox"},null,-1),Qe=e("div",{class:"collapse-title text-xl font-medium"}," Address ",-1),Ge={class:"collapse-content"},Ye=e("span",{class:"font-semibold mx-5"},"Lot",-1),Xe={key:0},Ze={key:1,class:"text-yellow-4"},$e=e("span",{class:"font-semibold mx-5"},"Street",-1),et={key:0},tt={key:1,class:"text-yellow-4"},st=e("span",{class:"font-semibold mx-5"},"Town",-1),rt={key:0},ot={key:1,class:"text-yellow-4"},nt=e("span",{class:"font-semibold mx-5"},"City or Parish",-1),lt={key:0},at={key:1,class:"text-yellow-4"},it=e("span",{class:"font-semibold mx-5"},"Country",-1),ct={key:0},dt={key:1,class:"text-yellow-4"},ut={class:"text-xs bg-gray-200"},pt={tabindex:"0",class:"collapse"},mt=e("div",{class:"collapse-title text-xl font-medium"}," Next Of Kin ",-1),_t={class:"collapse-content"},ht={key:0},yt={class:"font-semibold"},xt={class:"font-semibold text-gray-500"},kt={key:0},ft={key:1,class:"text-yellow-4"},bt={key:1},vt={class:"font-semibold"},wt={class:"font-semibold text-gray-500"},gt={key:0},Wt={key:1,class:"text-yellow-4"},St={key:2},Bt={class:"font-semibold mx-5"},Tt={key:0},Ct={key:1,class:"text-yellow-4"},Dt=e("div",{class:"divider"},null,-1),Ut={class:"card-actions justify-end text-xs text-gray-700"},Vt={key:0},Et=e("span",null,"Employed since ",-1),It={key:2,class:"flex flex-col mx-5 my-5"},Pt={id:"account"},Ft={tabindex:"0",class:"collapse"},At=e("div",{class:"collapse-title text-xl font-medium"}," Account ",-1),qt={class:"collapse-content"},zt={tabindex:"0",class:"collapse"},jt=e("div",{class:"collapse-title text-xl font-medium"}," Job Tasks ",-1),Kt={class:"collapse-content"},Ot={tabindex:"0",class:"collapse"},Lt=e("div",{class:"collapse-title text-xl font-medium"}," Days Work ",-1),Mt={class:"collapse-content"},Nt={tabindex:"0",class:"collapse"},Jt=e("div",{class:"collapse-title text-xl font-medium"}," Reports ",-1),Rt={class:"collapse-content"};function Ht(o,n,d,u,t,i){const c=g("FormKit"),T=g("UploadProfile"),V=g("FormKitIcon");return s(),r("div",ee,[i.checkAvail?(s(),r("div",{key:0,id:"status-bar",class:W(i.manageStatusBar)},[e("span",{class:W(t.display.statusText)},l(t.display.state),3),e("span",te,[e("button",{class:"btn btn-primary",onClick:n[0]||(n[0]=(...a)=>i.saveWorkerData&&i.saveWorkerData(...a))},"Save"),e("div",se,[re,e("div",oe,[e("div",ne,[le,p(c,{modelValue:t.workerStatus,"onUpdate:modelValue":n[1]||(n[1]=a=>t.workerStatus=a),type:"radio",label:"Employee Status",options:{active:"Active",onleave:"OnLeave",quitted:"Quit",terminated:"Terminate"},help:"Manage the worker employment status."},null,8,["modelValue"]),e("pre",ae,l(t.workerStatus),1)])])]),ie])],2)):h("",!0),i.checkAvail?(s(),r("div",ce,[t.currentWorker.imgurl?(s(),r("figure",de,[e("img",{src:t.currentWorker.imgurl,alt:"worker profile"},null,8,ue),e("h1",pe,l(t.currentWorker.oc),1)])):(s(),r("section",me,[p(T,{id:t.currentWorker._id},null,8,["id"])])),e("div",_e,[e("h2",he,l(t.currentWorker.name),1),e("div",ye,[e("section",xe,[e("p",null,[ke,e("strong",null,l(t.currentWorker.oc),1)]),e("p",fe,[be,e("span",null,l(t.currentWorker.dob),1)]),e("p",ve,[we,e("span",null,l(t.currentWorker.sex),1)]),e("p",ge,[We,e("span",null,l(t.currentWorker.id_type),1),Se,e("span",null,l(t.currentWorker.identity),1)]),e("p",Be,[Te,e("span",null,l(t.currentWorker.occupation),1),i.checkAvail?(s(),r("span",{key:0,class:"cursor-pointer",onClick:n[2]||(n[2]=a=>t.switchCase.occupation=!0)},l(t.currentWorker.occupation),1)):h("",!0),t.switchCase.occupation?(s(),r("span",Ce,[p(c,{id:"occupation",modelValue:t.currentWorker.occupation,"onUpdate:modelValue":n[3]||(n[3]=a=>t.currentWorker.occupation=a),type:"select",label:"Occupation",placeholder:"Select Occupation",options:i.jobRoles},null,8,["modelValue","options"]),e("button",{class:"btn btn-secondary",onClick:n[4]||(n[4]=(...a)=>i.saveWorkerData&&i.saveWorkerData(...a))},"Update")])):h("",!0)])]),e("div",De,[e("figure",Ue,[p(V,{icon:"link"})])]),e("section",Ve,[e("div",Ee,[Ie,Pe,e("div",Fe,[e("ul",null,[e("li",null,[Ae,t.currentWorker.contact.email?(s(),r("span",qe,l(t.currentWorker.contact.email),1)):(s(),r("span",ze,[m(e("input",{class:"input input-sm input-primary",type:"email",placeholder:"@mail.com","onUpdate:modelValue":n[5]||(n[5]=a=>t.currentWorker.contact.email=a)},null,512),[[_,t.currentWorker.contact.email,void 0,{lazy:!0}]])]))]),e("li",null,[je,t.currentWorker.contact.tel?(s(),r("span",Ke,l(t.currentWorker.contact.tel),1)):(s(),r("span",Oe,[m(e("input",{class:"input input-sm input-primary",type:"tel",placeholder:"xxx-xxx-xxxx",validation:"matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/","onUpdate:modelValue":n[6]||(n[6]=a=>t.currentWorker.contact.tel=a)},null,512),[[_,t.currentWorker.contact.tel,void 0,{lazy:!0}]])]))]),e("li",null,[Le,t.currentWorker.contact.mobile?(s(),r("span",Me,l(t.currentWorker.contact.mobile),1)):(s(),r("span",Ne,[m(e("input",{class:"input input-sm input-primary",type:"tel",placeholder:"xxx-xxx-xxxx",validation:"matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/","onUpdate:modelValue":n[7]||(n[7]=a=>t.currentWorker.contact.mobile=a)},null,512),[[_,t.currentWorker.contact.mobile,void 0,{lazy:!0}]])]))])]),e("p",Je,l(t.currentWorker.contact),1)])]),e("div",Re,[He,Qe,e("div",Ge,[e("ul",null,[e("li",null,[Ye,t.currentWorker.address.lot?(s(),r("span",Xe,l(t.currentWorker.address.lot),1)):(s(),r("span",Ze,[m(e("input",{type:"text",placeholder:"Lot",class:"input input-sm input-bordered input-primary w-full max-w-xs","onUpdate:modelValue":n[8]||(n[8]=a=>t.currentWorker.address.lot=a)},null,512),[[_,t.currentWorker.address.lot,void 0,{lazy:!0}]])]))]),e("li",null,[$e,t.currentWorker.address.street?(s(),r("span",et,l(t.currentWorker.address.street),1)):(s(),r("span",tt,[m(e("input",{type:"text",placeholder:"Street you live on",class:"input input-sm input-bordered input-primary w-full max-w-xs","onUpdate:modelValue":n[9]||(n[9]=a=>t.currentWorker.address.street=a)},null,512),[[_,t.currentWorker.address.street,void 0,{lazy:!0}]])]))]),e("li",null,[st,t.currentWorker.address.town?(s(),r("span",rt,l(t.currentWorker.address.town),1)):(s(),r("span",ot,[m(e("input",{type:"text",placeholder:"Your Town",class:"input input-sm input-bordered input-primary w-full max-w-xs","onUpdate:modelValue":n[10]||(n[10]=a=>t.currentWorker.address.town=a)},null,512),[[_,t.currentWorker.address.town,void 0,{lazy:!0}]])]))]),e("li",null,[nt,t.currentWorker.address.city_parish?(s(),r("span",lt,l(t.currentWorker.address.city_parish),1)):(s(),r("span",at,[m(e("input",{type:"text",placeholder:"Street you live on",class:"input input-sm input-bordered input-primary w-full max-w-xs","onUpdate:modelValue":n[11]||(n[11]=a=>t.currentWorker.address.city_parish=a)},null,512),[[_,t.currentWorker.address.city_parish,void 0,{lazy:!0}]])]))]),e("li",null,[it,t.currentWorker.address.country?(s(),r("span",ct,l(t.currentWorker.address.country),1)):(s(),r("span",dt,[m(e("input",{type:"text",placeholder:"Country",class:"input input-sm input-bordered input-primary w-full max-w-xs","onUpdate:modelValue":n[12]||(n[12]=a=>t.currentWorker.address.country=a)},null,512),[[_,t.currentWorker.address.country,void 0,{lazy:!0}]])]))])]),e("p",ut,l(t.currentWorker.address),1)])]),e("div",pt,[mt,e("div",_t,[e("ul",null,[(s(!0),r(x,null,w(t.currentWorker.nok,(a,y)=>(s(),r("li",{key:y},[y=="contact"?(s(),r("span",ht,[e("span",yt,l(y)+": ",1),e("ul",null,[(s(!0),r(x,null,w(a,(k,f)=>(s(),r("li",{key:f},[e("span",xt,l(f)+":",1),k?(s(),r("span",kt,l(k),1)):(s(),r("span",ft,"Unavailable"))]))),128))])])):y=="address"?(s(),r("span",bt,[e("span",vt,l(y)+": ",1),e("ul",null,[(s(!0),r(x,null,w(a,(k,f)=>(s(),r("li",{key:f},[e("span",wt,l(f)+":",1),k?(s(),r("span",gt,l(k),1)):(s(),r("span",Wt,"Unavailable"))]))),128))])])):(s(),r("span",St,[e("span",Bt,l(y)+": ",1),a?(s(),r("span",Tt,l(a),1)):(s(),r("span",Ct,"Unavailable"))]))]))),128))])])])])]),Dt,e("div",Ut,[e("span",{class:"badge badge-secondary badge-sm cursor-pointer",onClick:n[13]||(n[13]=(...a)=>i.fullScreenPersonal&&i.fullScreenPersonal(...a))},"fullscreen"),t.display.fullScreen.personal?(s(),r("span",Vt,"Press Esc to Exit Fullscreen.")):h("",!0),Et,e("span",null,l(new Date(t.currentWorker.event.employed).toDateString()),1),t.display.menuBar.state?(s(),r("span",{key:1,class:W(t.display.menuBar.menuText)},l(t.display.menuBar.state),3)):h("",!0)])])])):h("",!0),i.checkAvail?(s(),r("div",It,[e("section",Pt,[e("div",Ft,[At,e("div",qt,[e("p",null,l(t.currentWorker.account),1)])]),e("div",zt,[jt,e("div",Kt,[e("p",null,l(t.currentWorker.tasks),1)])]),e("div",Ot,[Lt,e("div",Mt,[e("p",null,l(t.currentWorker.days),1)])])]),e("section",null,[e("div",Nt,[Jt,e("div",Rt,[e("p",null,l(t.currentWorker.reports),1)])])])])):h("",!0)])}const Qt=S($,[["render",Ht]]),Gt=e("p",null,"Welcome to CentryPlan Human Resource Manager",-1),Yt={class:"mx-5"},Xt={id:"worker"},ss={__name:"hrManager",setup(o){const n=C({message:"Welcome to CentryPlan Human Resource Manager!",status:"info"});var d=C({});function u(t){d.value={},v.get(`http://${location.hostname}/getworker/${t}`).then(i=>{d.value=i.data}).catch(i=>{console.log(i.message)})}return(t,i)=>(s(),U(A,null,{xalert:b(()=>[p(P,{msg:n.value},null,8,["msg"])]),header:b(()=>[Gt]),lsbar:b(()=>[e("div",Yt,[p(R,{onGetworker:u})])]),xdisplay:b(()=>[p(q),e("section",Xt,[p(Qt,{worker:F(d)},null,8,["worker"])])]),_:1}))}};export{ss as default};