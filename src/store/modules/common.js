import { getCode } from '@/api/common/common'
import { getRiskList, getImageSelect, sanQueryStation, queryAgentCode } from '@/api/common/common'
/**
 * 多个页面使用的属性和方法
 */
const mutationsType = {
  setManagementAgency: 'setManagementAgency',
  setManageComMap: 'setManageComMap',
  setManagement: 'setManagement',
  setDistributionChannel: 'setDistributionChannel',
  setCoding: 'setCoding',
  setMarketingDitch: 'setMarketingDitch',
  setMarketingDitchPrint: 'setMarketingDitchPrint',
  setProblem: 'setProblem',
  setAdoptObj: 'setAdoptObj',
  setGender: 'setGender',
  setIdType: 'setIdType',
  setImageSelect: 'setImageSelect',
  setNativeplace: 'setNativeplace',
  setDentype: 'setDentype',
  setFirstphone: 'setFirstphone',
  setOccupationType: 'setOccupationType',
  setRecognizee: 'setRecognizee',
  setSource: 'setSource',
  setVipValue: 'setVipValue',
  setUwpopedom: 'setUwpopedom',
  setUwstatus: 'setUwstatus',
  setUwlevel: 'setUwlevel',
  setNotification: 'setNotification',
  setRnewFlag: 'setRnewFlag',
  setAgentCode: 'setAgentCode'
  // setInstitutions: 'setInstitutions'
}
/**
 * managementAgency:管理机构
 * marketingDitch:销售渠道
 * marketingDitchPrint   综合打印-函件打印交接清单  销售渠道
 * Problem:问题件类型
 * sendObj:问题件录入发送对象
 * adoptObj:问题件录入接受对象
 * gender:问题进修改组件的业务员编码页面的性别选项
//  * institutions:优先机构
 * @type {Object}
 * setDistributionChannel:销售渠道
 * @type {Object}
 * coding:险种编码
 * @type {Object}
 * nativeplace:籍贯
 * dentype:居民类型
 * firstphone:联系电话
 * occupationType:职业类别
 * recognizee:系被保人
 * source:主要收入来源
 * vipValue:vip客户
 * uwpopedom:核保级别
 * uwstatus:核保任务状态
 * uwlevel:业务员等级
 * notification:通知书类型
 * rnewFlag:是否自动申请续保
 */
