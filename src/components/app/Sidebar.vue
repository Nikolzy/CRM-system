<template>
  <ul class="sidenav app-sidenav" :class="{'open': value}">
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
import localizeFilter from '../../filters/localize-filter';

export default {
  name: "Sidebar",
  props: {
      value: Boolean
  },
  data () {
    return {
       links: [{
           title: localizeFilter('menu_Bill'),
           url: '/'
       },{
           title: localizeFilter('menu_History'),
           url: '/history'
       },{
           title: localizeFilter('menu_Planning'),
           url: '/planning'
       },{
           title: localizeFilter('menu_Record'),
           url: '/record'
       },{
           title: localizeFilter('menu_Categories'),
           url: '/categories'
       }] 
    }
  }
};
</script>
