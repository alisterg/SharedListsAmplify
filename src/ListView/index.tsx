import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import ListViewContent from "./ListViewContent";
import styles from "./styles.module.css";

const ListView: React.FC = () => {
  const handleSignOutClick = async () => {
    await Auth.signOut();
    window.location.reload();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>🍍 Go Shop 🍉</IonTitle>
          <IonButtons slot="end" className={styles.signoutButton}>
            <div onClick={handleSignOutClick} className={styles.signoutButton}>
              Sign Out
            </div>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <ListViewContent />
      </IonContent>
    </IonPage>
  );
};

export default withAuthenticator(ListView);
