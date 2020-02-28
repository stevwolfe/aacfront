import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { ActionCableProvider } from "react-actioncable-provider";
import thunk from "redux-thunk";
import "./index.css";
import App from "./components/App";
import * as reducers from "./redux/reducers";


const rootReducer = combineReducers(reducers);
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <ActionCableProvider url="ws://localhost:3000/api/v1/cable">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ActionCableProvider>
  </Provider>,
  document.getElementById("root")
);



 // // Detect browser for mac OS safari 11+, then alert a "message" to end user.
 // (function() {
 //   try {
 //     // Detect if the browser is safari AND if it is running on Mac OS
 //     var isMacSafari = window.safari !== undefined && !!window.navigator.platform.match(/Mac/);
 //     if (isMacSafari) {
 //       // Parse the browser version for use
 //       var version = parseInt(window.navigator.userAgent.match(/Version\/(\d+)/)[1], 10);
 //       // If safari version 11+, alert or log a message
 //       if (version >= 11) {
 //         // Site owner to decide if alert is the right recommendation
 //         alert("For optimal playback experience on your Safari browser, enable autoplay for this website by navigating to Safari-> Settings for this web site -> Auto-play: Allow All Autoplay");
 //       }
 //     }
 //   } catch (e) {}
 // })();

  //        ws://test.herokuapp.com/api/v1/cable
