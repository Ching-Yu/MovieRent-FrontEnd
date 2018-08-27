<template>
    <div>
        <Navbar></Navbar>
        <div class="row">
            <div class="container">
                <h1 class="text-center">Watch your movie for best price!</h1>
                <div class="col-md-12 ">
                    <div class="card d-block mx-auto" style="width: 22rem;">
                    <img class="card-img-top" src="https://i.imgur.com/kyVxlSQ.jpg" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title text-center">開幕慶!</h5>
                        <p class="card-text text-center">全館使用折扣碼:<span class="text-success">OPEN</span> 獲取9折優惠!</p>
                        <div class="text-center">
                            <router-link class="btn btn-danger px-5" to="/Checkout">
                                結帳去!
                            </router-link>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
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
    export default{
        components:{
            CustomerOrders,
            Navbar,
            Footer,
            ShopCart,
        },
    }
</script>


<style scoped lang="scss">
    $gold: #AC865E;
    .row{
        margin: 0;
        max-width: 100%;
    }
    .container{
        padding: 130px 5px 200px 5px;
        h1.text-center{
            padding-bottom: 100px;
            font-family: italic;
            font-style: italic;
            color: $gold;
        }
        .card{
            box-shadow: 0 0 5px 5px grey;
            .card-title{
                letter-spacing: 1.5px;
            }
        }
    }
</style>
