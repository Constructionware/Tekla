
<template id="stack-tpl">
    <div id="stack-alert" class="mx-5"><slot name="xalert"></slot></div>
    <div class="bg-gray-50 flex flex-col">
        <nav><slot name="sitenav"></slot></nav>
        <header><slot name="header"></slot></header>
        <div class="flex flex-row">
            <div id="stack-bar" class="flex flex-col w-1/3"><slot name="lsbar"></slot></div>
            <div id="stack-xd" class="flex flex-col w-2/3 mx-5"><slot name="xdisplay"></slot></div>
        </div>
        <div id="stack-footer" class="flex flex-col"><slot name="xfooter"></slot></div>
    </div>
</template>
