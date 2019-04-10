<template>
    <div  v-loading="loading">
        <el-select v-model="value" placeholder="请选择" @change="getData">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
  <el-input-number v-model="num1" @change="handleChange" :min="1" label="单位S"></el-input-number>

        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            prop="15m"
            label="15m"
            width="180">
            </el-table-column>
            <el-table-column
            prop="last"
            label="last"
            width="180">
            </el-table-column>
            <el-table-column
            prop="buy"
            label="buy">
            </el-table-column>
            <el-table-column
            prop="sell"
            label="sell">
            </el-table-column>
            <el-table-column
            prop="symbol"
            label="symbol">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import axios from "axios"
export default {
    data(){
        return {
            num1: 1,
            t:null,
            loading:true,
            options: [{
                value: 'eth',
                label: 'eth'
                }, {
                value: 'btc',
                label: 'btc'
                }],
            value:"eth",
            tableData: [{
                    "15m": 1196.52,
                    "last": 1196.52,
                    "buy": 1196.52,
                    "sell": 1196.52,
                    "symbol": "¥"
            },],
                
        }
  },
  async mounted(){
     await this.getData();
     this.loading = false;
  },
  beforeDestroy(){
        clearTimeout(this.t);
  },
  methods:{
      handleChange(val){
          console.log(val);
          this.num1 = val
      },
      getData(){
         return axios.get(`https://api.blockchain.info/ticker?currency=CNY&base=${this.value}&cors=truebase`).then((data)=>{
            this.$set(this.tableData,0,data.data.CNY)
             clearTimeout(this.t);
             this.t = setTimeout(()=>{
                 this.getData();
             },this.num1*1000)
         })
      }
  }
}
</script>
