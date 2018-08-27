<template>
    <div class="shopcart">
        <loading :active.sync="isLoading"></loading>
        <div class="cart-wrapper" v-show="isCart">
            <div class="row">
                <div class="col-sm-12">
                    <table class="table table-list table-striped mt-5 table-hover table-warning mb-0">
                            <thead class="bg-gold">
                                <tr>
                                    <th></th>
                                    <th scope="col">品名</th>
                                    <th scope="col">數量</th>
                                    <th scope="col">單價</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in cart" :key="item.id">
                                    <td><span class="border p-1 border-danger text-danger rounded" @click="deleteCart(item.id)"><i class="far fa-trash-alt"></i></span></td>
                                    <td>{{item.product.title}}
                                    <div class="text-success" v-if="item.coupon">
                                        已套用優惠券
                                    </div>
                                    </td>
                                    <td>{{item.qty}}/個{{item.product.unit}}</td>
                                    <td>{{item.final_total}}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>總計</td>
                                    <td>{{cart_price}}</td>
                                </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-sm-12">
                    <div class="button-wrapper text-center">
                        <router-link class="btn btn-danger" to="/Checkout">
                            結帳去!
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="logowrapper  d-inline-block">
                <span class="dot" v-show="length">
                    {{length}}
                </span>
            <a href="#" @click.prevent="isCart = !isCart"><span><i class="fas fa-shopping-cart"></i></span></a>
        </div>
    </div>
</template>

<script>

    export default{
    data(){
        return{
            cart:[],
            cart_price:'',
            isLoading: false,
            isCart: false,
            length: '',
        }
    },
    methods:{
        getCart() {
                const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
                const vm = this;
                this.$http.get(api).then(response => {
                    vm.cart = response.data.data.carts;
                    vm.length = response.data.data.carts.length;
                    vm.cart_price = response.data.data.total
                    vm.coupon_total = response.data.data.final_total
                });
            },
            deleteCart(id){
                const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
                const vm = this;
                vm.isLoading = true;
                this.$http.delete(api).then(response => {
                    this.getCart();
                    vm.isLoading = false;
                });  
            },
        },
    created(){
            this.getCart();
            this.bus.$on(this.$route.path,()=>{
                this.getCart();
            })
        },
    }
</script>

<style scoped lang="scss">
$gold: #AC865E; 
    .shopcart{
        position: fixed;
        right: 0.5%;
        bottom: 0.5%;
        .cart-wrapper{
            position: relative;
            bottom: -3px;
            left: -40px;
            table{
                span.border{
                    cursor: pointer;
                }
            }
            .button-wrapper{
                max-width: 416px;
                background: #E4E0DA;
                a.btn{
                    display: inline-block;
                    margin: 5px 0;
                }
            }
        }
        .logowrapper{
            .dot{
                display: inline-block;
                position: relative;
                bottom: 30px;
                left: 60px;
                text-align: center;
                line-height: 25px;
                width: 25px;
                height: 25px;
                color: white;
                background: red;
                font-size: 15px;
                border-radius: 50%;
            }
            float: right;
            i{
                font-size: 40px;
                color: $gold;
            }
        }  
    }

    @media (max-width: 320px){
        .shopcart{
            .cart-wrapper{
            left: 0px;
            }
        }
    }
</style>

