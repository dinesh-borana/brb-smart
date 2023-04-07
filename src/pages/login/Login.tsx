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
import { useIonRouter } from "@ionic/react";

const Login: React.FC = () => {
  const router = useIonRouter();

  const [errorMsg, setErrorMsg] = useState<string>("");
  const login = (event: any) => {
    event.preventDefault();
    const { username, password } = document.forms[0];
    signInWithEmailAndPassword(auth, username.value, password.value)
      .then((result) => {
        router.push("/home");
        localStorage.setItem("username", username.value);
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
                placeholder="Enter text"
              ></IonInput>
            </IonItem>
            <IonItem class="ion-margin">
              <IonInput
                type="password"
                name="password"
                class="ion-outline"
                placeholder="Enter text"
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
