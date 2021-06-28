(function($){

    !function(a){function f(a,b){if(!(a.originalEvent.touches.length>1)){a.preventDefault();var c=a.originalEvent.changedTouches[0],d=document.createEvent("MouseEvents");d.initMouseEvent(b,!0,!0,window,1,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null),a.target.dispatchEvent(d)}}if(a.support.touch="ontouchend"in document,a.support.touch){var e,b=a.ui.mouse.prototype,c=b._mouseInit,d=b._mouseDestroy;b._touchStart=function(a){var b=this;!e&&b._mouseCapture(a.originalEvent.changedTouches[0])&&(e=!0,b._touchMoved=!1,f(a,"mouseover"),f(a,"mousemove"),f(a,"mousedown"))},b._touchMove=function(a){e&&(this._touchMoved=!0,f(a,"mousemove"))},b._touchEnd=function(a){e&&(f(a,"mouseup"),f(a,"mouseout"),this._touchMoved||f(a,"click"),e=!1)},b._mouseInit=function(){var b=this;b.element.bind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),c.call(b)},b._mouseDestroy=function(){var b=this;b.element.unbind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),d.call(b)}}}(jQuery);

    /* 2021.01.13. 설문조사 추가 */
    $.fn.surveyProgress = function(options){
        var thisObj = $(this);
        var setting = $.extend({
            maxstep : 0,
            step : 0
        }, options);

        $(function(){
            var gage = 100/setting.maxstep;
            thisObj.find("span").css({width:(gage*(setting.step-1))+"%"}).animate({width:(gage*setting.step)+"%"});

            if(setting.step == 3 || setting.step == 4 || setting.step == 5 || setting.step == 8) {
                $(".survey_header").find("div").eq(0).find("p").css({"color":"#191919"});
                $(".survey_progress").find("span").css({"background":"black"});
                $(".survey_next").css({"background":"black"});
                $(".survey_question").find("p").css({"color":"white"});
            }
        });
    }

    $.fn.surveyEmo = function(options){
        var thisObj = $(this);
        var setting = $.extend({
            index : 1
        }, options);

        $(function(){
            var area = new Array();
            var areasize = 0;

            thisObj.find(".survey_select").append('<div class="survey_graduation"></div>');
            //thisObj.find(".survey_select").append('<div class="survey_touch_area"></div>');
            for(i=0; i<5; i++) {
                thisObj.find(".survey_graduation").append('<div style="left:'+(25*i)+'%"></div>');
                //thisObj.find(".survey_touch_area").append('<div></div>');
            }

            thisObj.find(".survey_graduation > div").each(function(i){
                area.push($(this).position().left);
                if(i == 1) {
                    areasize = ($(this).position().left/2);
                }
            });
            var areamaxium = thisObj.find(".survey_select").width();

            thisObj.find(".survey_touch_icon").draggable({
                containment:"parent",
                axis : "x"
            });

            thisObj.find(".survey_touch_icon").bind({
                drag : function(event, ui){
                    var pos = ui.position.left;
                    areaDrag(pos);
                }, dragstop : function(event, ui){
                    var pos = ui.position.left;
                    areaDragRevers(pos);
                }
            });

            function areaDrag(left){
                if(area[0] < left && (area[1]-areasize) > left) choice(0);
                else if((area[1]-areasize) < left && (area[2]-areasize) > left) choice(1);
                else if((area[2]-areasize) < left && (area[3]-areasize) > left) choice(2);
                else if((area[3]-areasize) < left && (area[4]-areasize) > left) choice(3);
                else if((areamaxium-areasize) < left) choice(4);

                return false;
            }
            function areaDragRevers(left){
                if(area[0] < left && (area[1]-areasize) > left) thisObj.find(".survey_touch_icon").animate({left:(25*0)+"%"},100);
                else if((area[1]-areasize) < left && (area[2]-areasize) > left) thisObj.find(".survey_touch_icon").animate({left:(25*1)+"%"},100);
                else if((area[2]-areasize) < left && (area[3]-areasize) > left) thisObj.find(".survey_touch_icon").animate({left:(25*2)+"%"},100);
                else if((area[3]-areasize) < left && (area[4]-areasize) > left) thisObj.find(".survey_touch_icon").animate({left:(25*3)+"%"},100);
                else if((areamaxium-areasize) < left) thisObj.find(".survey_touch_icon").animate({left:(25*4)+"%"});

                return false;
            }

            choice(setting.index-1);
            thisObj.find(".survey_touch_icon").animate({left:(25*(setting.index-1))+"%"});

            function choice(no){
                //thisObj.find(".survey_touch_icon").animate({left:(25*no)+"%"});

                var caseNum = no+1;
                thisObj.find(".survey_no").text(caseNum);
                $(".satisfaction").val(caseNum);

                switch(caseNum) {
                    case 1 :
                        $("body").css({"background":"#FF3B3B"});
                        thisObj.find(".survey_emo > img").attr("src","https://d2t72fqhhsdts3.cloudfront.net/lomad/img/survey/icon_emo1.png");
                        thisObj.find(".survey_state").text("매우 불만족");
                        break;
                    case 2 :
                        $("body").css({"background":"#FFA3CA"});
                        thisObj.find(".survey_emo > img").attr("src","https://d2t72fqhhsdts3.cloudfront.net/lomad/img/survey/icon_emo2.png");
                        thisObj.find(".survey_state").text("불만족");
                        break;
                    case 3 :
                        $("body").css({"background":"#FF9212"});
                        thisObj.find(".survey_emo > img").attr("src","https://d2t72fqhhsdts3.cloudfront.net/lomad/img/survey/icon_emo3.png");
                        thisObj.find(".survey_state").text("보통");
                        break;
                    case 4 :
                        $("body").css({"background":"#36CC70"});
                        thisObj.find(".survey_emo > img").attr("src","https://d2t72fqhhsdts3.cloudfront.net/lomad/img/survey/icon_emo4.png");
                        thisObj.find(".survey_state").text("만족");
                        break;
                    case 5 :
                        $("body").css({"background":"#36CCAF"});
                        thisObj.find(".survey_emo > img").attr("src","https://d2t72fqhhsdts3.cloudfront.net/lomad/img/survey/icon_emo5.png");
                        thisObj.find(".survey_state").text("매우 만족");
                        break;
                }
            }
        });
    }

    $.fn.surveyEmo2 = function(options){
        var thisObj = $(this);
        var setting = $.extend({
            index : 1
        }, options);

        $(function(){
            var area = new Array();
            var areasize = 0;

            thisObj.find(".survey_select").append('<div class="survey_graduation"></div>');
            //thisObj.find(".survey_select").append('<div class="survey_touch_area"></div>');
            for(i=0; i<5; i++) {
                thisObj.find(".survey_graduation").append('<div style="left:'+(25*i)+'%"></div>');
                //thisObj.find(".survey_touch_area").append('<div></div>');
            }

            thisObj.find(".survey_graduation > div").each(function(i){
                area.push($(this).position().left);
                if(i == 1) {
                    areasize = ($(this).position().left/2);
                }
            });
            var areamaxium = thisObj.find(".survey_select").width();

            thisObj.find(".survey_touch_icon").draggable({
                containment:"parent",
                axis : "x"
            });

            thisObj.find(".survey_touch_icon").bind({
                drag : function(event, ui){
                    var pos = ui.position.left;
                    areaDrag(pos);
                }, dragstop : function(event, ui){
                    var pos = ui.position.left;
                    areaDragRevers(pos);
                }
            });

            function areaDrag(left){
                if(area[0] < left && (area[1]-areasize) > left) choice(0);
                else if((area[1]-areasize) < left && (area[2]-areasize) > left) choice(1);
                else if((area[2]-areasize) < left && (area[3]-areasize) > left) choice(2);
                else if((area[3]-areasize) < left && (area[4]-areasize) > left) choice(3);
                else if((areamaxium-areasize) < left) choice(4);

                return false;
            }
            function areaDragRevers(left){
                if(area[0] < left && (area[1]-areasize) > left) thisObj.find(".survey_touch_icon").animate({left:(25*0)+"%"},100);
                else if((area[1]-areasize) < left && (area[2]-areasize) > left) thisObj.find(".survey_touch_icon").animate({left:(25*1)+"%"},100);
                else if((area[2]-areasize) < left && (area[3]-areasize) > left) thisObj.find(".survey_touch_icon").animate({left:(25*2)+"%"},100);
                else if((area[3]-areasize) < left && (area[4]-areasize) > left) thisObj.find(".survey_touch_icon").animate({left:(25*3)+"%"},100);
                else if((areamaxium-areasize) < left) thisObj.find(".survey_touch_icon").animate({left:(25*4)+"%"});

                return false;
            }

            choice(setting.index-1);
            thisObj.find(".survey_touch_icon").animate({left:(25*(setting.index-1))+"%"});

            function choice(no){
                //thisObj.find(".survey_touch_icon").animate({left:(25*no)+"%"});

                var caseNum = no+1;
                thisObj.find(".survey_no").text(caseNum);
                $(".satisfaction").val(caseNum);

                switch(caseNum) {
                    case 1 :
                        $("body").css({"background":"#FF3B3B"});
                        thisObj.find(".survey_emo > img").attr("src","https://d2t72fqhhsdts3.cloudfront.net/lomad/img/survey/icon_emo1.png");
                        thisObj.find(".survey_state").text("절대 안 할래요");
                        break;
                    case 2 :
                        $("body").css({"background":"#FFA3CA"});
                        thisObj.find(".survey_emo > img").attr("src","https://d2t72fqhhsdts3.cloudfront.net/lomad/img/survey/icon_emo2.png");
                        thisObj.find(".survey_state").text("추천 안 할래요");
                        break;
                    case 3 :
                        $("body").css({"background":"#FF9212"});
                        thisObj.find(".survey_emo > img").attr("src","https://d2t72fqhhsdts3.cloudfront.net/lomad/img/survey/icon_emo3.png");
                        thisObj.find(".survey_state").text("잘 모르겠어요");
                        break;
                    case 4 :
                        $("body").css({"background":"#36CC70"});
                        thisObj.find(".survey_emo > img").attr("src","https://d2t72fqhhsdts3.cloudfront.net/lomad/img/survey/icon_emo4.png");
                        thisObj.find(".survey_state").text("추천 할래요");
                        break;
                    case 5 :
                        $("body").css({"background":"#36CCAF"});
                        thisObj.find(".survey_emo > img").attr("src","https://d2t72fqhhsdts3.cloudfront.net/lomad/img/survey/icon_emo5.png");
                        thisObj.find(".survey_state").text("적극 추천 할래요");
                        break;
                }
            }
        });
    }

    /* 2020.12. new code */
    /*$.fn.displayTrans = function(options){
        var thisObj = $(this);
        var setting = $.extend({
            index : 1
        }, options);

        thisObj.find("li").eq(setting.index-1).addClass("focus");
        thisObj.parent().find(".tab_list > div").eq(setting.index-1).show();

        thisObj.find("li").click(function(){
            var thisIndex = $(this).index();

            thisObj.find("li").not($(this)).removeClass("focus");
            $(this).addClass("focus");
            thisObj.parent().find(".tab_list > div").not(thisObj.parent().find(".tab_list > div").eq(thisIndex)).hide();
            thisObj.parent().find(".tab_list > div").eq(thisIndex).show();
        });
    }*/


    /* startup code */
	$.fn.goodsphoto = function(options){
		var thisObj = $(this);
		var setting = $.extend({
			speed : 350
		}, options);

		 //간단한 모바일 터치 반응 이벤트
		 var obj_img = thisObj.find("p");
		 var imglength = obj_img.length;
		 var scrollarea = thisObj.find(".goods_info_scroll").find("span");
		 var exstart = 0;
		 var exend = 0;
		 var selected = 0;
		 var scrollwidth = 100/imglength;

		obj_img.eq(0).show(); //첫 이미지 출력
		scrollarea.css({width:scrollwidth+"%"});
        if(imglength > 1){
            thisObj.bind({
                touchstart : function(e) {
                    var event = e.originalEvent;
                    exstart = event.touches[0].clientX;
                }, touchmove : function(e) {
                    var event = e.originalEvent;
                    exend = event.touches[0].clientX;
                }, touchend : function(e) {

                    var oldno = selected;
                    obj_img.eq(oldno).css({"z-index":"0"});

                    if(exstart+50 < exend) {
                        selected > 0 ? selected-- : selected = imglength-1;
                        obj_img.eq(selected).show().css({left:"-100%","z-index":"1"}).animate({left:0},setting.speed,oldremove(oldno));
                    } if(exstart-50 > exend) {
                        selected < imglength-1 ? selected++ : selected = 0;
                        obj_img.eq(selected).show().css({left:"100%","z-index":"1"}).animate({left:0},setting.speed,oldremove(oldno));
                    }
                    scrollarea.animate({left:(scrollwidth*selected)+"%"});

                    function oldremove(no){
                        obj_img.eq(no).delay(setting.speed).hide(0);
                    }
                }
            });
        }

	}

	$.fn.rating = function(options){
		var thisScore = $(this);
		var setting = $.extend({
			score : 0
		}, options);

		thisScore.text("");
		for(i=0; i<5; i++){
			i < setting.score ? thisScore.append('<span>★</span>') : thisScore.append('★');
		}

	}

	$.fn.slideUpDown = function(options){
		var thisSlide = $(this);
		var setting = $.extend({
			speed : 250,
			type : "toggle"
		}, options);

		if(setting.type == "toggle") {
			thisSlide.find("dt").click(function(){
				if($(this).attr("use") == 1) {
					$(this).removeAttr("style");
					$(this).removeAttr("use");
				} else {
					$(this).css({"background-image":"url(https://d2t72fqhhsdts3.cloudfront.net/lomad/img/Product/common/icon_down_arrow.png)","background-size":"13px auto"});
					$(this).attr("use","1");
				}
				$(this).parents("dl").find("dd").slideToggle(setting.speed);
			});
		} else {
			thisSlide.find("dt").click(function(){
				if($(this).attr("use") != 1) {
					thisSlide.find("dt").removeAttr("use");
					thisSlide.find("dt").removeAttr("style");
					thisSlide.find("dd").slideUp(setting.speed);
					$(this).css({"background-image":"url(https://d2t72fqhhsdts3.cloudfront.net/lomad/img/Product/common/icon_down_arrow.png)","background-size":"13px auto"});
					$(this).parents("dl").find("dd").slideDown(setting.speed);
					$(this).attr("use","1");
				} else {
					$(this).parents("dl").find("dd").slideUp(setting.speed);
					$(this).removeAttr("style");
					$(this).removeAttr("use");
				}
			});
		}
	}
})($);

