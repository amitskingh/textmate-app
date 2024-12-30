import React from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom" // Correct component for redirection
import { jwtDecode } from "jwt-decode" // Library to decode the JWT

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, token } = useSelector((state) => state.auth)

  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace /> // Redirect to login if not authenticated
  }

  try {
    const decodedToken = jwtDecode(token)
    const currentTimestamp = Math.floor(Date.now() / 1000)

    // Check if the token is expired
    if (decodedToken.exp < currentTimestamp) {
      return <Navigate to="/login" replace /> // Redirect if the token has expired
    }
  } catch (error) {
    // console.error("Error decoding token:", error)
    return <Navigate to="/login" replace /> // Redirect if the token is invalid
  }

  return children // Render children if the token is valid and user is authenticated
}

export default ProtectedRoute
