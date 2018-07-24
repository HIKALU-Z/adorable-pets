<template>
    <div>
        <section class="section">
            <div class="container">
                <!-- first-tile -->
                <div class="tile is-ancestor">
                    <div class="tile is-parent">
                        <article class="tile is-child box">
                            <p class="title">One</p>
                            <p class="subtitle">Subtitle</p>
                            <img src="./../assets/img/cat/miao-8.jpg" alt="">
                        </article>
                    </div>
                    <div class="tile is-parent">
                        <article class="tile is-child box">
                            <p class="title">Two</p>
                            <p class="subtitle">Subtitle</p>
                            <img src="./../assets/img/cat/miao-8.jpg" alt="">
                        </article>
                    </div>
                    <div class="tile is-parent">
                        <article class="tile is-child box">
                            <p class="title">Three</p>
                            <p class="subtitle">Subtitle</p>
                            <img src="./../assets/img/cat/miao-8.jpg" alt="">
                        </article>
                    </div>
                    <div class="tile is-parent">
                        <article class="tile is-child box">
                            <p class="title">Four</p>
                            <p class="subtitle">Subtitle</p>
                            <img src="./../assets/img/cat/miao-8.jpg" alt="">
                        </article>
                    </div>
                </div>

                <!-- <div>
                    <img src="./../assets/img/cat/miao-8.jpg" alt="">
                </div> -->
                <!-- second-tile -->
                <div class="tile is-ancestor">
                    <div class="tile is-9">
                        <div class="tile">
                            <div class="tile is-parent">
                                <article class="tile is-child box">
                                    <p class="title">Five</p>
                                    <p class="subtitle">Subtitle</p>
                                    <div class="content">
                                        <img src="./../assets/img/cat/miao-7.jpg" alt="miao">
                                    </div>
                                </article>
                            </div>
                            <div class="tile is-8 is-vertical">
                                <div class="tile">
                                    <div class="tile is-parent">
                                        <article class="tile is-child box">
                                            <p class="title">Six</p>
                                            <p class="subtitle">Subtitle</p>
                                            <img src="./../assets/img/cat/miao-4.jpg" alt="miao">
                                        </article>
                                    </div>
                                    <div class="tile is-parent">
                                        <article class="tile is-child box">
                                            <p class="title">Seven</p>
                                            <p class="subtitle">Subtitle</p>
                                            <img src="./../assets/img/cat/miao-4.jpg" alt="miao">
                                        </article>
                                    </div>
                                </div>
                                <div class="tile is-parent">
                                    <article class="tile is-child box">
                                        <p class="title">Eight</p>
                                        <p class="subtitle">Subtitle</p>
                                        <img src="./../assets/img/cat/long-2.jpg" alt="miao">
                                    </article>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="tile">
                            <div class="tile is-8 is-parent">
                                <article class="tile is-child box">
                                    <p class="title">Nine</p>
                                    <p class="subtitle">Subtitle</p>
                                    <div class="content">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
                                    </div>
                                </article>
                            </div>
                            <div class="tile is-parent">
                                <article class="tile is-child box">
                                    <p class="title">Ten</p>
                                    <p class="subtitle">Subtitle</p>
                                    <div class="content">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.</p>
                                    </div>
                                </article>
                            </div>
                        </div> -->
                    </div>
                    <div class="tile is-parent">
                        <article class="tile is-child box">
                            <div class="content">
                                <p class="title">Eleven</p>
                                <p class="subtitle">Subtitle</p>
                                <div class="content">
                                    <img src="./../assets/img/cat/miao-10.jpg" alt="miao">
                                
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.card {
  overflow: hidden;
}
.card.is-verticle {
  width: 240px;
  height: 320px;
  img {
    width: 100%;
    height: 100%;
  }
}
.card.is-horizontal {
  width: 320px;
  height: 240px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
