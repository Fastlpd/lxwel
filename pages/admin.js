import { useState, useEffect } from 'react'

export default function Admin() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [token, setToken] = useState(null)
  const [loginError, setLoginError] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('all') // all | unread

  // Check saved token
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('lxwel_admin_token') : null
    if (saved) { setToken(saved); setAuthed(true); }
  }, [])

  useEffect(() => {
    if (authed && token) fetchMessages()
  }, [authed, token])

  async function login(e) {
    e.preventDefault()
    setLoginError('')
    const r = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) })
    const d = await r.json()
    if (d.success) {
      localStorage.setItem('lxwel_admin_token', d.token)
      setToken(d.token)
      setAuthed(true)
    } else {
      setLoginError('Incorrect password')
    }
  }

  async function fetchMessages() {
    setLoading(true)
    try {
      const r = await fetch('/api/admin/messages', { headers: { Authorization: `Bearer ${token}` } })
      const d = await r.json()
      setMessages(d.messages || [])
    } catch { }
    setLoading(false)
  }

  async function markRead(id) {
    await fetch('/api/admin/messages', { method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ id }) })
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m))
  }

  async function deleteMsg(id) {
    await fetch('/api/admin/messages', { method: 'DELETE', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ id }) })
    setMessages(prev => prev.filter(m => m.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  function logout() {
    localStorage.removeItem('lxwel_admin_token')
    setAuthed(false); setToken(null); setMessages([]); setSelected(null)
  }

  function formatDate(iso) {
    return new Date(iso).toLocaleDateString('en-NG', { day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' })
  }

  const displayed = filter === 'unread' ? messages.filter(m => !m.read) : messages
  const unreadCount = messages.filter(m => !m.read).length

  return (
    <>
      <style jsx global>{`
        :root {
          --black:#06050A; --deep:#0D0C10; --warm:#F5EDD8;
          --gold:#C9A84C; --gold2:#E2C06A; --muted:rgba(245,237,216,0.4);
          --border:rgba(201,168,76,0.18); --glass:rgba(201,168,76,0.06);
          --green:#6DD4A3; --red:#E88A7A;
          --serif:'Georgia',serif; --mono:'Courier New',monospace;
        }
        *{box-sizing:border-box;margin:0;padding:0}
        body{background:var(--black);color:var(--warm);font-family:var(--serif);min-height:100vh}
        button{cursor:pointer;font-family:var(--mono)}
      `}</style>

      {!authed ? (
        /* LOGIN SCREEN */
        <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',padding:'2rem'}}>
          <div style={{width:'100%',maxWidth:'380px',border:'1px solid var(--border)',padding:'3rem',background:'var(--deep)'}}>
            <div style={{fontFamily:'var(--mono)',fontSize:'10px',letterSpacing:'.2em',color:'var(--gold)',textTransform:'uppercase',marginBottom:'1.5rem',textAlign:'center'}}>
              Lxwel · Admin
            </div>
            <div style={{fontFamily:'var(--serif)',fontSize:'1.6rem',fontStyle:'italic',textAlign:'center',marginBottom:'2rem'}}>
              Dashboard Login
            </div>
            <form onSubmit={login} style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              <div>
                <div style={{fontFamily:'var(--mono)',fontSize:'9px',letterSpacing:'.14em',color:'var(--gold)',textTransform:'uppercase',marginBottom:'6px'}}>Password</div>
                <input
                  type="password" value={password} onChange={e=>setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  style={{width:'100%',background:'transparent',border:'1px solid var(--border)',color:'var(--warm)',fontFamily:'var(--mono)',fontSize:'13px',padding:'10px 12px',outline:'none'}}
                  required autoFocus
                />
              </div>
              {loginError && <div style={{fontFamily:'var(--mono)',fontSize:'10px',color:'var(--red)',padding:'8px',border:'1px solid rgba(232,138,122,.2)',background:'rgba(232,138,122,.05)'}}>{loginError}</div>}
              <button type="submit" style={{background:'var(--gold)',color:'var(--black)',border:'none',padding:'12px',fontFamily:'var(--mono)',fontSize:'11px',letterSpacing:'.12em',textTransform:'uppercase',transition:'background .2s'}}>
                Enter dashboard →
              </button>
            </form>
            <div style={{fontFamily:'var(--mono)',fontSize:'9px',color:'rgba(201,168,76,.3)',textAlign:'center',marginTop:'1.5rem',letterSpacing:'.1em'}}>
              LAWRENCE K · LXWEL
            </div>
          </div>
        </div>
      ) : (
        /* DASHBOARD */
        <div style={{display:'grid',gridTemplateColumns:'260px 1fr',minHeight:'100vh'}}>

          {/* SIDEBAR */}
          <div style={{borderRight:'1px solid var(--border)',background:'var(--deep)',display:'flex',flexDirection:'column',padding:'1.5rem'}}>
            <div style={{fontFamily:'var(--mono)',fontSize:'10px',letterSpacing:'.2em',color:'var(--gold)',textTransform:'uppercase',marginBottom:'.5rem'}}>Lxwel</div>
            <div style={{fontFamily:'var(--serif)',fontSize:'1.2rem',fontStyle:'italic',marginBottom:'2rem',borderBottom:'1px solid var(--border)',paddingBottom:'1.5rem'}}>Admin Dashboard</div>

            {/* stats */}
            <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'2rem'}}>
              {[
                {label:'Total messages',val:messages.length},
                {label:'Unread',val:unreadCount,accent:unreadCount>0},
                {label:'Read',val:messages.filter(m=>m.read).length}
              ].map(s=>(
                <div key={s.label} style={{background:'var(--glass)',border:'1px solid var(--border)',padding:'10px 12px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div style={{fontFamily:'var(--mono)',fontSize:'9px',letterSpacing:'.1em',color:'var(--muted)',textTransform:'uppercase'}}>{s.label}</div>
                  <div style={{fontFamily:'var(--mono)',fontSize:'16px',fontWeight:'400',color:s.accent?'var(--gold)':'var(--warm)'}}>{s.val}</div>
                </div>
              ))}
            </div>

            {/* filters */}
            <div style={{display:'flex',flexDirection:'column',gap:'6px',marginBottom:'2rem'}}>
              {[['all','All messages'],['unread','Unread only']].map(([v,l])=>(
                <button key={v} onClick={()=>setFilter(v)}
                  style={{background:filter===v?'var(--gold)':'transparent',color:filter===v?'var(--black)':'var(--muted)',border:'1px solid var(--border)',padding:'8px 12px',fontSize:'10px',letterSpacing:'.12em',textTransform:'uppercase',textAlign:'left',transition:'all .15s'}}>
                  {l}
                </button>
              ))}
            </div>

            <div style={{flex:1}}/>

            {/* actions */}
            <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
              <button onClick={fetchMessages}
                style={{background:'transparent',border:'1px solid var(--border)',color:'var(--muted)',padding:'8px',fontSize:'10px',letterSpacing:'.12em',textTransform:'uppercase',transition:'all .15s'}}>
                Refresh
              </button>
              <button onClick={logout}
                style={{background:'transparent',border:'1px solid rgba(232,138,122,.3)',color:'rgba(232,138,122,.6)',padding:'8px',fontSize:'10px',letterSpacing:'.12em',textTransform:'uppercase'}}>
                Logout
              </button>
            </div>

            <div style={{fontFamily:'var(--mono)',fontSize:'9px',color:'rgba(201,168,76,.25)',marginTop:'1rem',letterSpacing:'.1em'}}>laxwellremzy50@gmail.com</div>
          </div>

          {/* MAIN AREA */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1.4fr',height:'100vh',overflow:'hidden'}}>

            {/* MESSAGE LIST */}
            <div style={{borderRight:'1px solid var(--border)',overflowY:'auto',padding:'1.5rem'}}>
              <div style={{fontFamily:'var(--mono)',fontSize:'9px',letterSpacing:'.16em',color:'var(--gold)',textTransform:'uppercase',marginBottom:'1rem',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <span>Messages ({displayed.length})</span>
                {unreadCount>0 && <span style={{background:'var(--gold)',color:'var(--black)',padding:'2px 8px',fontSize:'9px'}}>{unreadCount} new</span>}
              </div>

              {loading && <div style={{fontFamily:'var(--mono)',fontSize:'10px',color:'var(--muted)',textAlign:'center',padding:'2rem'}}>Loading...</div>}
              {!loading && displayed.length===0 && (
                <div style={{fontFamily:'var(--mono)',fontSize:'10px',color:'var(--muted)',textAlign:'center',padding:'3rem',lineHeight:'1.8'}}>
                  No messages yet.<br />They will appear here when someone uses<br />the contact form on the website.
                </div>
              )}

              {displayed.map(msg=>(
                <div key={msg.id}
                  onClick={()=>{setSelected(msg);if(!msg.read)markRead(msg.id)}}
                  style={{
                    padding:'12px 14px',border:'1px solid',borderColor:selected?.id===msg.id?'rgba(201,168,76,.5)':'var(--border)',
                    marginBottom:'6px',cursor:'pointer',background:selected?.id===msg.id?'var(--glass)':'transparent',
                    transition:'all .15s',position:'relative'
                  }}>
                  {!msg.read && <div style={{position:'absolute',top:'14px',right:'12px',width:'6px',height:'6px',background:'var(--gold)',borderRadius:'50%'}}/>}
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'3px'}}>
                    <div style={{fontSize:'.85rem',fontWeight:msg.read?'normal':'bold',color:msg.read?'var(--muted)':'var(--warm)'}}>{msg.name}</div>
                    <div style={{fontFamily:'var(--mono)',fontSize:'9px',color:'var(--muted)'}}>{formatDate(msg.date).split(',')[0]}</div>
                  </div>
                  <div style={{fontFamily:'var(--mono)',fontSize:'9px',color:'rgba(201,168,76,.5)',textTransform:'uppercase',marginBottom:'4px'}}>{msg.type}</div>
                  <div style={{fontSize:'.78rem',color:'var(--muted)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{msg.message}</div>
                </div>
              ))}
            </div>

            {/* MESSAGE DETAIL */}
            <div style={{overflowY:'auto',padding:'2rem'}}>
              {!selected ? (
                <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%',flexDirection:'column',gap:'1rem'}}>
                  <div style={{fontFamily:'var(--serif)',fontSize:'2.5rem',fontStyle:'italic',color:'var(--border)',textAlign:'center'}}>Select a message</div>
                  <div style={{fontFamily:'var(--mono)',fontSize:'10px',color:'rgba(201,168,76,.25)',letterSpacing:'.14em',textTransform:'uppercase'}}>to read the full content</div>
                </div>
              ) : (
                <div>
                  {/* header */}
                  <div style={{borderBottom:'1px solid var(--border)',paddingBottom:'1.5rem',marginBottom:'1.5rem'}}>
                    <div style={{fontFamily:'var(--mono)',fontSize:'9px',letterSpacing:'.16em',color:'var(--gold)',textTransform:'uppercase',marginBottom:'.5rem'}}>{selected.type}</div>
                    <div style={{fontSize:'1.4rem',fontStyle:'italic',marginBottom:'.5rem'}}>{selected.name}</div>
                    <div style={{display:'flex',gap:'1.5rem',flexWrap:'wrap'}}>
                      <div style={{fontFamily:'var(--mono)',fontSize:'10px',color:'var(--muted)'}}>{selected.email}</div>
                      <div style={{fontFamily:'var(--mono)',fontSize:'10px',color:'var(--muted)'}}>{formatDate(selected.date)}</div>
                      <div style={{fontFamily:'var(--mono)',fontSize:'10px',color:selected.read?'var(--muted)':'var(--gold)'}}>{selected.read?'Read':'Unread'}</div>
                    </div>
                  </div>

                  {/* message body */}
                  <div style={{background:'var(--glass)',border:'1px solid var(--border)',padding:'1.5rem',marginBottom:'1.5rem',fontSize:'.9rem',lineHeight:'1.8',color:'rgba(245,237,216,.8)',whiteSpace:'pre-wrap'}}>
                    {selected.message}
                  </div>

                  {/* actions */}
                  <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
                    <a href={`mailto:${selected.email}?subject=Re: Your message to Lxwel`}
                      style={{background:'var(--gold)',color:'var(--black)',textDecoration:'none',fontFamily:'var(--mono)',fontSize:'10px',letterSpacing:'.12em',textTransform:'uppercase',padding:'10px 20px',display:'inline-block'}}>
                      Reply via email →
                    </a>
                    <button onClick={()=>deleteMsg(selected.id)}
                      style={{background:'transparent',border:'1px solid rgba(232,138,122,.3)',color:'rgba(232,138,122,.7)',fontFamily:'var(--mono)',fontSize:'10px',letterSpacing:'.12em',textTransform:'uppercase',padding:'10px 20px',transition:'all .15s'}}>
                      Delete
                    </button>
                    {!selected.read && (
                      <button onClick={()=>markRead(selected.id)}
                        style={{background:'transparent',border:'1px solid var(--border)',color:'var(--muted)',fontFamily:'var(--mono)',fontSize:'10px',letterSpacing:'.12em',textTransform:'uppercase',padding:'10px 20px'}}>
                        Mark read
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
