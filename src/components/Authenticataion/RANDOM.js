import React, { useEffect, useState, useContext } from 'react';
import { auth } from '../../firebase';

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signup
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

// "@material-ui/styles": "^4.11.4",
//     "@mui/icons-material": "^5.0.3",
//     "@mui/material": "^5.0.0-rc.1",
//     "@mui/styled-engine-sc": "^5.0.3",
//     "@mui/styles": "^5.0.1",
// "material-icons": "^1.8.1",