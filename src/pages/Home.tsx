import OrderListItem from "../components/OrderListItem";
import { useEffect, useState } from "react";
import { Message, getMessages } from "../data/messages";
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import "./Home.css";
import { db } from "../firebase.config";
import { collection, getDocs } from "firebase/firestore";

const Home: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const getOrdersList = async () => {
    const orderListRef = await getDocs(collection(db, "user_roles"));
    orderListRef.forEach((doc) => {
      console.log(doc.id, doc.data());
    });
  };

  useEffect(() => {
    getOrdersList();
  }, []);

  useIonViewWillEnter(() => {
    const msgs = getMessages();
    setMessages(msgs);
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>BRB</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large" class="ion-text-center">
              BRB Smart
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {messages.map((m) => (
            <OrderListItem key={m.id} message={m} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
