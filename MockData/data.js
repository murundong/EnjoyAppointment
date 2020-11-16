
var local_doors = {
  errCode: 0,
  total: 3,
  data: [
    {
      id: 1,
      img: 'http://www.bundfm.com/uploadfile/2019/0610/20190610035519966.jpg',
      status: '营业中',
      name: '梅斯奔驰中心',
      address: '上海市浦东新区世博大道1200号'
    },
    {
      id: 2,
      img: 'http://img.zjolcdn.com/pic/0/07/67/93/7679300_941970.jpg',
      status: '预售中',
      name: '国家体育馆',
      address: '北京市朝阳区安定路甲3号'
    },
    {
      id: 3,
      img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2465275575,386684080&fm=26&gp=0.jpg',
      status: '停业中',
      name: '台北小巨蛋体育馆',
      address: '中国台湾省台北市南京东路和敦化北路'
    }
  ]
}
var local_classes_type = ['全部课程', '力量型', '有氧', '引体向上', '体态纠正', '塑性']
var local_banners = [
  {
    id: 1,
    img: 'http://n.sinaimg.cn/sinacn10/480/w1280h800/20180613/f9e9-hcwpcmp9678486.jpg',
    url: '123'

  }, {
    id: 2,
    img: 'http://img.improve-yourmemory.com/pic/4f138809da94a79d0bf71b8881a84add-2.jpg',
    url: '456'
  }, {
    id: 3,
    img: 'http://www.aihami.com/uploads/allimg/180818/170-1PQP0525J41.jpg',
    url: '789'
  }


]
var local_classes = {
  errCode: 0,
  total: 12,
  data: [
    {
      'id': 1,
      'price': 0,
      'title': 'BODYPUMP身体充电',
      'teacher_img': 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4134179624,1189954365&fm=26&gp=0.jpg',
      'status': '紧张',
      'tags': ['体态纠正', '塑性'],
      'teacher': 'GEM',
      'startTime': '2020/11/15 08:00',
      'endTime': '2020/11/15 09:00',
      'fullNum': 10,
      'lessNum': 2,
      'nowNum': 8,
      'level': 3,
      'timeStr': '08:00~09:00',
      'btnStatus': 0
    },
    {
      'id': 2,
      'price': 0,
      'title': '综合全能训练课程',
      'teacher_img': 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2036239060,1500073520&fm=26&gp=0.jpg',
      'status': '满员',
      'tags': ['体态纠正', '塑形', '增肌'],
      'teacher': '彭于晏',
      'startTime': '2020/11/15 14:00',
      'endTime': '2020/11/15 15:00',
      'fullNum': 8,
      'lessNum': 2,
      'nowNum': 8,
      'level': 3,
      'timeStr': '14:00~15:00',
      'btnStatus': -1
    }, {
      'id': 3,
      'price': 0,
      'title': '有氧战斗',
      'teacher_img': 'http://img.idol001.com/thumbnail/2014/09/27/8b3c232b4bae2599823251991f01e1b71411828841.jpg',
      'status': '',
      'tags': ['力量型', '引体向上'],
      'teacher': 'GEM',
      'startTime': '2020/11/15 17:00',
      'endTime': '2020/11/15 18:00',
      'fullNum': 10,
      'lessNum': 2,
      'nowNum': 3,
      'level': 3,
      'timeStr': '17:00~18:00',
      'btnStatus': 0
    },
    {
      'id': 4,
      'price': 0,
      'title': 'Hit燃脂战神',
      'teacher_img': 'http://img1.cache.netease.com/catchpic/A/A5/A5F8F7A546CF3CF7C0EF6F1D02AC94D5.jpg',
      'status': '',
      'tags': ['协调', '减脂'],
      'teacher': 'CC',
      'startTime': '2020/11/15 20:00',
      'endTime': '2020/11/15 20:30',
      'fullNum': 12,
      'nowNum': 3,
      'lessNum': 4,
      'level': 3,
      'timeStr': '20:00~20:30',
      'btnStatus': 0
    },
    {
      'id': 2,
      'price': 0,
      'title': '综合全能训练课程',
      'teacher_img': 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2036239060,1500073520&fm=26&gp=0.jpg',
      'status': '满员',
      'tags': ['体态纠正', '塑形', '增肌'],
      'teacher': '彭于晏',
      'startTime': '2020/11/15 14:00',
      'endTime': '2020/11/15 15:00',
      'fullNum': 8,
      'lessNum': 2,
      'nowNum': 8,
      'level': 3,
      'timeStr': '14:00~15:00',
      'btnStatus': -1
    }, {
      'id': 3,
      'price': 0,
      'title': '有氧战斗',
      'teacher_img': 'http://img.idol001.com/thumbnail/2014/09/27/8b3c232b4bae2599823251991f01e1b71411828841.jpg',
      'status': '',
      'tags': ['力量型', '引体向上'],
      'teacher': 'GEM',
      'startTime': '2020/11/15 17:00',
      'endTime': '2020/11/15 18:00',
      'fullNum': 10,
      'lessNum': 2,
      'nowNum': 3,
      'level': 3,
      'timeStr': '17:00~18:00',
      'btnStatus': 0
    },
    {
      'id': 4,
      'price': 0,
      'title': 'Hit燃脂战神',
      'teacher_img': 'http://img1.cache.netease.com/catchpic/A/A5/A5F8F7A546CF3CF7C0EF6F1D02AC94D5.jpg',
      'status': '',
      'tags': ['协调', '减脂'],
      'teacher': 'CC',
      'startTime': '2020/11/15 20:00',
      'endTime': '2020/11/15 20:30',
      'fullNum': 12,
      'nowNum': 3,
      'lessNum': 4,
      'level': 3,
      'timeStr': '20:00~20:30',
      'btnStatus': 0
    },
    {
      'id': 2,
      'price': 0,
      'title': '综合全能训练课程',
      'teacher_img': 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2036239060,1500073520&fm=26&gp=0.jpg',
      'status': '满员',
      'tags': ['体态纠正', '塑形', '增肌'],
      'teacher': '彭于晏',
      'startTime': '2020/11/15 14:00',
      'endTime': '2020/11/15 15:00',
      'fullNum': 8,
      'lessNum': 2,
      'nowNum': 8,
      'level': 3,
      'timeStr': '14:00~15:00',
      'btnStatus': -1
    }, {
      'id': 3,
      'price': 0,
      'title': '有氧战斗',
      'teacher_img': 'http://img.idol001.com/thumbnail/2014/09/27/8b3c232b4bae2599823251991f01e1b71411828841.jpg',
      'status': '',
      'tags': ['力量型', '引体向上'],
      'teacher': 'GEM',
      'startTime': '2020/11/15 17:00',
      'endTime': '2020/11/15 18:00',
      'fullNum': 10,
      'lessNum': 2,
      'nowNum': 3,
      'level': 3,
      'timeStr': '17:00~18:00',
      'btnStatus': 0
    },
    {
      'id': 4,
      'price': 0,
      'title': 'Hit燃脂战神',
      'teacher_img': 'http://img1.cache.netease.com/catchpic/A/A5/A5F8F7A546CF3CF7C0EF6F1D02AC94D5.jpg',
      'status': '',
      'tags': ['协调', '减脂'],
      'teacher': 'CC',
      'startTime': '2020/11/15 20:00',
      'endTime': '2020/11/15 20:30',
      'fullNum': 12,
      'nowNum': 3,
      'lessNum': 4,
      'level': 3,
      'timeStr': '20:00~20:30',
      'btnStatus': 0
    }
  ]
}

// module.exports={
//   local_banner:local_banner
// }

export {
  local_banners, local_doors, local_classes_type, local_classes
}