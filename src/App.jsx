import axios from 'axios'
import React, { useEffect, useState } from 'react'

const App = () => {

  let api = "http://localhost:3002/data"
  let [data, setData] = useState([])

  let [nameEdit, setnameData] = useState("")
  let [imgEdit, setimgData] = useState("")
  let [ageEdit, setageData] = useState("")
  let [cityEdit, setcityData] = useState("")
  let [statusEdit, setstatusData] = useState(null)
  let [idx, setidx] = useState(null)

  let [search, setsearch] = useState("")
  let [select, setselect] = useState("")

  let Edituser = ((user) => {
    setnameData(user.name)
    setimgData(user.img)
    setcityData(user.city)
    setageData(user.age)
    setstatusData(user.status)
    setidx(user.id)
  })

  async function get() {
    try {
      let { data } = await axios.get(api)
      setData(data)
      console.log(data);

    } catch (error) {
      console.error(error);

    }
  }
  useEffect(() => {
    get()
  }, [])

  async function HandleSubmit(event) {
    event.preventDefault()
    try {
      await axios.post(api, {
        id: new Date(),
        img: event.target['avatar'].value,
        name: event.target['name'].value,
        age: event.target['age'].value,
        city: event.target['city'].value,
        status: event.target['status'].value == "active",
      })
      get()
    } catch (error) {
      console.error(error);

    }
  }

  async function HandleSubmitEdit(event) {
    event.preventDefault()
    try {
      await axios.put(`${api}/${idx}`, {
        name: nameEdit,
        img: imgEdit,
        city: cityEdit,
        age: ageEdit,
        status: statusEdit == true,
      })
      get()
    } catch (error) {
      console.error(error);

    }
  }

  async function deleteuser(id) {
    try {
      await axios.delete(`${api}/${id}`)
      get()
    } catch (error) {
      console.error(error);

    }
  }

  async function changestatu(user) {
    try {
      await axios.put(`${api}/${user.id}`, {
        ...user,
        status: !user.status
      })
      get()
    } catch (error) {
      console.error(error);

    }
  }


  return (
    <>
      <section className='p-20'>

        <div>

          <div>
            <form onSubmit={HandleSubmit} action="">
              <input name='avatar' className='border p-2 rounded-2xl outline-none' type="text" placeholder='Avatar' />
              <input name='name' className='border p-2 rounded-2xl outline-none' type="text" placeholder='Name' />
              <input name='age' className='border p-2 rounded-2xl outline-none' type="text" placeholder='Age' />
              <input name='city' className='border p-2 rounded-2xl outline-none' type="text" placeholder='city' />
              <select className='border p-2 rounded-2xl outline-none' name="status" id="">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <button type='submit' className='bg-[blue] py-2 px-5 rounded-2xl text-white'>Add</button>
            </form>

            <form onSubmit={HandleSubmitEdit} action="">
              <input value={imgEdit} onChange={(user) => setimgData(user.target.value)} name='avatar' className='border p-2 rounded-2xl outline-none' type="text" placeholder='Avatar' />
              <input value={nameEdit} onChange={(user) => setnameData(user.target.value)} t name='name' className='border p-2 rounded-2xl outline-none' type="text" placeholder='Name' />
              <input value={ageEdit} onChange={(user) => setageData(user.target.value)} name='age' className='border p-2 rounded-2xl outline-none' type="text" placeholder='Age' />
              <input value={cityEdit} onChange={(user) => setcityData(user.target.value)} name='city' className='border p-2 rounded-2xl outline-none' type="text" placeholder='city' />
              <select value={statusEdit} onChange={(user) => setstatusData(user.target.value)} className='border p-2 rounded-2xl outline-none' name="status" id="">
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
              <button type='submit' className='bg-[blue] py-2 px-5 rounded-2xl text-white'>Edit</button>
            </form>
          </div>

          <div>
            <input value={search} onChange={(user) => setsearch(user.target.value)} name='avatar' className='border p-2 rounded-2xl outline-none' type="search" placeholder='Name' />
            <select value={select} onChange={(user) => setselect(user.target.value)} className='border p-2 rounded-2xl outline-none' name="status" id="">
              <option value="">All</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

        </div>

        <table className='w-[50%] mt-10 m-auto'>
          <thead>
            <tr>
              <th className='border p-2 text-start'>User</th>
              <th className='border p-2 text-start w-20'>Age</th>
              <th className='border p-2 text-start w-40'>City</th>
              <th className='border p-2 text-start w-30'>Status</th>
              <th className='border p-2 text-start w-50'>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((user) => {
                return <tr key={user.id}>
                  <td className='border p-2 '>
                    <div className='flex items-center gap-3'>
                      <img className='w-8' src={user.img} alt="" />
                      {user.name}
                    </div>
                  </td>
                  <td className='border p-2'>{user.age}</td>
                  <td className='border p-2'>{user.city}</td>
                  <td className={`${user.status ? "text-[green]" : "text-[red]"} border border-[black] p-2`}>{user.status ? "Active" : "Inactive"}</td>
                  <td className='border p-2'>
                    <div className='flex items-center gap-2'>
                      <button onClick={() => deleteuser(user.id)} className='bg-[red] py-1 px-5 rounded-2xl text-white'>Delete</button>
                      <button onClick={() => Edituser(user)} className='bg-[blue] py-1 px-3 rounded-2xl text-white'>Edit</button>
                      <input onClick={() => changestatu(user)} type="checkbox" checked={user.status} />
                    </div>
                  </td>
                </tr>
              })
            }
          </tbody>
        </table>
      </section>
    </>
  )
}

export default App
