/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-console */
import "./App.css";
import "./App.mobile.css";
import { IProvider, WALLET_ADAPTERS } from "@web3auth/base";
import { useEffect, useState } from "react";
import RPC from "./viemRPC";
import { web3auth, web3AuthOptions } from "./web3auth";
import { getDefaultExternalAdapters } from "@web3auth/default-evm-adapter";

function App() {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const adapters = await getDefaultExternalAdapters({
          options: web3AuthOptions,
        });
        adapters.forEach((adapter) => {
          web3auth.configureAdapter(adapter);
        });
        await web3auth.initModal({
          modalConfig: {
            [WALLET_ADAPTERS.OPENLOGIN]: {
              label: "openlogin",
              loginMethods: {
                google: {
                  name: "Google",
                  showOnModal: false,
                },
                facebook: {
                  name: "Facebook",
                  showOnModal: false,
                },
                reddit: {
                  name: "Reddit",
                  showOnModal: false,
                },
                twitter: {
                  name: "Twitter",
                  showOnModal: false,
                },
                github: {
                  name: "Github",
                  showOnModal: false,
                },
                linkedin: {
                  name: "LinkedIn",
                  showOnModal: false,
                },
                apple: {
                  name: "Apple",
                  showOnModal: false,
                },
                line: {
                  name: "Line",
                  showOnModal: false,
                },
                wechat: {
                  name: "WeChat",
                  showOnModal: false,
                },
                weibo: {
                  name: "Weibo",
                  showOnModal: false,
                },
                twitch: {
                  name: "Twitch",
                  showOnModal: false,
                },
                kakao: {
                  name: "Kakao",
                  showOnModal: false,
                },
                farcaster: {
                  name: "Faster",
                  showOnModal: false,
                },
              },
            },
          },
        });
        // IMP END - SDK Initialization
        setProvider(web3auth.provider);

        if (web3auth.connected) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    // IMP START - Login
    const web3authProvider = await web3auth.connect();
    // IMP END - Login
    setProvider(web3authProvider);
    if (web3auth.connected) {
      setLoggedIn(true);
    }
  };

  const getUserInfo = async () => {
    // IMP START - Get User Information
    const user = await web3auth.getUserInfo();
    // IMP END - Get User Information
    uiConsole(user);
  };

  const logout = async () => {
    // IMP START - Logout
    await web3auth.logout();
    // IMP END - Logout
    setProvider(null);
    setLoggedIn(false);
    uiConsole("logged out");
  };

  // IMP START - Blockchain Calls
  // Check the RPC file for the implementation
  const getAccounts = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const address = await RPC.getAccounts(provider);
    uiConsole(address);
  };

  const getBalance = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const balance = await RPC.getBalance(provider);
    uiConsole(balance);
  };

  const signMessage = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const signedMessage = await RPC.signMessage(provider);
    uiConsole(signedMessage);
  };

  const sendTransaction = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    uiConsole("Sending Transaction...");
    const transactionReceipt = await RPC.sendTransaction(provider);
    uiConsole(transactionReceipt);
  };
  // IMP END - Blockchain Calls

  function uiConsole(...args: any[]): void {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
      console.log(...args);
    }
  }

  const loggedInView = (
    <div className="flex-container">
      {/* <button onClick={getUserInfo} className="card">
        Get User Info
      </button> */}
      <button onClick={getAccounts} className="card">
        Get Accounts
      </button>
      <button onClick={getBalance} className="card">
        Get Balance
      </button>
      <button onClick={signMessage} className="card">
        Sign Message
      </button>
      {/* <button onClick={sendTransaction} className="card">
        Send Transaction
      </button> */}
      <button onClick={logout} className="card">
        Log Out
      </button>
    </div>
  );

  const unloggedInView = (
    <button onClick={login} className="card">
      Login
    </button>
  );

  return (
    <div className="container">
      <h1 className="title">
        <a
          target="_blank"
          href="https://web3auth.io/docs/sdk/pnp/web/modal"
          rel="noreferrer"
        >
          Web3Auth
        </a>
        {" & Telegram Mini App Demo"}
      </h1>

      <div className="grid">{loggedIn ? loggedInView : unloggedInView}</div>
      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>

      <footer className="footer">
        <a
          href="https://github.com/Web3Auth/web3auth-pnp-examples/tree/main/web-modal-sdk/quick-starts/react-vite-modal-quick-start"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source code
        </a>
        {/* <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FWeb3Auth%2Fweb3auth-pnp-examples%2Ftree%2Fmain%2Fweb-modal-sdk%2Fquick-starts%2Freact-vite-evm-modal-quick-start&project-name=w3a-react-vite-no-modal&repository-name=w3a-react-vite-no-modal">
          <img src="https://vercel.com/button" alt="Deploy with Vercel" />
        </a> */}
      </footer>
    </div>
  );
}

export default App;
