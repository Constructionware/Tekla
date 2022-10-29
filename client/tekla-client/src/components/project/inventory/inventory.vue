<script>
    

    export default {
        name: "inventory",
        props:{
            id: {String},
            inventory: {Array}
        }
    }

</script>
<template>
    <p>{{id}}/Project Store </p>
      <table class="mx-5 my-5 border border-gray-400 rounded-md">
        <thead>
            <tr>
                <th>Item</th>
                <th>Title</th>
                <th>InStock</th>
                <th>Units</th>
            </tr>
        </thead>
        <tbody>
            <tr class="py-2 px-4" v-for="item of inventory">
                <td>{{item.id}}</td>
                <td>{{item.item}}</td>
                <td>{{item.instock}}</td>
                <td>{{item.unit}}</td>

            </tr>
        </tbody>
      
      </table>
</template>