import Mock from 'mockjs'
import loginAPI from './login'
import organizationUnitAPI from './organizationUnit'
import projectAPI from './project'
import warningAPI from './warning'
import projectProgressAPI from './decisionSupport/projectProgress'
import investmentProgressAPI from './decisionSupport/investmentProgress'
import paymentProgressAPI from './decisionSupport/paymentProgress'
import qualitySafetyAPI from './decisionSupport/qualitySafety'
import contractAPI from './contract'
import datDictAPI from './dataDict'
import inspectionAPI from './inspection'
import progressStatsAPI from './progress'

Mock.setup({
  timeout: '350-600'
})

// 登录相关
Mock.mock(/\/api\/TokenAuth\/Token/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/api\/services\/app\/User\/GetMe/, 'get', loginAPI.getUserInfo)

// 项目信息相关
Mock.mock(/\/api\/services\/app\/Project\/getOrganizationUnitTree/, 'get', organizationUnitAPI.getOrganizationUnitTree)
Mock.mock(/\/api\/services\/app\/Project\/getProjectMapOverview/, 'get', projectAPI.getProjectMapOverview)
Mock.mock(/\/api\/services\/app\/Project\/getProjectMapInfoList/, 'get', projectAPI.getProjectMapInfoList)
Mock.mock(/\/api\/services\/app\/Project\/getGroupProjectList/, 'get', projectAPI.getGroupProjectList)
Mock.mock(/\/api\/services\/app\/Project\/getStatusCount/, 'get', projectAPI.getStatusCount)
Mock.mock(/\/api\/services\/app\/Project\/getStatusAmount/, 'get', projectAPI.getStatusAmount)
Mock.mock(/\/api\/services\/app\/Project\/getTypeCount/, 'get', projectAPI.getTypeCount)
Mock.mock(/\/api\/services\/app\/Project\/getTypeAmount/, 'get', projectAPI.getTypeAmount)
Mock.mock(/\/api\/services\/app\/Project\/getDefaultProjectTypes/, 'get', projectAPI.getDefaultProjectTypes)
Mock.mock(/\/api\/services\/app\/ProjectStats\/getTypeAmounts/, 'get', projectAPI.getTypeAmounts)
Mock.mock(/\/api\/services\/app\/ProjectStats\/getPhaseAmounts/, 'get', projectAPI.getTypeAmounts)
Mock.mock(/\/api\/services\/app\/ProjectStats\/getStatusAmounts/, 'get', projectAPI.getTypeAmounts)
Mock.mock(/\/api\/services\/app\/ProjectWeeklyReport\/getList/, 'get', projectAPI.getWeeklyReport)
Mock.mock(/\/api\/services\/app\/ProjectStats\/getTypeQuantityPieChart/, 'get', projectAPI.getTypeQuantityPieChart)
Mock.mock(/\/api\/services\/app\/ProjectStats\/getPhaseQuantityPieChart/, 'get', projectAPI.getPhaseQuantityPieChart)
Mock.mock(/\/api\/services\/app\/ProjectStats\/getStatusQuantityPieChart/, 'get', projectAPI.getStatusQuantityPieChart)

// 合同相关
Mock.mock(/\/api\/services\/app\/ContractStats\/getTypeAmounts/, 'get', contractAPI.getTypeAmounts)
Mock.mock(/\/api\/services\/app\/ContractStats\/getStatusAmounts/, 'get', contractAPI.getTypeAmounts)
Mock.mock(/\/api\/services\/app\/ContractStats\/getProjectStatusAmounts/, 'get', contractAPI.getProjectStatusAmounts)
Mock.mock(/\/api\/services\/app\/ContractStats\/getAmountStats/, 'get', contractAPI.getAmountStats)

// 预警
Mock.mock(/\/api\/services\/app\/WarningStats\/getProgressStats/, 'get', warningAPI.getProgressStats)
Mock.mock(/\/api\/services\/app\/WarningStats\/getInvestmentStats/, 'get', warningAPI.getInvestmentStats)
Mock.mock(/\/api\/services\/app\/WarningStats\/getQualityStats/, 'get', warningAPI.getQualityStats)

// 辅助决策-项目进度
Mock.mock(/\/api\/services\/app\/ProjectProgress\/getProjectProgress/, 'get', projectProgressAPI.getProjectProgress)
Mock.mock(/\/api\/services\/app\/ProjectProgress\/getSectionProgress/, 'get', projectProgressAPI.getSectionProgress)
Mock.mock(/\/api\/services\/app\/ProjectProgress\/getProjectStats/, 'get', projectProgressAPI.getProjectStats)

