import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { StyleSheet, View, Image, Dimensions, Text } from 'react-native'
import { useListingDetailStore } from '../store'
import { Button } from './Button'

import PaginationDot from 'react-native-animated-pagination-dot'
import Carousel from 'react-native-reanimated-carousel';
import { IconCamera, IconFavorite, IconTypeProperty } from './card'
import { useCard } from '../hooks'

export const BottomSheetCustom = () => {

    const dimensions = Dimensions.get('window');
    const imageWidth = dimensions.width - 16;
    const imageHeight = 180;
    const idListing = useListingDetailStore(state => state.id);
    const [currentPage, setCurrentPage] = useState(1);

    const { getListingDetail } = useCard();

    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    useEffect(() => {
        console.log(idListing);
        getListingDetail().then((res) => {
            console.log(res);
        });
      if(idListing == null){
        bottomSheetRef.current?.close();
      }else{
        bottomSheetRef.current?.snapToPosition("50%");
      }
    }, [idListing])

  return (
    <BottomSheet
        style={styles.bottomSheet}
        ref={bottomSheetRef}
        snapPoints={[370, 380]}
        index={1}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        contentHeight={310}
      >        
        <BottomSheetView style={styles.contentContainer}>


            <View style={{...styles.contentBody, height: imageHeight,}}>
                <IconTypeProperty style={styles.iconTypeProperty} />
                <IconFavorite style={styles.iconFavorite} />
                <IconCamera style={styles.iconCamera} />
                <View style={styles.contentCarrousel}>
                    <Carousel
                        loop
                        width={imageWidth}
                        height={imageHeight}
                        autoPlay={false}
                        data={[...new Array(6).keys()]}
                        scrollAnimationDuration={1000}
                        onSnapToItem={(index) => setCurrentPage(index)}
                        pagingEnabled={true}
                        renderItem={({ index }) => (
                            <View style={{...styles.contentGallery }}>
                                <Image
                                    style={styles.galleryImage}
                                    source={{
                                        uri: `https://picsum.photos/${imageWidth}/${imageHeight}?random=${index}`
                                    }}
                                    width={imageWidth}
                                    height={imageHeight}
                                />
                            </View>
                        )}
                    />
                    
                    <View style={styles.contentPaginationDots}>
                        <PaginationDot
                            inactiveDotColor={'white'}
                            activeDotColor={'white'}
                            curPage={currentPage}
                            maxPage={6}
                        />
                    </View>
                </View>
                <View style={styles.contentTop}>
                    <View style={styles.contentPrice}>
                        <Text style={{...styles.h2,fontSize:23}}>$850,000</Text>
                        <Text style={styles.textMetter}>$1416/m2</Text>

                    </View>
                    <Text style={styles.area}>600 m2</Text>
                </View>
                <Text style={styles.address}>Miro Quesada Cdra 1 Piso 11, San Isidro, Lima</Text>
                
                <View style={styles.contentButtons}>
                    <Button
                        content="Ver inmueble"
                        style={styles.btnShowMore}
                        styleText={styles.btnText}
                    />
                    <Button
                        content="Navegar"
                        style={styles.btnNavigate}
                        styleText={{...styles.btnText, color: '#28a7b5'}}
                        iconName='location'
                        iconColor='#28a7b5'
                        iconSize={20}
                    />
                </View>
            </View>
        </BottomSheetView>
    </BottomSheet>
  )
}

const textPrimaryStyle = StyleSheet.create({
    text: {
        color: '#000',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: "AvenirLTStd-Roman",
    }
});
const styles = StyleSheet.create({
    bottomSheet:{
        //shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,

        elevation: 19,
    },
    contentPaginationDots:{
        flex: 1,
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 10,
        right: 0,
        left: 0,
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
      paddingLeft: 8,
      paddingRight: 8,
      backgroundColor: '#fff',
    },
    contentCarrousel:{
        position:'relative',
    },
    contentGallery:{
        justifyContent: 'center',  
        width: '100%',      
    },
    contentBody:{
        width: '100%',
        height:'auto',
        display:'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 10,
        position:'relative'
    },
    contentTop:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',      
    },
    contentPrice:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'flex-end',
        marginTop: 10,
        gap: 10,
        flex: 1,
    },
    contentButtons:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        minWidth: '100%',
        gap: 5,
        marginTop: 16,
        height: 50,
        maxHeight: 50,
    },
    btnShowMore:{
        borderRadius:8,
        backgroundColor: '#fff',
        color: '#000',
        borderColor: '#ccc',
        borderWidth: 1,
        minHeight: 50,
        minWidth:"48%",
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnNavigate:{
        borderRadius:8,
        backgroundColor: '#fff',
        color: '#000',
        borderColor: '#ccc',
        borderWidth: 1,
        minHeight: 50,
        minWidth:"48%",
        display: "flex",
        flexDirection:'row',
        gap: 5,
        justifyContent: 'center',
        alignItems: 'center',        
    },
    btnText:{
        ...textPrimaryStyle.text,
        fontSize: 14,
        fontWeight: 'bold',
    },
    address:{
        ...textPrimaryStyle.text,
        fontSize: 14,
        alignSelf: 'flex-start',
        marginTop: 10,
    },
    area:{
        ...textPrimaryStyle.text,
        fontSize: 12,
        fontWeight: 'bold',
        alignSelf: 'flex-end',
    },
    text: {
        ...textPrimaryStyle.text,
        fontFamily: "samsungsharpsans-bold",
    },
    h1:{
        ...textPrimaryStyle.text,
        fontFamily: "samsungsharpsans-bold",
        fontWeight: 'bold',
        fontSize: 30,
    },
    h2:{
        ...textPrimaryStyle.text,
        fontFamily: "samsungsharpsans-bold",
        fontWeight: 'bold',
        fontSize: 20,
    },
    h3:{
        ...textPrimaryStyle.text,
        fontFamily: "samsungsharpsans-bold",
        fontWeight: 'bold',
        fontSize: 15,
    },
    textMetter:{
        ...textPrimaryStyle.text,
        fontFamily: "AvenirLTStd-Roman",
        fontSize:13,
        color:'#92979C',
        marginBottom:4,
    },
    galleryImage:{
        borderRadius: 10,
        overflow: "hidden"
    },
    iconFavorite:{
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 3,
    },
    iconTypeProperty:{
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 2,
    },
    iconCamera:{
        position: 'absolute',
        bottom: 10,
        right: 10,
        zIndex: 3,
    },
  });