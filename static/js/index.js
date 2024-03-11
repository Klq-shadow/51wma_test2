~ function (e) {
    function t() {
        var t = screen.width > 0 && (e.innerWidth >= screen.width || 0 == e.innerWidth) ? screen.width : e.innerWidth;
        a && (t = screen.width);
        var i = t > u ? w : t / (u / 100);
        i = i > h ? i : h,
            document.documentElement.style.fontSize = i + "px"
    }
    var i, n = e.navigator.userAgent,
        a = n.match(/iphone/i),
        o = n.match(/yixin/i),
        c = n.match(/Mb2345/i),
        r = n.match(/mso_app/i),
        s = n.match(/sogoumobilebrowser/gi),
        m = n.match(/liebaofast/i),
        d = n.match(/GNBR/i),
        u = document.documentElement.dataset.dw || 750,
        h = 42,
        w = 100;
    e.addEventListener("resize", function () {
            clearTimeout(i),
                i = setTimeout(t, 300)
        }, !1),
        e.addEventListener("pageshow", function (e) {
            e.persisted && (clearTimeout(i),
                i = setTimeout(t, 300))
        }, !1),
        o || c || r || s || m || d ? setTimeout(function () {
            t()
        }, 500) : t()
}(window);

$(function () {
    //统计浏览代码
    var id = $("#id").val();
    var name = $("#type").val();
    var pdata = window.pdata || {};
    if (typeof pdata !== "undefined" && id && name) {
      var classify = pdata.classify;
      if (["game", "information"].indexOf(name) >= 0) {
        if (name == "game" && classify == 2) {
          name = "soft";
        }
        var i = new Image();
        i.src = BaseUrl + "ajax2/stat?type=browse&name=" + name + "&id=" + id;
      }
    }
    

    // pc移动自动切换
    !core.isMobile && !location.host.indexOf('m') && (location.href = location.href.replace('//m', '//www'));


    // 头部搜索
    $('#topSearchForm').each(function () {
        $(this).find('.search-clear').on('click', function () {
            this.previousElementSibling.value = '';
        })
    })

    // 首页轮播
    if (typeof Swiper !== 'undefined') {
        var homeBannerSwiper = new Swiper('.home-banner', {
            autoplay: true,
            loop: true,
            autoplay: {
                disableOnInteraction: false
            },
            pagination: {
                el: '.lb-swiper-pagination',
            },
        });
        // 首页热门游戏/应用滚动
        var hotApp = new Swiper('.home-hot-app-swiper', {
            autoplayDisableOnInteraction: false,
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: true //修改swiper的父元素时，自动初始化swiper
        });
    }



    // 头部菜单-显示/隐藏
    var $body = $('html');
    $('#topMenuTap').on('click', function () {
        $body.toggleClass('top-menu-cover');
    })

    $('#topMenu').each(function () {
        var $menu = $(this);
        $menu.find('.hd-item').on('click', function () {
            var $this = $(this),
                index = $this.index();
            $this.addClass('on').siblings().removeClass('on');
            $menu.find('.bd-item').removeClass('on').eq(index).addClass('on');
        })
        $menu.find('.top-menu-overlay').on('click', function () {
            $body.removeClass('top-menu-cover');
        })
    })


    //返回顶部
    function goToTop() {
        var $totop = $('#totop'),
            $win = $(window),
            timer = 0;

        // 回到顶部 - 隐藏/显示
        $win.scroll(function () {
            clearTimeout(timer)
            timer = setTimeout(function () {
                ($win.scrollTop() > 500) ? $totop.addClass('fadein'): $totop.removeClass('fadein');
            }, 100)
        });
        $totop.on('click', function () {
            $totop.removeClass('fadein');
            $win.scrollTop(0);
        })
    }
    goToTop()

    //顶部导航
    $('#softContent .btn-dropdown').on('click', function () {
        $(this).parent().toggleClass('open');
    })

    // 文章介绍展开/收起
    $('#softRemarkText').each(function () {
        var $this = $(this);
        var $cont = $this.find('.text-inner');

        if ($cont.get(0).scrollHeight == $cont.height()) {
            $('#textShow').hide();
            return false;
        }
        // console.log($cont.height(), $cont.get(0).scrollHeight);

        $('#textShow').on('click', function () {
            $this.addClass('show');
        })
        $('#textHide').on('click', function () {
            $this.removeClass('show');
        })
    })

    //详情页排行榜（切换/查看更多）
    function mobileGamesList() {
        $('#mobileGamesList').each(function () {
            var $list = $(this);
            $list.find('.tab-cell li').on('click', function () {
                $this = $(this);
                $this.addClass('on').siblings().removeClass('on');
                $list.find('.tab-content').removeClass('on').eq($this.index()).addClass('on');
            })

            // 点击查看更多
            $list.find('.btn-more').on('click', function () {
                var count = 4;
                var $cont = $(this).parents('.tab-content');
                var $item = $cont.find('.list-item');
                var index = $cont.find('.list-item.hide').index();

                $item.each(function (i) {
                    if (i >= index && i < index + count) {
                        $(this).removeClass('hide');
                    }
                })
                if (index + count >= $item.length) {
                    $cont.find('.section-ft').hide();
                }
            });
        })
    }
    mobileGamesList()




    //图片预览 fancybox 图片预览效果需在图片外层添加a标签
    function imgPreview() {
        var imgAddTag = function (item, index, dataFancybox) {
            var that = $(item)
            var src = that.attr("src")
            var alt = that.attr("alt")
            that.removeAttr("style")
            that.removeAttr("height")
            that.removeAttr("width")
            that.attr("title", "" + alt + "")
            that.wrap('<a data-fancybox="' + dataFancybox + '" title="" href="' + src + '" data-caption="' + (alt ? alt : '') + '"></a>')
        }
        //截图
        $('.PicturesShow').find('img').each(function (index, element) {
            imgAddTag(element, index, 'PicturesShow')
        })
        // //app介绍
        // $('#softRemarkText p').find('img').each(function (index, element) {
        //     imgAddTag(element, index, 'appDetail')
        // })
        // //资讯
        // $('.news-detail-bd p').find('img').each(function (index, element) {
        //     imgAddTag(element, index, 'newsDetail')
        // })

       
    }
    navigator.userAgent.match(/baiduboxapp/i) || imgPreview()


    //游戏内容合集切换
    $('.soft-list-topic').eq(0).show().siblings().hide();
    $('.tab_menu').find('li').on('click', function () {
        var times = $(this).index();
        $(this).addClass('current').siblings().removeClass('current');
        $('.soft-list-topic').eq(times).show().siblings().hide();
    })

    //游戏内容下拉展示
    $(document).ready(function() {
        var content = $("#softRemarkText");
        var more = $(".toggle-more");
        var less = $(".toggle-less");
        var panelFt = $(".panel-ft");
        var textH = $("#softRemarkText .text").height()
        console.log($("#softRemarkText .text").height());
    
        if(textH <= 240){
            panelFt.hide()
        }else{
            more.click(function() {
                content.removeClass("tex-content");
                more.hide();
                less.show();
                panelFt.css("position", "static");
              });
          
              less.click(function() {
                content.addClass("tex-content");
                more.show();
                less.hide();
                // location.href = location.pathname + "#app-detail";
                panelFt.css("position", "absolute");
            });
        }
      });
      
})