import React, { Component } from "react"
import { Route, redirect } from "react-router-dom"
import { useSelector } from "react-redux"

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, tokenExpiration } = useSelector(
    (state) => state.auth
  )
  const currentTimestamp = Math.floor(Date.now() / 1000)

  if (!isAuthenticated || tokenExpiration < currentTimestamp) {
    return redirect("/login")
  }

  return children
}

export default ProtectedRoute
