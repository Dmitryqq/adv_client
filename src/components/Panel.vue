<template>
    <div class="panel">
        <div class="panel-header" v-if="header">
            {{header}}
        </div>
        <div class="panel-body">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'panel',
    props: {
        header: String
    }
}
</script>

<style scoped>
.panel-header{
    width:100%;
    padding:10px;
    background: #846bab;
    color:#fff;
    font-size: var(--sc-txt-size);
}
.panel-body{
    width:100%;
    display: inline-block;
}
.panel{
    box-shadow: 0 0px 3px #ccc;
    width: 95%;
    float: right;
    text-align-last: center; 
    font-size: 100%;
    margin: 30px;
}
</style>

