<template>
    <div>
        <Navbar></Navbar>
        <div class="section">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus minima a amet perferendis dignissimos ipsam ab vel soluta sequi sapiente, quia id esse natus corporis repudiandae commodi repellat explicabo optio quae at aspernatur tempora non? Magnam temporibus soluta iure quae sed accusantium voluptatibus suscipit culpa eveniet, delectus, aliquam, doloribus assumenda!
        </div>
        <div class="section">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus minima a amet perferendis dignissimos ipsam ab vel soluta sequi sapiente, quia id esse natus corporis repudiandae commodi repellat explicabo optio quae at aspernatur tempora non? Magnam temporibus soluta iure quae sed accusantium voluptatibus suscipit culpa eveniet, delectus, aliquam, doloribus assumenda!
        </div>
        <div class="section">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus minima a amet perferendis dignissimos ipsam ab vel soluta sequi sapiente, quia id esse natus corporis repudiandae commodi repellat explicabo optio quae at aspernatur tempora non? Magnam temporibus soluta iure quae sed accusantium voluptatibus suscipit culpa eveniet, delectus, aliquam, doloribus assumenda!
        </div>
        <ShopCart></ShopCart>
        <Footer></Footer>
    </div>
</template>

<script>
import CustomerOrders from './CustomerOrders';
import Navbar from './Navbar'
import Footer from './Footer'
import ShopCart from './Shopcart'

export default {

    components:{
      CustomerOrders,
      Navbar,
      Footer,
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

<style  scoped lang="scss">
    .section{
        padding: 100px 50px 120px 50px;
    }
</style>
