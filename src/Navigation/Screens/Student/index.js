import getUsersList from './action';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View, FlatList, Image, Text } from 'react-native';

export default function UsersList() {
    const dispatch = useDispatch();
    const { listData, page, total } = useSelector((store) => store.UsersListReducer);

    useEffect(() => {
        dispatch(getUsersList());
    }, [page]);

    const _onEndReached = () => {
        if (listData.length < total) {
            dispatch({ type: "INCREASE_PAGE" });
        }
    }

    const _renderItems = ({ item }) => {
        return (
            <View style={styles.itemCon}>
                <View style={styles.imgCon}>
                    <Image
                        resizeMode='cover'
                        resizeMethod="resize"
                        source={{ uri: item.avatar }}
                        style={styles.imgStyle}
                    />
                </View>
                <View style={styles.rightCon}>
                    <Text numberOfLines={1} style={styles.textStyle}>{item.email}</Text>
                    <Text>
                        kjhgjhs
                    </Text>
                    <Text style={styles.textStyle}>{`${item.first_name} ${item.last_name}`}</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={listData}
                style={{ width: '90%' }}
                renderItem={_renderItems}
                onEndReached={_onEndReached}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    itemCon: {
        height: 100,
        width: '100%',
        borderRadius: 8,
        marginVertical: 30,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
        backgroundColor: '#ccc'
    },
    imgCon: {
        width: 80,
        height: 80,
        borderRadius: 80,
        overflow: 'hidden',
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    imgStyle: {
        width: '100%',
        height: '100%',
    },
    rightCon: {
        width: 'auto',
        height: '100%',
        paddingLeft: 20,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    textStyle: {
        fontSize: 18,
        maxWidth: '100%',
        marginVertical: 2,
        fontWeight: '500',
    }
});