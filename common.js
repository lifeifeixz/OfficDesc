(function() {
	var request = {
		/**
		 * 获取url中的参数、目前只支持GET请求类型。
		 * 
		 * @auther flys·Li
		 * @since V1.0
		 */
		getParameter : function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null)
				return unescape(r[2]);
			return null;
		}
	}
	window.request = request;

})()

function go(page) {
	window.location.href = page;
}
window.onload = function() {
	var business = request.getParameter("business");
	if (business != null) {
		var businessArr = business.split(",");
		displayByClass(businessArr, "none");
	}
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
		for ( var i = 0; i < cls.length; i++) {
			elements.push(cls[i]);
		}
	} else {
		elements = elements.push(cls);
	}
	for ( var i = 0; i < elements.length; i++) {
		var classes = document.getElementsByClassName(elements[i]);
		for ( var j = 0; j < classes.length; j++) {
			classes[j].style.display = sty;
		}
	}
}