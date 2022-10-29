
<template id="base-tpl">
    <div id="xalert" class="mx-5"><slot name="xalert"></slot></div>
    <div class="bg-gray-50 flex flex-col">
        <nav><slot name="sitenav"></slot></nav>
        <header><slot name="header"></slot></header>
        <div class="container flex flex-row">
            <div id="lsbar" class="flex flex-col w-1/4 mx-2"><slot name="lsbar"></slot></div>
            <div id="xd1" class="flex flex-col w-3/4 mx-2"><slot name="xdisplay"></slot></div>
        </div>
        <div id="xf1" class="flex flex-col"><slot name="xfooter"></slot></div>
    </div>
</template>
