<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <Navbar></Navbar>
        <div class="row">
            <div class="container">
                <div class="col-md-12">
                    <div class="table-block border-top border-secondary" v-if="cart_price">
                    <table class="table table-list table-striped mt-5 table-hover table-warning">
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
                            <tr v-if="coupon_total !== cart_price">
                                <td></td>
                                <td></td>
                                <td class="text-success">折扣價</td>
                                <td>{{coupon_total}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="input-group mb-3 input-group-sm">
                        <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model="coupon_code">
                        <div class="input-group-append">
                            <button class="btn btn-dark text-gold" type="button" @click="addCouponCode()">
                                套用優惠碼
                            </button>
                        </div>
                    </div>
                </div>
                <div class="my-5 row justify-content-center">
                            <form class="col-md-6" @submit.prevent="creatOrder">
                                <div class="form-group">
                                    <label for="useremail">Email</label> 
                                    <input type="email" class="form-control" name="email" id="useremail"
                                        v-model="form.user.email" v-validate="'required|email'" :class="{ 'is-invalid': errors.has('name')}" 
                                        placeholder="請輸入 Email" >
                                    <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email')}}</span>
                                    </div>
                                
                                    <div class="form-group">
                                    <label for="username">收件人姓名</label>
                                    <input type="text" class="form-control" name="name" id="username"
                                        v-model="form.user.name" v-validate="'required'" :class="{ 'is-invalid': errors.has('name')}" placeholder="輸入姓名">
                                    <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span>
                                    </div>
                                
                                    <div class="form-group">
                                    <label for="usertel">收件人電話</label>
                                    <input type="tel" class="form-control" id="usertel" name="phone" 
                                    v-model="form.user.tel"  placeholder="請輸入電話" v-validate="'required'" :class="{ 'is-invalid': errors.has('phone')}">
                                    <span class="text-danger" v-if="errors.has('phone')">電話必須輸入</span>
                                    </div>
                                    
                                    <div class="form-group">
                                    <label for="useraddress">收件人地址</label>
                                    <input type="address" class="form-control" name="address" id="useraddress" v-model="form.user.address"
                                        v-validate="'required'" :class="{ 'is-invalid': errors.has('address')}"
                                        placeholder="請輸入地址">
                                    <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
                                    </div>
                                
                                    <div class="form-group">
                                    <label for="useraddress">留言</label>
                                    <textarea name="" id="" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
                                    </div>
                                    <div class="text-right">
                                    <button class="btn btn-dark text-gold">送出訂單</button>
                                </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
        <ShopCart></ShopCart>
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
            data() {
                return {
                cart:[],
                cart_price:'',
                final_total:'',
                coupon_total:'',
                coupon_code: '',
                isLoading: false,
                isCart: false,
                length: '',
                form:{
                    user:{
                        name: '',
                        email: '',
                        tel: '',
                        address: '',
                    },
                    message:'',
                },
            };
        },
        methods: {
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
            created(){
                this.getCart();
                this.bus.$on(this.$route.path,()=>{
                    this.getCart();
                })
            }
        }
</script>

<style scoped lang="scss">
    .row{
        margin: 0;
        max-width: 100%;
    }
</style>

