function _1(md){return(
md`# HW2 Strong baseline `
)}

function _data(FileAttachment){return(
FileAttachment("data.json").json()
)}

function _yCounts(){return(
[]
)}

function _constellations(data){return(
data.map(item => item.Constellation)
)}

function _5(yCounts,constellations,data)
{
  yCounts.length = 0; //將yCounts清空
  var minCon = Math.min(...constellations); //最早出生年
  var maxCon = Math.max(...constellations); //最晚出生年
  for (var y=minCon; y<=maxCon; y++) { 
    //所有年份都建立兩個Object，一個存放男性資料，一個存放女性資料
    yCounts.push({constellations:y, gender:"male", count:0}); 
    //Object包含：1. 出生年，2.男性，3.人數(設為0)
    yCounts.push({constellations:y, gender:"female", count:0}); 
    //Object包含：1. 出生年，2.女性，3.人數(設為0)
  }
  data.forEach (x=> {
    var i = (x.Constellation-minCon)*2 + (x.Gender== "男" ? 0 : 1); 
    yCounts[i].count++;
    //讀取data array，加總每個年份出生的人
  })
  return yCounts
}


function _constellation_c(){return(
["牡羊座", "金牛座", "雙子座", "巨蟹座", "獅子座", "處女座", "天秤座", "天蠍座", "射手座", "摩羯座" ,"水瓶座", "雙魚座"]
)}

function _plotData(yCounts,constellation_c){return(
yCounts.map(item => ({
  ...item,
  constellation: constellation_c[item.constellations]
}))
)}

function _plot1(Inputs){return(
Inputs.form({
	mt:  Inputs.range([0, 100], {label: "marginTop", step: 1}),
	mr:  Inputs.range([0, 100], {label: "marginRight", step: 1}),
	mb:  Inputs.range([0, 100], {label: "marginBottom", step: 1}),
	ml:  Inputs.range([0, 100], {label: "marginLeft", step: 1}),
})
)}

function _9(Plot,plot1,plotData){return(
Plot.plot({  

	marginTop: plot1.mt, 
	marginRight: plot1.mr, 
	marginBottom: plot1.mb, 
	marginLeft: plot1.ml,   

  grid: true,
	y: {label: "count"},  
	marks: [    
		Plot.ruleY([0]),
    Plot.barY(plotData, {x: "constellation", y: "count", tip: true , fill:"gender"}),
	 ]
})
)}

function _10(Plot,plot1,data,constellation_c){return(
Plot.plot({  
  width: 800,
	marginTop: plot1.mt, 
	marginRight: plot1.mr, 
	marginBottom: plot1.mb, 
	marginLeft: plot1.ml,   
	y: {grid: true, label: "count"},  
	marks: [    
		Plot.rectY(data, Plot.binX({y:"count"}, { x:"Constellation", interval:1, fill:"Gender", tip: true })),    
		Plot.gridY({ interval: 1, stroke: "white", strokeOpacity: 0.5 }),
    Plot.ruleY([0]),
    Plot.axisX({
      tickFormat: d => {
        return constellation_c[d];
      }
    })
	 ]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data.json", {url: new URL("../data.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("yCounts")).define("yCounts", _yCounts);
  main.variable(observer("constellations")).define("constellations", ["data"], _constellations);
  main.variable(observer()).define(["yCounts","constellations","data"], _5);
  main.variable(observer("constellation_c")).define("constellation_c", _constellation_c);
  main.variable(observer("plotData")).define("plotData", ["yCounts","constellation_c"], _plotData);
  main.variable(observer("viewof plot1")).define("viewof plot1", ["Inputs"], _plot1);
  main.variable(observer("plot1")).define("plot1", ["Generators", "viewof plot1"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","plot1","plotData"], _9);
  main.variable(observer()).define(["Plot","plot1","data","constellation_c"], _10);
  return main;
}
