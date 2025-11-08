// import { useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import Header from './Header'
// import SubmitTrash from './SubmitTrash'
// import { categories } from '../data/categories'
// import { Fragment } from 'react'

// const PriceChart = ({ data = [] }) => {
//   // Simple horizontal bar chart using SVG
//   const max = Math.max(...data.map(d => d.pricePerUnit), 1)
//   const width = 300
//   const barHeight = 20
//   const gap = 12

//   return (
//     <div className="w-full">
//       <svg width={width} height={(barHeight + gap) * data.length}>
//         {data.map((d, i) => {
//           const barW = Math.round((d.pricePerUnit / max) * (width - 80))
//           const y = i * (barHeight + gap)
//           return (
//             <Fragment key={d.id}>
//               <rect x={0} y={y} width={barW} height={barHeight} rx={6} fill="#10B981" opacity={0.9} />
//               <text x={barW + 8} y={y + barHeight / 1.6} fontSize={12} fill="#0F172A">LKR {d.pricePerUnit}</text>
//               <text x={0} y={y - 2 + barHeight / 1.6} fontSize={12} fill="#0F172A">{d.label}</text>
//             </Fragment>
//           )
//         })}
//       </svg>
//     </div>
//   )
// }

// const Dashboard = () => {
//   const navigate = useNavigate()
//   const [summary, setSummary] = useState(null)
//   const [submissions, setSubmissions] = useState([])
//   const [loading, setLoading] = useState(true)
//   const token = localStorage.getItem('token')

//   useEffect(() => {
//     // If no token, show a friendly message rather than immediately navigating away.
//     if (!token) {
//       setLoading(false)
//       setSummary({ name: 'Guest', earnings: 0, totalSubmissions: 0 })
//       setSubmissions([])
//       return
//     }

//     const fetchData = async () => {
//       setLoading(true)
//       const controller = new AbortController()
//       // Timeout fetch after 5s to avoid indefinite loading when backend is down
//       const timeout = setTimeout(() => controller.abort(), 5000)

//       try {
//         const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }

//         const [sumRes, subsRes] = await Promise.all([
//           fetch('http://localhost:5000/api/user/summary', { headers, signal: controller.signal }),
//           fetch('http://localhost:5000/api/user/submissions?limit=10', { headers, signal: controller.signal })
//         ])

//         let sumJson = null
//         let subsJson = []

//         if (sumRes && sumRes.ok) sumJson = await sumRes.json()
//         if (subsRes && subsRes.ok) subsJson = await subsRes.json()

//         // Normalise responses; if backend not present or responses invalid, use local fallback
//         if (!sumJson) {
//           const user = JSON.parse(localStorage.getItem('user') || 'null')
//           sumJson = {
//             data: {
//               name: user?.name || 'User',
//               earnings: user?.earnings || 0,
//               totalSubmissions: user?.totalSubmissions || 0
//             }
//           }
//         }

//         if (!subsJson || !Array.isArray(subsJson.data)) {
//           subsJson = {
//             data: [
//               { date: '2025-11-05', type: 'Plastic Bottles', quantity: '10 kg', status: 'Approved', reward: 'LKR 150' },
//               { date: '2025-11-02', type: 'E-waste', quantity: '2 pcs', status: 'Pending', reward: '-' }
//             ]
//           }
//         }

//         setSummary(sumJson.data)
//         setSubmissions(subsJson.data)
//       } catch (err) {
//         // If abort, fetch threw an error; use fallback so dashboard renders.
//         console.warn('Dashboard fetch error or timeout (falling back to local data):', err)
//         const user = JSON.parse(localStorage.getItem('user') || 'null')
//         setSummary({ name: user?.name || 'User', earnings: user?.earnings || 0, totalSubmissions: user?.totalSubmissions || 0 })
//         setSubmissions([
//           { date: '2025-11-05', type: 'Plastic Bottles', quantity: '10 kg', status: 'Approved', reward: 'LKR 150' }
//         ])
//       } finally {
//         clearTimeout(timeout)
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [token, navigate])

//   const handleLogout = () => {
//     localStorage.removeItem('token')
//     localStorage.removeItem('user')
//     navigate('/')
//   }

//   if (loading) return <div className="p-8">Loading dashboard...</div>

//   return (
//     <div className="min-h-screen bg-white">
//   <Header mode="dashboard" onAuthClick={() => navigate('/')} />

//       <main className="max-w-6xl mx-auto p-6">
//         <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
//           <div>
//             {/* <h1 className="text-3xl font-extrabold text-gray-800">♻️ Dashboard</h1> */}
//             <p className="text-sm text-gray-500 mt-1">Overview of your trash submissions, earnings and activity</p>
//           </div>

//           <div className="flex items-center gap-3">
//             <Link to="/submit" className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-blue-600 text-white px-4 py-2 rounded-lg shadow hover:from-green-600">
//               + Submit Trash
//             </Link>
//             {/* <button onClick={handleLogout} className="text-sm text-red-600">Logout</button> */}
//           </div>
//         </div>

