import { useState, useEffect } from 'react'
import { supabase } from './lib/supabaseClient'
import { Sidebar } from './components/Sidebar'
import { Dashboard } from './pages/Dashboard'
import { UploadPage } from './pages/Upload'
import { NotesList } from './pages/NotesList'
import { Login } from './pages/Login'
import { Bookmarks } from './pages/Bookmarks'
import { Profile } from './pages/Profile'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('App mounted, checking session...');
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) console.error('Error fetching session:', error);
      setSession(session)
      setLoading(false)
    }).catch(err => {
      console.error('Fatal error in getSession:', err);
      setLoading(false);
    })

    const {
      data,
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state changed:', _event, session?.user?.email);
      setSession(session)
    })

    const subscription = data?.subscription;

    return () => {
      if (subscription) subscription.unsubscribe();
    }
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-blue"></div>
      </div>
    )
  }

  if (!session) {
    return <Login />
  }

  return (
    <div className="flex min-h-screen bg-background text-white">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'upload' && <UploadPage />}
        {activeTab === 'notes' && <NotesList />}
        {activeTab === 'bookmarks' && <Bookmarks />}
        {activeTab === 'profile' && <Profile />}
      </main>
    </div>
  )
}

export default App
