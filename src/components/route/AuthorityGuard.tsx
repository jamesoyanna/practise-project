import { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import useAuthority from '@/utils/hooks/useAuthority'

type AuthorityGuardProps = PropsWithChildren<{ // Define type for props
    userAuthority?: string[] // Optional user authority array
    authority?: string[]  // Optional required authority array
}>

const AuthorityGuard = (props: AuthorityGuardProps) => { // Define AuthorityGuard component
    const { userAuthority = [], authority = [], children } = props // Destructure props

    const roleMatched = useAuthority(userAuthority, authority) // Check if user authority matches required authority

    // Render children if user has required authority, otherwise navigate to access denied page
    return <>{roleMatched ? children : <Navigate to="/access-denied" />}</>
}

export default AuthorityGuard
