const app = getApp()
Page
({

 data:{  
  },

  
    takemedicine: function () {

      wx.navigateTo({

        url: '../user/takemedicine/takemedicine',

      })
    },

    medicine: function () {

      wx.navigateTo({

        url: '../user/medicine/medicine',

      })
    },

    where: function () {

      wx.navigateTo({

        url: '../user/where/where',

      })
    },

    //实现小程序的分享功能
    onShareAppMessage: function () {

      let url = encodeURIComponent('/packageNews/pages/news_detail/news_detail?news_id=' +
        this.data.news_id);

      return {
        title: "425的NB之作",
        path: `/pages/login/login?url=${url}`
      }
    }


})