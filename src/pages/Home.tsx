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
import MainPageContent from "../components/MainPageContent";

const Home: React.FC = () => {
  const handleSignOutClick = async () => {
    await Auth.signOut();
    window.location.reload();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>🍍 Go Shop 🍉</IonTitle>
          <IonButtons slot="end" className="signout-button">
            <div onClick={handleSignOutClick} className="signout-button">
              Sign Out
            </div>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <MainPageContent />
      </IonContent>
    </IonPage>
  );
};

export default withAuthenticator(Home);
