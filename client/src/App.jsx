import { ToastProvider } from './components/Toast/Toast';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <ToastProvider>
      <Dashboard />
    </ToastProvider>
  );
}

export default App;
