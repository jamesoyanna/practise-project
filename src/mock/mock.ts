import { createServer } from 'miragejs'
import appConfig from '@/configs/app.config'

import { signInUserData } from './data/authData'
import { dashboardData } from './data/dashboardData';
import { hubdashboardData } from './data/hubdashboardData';
import { StockData,stockAnalyticsData, } from './data/stockData';
import { maintenancedashboardData } from './data/maintenanceData';
import { officerdashboardData } from './data/officerdashboardData';
import { employeeData } from './data/employeeData';
import { accountingData , expenseData} from './data/accountingData';
import { assetsData } from './data/assetsData';
import { settingsData } from './data/settings';
import {
    ordersData,
    rejectedordersData,
    orderAnalyticsData,
    hubsData,
} from './data/orderData'
import { customerB2cData } from './data/customerData'
import { customerB2bData } from './data/b2bData'
import { onboardingData, missedOnboardingData } from './data/onboardingData'
import { inStockData } from './data/inStockData'
import { dueInvoicesData } from './data/unpaidInvoices';

import { authFakeApi, dashboardFakeApi, ordersFakeApi, hubsFakeApi, customersB2bFakeApi, accountingFakeApi, employeesFakeApi, hubdashboardFakeApi, stockFakeApi, maintenancedashboardFakeApi } from './fakeApi'

import customerFakeApi from './fakeApi/customersFakeApi'
import onboardingFakeApi from './fakeApi/onboardingFakeApi'
import inStockFakeApi from './fakeApi/instockFakeApi'
import settingsDataFakeApi from './fakeApi/settingsFakeApi';
import dueInvoicesFakeApi from './fakeApi/dueInvoicesFakeApi';
import assetsFakeApi from './fakeApi/assetsFakeApi';
import officerdashboardFakeApi from './fakeApi/officerDashboardFakeApi';


const { apiPrefix } = appConfig

export function mockServer({ environment = 'test' }) {
    return createServer({
        environment,
        seeds(server) {
            server.db.loadData({
                signInUserData,
                dashboardData,
                ordersData,
                accountingData,
                assetsData,
                hubsData,
                customerB2cData,
                customerB2bData,
                onboardingData,
                missedOnboardingData,
                inStockData,
                orderAnalyticsData,
                expenseData,
                employeeData,
                settingsData,
                hubdashboardData,
                StockData,
                maintenancedashboardData,
                stockAnalyticsData,
                officerdashboardData,
                rejectedordersData,
                dueInvoicesData
            })
        },
        routes() {
            this.urlPrefix = ''
            this.namespace = ''
            this.passthrough((request) => {
                const isExternal = request.url.startsWith('http')
                return isExternal
            })
            this.passthrough()

            authFakeApi(this, apiPrefix)
            dashboardFakeApi(this, apiPrefix)
            ordersFakeApi(this, apiPrefix)
            hubsFakeApi(this, apiPrefix)
            accountingFakeApi(this, apiPrefix)
            assetsFakeApi(this, apiPrefix)
            customerFakeApi(this, apiPrefix)
            customersB2bFakeApi(this, apiPrefix)
            onboardingFakeApi(this, apiPrefix)
            inStockFakeApi(this, apiPrefix)
            employeesFakeApi(this, apiPrefix)
            settingsDataFakeApi(this, apiPrefix)
            hubdashboardFakeApi(this, apiPrefix)
            stockFakeApi(this, apiPrefix)
            maintenancedashboardFakeApi(this, apiPrefix)
            officerdashboardFakeApi(this, apiPrefix)
            dueInvoicesFakeApi(this, apiPrefix)
        },
    })
}