//         <section className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
//           <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow">
//             <div className="flex items-center gap-4">
//               <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">{(summary?.name || 'U').charAt(0)}</div>
//               <div>
//                 <h2 className="text-xl font-semibold text-gray-800">Hello, {summary?.name || 'User'}!</h2>
//                 <p className="text-sm text-gray-500">Member since 2024 • {summary?.totalSubmissions || 0} submissions</p>
//                 <div className="mt-3 flex items-center gap-3">
//                   <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">LKR {summary?.earnings || 0}</div>
//                   <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">{summary?.totalSubmissions || 0} items</div>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-6 text-sm text-gray-600">
//               <p>Quick actions: Submit items, view history, or request a pickup.</p>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-xl shadow">
//             <h3 className="text-lg font-semibold mb-3">Notifications</h3>
//             <ul className="space-y-3 text-sm text-gray-700">
//               <li className="flex items-start gap-3">
//                 <div className="text-green-500">✅</div>
//                 <div>
//                   <div className="font-medium">Submission approved</div>
//                   <div className="text-gray-500">Your 2025-11-05 submission was approved and LKR 150 was added to your account.</div>
//                 </div>
//               </li>
//               <li className="flex items-start gap-3">
//                 <div className="text-blue-500">🔔</div>
//                 <div>
//                   <div className="font-medium">Community cleanup</div>
//                   <div className="text-gray-500">Event on Sunday at 8:00 AM — join us!</div>
//                 </div>
//               </li>
//             </ul>
//           </div>

//           <div className="bg-white p-6 rounded-xl shadow">
//             <h3 className="text-lg font-semibold mb-3">Analytics</h3>
//             <div className="w-full h-32 flex items-center justify-center text-gray-400 bg-gradient-to-b from-white to-gray-50 rounded">
//               {/* Simple placeholder for charts; integrate Chart.js or Recharts later */}
//               <div className="text-sm">Charts coming soon — integrate Chart.js or Recharts</div>
//             </div>
//           </div>
//         </section>

//         <section className="bg-white p-6 rounded-xl shadow">
//           <h3 className="text-xl font-semibold mb-4">Recent Submissions</h3>
//           <div className="space-y-4">
//             {submissions.length === 0 ? (
//               <div className="text-sm text-gray-500">No submissions yet. Use the "Submit Trash" button to add items.</div>
//             ) : (
//               submissions.map((s, idx) => (
//                 <div key={idx} className="flex items-center justify-between border border-gray-100 p-4 rounded-lg">
//                   <div>
//                     <div className="text-sm text-gray-500">{s.date}</div>
//                     <div className="font-medium text-gray-800">{s.type} • {s.quantity}</div>
//                     <div className="text-sm text-gray-500">{s.status}</div>
//                   </div>
//                   <div className="text-right">
//                     <div className="font-semibold">{s.reward}</div>
//                     <div className="text-sm text-gray-400">{s.status === 'Pending' ? 'Processing' : 'Completed'}</div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </section>
        
//         <section className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow">
//             <h3 className="text-lg font-semibold mb-4">Trash Categories & Prices</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <ul className="space-y-3">
//                   {categories.map((c) => (
//                     <li key={c.id} className="flex items-center justify-between border border-gray-100 p-3 rounded-md">
//                       <div>
//                         <div className="font-medium text-gray-800">{c.label}</div>
//                         <div className="text-sm text-gray-500">Unit: {c.unit}</div>
//                       </div>
//                       <div className="text-right">
//                         <div className="text-sm text-gray-500">Price</div>
//                         <div className="font-semibold">LKR {c.pricePerUnit}/{c.unit}</div>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div>
//                 {/* <div className="text-sm text-gray-600 mb-2">Price chart (LKR per unit)</div>
//                 <div className="bg-white p-3 rounded-md">
//                   <PriceChart data={categories} />
//                 </div> */}
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-xl shadow">
//             {/* Embedded quick submit form in the side column on large screens */}
//             <SubmitTrash onSubmitted={(item) => setSubmissions(prev => [item, ...prev])} />
//           </div>
//         </section>
//       </main>
//     </div>
//   )
// }

