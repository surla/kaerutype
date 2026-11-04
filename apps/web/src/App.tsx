import { Routes, Route } from 'react-router'

import { Layout } from './components/layout'
import { HomePage } from './pages/home-page'
import { NotFoundPage } from './pages/not-found-page'
import { PrivacyPolicyPage } from './pages/privacy-policy-page'
import { HowItWorksPage } from './pages/how-it-works-page'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  )
}

export default App
