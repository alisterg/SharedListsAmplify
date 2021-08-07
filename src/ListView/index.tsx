import {
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
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
  settings,
} from "ionicons/icons";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

const ListView: React.FC = () => {
  const [showingComplete, setShowingComplete] = useState(true);

  const handleSignOutClick = async () => {
    await DataStore.clear();
    await Auth.signOut();
    window.location.reload();
  };

  const handleToggleComplete = async () => {
    await Haptics.impact({ style: ImpactStyle.Medium });
    setShowingComplete(!showingComplete);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>🍍 Go Shop 🍉</IonTitle>
          <IonButtons slot="end">
            <IonFab horizontal="end" vertical="top" slot="fixed" edge>
              <IonFabButton
                mode="ios"
                color="primary"
                onClick={() => Haptics.impact({ style: ImpactStyle.Light })}
              >
                <IonIcon className="white-color" icon={settings} size="small" />
              </IonFabButton>
              <IonFabList>
                <IonFabButton>
                  <IonIcon
                    icon={
                      showingComplete ? checkmarkCircleOutline : ellipseOutline
                    }
                    color={showingComplete ? "primary" : "medium"}
                    onClick={handleToggleComplete}
                  />
                </IonFabButton>
                <IonFabButton>
                  <IonIcon
                    color="danger"
                    icon={logOutOutline}
                    onClick={handleSignOutClick}
                  />
                </IonFabButton>
              </IonFabList>
            </IonFab>
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