// export default Dashboard
import { useEffect, useState, Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from './Header'
import SubmitTrash from './SubmitTrash'
import { categories } from '../data/categories'

const PriceChart = ({ data = [] }) => {
  const max = Math.max(...data.map(d => d.pricePerUnit), 1)
  const width = 300
  const barHeight = 20
  const gap = 12

  return (
    <div className="w-full">
      <svg width={width} height={(barHeight + gap) * data.length}>
        {data.map((d, i) => {
          const barW = Math.round((d.pricePerUnit / max) * (width - 80))
          const y = i * (barHeight + gap)
          return (
            <Fragment key={d.id}>
              <rect x={0} y={y} width={barW} height={barHeight} rx={6} fill="#10B981" opacity={0.9} />
              <text x={barW + 8} y={y + barHeight / 1.6} fontSize={12} fill="#0F172A">LKR {d.pricePerUnit}</text>
              <text x={0} y={y - 2 + barHeight / 1.6} fontSize={12} fill="#0F172A">{d.label}</text>
            </Fragment>
          )
        })}
      </svg>
    </div>
  )
}

const Dashboard = () => {
  const navigate = useNavigate()
  const [summary, setSummary] = useState(null)
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      setLoading(false)
      setSummary({ name: 'Guest', earnings: 0, totalSubmissions: 0 })
      setSubmissions([])
      return
    }

    const fetchData = async () => {
      setLoading(true)
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 5000)

      try {
        const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }

        // ✅ Updated endpoints to match backend
        const [sumRes, subsRes] = await Promise.all([
          fetch('http://localhost:5000/api/submissions/summary', { headers, signal: controller.signal }),
          fetch('http://localhost:5000/api/submissions', { headers, signal: controller.signal })
        ])

        let sumJson = null
        let subsJson = []

        if (sumRes && sumRes.ok) sumJson = await sumRes.json()
        if (subsRes && subsRes.ok) subsJson = await subsRes.json()

        // Normalise fallback
        if (!sumJson) {
          const user = JSON.parse(localStorage.getItem('user') || 'null')
          sumJson = {
            name: user?.name || 'User',
            earnings: user?.earnings || 0,
            totalSubmissions: user?.totalSubmissions || 0
          }
        }

        if (!subsJson || !Array.isArray(subsJson)) {
          subsJson = [
            { date: '2025-11-05', type: 'Plastic Bottles', quantity: '10 kg', status: 'Approved', reward: 'LKR 150' },
            { date: '2025-11-02', type: 'E-waste', quantity: '2 pcs', status: 'Pending', reward: '-' }
          ]
        }

        setSummary(sumJson)
        setSubmissions(subsJson)
      } catch (err) {
        console.warn('Dashboard fetch error or timeout:', err)
        const user = JSON.parse(localStorage.getItem('user') || 'null')
        setSummary({ name: user?.name || 'User', earnings: 0, totalSubmissions: 0 })
        setSubmissions([
          { date: '2025-11-05', type: 'Plastic Bottles', quantity: '10 kg', status: 'Approved', reward: 'LKR 150' }
        ])
      } finally {
        clearTimeout(timeout)
        setLoading(false)
      }
    }

    fetchData()
  }, [token, navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  if (loading) return <div className="p-8">Loading dashboard...</div>

  return (
    <div className="min-h-screen bg-white">
      <Header mode="dashboard" onAuthClick={() => navigate('/')} />

      <main className="max-w-6xl mx-auto p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-500 mt-1">Overview of your trash submissions, earnings and activity</p>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/submit" className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-blue-600 text-white px-4 py-2 rounded-lg shadow hover:from-green-600">
              + Submit Trash
            </Link>
          </div>
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">{(summary?.name || 'U').charAt(0)}</div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Hello, {summary?.name || 'User'}!</h2>
                <p className="text-sm text-gray-500">Member since 2024 • {summary?.totalSubmissions || 0} submissions</p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">LKR {summary?.earnings || 0}</div>
                  <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">{summary?.totalSubmissions || 0} items</div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-600">
              <p>Quick actions: Submit items, view history, or request a pickup.</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-3">Notifications</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-3">
                <div className="text-green-500">✅</div>
                <div>
                  <div className="font-medium">Submission approved</div>
                  <div className="text-gray-500">Your 2025-11-05 submission was approved and LKR 150 was added to your account.</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="text-blue-500">🔔</div>
                <div>
                  <div className="font-medium">Community cleanup</div>
                  <div className="text-gray-500">Event on Sunday at 8:00 AM — join us!</div>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-3">Analytics</h3>
            <div className="w-full h-32 flex items-center justify-center text-gray-400 bg-gradient-to-b from-white to-gray-50 rounded">
              <div className="text-sm">Charts coming soon — integrate Chart.js or Recharts</div>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-4">Recent Submissions</h3>
          <div className="space-y-4">
            {submissions.length === 0 ? (
              <div className="text-sm text-gray-500">No submissions yet. Use the "Submit Trash" button to add items.</div>
            ) : (
              submissions.map((s, idx) => (
                <div key={idx} className="flex items-center justify-between border border-gray-100 p-4 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-500">{new Date(s.createdAt).toLocaleDateString()}</div>
                    <div className="font-medium text-gray-800">{s.type} • {s.quantity} {s.unit}</div>
                    <div className="text-sm text-gray-500">{s.status}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">LKR {s.reward || 0}</div>
                    <div className="text-sm text-gray-400">{s.status === 'Pending' ? 'Processing' : 'Completed'}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
        
        <section className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-4">Trash Categories & Prices</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <ul className="space-y-3">
                  {categories.map((c) => (
                    <li key={c.id} className="flex items-center justify-between border border-gray-100 p-3 rounded-md">
                      <div>
                        <div className="font-medium text-gray-800">{c.label}</div>
                        <div className="text-sm text-gray-500">Unit: {c.unit}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Price</div>
                        <div className="font-semibold">LKR {c.pricePerUnit}/{c.unit}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <SubmitTrash onSubmitted={(item) => setSubmissions(prev => [item, ...prev])} />
          </div>
        </section>
      </main>
    </div>
  )
}

export default Dashboard
