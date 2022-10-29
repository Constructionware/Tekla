<script setup>
import { FormKitIcon } from '@formkit/vue'
</script>


<style>
.formkit-icon {
  max-width: 5em;
}
</style>
<template>
  <div class="navbar bg-base-100">
  <div class="flex-1">
    <router-link to="/" class="btn btn-ghost normal-case text-xl">Home</router-link> 
  
  </div>
 
  <div class="flex-none">
    <div class="form-control">
      <input type="text" placeholder="Search" class="input input-bordered" />
    </div>
    <ul class="menu menu-horizontal p-0">
      <li><router-link to="/projects">Projects</router-link> </li>
      <li> <router-link to="/workers">Workers</router-link></li>
      <li> <router-link to="/tasks">Tasks</router-link></li>
      <li  tabindex="0">
        <a>
          Resources
          <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
        </a>
        <ul>
        <li> <router-link to="/supplier">Suppliers</router-link></li>
        <li> <router-link to="/tools">Tools</router-link></li>
        <li> <router-link to="/resources">Resources</router-link></li>
        </ul>
      
      </li>
      <li tabindex="0">
        <a>
          Settings
          <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
        </a>
        <ul class="p-2 bg-base-100">
          <li><a>Profile</a></li>
          <li><a>Settings</a></li>
          <li> <router-link to="/about">About us</router-link></li>
          <li><a>Logout</a></li>
          
        </ul>
      </li>
     
    </ul>
    <label tabindex="0" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img src="https://placeimg.com/80/80/people" />
        </div>
      </label>
  </div>
</div>
 
  <router-view></router-view>
</template>
