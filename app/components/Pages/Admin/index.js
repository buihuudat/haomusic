import React from 'react';

import './index.sass';

class AdminPage extends React.Component {
  
  render() {
    return (
      <div className='admin container'>
        <table className="admin-table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Account</th>
              <th scope="col">Phone</th>
              <th scope="col">Primary</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Bui Huu Dat</td>
              <td>buihuudat</td>
              <td>0987651054</td>
              <td>1</td>
              <td>Edit</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default AdminPage;