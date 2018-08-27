<template>
    <div id="footer">
        <div class="container">
          <h4 class="text-center pt-2">Let's Movie!</h4>
          <p class="text-center my-2">
            <a href="#"><i class="fab fa-facebook"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-twitter-square"></i></a>
            <a href="#"><i class="fab fa-google-plus-square"></i></a>
          </p>
          <p class="text-center mb-0">
            ⓒ 2018 MovieRent by You Cing Yu
          </p>
        </div>
    </div>
</template>

<style scoped lang="scss">
  $gold: #AC865E; 
  #footer{
    color: $gold;
    background: #212622;
    a {
      font-size: 1rem;
      color: $gold;
      &:hover{
        opacity: .8;
      }
    }
  }
</style>
