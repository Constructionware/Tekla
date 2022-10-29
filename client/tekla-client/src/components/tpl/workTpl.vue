
<template id="work-tpl">
    <div id="xalert" class="mx-5"><slot name="xalert"></slot></div>
    <div class="bg-gray-50 flex flex-col mx-5">
        <nav><slot name="sitenav"></slot></nav>
        <header><slot name="header"></slot></header>
       
        <div id="xd1" class="flex flex-col"><slot name="xdisplay"></slot></div>
       
        <div id="xf1" class="flex flex-col"><slot name="xfooter"></slot></div>
    </div>
</template>
