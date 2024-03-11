// 侧边菜单
$(function () {
  $("#menu").click(function () {
    console.log("11111");
    $(".mask").fadeIn(300);
    $("#navList").addClass("nav-list-show ");
  });
  // 关闭侧边菜单
  $("#navList .close").click(function () {
    console.log("11111");
    $(".mask").fadeOut(300);
    $("#navList").removeClass("nav-list-show ");
  });

  // 文章展开收起
  if ($("#hiddenBox").find(".cont").height() < 300) {
    $("#detailContMask").remove();
  } else {
    $("#detailContMask span").on("click", function () {
      if ($("#detailContMask").hasClass("detailContMaskClose")) {
        var flag = $("#detailContMask").attr("data-id");
        wenzhangHideOrShow(flag);
      } else {
        var h = $("#detailCont").height();
        $("#hiddenBox").css({
          height: h + 50 + "px",
        });
      }
      $("#detailContMask").toggleClass("detailContMaskClose");
    });
  }
});

//回到顶部及rem适应
$(document).ready(function () {
  $(window).scroll(function () {
    var backToTop = $("#back-to-top");
    if ($(this).scrollTop() > 700) {
      backToTop.addClass("show");
      backToTop.on("click", function () {
        $("html, body").animate({ scrollTop: 0 }, "slow");
      });
    } else {
      backToTop.removeClass("show");
    }
  });
  var ele = $("html");
  var langValue = ele.attr("lang");
  var aFont = $(".home-nav li a");
  if (langValue === "vi") {
    aFont.css("font-size", "0.28rem");
  } else {
    aFont.css("font-size", "0.32rem");
  }
});

//下载页面点击事件
$(function () {
  /* if (!sessionStorage.getItem("downingExecuted")) {
        doDown();
        downing();
      sessionStorage.setItem("downingExecuted", "true");
    } */

  var dotting = document.querySelector(".dotting");
  $(".downlinks").on("click", function () {
    doDown();
    downing();
  });
  function doDown() {
    var dowp = document.querySelector(".downlinks");
    dotting.style.display = "inline-block";
    dowp.classList.add("gray"); //变换背景色
    dowp.innerText = `5 ...`;
    dowp.style.pointerEvents = "none"; // 禁用点击事件
    let count = 4; // 开始倒计时
    const countdown = setInterval(function () {
      dowp.innerText = count + " ...";
      count--;
      if (count < 0) {
        clearInterval(countdown); // 清除定时器
        dowp.innerText = "Click to redownload";
        dowp.classList.remove("gray"); //变换背景色
        dowp.style.pointerEvents = "auto"; // 启用点击事件
      }
    }, 1000);
  }

  function downing() {
    var appid = $(".downlinks").data("appid");
    var data = {};
    if (!appid || isNaN(appid)) return;
    $.getJSON(
      BaseUrl + "/downs2/url?callback=?",
      {
        id: appid,
      },
      function (r) {
        if (r && r.status == "success") {
          data = r.data;
        }
        if (data.url) {
          if (data.report) {
            var i = new Image();
            i.src = data.report;
          }

          var filename = getFileName(data.url);
          downloadFile(data.url, filename);
          // location.href = data.url;
          // window.open(data.url, '_self', 'download')
        } else {
        }
      }
    );
    return false;
  }

  function downloadFile(url, fileName) {
    var link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * 根据文件url获取文件名
   * @param url 文件url
   */
  function getFileName(url) {
    var num = url.lastIndexOf("/") + 1;
    var fileName = url.substring(num);
    //把参数和文件名分割开
    fileName = decodeURI(fileName.split("?")[0]);
    return fileName;
  }
});

//搜索页
$(function () {
  const tabs = $(".search-app-tab");
  const tabApps = $(".search-app-tab-apps");
  const tabArticles = $(".search-app-tab-articles");
  const listTitle = $(".list-title");
  const firstApk = $(".first-apk");
  const list = $(".all-list");
  const cs1 = $(".cs1");
  const cs2 = $(".cs2");
  const saAppsDiv = $(".sa-apps-div");
  const saArticlesDiv = $(".sa-articles-div");

  tabs.click(function () {
    tabs.removeClass("activeTab");
    $(this).addClass("activeTab");
    const index = $(this).index();
    if (index === 0) {
      listTitle.add(firstApk).add(list).show();
      $(".a").hide();
    } else if (index === 1) {
      cs1.add(saAppsDiv).add(firstApk).show();
      list.add(cs2).hide();
    } else if (index === 2) {
      cs2.show().add(saArticlesDiv);
      list.add(cs1).add(saAppsDiv).add(firstApk).hide();
    }
  });

  $(".showmore-apps").click(function () {
    cs1.add(saAppsDiv).add(firstApk).show();
    list.add(cs2).hide();
    tabApps.addClass("activeTab").siblings().removeClass("activeTab");
  });

  $(".showmore-articles").click(function () {
    cs2.show().add(saArticlesDiv);
    list.add(cs1).add(saAppsDiv).add(firstApk).hide();
    tabArticles.addClass("activeTab").siblings().removeClass("activeTab");
  });
});
