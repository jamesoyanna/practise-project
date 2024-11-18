 import Auth from './auth'
import View from '@/views'  // Import view component

// AuthLayout component for authentication layout
const AuthLayout = () => {

    return (
        <div className="app-layout-blank flex flex-auto flex-col h-[100vh]">
             <Auth>
                    <View />
                </Auth>

        </div>
    )
}

export default AuthLayout
