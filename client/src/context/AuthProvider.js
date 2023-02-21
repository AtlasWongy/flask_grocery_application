import { createContex, useState } from "react";

const AuthContext = createContex({})

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({})

    return (
        <AuthContext.AuthProvider value = {{ auth, setAuth }}>
            {children}
        </AuthContext.AuthProvider>
    )
}

export default AuthContext;