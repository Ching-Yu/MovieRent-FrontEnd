<template>
<div>
    <div class="row">
        <loading :active.sync="isLoading"></loading>
        <div class="col-lg-4 col-sm-12 mb-4" v-for ="item in products" :key="item.id">
                <div class="card">
                    <div class="card-cover">
                        <div>
                            <a href="#" @click.prevent="getProduct(item.id)">
                                <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                                More
                            </a>
                        </div>
                    </div>
                    <div style="height: 300px; background-size: cover; background-position: center"
                    :style="{backgroundImage: `url(${item.imageUrl})`}">
                    </div>
                    <div class="card-body">
                    <span class="badge  badge-danger float-right ml-2" v-if="item.category">{{item.category}}</span>
                    <h5 class="card-title">
                        <a href="#" class="text-dark">{{item.title}}</a>
                    </h5>
                    
                    <div class="d-flex justify-content-between align-items-baseline">
                        <div class="h6 text-danger" v-if="item.price">$ {{item.price}} 元</div>
                    </div>
                    </div>
                </div>
                <!-- Modal -->
                <div class="modal fade" id="ProductModal" tabindex="-1" role="dialog" aria-labelledby="ProductModalTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">{{product.title}}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col">
                                    <img :src="product.imageUrl" alt="" class="img-fluid">
                                </div>
                            </div>
                            <h5 class="mt-2 mb-4">{{product.description}}</h5>
                            <div class="d-flex justify-content-between align-items-baseline">
                                <!-- <div class="h5">2,800 元</div> -->
                                <del class="h4" v-if="!product.price">原價 {{product.origin_price}} 元</del>
                                <del class="h6" v-if="product.price">原價 {{product.origin_price}} 元</del>
                                <div class="h4" v-if="product.price">現在只要 <span class="text-danger">{{product.price}} </span>元</div>
                            </div>
                            <div class="p-3">
                                {{product.content}}
                            </div>
                            <select name="" class="form-control mt-3" v-model="product.num">
                                <option :value="num" v-for="num in 12" :key="num">
                                    訂閱 {{num}} 個{{product.unit}}
                                </option>
                            </select>
                        </div>
                        <div class="modal-footer">
                            <div class="text-muted mr-3 h6">
                                小計 <strong class="text-danger h5">{{product.price * product.num}} </strong>元
                            </div>
                            <button type="button" class="btn btn-info text-gold" data-dismiss="modal" @click="addtoCart(product.id, product.num)">加到購物車</button>
                        </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
    <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item" :class="{ 'disabled': !pagination.has_pre}">
                    <a class="page-link" href="#" aria-label="Previous" @click.prevent="getProducts(pagination.current_page-1)">
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Previous</span>
                    </a>
                    </li>
                    <li class="page-item" v-for="page in pagination.total_pages" :key="page" :class="{ 'active': pagination.current_page === page}">
                        <a class="page-link" href="#" @click.prevent="getProducts(page)">{{page}}</a>
                    </li>
                    <li class="page-item" :class="{ 'disabled': !pagination.has_next}">
                    <a class="page-link" href="#" aria-label="Next" @click.prevent="getProducts(pagination.current_page+1)">
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only">Next</span>
                    </a>
                    </li>
                </ul>
            </nav>
</div>

</template>

<script>
import $ from "jquery";
export default {
  components:{
  },
  data() {
    return {
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
    getProducts( page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`;
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
        this.bus.$emit(this.$route.path);
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
        this.bus.$emit(this.$route.path);
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

<style scoped lang="scss">
    $gold: #AC865E;
    a{
        text-decoration: none!important;
    }
    .card{
        position: relative;
        border: 3px solid rgba(0,0,0,.15);
        box-shadow: .5rem  1rem rgba(0,0,0,.15)!important;
    }
    .card-cover{
        opacity: 0;
        display: flex;
        background-color: rgba(0,0,0,.5);
        justify-content: center;
        align-content: center;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        &:hover{
            opacity: 1;
            transition: all .25s linear;
        }
        div{
            margin: auto 0;
            a{
                padding: 15px 40px;
                color: $gold;
                font-size: 1rem;
                border: 1px solid white;
                &:hover{
                    background: white;
                    transition: all .25s linear;
                }
            }
        }
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