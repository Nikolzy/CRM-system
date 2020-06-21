<template>
  <ul class="sidenav app-sidenav open">
    <router-link 
        v-for="link in links" :key="link.title"
        tag="li" 
        active-class="active" 
        :to="link.url" 
        exact>
        <a href="#" class="waves-effect waves-orange pointer">{{link.title}}</a>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: "Sidebar",
  data () {
    return {
       links: [{
           title: 'Счет',
           url: '/'
       },{
           title: 'История',
           url: '/history'
       },{
           title: 'Планирование',
           url: '/planning'
       },{
           title: 'Новая запись',
           url: '/record'
       },{
           title: 'Категории',
           url: '/categories'
       }] 
    }
  }
};
</script>
