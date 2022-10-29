
<template id="flat-tpl">
    <div id="xalert" class="mx-5"><slot name="xalert"></slot></div>
    <div class="bg-gray-50 flex flex-col">
        <nav><slot name="sitenav"></slot></nav>
        <header><slot name="header"></slot></header>
       
        <div id="xd2" class="flex flex-col w-full mx-2"><slot name="xdisplay"></slot></div>
        
        <div id="xf2" class="flex flex-col"><slot name="xfooter"></slot></div>
    </div>
</template>
