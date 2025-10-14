import React from 'react';
import IconOcticons from 'react-native-vector-icons/Octicons';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export enum IconTypes {
  OCTICONS = "Octicons",
  IONICONS = "Ionicons",
  MATERIALICONS = "MaterialIcons",
}

interface Icon {
  name: string;
  iconName: string;
  size: number;
  lb: IconTypes;
  color?: string;
}

const renderIcon = (icon:Icon) => {
  switch (icon.lb) {
    case IconTypes.OCTICONS:
      return <IconOcticons name={icon.iconName} size={icon.size} color={icon.color ?? "#475A77"}/>;
    case IconTypes.IONICONS:
      return <IconIonicons name={icon.iconName} size={icon.size} color={icon.color ?? "#475A77"} />;
    case IconTypes.MATERIALICONS:
      return <MaterialIcons name={icon.iconName} size={icon.size} color={icon.color ?? "#475A77"} />;
    default:
      return null;
  }
};

export const IconConverter: React.FC<Icon> = (icon) => {

  return renderIcon(icon);
};

