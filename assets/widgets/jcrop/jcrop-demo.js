function showCoords(a){$("#x1").val(a.x),$("#y1").val(a.y),$("#x2").val(a.x2),$("#y2").val(a.y2),$("#w").val(a.w),$("#h").val(a.h)}function clearCoords(){$("#coords input").val("")}$(function(){"use strict";$(".jcrop-basic").Jcrop()}),$(function(a){var b;a(".jcrop-handler").Jcrop({onChange:showCoords,onSelect:showCoords,onRelease:clearCoords},function(){b=this}),a("#coords").on("change","input",function(c){var d=a("#x1").val(),e=a("#x2").val(),f=a("#y1").val(),g=a("#y2").val();b.setSelect([d,f,e,g])})}),jQuery(function(a){function b(a){if(parseInt(a.w)>0){var b=i/a.w,c=j/a.h;h.css({width:Math.round(b*d)+"px",height:Math.round(c*e)+"px",marginLeft:"-"+Math.round(b*a.x)+"px",marginTop:"-"+Math.round(c*a.y)+"px"})}}var c,d,e,f=a("#preview-pane"),g=a("#preview-pane .preview-container"),h=a("#preview-pane .preview-container img"),i=g.width(),j=g.height();a(".jcrop-preview-big").Jcrop({onChange:b,onSelect:b,aspectRatio:i/j},function(){var a=this.getBounds();d=a[0],e=a[1],c=this,f.appendTo(c.ui.holder)})}),jQuery(function(a){function b(b){var c=a("<button />").addClass("btn btn-blue-alt");return b&&c.append(b),c}function c(b,c){a("#interface").prepend(a("<fieldset></fieldset>").attr("id",b).append(a("<legend></legend>").append(c),'<div class="btn-toolbar"><div class="btn-group"></div></div>'))}function d(b,c){return function(d){a(d.target).closest(".btn-group").find(".active").removeClass("active"),a(d.target).addClass("active");var e={};return e[b]=c,f.setOptions(e),!1}}function e(b){return function(c){return a(c.target).addClass("active"),f.animateTo(b,function(){a(c.target).closest(".btn-group").find(".active").removeClass("active")}),!1}}var f;a("#target").Jcrop({bgFade:!0,bgOpacity:.2,setSelect:[60,70,540,330]},function(){f=this}),a("#fadetog").change(function(){f.setOptions({bgFade:this.checked})}).attr("checked","checked"),a("#shadetog").change(function(){this.checked?a("#shadetxt").slideDown():a("#shadetxt").slideUp(),f.setOptions({shade:this.checked})}).attr("checked",!1);var g={bgc_buttons:"Change bgColor",bgo_buttons:"Change bgOpacity",anim_buttons:"Animate Selection"},h={anim1:[217,122,382,284],anim2:[20,20,580,380],anim3:[24,24,176,376],anim4:[347,165,550,355],anim5:[136,55,472,183]},j={Low:.2,Mid:.5,High:.8,Full:1},k={R:"#900",B:"#4BB6F0",Y:"#F0B207",G:"#46B81C",W:"white",K:"black"};for(i in g)c(i,g[i]);var l=1;for(i in h)a("#anim_buttons .btn-group").append(b(l++).click(e(h[i]))," ");a("#anim_buttons .btn-group").append(b("Bye!").click(function(b){return a(b.target).addClass("active"),f.animateTo([300,200,300,200],function(){this.release(),a(b.target).closest(".btn-group").find(".active").removeClass("active")}),!1}));for(i in j)a("#bgo_buttons .btn-group").append(b(i).click(d("bgOpacity",j[i]))," ");for(i in k)a("#bgc_buttons .btn-group").append(b(i).css({background:k[i],color:"K"==i||"R"==i?"white":"black"}).click(d("bgColor",k[i]))," ");a("#bgo_buttons .btn:first,#bgc_buttons .btn:last").addClass("active"),a("#interface").show()});