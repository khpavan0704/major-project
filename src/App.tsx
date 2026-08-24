import { useRouter } from '@/router/Router';
import { Layout } from '@/components/Layout';
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { DetectPage } from '@/pages/DetectPage';
import { ResultPage } from '@/pages/ResultPage';
import { AdvisoryPage } from '@/pages/AdvisoryPage';
import { DiseaseInfoPage } from '@/pages/DiseaseInfoPage';
import { HistoryPage } from '@/pages/HistoryPage';
import { PredictionDetailsPage } from '@/pages/PredictionDetailsPage';
import { WeatherPage } from '@/pages/WeatherPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { ExpertPage } from '@/pages/ExpertPage';
import { AboutPage } from '@/pages/AboutPage';
import { AdminPage } from '@/pages/AdminPage';
import { ModelPage } from '@/pages/ModelPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

function App() {
  const { path } = useRouter();

  const renderPage = () => {
    if (path === '/' || path === '') return <LandingPage />;
    if (path === '/login') return <LoginPage />;
    if (path === '/register') return <RegisterPage />;
    if (path === '/dashboard') return <DashboardPage />;
    if (path === '/detect') return <DetectPage />;
    if (path.startsWith('/result/')) {
      const id = path.split('/result/')[1];
      return <ResultPage predictionId={id} />;
    }
    if (path === '/advisory' || path.startsWith('/advisory/')) {
      const id = path.startsWith('/advisory/') ? path.split('/advisory/')[1] : undefined;
      return <AdvisoryPage predictionId={id} />;
    }
    if (path === '/diseases') return <DiseaseInfoPage />;
    if (path === '/history') return <HistoryPage />;
    if (path.startsWith('/prediction/')) {
      const id = path.split('/prediction/')[1];
      return <PredictionDetailsPage predictionId={id} />;
    }
    if (path === '/weather') return <WeatherPage />;
    if (path === '/profile') return <ProfilePage />;
    if (path === '/expert') return <ExpertPage />;
    if (path === '/about') return <AboutPage />;
    if (path === '/admin') return <AdminPage />;
    if (path === '/model') return <ModelPage />;
    return <NotFoundPage />;
  };

  return <Layout>{renderPage()}</Layout>;
}

export default App;
