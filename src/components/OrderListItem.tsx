import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import { IOrder } from "../data/messages";
import "./OrderListItem.css";
import { Link } from "react-router-dom";

interface MessageListItemProps {
  order: IOrder;
  deleteOrder: (id:string) => void;
}

const OrderListItem: React.FC<MessageListItemProps> = ({ order, deleteOrder }) => {
  const patingStatus = order.platingStatus ? "done" : "pending";
  const kacchaMaalStatus = order.kacchaMaalStatus ? "done" : "pending";
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Order No : {order.orderNumber} </IonCardTitle>
        <IonCardSubtitle>
          Order Date : <strong>{order.orderDate}</strong>
        </IonCardSubtitle>
        <IonCardSubtitle>Party Number : {order.partyCode}</IonCardSubtitle>
        <IonCardSubtitle className={patingStatus}>
          Plating Status : {`${order.platingStatus ? "Done" : "Pending"}`}
        </IonCardSubtitle>
        <IonCardSubtitle className={kacchaMaalStatus}>
          Kaccha Maal Status :{" "}
          {`${order.kacchaMaalStatus ? "Done" : "Pending"}`}
        </IonCardSubtitle>
      </IonCardHeader>

      <Link to={{ pathname: `/edit/${order.orderNumber}`, state: { order } }}>
        <IonButton fill="solid" color="primary">
          Edit
        </IonButton>
      </Link>
      <IonButton fill="solid" color="danger" onClick={() => deleteOrder(order.id)}>
        Delete
      </IonButton>
    </IonCard>
  );
};

export default OrderListItem;
