import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'
import { SUPER_ADMIN, HUB_MANAGER, ACCOUNT_OFFICER, ASSISTANT_HUB_MANAGER, MAINTENANCE_STORE_OFFICER } from '@/constants/roles.constant'
// import { APP_PREFIX_PATH } from '@/constants/route.constant';

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'dashboard',
        path: '/dashboard',
        component: lazy(() => import('@/views/admin/dashboard')),
        authority: [SUPER_ADMIN],
    },
    {
        key: 'cylindertracking',
        path: '/cylinder-tracking',
        component: lazy(() => import('@/views/admin/cylinderTracking/CylinderTracking')),
        authority: [SUPER_ADMIN],
    },
    {
        key: 'hubdashboard',
        path: '/hub-dashboard',
        component: lazy(() => import('@/views/hubs/hub-dashboard/HubDashboard')),
        authority: [HUB_MANAGER],
    },
    {
        key: 'accountofficer',
        path: '/account-officer/dashboard',
        component: lazy(() => import('@/views/accountOfficer/AccountOfficer')),
        authority: [ACCOUNT_OFFICER],
    },
    {
        key: 'account-officer-orders',
        path: '/account-officer/orders',
        component: lazy(() => import('@/views/accountOfficer/orders/Orders')),
        authority: [ACCOUNT_OFFICER],
    },
    {
        key: 'assets',
        path: '/assets',
        component: lazy(() => import('@/views/accountOfficer/Assets')),
        authority: [ACCOUNT_OFFICER],
    },
    {
        key: 'b2b',
        path: '/b2b',
        component: lazy(() => import('@/views/accountOfficer/B2B')),
        authority: [ACCOUNT_OFFICER],
    },
    {
        key: 'invoices',
        path: '/due-invoices',
        component: lazy(() => import('@/views/accountOfficer/Invoices')),
        authority: [ACCOUNT_OFFICER],
    },
    {
        key: 'account-officer-onboarding',
        path: '/account-officer/onboarding',
        component: lazy(() => import('@/views/hubs/onboarding')),
        authority: [ACCOUNT_OFFICER],
    },
    {
        key: 'account-officer-onboarding',
        path: '/account-officer/onboarding/assign/:customerCode',
        component: lazy(() => import('@/components/onboarding/getCustomerRequest')),
        authority: [ACCOUNT_OFFICER],
    },
    {
        key: 'hubs',
        path: '/hubs',
        component: lazy(() => import('@/views/hubs/hub/Hubs')),
        authority: [],
    },
    {
        key: 'hubdetails',
        path: '/hubs/:hubId',
        component: lazy(() => import('@/views/hubs/hub/HubsDetails')),
        authority: [SUPER_ADMIN],
    },
    {
        key: 'accounting',
        path: '/accounting',
        component: lazy(() => import('@/views/admin/accounting/Accounting')),
        authority: [HUB_MANAGER],
    },

    // {
    //     key: 'customers',
    //     path: '/customers',
    //     // component: lazy(() => import('@/views/admin/Customers')),
    //     authority: [],
    // },
    {
        key: 'orders',
        path: '/orders',
        component: lazy(() => import('@/views/admin/orders')),
        authority: [],
    },
    {
        key: 'ordersdetails',
        path: '/order-details/:orderId',
        component: lazy(() => import('@/views/admin/orders/OrderDetails')),
        authority: [],
    },
    {
        key: 'hubemployees',
        path: '/hub-employees',
        component: lazy(() => import('@/views/hubs/hub-employees/HubEmployees')),
        authority: [HUB_MANAGER],
    },
    {
        key: 'hubemployeedetails',
        path: '/employee-details/:staffId',
        component: lazy(() => import('@/views/hubs/hub-employees/HubEmployeeDetails')),
        authority: [HUB_MANAGER],
    },
    {
        key: 'onboarding',
        path: '/onboarding',
        component: lazy(() => import('@/views/hubs/onboarding')),
        authority: [HUB_MANAGER],
    },
    {
        key: 'onboarding',
        path: '/onboarding/missed',
        component: lazy(() => import('@/views/hubs/onboarding/MissedOnboarding')),
        authority: [HUB_MANAGER, ACCOUNT_OFFICER],
    },
    {
        key: 'instock',
        path: '/instock',
        component: lazy(() => import('@/views/hubs/inStock')),
        authority: [HUB_MANAGER],
    },
    {
        key: 'resolution',
        path: '/resolution',
        component: lazy(() => import('@/views/admin/Resolution')),
        authority: [HUB_MANAGER],
    },
    {
        key: 'emergency',
        path: '/emergency',
        component: lazy(() => import('@/views/admin/Resolution')),
        authority: [HUB_MANAGER],
    },
    {
        key: 'settings',
        path: '/settings',
        component: lazy(() => import('@/views/admin/settings/Settings')),
        authority: [],
    },
    {
        key: 'createhub',
        path: '/create-hub',
        component: lazy(() => import('@/views/hubs/hub/Hubs')),
        authority: [SUPER_ADMIN],
    },
    {
     
        key: 'homeuse',
        path: '/customers/b2c',
        component: lazy(() => import('@/views/admin/customers/HomeUse')),
        authority: [],
    },
    {
        key: 'b2bViews',
        path: '/customers/b2c/:customerId',
        component: lazy(() => import('@/views/admin/customers/B2cView')),
        authority: [],
    },
    {
        key: 'b2cViews',
        path: '/customers/b2c/:customerId/wallet-history',
        component: lazy(() => import('@/views/admin/customers/WalletHistory')),
        authority: [],
    },
    {
        key: 'business',
        path: '/customers/b2b',
        component: lazy(() => import('@/views/admin/customers/Business')),
        authority: [],
    },
    {
        key: 'business',
        path: '/customers/b2b/:customerId',
        component: lazy(() => import('@/views/admin/customers/B2bView')),
        authority: [],
    },
    {
        key: 'b2bViews',
        path: '/customers/b2b/:customerId/wallet-history',
        component: lazy(() => import('@/views/admin/customers/B2bWalletHistory')),
        authority: [],
    },
    {
        key: 'stocks',
        path: '/stocks',
        component: lazy(() => import('@/views/hubAssistance/Stock')),
        authority: [ASSISTANT_HUB_MANAGER],
    },
    {
        key: 'smallcylinder',
        path: '/12kg-cylinder',
        component: lazy(() => import('@/components/hubAssistance/TableSize/SmallTableSize')),
        authority: [ASSISTANT_HUB_MANAGER, MAINTENANCE_STORE_OFFICER],
    },
    {
        key: 'mediumcylinder',
        path: '/25kg-cylinder',
        component: lazy(() => import('@/components/hubAssistance/TableSize/MediumTableSize')),
        authority: [ASSISTANT_HUB_MANAGER, MAINTENANCE_STORE_OFFICER],
    },
    {
        key: 'largecylinder',
        path: '/50kg-cylinder',
        component: lazy(() => import('@/components/hubAssistance/TableSize/LargeTableSize')),
        authority: [ASSISTANT_HUB_MANAGER, MAINTENANCE_STORE_OFFICER],
    },
    {
        key: 'smartcylinder',
        path: '/smartcylinder',
        component: lazy(() => import('@/components/hubAssistance/TableSize/SmartDeviceTable')),
        authority: [ASSISTANT_HUB_MANAGER, MAINTENANCE_STORE_OFFICER],
    },
    {
        key: 'stockrequest',
        path: '/stock-request',
        component: lazy(() => import('@/components/hubAssistance/HubStockRequest')),
        authority: [ASSISTANT_HUB_MANAGER, MAINTENANCE_STORE_OFFICER],
    },
    {
        key: 'maintenancedashboard',
        path: '/maintenance-dashboard',
        component: lazy(() => import('@/views/MaintenanceStore/MaintenanceStore')),
        authority: [MAINTENANCE_STORE_OFFICER],
    },
    {
        key: 'smartdevicesdetail',
        path: '/cylinders-onboarded-detail',
        component: lazy(() => import('@/components/hubMaintenance/OnboardedCylinderTable')),
        authority: [MAINTENANCE_STORE_OFFICER, SUPER_ADMIN],
    },
    {
        key: 'genericcylinder',
        path: '/generic-cylinder',
        component: lazy(() => import('@/components/hubMaintenance/onboarding/genericCylinderOnboarding')),
        authority: [MAINTENANCE_STORE_OFFICER],
    },
    {
        key: 'smartcylinder',
        path: '/smart-device',
        component: lazy(() => import('@/components/hubMaintenance/onboarding/smartDeviceOnboarding')),
        authority: [MAINTENANCE_STORE_OFFICER, SUPER_ADMIN],
    },
    {
        key: 'brandnewylinder',
        path: '/new-cylinder',
        component: lazy(() => import('@/views/MaintenanceStore/Onboarding')),
        authority: [MAINTENANCE_STORE_OFFICER],
    },
    {
        key: 'onboardedcylindersdetail',
        path: '/smart-devices-onboarded-detail',
        component: lazy(() => import('@/components/hubMaintenance/OnboardedSmartDeviceTable')),
        authority: [MAINTENANCE_STORE_OFFICER, SUPER_ADMIN],
    },
    {
        key: 'cylindersonboarded',
        path: '/cylinders-onboarded',
        component: lazy(() => import('@/views/MaintenanceStore/CylindersOnboarded')),
        authority: [MAINTENANCE_STORE_OFFICER],
    },
    {
        key: 'smartdevices',
        path: '/smart-devices-onboarded',
        component: lazy(() => import('@/views/MaintenanceStore/SmartDeviceOnboarded')),
        authority: [MAINTENANCE_STORE_OFFICER],
    },
    {
        key: 'maintenanceonboarding',
        path: '/maintenace-onboarding',
        component: lazy(() => import('@/views/MaintenanceStore/Onboarding')),
        authority: [MAINTENANCE_STORE_OFFICER],
    },
    {
        key: 'maintenanceinstock',
        path: '/maintenance-instock',
        component: lazy(() => import('@/views/MaintenanceStore/Instock')),
        authority: [MAINTENANCE_STORE_OFFICER],
    },
    {
        key: 'hubs',
        path: '/hub-new',
        component: lazy(() => import('@/views/hubs/hub/NewHub')),
        authority: [SUPER_ADMIN],
        meta: {
            header: 'Add New Hub',
        },
    },
    {
        key: 'cylindermovement',
        path: '/cylinder-movement',
        component: lazy(() => import('@/components/cylinderTracking/cylinderMovement')),
        authority: [SUPER_ADMIN],
    },
    {
        key: 'rejectedorders',
        path: '/reject-orders',
        component: lazy(() => import('@/views/admin/orders/RejectedOrders')),
        authority: [],
        meta: {
            header: '',
        },
    },

]