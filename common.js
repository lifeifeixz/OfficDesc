(function () {
    var request = {
        /**
         * 获取url中的参数、目前只支持GET请求类型。
         *
         * @auther flys·Li
         * @since V1.0
         */
        getParameter: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null)
                return unescape(r[2]);
            return null;
        }
    }
    window.request = request;

    /**
     * 随着业务的拓展、终端类型的增加，现有的静态文案页面已经无法灵活应对不同的需求。
     * 为解决该问题，在此提出'约定式'解决方案。
     * 即:调用者在url中坠参(仅限GET方式)来声明需要隐藏的元素或者执行的操作。
     * 示例:demand={rent2:false}
     *
     * @param demand
     *            约定参数名
     *
     * @param {key,true/false}
     *            key是需要操作元素的class,true:隐藏元素、false或其余值都是显示元素
     *
     * @since 1.0
     *
     * @author flys·Li
     */
    var agreedControl = {
        demand: null,
        /**
         * 初始化需求参数
         *
         * @param demand
         *            主需求参数;
         * @auther flys·Li
         */
        init: function (demand) {
            this.demand = eval('(' + demand + ')');
        },
        /**
         * 主控制入口
         */
        control: function () {
            var d = this.demand;
            for (var key in d) {
                this.displayByClass(key, d[key] ? 'none' : 'block');
            }

        },
        /**
         * 控制元素的状态
         *
         * @auther lff
         */
        displayByClass: function (cls, sty) {

            var elements = [];
            if (Array.isArray(cls)) {
                for (var i = 0; i < cls.length; i++) {
                    elements.push(cls[i]);
                }
            } else {
                elements.push(cls);
            }
            for (var i = 0; i < elements.length; i++) {
                var classes = document.getElementsByClassName(elements[i]);
                for (var j = 0; j < classes.length; j++) {
                    classes[j].style.display = sty;
                }
            }
        }
    }
    window.agreedControl = agreedControl;
})()

function go(page) {
    window.location.href = page;
}
window.onload = function () {
    var business = request.getParameter("business");
    if (business != null) {
        var businessArr = business.split(",");
        displayByClass(businessArr, "none");
    }
    agreedControl.init(request.getParameter("demand"));
    agreedControl.control();
}

/**
 * 根据class设置元素的显示与隐藏
 *
 * @param {Object}
 *            cls 可以是一个字符，也可以是一个数组
 * @param {Object}
 *            sty block、none
 */
function displayByClass(cls, sty) {
    var elements = [];
    if (Array.isArray(cls)) {
        for (var i = 0; i < cls.length; i++) {
            elements.push(cls[i]);
        }
    } else {
        elements = elements.push(cls);
    }
    for (var i = 0; i < elements.length; i++) {
        var classes = document.getElementsByClassName(elements[i]);
        for (var j = 0; j < classes.length; j++) {
            classes[j].style.display = sty;
        }
    }
}