const common = {
  state: {
    managementAgency: [],
    management: [],
    coding: [],
    marketingDitch: [],
    marketingDitchPrint: [],
    problem: [],
    adoptObj: [],
    gender: [],
    idType: [],
    imageSelect: [],
    nativeplace: [],
    dentype: [],
    firstphone: [],
    occupationType: [],
    recognizee: [],
    source: [],
    vipValue: [],
    uwpopedom: [],
    uwstatus: [],
    uwlevel: [],
    notification: [],
    prtNoContractInformation: '', // 投保单号码
    relationNoContractInformation: '', // 关联投保单号
    rnewFlag: [], // 是否自动申请续保
    manageComMap: {},
    agentCode: []
    // institutions: []
  },
  mutations: {
    [mutationsType.setManagementAgency]: (state, managementAgency) => {
      state.managementAgency = managementAgency
    },
    [mutationsType.setManagement]: (state, management) => {
      state.management = management
    },
    [mutationsType.setManageComMap]: (state, manageComMap) => {
      state.manageComMap = manageComMap
    },
    [mutationsType.setCoding]: (state, coding) => {
      state.coding = coding
    },
    [mutationsType.setMarketingDitch]: (state, marketingDitch) => {
      state.marketingDitch = marketingDitch
    },
    [mutationsType.setMarketingDitchPrint]: (state, marketingDitchPrint) => {
      state.marketingDitchPrint = marketingDitchPrint
    },
    [mutationsType.setProblem]: (state, problem) => {
      state.problem = problem
    },
    [mutationsType.setAdoptObj]: (state, adoptObj) => {
      state.adoptObj = adoptObj
    },
    [mutationsType.setGender]: (state, gender) => {
      state.gender = gender
    },
    [mutationsType.setIdType]: (state, idType) => {
      state.idType = idType
    },
    [mutationsType.setImageSelect]: (state, imageSelect) => {
      state.imageSelect = imageSelect
    },
    [mutationsType.setNativeplace]: (state, nativeplace) => {
      state.nativeplace = nativeplace
    },
    [mutationsType.setDentype]: (state, dentype) => {
      state.dentype = dentype
    },
    [mutationsType.setFirstphone]: (state, firstphone) => {
      state.firstphone = firstphone
    },
    [mutationsType.setOccupationType]: (state, occupationType) => {
      state.occupationType = occupationType
    },
    [mutationsType.setRecognizee]: (state, recognizee) => {
      state.recognizee = recognizee
    },
    [mutationsType.setSource]: (state, source) => {
      state.source = source
    },
    [mutationsType.setVipValue]: (state, vipValue) => {
      state.vipValue = vipValue
    },
    [mutationsType.setUwpopedom]: (state, uwpopedom) => {
      state.uwpopedom = uwpopedom
    },
    [mutationsType.setUwstatus]: (state, uwstatus) => {
      state.uwstatus = uwstatus
    },
    [mutationsType.setUwlevel]: (state, uwlevel) => {
      state.uwlevel = uwlevel
    },
    [mutationsType.setNotification]: (state, notification) => {
      state.notification = notification
    },
    [mutationsType.setRnewFlag]: (state, rnewFlag) => {
      state.rnewFlag = rnewFlag
    },
    [mutationsType.setAgentCode]: (state, agentCode) => {
      state.agentCode = agentCode
    }
    // [mutationsType.setInstitutions]: (state, institutions) => {
    //   state.institutions = institutions
    // }
  },
  actions: {
    GetManagement({ commit }) { // 登陆管理机构查询
      const jsonData = {
        codeType: 'station'
      }
      return new Promise((resolve, reject) => {
        getCode(jsonData).then(response => {
          // console.log(response, '管理机构')
          const data = response.data
          const management = data.body
          const manageComMap = {}
          for (const m of management) {
            manageComMap[m.code] = m.codeName
          }
          commit(mutationsType.setManageComMap, manageComMap)
          commit(mutationsType.setManagement, management)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetManagementAgency({ commit }) { // 页面内管理机构
      return new Promise((resolve, reject) => {
        sanQueryStation().then(response => {
          // console.log(response, '管理机构')
          const data = response.data
          const managementAgency = data.body
          const manageComMap = {}
          for (const m of managementAgency) {
            manageComMap[m.code] = m.codeName
          }
          commit(mutationsType.setManageComMap, manageComMap)
          commit(mutationsType.setManagementAgency, managementAgency)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetCoding({ commit }) { // 险种编码
      const jsonData = {
        codeType: 'RiskCode'
      }
      return new Promise((resolve, reject) => {
        getRiskList(jsonData).then(response => {
          const data = response.data
          const coding = data.body
          commit(mutationsType.setCoding, coding)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetMarketingDitch({ commit }) { // 销售渠道
      const jsonData = {
        codeType: 'salechnl'
      }
      return new Promise((resolve, reject) => {
        getCode(jsonData).then(response => {
          // console.log(response, '销售渠道')
          const data = response.data
          const marketingDitch = data.body
          commit(mutationsType.setMarketingDitch, marketingDitch)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetMarketingDitchPrint({ commit }) { // 销售渠道
      const jsonData = {
        codeType: 'salechnlPrint'
      }
      return new Promise((resolve, reject) => {
        getCode(jsonData).then(response => {
          // console.log(response, '销售渠道')
          const data = response.data
          const marketingDitchPrint = data.body
          commit(mutationsType.setMarketingDitchPrint, marketingDitchPrint)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetProblem({ commit }) { // 问题件修改页面中的问题件类型和无扫描目录组件的问题件录入页面的题件录入发送对象方法
      const jsonData = {
        codeType: 'backobj'
      }
      return new Promise((resolve, reject) => {
        getCode(jsonData).then(response => {
          // console.log(response, '问题件类型')
          const data = response.data
          const problem = data.body
          commit(mutationsType.setProblem, problem)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetSex({ commit }) { // 性别
      const jsonData = {
        codeType: 'sex'
      }
      return new Promise((resolve, reject) => {
        getCode(jsonData).then(response => {
          const data = response.data
          const gender = data.body.filter(function(item) {
            return (item.code === '0' || item.code === '1')
          })
          commit(mutationsType.setGender, gender)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetNotification({ commit }) { // 通知书类型
      const jsonData = {
        codeType: 'noticetype'
      }
      return new Promise((resolve, reject) => {
        getCode(jsonData).then(response => {
          const data = response.data
          // 注：“07-首期交费通知书”，已与业务确认，该通知书不用了，不用开发。其中“35-内部保全转办函”和“32、38为银保通通知书”，因新核心一期上线时无保全和银保通内容，所以此三种类型通知书暂不开发
          const notification = data.body.filter(function(item) {
            return (item.code !== '07' && item.code !== '32' && item.code !== '35' && item.code !== '38')
          })
          commit(mutationsType.setNotification, notification)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 综合打印-补打承保通知书-代理人编码下拉框
    GetAgentCode({ commit }) {
      return new Promise((resolve, reject) => {
        queryAgentCode().then(response => {
          const data = response.data
          if (data.code === 0 && data.body) {
            this.selectdatas = data.body
          } else {
            this.$message.error(data.message)
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetSalesmanGrade({ commit }) { // 业务员等级
      const jsonData = {
        codeType: 'UWLevel'
      }
      return new Promise((resolve, reject) => {
        getCode(jsonData).then(response => {
          const data = response.data
          const uwlevel = data.body
          commit(mutationsType.setUwlevel, uwlevel)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    Getgrade({ commit }) { // 核保级别
      const jsonData = {
        codeType: 'uwpopedom'
      }
      return new Promise((resolve, reject) => {
        getCode(jsonData).then(response => {
          const data = response.data
          const uwpopedom = data.body
          commit(mutationsType.setUwpopedom, uwpopedom)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetAdoptObj({ commit }) { // 问题件录入接受对象
      const jsonData = {
        codeType: 'question',
        code: '0'
      }
      return new Promise((resolve, reject) => {
        getCode(jsonData).then(response => {
          // console.log(response, '问题件录入接受对象')
          const data = response.data
          const adoptObj = data.body
          commit(mutationsType.setAdoptObj, adoptObj)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetGender({ commit }) { // 业务员编码页面的性别选项
      const jsonData = {
        codeType: 'Sex'
      }
      return new Promise((resolve, reject) => {
        getCode(jsonData).then(response => {
          // console.log(response, '问题件录入接受对象')
          const data = response.data
          const gender = data.body
          commit(mutationsType.setGender, gender)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetIdType({ commit }) { // 证件类型
      const jsonData = {
        codeType: 'idtype'
      }
      return new Promise((resolve, reject) => {
        getCode(jsonData).then(response => {
          const data = response.data
          const idType = data.body
          commit(mutationsType.setIdType, idType)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetTaskState({ commit }) { // 核保任务状态
      const jsonData = {
        codeType: 'uwstatus'
      }
      return new Promise((resolve, reject) => {
        getCode(jsonData).then(response => {
          const data = response.data
          const uwstatus = data.body
          commit(mutationsType.setUwstatus, uwstatus)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetNativeplace({ commit }) { // 籍贯
      const jsonData = {
        codeType: 'nativeplace'
      }
      return new Promise((resolve, reject) => {
        getCode(jsonData).then(response => {
          const data = response.data
          const nativeplace = data.body
          commit(mutationsType.setNativeplace, nativeplace)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetVipValue({ commit }) { // vip客户
      const jsonData = {
        codeType: 'VIPValue'
      }
      return new Promise((resolve, reject) => {
        getCode(jsonData).then(response => {
          const data = response.data
          const vipValue = data.body
          commit(mutationsType.setVipValue, vipValue)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetDentype({ commit }) { // 居民类型
      const jsonData = {
        codeType: 'dentype'
      }
      return new Promise((resolve, reject) => {
        getCode(jsonData).then(response => {
          const data = response.data
          const dentype = data.body
          // console.log(dentype, '9999')
          commit(mutationsType.setDentype, dentype)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetPhone({ commit }) { // 联系电话
      const jsonData = {
        codeType: 'firstphone'
      }
      return new Promise((resolve, reject) => {
        getCode(jsonData).then(response => {
          const data = response.data
          const firstphone = data.body
          // console.log(firstphone, '9999')
          commit(mutationsType.setFirstphone, firstphone)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetOccupationType({ commit }) { // 职业类别
      const jsonData = {
        codeType: 'OccupationType'
      }
      return new Promise((resolve, reject) => {
        getCode(jsonData).then(response => {
          const data = response.data
          const occupationType = data.body
          commit(mutationsType.setOccupationType, occupationType)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetRecognizee({ commit }) { // 系被保人
      const jsonData = {
        codeType: 'relation'
      }
      return new Promise((resolve, reject) => {
        getCode(jsonData).then(response => {
          const data = response.data
          const recognizee = data.body
          commit(mutationsType.setRecognizee, recognizee)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetSource({ commit }) { // 主要收入来源
      const jsonData = {
        codeType: 'incomeway'
      }
      return new Promise((resolve, reject) => {
        getCode(jsonData).then(response => {
          const data = response.data
          const source = data.body
          // console.log(source, '9999')
          commit(mutationsType.setSource, source)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetRnewFlag({ commit }) { // 是否自动申请续保
      const jsonData = {
        codeType: 'rnewflag'
      }
      return new Promise((resolve, reject) => {
        getCode(jsonData).then(response => {
          const data = response.data
          const rnewFlag = data.body
          // console.log(rnewFlag, '9999')
          commit(mutationsType.setRnewFlag, rnewFlag)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetImageSelect({ commit }) { // 影像类别
      return new Promise((resolve, reject) => {
        getImageSelect().then(response => {
          const data = response.data
          const imageSelect = data.body
          console.log(imageSelect)
          commit(mutationsType.setImageSelect, imageSelect)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
    // GetInstitutions({ commit }) { // 优先机构
    //   const jsonData = {
    //     codeType: 'PreCom'
    //   }
    //   return new Promise((resolve, reject) => {
    //     getCode(jsonData).then(response => {
    //       console.log(response, '优先机构')
    //       const data = response.data
    //       const institutions = data.body
    //       commit(mutationsType.setInstitutions, institutions)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // }
  }
}
export default common
