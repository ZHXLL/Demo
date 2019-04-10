<template>
    <div v-loading="loading">
        <canvas width="1000" height="600" ></canvas>
    </div>
</template>
<script>
import axios from "axios"
export default {
   data(){
    return  {
        loading:true
    }
   },
    async mounted(){
        await this.$nextTick();
        var LineChart = function (ctx) {
        this.ctx = ctx || document.querySelector('canvas').getContext('2d');
        this.gridSize = 10;
        this.gridColor = '#fff';
        this.space = 20;
        this.arrowSize = 10;
        this.pointSize = 6;
        this.canvasHeight = this.ctx.canvas.height;
        this.canvasWidth = this.ctx.canvas.width;
        }
        //入口函数
        LineChart.prototype.init = function (data) {
        this.drawGrid();
        this.drawXY();
        this.drawPointList(data);
        this.joinPoint();
        };
        LineChart.prototype.drawGrid = function () {
        var xCount = Math.floor(this.canvasHeight / this.gridSize);
        for (var i = 0; i < xCount; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * this.gridSize - 0.5);
            this.ctx.lineTo(this.canvasWidth, i * this.gridSize - 0.5);
            this.ctx.strokeStyle = this.gridColor;
            this.ctx.stroke();
        }
        var yCount = Math.floor(this.canvasWidth / this.gridSize);
        for (var i = 0; i < yCount; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(i * this.gridSize - 0.5, 0);
            this.ctx.lineTo(i * this.gridSize - 0.5, this.canvasHeight);
            this.ctx.strokeStyle = this.gridColor;
            this.ctx.stroke();
        }
        }
        LineChart.prototype.drawXY = function () {
        this.x0 = this.space;
        this.y0 = this.canvasHeight - this.space;
        this.ctx.beginPath();
        this.ctx.moveTo(this.x0, this.y0);
        this.ctx.lineTo(this.canvasWidth - this.space, this.y0);
        this.ctx.lineTo(this.canvasWidth - this.space - this.arrowSize, this.y0 + this.arrowSize / 2);
        this.ctx.lineTo(this.canvasWidth - this.space - this.arrowSize, this.y0 - this.arrowSize / 2);
        this.ctx.lineTo(this.canvasWidth - this.space, this.y0);
        this.ctx.strokeStyle = '#000';
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.moveTo(this.x0, this.y0);
        this.ctx.lineTo(this.space, this.space);
        this.ctx.lineTo(this.space + this.arrowSize / 2, this.space + this.arrowSize);
        this.ctx.lineTo(this.space - this.arrowSize / 2, this.space + this.arrowSize);
        this.ctx.lineTo(this.space, this.space);
        this.ctx.stroke();
        this.ctx.fill();
        }
        LineChart.prototype.drawPointList = function (data) {
        var _this = this;
        var oldPoint = {
            x: this.x0,
            y: this.y0
        };
        data.forEach(function (item, i) {
            var x = _this.x0 + item.x;
            var y = _this.y0 - item.y;
            _this.drawPoint(x, y);
            _this.joinPoint(oldPoint, {
            x: x,
            y: y
            });
            oldPoint = {
            x: x,
            y: y
            }
        });
        }
        LineChart.prototype.drawPoint = function (x, y) {
        this.ctx.moveTo(x - this.pointSize / 2, y - this.pointSize / 2);
        this.ctx.lineTo(x + this.pointSize / 2, y - this.pointSize / 2);
        this.ctx.lineTo(x + this.pointSize / 2, y + this.pointSize / 2);
        this.ctx.lineTo(x - this.pointSize / 2, y + this.pointSize / 2);
        this.ctx.closePath();
        this.ctx.fill();
        };
        LineChart.prototype.joinPoint = function (oldPoint, currPoint) {
            this.ctx.beginPath();
            oldPoint&&this.ctx.moveTo(oldPoint.x, oldPoint.y);
            oldPoint&&this.ctx.lineTo(currPoint.x, currPoint.y);
            oldPoint&&this.ctx.stroke();
        };
        
       var data = []

        var num = 0;
        let arr = await this.getData()
        
        data =  arr.data.data.reduce((prev,next)=>{
            prev.push({x:num+=4,y:parseInt(next.open*10000)-200})
            return prev; 
        },[])

        var lineChart = new LineChart();
        this.loading = false;
        lineChart.init(data);


   },
   methods:{
       getData(){
           return axios.get("https://api.coincap.io/v2/candles?exchange=poloniex&interval=h8&baseId=ethereum&quoteId=bitcoin")
       }
   }
}
</script>
