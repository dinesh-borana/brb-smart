import {
  IonList,
  IonListHeader,
  IonSkeletonText,
  IonItem,
  IonThumbnail,
  IonLabel,
} from "@ionic/react";

export const LoaderSkeleton = () => {
  return (
    <IonList className="ion-margin">
      <IonListHeader>
        <IonSkeletonText
          animated={true}
          style={{ width: "80px" }}
        ></IonSkeletonText>
      </IonListHeader>
      <IonItem>
        <IonThumbnail slot="start">
          <IonSkeletonText animated={true}></IonSkeletonText>
        </IonThumbnail>
        <IonLabel>
          <h3>
            <IonSkeletonText
              animated={true}
              style={{ width: "80%" }}
            ></IonSkeletonText>
          </h3>
          <p>
            <IonSkeletonText
              animated={true}
              style={{ width: "60%" }}
            ></IonSkeletonText>
          </p>
          <p>
            <IonSkeletonText
              animated={true}
              style={{ width: "30%" }}
            ></IonSkeletonText>
          </p>
        </IonLabel>
      </IonItem>
    </IonList>
  );
};
