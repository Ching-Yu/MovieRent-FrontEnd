<template>
    <div class="row carousel-box">
        <div class="col-md-7 mx-auto p-0">
          <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img class="d-block w-100" src="https://3.bp.blogspot.com/-EEZu7J0m3h4/WL2P_R89ROI/AAAAAAAASj8/6uGM5FUUZ8siJ4xMFNoSL8yCFXyWkutYACLcB/s1600/Logan-A3-Layered-Landscape-Launch.jpg" alt="First slide">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="https://vbmspic.video.friday.tw/STILL/L/26817_208446.jpg" alt="Second slide">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="https://i0.wp.com/img.char.tw/uploads/20180516002217_39.jpg?resize=1600%2C921" alt="Third slide">
              </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
  .carousel-box{
    background: #212622;
    margin: 0;
    width: 100%;
    .carousel-item img{
      max-height: 600px;
    }
  }
</style>
