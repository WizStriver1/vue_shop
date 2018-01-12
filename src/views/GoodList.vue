<template>
  <div>
    <body>
    <my-header></my-header>
    <bread-crumb></bread-crumb>
    <div class="accessory-result-page">
    <div class="container">
      <div class="filter-nav">
          <span class="sortby">排序:</span>
          <a href="javascript:void(0)" class="default cur" @click="defauleSort">默认</a>
          <a href="javascript:void(0)" class="price" :class="{'sort-up' : descendFlag}" @click="changeSort">价格 <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
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
              <div class="view-more-normal"
                  v-infinite-scroll="loadMore"
                  infinite-scroll-disabled="busy"
                  infinite-scroll-distance="20">
                <img src="./../../static/loading-svg/loading-spinning-bubbles.svg" v-show="loading" alt="">
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
        {"startPrice":'100.00',"endPrice": "200.00"},
        {"startPrice":'200.00',"endPrice": "500.00"},
        {"startPrice":'500.00',"endPrice": "1000.00"},
        {"startPrice":'1000.00',"endPrice": "2000.00"},
        {"startPrice":'1000.00',"endPrice": "2000.00"},
        {"startPrice":'2000.00',"endPrice": "5000.00"},
      ],
      curItem: "all",
      filterBy: false,
      page: "1",
      pageSize: "8",
      descendFlag: false,
      busy: true,
      loading: false,
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
    getGoodsList: function(flag) {
      var param = {
        page: this.page,
        pageSize: this.pageSize,
        sort: this.descendFlag ? -1 : 1,
        priceLevel: this.curItem
      }
      this.loading = true;
      axios.get("http://localhost:3000/goods", {
        params: param
      }).then((result) => {
        var res = result.data;
        this.loading = false;
        if(res.status == "0") {
          if(flag) {
            this.goodsList = this.goodsList.concat(res.result.list);
            if(res.result.count == 0) {
              this.busy = true;
            } else {
              this.busy = false;
            }
          } else {
            this.goodsList = res.result.list;
            this.busy = false;
          }
        } else {
          this.goodsList = [];
        }
      });
    },
    changeCurItem: function(item) {
      this.curItem = item;
      this.page = "1",
      this.descendFlag = false;
      this.getGoodsList();
    },
    showFilterBy: function() {
      this.filterBy = true;
    },
    closeFilterBy: function() {
      this.filterBy = false;
    },
    defauleSort: function() {
      this.page = "1";
      this.descendFlag = false;
      this.getGoodsList();
    },
    changeSort: function() {
      this.page = "1";
      this.descendFlag = !this.descendFlag;
      this.getGoodsList();
    },
    loadMore: function() {
      this.busy = true;
      setTimeout(() => {
        this.page++;
        this.getGoodsList(true);
      }, 500);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
