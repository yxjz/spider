/**
 * Created by Administrator on 2017/12/11.
 */
const axios = require('axios');
const cherrio = require('cheerio');
(async()=>{
  const res = await axios.get('http://so.gushiwen.org/view_49386.aspx');
  const html = res.data;
  const $ = cherrio.load(html);
  const articleContent = $('.cont');
  const dom =articleContent.children('div>h1,div>.contson');
  const content = getTextOrImg(dom,[]);
    function getTextOrImg(dom,arr) {
    const d = $(dom);
    const children = d.children();
    if(d.text()){
      arr.push(d.text());
    }
        return arr;
  }
console.log(content)
})()
  .then(r=>{
    process.exit(0)
  })
  .catch(e=>{
    console.log(e);
    process.exit(1);
  })