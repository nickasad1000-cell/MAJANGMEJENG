import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';
import { SiteShell } from '@/components/site-shell';
import { AboutPage, ArchivePage, CampaignPage, HomePage, ServicesPage, StoryDetailPage, SubmitPage, WorkPage } from '@/pages/pages';

const queryClient = new QueryClient();

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <SiteShell>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/cerita" component={ArchivePage} />
          <Route path="/cerita/:slug" component={StoryDetailPage} />
          <Route path="/jasa" component={ServicesPage} />
          <Route path="/hasil-kerja" component={WorkPage} />
          <Route path="/tentang-kami" component={AboutPage} />
          <Route path="/titipkan-cerita" component={SubmitPage} />
          <Route path="/kampanye/orang-lumajang" component={CampaignPage} />
          <Route component={NotFound} />
        </Switch>
      </SiteShell>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
