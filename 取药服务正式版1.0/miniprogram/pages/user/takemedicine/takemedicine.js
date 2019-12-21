Page
({

data:{
  buttonClicked:false,
  array1: ['云南白药', '阿斯匹林肠溶片'],
  objectArray: [
    {
      id: 0,
      name: 'A'
    },
    {
      id: 1,
      name: '阿斯匹林肠溶片'
    }
  ],
  medName: 0,
  array2: ['1', '2','3','4'],
  objectArray: [
    {
      id: 0,
      name: '1'
    },
    {
      id: 1,
      name: '2'
    },
     {
      id: 2,
      name: '3'
    },
    {
      id: 3,
      name: '4'
    }
  ],
  medNumber: 0,
},

    bindPickerChange1: function (e) {
      console.log('药名发送选择改变，携带值为', e.detail.value)
      this.setData({
        medName: e.detail.value
      })
    },
    bindPickerChange2: function (e) {
      console.log('药量发送选择改变，携带值为', e.detail.value)
      this.setData({
        medNumber: e.detail.value
      })
    },

   onLoad: function (options) {
      var _this = this;
      wx.request({
        url: 'https://api.heclouds.com/devices/562236142',
        header: {
          'api-key':'4GwvbANjeOALiXOOdwiMARL0p6o='
        },
        success: function (res) {
          console.log(res.data);
          _this.setData(
            {
              device_name: res.data.data.title,
              device_id: res.data.data.id,
              protocol: res.data.data.protocol,
              create_time: res.data.data.create_time,
            });
        },
        fail: function () {
          wx.showToast({
            title: '与服务器通信失败',
            icon: 'fail',
            duration: 2000
          })
        }
      })
    },

    //发送数据点：

    datapoints: function () {
      var that = this;
      var  medName = this.data.medName;
      var  medNumber = this.data.medNumber;
      var  array1 = this.data.array1;
      var array2 = this.data.array2;
       
       this.setData({
        buttonClicked: true
      })
      setTimeout(function() {
        that.setData({
          buttonClicked: false
        })
        } , 60000)
      
      wx.request({
        url: 'http://api.heclouds.com/devices/562236142/datapoints' ,
        header: {
          'api-key': '4GwvbANjeOALiXOOdwiMARL0p6o='
        },
        method: 'POST',
        data:{"datastreams": [
          {
          "id": "Medicine",
          "datapoints": [{
            "value":{
              "药名": array1[medName],
              "药量": array2[medNumber]
          }
          }]
        },
         ]},
        success: function (res) {
          console.log(res);
          setTimeout(function () {
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })
          }, 1500)
         },
        fail: function (res) {
          console.log(res)
          setTimeout(function () {
            wx.showToast({
              title: '失败',
              icon: 'warn',
              duration: 2000
            })
          }, 1500)
        }
      }) 
    },

 
})