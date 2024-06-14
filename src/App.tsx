import React from 'react';
import { HashRouter, Route, Routes, useNavigate } from 'react-router-dom';
import LoginScreen from './screen/login/LoginScreen';
import './App.scss';
import AppRouter from './router/AppRouter';
import { Box, createTheme, ThemeProvider } from '@mui/material';
import { blueGrey, grey, orange, red } from '@mui/material/colors';
import AppHistory from './AppHistory';
import { observer } from 'mobx-react';
import { useStore } from '../src/store/RootStore';

interface AppProps {}

// export function CMBrowserRouter({ basename, children, window }: any) {
//   let historyRef = React.useRef<any>();
//   if (historyRef.current == null) {
//     historyRef.current = createBrowserHistory({ window });
//   }

//   let history = historyRef.current;
//   let [state, setState] = React.useState({
//     action: history.action,
//     location: history.location
//   });

//   React.useLayoutEffect(() => history.listen(setState), [history]);

//   return <Router basename={basename} children={children} location={state.location} navigationType={state.action} navigator={history} />;
// }

// const CustomRouter = ({ basename, children, history }: any) => {
//   const [state, setState] = React.useState({
//     action: history.action,
//     location: history.location
//   });

//   React.useLayoutEffect(() => history.listen(setState), [history]);

//   return <Router basename={basename} children={children} location={state.location} navigationType={state.action} navigator={history} />;
// };

declare module '@mui/material/styles' {
  interface PaletteColor {
    moderate?: string;
  }
  interface SimplePaletteColorOptions {
    moderate?: string;
  }

  interface Palette {
    neutral: Palette['primary'];
    highlight: Palette['primary'];
  }
  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
    highlight: PaletteOptions['primary'];
  }
}

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

const NavigateSetter = () => {
  AppHistory.navigate = useNavigate();

  return null;
};

const App: React.FunctionComponent<AppProps> = observer(() => {
  const { optionDataStore } = useStore();

  const theme = createTheme({
    palette: {
      primary: {
        main: blueGrey[600],
        moderate: blueGrey[100],
        light: blueGrey[50]
      },
      secondary: {
        main: '#AA7AC8',
        light: red[50]
      },
      neutral: {
        main: grey[800],
        moderate: grey[500],
        light: grey[300]
      },
      highlight: {
        main: '#2979ff'
      }
    },
    status: {
      danger: orange[500]
    },
    components: {
      MuiInputBase: {
        styleOverrides: {
          // input: {
          //   height: '100%',
          //   border: '1px solid black',
          //   borderRadius: 10,
          //   borderColor: grey[800]
          // }
          // div: {
          //   '&::before': {
          //     border: 0
          //   }
          // }
        }
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', height: '1px' }}>
        <HashRouter>
          <NavigateSetter />
          <Routes>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/*" element={<AppRouter />} />
          </Routes>
        </HashRouter>
      </Box>
    </ThemeProvider>
  );
});

export default App;
