<template>
    <ul class="crumb">
        <li v-for="crumb in crumbs">
            <router-link :to="crumb.url">{{ crumb.name }}</router-link>
            <span v-show="crumb.slash">/</span>
        </li>
    </ul>
</template>

<script>
    export default {
        props: {
            crumbs: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style>
    .crumb {
        padding-left: 30px;
        height: 34px;
        line-height: 35px;
        border-bottom: 1px solid #ddd;
    }
    .crumb li {
        float: left;
        margin-right: 4px;
        font-size: 13px;
        color: #999;
    }
    .crumb a {
        font-size: 13px;
        color: #999;
    }
    .crumb a:focus,
	.crumb a:hover {
		color: #ff0000;
	}
</style>