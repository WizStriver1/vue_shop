<!--
 /**
  * copy of Mr. Song on 2018/01/12
  */
 -->
 <template>
    <div class="hello">
        <h1>{{ msg }}</h1>
    </div>
</template>
<script>
	export default {
		name: 'myCart',
		data() {
			return {
				msg: "Welcome to Cart"
			}
		}
	}
</script>

<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>