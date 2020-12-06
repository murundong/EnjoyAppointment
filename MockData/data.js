
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

var local_classes = {
  errCode: 0,
  total: 12,
  data:
  {
    doorName: '梅斯奔驰中心',
    lstClasses: [
      {
        'id': 1,
        'price': 0,
        'title': 'BODYPUMP身体充电',
        'teacher_img': 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4134179624,1189954365&fm=26&gp=0.jpg',
        'status': '紧张',
        'tags': ['体态纠正', '塑性'],
        'teacher': 'GEM',
        'startTime': '2020/11/27 08:00',
        'endTime': '2020/11/27 09:00',
        'fullNum': 10,
        'lessNum': 2,
        'nowNum': 8,
        'level': 3,
        'timeStr': '08:00~09:00',
        'btnStatus': 0,
        'Venue': '上海梅赛德斯',
        'address': '上海市浦东新区世博大道1200号'
      },
      {
        'id': 2,
        'price': 0,
        'title': '综合全能训练课程',
        'teacher_img': 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2036239060,1500073520&fm=26&gp=0.jpg',
        'status': '满员',
        'tags': ['体态纠正', '塑形', '增肌'],
        'teacher': '彭于晏',
        'startTime': '2020/11/27 14:00',
        'endTime': '2020/11/27 15:00',
        'fullNum': 8,
        'lessNum': 2,
        'nowNum': 8,
        'level': 3,
        'timeStr': '14:00~15:00',
        'btnStatus': -1,
        'Venue': '上海梅赛德斯',
        'address': '上海市浦东新区世博大道1200号'
      }, {
        'id': 3,
        'price': 0,
        'title': '有氧战斗',
        'teacher_img': 'http://img.idol001.com/thumbnail/2014/09/27/8b3c232b4bae2599823251991f01e1b71411828841.jpg',
        'status': '',
        'tags': ['力量型', '引体向上'],
        'teacher': 'GEM',
        'startTime': '2020/11/27 17:00',
        'endTime': '2020/11/27 18:00',
        'fullNum': 10,
        'lessNum': 2,
        'nowNum': 3,
        'level': 3,
        'timeStr': '17:00~18:00',
        'btnStatus': 0,
        'Venue': '上海梅赛德斯',
        'address': '上海市浦东新区世博大道1200号'
      },
      {
        'id': 4,
        'price': 0,
        'title': 'Hit燃脂战神',
        'teacher_img': 'http://img1.cache.netease.com/catchpic/A/A5/A5F8F7A546CF3CF7C0EF6F1D02AC94D5.jpg',
        'status': '',
        'tags': ['协调', '减脂'],
        'teacher': 'CC',
        'startTime': '2020/11/27 20:00',
        'endTime': '2020/11/27 22:30',
        'fullNum': 12,
        'nowNum': 3,
        'lessNum': 4,
        'level': 3,
        'timeStr': '20:00~20:30',
        'btnStatus': 0,
        'Venue': '上海梅赛德斯',
        'address': '上海市浦东新区世博大道1200号'
      },
      {
        'id': 2,
        'price': 0,
        'title': '综合全能训练课程',
        'teacher_img': 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2036239060,1500073520&fm=26&gp=0.jpg',
        'status': '满员',
        'tags': ['体态纠正', '塑形', '增肌'],
        'teacher': '彭于晏',
        'startTime': '2020/11/27 14:00',
        'endTime': '2020/11/27 15:00',
        'fullNum': 8,
        'lessNum': 2,
        'nowNum': 8,
        'level': 3,
        'timeStr': '14:00~15:00',
        'btnStatus': -1,
        'Venue': '上海梅赛德斯',
        'address': '上海市浦东新区世博大道1200号'
      }, {
        'id': 3,
        'price': 0,
        'title': '有氧战斗',
        'teacher_img': 'http://img.idol001.com/thumbnail/2014/09/27/8b3c232b4bae2599823251991f01e1b71411828841.jpg',
        'status': '',
        'tags': ['力量型', '引体向上'],
        'teacher': 'GEM',
        'startTime': '2020/11/27 17:00',
        'endTime': '2020/11/27 18:00',
        'fullNum': 10,
        'lessNum': 2,
        'nowNum': 3,
        'level': 3,
        'timeStr': '17:00~18:00',
        'btnStatus': 0,
        'Venue': '上海梅赛德斯',
        'address': '上海市浦东新区世博大道1200号'
      },
      {
        'id': 4,
        'price': 0,
        'title': 'Hit燃脂战神',
        'teacher_img': 'http://img1.cache.netease.com/catchpic/A/A5/A5F8F7A546CF3CF7C0EF6F1D02AC94D5.jpg',
        'status': '',
        'tags': ['协调', '减脂'],
        'teacher': 'CC',
        'startTime': '2020/11/27 20:00',
        'endTime': '2020/11/27 22:30',
        'fullNum': 12,
        'nowNum': 3,
        'lessNum': 4,
        'level': 3,
        'timeStr': '20:00~20:30',
        'btnStatus': 0,
        'Venue': '上海梅赛德斯',
        'address': '上海市浦东新区世博大道1200号'
      },
      {
        'id': 2,
        'price': 0,
        'title': '综合全能训练课程',
        'teacher_img': 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2036239060,1500073520&fm=26&gp=0.jpg',
        'status': '满员',
        'tags': ['体态纠正', '塑形', '增肌'],
        'teacher': '彭于晏',
        'startTime': '2020/11/27 14:00',
        'endTime': '2020/11/27 15:00',
        'fullNum': 8,
        'lessNum': 2,
        'nowNum': 8,
        'level': 3,
        'timeStr': '14:00~15:00',
        'btnStatus': -1,
        'Venue': '上海梅赛德斯',
        'address': '上海市浦东新区世博大道1200号'
      }, {
        'id': 3,
        'price': 0,
        'title': '有氧战斗',
        'teacher_img': 'http://img.idol001.com/thumbnail/2014/09/27/8b3c232b4bae2599823251991f01e1b71411828841.jpg',
        'status': '',
        'tags': ['力量型', '引体向上'],
        'teacher': 'GEM',
        'startTime': '2020/11/27 17:00',
        'endTime': '2020/11/27 18:00',
        'fullNum': 10,
        'lessNum': 2,
        'nowNum': 3,
        'level': 3,
        'timeStr': '17:00~18:00',
        'btnStatus': 0,
        'Venue': '上海梅赛德斯',
        'address': '上海市浦东新区世博大道1200号'
      },
      {
        'id': 4,
        'price': 0,
        'title': 'Hit燃脂战神',
        'teacher_img': 'http://img1.cache.netease.com/catchpic/A/A5/A5F8F7A546CF3CF7C0EF6F1D02AC94D5.jpg',
        'status': '',
        'tags': ['协调', '减脂'],
        'teacher': 'CC',
        'startTime': '2020/11/27 20:00',
        'endTime': '2020/11/27 22:30',
        'fullNum': 12,
        'nowNum': 3,
        'lessNum': 4,
        'level': 3,
        'timeStr': '20:00~20:30',
        'btnStatus': 0,
        'Venue': '上海梅赛德斯',
        'address': '上海市浦东新区世博大道1200号'
      }
    ]
  }
}

