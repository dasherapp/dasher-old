import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => (
  <div className="not-found-page">
    <h1>Not Found</h1>
    <Link to="/">Go home</Link>
  </div>
)

export default NotFoundPage
