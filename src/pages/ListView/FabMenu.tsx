import { IonFab, IonFabButton, IonFabList, IonIcon } from "@ionic/react";
import {
  checkmarkCircleOutline,
  ellipseOutline,
  logOutOutline,
  settings,
} from "ionicons/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleShowingComplete,
  logoutAsync,
  selectShowingComplete,
} from "../../store/settings";
import { lightHaptic } from "../../helpers/capacitorHelpers";

const FabMenu: React.FC = () => {
  const dispatch = useDispatch();
  const showingCompleteState = useSelector(selectShowingComplete);

  const handleToggleComplete = () => {
    lightHaptic();
    dispatch(toggleShowingComplete());
  };

  const handleSignOutClick = async () => {
    lightHaptic();
    dispatch(logoutAsync());
  };

  return (
    <IonFab horizontal="end" vertical="top" slot="fixed" edge>
      <IonFabButton
        mode="ios"
        color="primary"
        onClick={() => lightHaptic()}
        size="small"
      >
        <IonIcon className="white-color" icon={settings} size="small" />
      </IonFabButton>
      <IonFabList>
        <IonFabButton onClick={handleToggleComplete}>
          <IonIcon
            icon={
              showingCompleteState ? checkmarkCircleOutline : ellipseOutline
            }
            color={showingCompleteState ? "primary" : "medium"}
          />
        </IonFabButton>
        <IonFabButton color="danger" onClick={handleSignOutClick}>
          <IonIcon color="light" icon={logOutOutline} />
        </IonFabButton>
      </IonFabList>
    </IonFab>
  );
};

export default FabMenu;
