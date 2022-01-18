(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{41:function(e,n,t){},42:function(e,n,t){"use strict";t.r(n);var r=t(2),c=t.n(r),o=t(17),u=t.n(o),a=t(7),i=t(4),s=t(0),d=function(e){var n=e.person,t=e.deletePerson;return Object(s.jsxs)("p",{children:[n.name," ",n.number," ",Object(s.jsx)("button",{onClick:function(){return t(n.id)},children:"delete"})]})},l=function(e){var n=e.persons,t=e.searchByName,r=e.deletePerson;return Object(s.jsx)("div",{children:n.filter((function(e){return function(e,n){return!n||e.name.toLowerCase().search(n.toLowerCase())>-1}(e,t)})).map((function(e){return Object(s.jsx)(d,{person:e,deletePerson:r},e.id?e.id:e.name)}))})},b=function(e){var n=e.newPerson,t=e.addPerson,r=e.handleAddName,c=e.handleAddNumber;return Object(s.jsxs)("form",{onSubmit:t,children:[Object(s.jsxs)("div",{children:[Object(s.jsxs)("p",{children:["name:",Object(s.jsx)("input",{value:n.name,onChange:r})]}),Object(s.jsxs)("p",{children:["number:",Object(s.jsx)("input",{value:n.number,onChange:c})]})]}),Object(s.jsx)("div",{children:Object(s.jsx)("button",{type:"submit",children:"add"})})]})},h=function(e){var n=e.notification;return null===n?null:Object(s.jsx)("div",{className:n.type,children:n.message})},j=function(e){var n=e.searchByName,t=e.handleNameFilter;return Object(s.jsxs)("p",{children:["filter shown with ",Object(s.jsx)("input",{value:n,onChange:t})]})},f=t(3),m=t.n(f),p="/api/persons",O=function(){return m.a.get(p).then((function(e){return e.data}))},v=function(e){return m.a.post(p,e).then((function(e){return e.data}))},x=function(e){return m.a.delete("".concat(p,"/").concat(e)).then((function(e){return e.data}))},w=function(e,n){return m.a.put("".concat(p,"/").concat(e),n).then((function(e){return e.data}))},g=function(){var e=Object(r.useState)([]),n=Object(i.a)(e,2),t=n[0],c=n[1],o=Object(r.useState)({name:"",number:""}),u=Object(i.a)(o,2),d=u[0],f=u[1],m=Object(r.useState)(""),p=Object(i.a)(m,2),g=p[0],y=p[1],N=Object(r.useState)(null),P=Object(i.a)(N,2),E=P[0],k=P[1];Object(r.useEffect)((function(){O().then((function(e){console.log(e),c(e)}))}),[]);var C=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"success";k({message:e,type:n}),setTimeout((function(){k(null)}),5e3)};return Object(s.jsxs)("div",{children:[Object(s.jsx)("h1",{children:"Phonebook"}),Object(s.jsx)(j,{searchByName:g,handleNameFilter:function(e){e.preventDefault(),y(e.target.value)}}),Object(s.jsx)(h,{notification:E}),Object(s.jsx)("h2",{children:"Add a new"}),Object(s.jsx)(b,{newPerson:d,addPerson:function(e){e.preventDefault();var n=t.find((function(e){return e.name===d.name}));n?window.confirm("".concat(n.name," already in phonebook, replace the old number with new one?"))&&w(n.id,Object(a.a)(Object(a.a)({},n),{},{number:d.number})).then((function(e){c(t.map((function(t){return t.id!==n.id?t:e}))),f({name:"",number:""}),C("Person number updated successfully!","success")})).catch((function(){console.log("Error while updating number"),C("Error while updating number","error")})):v(Object(a.a)({},d)).then((function(e){c(t.concat(e)),f({name:"",number:""}),C("Person added successfully!","success")})).catch((function(){console.log("Error while saving new person"),C("Error while saving new person","error")}))},handleAddName:function(e){e.preventDefault();var n={};n.name=e.target.value,n.number=d.number,f(n)},handleAddNumber:function(e){e.preventDefault();var n={};n.name=d.name,n.number=e.target.value,f(n)}}),Object(s.jsx)("h2",{children:"Numbers"}),Object(s.jsx)(l,{persons:t,searchByName:g,deletePerson:function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Delete ".concat(n.name))&&x(e).then((function(n){c(t.filter((function(n){return n.id!==e}))),C("Person deleted successfully!","success")})).catch((function(){c(t.filter((function(n){return n.id!==e}))),console.log("Error while deleting person"),C("Error while deleting person","error")}))}})]})};t(41);u.a.render(Object(s.jsx)(c.a.StrictMode,{children:Object(s.jsx)(g,{})}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.f6b83951.chunk.js.map