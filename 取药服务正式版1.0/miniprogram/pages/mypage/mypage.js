var app = getApp();
Page
({
  data:{


  },
    
  news: function () {

    wx.navigateTo({

      url: '../mypage/feedback/feedback',

    })
  },
   
    help: function() {

      wx.navigateTo({

        url: '../mypage/help/help',

    })
  },

 aboutus:function(){

   wx.navigateTo({

     url: '../mypage/aboutus/aboutus',

   })
 },


onShareAppMessage: function () {

      let url = encodeURIComponent('/packageNews/pages/news_detail/news_detail?news_id=' +
        this.data.news_id);

      return {
        title: "425的NB之作",
        path: `/pages/login/login?url=${url}`
      }
    }

})