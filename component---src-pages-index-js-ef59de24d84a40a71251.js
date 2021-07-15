webpackJsonp([35783957827783],{200:function(t,e,r){t.exports=r(201)},201:function(t,e){var r=r||{};!function(t){t.less=function(t,e,r){return r(t,e)<0},t.exchange=function(t,e,r){var i=t[e];t[e]=t[r],t[r]=i};var e=function(t){this.value=t,this.next=null};t.StackNode=e;var r=function(){this.N=0,this.first=null};r.prototype.push=function(t){this.first=this._push(this.first,t)},r.prototype._push=function(e,r){if(null==e)return this.N++,new t.StackNode(r);var i=e;return this.N++,e=new t.StackNode(r),e.next=i,e},r.prototype.pop=function(){if(null!=this.first){var t=this.first,e=t.value;return this.first=t.next,this.N--,e}},r.prototype.size=function(){return this.N},r.prototype.isEmpty=function(){return 0==this.N},r.prototype.peep=function(){if(null!=this.first)return this.first.value},r.prototype.toArray=function(){var t=[];for(x=this.first;null!=x;)t.push(x.value),x=x.next;return t},t.Stack=r;var i=function(t){this.value=t,this.next=null};t.QueueNode=i;var s=function(){this.first=null,this.last=null,this.N=0};s.prototype.enqueue=function(e){var r=this.last;this.last=new t.QueueNode(e),null!=r&&(r.next=this.last),null==this.first&&(this.first=this.last),this.N++},s.prototype.dequeue=function(){if(null!=this.first){var t=this.first,e=t.value;return this.first=t.next,null==this.first&&(this.last=null),this.N--,e}},s.prototype.size=function(){return this.N},s.prototype.isEmpty=function(){return 0==this.N},s.prototype.toArray=function(){for(var t=[],e=this.first;null!=e;)t.push(e.value),e=e.next;return t},t.Queue=s;var o=function(t){this.s=[],this.N=0,t||(t=function(t,e){return t-e}),this.compare=t};o.prototype.enqueue=function(t){for(;this.s.lengh<=this.N+1;)this.s.push(0);this.s[++this.N]=t,this.swim(this.N)},o.prototype.swim=function(e){for(;e>1;){var r=Math.floor(e/2);if(!t.less(this.s[e],this.s[r],this.compare))break;t.exchange(this.s,e,r),e=r}},o.prototype.delMin=function(){if(0!=this.N){var e=this.s[1];return t.exchange(this.s,1,this.N--),this.sink(1),e}},o.prototype.sink=function(e){for(;2*e<=this.N;){var r=2*e;if(r<this.N&&t.less(this.s[r+1],this.s[r],this.compare)&&r++,!t.less(this.s[r],this.s[e],this.compare))break;t.exchange(this.s,r,e),e=r}},o.prototype.size=function(){return this.N},o.prototype.isEmpty=function(){return 0==this.N},t.MinPQ=o;var n=function(t){this.id=[];for(var e=0;e<t;++e)this.id.push(e)};n.prototype.union=function(t,e){var r=this.root(t),i=this.root(e);i!=r&&(this.id[i]=r)},n.prototype.root=function(t){for(;this.id[t]!=t;)t=this.id[t];return t},n.prototype.connected=function(t,e){return this.root(t)==this.root(e)},t.QuickUnion=n;var h=function(t,e){this.keys=[],this.pq=[],this.qp=[];for(var r=0;r<=t;++r)this.keys.push(null),this.pq.push(0),this.qp.push(-1);this.N=0,e||(e=function(t,e){return t-e}),this.compare=e};h.prototype.insert=function(t,e){this.keys[t]=e,this.pq[++this.N]=t,this.qp[t]=this.N,this.swim(this.N)},h.prototype.decreaseKey=function(e,r){t.less(r,this.keys[e],this.compare)&&(this.keys[e]=r,this.swim(this.qp[e]))},h.prototype.minKey=function(){return this.keys[this.pq[1]]},h.prototype.min=function(){return this.pq[1]},h.prototype.delMin=function(){var e=this.pq[1];return t.exchange(this.pq,1,this.N),this.qp[this.pq[1]]=1,this.qp[this.pq[this.N]]=-1,this.keys[this.pq[this.N]]=null,this.N--,this.sink(1),e},h.prototype.swim=function(e){for(;e>1;){var r=Math.floor(e/2);if(!t.less(this.keys[this.pq[e]],this.keys[this.pq[r]],this.compare))break;t.exchange(this.pq,e,r),this.qp[this.pq[e]]=e,this.qp[this.pq[r]]=r,e=r}},h.prototype.sink=function(e){for(;2*e<=this.N;){var r=2*e;if(r<this.N&&t.less(this.keys[this.pq[r+1]],this.keys[this.pq[r]],this.compare)&&r++,!t.less(this.keys[this.pq[r]],this.keys[this.pq[e]],this.compare))break;t.exchange(this.pq,e,r),this.qp[this.pq[e]]=e,this.qp[this.pq[r]]=r,e=r}},h.prototype.containsIndex=function(t){return this.qp[t]!=-1},h.prototype.isEmpty=function(){return 0==this.N},h.prototype.size=function(){return this.N},t.IndexMinPQ=h;var a=function(t){this.V=t,this.adjList=[],this.nodeInfo=[],this.edges={};for(var e=0;e<t;++e)this.adjList.push([]),this.nodeInfo.push({})};a.prototype.addEdge=function(e,r){this.adjList[e].push(r),this.adjList[r].push(e);var i=e+"_"+r;e>r&&(i=r+"_"+e),this.edges[i]=new t.Edge(e,r,0)},a.prototype.adj=function(t){return this.adjList[t]},a.prototype.node=function(t){return this.nodeInfo[t]},a.prototype.edge=function(t,e){var r=t+"_"+e;return t>e&&(r=e+"_"+t),r in this.edges?this.edges[r]:null},t.Graph=a;var u=function(t){this.V=t,this.adjList=[],this.nodeInfo=[],this.edges={};for(var e=0;e<t;++e)this.adjList.push([]),this.nodeInfo.push({})};u.prototype.addEdge=function(e,r){this.adjList[e].push(r);var i=e+"_"+r;this.edges[i]=new t.Edge(e,r,0)},u.prototype.edge=function(t,e){var r=t+"_"+e;return r in this.edges?this.edges[r]:null},u.prototype.adj=function(t){return this.adjList[t]},u.prototype.node=function(t){return this.nodeInfo[t]},u.prototype.reverse=function(){for(var t=new u(this.V),e=0;e<this.V;++e)for(var r=this.adjList[e],i=0;i<r.length;++i){var s=r[i];t.addEdge(s,e)}return t},t.DiGraph=u;var p=function(t,e,r){this.v=t,this.w=e,this.weight=r};p.prototype.either=function(){return this.v},p.prototype.other=function(t){return t==this.v?this.w:this.v},p.prototype.from=function(){return this.v},p.prototype.to=function(){return this.w},t.Edge=p;var d=function(t){this.V=t,this.adjList=[],this.nodeInfo=[];for(var e=0;e<t;++e)this.adjList.push([]),this.nodeInfo.push({})};d.prototype.adj=function(t){return this.adjList[t]},d.prototype.edge=function(t,e){for(var r=this.adjList[t],i=0;i<r.length;++i){var s=r[i].other(t);if(s==e)return r[i]}return null},d.prototype.node=function(t){return this.nodeInfo[t]},d.prototype.addEdge=function(t){var e=t.either(),r=t.other(e);this.adjList[e].push(t),this.adjList[r].push(t)},t.WeightedGraph=d;var f=function(t){d.call(this,t)};f.prototype=Object.create(t.WeightedGraph.prototype),f.prototype.addEdge=function(t){var e=t.from();this.adjList[e].push(t)},f.prototype.edge=function(t,e){for(var r=this.adjList[t],i=0;i<r.length;++i){var s=r[i].other(t);if(s==e)return r[i]}return null},f.prototype.toDiGraph=function(){for(var e=new t.DiGraph(this.V),r=0;r<this.V;++r)for(var i=this.adjList[r],s=0;s<i.length;++s){var o=i[s],n=o.other(r);e.addEdge(r,n)}return e},t.WeightedDiGraph=f;var c=function(t,e,r){this.v=t,this.w=e,this.capacity=r,this.flow=0};c.prototype.residualCapacityTo=function(t){return t==this.v?this.flow:this.capacity-this.flow},c.prototype.addResidualFlowTo=function(t,e){t==this.v?this.flow-=e:t==this.w&&(this.flow+=e)},c.prototype.from=function(){return this.v},c.prototype.to=function(){return this.w},c.prototype.other=function(t){return t==this.v?this.w:this.v},t.FlowEdge=c;var l=function(t){this.V=t,this.adjList=[],this.nodeInfo=[];for(var e=0;e<t;++e)this.adjList.push([]),this.nodeInfo.push({})};l.prototype.node=function(t){return this.nodeInfo[t]},l.prototype.edge=function(t,e){for(var r=this.adjList[t],i=0;i<r.length;++i){var s=r[i].other(t);if(s==e)return r[i]}return null},l.prototype.addEdge=function(t){var e=t.from();this.adjList[e].push(t);var r=t.other(e);this.adjList[r].push(t)},l.prototype.adj=function(t){return this.adjList[t]},t.FlowNetwork=l;var v=function(t,e){this.s=e;var r=t.V;this.marked=[],this.edgeTo=[];for(var i=0;i<r;++i)this.marked.push(!1),this.edgeTo.push(-1);this.dfs(t,e)};v.prototype.dfs=function(t,e){this.marked[e]=!0;for(var r=t.adj(e),i=0;i<r.length;++i){var s=r[i];this.marked[s]||(this.edgeTo[s]=e,this.dfs(t,s))}},v.prototype.hasPathTo=function(t){return this.marked[t]},v.prototype.pathTo=function(e){var r=new t.Stack;if(e==this.s)return[e];for(var i=e;i!=this.s;i=this.edgeTo[i])r.push(i);return r.push(this.s),r.toArray()},t.DepthFirstSearch=v;var g=function(e,r){var i=e.V;this.s=r;var s=new t.Queue;s.enqueue(r),this.marked=[],this.edgeTo=[];for(var o=0;o<i;++o)this.marked.push(!1),this.edgeTo.push(-1);for(;!s.isEmpty();){var o=s.dequeue();this.marked[o]=!0;for(var n=e.adj(o),h=0;h<n.length;++h){var a=n[h];this.marked[a]||(this.edgeTo[a]=o,s.enqueue(a))}}};g.prototype.hasPathTo=function(t){return this.marked[t]},g.prototype.pathTo=function(e){var r=new t.Stack;if(e==this.s)return[e];for(var i=e;i!=this.s;i=this.edgeTo[i])r.push(i);return r.push(this.s),r.toArray()},t.BreadthFirstSearch=g;var m=function(t){this.count=0;var e=t.V;this.marked=[],this.id=[];for(var r=0;r<e;++r)this.marked.push(!1),this.id.push(-1);for(var r=0;r<e;++r)this.marked[r]||(this.dfs(t,r),this.count++)};m.prototype.dfs=function(t,e){this.marked[e]=!0,this.id[e]=this.count;for(var r=t.adj(e),i=0;i<r.length;++i){var s=r[i];this.marked[s]||this.dfs(t,s)}},m.prototype.componentId=function(t){return this.id[t]},m.prototype.componentCount=function(){return this.count},t.ConnectedComponents=m;var y=function(e){this.postOrder=new t.Stack,this.marked=[];for(var r=e.V,i=0;i<r;++i)this.marked.push(!1);for(var i=0;i<r;++i)this.marked[i]||this.dfs(e,i)};y.prototype.dfs=function(t,e){this.marked[e]=!0;for(var r=t.adj(e),i=0;i<r.length;++i){var s=r[i];this.marked[s]||this.dfs(t,s)}this.postOrder.push(e)},y.prototype.order=function(){return this.postOrder.toArray()},t.TopologicalSort=y;var k=function(e){var r=e.V;this.count=0,this.marked=[],this.id=[];for(var i=0;i<r;++i)this.marked.push(!1),this.id.push(-1);for(var s=new t.TopologicalSort(e.reverse()).order(),o=0;o<s.length;++o){var i=s[o];this.marked[i]||(this.dfs(e,i),this.count++)}};k.prototype.dfs=function(t,e){this.marked[e]=!0,this.id[e]=this.count;for(var r=t.adj(e),i=0;i<r.length;++i){var s=r[i];this.marked[s]||this.dfs(t,s)}},k.prototype.componentId=function(t){return this.id[t]},k.prototype.componentCount=function(){return this.count},t.StronglyConnectedComponents=k;var w=function(e){for(var r=e.V,i=new t.MinPQ(function(t,e){return t.weight-e.weight}),s=0;s<e.V;++s)for(var o=e.adj(s),n=0;n<o.length;++n){var h=o[n];h.either()==s&&i.enqueue(h)}this.mst=[];for(var a=new t.QuickUnion(r);!i.isEmpty()&&this.mst.length<r-1;){var h=i.delMin(),s=h.either(),u=h.other(s);a.connected(s,u)||(a.union(s,u),this.mst.push(h))}};t.KruskalMST=w;var E=function(e){var r=e.V;this.marked=[];for(var i=0;i<r;++i)this.marked.push(!1);for(this.pq=new t.MinPQ(function(t,e){return t.weight-e.weight}),this.mst=[],this.visit(e,0);!this.pq.isEmpty()&&this.mst.length<r-1;){var s=this.pq.delMin(),i=s.either(),o=s.other(i);this.marked[i]&&this.marked[o]||(this.mst.push(s),this.marked[i]||this.visit(e,i),this.marked[o]||this.visit(e,o))}};E.prototype.visit=function(t,e){this.marked[e]=!0;for(var r=t.adj(e),i=0;i<r.length;++i){var s=r[i];this.marked[s.other(e)]||this.pq.enqueue(s)}},t.LazyPrimMST=E;var q=function(e){var r=e.V;this.pq=new t.IndexMinPQ(r,function(t,e){return t.weight-e.weight}),this.marked=[];for(var i=0;i<r;++i)this.marked.push(!1);for(this.mst=[],this.visit(e,0);!this.pq.isEmpty();){var s=this.pq.minKey(),o=this.pq.delMin();this.mst.push(s),this.marked[o]||this.visit(e,o)}};q.prototype.visit=function(t,e){this.marked[e]=!0;for(var r=t.adj(e),i=0;i<r.length;++i){var s=r[i],o=s.other(e);this.marked[o]||(this.pq.containsIndex(o)?this.pq.decreaseKey(o,s):this.pq.insert(o,s))}},t.EagerPrimMST=q;var j=function(e,r){var i=e.V;this.s=r,this.marked=[],this.edgeTo=[],this.cost=[],this.pq=new t.IndexMinPQ(i,function(t,e){return e});for(var s=0;s<i;++s)this.marked.push(!1),this.edgeTo.push(null),this.cost.push(Number.MAX_VALUE);for(this.cost[r]=0,this.pq.insert(r,this.cost[r]);!this.pq.isEmpty();){var s=this.pq.delMin();this.marked[s]=!0;for(var o=e.adj(s),n=0;n<o.length;++n){var h=o[n];this.relax(h)}}};j.prototype.relax=function(t){var e=t.from(),r=t.to();this.cost[r]>this.cost[e]+t.weight&&(this.cost[r]=this.cost[e]+t.weight,this.edgeTo[r]=t,this.pq.containsIndex(r)?this.pq.decreaseKey(r,this.cost[r]):this.pq.insert(r,this.cost[r]))},j.prototype.hasPathTo=function(t){return this.marked[t]},j.prototype.pathTo=function(e){for(var r=new t.Stack,i=e;i!=this.s;i=this.edgeTo[i].other(i))r.push(this.edgeTo[i]);return r.toArray()},j.prototype.distanceTo=function(t){return this.cost[t]},t.Dijkstra=j;var T=function(t,e){var r=t.V;this.s=e,this.marked=[],this.edgeTo=[],this.cost=[];for(var i=0;i<r;++i)this.marked.push(!1),this.edgeTo.push(null),this.cost.push(Number.MAX_VALUE);this.cost[e]=0,this.marked[e]=!0;for(var s=0;s<r;++s)for(var i=0;i<r;++i)for(var o=t.adj(i),n=0;n<o.length;++n){var h=o[n];this.relax(h)}};T.prototype.relax=function(t){var e=t.from(),r=t.to();this.cost[r]>this.cost[e]+t.weight&&(this.cost[r]=this.cost[e]+t.weight,this.marked[r]=!0,this.edgeTo[r]=t)},T.prototype.hasPathTo=function(t){return this.marked[t]},T.prototype.pathTo=function(e){for(var r=new t.Stack,i=e;i!=this.s;i=this.edgeTo[i].other(i))r.push(this.edgeTo[i]);return r.toArray()},T.prototype.distanceTo=function(t){return this.cost[t]},t.BellmanFord=T;var N=function(e,r){var i=e.V;this.s=r,this.marked=[],this.edgeTo=[],this.cost=[];for(var s=0;s<i;++s)this.marked.push(!1),this.edgeTo.push(null),this.cost.push(Number.MAX_VALUE);this.cost[r]=0,this.marked[r]=!0;for(var o=new t.TopologicalSort(e.toDiGraph()).order(),n=0;n<o.length;++n)for(var s=o[n],h=e.adj(s),a=0;a<h.length;++a){var u=h[a];this.relax(u)}};N.prototype.relax=function(t){var e=t.from(),r=t.to();this.cost[r]>this.cost[e]+t.weight&&(this.cost[r]=this.cost[e]+t.weight,this.marked[r]=!0,this.edgeTo[r]=t)},N.prototype.hasPathTo=function(t){return this.marked[t]},N.prototype.pathTo=function(e){for(var r=new t.Stack,i=e;i!=this.s;i=this.edgeTo[i].other(i))r.push(this.edgeTo[i]);return r.toArray()},N.prototype.distanceTo=function(t){return this.cost[t]},t.TopologicalSortShortestPaths=N;var b=function(t,e,r){this.value=0;var i=(t.V,Number.MAX_VALUE);for(this.marked=null,this.edgeTo=null,this.s=e,this.t=r;this.hasAugmentedPath(t);){for(var s=this.t;s!=this.s;s=this.edgeTo[s].other(s))i=Math.min(i,this.edgeTo[s].residualCapacityTo(s));for(var s=this.t;s!=this.s;s=this.edgeTo[s].other(s))this.edgeTo[s].addResidualFlowTo(s,i);this.value+=i}};b.prototype.hasAugmentedPath=function(e){var r=e.V;this.marked=[],this.edgeTo=[];for(var i=0;i<r;++i)this.marked.push(!1),this.edgeTo.push(null);var s=new t.Queue;for(s.enqueue(this.s),this.marked[this.s]=!0;!s.isEmpty();)for(var i=s.dequeue(),o=e.adj(i),n=0;n<o.length;++n){var h=o[n],a=h.other(i);if(!this.marked[a]&&h.residualCapacityTo(a)>0){if(this.edgeTo[a]=h,this.marked[a]=!0,a==this.t)return!0;s.enqueue(a)}}return!1},b.prototype.minCut=function(t){for(var e=[],r=t.V,i=0;i<r;++i)for(var s=t.adj(i),o=0;o<s.length;++o){var n=s[o];n.from()==i&&0==n.residualCapacityTo(n.other(i))&&e.push(n)}return e},t.FordFulkerson=b}(r);var t=t||{};t&&(t.exports=r)},65:function(t,e){"use strict";function r(t){if(null===t||void 0===t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}function i(){try{if(!Object.assign)return!1;var t=new String("abc");if(t[5]="de","5"===Object.getOwnPropertyNames(t)[0])return!1;for(var e={},r=0;r<10;r++)e["_"+String.fromCharCode(r)]=r;var i=Object.getOwnPropertyNames(e).map(function(t){return e[t]});if("0123456789"!==i.join(""))return!1;var s={};return"abcdefghijklmnopqrst".split("").forEach(function(t){s[t]=t}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},s)).join("")}catch(t){return!1}}var s=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;t.exports=i()?Object.assign:function(t,e){for(var i,h,a=r(t),u=1;u<arguments.length;u++){i=Object(arguments[u]);for(var p in i)o.call(i,p)&&(a[p]=i[p]);if(s){h=s(i);for(var d=0;d<h.length;d++)n.call(i,h[d])&&(a[h[d]]=i[h[d]])}}return a}},112:function(t,e,r){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function s(t){var e=t.location,r=(0,o.useState)(e.search.replace("?","")),i=r[0],s=r[1],h=(0,o.useState)(""),a=h[0],u=h[1],d=(0,o.useState)([]),c=d[0],l=d[1];return(0,o.useEffect)(function(){fetch("https://api.scryfall.com/sets").then(function(t){return t.json()}).then(function(t){t.data&&l(t.data.filter(function(t){return!t.parent_set_code&&!["spellbook","promo","funny","box","duel_deck","commander"].includes(t.set_type)&&!t.foil_only}).sort(function(t){return t.released_at}))})},[]),n.default.createElement("div",null,"expansion:",n.default.createElement("select",{value:i,onChange:p(s),onBlur:p(s)},c.map(function(t){return n.default.createElement("option",{value:t.code,key:t.id},t.code.toUpperCase()," - ",t.name)})),n.default.createElement("br",null),"openMana:",n.default.createElement("input",{type:"text",value:a,placeholder:"ur",onChange:p(u)}),n.default.createElement("br",null),n.default.createElement(f,{openMana:a,expansion:i}))}e.__esModule=!0,e.default=s;var o=r(1),n=i(o),h=r(200),a=i(h),u="wubrg".split(""),p=function(t){return function(e){return t(e.target.value)}},d=function(t,e){t=t.toUpperCase().match(/[WUBRGC]/g);var r=new a.default.FlowNetwork(14),i=0,s=13,o={W:1,U:2,B:3,R:4,G:5,C:6},n={W:7,U:8,B:9,R:10,G:11,C:12};t.forEach(function(t){return r.addEdge(new a.default.FlowEdge(i,o[t],1))});var h=0;e.toUpperCase().replace("{X}","").match(/\{([0-9]+|[WUBRG])\}/g).map(function(t){return t.replace("{","").replace("}","")}).forEach(function(t){u.includes(t.toLowerCase())?(r.addEdge(new a.default.FlowEdge(n[t],s,1)),h+=1):(r.addEdge(new a.default.FlowEdge(n.C,s,parseInt(t,10))),h+=parseInt(t,10))}),r.addEdge(new a.default.FlowEdge(o.W,n.W,1e3)),r.addEdge(new a.default.FlowEdge(o.U,n.U,1e3)),r.addEdge(new a.default.FlowEdge(o.B,n.B,1e3)),r.addEdge(new a.default.FlowEdge(o.R,n.R,1e3)),r.addEdge(new a.default.FlowEdge(o.G,n.G,1e3)),r.addEdge(new a.default.FlowEdge(o.W,n.C,1e3)),r.addEdge(new a.default.FlowEdge(o.U,n.C,1e3)),r.addEdge(new a.default.FlowEdge(o.B,n.C,1e3)),r.addEdge(new a.default.FlowEdge(o.R,n.C,1e3)),r.addEdge(new a.default.FlowEdge(o.G,n.C,1e3)),r.addEdge(new a.default.FlowEdge(o.C,n.C,1e3));var p=new a.default.FordFulkerson(r,i,s).value;return p===h},f=function(t){var e=t.openMana,r=t.expansion,i=(0,o.useState)([]),s=i[0],h=i[1];return(0,o.useEffect)(function(){if(!r)return void h([]);""===e&&(e="wubrg");var t=e.split("").filter(function(t){return u.includes(t.toLowerCase())}).concat(["colorless"]).map(function(t){return"c:"+t}).join(" or "),i="https://api.scryfall.com/cards/search?order=cmc&q=",s=i+"s:"+r+"+(t:instant or o:flash)+("+t+")";fetch(s).then(function(t){return t.json()}).then(function(t){t.data&&h(t.data.filter(function(t){return 0===e.length||d(e,t.mana_cost||t.card_faces[0].mana_cost)}).map(function(t){return(t.image_uris||t.card_faces[0].image_uris).normal}))})},[e,r]),n.default.createElement("div",null,n.default.createElement("div",{style:{maxWidth:1e3}},s.map(function(t){return n.default.createElement("img",{width:"200",src:t,alt:"",key:t})})),n.default.createElement("br",null))};t.exports=e.default}});
//# sourceMappingURL=component---src-pages-index-js-ef59de24d84a40a71251.js.map