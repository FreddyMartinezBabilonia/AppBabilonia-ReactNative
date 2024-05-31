import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { StyleSheet, View, Image, Dimensions, Text } from 'react-native'
import { useListingDetailStore } from '../store'
import { Button } from './Button'

export const BottomSheetCustom = () => {

    const dimensions = Dimensions.get('window');
    const imageWidth = dimensions.width;

    const idListing = useListingDetailStore(state => state.id);

    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    useEffect(() => {
        console.log(idListing);
      if(idListing == null){
        bottomSheetRef.current?.close();
      }else{
        bottomSheetRef.current?.snapToPosition("50%");
      }
    }, [idListing])
    

  return (
    <BottomSheet
        ref={bottomSheetRef}
        snapPoints={["50%", "80%"]}
        index={-1}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
      >
        <BottomSheetView style={styles.contentContainer}>
            <View style={styles.contentBody}>
                <Image 
                    resizeMode="cover"
                    style={{width: imageWidth-32, height: 120}}
                    source={{uri: 'https://picsum.photos/410/300'}}
                />
                <View style={styles.contentTop}>
                    <View style={styles.contentPrice}>
                        <Text style={styles.h2}>$850,000</Text>
                        <Text style={styles.h3}>$1416/m2</Text>

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
    }
});
const styles = StyleSheet.create({
    contentContainer: {
      flex: 1,
      alignItems: 'center',
      paddingLeft: 16,
      paddingRight: 16,
      backgroundColor: '#fff',
    },
    contentBody:{
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 8,
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
        alignItems:'center',
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
        ...textPrimaryStyle.text
    },
    h1:{
        ...textPrimaryStyle.text,
        fontWeight: 'bold',
        fontSize: 30,
    },
    h2:{
        ...textPrimaryStyle.text,
        fontWeight: 'bold',
        fontSize: 20,
    },
    h3:{
        ...textPrimaryStyle.text,
        fontWeight: 'bold',
        fontSize: 15,
    },
    
  });