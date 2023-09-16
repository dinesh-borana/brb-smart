import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { add } from "ionicons/icons";
import { useState } from "react";
import { db } from "../../firebase.config";
import { useLocation } from "react-router";

type TItem = {
  designNo: string;
  quantity: string;
  plating: string;
  size: string;
  notes: string;
};

const initiateItem: TItem = {
  designNo: "",
  quantity: "",
  plating: "",
  size: "",
  notes: "",
};

export const AddOrder = () => {
  const location = useLocation();
  const { order } = location.state as any;
  const [items, setItems] = useState<TItem[]>(
    order.orderList.length > 0 ? order.orderList : [initiateItem]
  );
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const addItemRow = (orderItem: TItem) => {
    setItems((items) => [...items, orderItem]);
  };

  const submitOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = document.forms[0];
    const {
      orderNumber,
      partyNumber,
      orderDate,
    } = formData;
    let reqData = {
      orderNumber: orderNumber.value,
      partyCode: partyNumber.value,
      orderDate: orderDate.value,
      orderList: items,
    };
    //event.target.reset();
    if (location.pathname === "/add-order") {
      const dbRef = collection(db, "orders");
      addDoc(dbRef, reqData)
        .then((docRef) => {
          setShowMessage(true);
          orderNumber.value = "";
          partyNumber.value = "";
          orderDate.value = null;
          setItems([]);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const docRef = doc(db, "orders", order.id);
      setDoc(docRef, reqData)
        .then((docRef) => {
          console.log("update Done");
        })
        .catch((error) => {
          console.log("error occured");
        });
    }
  };
  const handleItemInputChange = (
    name: string,
    value: string,
    index: number
  ) => {
    let item = items[index];
    item[name as "designNo" | "quantity" | "plating"] = value;
    setItems((items) => items);
  };

  return (
    <IonPage id="add-order">
      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="home"></IonBackButton>
            </IonButtons>
            <IonTitle class="ion-text-center">{`${
              location.pathname === "/add-order" ? "Add" : "Update"
            } Order Details`}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <form
          id="add-order-form"
          className="ion-padding"
          onSubmit={(e) => submitOrder(e)}
        >
          <IonItem>
            <IonLabel>Order Number : </IonLabel>
            <IonInput
              type="text"
              name="orderNumber"
              value={order.orderNumber}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Party Name : </IonLabel>
            <IonInput
              type="text"
              name="partyNumber"
              value={order.partyCode}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Order Date : </IonLabel>
            <IonInput
              type="date"
              name="orderDate"
              value={order.orderDate}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Order Details : </IonLabel>
          </IonItem>
          {items.map((item, index) => {
            return (
              <>
                <IonItem key={index}>
                  <IonInput
                    type="text"
                    placeholder="Design No"
                    class="ion-margin"
                    name="designNo"
                    value={item.designNo}
                    onIonInput={(e) => {
                      handleItemInputChange(
                        e.target.name,
                        e.target.value as string,
                        index
                      );
                    }}
                  ></IonInput>
                  <IonInput
                    type="text"
                    name="size"
                    placeholder="Size"
                    value={item.size}
                    onIonInput={(e) => {
                      handleItemInputChange(
                        e.target.name,
                        e.target.value as string,
                        index
                      );
                    }}
                  ></IonInput>
                  <IonInput
                    type="text"
                    name="quantity"
                    placeholder="Quantity"
                    value={item.quantity}
                    onIonInput={(e) => {
                      handleItemInputChange(
                        e.target.name,
                        e.target.value as string,
                        index
                      );
                    }}
                  ></IonInput>
                  <IonInput
                    type="text"
                    name="plating"
                    placeholder="Plating"
                    value={item.plating}
                    onIonInput={(e) => {
                      handleItemInputChange(
                        e.target.name,
                        e.target.value as string,
                        index
                      );
                    }}
                  ></IonInput>
                  <IonInput
                    type="text"
                    name="notes"
                    placeholder="Notes"
                    value={item.notes}
                    onIonInput={(e) => {
                      handleItemInputChange(
                        e.target.name,
                        e.target.value as string,
                        index
                      );
                    }}
                  ></IonInput>
                </IonItem>
                {index === items.length - 1 && (
                  <IonButton
                    style={{
                      marginTop: "15px",
                      marginBottom: "15px",
                      marginLeft: "25%",
                    }}
                    onClick={() =>
                      addItemRow({
                        designNo: "",
                        quantity: "",
                        plating: "",
                        size: "",
                        notes: "",
                      })
                    }
                  >
                    Add New item
                    <IonIcon icon={add} />
                  </IonButton>
                )}
              </>
            );
          })}
          <IonButton className="ion-margin" expand="block" type="submit">
            {`${location.pathname === "/add-order" ? "Add" : "Update"} Order`}
          </IonButton>
        </form>
        <IonToast
          isOpen={showMessage}
          message="Order submitted successfully"
          onDidDismiss={() => setShowMessage(false)}
          duration={5000}
        ></IonToast>
      </IonContent>
    </IonPage>
  );
};
