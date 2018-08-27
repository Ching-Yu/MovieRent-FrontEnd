<template>
    <nav class="navbar navbar-expand-lg">
        <router-link class="navbar-brand" to="/home">
            Let's Movie!
        </router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/home">
                Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/introduction">
                Introdction
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link coupon" to="/coupon">
                Coupon!
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-danger" to="/Checkout">
                Checkout
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
</template>

<script>
    export default{
}
</script>

<style scoped lang="scss">
     $gold: #AC865E;
    nav{
    border-bottom: 1px solid $gold;
    padding: 0.5rem 3rem;
    background: white;
    .navbar-brand{
      box-shadow: none;
      color: #4D4D4D;
      background: white;
      font-weight: bold;
      font-size: 1.5rem;
    }
    a.nav-link{
      color: #4D4D4D;
    }
    a.coupon{
      font-weight: 600;
      color: $gold;
    }
  }
</style>
