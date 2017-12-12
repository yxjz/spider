/**
 * Created by Administrator on 2017/12/11.
 */
const axios = require('axios');
const cherrio = require('cheerio');
(async()=>{
  const res = await axios.get('http://www.acfun.cn/a/ac4120051');
  const html = res.data;
  const $ = cherrio.load(html);
  const articleContent = $('.article-content');
  //const doms =articleContent.children('p>img, div');
  const dom = $(articleContent);
  const content = getTextOrImg(dom,[]);
  /*doms.map((i,d)=>{
    const text = $(d).text();
    if(text){
      content.push(text)
    }else if(d.name==='img'){
      const src = $(d).attr('src');
      content.push(src)
    }
  });*/
  function getTextOrImg(dom,arr) {
    const d = $(dom);
    const children = d.children();
    if(d.text()){
      arr.push(d.text());
    }
    if(children.length===0){
      if(d['0'].name==='img'){
        arr.push(d.attr('src'))
      }
    } else{
      for(let i=0;i<children.length;i++){
        const child = children[i];
        getTextOrImg(child,arr)
      }
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