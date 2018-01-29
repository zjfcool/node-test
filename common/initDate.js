module.exports={
  date2:function(num){
    return num>9?num:'0'+num;
  },
  initDate:function(timer){
    let date = new Date(timer*1000);
    return date.getFullYear()+'-'+(this.date2(date.getMonth()+1))+'-'+this.date2(date.getDate())+' '+this.date2(date.getHours())+':'+this.date2(date.getMinutes())+':'+this.date2(date.getSeconds());
  }
}
