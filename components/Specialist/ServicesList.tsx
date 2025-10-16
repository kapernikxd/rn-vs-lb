import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { useTheme, ThemeType } from '../../theme';

export type ServiceItem = {
  name: string;
  description?: string;
  photos?: string[];
  price?: number | string;
  currency?: string;
  time?: string;
  // любой доп. payload
  raw?: any;
};

export type ServicesListProps = {
  title?: string;
  total?: number;            // для счетчика справа от заголовка
  services: ServiceItem[];
  onPressService?: (item: ServiceItem, index: number) => void;
  onPressMore?: () => void;
  style?: ViewStyle;
};

const ServicesList: React.FC<ServicesListProps> = ({ title = 'Services', total, services, onPressService, onPressMore, style }) => {
  const { theme } = useTheme();
  const s = getStyles(theme);

  if (!services?.length) return null;

  return (
    <View style={[s.section, style]}>
      <View style={s.headerRow}>
        <Text style={s.sectionTitle}>
          {title} {!!total && <Text style={s.muted}>{total}</Text>}
        </Text>
        {!!onPressMore && (
          <TouchableOpacity onPress={onPressMore}>
            <Text style={s.moreLink}>MORE</Text>
          </TouchableOpacity>
        )}
      </View>

      {services.map((svc, idx) => (
        <TouchableOpacity key={`${svc.name}-${idx}`} activeOpacity={0.9} style={s.card} onPress={() => onPressService?.(svc, idx)}>
          {!!svc.photos?.[0] && <Image source={{ uri: svc.photos[0] }} style={s.image} />}
          <View style={{ flex: 1 }}>
            <Text numberOfLines={1} style={s.name}>{svc.name}</Text>
            {!!svc.description && <Text numberOfLines={2} style={s.desc}>{svc.description}</Text>}
            {(svc.price || svc.time) && (
              <Text style={s.meta}>
                {!!svc.price && `${svc.price} ${svc.currency || ''}`}{svc.price && svc.time ? ' • ' : ''}
                {!!svc.time && svc.time}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ServicesList;

const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    section: { paddingHorizontal: 16, marginTop: 36 },
    headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    sectionTitle: { fontSize: 16, fontWeight: '700', color: theme.black, marginBottom: 8 },
    muted: { color: theme.text, fontWeight: '400' },
    moreLink: { color: theme.primary, fontWeight: '600' },

    card: {
      flexDirection: 'row', alignItems: 'center', backgroundColor: theme.card,
      padding: 12, borderRadius: 12, marginTop: 8,
    },
    image: { width: 60, height: 60, borderRadius: 10, marginRight: 12, backgroundColor: theme.background },
    name: { fontWeight: '700', color: theme.text },
    desc: { color: theme.text, marginTop: 2 },
    meta: { color: theme.text, marginTop: 6 },
  });