function scrollback(){
    $(function(){
        $("html, body").stop().animate({scrollTop:0},100);
    });
}

function onpop(urls,w,h){
	$(function(){
		sw = (screen.width);
		sh = (screen.height);

		if(jQuery.browser.msie && jQuery.browser.version == "11.0" || jQuery.browser.version == "10.0" || jQuery.browser.version == "9.0"){	//학습창 IE버전별 교정
			w = (w-4);
			h = (h-4);
		}

		size = "width="+w+",height="+h+",scrollbars=yes";
		var pop_view = window.open(urls,'',size);
		pop_view.focus();
	});
}

function leadingZeros(n, digits) {
	var zero = '';
	n = n.toString();

	if (n.length < digits) {
		for (var i = 0; i < digits - n.length; i++) {
			zero += '0';
		}
	}
	return zero + n;
}

function commas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function convertTime(time) {
	var getTime = time.substring(0, 2);
	var intTime = parseInt(getTime);

	if (intTime < 12 ) { var str = '오전 '; } else { var str = '오후 '; }
	if (intTime == 12) { var cvHour = intTime; } else { var cvHour = intTime%12; }

	var res = str + ('0' + cvHour).slice(-2) + time.slice(-3);
	return res;
}

$(function(){
    $(".playset").find("a").click(function(){
        var targets = $(this).parents(".la_youtube").find(".la_load");
        var moviecode = $(this).attr("movie-code");

        $(this).parent().remove();
        targets.empty();
        targets.append(' <iframe src="/youtube_play.html" frameborder="0"></iframe> ');
        targets.find("iframe").attr("src","/youtube_play.html?m="+moviecode);
    });

    var faqTarget = $(".faq_category");

    if(faqTarget.length !== 0) {
        if(faqTarget.find(".focus").length !== 0) {
            var faqSize = faqTarget.find("div").outerWidth();
            var faqScroll = faqTarget.find(".focus").position().left-22;
            var faqThisSize = faqTarget.find(".focus").width();

            if((faqSize-50) < faqScroll) {
                faqTarget.find("div").scrollLeft(faqScroll-faqThisSize);
            }
        } else {
            faqTarget.find("li").eq(0).addClass("focus");
        }
    }

	$(".date").datepicker({
		dateFormat: 'yy.mm.dd',
		prevText : '이전 달',
		nextText : '다음 달',
		monthNames : ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		monthNamesShort : ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		dayNames : ['일','월','화','수','목','금','토'],
		dayNamesShort : ['일','월','화','수','목','금','토'],
		dayNamesMin : ['일','월','화','수','목','금','토'],
		showMonthAfterYear : true,
		showOtherMonths : true,
		yearSuffix : '년'
	});


	var d = $(".d");
	var dd = new Array('전체','주중','주말','월','화','수','목','금','토','일','공휴일');
	for(i = 0; i < dd.length; i++) {
		d.append(' <option asc="'+(i+1)+'" value="'+dd[i]+'">'+dd[i]+'</option> ');
	}

	var d = $(".d_week");
	var dd = new Array('월','화','수','목','금','토','일','공휴일');
	for(i = 0; i < dd.length; i++) {
		d.append(' <option asc="'+(i+1)+'" value="'+dd[i]+'">'+dd[i]+'</option> ');
	}

	var h = $(".h");
	for(i = 1; i <= 24; i++) {
		i =  leadingZeros(i, 2);
		h.append(' <option value="'+i+'">'+i+'시</option> ');
	}

	var m = $(".m");
	var mm = 5;
	m.append(' <option value="00">: 00</option> ');
	for(i = 1; i < 12; i++) {
		var pirMin = leadingZeros(mm*i, 2);
		m.append(' <option value="'+pirMin+'">: '+pirMin+'</option> ');
	}
});
