import {include} from 'named-urls'

export default {
  home: '/',
  blogs: '/blogs/',
  howItWorks: '/pages/how-it-works/',
  listHome: '/property/add/',
  dashboard: '/',

  // APIs
  application: include('/apply', {
    bookingDetails: 'get-house-detail/:houseUUID',
    create: 'create-app/:houseUUID',
    tenant: 'tenant-details',
  }),
  promo:include('/promo', {
    verify: 'verify-promo-use'
  }),
  house:include('/property',{
    details: 'details'
  }),
  tenant:include('/tenant',{
    details: 'details'
  })

};


