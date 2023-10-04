import React from 'react'

export default function UserSelection({ users }) {
  return (
    <select id="users" style={{width: "20%"}}>
      <option disabled selected value> -- select an option -- </option>
      {users.map(user => (
        <option key={user.id} value={user.name}>{user.name}</option>)
      )}
    </select>
  )
}
