import { Routes, Route } from 'react-router'

import { Layout } from './components/layout'
import { HomePage } from './pages/home-page'
import { NotFoundPage } from './pages/not-found-page'
import { PrivacyPolicyPage } from './pages/privacy-policy-page'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  )
}

export default App
