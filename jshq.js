// in-browser content display

var JSHQ = function() {
    return {
        options: {
            
        },
        
        // Taken from Dojo
        _getBaseURL: function() {
            if(document && document.getElementsByTagName){
    			var scripts = document.getElementsByTagName("script");
    			var rePkg = /jshq.js(\W|$)/i;
    			for(var i = 0; i < scripts.length; i++){
    				var src = scripts[i].getAttribute("src");
    				if(!src){ continue; }
    				var m = src.match(rePkg);
    				if(m){
    					// find out where we came from
    					if(!JSHQ.options.baseURL){
    						JSHQ.options.baseURL = src.substring(0, m.index);
    					}
    					break;
    				}
    			}
    		}
    		return JSHQ.options.baseURL;
        },
        
        styleContent: function() {
            var baseURL = JSHQ._getBaseURL();
            var LAB = $LAB
                .script("http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js");
            if (!window.Template) {
                LAB
                .script(baseURL + "lib/wiky.js")
                .script(baseURL + "lib/wiky.lang.js");
            }
            LAB.block(JSHQ._stylePhase2);
        },
        _stylePhase2: function() {
            var baseURL = JSHQ.options.baseURL;
            
            // Brian Grinstead's updated version of Brandon Aaron's
            // outerHTML plugin for jQuery
            $.fn.outerHTML = function() {
                var doc = this[0] ? this[0].ownerDocument : document;
                return $('<div>', doc).append(this.eq(0).clone()).html();
            };
            
            $("<link>").attr({rel: "stylesheet", type: "text/css",
                href: baseURL + "lib/wiky.css"}).appendTo("head");
            $("<link>").attr({rel: "stylesheet", type: "text/css",
                href: baseURL + "lib/wiky.lang.css"}).appendTo("head");
            $("<link>").attr({rel: "stylesheet", type: "text/css",
                href: baseURL + "theme/style.css"}).appendTo("head");
            
            $.get(baseURL + "theme/contentwrap.html", function(data) {
                $ = jQuery;
                var currentContent = $("#content").outerHTML();
                var newContent = data.replace("%%HERE%%", currentContent);
                newContent = newContent.replace(/%%BASE%%/g, baseURL);
                $("#content").replaceWith(newContent);
                
                $(".wiki").each(function() {
                    var text = this.innerHTML;
                    var html = Wiky.toHtml(text);
                    $(this).replaceWith(html);
                });
            });
        }
    }
}();

// LAB.js (LABjs :: Loading And Blocking JavaScript)
// v0.7 (c) Kyle Simpson
// MIT License
(function(a){a.$LAB=function(){var o="undefined",d="string",i="head",g="body",m=true,c=false,b=a.setTimeout,k=a.document,h={head:k.getElementsByTagName(i),body:k.getElementsByTagName(g)},e={},l=null;if(typeof h[i]!==o&&h[i]!==null&&h[i].length>0){h[i]=h[i][0]}else{h[i]=null}if(typeof h[g]!==o&&h[g]!==null&&h[g].length>0){h[g]=h[g][0]}else{h[g]=null}function f(p){if(typeof p===d&&p.length>0){return/^(.*\/)?([^?\/#]*)(\?.*)?(#.*)?$/i.exec(p)[2].toLowerCase()}return""}function n(q){var p=k.getElementsByTagName("script"),r;for(r=0;r<p.length;r++){if(typeof p[r].src===d&&q===f(p[r].src)){return m}}return c}var j=function(u,v){u=!(!u);v=((typeof v===d)?v:i);var z=c,q=null,w=c,y=null,r={},s=[];function t(B){if((this.readyState&&this.readyState!=="complete"&&this.readyState!=="loaded")||B.done){return}this.onload=this.onreadystatechange=null;B.done=m;for(var A in r){if((r[A]!==Object.prototype[A])&&!(r[A].done)){return}}z=m;if(q!==null){q()}}function p(D,C,E,A){var B=f(D);if(typeof C===o){C="text/javascript"}if(typeof E===o){E="javascript"}A=!(!A);if(!A&&(typeof e[B]!==o||n(B))){return}if(typeof r[B]===o){r[B]={done:c}}else{r[B]["done"]=c}e[B]=m;w=m;(function(F){b(function(){var H=null;if(((H=h[F])===null)&&(typeof(H=k.getElementsByTagName(F)[0])===o||H===null)){b(arguments.callee,25);return}var G=k.createElement("script");G.setAttribute("type",C);G.setAttribute("language",E);G.onload=G.onreadystatechange=function(){t.call(G,r[B])};G.setAttribute("src",D);H.appendChild(G)},0)})(v)}function x(A,B){if(u){s.push(A);return B}else{return A()}}y={script:function(){var A=arguments;return x(function(){for(var B=0;B<A.length;B++){if(A[B].constructor===Array){A.callee.apply(null,A[B])}else{if(typeof A[B]==="object"){p(A[B]["src"],A[B]["type"],A[B]["language"],A[B]["allowDup"])}else{if(typeof A[B]===d){p(A[B])}}}}return y},y)},block:function(B){if(typeof B!=="function"){B=function(){}}var A=B,C=new j(m,v);B=function(){try{A()}catch(D){}C.trigger()};return x(function(){if(w&&!z){q=B}else{b(B,0)}return C},C)},toHEAD:function(){return x(function(){v=i;return y},y)},toBODY:function(){return x(function(){v=g;return y},y)},trigger:function(){for(var A=0;A<s.length;A++){s[A]()}}};return y};l={script:function(){return(new j()).script.apply(null,arguments)},block:function(){return(new j()).block.apply(null,arguments)},toHEAD:function(){return(new j()).toHEAD()},toBODY:function(){return(new j()).toBODY()}};return l}()})(window);
