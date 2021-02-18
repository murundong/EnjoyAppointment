export default{
  data:{
    GetOpenidByCode:'/Data/GetOpenidByCode',
    GetUInfoByOpenId:'/Data/GetUserInfoByOpenId',
    UpdateUserInfoHome:'/Data/UpdateUserInfoHome',
    GetBanners:'/Data/GetBanners',
    GetDoors:'/Data/GetDoors',
    GetTeacherDoors:'/Data/GetTeacherDoors',
    GetDoorsById:'/Data/GetDoorsById'
  },
  cardTemplate:{
    GetTemplates:'/Data/GetCardTempalte',
    GetCardTemplateById:'/Data/GetCardTemplateById',
    CreateCardTempalte:'/Data/CreateCardTempalte',
    UpdateCardtemplate:'/Data/UpdateCardtemplate',
    GetDoorCardSelect:'/Data/GetDoorCardSelect',
  },
  Subject:{
    GetSubjects:'/Data/GetSubjects',
    CreateSubject:'/Data/CreateSubject',
    GetSubjectById:'/Data/GetSubjectById',
    UpdateSubject:'/Data/UpdateSubject',
    GetDoorInfo:'/Data/GetDoorInfo'
  },
  process:{
    UploadFile:'/Home/UploadFile',
    MvcUploadFile:'/Home/UploadFile',
    CreateDoors:'/Data/CreateDoors',
    UpdateDoors:'/Data/UpdateDoors',
    UpdateUInfoSetting:'/Data/UpdateUserInfoSetting'
  },
  Lessons:{
    GetDoorInfo:'/Data/GetDoorInfo',
    GetDoorTags:'/Appoint/GetDoorTags',
    GetAppointLessons:'/Appoint/GetAppointLessons',
    GetUserCanUseDoorCards:'/Appoint/GetUserCanUseDoorCards',
    AppointCourse:'/Appoint/AppointCourse',
    CancelAppointCourse:'/Appoint/CancelAppointCourse',
    QueueAppointCourse:'/Appoint/QueueAppointCourse',
    CancelQueue:'/Appoint/CancelQueue'
  },
  Courses:{
    GetAdminCourseByDate:"/Data/GetAdminCourseByDate",
    CreateCourse:"/Data/CreateCourse" ,
    GetAddCourseData:'/Data/GetAddCourseData',
    GetCourseById:'/Data/GetCourseById',
    UpdateCourse:'/Data/UpdateCourse',
    QuickCourse:'/Data/QuickCourse',
    DeleteCourse:'/Data/DeleteCourse',
    GetWeekCourse:'/Data/GetWeekCourse',
    GetJudgeCourseInfo:'/Appoint/GetJudgeCourseInfo',
    JudgeCourse:'/Appoint/JudgeCourse'
  },
  UInfo:{
    RemarkUser:'/Data/RemarkUser',
    GetUserLst_Admin:'/Data/GetUserLst_Admin',
    AllocRole:'/Data/AllocRole',
    AddUserAttention:'/Data/AddUserAttention',
    GetUserLst_Door:'/Data/GetUserLst_Door',
    GetUserCardsInfo:'/Data/GetUserCardsInfo',
    CheckUserBlack:'/Data/CheckUserBlack',
    CheckUserHasManageMenu:'/Data/CheckUserHasManageMenu'
  },
  Cards:{
    GetUserCards:'/Data/GetUserCards',
    GetUserDoorCards:'/Data/GetUserDoorCards',
    GetDoorCardTemplates:'/Data/GetDoorCardTemplates',
    AddUserACard:'/Data/AddUserACard',
    GetDoorUserInfo:'/Data/GetDoorUserInfo',
    DeleteUserCards:'/Data/DeleteUserCards',
    UpdateUserCardsInfo:'/Data/UpdateUserCardsInfo'
  },
  Appoint:{
    GetMyAppointWait:'/Appoint/GetMyAppointWait',
    GetMyAppointComp:'/Appoint/GetMyAppointComp'
  }
}