var local_com_classes = {
  errCode: 0,
  data: [
    {
      "month": "5月",
      "year": "2020",
      "count": 3,
      "lst": [
        {
          "id": 1,
          'title': 'Hit燃脂战神',
          'teacher_img': 'http://img1.cache.netease.com/catchpic/A/A5/A5F8F7A546CF3CF7C0EF6F1D02AC94D5.jpg',
          'Venue': '上海梅赛德斯',
          'startTime': '2020/11/27 20:00',
          'endTime': '2020/11/27 22:30',
          'judgeStatus': false
        },
        {
          "id": 2,
          'title': '有氧战斗',
          'teacher_img': 'http://img.idol001.com/thumbnail/2014/09/27/8b3c232b4bae2599823251991f01e1b71411828841.jpg',
          'Venue': '北京小巨蛋',
          'startTime': '2020/11/27 17:00',
          'endTime': '2020/11/27 18:00',
          'judgeStatus': true
        }
      ]
    },
    {
      "month": "4月",
      "year": "2020",
      "count": 3,
      "lst": [
        {
          "id": 1,
          'title': 'Hit燃脂战神',
          'teacher_img': 'http://img1.cache.netease.com/catchpic/A/A5/A5F8F7A546CF3CF7C0EF6F1D02AC94D5.jpg',
          'Venue': '上海梅赛德斯',
          'startTime': '2020/11/27 20:00',
          'endTime': '2020/11/27 22:30',
          'judgeStatus': false
        },
        {
          "id": 2,
          'title': '有氧战斗',
          'teacher_img': 'http://img.idol001.com/thumbnail/2014/09/27/8b3c232b4bae2599823251991f01e1b71411828841.jpg',
          'Venue': '北京小巨蛋',
          'startTime': '2020/11/27 17:00',
          'endTime': '2020/11/27 18:00',
          'judgeStatus': true
        }
      ]
    }
  ]
}

