import {include} from 'named-urls'

export default {
  home: '/',
  blogs: '/blogs/',
  howItWorks: '/pages/how-it-works/',
  listHome: '/property/add/',
  dashboard: '/',

  // APIs
  application: include('/apply', {
      bookingDetails: 'amount/:houseUUID',
      create: 'create-app/:houseUUID',
      tenant: 'tenant-details',
  }),
  promo: include('/promo', {
      verifyApplicationDiscount: 'verify-promo-use/application/tenant',
      verifyHouseDiscount: 'verify-promo-use/house/home_owner'
  }),
  house: include('/property', {
      detail: 'detail/:houseUUID'
  }),
  user: include('/', {
      info: 'cu-info'
  })
};


