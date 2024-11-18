import React from 'react'
import { NavLink } from 'react-router-dom'

const OnboardingTopBar = () => {
    return (
        <>
            <div className="lg:flex items-center justify-between mb-2">
                <h4 className="ml-8 lg:mb-0">Onboarding</h4>
            </div>
            <div className="flex items-center space-x-4 p-3">
                <NavLink
                    to="/new-cylinder"
                    className={({ isActive }) =>
                        isActive
                            ? 'bg-blue-800 p-4 rounded-full xs:rounded-lg font-bold text-base text-white'
                            : 'bg-gray-100 p-4 rounded-full xs:rounded-lg font-bold text-base text-blue-800'
                    }
                >
                    Brand New Cylinder
                </NavLink>
                <NavLink
                    to="/generic-cylinder"
                    className={({ isActive }) =>
                        isActive
                            ? 'bg-blue-800 p-4 rounded-full xs:rounded-lg font-bold text-base text-white'
                            : 'bg-gray-100 p-4 rounded-full xs:rounded-lg font-bold text-base text-blue-800'
                    }
                >
                    Generic Cylinder
                </NavLink>
                <NavLink
                    to="/smart-device"
                    className={({ isActive }) =>
                        isActive
                            ? 'bg-blue-800 p-4 rounded-full xs:rounded-lg font-bold text-base text-white'
                            : 'bg-gray-100 p-4 rounded-full xs:rounded-lg font-bold text-base text-blue-800'
                    }
                >
                    Smart Device
                </NavLink>
            </div>
        </>
    )
}

export default OnboardingTopBar
