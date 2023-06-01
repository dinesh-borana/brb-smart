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
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToast,
  IonToggle,
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
};

const initiateItem: TItem = {
  designNo: "",
  quantity: "",
  plating: "",
};

export const AddOrder = () => {
  const location = useLocation();
  console.log(location);
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
      platingStatus,
      platingNotes,
      kacchaMaalStatus,
      kacchaMaalNotes,
      orderDate,
    } = formData;
    let reqData = {
      orderNumber: orderNumber.value,
      partyCode: partyNumber.value,
      platingStatus: !!platingStatus.value,
      platingNotes: platingNotes.value,
      kacchaMaalNotes: kacchaMaalNotes.value,
      kacchaMaalStatus: !!kacchaMaalStatus.value,
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
          platingStatus.value = false;
          platingNotes.value = "";
          kacchaMaalNotes.value = "";
          kacchaMaalStatus.value = false;
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
          console.log("update DOne");
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
            <IonLabel>Party Number : </IonLabel>
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
                  placeholder="Design"
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
                {/* <IonInput>
                <IonList>
                  <IonItem>
                    <IonSelect
                      aria-label="Fruit"
                      interface="popover"
                      placeholder="Size"
                    >
                      <IonSelectOption value="apples">2.4</IonSelectOption>
                      <IonSelectOption value="oranges">2.6</IonSelectOption>
                      <IonSelectOption value="bananas">2.8</IonSelectOption>
                    </IonSelect>
                  </IonItem>
                </IonList>
                </IonInput> */}
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
                {/* <IonInput>
                <IonList>
                  <IonItem>
                    <IonSelect
                      aria-label="Fruit"
                      interface="popover"
                      placeholder="Plating"
                    >
                      <IonSelectOption value="apples">Gold</IonSelectOption>
                      <IonSelectOption value="oranges">Silver</IonSelectOption>
                      <IonSelectOption value="bananas">Rhodium</IonSelectOption>
                    </IonSelect>
                  </IonItem>
                </IonList>
                </IonInput> */}
              </IonItem>
              {index === items.length - 1 && (
                  <IonButton
                    style={{marginTop:'15px', marginBottom:'15px', marginLeft:'25%'}}
                    onClick={() =>
                      addItemRow({ designNo: "", quantity: "", plating: "" })
                    }
                  >
                    Add New item
                    <IonIcon icon={add} />
                  </IonButton>
                )}
              </>
            );
          })}
          <IonItem>
            <IonLabel>Plating Status</IonLabel>
            <IonToggle name="platingStatus" checked={order.platingStatus}>
              Plating Status
            </IonToggle>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Plating Notes: </IonLabel>
            <IonTextarea
              placeholder="Enter Plating Notes"
              name="platingNotes"
              value={order.platingNotes}
            ></IonTextarea>
          </IonItem>
          <IonItem>
            <IonLabel>Kaccha Maal Status</IonLabel>
            <IonToggle name="kacchaMaalStatus" checked={order.kacchaMaalStatus}>
              Kaccha Maal Status
            </IonToggle>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Kaccha Maal Notes</IonLabel>
            <IonTextarea
              placeholder="Enter Kaccha Maal Notes"
              name="kacchaMaalNotes"
              value={order.kacchaMaalNotes}
            ></IonTextarea>
          </IonItem>
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
