// import logo from "./TeamUP-logo.png";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  if (localStorage.getItem("access_token")) {
    window.CometChatWidget.init({
      appID: "2269480a5983d987",
      appRegion: "us",
      authKey: "a0b27f305eaed800bd7330c21a90db380a970e4e",
    }).then(
      (response) => {
        console.log("Initialization completed successfully");
        //You can now call login function.
        window.CometChatWidget.login({
          uid: localStorage.getItem("uuid"),
        }).then(
          (response) => {
            window.CometChatWidget.launch({
              widgetID: "bf899074-3999-4b4f-b173-1a680d708768",
              docked: "true",
              alignment: "right", //left or right
              roundedCorners: "true",
              height: "450px",
              width: "400px",
            });
          },
          (error) => {
            console.log("User login failed with error:", error);
            //Check the reason for error and take appropriate action.
          }
        );
      },
      (error) => {
        console.log("Initialization failed with error:", error);
        //Check the reason for error and take appropriate action.
      }
    );
  }
  return (
    <div className="App">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
