import React from 'react';
import { StyleSheet } from 'react-native';
import { Pagination } from 'react-native-swiper-flatlist';
import officialColors from '../../style/colors';


const styles = StyleSheet.create({
    paginationContainer: {
        bottom: 0,
    },
    pagination: {
        borderRadius: 10,
        height: 6,
        marginLeft: 6,
        marginRight: 6,
        width: 6,
        alignSelf: 'flex-end',
    },
});

const LandingPageCarouselPagination = (props) => {
    return (
        <Pagination
            {...props}
            paginationStyle={styles.paginationContainer}
            paginationStyleItem={styles.pagination}
            paginationDefaultColor={'#c4c4c4'}
            paginationActiveColor={officialColors.green}
        />
    );
};

export default LandingPageCarouselPagination;