import SignInForm from './SignInForm'

const SignIn = () => {
    return (
        <>
       <div className="mb-8 text-center">
    <h4 className="mb-1 mt-4">Homefort Dashboard</h4>
</div>

<SignInForm disableSubmit={false} />

        </>
    )
}

export default SignIn
