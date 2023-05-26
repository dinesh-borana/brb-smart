import OrderListItem from "../components/OrderListItem";
import { useRef, useState } from "react";

import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
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
import { add } from "ionicons/icons";
import { LoaderSkeleton } from "./common/loaderSkeleton";
import { Link } from "react-router-dom";

const initialOrderItem = {
  orderNumber: "",
  kacchaMaalNotes: "",
  orderList: [
    {
      designNo: "",
      plating: "",
      quantity: "",
    }
  ],
  partyCode: "",
  platingStatus: false,
  platingNotes: "",
  orderDate: "",
  kacchaMaalStatus: false,
};

const Home: React.FC = () => {
  const [ordersList, setOrdersList] = useState<any[]>([]);
  const getOrdersList = () => {
    getDocs(collection(db, "orders")).then((results) => {
      results.forEach((result) => {
        setOrdersList((ordersList) => [...ordersList, result.data()]);
      });
    });
  };

  useIonViewWillEnter(() => {
    setOrdersList([]);
    getOrdersList();
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
          <IonTitle className="title">BRB Smart</IonTitle>
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

        <IonList className="ordersList" class="ordersList">
          {ordersList.length ? (
            ordersList.map((order, index) => (
              <OrderListItem key={index} order={order} />
            ))
          ) : (
            <LoaderSkeleton />
          )}
        </IonList>
      </IonContent>
      <Link to={{ pathname: "/add-order", state: { order: initialOrderItem } }}>
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
      </Link>
    </IonPage>
  );
};

export default Home;