// 辅助决策-投资进度
Mock.mock(/\/api\/services\/app\/InvestmentProgress\/getOverviewInvestmentStats/, 'get', investmentProgressAPI.getOverviewInvestmentStats)
Mock.mock(/\/api\/services\/app\/InvestmentProgress\/getMonthlyInvestmentStats/, 'get', investmentProgressAPI.getMonthlyInvestmentStats)
Mock.mock(/\/api\/services\/app\/InvestmentProgress\/getCompanyInvestmentStats/, 'get', investmentProgressAPI.getCompanyInvestmentStats)
Mock.mock(/\/api\/services\/app\/InvestmentProgress\/getProjectInvestmentStats/, 'get', investmentProgressAPI.getProjectInvestmentStats)
Mock.mock(/\/api\/services\/app\/InvestmentProgress\/getSectionInvestmentStats/, 'get', investmentProgressAPI.getSectionInvestmentStats)

// 辅助决策-支付进度
Mock.mock(/\/api\/services\/app\/PaymentProgress\/getOverviewPaymentStats/, 'get', paymentProgressAPI.getOverviewPaymentStats)
Mock.mock(/\/api\/services\/app\/PaymentProgress\/getMonthlyPaymentStats/, 'get', paymentProgressAPI.getMonthlyPaymentStats)
Mock.mock(/\/api\/services\/app\/PaymentProgress\/getCompanyPaymentStats/, 'get', paymentProgressAPI.getCompanyPaymentStats)
Mock.mock(/\/api\/services\/app\/PaymentProgress\/getProjectPaymentStats/, 'get', paymentProgressAPI.getProjectPaymentStats)
Mock.mock(/\/api\/services\/app\/PaymentProgress\/getSectionPaymentStats/, 'get', paymentProgressAPI.getSectionPaymentStats)

// 辅助决策-质量安全
Mock.mock(/\/api\/services\/app\/QualitySafety\/getStats/, 'get', qualitySafetyAPI.getStats)
Mock.mock(/\/api\/services\/app\/QualitySafety\/getQualityStats/, 'get', qualitySafetyAPI.getQualityStats)
Mock.mock(/\/api\/services\/app\/QualitySafety\/getSafetyStats/, 'get', qualitySafetyAPI.getSafetyStats)
Mock.mock(/\/api\/services\/app\/QualitySafety\/getCompanyStats/, 'get', qualitySafetyAPI.getCompanyStats)
Mock.mock(/\/api\/services\/app\/QualitySafety\/getProjectStats/, 'get', qualitySafetyAPI.getProjectStats)
Mock.mock(/\/api\/services\/app\/QualitySafety\/getSectionStats/, 'get', qualitySafetyAPI.getSectionStats)
Mock.mock(/\/api\/services\/app\/QualitySafety\/getPagedIssueList/, 'get', qualitySafetyAPI.getPagedIssueList)

// 质安环保巡检
Mock.mock(/\/api\/services\/app\/inspectionStats\/getQuantityStats/, 'get', inspectionAPI.getQuantityStats)
Mock.mock(/\/api\/services\/app\/inspectionStats\/getCompanyQuantityStats/, 'get', inspectionAPI.getCompanyQuantityStats)
Mock.mock(/\/api\/services\/app\/inspectionStats\/getProjectQuantityStats/, 'get', inspectionAPI.getProjectQuantityStats)
Mock.mock(/\/api\/services\/app\/inspectionStats\/getGradeStats/, 'get', inspectionAPI.getGradeStats)
Mock.mock(/\/api\/services\/app\/inspectionStats\/getProblemClassStats/, 'get', inspectionAPI.getProblemClassStats)
Mock.mock(/\/api\/services\/app\/inspectionStats\/getCompanyStats/, 'get', inspectionAPI.getCompanyStats)
Mock.mock(/\/api\/services\/app\/inspectionStats\/getCompanyGradeStats/, 'get', inspectionAPI.getCompanyGradeStats)

// 进度
Mock.mock(/\/api\/services\/app\/progressStats\/getVisualProgressPieChart/, 'get', progressStatsAPI.getVisualProgressPieChart)
Mock.mock(/\/api\/services\/app\/progressStats\/getProgressOverview/, 'get', progressStatsAPI.getProgressOverview)
Mock.mock(/\/api\/services\/app\/progressStats\/getCompanyCompleteStats/, 'get', progressStatsAPI.getCompanyCompleteStats)
Mock.mock(/\/api\/services\/app\/progressStats\/getCompanyPlanStats/, 'get', progressStatsAPI.getCompanyPlanStats)
Mock.mock(/\/api\/services\/app\/progressStats\/getVisualProgressList/, 'get', progressStatsAPI.getVisualProgressList)
Mock.mock(/\/api\/services\/app\/progressStats\/getVisualProgressStats/, 'get', progressStatsAPI.getVisualProgressStats)
Mock.mock(/\/api\/services\/app\/progressStats\/getProgressStats/, 'get', progressStatsAPI.getProgressStats)
Mock.mock(/\/api\/services\/app\/progressStats\/getCompanyProgressBarChart/, 'get', progressStatsAPI.getCompanyProgressBarChart)

// 数据字典
Mock.mock(/\/api\/services\/app\/dataDict\/getDicts/, 'get', datDictAPI.getProjectPhases)

Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)

export default Mock
