import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Auth, DataStore } from "aws-amplify";
import ListViewContent from "./ListViewContent";
import {
  checkmarkCircleOutline,
  ellipseOutline,
  logOutOutline,
} from "ionicons/icons";

const ListView: React.FC = () => {
  const [showingComplete, setShowingComplete] = useState(true);

  const handleSignOutClick = async () => {
    await DataStore.clear();
    await Auth.signOut();
    window.location.reload();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonIcon
              size="large"
              icon={showingComplete ? checkmarkCircleOutline : ellipseOutline}
              color={showingComplete ? "primary" : "medium"}
              onClick={() => setShowingComplete(!showingComplete)}
            />
          </IonButtons>
          <IonTitle>🍍 Go Shop 🍉</IonTitle>
          <IonButtons slot="end">
            <IonIcon
              size="large"
              color="danger"
              icon={logOutOutline}
              onClick={handleSignOutClick}
            />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen scrollY={false}>
        <div style={{ overflow: "scroll", height: "100%" }}>
          <ListViewContent showingComplete={showingComplete} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default withAuthenticator(ListView);
