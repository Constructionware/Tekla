<script>
export default {
    name: "manageTask",
    props: {
        task: Object
    }
}

</script>

<template>
    <div class="alert alert-warning shadow-lg" v-if="!task.assigned">
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
    <span> Task {{task._id}} Is not assigned to a worker as yet! <br/> would you like to assign one now?
        <a class="mx-2 text-green-700" href="#">Yes</a>/<a href="#">No</a>
    
    </span>
  </div>
</div>

<div class="card lg:card-side bg-base-100 shadow-xl my-5">
 
  <div class="card-body">
    <h2 class="card-title">{{task.title}}</h2>
    <div class="flex flex-row">
        <div class="flex flex-col w-1/2">
            <p>{{task.description}}</p>

        </div>
        <div class="flex flex-col w-1/2">
            <p>{{task.metric}}</p>
        </div>

    </div>

  
    <ul>
        <li v-for="item, index of task">{{index}} {{item}}</li>
    </ul>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Save</button>
    </div>
  </div>
</div>
    <p>{{task}}</p>
    
</template>