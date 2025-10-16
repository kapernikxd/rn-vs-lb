import React from 'react';
import { ScrollView, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../../theme';

import TabButton, { type TabButtonProps } from '../../UI/TabButton/TabButton';
import SubTabButton from './SubTabButton';
import Dot from '../../UI/Dot';

export type ChatTab = 'person' | 'group' | 'bot';
export type BotSubTab = 'my' | 'others';

type Props = {
  activeTab: ChatTab;
  onChangeTab: (tab: ChatTab) => void;

  hasUnreadPrivate?: boolean;
  hasUnreadGroup?: boolean;
  hasUnreadBot?: boolean;

  showBotSubTabs?: boolean;
  activeBotSubTab?: BotSubTab;
  onChangeBotSubTab?: (tab: BotSubTab) => void;
};

const ChatTabs: React.FC<Props> = ({
  activeTab,
  onChangeTab,
  hasUnreadPrivate,
  hasUnreadGroup,
  hasUnreadBot,
  showBotSubTabs,
  activeBotSubTab = 'my',
  onChangeBotSubTab,
}) => {
  const { theme, globalStyleSheet, typography } = useTheme();

  return (
    <View>
      {/* Основные вкладки */}
      <View style={globalStyleSheet.container}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexDirection: 'row' }}>
          <TabButton
            label="Person"
            active={activeTab === 'person'}
            onPress={() => onChangeTab('person')}
            icon={<MaterialIcons name="person" size={18} color={activeTab === 'person' ? theme.primary : theme.text} />}
            rightAddon={<Dot style={{ position: 'relative', backgroundColor: theme.danger, top: -6, left: 6 }} display={!!hasUnreadPrivate} />}
          />

          <TabButton
            label="Group"
            active={activeTab === 'group'}
            onPress={() => onChangeTab('group')}
            icon={<MaterialIcons name="groups" size={18} color={activeTab === 'group' ? theme.primary : theme.text} />}
            rightAddon={<Dot style={{ position: 'relative', backgroundColor: theme.danger, top: -6, left: 6 }} display={!!hasUnreadGroup} />}
          />

          <TabButton
            label="Bot"
            active={activeTab === 'bot'}
            onPress={() => onChangeTab('bot')}
            icon={<MaterialIcons name="smart-toy" size={18} color={activeTab === 'bot' ? theme.primary : theme.text} />}
            rightAddon={<Dot style={{ position: 'relative', backgroundColor: theme.danger, top: -6, left: 6 }} display={!!hasUnreadBot} />}
          />
        </ScrollView>
      </View>

      {/* Саб-вкладки для Ботов */}
      {showBotSubTabs && activeTab === 'bot' && (
        <View style={globalStyleSheet.container}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexDirection: 'row', paddingBottom: 8 }}>
            <SubTabButton
              label="Owned Bots"
              active={activeBotSubTab === 'my'}
              onPress={() => onChangeBotSubTab?.('my')}
            />
            <SubTabButton
              label="Feedback bots"
              active={activeBotSubTab === 'others'}
              onPress={() => onChangeBotSubTab?.('others')}
            />
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default ChatTabs;
