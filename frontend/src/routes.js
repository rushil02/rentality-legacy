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
      verifyApplicationDiscount: 'verify-promo-use/application/:houseUUID',
      verifyHouseDiscount: 'verify-promo-use/house/:houseUUID'
  }),
  house: include('/property', {
      details: 'details/:houseUUID'
  }),
  user: include('/user', {
      info: 'info'
  })
};


