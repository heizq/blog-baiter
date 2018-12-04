

// 自定义 MathJax util 工具类

var MathJaxUtil = (function(jaxUtil){
    function getFormatFormula(str){
        var regex=/(?:(\${1,2}(?!\$))|(\\\()|(\\\[)|(\\begin\{equation\}))(.*?)(?:(\${1,2}(?!\$))|(\\\)|(\\\]|\\end\{equation\})))/gm;
        var myRe;
        while ((myRe = regex.exec(str)) !== null) {
            var msg = myRe[5];
            var repmsg = msg.replace(/</g,'< ');
            str = str.replace(msg,repmsg) ;
        }
        return str;
    };

    function isContainFormula(str){
        var reg=/(?:(\${1,2}(?!\$))|(\\\()|(\\\[)|(\\begin\{equation\}))(.*?)(?:(\${1,2}(?!\$))|(\\\)|(\\\]|\\end\{equation\})))/gm;
        return reg.test(str);

    };

    jaxUtil.update = function(obj,str){
        if(isContainFormula(str)){
            $(obj).append(getFormatFormula(str));
            MathJax.Hub.Queue(["Typeset",MathJax.Hub,obj.lastChild]);
        }else{
            $(obj).append(str);
        }
    };

    return jaxUtil;
}(MathJaxUtil || {}));


