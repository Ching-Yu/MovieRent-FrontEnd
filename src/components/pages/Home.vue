<template>
  <div>
    <Navbar></Navbar>
    <Carousel></Carousel>
    <CustomerOrders></CustomerOrders>
    <ShopCart></ShopCart>
    <Footer></Footer>
  </div>
</template>

<script>
import CustomerOrders from './CustomerOrders';
import Navbar from './Navbar'
import Footer from './Footer'
import Carousel from './Carousel'
import ShopCart from './Shopcart'

export default {

    components:{
      CustomerOrders,
      Navbar,
      Footer,
      Carousel,
      ShopCart,
    },

    data(){
        return{
        }
    },
    methods: {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  body{
    width: 100%;
  }
  .carousel-box{
    background: #212622;
    margin: 0;
    width: 100%;
    .carousel-item img{
      max-height: 600px;
    }
  }
</style>
