import MissedOnboarding from "@/components/onboarding/MissedOnboardingTemplate"
import OnboardingTableTemplate from "@/components/onboarding/OnboardingTableTemplate"
import { injectReducer } from '@/store'
import reducer from '@/store/slices/onboarding'

injectReducer('onboardingList', reducer)

const Onboarding = () => {
    return (
        <div className=" flex flex-col gap-5 ">
            <MissedOnboarding/>
           <OnboardingTableTemplate/>
        </div>
    )
}

export default Onboarding
