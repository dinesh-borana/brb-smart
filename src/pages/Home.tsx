import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import OrderListItem from "../components/OrderListItem";

import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";
import { db } from "../firebase.config";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { add } from "ionicons/icons";
import { LoaderSkeleton } from "./common/loaderSkeleton";
import { Link } from "react-router-dom";

const initialOrderItem = {
  orderNumber: "",
  orderList: [
    {
      designNo: "",
      plating: "",
      quantity: "",
    },
  ],
  partyCode: "",
  orderDate: "",
};

const Home: React.FC = () => {
  const [ordersList, setOrdersList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const getOrdersList = () => {
    setLoading(true);
    getDocs(collection(db, "orders")).then((results) => {
      setLoading(false);
      results.forEach((result) => {
        const resultData = result.data();
        resultData.id = result.id;
        setOrdersList((ordersList) => [...ordersList, resultData]);
      });
    }).catch((error) => {
      setLoading(false);
    });
  };

  useEffect(() => {
    setOrdersList([]);
    getOrdersList();
  }, []);

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  const deleteOrder = (orderId: string) => {
    deleteDoc(doc(db, "orders", orderId))
      .then((result) => {
        console.log(result);
        setOrdersList([]);
        getOrdersList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        localStorage.setItem("username", "");
        window.location.assign("/");
        console.log("Sign-out successful");
      })
      .catch((error) => {
        console.log("An error happened");
      });
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle className="title">BRB Smart</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={logOut}>Logout</IonButton>
          </IonButtons>
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
              <OrderListItem
                key={index}
                order={order}
                deleteOrder={deleteOrder}
              />
            ))
          ) : !loading ? (
            <p>No Order Aailable</p>
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
