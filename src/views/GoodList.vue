<template>
  <div>
    <body>
    <my-header></my-header>
    <bread-crumb></bread-crumb>
    <div class="accessory-result-page">
    <div class="container">
      <div class="filter-nav">
          <span class="sortby">排序:</span>
          <a href="javascript:void(0)" class="default cur">默认</a>
          <a href="javascript:void(0)" class="price">价格 <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
          <a href="javascript:void(0)" @click="showFilterBy" class="filterby">筛选</a>
      </div>
      <div class="accessory-result">
          <!-- filter -->
          <div class="filter" :class="{'filterby-show' : filterBy}" id="filter">
              <dl class="filter-price">
                  <dt>价格区间:</dt>
                  <dd><a href="javascript:void(0)" @click="changeCurItem('all')" :class="{cur : curItem == 'all'}">选择价格</a></dd>
                  <dd v-for="(item, index) in goodsPrice">
                      <a href="javascript:void(0)" @click="changeCurItem(index)" :class="{cur : curItem == index}">￥ {{item.startPrice}} - {{item.endPrice}} 元</a>
                  </dd>
              </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                  <ul>
                      <li v-for="item in goodsList">
                          <div class="pic">
                              <a href="#"><img v-lazy="'/static/images/' + item.productImage" alt=""></a>
                          </div>
                          <div class="main">
                              <div class="name">{{item.productName}}</div>
                              <div class="price">{{item.salePrice}}</div>
                              <div class="btn-area">
                                  <a href="javascript:;" class="btn btn--m">加入购物车</a>
                              </div>
                          </div>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
      <div class="md-overlay" v-show="filterBy" @click="closeFilterBy"></div>
    </div>
    </div>
    <my-footer></my-footer>
    </body>
  </div>
</template>

<script>
import "../../static/css/base.css"
import "../../static/css/nav-header.css"
import "../../static/css/nav-bread.css"
import "../../static/css/nav-footer.css"
import "../../static/css/goods-list.css"

import MyHeader from '@/components/MyHeader'
import BreadCrumb from '@/components/BreadCrumb'
import MyFooter from '@/components/MyFooter'
import axios from "axios"

export default {
  name: 'GoodList',
  data () {
    return {
      goodsList: [],
      goodsPrice: [
        {"startPrice":'0.00',"endPrice": "100.00"},
        {"startPrice":'100.00',"endPrice": "500.00"},
        {"startPrice":'500.00',"endPrice": "1000.00"},
        {"startPrice":'1000.00',"endPrice": "2000.00"},
        {"startPrice":'2000.00',"endPrice": "3000.00"},
        {"startPrice":'3000.00',"endPrice": "6000.00"}
      ],
      curItem: "all",
      filterBy: false,
    }
  },
  components: {
    MyHeader,
    BreadCrumb,
    MyFooter
  },
  mounted() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList: function() {
      axios.get("http://localhost:3000/goods").then((result) => {
        var res = result.data.result;
        this.goodsList = res.list;
      });
    },
    changeCurItem: function(item) {
      this.curItem = item;
    },
    showFilterBy: function() {
      this.filterBy = true;
    },
    closeFilterBy: function() {
      this.filterBy = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
