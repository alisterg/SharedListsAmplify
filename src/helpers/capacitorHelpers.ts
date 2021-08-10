import { isPlatform } from "@ionic/react";
import { Keyboard } from "@capacitor/keyboard";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

export const hideKeyboard = () => {
  if (!isPlatform("desktop")) {
    Keyboard.hide().then();
  }
};

export const lightHaptic = () => {
  Haptics.impact({ style: ImpactStyle.Light }).then();
};

export const mediumHaptic = () => {
  Haptics.impact({ style: ImpactStyle.Medium }).then();
};
