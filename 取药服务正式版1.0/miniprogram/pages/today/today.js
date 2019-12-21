var bmap = require('../../libs/bmap-wx.js');
const bgMusic = wx.createInnerAudioContext();
const app = getApp();
Page({
  data: {
    isOpen: false,//播放开关
    starttime: '00:00', //正在播放时长
    duration: '05:38',   //总时长
src:"http://10.3.200.202/cache/11/05/music.126.net/f72e91ff76917cdfe24f6e557ae25f82/363ac3846ba857099779c4687db2891a.mp3",
    weatherData: {}
  },
 
  
  listenerButtonPlay: function () {
    var that = this
    //bug ios 播放时必须加title 不然会报错导致音乐不播放
    bgMusic.title = 'TheRain'
    bgMusic.epname = 'TheRain'
    bgMusic.src = that.data.src;
    bgMusic.onTimeUpdate(() => {
      //bgMusic.duration总时长  bgMusic.currentTime当前进度
      //console.log(bgMusic.currentTime)
      var duration = bgMusic.duration;
      var offset = bgMusic.currentTime;
      var currentTime = parseInt(bgMusic.currentTime);
      var min = "0" + parseInt(currentTime / 60);
      var max = parseInt(bgMusic.duration);
      var sec = currentTime % 60;
      if (sec < 10) {
        sec = "0" + sec;
      };
      var starttime = min + ':' + sec;   /*  00:00  */
      that.setData({
        offset: currentTime,
        starttime: starttime,
        max: max,
        changePlay: true
      })
    })
    //播放结束
    bgMusic.onEnded(() => {
      that.setData({
        starttime: '00:00',
        isOpen: false,
        offset: 0
      })
      console.log("音乐播放结束");
    })
    bgMusic.play();
    that.setData({
      isOpen: true,
    })
  },
  //暂停播放
  listenerButtonPause() {
    var that = this
    bgMusic.pause()
    that.setData({
      isOpen: false,
    })
  },
 
  // 进度条拖拽
  sliderChange(e) {
    var that = this
    var offset = parseInt(e.detail.value);
    bgMusic.stop();
    bgMusic.seek(offset);
    that.setData({
      isOpen: true,
    })
    setTimeout(function () {
      bgMusic.play()
    }, 100)
  },

 
  onLoad: function () {
    var that = this;
  //调用百度天气API
    var BMap = new bmap.BMapWX({
      ak: 'GxrD010VVFwYH66qIviY13efSvL0NUH4'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      var weatherData = data.currentWeather[0];
      //weatherData = '\n\n城市：' + weatherData.currentCity + '\n\n' + 'PM2.5：' + weatherData.pm25 + '\n\n' + '日期：' + weatherData.date + '\n\n' + '温度：' + weatherData.temperature + '\n\n' + '天气：' + weatherData.weatherDesc + '\n\n' + '风力：' + weatherData.wind + '\n\n';
      that.setData({
        weatherData: {
          currentCity: '城市：' + weatherData.currentCity + '\n\n',
         pm25: 'PM2.5：' + weatherData.pm25 + '\n\n',
          data: '日期：' + weatherData.date + '\n\n',
          temperature: '温度：' + weatherData.temperature + '\n\n',
          weatherDesc: '天气：' + weatherData.weatherDesc + '\n\n',
          wind: '风力：' + weatherData.wind + '\n\n'
          }
      });
    }
  
    BMap.weather({
      fail: fail,
      success: success
    });
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