import SignUpForm from './SignUpForm'

const SignUp = () => {
    return (
        <>
            <div className="mb-8">
                <h4 className="mb-1">Sign Up</h4>
            </div>
            <SignUpForm disableSubmit={false} />
        </>
    )
}

export default SignUp
