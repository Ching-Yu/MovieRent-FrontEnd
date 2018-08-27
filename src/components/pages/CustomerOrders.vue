<template>
    <div class="main-section">
        <loading :active.sync="isLoading"></loading>
        <h1 class="text-center px-3"><i class="fas fa-video pr-4"></i>Watch Your Favorite Movie Anytime.</h1>   
        <div class="col-md-10 mx-auto">
            <div class="row mt-4" >
                <div class="col-12">
                    <ul class="nav nav-tabs mb-3" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link" href="#" @click.prevent="category = 'action'" role ="tab"  date-toggle="tab" :class="{ active:category=='action'}">動作電影</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" @click.prevent="category = 'love'" role ="tab"  date-toggle="tab" :class="{ active:category=='love'}">愛情電影</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" @click.prevent="category = 'scary'" role ="tab"  date-toggle="tab" :class="{ active:category=='scary'}">恐怖電影</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" @click.prevent="category = 'all'" role ="tab"  date-toggle="tab" :class="{ active:category=='all'}">電影總覽</a>
                        </li>
                    </ul>
                </div>
            </div>
        <keep-alive>
        <AllMovies v-if="category == 'all'"></AllMovies>
        <ActionMovies v-if="category == 'action'"></ActionMovies>
        <LoveMovies v-if="category == 'love'"></LoveMovies>
        <ScaryMovies v-if="category == 'scary'"></ScaryMovies>
        </keep-alive>
        </div>
    </div>
</template>

<script>
import $ from "jquery";
import AllMovies from './AllMovies'
import ActionMovies from './ActionMovies'
import LoveMovies from './LoveMovies'
import ScaryMovies from './ScaryMovies'

export default {
  components:{
      AllMovies,
      ActionMovies,
      LoveMovies,
      ScaryMovies,
  },
  data() {
    return {
      category: 'action',  
      products: [],
      product: {},
      pagination: {},
      status: {
        loadingItem: ""
      },
      form:{
          user:{
              name: '',
              email: '',
              tel: '',
              address: '',
          },
          message:'',
      },
      isLoading: false,
      cart: [],
      cart_price:'',
      final_total:'',
      coupon_total:'',
      coupon_code: '',
    };
  },
  methods: {
    getProducts() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        vm.isLoading = false;
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
      });
    },
    getProduct(id) {
      const api = `${process.env.APIPATH}/api/${
        process.env.CUSTOMPATH
      }/product/${id}`;
      const vm = this;
      vm.status.loadingItem = id;
      this.$http.get(api).then(response => {
        vm.product = response.data.product;
        $("#ProductModal").modal("show");
        vm.status.loadingItem = "";
      });
    },
    addtoCart(id, qty = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      const cart = {
        product_id: id,
        qty
      };
      vm.status.loadingItem = id;
      this.$http.post(api, { data: cart }).then(response => {
        this.getCart();
        vm.status.loadingItem = "";
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
    getCart() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      this.$http.get(api).then(response => {
        vm.cart = response.data.data.carts;
        vm.cart_price = response.data.data.total
        vm.coupon_total = response.data.data.final_total
      });
    },
    addCouponCode(){
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
        const vm = this;
        const coupon = {
            code: vm.coupon_code
        }
        vm.isLoading = true;
        this.$http.post(api, {data: coupon}).then(response => {
        this.getCart();
        vm.isLoading = false;
      });        
    },
    creatOrder(){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
      const vm = this;
      const order = vm.form
      vm.isLoading = true;
      this.$validator.validate().then((result) => {
          if(result){
            this.$http.post(api, {data: order}).then(response => {
                if(response.data.success){
                    vm.$router.push(`/customer_checkout/${response.data.orderId}`)
                }
                // vm.getCart();
                vm.isLoading = false;
            });
          } else {
          }
      })
    },
  },
  created() {
    this.getProducts();
    this.getCart();
  }
};
</script>


<style scoped>
/* $gold: #AC865E; */

    h1.text-center{
        font-family: italic;
        font-style: italic;
        color: #AC865E;
    }
    .main-section{
        padding: 100px 0;
    } 
    .main-section{
        padding: 100px 0;
    }
    table.table{
        max-width: 635px;
        margin: 10px auto;
    }
    .input-group{
        margin: 0 auto;
        max-width: 50%;
    }
    span.border{
        cursor: pointer;
    }
    span.border:hover{
        color: white!important;
        background: red;
        transition: 0.3s all linear;
    }
</style>