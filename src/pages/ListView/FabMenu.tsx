import { IonFab, IonFabButton, IonFabList, IonIcon } from "@ionic/react";
import {
  checkmarkCircleOutline,
  ellipseOutline,
  logOutOutline,
  settings,
  trashOutline,
} from "ionicons/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleShowingComplete,
  toggleIsDeleting,
  logoutAsync,
  selectShowingComplete,
  selectIsDeleting,
} from "../../store/settings";
import { lightHaptic } from "../../helpers/capacitorHelpers";

const FabMenu: React.FC = () => {
  const dispatch = useDispatch();
  const showingCompleteState = useSelector(selectShowingComplete);
  const isDeletingState = useSelector(selectIsDeleting);

  const handleToggleComplete = () => {
    lightHaptic();
    dispatch(toggleShowingComplete());
  };

  const handleToggleDeleting = () => {
    lightHaptic();
    dispatch(toggleIsDeleting());
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
        <IonFabButton
          color={isDeletingState ? "danger" : "none"}
          onClick={handleToggleDeleting}
        >
          <IonIcon
            icon={trashOutline}
            color={isDeletingState ? "light" : "medium"}
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
