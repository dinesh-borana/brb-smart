import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config";
import { useState } from "react";

const Login: React.FC = () => {

  const [errorMsg, setErrorMsg] = useState<string>("");
  
  const login = (event: any) => {
    event.preventDefault();
    const { username, password } = document.forms[0];
    signInWithEmailAndPassword(auth, username.value, password.value)
      .then((result) => {
        localStorage.setItem("username", username.value);
        window.location.assign('/home');
      })
      .catch((error) => {
        setErrorMsg("Incorrect Email or Password");
        console.log(error.error.message);
      });
  };
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar>
            <IonTitle class="ion-text-center">BRB Smart</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList class="ion-padding">
          <form onSubmit={(e) => login(e)}>
            <IonItem class="ion-margin">
              <IonInput
                type="text"
                class="ion-outline"
                name="username"
                placeholder="Enter Username"
              ></IonInput>
            </IonItem>
            <IonItem class="ion-margin">
              <IonInput
                type="password"
                name="password"
                class="ion-outline"
                placeholder="Enter Password"
              ></IonInput>
            </IonItem>
            {/* <IonItem> */}
            <IonButton
              class="ion-padding"
              shape="round"
              expand="block"
              type="submit"
            >
              Login
            </IonButton>
            {/* </IonItem> */}
          </form>
          <p className="ion-text-center">
            {errorMsg && <IonText color={"danger"}>{errorMsg}</IonText>}
          </p>
        </IonList>
      </IonContent>
    </IonPage>
  );
};
export default Login;
