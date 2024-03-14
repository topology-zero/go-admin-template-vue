<template>
    <div class="my-404-container">
        <svg-icon icon-class="404"
                  class="my-404-img"></svg-icon>
    </div>
</template>

<script>

</script>

<style lang="scss" scoped>
.my-404-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    .my-404-img {
        width: 800px;
        height: 800px;
        fill: red;
    }

    .my-404-text {
        margin-top: 20px;
        color: red;
    }
}
</style>
