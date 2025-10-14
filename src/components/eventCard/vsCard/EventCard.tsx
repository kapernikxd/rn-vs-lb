import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Tag from '../Tag';
import OrganizerContainer from './OrganizerContainer';
import Footer from './Footer';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';

interface EventCardProps {
    imageUri: string;
    date: string;
    tags: { label: string; backgroundColor: string; textColor: string; borderColor: string; }[];
    title: string;
    description: string;
    organizerAvatarUri: string;
    organizerName: string;
    organizerLink: string;
    likes: number;
    views: number;
}

const EventCard: React.FC<EventCardProps> = ({
    imageUri,
    date,
    tags,
    title,
    description,
    organizerAvatarUri,
    organizerName,
    organizerLink,
    likes,
    views
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: imageUri }}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.content}>
                <View style={styles.dateAndTags}>
                    <Text style={styles.date}>{date}</Text>
                    {tags.map((tag, index) => (
                        <Tag
                            key={index}
                            label={tag.label}
                            backgroundColor={tag.backgroundColor}
                            textColor={tag.textColor}
                            borderColor={tag.borderColor}
                        />
                    ))}
                </View>
                <Text 
                    style={styles.title}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >{title}</Text>
                <Text
                    style={styles.description}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                >
                    {description}
                </Text>
                <View style={styles.organizerContainer}>
                <OrganizerContainer
                    avatarUri={organizerAvatarUri}
                    organizerName={organizerName}
                    organizerLink={organizerLink}
                />
                </View>
                <Footer likes={likes} views={views} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        overflow: 'hidden',
        marginBottom: SIZES.xs,
        marginTop: SIZES.xs,
        elevation: 3, // For Android shadow
        shadowColor: COLORS.dark,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    imageContainer: {
        width: '100%',
        height: 270,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    content: {
        padding: SIZES.sm,
    },
    dateAndTags: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SIZES.xxs,
    },
    date: {
        ...FONTS.font,
        color: COLORS.greyText,
        marginRight: SIZES.sm,
    },
    title: {
        ...FONTS.h4,
    },
    description: {
        ...FONTS.font,
        marginTop: SIZES.xxs,
    },
    organizerContainer: {
        marginTop: SIZES.md,
        marginBottom: SIZES.md,
    }
});

export default EventCard;