var local_rate_class = {
  errCode: 0,
  data: {
    'id': 1,
    'title': 'Hit燃脂战神',
    'teacherImg': 'http://img1.cache.netease.com/catchpic/A/A5/A5F8F7A546CF3CF7C0EF6F1D02AC94D5.jpg',
    'teacherName': 'GEM',
    'tags': []
  }
}
var local_ensureappoint_class = {
  errCode: 0,
  data: {
    'id': 1,
    'title': 'Hit燃脂战神',
    'teacherImg': 'http://img1.cache.netease.com/catchpic/A/A5/A5F8F7A546CF3CF7C0EF6F1D02AC94D5.jpg',
    'teacherName': 'GEM',
    'startTime': '2020/11/27 08:00',
    'endTime': '2020/11/27 09:00',
    'Venue': '上海梅赛德斯',
    'address': '上海市浦东新区世博大道1200号'
  }

}
var local_sign_daga = {
  errCode: 0,
  data: {
    'id': 1,
    'title': 'Hit燃脂战神',
    'teacherImg': 'http://img1.cache.netease.com/catchpic/A/A5/A5F8F7A546CF3CF7C0EF6F1D02AC94D5.jpg',
    'nowSign': 3
  }
}


var local_card_info = {
  errCode: 0,
  data: [{
    'door_id': 1,
    'door_name': '梅赛德斯奔驰中心',
    'door_img':'http://img1.cache.netease.com/catchpic/A/A5/A5F8F7A546CF3CF7C0EF6F1D02AC94D5.jpg',
    'cards':[
      {
        'card_id':1,
        'card_type':'年卡',
        'card_name':'尊享年卡',
        'st_time':'2020/1/12',
        'ed_time':'2020/12/31',
        'times':-1,
        'perweek':-1,
        'peerday':-1,
      },{
        'card_id':2,
        'card_type':'季卡',
        'card_name':'尊享季卡',
        'st_time':'2020/11/12',
        'ed_time':'2021/1/31',
        'times':28,
        'perweek':-1,
        'peerday':-1,
      },{
        'card_id':3,
        'card_type':'次卡',
        'card_name':'尊享次卡',
        'st_time':'2020/1/12',
        'ed_time':'2020/12/31',
        'times':5,
        'perweek':-1,
        'peerday':-1,
      },{
        'card_id':1,
        'card_type':'体验卡',
        'card_name':'尊享体验卡',
        'st_time':'2020/1/12',
        'ed_time':'2020/12/31',
        'times':2,
        'perweek':-1,
        'peerday':-1,
      }
    ]
  } ,{
    'door_id': 1,
    'door_name': 'EnjoyYoga',
    'door_img':'http://img1.cache.netease.com/catchpic/A/A5/A5F8F7A546CF3CF7C0EF6F1D02AC94D5.jpg',
    'cards':[
      {
        'card_id':1,
        'card_type':'年卡',
        'st_time':'2020/1/12',
        'ed_time':'2020/12/31',
        'times':-1,
        'perweek':-1,
        'peerday':-1,
      },{
        'card_id':2,
        'card_type':'季卡',
        'st_time':'2020/11/12',
        'ed_time':'2021/1/31',
        'times':28,
        'perweek':-1,
        'peerday':-1,
      },{
        'card_id':3,
        'card_type':'次卡',
        'st_time':'2020/1/12',
        'ed_time':'2020/12/31',
        'times':5,
        'perweek':-1,
        'peerday':-1,
      },{
        'card_id':1,
        'card_type':'体验卡',
        'st_time':'2020/1/12',
        'ed_time':'2020/12/31',
        'times':2,
        'perweek':-1,
        'peerday':-1,
      }
    ]
  } 
  ]
}

var local_message_lst={
  errCode:0,
  data:[
    {
      'teacherImg':'http://img1.cache.netease.com/catchpic/A/A5/A5F8F7A546CF3CF7C0EF6F1D02AC94D5.jpg',
      'teacherName':'CC',
      'msg':'《行尸走肉》是一部由弗兰克·德拉邦特执导的美国恐怖电视系列剧，安德鲁·林肯、诺曼·瑞杜斯、劳伦·科汉、史蒂文·元等主演。改编自同名漫画，该剧于2010年10月31日在AMC有线电视网开播，是电视史上第一部正宗的丧尸电视剧。',
      'sendTime':'2020/11/28'
    },
    {
      'teacherImg':'http://img.improve-yourmemory.com/pic/4f138809da94a79d0bf71b8881a84add-2.jpg',
      'teacherName':'Gem',
      'msg':'《行尸走肉》是一部由弗兰克·德拉邦特执导的美国恐怖电视系列剧，安德鲁·林肯、诺曼·瑞杜斯、劳伦·科汉、史蒂文·元等主演。改编自同名漫画，该剧于2010年10月31日在AMC有线电视网开播，是电视史上第一部正宗的丧尸电视剧。',
      'sendTime':'2020/11/20'
    }
  ]
}



// module.exports={
//   local_banner:local_banner
// }

export {
  local_doors,
  local_classes_type,
  local_classes,
  local_com_classes,
  local_rate_class,
  local_ensureappoint_class,
  local_sign_daga,
  local_card_info,
  local_message_lst
}